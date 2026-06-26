# Wave 4 Code Review — 2026-06-26

## 1. 总结结论

**Pass（静态意义下）**。

上一轮审查的两项 Medium 问题均已修复：`05A_TASKS.md:375` 中 INT-S2 已勾选为 `[x]`；`reports/INT-S2.md:24-25` 的测试统计已更新为 12 文件 / 67 例，与当前 `tests/**/*.test.*` 静态计数一致。Wave 4 实现侧（首页、筛选、抽卡、横向卡片页、整卡跳转、空状态、错误边界、推荐纯函数、数据契约、图片兜底）与 PRD / ADR / System Design / 05A / 05B 整体一致，S2 Playable UI 波末可关门。

仅余一处 Low 级报告文本残留不一致，非阻断。

## 2. 审查范围与静态边界

**已读**：
- 全部实现代码：`src/App.tsx`、`src/pages/Home.tsx`、`src/components/*`、`src/utils/*`、`src/data/*`、`src/styles/*`。
- 全部架构/契约文档：`.anws/v1/01_PRD.md`、`.anws/v1/02_ARCHITECTURE_OVERVIEW.md`、`.anws/v1/03_ADR/*.md`、`.anws/v1/04_SYSTEM_DESIGN/*.md`、`.anws/v1/05A_TASKS.md`、`.anws/v1/05B_VERIFICATION_PLAN.md`、`.anws/v1/07_CHALLENGE_REPORT.md`。
- 工程配置：`package.json`、`vite.config.ts`、`vitest.config.ts`。
- 全部测试代码：`tests/unit/*.test.ts`、`tests/api/*.contract.test.ts`、`tests/components/*.test.tsx`、`tests/integration/recommendation-flow.test.tsx`。
- 验收/交接文档：`.anws/v1/wave-reviews/wave-4-review.md`（上一轮）、`.anws/v1/wave-reviews/wave-4-e2e.md`、`reports/INT-S2.md`。
- 静态资产：`public/images/placeholders/toy-default.svg`、`public/images/sites/`（空目录，占位策略）。

**故意未执行**：
- 未运行 `pnpm install` / `pnpm build` / `pnpm test` / 浏览器；所有“通过/失败”结论均来自已落盘的报告与静态阅读，静态审查本身不验证运行时行为。
- 未执行 Playwright E2E（浏览器未实机，且本次为 S2 guide-only）。

**需人工/实机验证**：
- 横向滑动手感、触屏 scroll-snap、hover/active 反馈、360px 移动端首屏主按钮可见性。
- 真实浏览器中整卡跳转是否在新标签页打开且 `noopener,noreferrer` 生效。
- `pnpm test` 在当前 12 文件 / 67 例规模下是否全部通过。

## 3. 修复验证

| 上轮问题 | 严重度 | 修复证据 | 结论 |
|---|---|---|---|
| `05A_TASKS.md` 中 INT-S2 完成状态未同步 | Medium | `05A_TASKS.md:375` 已由 `[ ]` 改为 `[x]`；依赖链 T1.2.5 → INT-S2 已闭合 | 已修复 |
| `reports/INT-S2.md` 测试统计与当前测试套件规模不符 | Medium | `reports/INT-S2.md:24-25` 已更新为“测试文件：12 passed / 测试用例：67 passed”；`tests/**/*.test.*` 静态计数为 12 文件 / 67 例 | 已修复 |

## 4. Lens 结果摘要

- **L1 契约忠实度**：Pass。默认 `FilterState`（`src/App.tsx:10-13`）、安全过滤（`src/utils/filters.ts:4-6`）、网络/内容排序（`src/utils/recommend.ts:23-39`）、卡片信息密度（`src/components/SiteCard.tsx:9` 截 3 标签）、空结果/加载失败文案（`src/App.tsx:37-48`）、`http/https` + `noopener,noreferrer` 跳转（`src/utils/openExternal.ts:1-14`、`src/components/SiteCard.tsx:12-22`）均与 PRD / ADR / System Design 一致。
- **L2 任务兑现与交付闭合**：Pass。T1.2.1~T1.2.5 的组件、测试、集成测试已交付；INT-S2 已完成勾选；`tests/integration/recommendation-flow.test.tsx` 已覆盖默认抽卡、筛选变化、数据加载失败三条路径。
- **L3 架构适配与复杂度健康**：Pass。四系统边界清晰；`recommendation-engine` 为纯函数；`web-app` 通过 React state 管理；无循环依赖。
- **L4 静态运行风险与安全边界**：Pass。协议白名单、数据校验、错误兜底已落实；`AppErrorBoundary` 捕获渲染期异常；JSON 语法级损坏属于模块加载期异常，由构建/CI 前置校验闭合。
- **L5 验证证据与可观测性**：Pass。12 个测试文件 / 67 个 `it` 用例覆盖核心推荐、schema、跳转、UI 交互；`tests/integration/recommendation-flow.test.tsx:72-84` 已直接断言 `sitesLoadError` 场景。
- **L6 回流一致性与交接证据**：Mostly Pass。`wave-4-e2e.md` 与 INT-S2 术语已修正；05A 任务状态和 INT-S2 报告主统计已同步；但 `reports/INT-S2.md:59` 结论处仍残留“64 例”旧文本。

## 5. Issues

### Low

| Severity | Lens | Title | Evidence | Impact | Minimum fix | Anchor |
|---|---|---|---|---|---|---|
| Low | L6 | `reports/INT-S2.md` 结论处仍残留“组件测试 64 例全绿”旧文本 | `reports/INT-S2.md:59` 写“组件测试 64 例全绿”；同文件 `reports/INT-S2.md:24-25` 已更新为 67 例 | 报告内部前后统计不一致，可能被下游误认为还有未同步的测试集 | 将 `reports/INT-S2.md:59` 改为“组件测试 67 例全绿”或与正文测试统计口径一致 | `05A_TASKS.md` INT-S2、`reports/INT-S2.md` |

## 6. 安全 / 测试覆盖补充

- **外部跳转安全**：`src/utils/openExternal.ts:1-14` 已实现 `http/https` 白名单 + `noopener,noreferrer`；`src/components/SiteCard.tsx:12-22` 也自带 `rel="noopener noreferrer" target="_blank"`，形成双重保护。该契约由 `tests/api/openExternal.contract.test.ts:5-34` 覆盖。
- **数据加载失败（校验失败路径）**：`src/data/sites.ts:5-8` 在 `sites.json` 校验失败时导出空数组 + 错误字符串；`src/App.tsx:35-42` 渲染 `EmptyState`。该路径已由 `tests/integration/recommendation-flow.test.tsx:72-84` 直接断言。
- **JSON 语法级损坏**：属于模块加载期异常，建议用构建/CI 前置校验闭合；当前 `src/data/sites.json` 可被 Vite 静态导入解析。
- **真实截图资产**：当前 `public/images/sites/` 为空，`src/data/sites.json` 中所有记录均引用占位图 `toy-default.svg`，符合 T4.1.1 占位策略；视觉差异化需在 S3 T3.2.1 复核。
- **E2E 未执行**：`playwright.config.ts` 已配置（由 T1.1.1 产出），但浏览器未实机；S3 回填 `wave-4-e2e.md` 后再执行。
- **人工验证项**：横向滑动手感、触屏 scroll-snap、360px 首屏可见性、真实浏览器跳转属性、构建/测试实际通过率。
