# Wave 4 Code Review — 2026-06-26

## 1. 总结结论

**Partial Pass（静态意义下）**。

Wave 4 的实现代码（首页双态筛选、抽卡、横向卡片页、整卡跳转、空状态、错误边界、推荐纯函数、数据契约、图片兜底）与 PRD / ADR / System Design / 05A / 05B 基本一致；现有 64 例组件/单元/API 测试对核心契约有覆盖。但交付物中存在 **高严重度的交接文档漂移**：`.anws/v1/wave-reviews/wave-4-e2e.md` 描述的是一个与当前实现和 PRD 不符的 UI（标签栏、卡片网格、弹窗、"手气不错"），且引用了 PRD 中不存在的 REQ-012/013/015；该 guide 无法用于 S2/S3 人工验证。此外，T1.2.3 承诺的集成测试文件 `tests/integration/recommendation-flow.test.tsx` 缺失。

## 2. 审查范围与静态边界

**已读**：
- 全部实现代码：`src/App.tsx`、`src/pages/Home.tsx`、`src/components/*`、`src/utils/*`、`src/data/*`、`src/styles/*`。
- 全部架构/契约文档：`.anws/v1/01_PRD.md`、`.anws/v1/02_ARCHITECTURE_OVERVIEW.md`、`.anws/v1/03_ADR/*.md`、`.anws/v1/04_SYSTEM_DESIGN/*.md`、`.anws/v1/05A_TASKS.md`、`.anws/v1/05B_VERIFICATION_PLAN.md`、`.anws/v1/07_CHALLENGE_REPORT.md`。
- 工程配置：`package.json`、`vite.config.ts`、`vitest.config.ts`、`tailwind.config.js`、`postcss.config.js`、`eslint.config.js`、`playwright.config.ts`、`tsconfig*.json`、`index.html`。
- 全部测试代码：`tests/unit/*.test.ts`、`tests/api/*.contract.test.ts`、`tests/components/*.test.tsx`。
- 验收报告：`reports/INT-S1.md`、`reports/INT-S2.md`、`reports/assets-audit.md`、`.anws/v1/wave-reviews/wave-4-e2e.md`。
- 静态资产目录：`public/images/placeholders/toy-default.svg`、`public/images/sites/`（空）。

**故意未执行**：
- 未运行 `pnpm install` / `pnpm build` / `pnpm test` / 浏览器；所有"通过/失败"结论均来自已落盘的报告（`reports/INT-S2.md` 称 64 passed、build/lint 通过），静态审查本身不验证运行时行为。
- 未执行 Playwright E2E（浏览器未安装，且本次为 S2 guide-only）。

**需人工/实机验证**：
- 横向滑动手感、触屏 scroll-snap、hover/active 反馈、360px 移动端首屏可见性。
- 真实浏览器中整卡跳转是否在新标签页打开且 `noopener,noreferrer` 生效。
- `sites.json` JSON 语法损坏时的白屏风险（当前错误边界只捕获渲染期异常，不捕获模块加载期 JSON 解析异常）。

## 3. 契约 → 代码映射摘要

| 核心承诺 | 实现区域 |
|---|---|
| 首页产品名、副标题、抽卡按钮、两个双态开关 | `src/pages/Home.tsx:11-48` |
| 默认 FilterState：国内优先 + 轻松好玩 | `src/App.tsx:10-13`、`src/pages/Home.tsx:8-11` |
| 安全过滤 `safeLevel >= 4` 且 `childFriendly = true` | `src/data/siteSchema.ts:141-143`、`src/utils/filters.ts:4-6` |
| 国内优先排序 + 全部模式外网标记 | `src/utils/recommend.ts:23-39`、`src/components/SiteCard.tsx:34-38` |
| 内容倾向排序 + 分组内随机打乱 | `src/utils/recommend.ts:18-21`、`src/utils/filters.ts:26-32`、`src/utils/shuffle.ts:12-22` |
| 卡片仅展示名称、1-2 句话说明、图片、最多 3 个标记 | `src/components/SiteCard.tsx:8-61`（说明使用 `line-clamp-2`，标签 `slice(0, 3)`） |
| 图片缺失占位图 | `public/images/placeholders/toy-default.svg`、`src/components/SiteCard.tsx:30-32` |
| 整卡新页跳转，`http/https` 白名单，`noopener,noreferrer` | `src/utils/openExternal.ts:1-14`、`src/components/SiteCard.tsx:12-22` |
| 空结果提示文案 | `src/App.tsx:44-60` |
| 本地数据加载失败友好提示 | `src/data/sites.ts:1-10`、`src/App.tsx:35-42`、`src/components/AppErrorBoundary.tsx:12-33` |
| `sites.json` schema 唯一源、字段校验、URL/image 约束 | `src/data/siteSchema.ts:37-143`、`tests/api/sites-schema.contract.test.ts` |

## 4. Lens 结果摘要

