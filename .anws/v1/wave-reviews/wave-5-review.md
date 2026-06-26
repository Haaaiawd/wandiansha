# Wave 5 Code Review — 2026-06-26

## 1. 总结结论

**Partial Pass**（静态意义下）。

本轮复测确认上一轮 Wave 5 review 的 7 项问题中，3 项已修复（E2E smoke spec 落盘、`performance-check.md` 落盘、`AGENTS.md` Wave 状态更新）。剩余 4 项中，3 项（`tested` 字段回填、INT-S3 E2E 实机证据、T1.3.1 截图证据）已获用户明确授权作为后续优化，不阻断 v1 MVP 关门；1 项 Low（外部 Google Fonts CDN 依赖）作为已知保留风险。代码实现层面、构建/Lint/测试证据链与 S3 集成报告均保持闭合，v1 MVP 功能层面可关门。

---

## 2. 审查范围与静态边界

### 已读输入

- 实现代码：`src/**/*`（含 `App.tsx`、`pages/Home.tsx`、全部组件、`utils/*`、`data/*`、`styles/globals.css`）
- 产品/架构/决策：`01_PRD.md`、`02_ARCHITECTURE_OVERVIEW.md`、`03_ADR/ADR_001_TECH_STACK.md`、`03_ADR/ADR_002_RECOMMENDATION_AND_SAFETY.md`
- 系统设计：`04_SYSTEM_DESIGN/web-app.md`、`recommendation-engine.md`、`content-catalog.md`、`asset-library.md`
- 任务/验证：`05A_TASKS.md`、`05B_VERIFICATION_PLAN.md`
- 质疑/审查：`07_CHALLENGE_REPORT.md`、上一轮 `wave-reviews/wave-5-review.md`
- 工程配置：`package.json`、`vite.config.ts`、`vitest.config.ts`、`tailwind.config.js`、`playwright.config.ts`、`eslint.config.js`、`index.html`
- 新增/更新验证材料：`tests/e2e/smoke.spec.ts`、`reports/performance-check.md`、`reports/INT-S3.md`、`reports/FOLLOW_UP.md`、`AGENTS.md`
- 运行日志：`logs/build.log`、`logs/lint.log`、`logs/test.log`

### 故意未执行

- 未启动项目、未运行浏览器、未执行 E2E、未修改代码。
- 未对 `src/data/sites.json` 逐条打开 URL 做运行时内容复核（已明确授权后续优化）。
- 未生成视觉/响应式截图（已明确授权后续优化）。

### 需人工/运行时验证

- E2E 实机路径（首页 → 抽卡 → 筛选 → 滑动 → 整卡跳转 → 返回 → 空结果）。
- 31 条网站在目标网络环境下的真实可访问性与内容安全。
- 移动端 360px 现场走查与首屏加载实际体验。

---

## 3. 修复验证（逐项验证上轮问题）

| # | 上轮问题 | 严重度 | 当前状态 | 证据 |
|---|---------|--------|---------|------|
| 1 | E2E smoke spec 文件未落盘 | Medium | **已修复** | `tests/e2e/smoke.spec.ts:1-47` 已存在，覆盖首页渲染、抽卡进入卡片页、筛选切换、返回、整卡新标签页打开 |
| 2 | `tested` 字段未回填 | Medium | **未修复，已授权后续优化** | `src/data/sites.json:19`（及全部 31 条记录）仍为 `tested: false`；`reports/content-audit.md:90-91`、`reports/INT-S3.md:46`、`reports/FOLLOW_UP.md:18-22` 明确记录待后续执行 |
| 3 | INT-S3 E2E 实机证据缺失 | Medium | **未修复，已授权后续优化** | `reports/INT-S3.md:47` 仍记录“E2E 浏览器实机验证未执行”；`reports/FOLLOW_UP.md:24-28` 列为后续回填 |
| 4 | T1.3.1 截图证据未产出 | Low | **未修复，已授权后续优化** | `screenshots/` 目录仍不存在；`reports/FOLLOW_UP.md` 未单列截图但图片资产采集含截图证据 |
| 5 | T1.3.2 performance-check 报告缺失 | Low | **已修复** | `reports/performance-check.md:1-42` 已存在，覆盖构建产物、首屏性能、运行时性能与未执行项说明 |
| 6 | AGENTS.md Wave 状态未更新 | Low | **已修复** | `AGENTS.md:166` 已更新为“`/forge` Wave 5 已完成” |
| 7 | 外部 Google Fonts CDN 依赖 | Low | **保留，已知 Low 风险** | `src/styles/globals.css:1` 仍通过 `@import` 引入 Google Fonts；`body`/`h1-h6` 已配置 `system-ui` fallback |

