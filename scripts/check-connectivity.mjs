import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { lookup } from 'node:dns/promises';
import { performance } from 'node:perf_hooks';

const ROOT = new URL('../', import.meta.url);
const SITES_PATH = new URL('src/data/sites.json', ROOT);
const REPORTS_DIR = new URL('reports/', ROOT);
const JSON_REPORT = new URL('reports/connectivity-audit.json', ROOT);
const MD_REPORT = new URL('reports/connectivity-audit.md', ROOT);
const TIMEOUT_MS = Number(process.env.CONNECTIVITY_TIMEOUT_MS ?? 8000);
const PROXY_ENV = {
  HTTP_PROXY: process.env.HTTP_PROXY ?? process.env.http_proxy ?? '',
  HTTPS_PROXY: process.env.HTTPS_PROXY ?? process.env.https_proxy ?? '',
  ALL_PROXY: process.env.ALL_PROXY ?? process.env.all_proxy ?? '',
};
const HAS_PROXY = Object.values(PROXY_ENV).some(Boolean);
const ASSUME_DIRECT_NETWORK = process.env.CONNECTIVITY_ASSUME_DIRECT === '1';

function withTimeout(ms) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), ms);
  return { signal: controller.signal, clear: () => clearTimeout(timer) };
}

async function probeDns(hostname) {
  const start = performance.now();
  try {
    const result = await lookup(hostname);
    return {
      ok: true,
      address: result.address,
      family: result.family,
      elapsedMs: Math.round(performance.now() - start),
    };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : String(error),
      elapsedMs: Math.round(performance.now() - start),
    };
  }
}

async function probeHttp(url) {
  const start = performance.now();
  const timeout = withTimeout(TIMEOUT_MS);
  try {
    const response = await fetch(url, {
      method: 'GET',
      redirect: 'follow',
      signal: timeout.signal,
      headers: {
        'user-agent': 'Mozilla/5.0 connectivity probe for wandiansha',
      },
    });
    return {
      ok: true,
      status: response.status,
      finalUrl: response.url,
      elapsedMs: Math.round(performance.now() - start),
    };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.name + ': ' + error.message : String(error),
      elapsedMs: Math.round(performance.now() - start),
    };
  } finally {
    timeout.clear();
  }
}

function classify(record) {
  if (!record.dns.ok) {
    return 'DNS_FAIL';
  }

  if (!record.http.ok) {
    return record.http.error?.startsWith('AbortError') ? 'TIMEOUT' : 'CONNECT_FAIL';
  }

  if (record.http.status >= 500) {
    return 'SERVER_ERROR';
  }

  if (record.http.status >= 400) {
    return 'REACHABLE_RESTRICTED';
  }

  return record.http.elapsedMs <= 5000 ? 'DOMESTIC_LIKELY_OK' : 'SLOW_BUT_REACHABLE';
}

function recommendation(status) {
  if (HAS_PROXY && !ASSUME_DIRECT_NETWORK) {
    return '当前环境检测到代理，不建议据此改为 false';
  }

  if (status === 'DOMESTIC_LIKELY_OK') {
    return 'mayNeedGlobalNetwork 可人工考虑设为 false';
  }
  if (status === 'SLOW_BUT_REACHABLE' || status === 'REACHABLE_RESTRICTED') {
    return '保持当前标记，需 agent-browser 实测';
  }
  return '建议保持 mayNeedGlobalNetwork=true';
}

async function main() {
  const sites = JSON.parse(await readFile(SITES_PATH, 'utf8'));
  const checkedAt = new Date().toISOString();
  const results = [];

  for (const site of sites) {
    const url = new URL(site.url);
    const dns = await probeDns(url.hostname);
    const http = dns.ok ? await probeHttp(site.url) : { ok: false, error: 'skipped: dns failed', elapsedMs: 0 };
    const record = {
      id: site.id,
      name: site.name,
      url: site.url,
      hostname: url.hostname,
      currentMayNeedGlobalNetwork: site.mayNeedGlobalNetwork,
      dns,
      http,
    };
    const status = classify(record);
    results.push({
      ...record,
      status,
      recommendation: recommendation(status),
    });
  }

  await mkdir(REPORTS_DIR, { recursive: true });
  await writeFile(JSON_REPORT, JSON.stringify({
    checkedAt,
    timeoutMs: TIMEOUT_MS,
    proxy: PROXY_ENV,
    hasProxy: HAS_PROXY,
    assumeDirectNetwork: ASSUME_DIRECT_NETWORK,
    results,
  }, null, 2));

  const rows = results.map((item) => [
    item.id,
    item.name,
    item.hostname,
    item.status,
    String(item.http.status ?? '-'),
    String(item.http.elapsedMs ?? '-'),
    String(item.currentMayNeedGlobalNetwork),
    item.recommendation,
  ]);

  const markdown = [
    '# 国内联通性探针报告',
    '',
    `> 生成时间: ${checkedAt}`,
    `> 超时阈值: ${TIMEOUT_MS}ms`,
    `> 代理环境: ${HAS_PROXY ? '检测到代理环境变量' : '未检测到常见代理环境变量'}`,
    `> 直连确认: ${ASSUME_DIRECT_NETWORK ? '用户已确认当前网络为直连测试，忽略代理环境变量残留' : '未确认'}`,
    '',
    '## 判定口径',
    '',
    '- `DOMESTIC_LIKELY_OK`: 当前网络 DNS 与 HTTP 均通过，首包不超过 5 秒。',
    '- `SLOW_BUT_REACHABLE`: 当前网络可访问但较慢，现场仍需复核。',
    '- `REACHABLE_RESTRICTED`: 可连通但返回 4xx，可能有反爬、地区或页面限制。',
    '- `DNS_FAIL` / `TIMEOUT` / `CONNECT_FAIL`: 建议继续标记为可能需要外网。',
    '',
    `> 注意：这是当前机器当前网络的探针，不代表全国所有国内网络；${HAS_PROXY && !ASSUME_DIRECT_NETWORK ? '当前检测到代理环境变量，不得据此把 `mayNeedGlobalNetwork` 自动改为 false。' : '当前已按直连测试口径记录，可作为本机网络下的回填依据。'}最终 \`tested\` 仍需 agent-browser 打开页面确认。`,
    '',
    '| ID | 名称 | Host | 状态 | HTTP | ms | 当前外网标记 | 建议 |',
    '|----|------|------|------|------|----|--------------|------|',
    ...rows.map((row) => `| ${row.join(' | ')} |`),
    '',
  ].join('\n');

  await writeFile(MD_REPORT, markdown);
  console.log(`Wrote ${MD_REPORT.pathname}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
