# Wave 4 Code Review — 2026-06-26

## 1. 总结结论

**Partial Pass（静态意义下）**。

上一轮审查发现的 High/Medium/Low 三项问题均已修复：`wave-4-e2e.md` 已按真实 UI/PRD 重写，`tests/integration/recommendation-flow.test.tsx` 已补齐，`reports/INT-S2.md` 术语已改为“横向卡片页”。Wave 4 实现侧（首页、筛选、抽卡、横向卡片页、整卡跳转、空状态、错误边界、推荐纯函数、数据契约、图片兜底）与 PRD / ADR / System Design / 05A / 05B 整体一致。

但交付证据层出现新的 **Medium** 不一致：`05A_TASKS.md` 中 INT-S2 仍标记为未完成，而 `reports/INT-S2.md` 已宣布 S2 关门；且 `reports/INT-S2.md` 的测试统计（10 文件 / 64 例）与当前静态测试套件规模（12 文件 / 67 例）不符。另有 Low 级测试/运行风险缺口。因此本轮结论为 Partial Pass，最高严重级别 Medium。

## 2. 审查范围与静态边界

**已读**：
- 全部实现代码：`src/App.tsx`、`src/pages/Home.tsx`、`src/components/*`、`src/utils/*`、`src/data/*`、`src/styles/*`。
- 全部架构/契约文档：`.anws/v1/01_PRD.md`、`.anws/v1/02_ARCHITECTURE_OVERVIEW.md`、`.anws/v1/03_ADR/*.md`、`.anws/v1/04_SYSTEM_DESIGN/*.md`、`.anws/v1/05A_TASKS.md`、`.anws/v1/05B_VERIFICATION_PLAN.md`、`.anws/v1/07_CHALLENGE_REPORT.md`。
- 工程配置：`package.json`、`vite.config.ts`、`vitest.config.ts`、`tailwind.config.js`、`postcss.config.js`、`eslint.config.js`、`playwright.config.ts`、`tsconfig.json`、`index.html`。
- 全部测试代码：`tests/unit/*.test.ts`、`tests/api/*.contract.test.ts`、`tests/components/*.test.tsx`、`tests/integration/recommendation-flow.test.tsx`。
- 验收/交接文档：`.anws/v1/wave-reviews/wave-4-review.md`（上一轮）、`.anws/v1/wave-reviews/wave-4-e2e.md`、`reports/INT-S2.md`。
- 静态资产：`public/images/placeholders/toy-default.svg`、`public/images/sites/`（空目录）。

**故意未执行**：
- 未运行 `pnpm install` / `pnpm build` / `pnpm test` / 浏览器；所有“通过/失败”结论均来自已落盘的报告与静态阅读，静态审查本身不验证运行时行为。
- 未执行 Playwright E2E（浏览器未实机，且本次为 S2 guide-only）。

**需人工/实机验证**：
- 横向滑动手感、触屏 scroll-snap、hover/active 反馈、360px 移动端首屏主按钮可见性。
- 真实浏览器中整卡跳转是否在新标签页打开且 `noopener,noreferrer` 生效。
- `pnpm test` 在当前 12 文件 / 67 例规模下是否全部通过（用于修正 `reports/INT-S2.md` 统计）。

## 3. 修复验证

| 上轮问题 | 严重度 | 修复证据 | 结论 |
|---|---|---|---|
| `wave-4-e2e.md` 描述与实际 UI/PRD 严重漂移 | High | RTM 仅引用 REQ-001~008：`.anws/v1/wave-reviews/wave-4-e2e.md:25-32`；Surface coverage 描述为“双态 pill 开关”“横向卡片页”“整卡点击跳转”：`.anws/v1/wave-reviews/wave-4-e2e.md:38-47`；已无 REQ-012/013/015、“手气不错”、“弹窗”等不实描述 | 已修复 |
| 缺少 `tests/integration/recommendation-flow.test.tsx` | Medium | 文件已存在并覆盖默认抽卡、筛选变化到结果、空结果三条路径：`tests/integration/recommendation-flow.test.tsx:1-78` | 已修复 |
| `reports/INT-S2.md` 术语“弹窗”与实际横向卡片页不符 | Low | 已改为“整卡横向卡片页可渲染”：`reports/INT-S2.md:20` | 已修复 |

## 4. Lens 结果摘要

- **L1 契约忠实度**：Pass。默认 `FilterState`、安全过滤、网络/内容排序、卡片信息密度、空结果/加载失败文案、`http/https` + `noopener,noreferrer` 跳转均与 PRD / ADR / System Design 一致。
- **L2 任务兑现与交付闭合**：Mostly Pass。T1.2.1~T1.2.5 的组件、测试、集成测试已交付；但 `05A_TASKS.md:375` 中 INT-S2 仍为 `[ ]`，与 `reports/INT-S2.md:56-58` 的“S2 可关门”结论冲突。
- **L3 架构适配与复杂度健康**：Pass。四系统边界清晰；`recommendation-engine` 为纯函数；`web-app` 通过 React state 管理；无循环依赖。
- **L4 静态运行风险与安全边界**：Mostly Pass。协议白名单、数据校验、错误兜底已落实；但 JSON 语法级损坏在模块加载期抛出，当前 `AppErrorBoundary` 无法捕获。
- **L5 验证证据与可观测性**：Mostly Pass。12 个测试文件 / 67 个 `it` 用例覆盖核心推荐、schema、跳转、UI 交互；但缺少 `sitesLoadError` 与 `AppErrorBoundary` 的直接断言。
- **L6 回流一致性与交接证据**：Partial Pass。`wave-4-e2e.md` 与 INT-S2 术语已修正；但 05A 任务状态和 INT-S2 报告统计未与当前代码同步。