---

## 4. 契约 → 代码映射摘要

| 契约来源 | 核心承诺 | 实现位置 |
|---------|---------|---------|
| PRD §4 US-001/004/005 | 首页产品名、副标题、抽卡按钮、双态筛选，默认国内优先/轻松好玩 | `src/pages/Home.tsx:11-54`、`src/App.tsx:10-13` |
| PRD §4 US-002 | 安全过滤 + 随机推荐 + 空结果提示 | `src/utils/recommend.ts:23-39`、`src/utils/filters.ts:4-6`、`src/App.tsx:44-60` |
| PRD §4 US-003 | 卡片名称/说明/图片/最多 3 个标记，图片兜底 | `src/components/SiteCard.tsx:22-79` |
| PRD §4 US-004 | 国内优先排序，全部模式外网标记 | `src/utils/recommend.ts:29-35`、`src/components/SiteCard.tsx:48-52` |
| PRD §4 US-005 | 内容倾向排序 | `src/utils/filters.ts:26-31`、`src/utils/recommend.ts:18-21` |
| PRD §4 US-006 | 整卡新页面打开外部网站 | `src/components/SiteCard.tsx:26-36`、`src/utils/openExternal.ts:3-14` |
| PRD §4 US-007 | `sites.json` 字段/安全/schema 校验 | `src/data/siteSchema.ts:41-143`、`src/data/siteTypes.ts:5-19`、`src/data/sites.ts:5-9` |
| ADR_001 | React + Vite + TypeScript + Tailwind + local JSON | `package.json:16-42`、`vite.config.ts`、`tailwind.config.js` |
| ADR_002 | 安全过滤顺序、http/https 跳转、`noopener,noreferrer` | `src/utils/filters.ts:4-6`、`src/utils/openExternal.ts:1-10`、`src/components/SiteCard.tsx:28-29` |
| 04_SYSTEM_DESIGN/web-app.md §4 | 空结果/加载失败/图片缺失/非法 URL 错误语义 | `src/App.tsx:35-42`、`src/App.tsx:44-60`、`src/components/SiteCard.tsx:44-46`、`src/utils/openExternal.ts:6-8` |
| 04_SYSTEM_DESIGN/recommendation-engine.md §3 | 公开函数签名 | `src/utils/recommend.ts:41`、`src/utils/filters.ts:8-31` |
| 04_SYSTEM_DESIGN/content-catalog.md §2-3 | Site 类型与 schema 约束 | `src/data/siteTypes.ts:5-19`、`src/data/siteSchema.ts:41-143` |
| 04_SYSTEM_DESIGN/asset-library.md §2 | 占位图与图片路径可解析 | `public/images/placeholders/toy-default.svg`、`public/images/sites/`、`tests/api/assets.contract.test.ts:10-25` |

---

## 5. Lens 结果摘要

- **L1 契约忠实度：Pass**。公开函数签名、`FilterState` 默认值、安全过滤顺序、跳转白名单与 `noopener,noreferrer`、空结果文案、卡片标记数量、图片兜底均与 PRD/ADR/System Design 一致。
- **L2 任务兑现与交付闭合：Pass（含已授权后续优化）**。T1.3.1/T1.3.2/T1.3.3/T3.2.1 的核心代码/报告已交付；缺失的 E2E 实机、`tested` 回填、截图已明确转入 `reports/FOLLOW_UP.md` 并在 `reports/INT-S3.md` 中声明不影响 MVP。
- **L3 架构适配与复杂度健康：Pass**。模块边界与系统图一致；推荐逻辑纯函数可独立测试；UI 状态集中在 `App.tsx`；无过度抽象或循环依赖。
- **L4 静态运行风险与安全边界：Pass（含 Low 备注）**。URL 协议白名单、`noopener,noreferrer`、安全过滤、错误边界、数据校验均落实。外部字体 CDN 为现场网络引入轻微不确定性，但已有 fallback。
- **L5 验证证据与可观测性：Partial Pass**。12 测试文件/67 用例覆盖核心契约；E2E spec 已落盘但尚未实机执行，运行时内容复核与截图证据缺失（已授权后续优化）。
- **L6 回流一致性与交接证据：Pass**。`05A_TASKS.md` 状态已更新为 Complete；`AGENTS.md` Wave 块已更新；INT-S3/content-audit/assets-audit/FOLLOW_UP 已落盘并明确后续责任。