- **L1 契约忠实度**：实现侧公共类型、函数签名、默认状态、错误文案、跳转安全属性与 PRD/ADR/System Design 一致。例外：E2E 验证指南 `wave-4-e2e.md` 描述的界面契约与真实代码/PRD 严重偏离。
- **L2 任务兑现与交付闭合**：T1.2.1~T1.2.4 的组件与工具函数已交付；T1.2.5 的组件测试已交付（10 文件 / 64 例）。T1.2.3 承诺的 `tests/integration/recommendation-flow.test.tsx` 未交付。
- **L3 架构适配与复杂度健康**：四系统边界清晰；`recommendation-engine` 为纯函数；`web-app` 通过 React state 管理；无循环依赖。`sortByNetworkMode` 被导出但 `recommendSites` 内部使用自有的 `isDomesticFriendly` 过滤逻辑，属于实现细节，不构成架构漂移。
- **L4 静态运行风险与安全边界**：`openExternal` 协议白名单与 `noopener,noreferrer` 已落实；数据经 `validateSites` 后使用；`sitesLoadError` 兜底空/非法数据。JSON 语法级损坏会在模块加载期抛错，错误边界无法捕获，但属于构建期可检出问题。
- **L5 验证证据与可观测性**：单元/API/组件测试覆盖核心推荐规则、schema、跳转、UI 可见性与交互。缺失专用的 filter→carousel 集成测试文件；E2E 指南不可用，导致 INT-S2 手动验证证据无法回填。
- **L6 回流一致性与交接证据**：`INT-S2.md` 与 `assets-audit.md` 已落盘；`wave-4-e2e.md` 作为 INT-S2 引用的交接物，其内容与实际实现/PRD 不一致，构成交接风险。无 README/changelog 更新要求，未予审查。

## 5. Issues

### High

| Severity | Lens | Title | Evidence | Impact | Minimum fix | Anchor |
|---|---|---|---|---|---|---|
| High | L6 + L1 | E2E 手动验证指南与真实 UI/PRD 严重漂移 | `.anws/v1/wave-reviews/wave-4-e2e.md:23-31` 引用不存在的 REQ-012/013/015；`wave-4-e2e.md:35-43` 描述"首页顶部横向标签""6 张卡片网格""手气不错""整卡弹窗"；真实实现为 `src/pages/Home.tsx:11-48` 的两个双态开关 + `src/components/CardCarousel.tsx:11-46` 的横向卡片页 | S3 人工验证/E2E 无法按 guide 执行；若直接照此跑 E2E 会得出错误结论，阻塞发布前走查 | 重写 `wave-4-e2e.md`，使其旅程、步骤、PRD 引用与实际组件（`Home`、`FilterSwitch`、`RandomButton`、`CardCarousel`、`SiteCard`、`EmptyState`）及 PRD REQ-001~008 一致 | 05B `INT-S2`、PRD §4 US-001~008、02_ARCHITECTURE_OVERVIEW §2 web-app |

### Medium

| Severity | Lens | Title | Evidence | Impact | Minimum fix | Anchor |
|---|---|---|---|---|---|---|
| Medium | L2 + L5 | 缺少 T1.2.3 承诺的集成测试文件 | `05A_TASKS.md:125` 将 `tests/integration/recommendation-flow.test.tsx` 列为 T1.2.3 证据产出；`tests/` 目录下无 `integration/` 子目录（见 `glob tests/**/*`） | 筛选状态变化到卡片流更新的跨模块链路缺少专用自动化契约； relied on 组件测试 + 手动冒烟 | 补一个最小集成测试（渲染 `App`，切换 filter，断言 `CardCarousel` 内容变化），或在 05A/05B 中显式移除该产出并说明替代覆盖 | 05A T1.2.3、05B §T1.2.3 |

### Low

| Severity | Lens | Title | Evidence | Impact | Minimum fix | Anchor |
|---|---|---|---|---|---|---|
| Low | L6 | INT-S2 报告术语与真实 UI 不符 | `reports/INT-S2.md:19` 写"整卡弹窗可渲染"，真实实现为全屏横向卡片页 `src/components/CardCarousel.tsx:11-46` | 阅读者可能误解交互形态；无功能影响 | 将"弹窗"改为"横向卡片页"或"卡片流" | PRD US-002/US-006、02_ARCHITECTURE_OVERVIEW web-app |

## 6. 安全 / 测试覆盖补充

- **外部跳转安全**：`src/utils/openExternal.ts:1-14` 已实现 `http/https` 白名单 + `noopener,noreferrer`；`src/components/SiteCard.tsx:12-22` 也自带 `rel="noopener noreferrer" target="_blank"`，形成双重保护。该契约由 `tests/api/openExternal.contract.test.ts:5-34` 覆盖。
- **数据加载失败**：`src/data/sites.ts:5-8` 在 `sites.json` 校验失败时导出空数组 + 错误字符串；`src/App.tsx:35-42` 渲染 `EmptyState`。该路径由 `tests/api/sites-schema.contract.test.ts:24-97` 的非法样本间接覆盖，但**未在组件测试中直接断言错误文案**。
- **JSON 语法级损坏**：若 `src/data/sites.json` 出现 JSON 语法错误，Vite 的 JSON import 会在模块加载期抛出，早于 `AppErrorBoundary` 捕获范围，可能导致白屏。此风险无法通过当前运行时错误边界消除，建议通过构建/CI 前置校验 JSON 语法（`pnpm build` 已可检出）。
- **真实截图资产**：`reports/assets-audit.md` 记录 31/31 使用占位图，0 真实图；符合 T4.1.1 占位策略，但视觉差异化将在 S3 T3.2.1 复核。
- **测试统计**：`reports/INT-S2.md:24-25` 称 10 测试文件 / 64 用例全绿；静态审查未重新执行，该数字以报告为准。
- **E2E 未执行**：Playwright 配置存在（`playwright.config.ts:1-29`），但 E2E 浏览器未实机；S3 需回填或重写 `wave-4-e2e.md` 后再执行。