## 5. Issues

### Medium

| Severity | Lens | Title | Evidence | Impact | Minimum fix | Anchor |
|---|---|---|---|---|---|---|
| Medium | L6 | `05A_TASKS.md` 中 INT-S2 完成状态未同步 | `05A_TASKS.md:375` 中 INT-S2 仍为 `[ ]`；`reports/INT-S2.md:56-58` 已宣布“S2 可关门并进入 Wave 5 / S3” | 任务注册表与交付证据不一致，下游可能误判 S2 是否已关门 | 将 `05A_TASKS.md:375` 的 INT-S2 标记为 `[x]`，并更新日期/证据引用 | `05A_TASKS.md` INT-S2、`reports/INT-S2.md` |
| Medium | L6 | `reports/INT-S2.md` 测试统计与当前测试套件规模不符 | `reports/INT-S2.md:24-25` 写“测试文件：10 passed / 测试用例：64 passed”；对 `tests/**/*.test.*` 中 `it(` 静态计数为 12 文件 / 67 例 | 冒烟报告证据不可信，无法直接作为 S2 关门依据 | 执行 `pnpm test` 后更新 INT-S2 的测试文件数、用例数与日志引用；若未实跑，则显式说明统计口径 | `05B_VERIFICATION_PLAN.md` INT-S2、`reports/INT-S2.md` |

### Low

| Severity | Lens | Title | Evidence | Impact | Minimum fix | Anchor |
|---|---|---|---|---|---|---|
| Low | L5 | 缺少 `sitesLoadError` 与 `AppErrorBoundary` 的直接组件/集成断言 | `tests/components/EmptyState.test.tsx:6-9` 仅做通用渲染断言；没有测试模拟 `src/data/sites` 返回 `sitesLoadError` 或触发 `AppErrorBoundary` 的渲染异常 | 数据加载失败与运行时崩溃兜底路径缺少自动化回归，后续重构可能误删 | 补一个 App 级测试：mock `src/data/sites` 使 `sitesLoadError` 非空，断言“网站库加载失败”文案出现；或模拟子组件抛错验证错误边界 | PRD US-001 异常处理、`05B_VERIFICATION_PLAN.md` T1.2.4 |
| Low | L4 | `sites.json` JSON 语法级损坏不在错误边界捕获范围内 | `src/data/sites.ts:2` 在模块加载期静态 `import` JSON；`src/components/AppErrorBoundary.tsx:18-20` 仅捕获渲染期异常 | 若提交后的 `sites.json` 出现 JSON 语法错误，用户会白屏而非看到 `EmptyState`；但构建/CI 可提前拦截 | 在 CI 或 `pnpm build` 前置步骤中加 JSON 语法校验；或在 INT-S2/INT-S3 中记录该已知边界 | PRD US-001 异常处理、`04_SYSTEM_DESIGN/web-app.md` §4 |

## 6. 安全 / 测试覆盖补充

- **外部跳转安全**：`src/utils/openExternal.ts:1-14` 已实现 `http/https` 白名单 + `noopener,noreferrer`；`src/components/SiteCard.tsx:12-22` 也自带 `rel="noopener noreferrer" target="_blank"`，形成双重保护。该契约由 `tests/api/openExternal.contract.test.ts:5-34` 覆盖。
- **数据加载失败（校验失败路径）**：`src/data/sites.ts:5-8` 在 `sites.json` 校验失败时导出空数组 + 错误字符串；`src/App.tsx:35-42` 渲染 `EmptyState`。该路径由 `tests/api/sites-schema.contract.test.ts:24-97` 的非法样本间接覆盖，但缺少直接 UI 断言。
- **JSON 语法级损坏**：见 Low L4 条目；属于模块加载期异常，建议用构建/CI 前置校验闭合。
- **真实截图资产**：当前 `public/images/sites/` 为空，`src/data/sites.json` 中 31 条记录均引用占位图 `toy-default.svg`，符合 T4.1.1 占位策略，但视觉差异化需在 S3 T3.2.1 复核。
- **E2E 未执行**：`playwright.config.ts:1-29` 已配置 Chromium 与 Mobile Chrome 项目，但浏览器未实机；S3 回填 `wave-4-e2e.md` 后再执行。
- **人工验证项**：横向滑动手感、触屏 scroll-snap、360px 首屏可见性、真实浏览器跳转属性、构建/测试实际通过率。
