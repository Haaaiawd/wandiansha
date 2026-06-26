import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { exec as execCommand } from 'node:child_process';
import { promisify } from 'node:util';
import { fileURLToPath } from 'node:url';

const exec = promisify(execCommand);
const ROOT = new URL('../', import.meta.url);
const ROOT_PATH = fileURLToPath(ROOT);
const SITES_PATH = new URL('src/data/sites.json', ROOT);
const IMAGE_DIR = new URL('public/images/sites/', ROOT);
const REPORTS_DIR = new URL('reports/', ROOT);
const REPORT_PATH = new URL('reports/image-capture-report.md', ROOT);
const VIEWPORT = ['1200', '900'];
const LIMIT = Number(process.env.CAPTURE_LIMIT ?? 0);
function quote(value) {
  return `"${String(value).replaceAll('"', '\\"')}"`;
}

async function runAgentBrowser(args, timeout = 45000) {
  const command = ['agent-browser', ...args.map(quote)].join(' ');
  return exec(command, {
    cwd: ROOT_PATH,
    timeout,
    windowsHide: true,
  });
}

async function capture(site) {
  const fileName = `${site.id}.png`;
  const outputPath = new URL(fileName, IMAGE_DIR);
  const outputFsPath = fileURLToPath(outputPath);
  const publicPath = `/images/sites/${fileName}`;

  try {
    await runAgentBrowser(['set', 'viewport', ...VIEWPORT], 15000);
    await runAgentBrowser(['open', site.url], 45000);
    await runAgentBrowser(['wait', '--load', 'networkidle'], 30000).catch(() => undefined);
    await runAgentBrowser(['wait', '1200'], 5000);
    await runAgentBrowser(['screenshot', outputFsPath], 30000);

    if (!existsSync(outputFsPath)) {
      throw new Error('screenshot file was not created');
    }

    return {
      ok: true,
      id: site.id,
      name: site.name,
      url: site.url,
      image: publicPath,
      note: 'captured',
    };
  } catch (error) {
    return {
      ok: false,
      id: site.id,
      name: site.name,
      url: site.url,
      image: site.image,
      note: error instanceof Error ? error.message : String(error),
    };
  }
}

async function main() {
  const sites = JSON.parse(await readFile(SITES_PATH, 'utf8'));
  const targetSites = LIMIT > 0 ? sites.slice(0, LIMIT) : sites;
  const results = [];

  await mkdir(IMAGE_DIR, { recursive: true });
  await mkdir(REPORTS_DIR, { recursive: true });

  for (const site of targetSites) {
    console.log(`capturing ${site.id} -> ${site.url}`);
    const result = await capture(site);
    results.push(result);
    if (result.ok) {
      site.image = result.image;
    }
  }

  await writeFile(SITES_PATH, `${JSON.stringify(sites, null, 2)}\n`);

  const rows = results.map((item) => (
    `| ${item.ok ? 'PASS' : 'FAIL'} | ${item.id} | ${item.name} | ${item.image} | ${item.note.replaceAll('|', '/')} |`
  ));

  const report = [
    '# 网站示意图采集报告',
    '',
    `> 生成时间: ${new Date().toISOString()}`,
    `> 视口: ${VIEWPORT[0]}x${VIEWPORT[1]}`,
    `> 范围: ${targetSites.length}/${sites.length}`,
    '',
    '| 结果 | ID | 名称 | 图片路径 | 备注 |',
    '|------|----|------|----------|------|',
    ...rows,
    '',
    '## 说明',
    '',
    '- PASS 的站点已自动更新 `src/data/sites.json` 的 `image` 字段。',
    '- FAIL 的站点保留原占位图，后续可人工处理。',
    '- 截图只代表打开时首屏状态，不等同于内容安全复核。',
    '',
  ].join('\n');

  await writeFile(REPORT_PATH, report);
  console.log(`wrote ${REPORT_PATH.pathname}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