---

## 6. Issues

### Critical

无。

### High

无。

### Medium

无。上轮两个未修复 Medium（`tested` 回填、INT-S3 E2E 实机证据）已获用户明确授权作为后续优化，不阻断 MVP，不列入当前活动问题。

### Low

| Severity | Lens | Title | Evidence | Impact | Minimum fix | Anchor |
|----------|------|-------|----------|--------|-------------|--------|
| Low | L4 | 外部 Google Fonts CDN 依赖（保留已知风险） | `src/styles/globals.css:1` 通过 `@import` 引入 Google Fonts；`body`/`h1-h6` 已配置 `system-ui` fallback | 现场网络可能无法访问 Google Fonts，导致字体回退，影响视觉一致性 | 自托管字体，或增加更完善的本地字体 fallback 策略 | PRD §6.1 性能底线 |

---

## 7. 已接受后续优化项（不阻断 MVP）

以下问题未修复，但已记录于 `reports/INT-S3.md` 与 `reports/FOLLOW_UP.md`，并获用户授权作为 v1 MVP 关门后的后续优化：

| 原严重度 | 事项 | 记录位置 |
|----------|------|---------|
| Medium | 全部 31 条网站 `tested` 字段仍为 `false`，运行时内容复核待执行 | `src/data/sites.json:19`、`reports/content-audit.md:90-91`、`reports/FOLLOW_UP.md:18-22` |
| Medium | INT-S3 E2E 浏览器实机验证未执行，实机证据缺失 | `reports/INT-S3.md:47`、`reports/FOLLOW_UP.md:24-28` |
| Low | T1.3.1 视觉/响应式截图证据未产出 | `05A_TASKS.md:190`、`reports/FOLLOW_UP.md`（含图片资产采集） |
| Low | 31 条网站全部使用占位图，真实截图待采集 | `reports/assets-audit.md`、`reports/FOLLOW_UP.md:5-17` |

---

## 8. 安全 / 测试覆盖补充

### 安全边界

- **内容安全**：默认推荐路径经过 `filterSafeSites`（`safeLevel >= 4` 且 `childFriendly === true`），与 ADR_002 一致。
- **外部跳转**：`openExternal` 仅允许 `http:`/`https:`，并使用 `window.open(url, '_blank', 'noopener,noreferrer')`；`SiteCard` 的 `<a>` 标签也显式设置 `rel="noopener noreferrer"`。
- **数据注入**：`sites.json` 通过 `validateSites` 校验字段类型、URL 协议、`contentMode` 枚举、image 路径前缀、id 唯一性；未通过校验时应用降级为空数组并显示加载失败提示，避免空白页或脏数据进入推荐。
- **运行时错误**：`AppErrorBoundary` 捕获渲染期异常并展示友好提示，但当前未实现 `componentDidCatch` 日志记录，排障时缺少堆栈信息（Low，不影响 MVP）。

### 测试覆盖

- **已覆盖**：推荐规则（18 例）、schema 与非法样本（11 例）、assets 路径（3 例）、openExternal 安全契约（4 例）、组件交互（24 例）、集成推荐流（3 例），合计 67 例全绿。
- **新增覆盖**：`tests/e2e/smoke.spec.ts:1-47` 已覆盖首页渲染、抽卡、筛选、返回、整卡外部跳转关键路径，但尚未实机执行。
- **未覆盖/需回填**：
  - E2E 浏览器实机冒烟（已授权后续优化）。
  - 运行时内容安全与可用性复核（`tested` 字段，已授权后续优化）。
  - 真实截图场景（当前 31 条全部使用占位图，已转入 `FOLLOW_UP.md`）。

---

## 9. 落盘确认

- 审查报告已写入：**`D:\PROJECTALL\玩点啥\.anws\v1\wave-reviews\wave-5-review.md`**
- 首行格式：`# Wave 5 Code Review — 2026-06-26`
