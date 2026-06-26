# Wave 5 Code Review — 2026-06-26

## 1. 总结结论

**Partial Pass**（静态意义下）。

代码实现层面已覆盖 Wave 5 全部任务的核心契约：视觉/响应式打磨、内容复核字段、可访问性、性能关注点和 E2E 用例设计均已在源码或报告中落地；构建、Lint、单元/组件/API/集成测试 67 例全绿（`logs/test.log`）。但 Wave 5 作为 S3 Event Ready 关门波次，仍有若干交付证据缺口：**E2E 冒烟 spec 文件未落盘**、`tested` 字段未回填、INT-S3 要求的 E2E 实机证据与部分截图/性能报告缺失。这些问题不阻断当前代码运行，但需在上线前回填或显式豁免，方可视为 S3 完全关门。

---

## 2. 审查范围与静态边界

### 已读输入

- 实现代码：`src/**/*`（含 `App.tsx`、`pages/Home.tsx`、全部组件、`utils/*`、`data/*`、`styles/globals.css`）
- 产品/架构/决策：`01_PRD.md`、`02_ARCHITECTURE_OVERVIEW.md`、`03_ADR/ADR_001_TECH_STACK.md`、`03_ADR/ADR_002_RECOMMENDATION_AND_SAFETY.md`
- 系统设计：`04_SYSTEM_DESIGN/web-app.md`、`recommendation-engine.md`、`content-catalog.md`、`asset-library.md`
- 任务/验证：`05A_TASKS.md`、`05B_VERIFICATION_PLAN.md`
- 质疑/审查：`07_CHALLENGE_REPORT.md`
- 工程配置：`package.json`、`vite.config.ts`、`vitest.config.ts`、`tailwind.config.js`、`playwright.config.ts`、`eslint.config.js`、`index.html`
- 验证报告：`reports/INT-S3.md`、`reports/accessibility-check.md`、`reports/e2e-plan.md`、`reports/content-audit.md`、`reports/assets-audit.md`、`reports/FOLLOW_UP.md`、`reports/INT-S1.md`、`reports/INT-S2.md`
- 运行日志：`logs/build.log`、`logs/lint.log`、`logs/test.log`

### 故意未执行

- 未启动项目、未运行浏览器、未执行 E2E、未修改代码。
- 未对 `src/data/sites.json` 逐条打开 URL 做运行时内容复核（该工作明确归属内容维护者人工任务）。

### 需人工/运行时验证

- E2E 实机路径（首页 → 抽卡 → 筛选 → 滑动 → 整卡跳转 → 返回 → 空结果）。
- 31 条网站在目标网络环境下的真实可访问性与内容安全。
- 移动端 360px 现场走查与首屏加载实际体验。

---

## 3. 契约 → 代码映射摘要

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

## 4. Lens 结果摘要

- **L1 契约忠实度：Pass**。公开函数签名、`FilterState` 默认值、安全过滤顺序、跳转白名单与 `noopener,noreferrer`、空结果文案、卡片标记数量、图片兜底均与 PRD/ADR/System Design 一致。
- **L2 任务兑现与交付闭合：Partial Pass**。T1.3.1/T1.3.2/T1.3.3/T3.2.1 的核心代码/报告已交付，但部分输出物（E2E spec、截图、performance-check.md、`tested` 回填）缺失或未闭环。
- **L3 架构适配与复杂度健康：Pass**。模块边界与系统图一致；推荐逻辑纯函数可独立测试；UI 状态集中在 `App.tsx`；无过度抽象或循环依赖。
- **L4 静态运行风险与安全边界：Pass（含 Low 备注）**。URL 协议白名单、`noopener,noreferrer`、安全过滤、错误边界、数据校验均落实。外部字体 CDN 为现场网络引入轻微不确定性。
- **L5 验证证据与可观测性：Partial Pass**。12 测试文件/67 用例覆盖核心契约；E2E 浏览器实机与运行时内容复核未执行，相关证据缺失。
- **L6 回流一致性与交接证据：Partial Pass**。`05A_TASKS.md` 状态已更新为 Complete，INT-S3/content-audit/assets-audit/FOLLOW_UP 已落盘；但 AGENTS.md 仍显示 Wave 5 “进行中”，且部分报告/截图未回填。

---

## 5. Issues

### Critical

无。

### High

无。

### Medium

| Severity | Lens | Title | Evidence | Impact | Minimum fix | Anchor |
|----------|------|-------|----------|--------|-------------|--------|
| Medium | L2 | E2E smoke spec 文件未落盘 | `05A_TASKS.md:214` 要求输出 `tests/e2e/smoke.spec.ts`；`tests/e2e/smoke.spec.ts` 不存在；`reports/e2e-plan.md:20` 仍声明该文件已配置 | 无法按 05B 计划执行 E2E 冒烟，`pnpm test:e2e` 当前无可用用例 | 将 `reports/e2e-plan.md:23-60` 的用例写入 `tests/e2e/smoke.spec.ts` | 05A T1.3.3、05B §T1.3.3 |
| Medium | L2 / L4 | `tested` 字段未回填，运行时内容复核未完成 | `src/data/sites.json:19`（全部 31 条记录 `tested: false`）；`reports/content-audit.md:90-91` 明确记录该风险 | 内容安全与现场可用性依赖尚未执行的人工复核；若上线，无法证明“已人工打开并复核” | 按 `reports/content-audit.md` 清单逐条复核，将确认可玩的站点 `tested` 更新为 `true`（或保留 false 并注明原因） | 05A T3.2.1、ADR_002 §内容安全规则 |
| Medium | L2 / L5 | INT-S3 E2E 冒烟证据缺失 | `reports/INT-S3.md:45-47` 记录“E2E 浏览器实机验证未执行”；`05A_TASKS.md:396-404` 要求产出 `reports/e2e-smoke.md` 与 `screenshots/e2e/`，均不存在 | S3 退出标准中“发布前主路径”缺少浏览器实机证据 | 实机执行 E2E 后回填 `reports/e2e-smoke.md` 与 `screenshots/e2e/`，或在 INT-S3 中显式豁免并说明风险 | 05A INT-S3、05B INT-S3 |

### Low

| Severity | Lens | Title | Evidence | Impact | Minimum fix | Anchor |
|----------|------|-------|----------|--------|-------------|--------|
| Low | L2 | T1.3.1 截图证据未产出 | `05A_TASKS.md:190` 要求 `screenshots/home-mobile.png`、`screenshots/carousel-desktop.png`；`screenshots/` 目录不存在 | 视觉/响应式验收缺少静态截图证据 | 生成对应截图并放入 `screenshots/`，或在 INT-S3 中集中提供 | 05A T1.3.1 |
| Low | L2 | T1.3.2 performance-check 报告缺失 | `05A_TASKS.md:209` 要求 `reports/performance-check.md`；当前仅有 `reports/accessibility-check.md` | 性能检查证据未独立落盘 | 新增 `reports/performance-check.md`，或将性能内容从 accessibility-check 拆分并更新任务证据引用 | 05A T1.3.2 |
| Low | L4 | 外部 Google Fonts CDN 依赖 | `src/styles/globals.css:1` 通过 `@import` 引入 Google Fonts | 现场网络可能无法访问 Google Fonts，导致字体回退，影响视觉一致性 | 自托管字体或增加更完善的 `system-ui` fallback 策略 | PRD §6.1 性能底线 |
| Low | L6 | AGENTS.md Wave 状态未更新 | `AGENTS.md` 当前状态保留区仍显示“`/forge` Wave 5 进行中” | 项目状态保留区与本次 Wave 5 完成态不一致 | 运行 `/forge` 提交流程更新 AGENTS.md Wave 块为 Wave 5 完成 | AGENTS.md §当前状态 |

---

## 6. 安全 / 测试覆盖补充

### 安全边界

- **内容安全**：默认推荐路径经过 `filterSafeSites`（`safeLevel >= 4` 且 `childFriendly === true`），与 ADR_002 一致。
- **外部跳转**：`openExternal` 仅允许 `http:`/`https:`，并使用 `window.open(url, '_blank', 'noopener,noreferrer')`；`SiteCard` 的 `<a>` 标签也显式设置 `rel="noopener noreferrer"`。
- **数据注入**：`sites.json` 通过 `validateSites` 校验字段类型、URL 协议、`contentMode` 枚举、image 路径前缀、id 唯一性；未通过校验时应用降级为空数组并显示加载失败提示，避免空白页或脏数据进入推荐。
- **运行时错误**：`AppErrorBoundary` 捕获渲染期异常并展示友好提示，但当前未实现 `componentDidCatch` 日志记录，排障时缺少堆栈信息（Low）。

### 测试覆盖

- **已覆盖**：推荐规则（18 例）、schema 与非法样本（11 例）、assets 路径（3 例）、openExternal 安全契约（4 例）、组件交互（24 例）、集成推荐流（3 例），合计 67 例全绿。
- **未覆盖/需回填**：
  - 浏览器实机 E2E 冒烟（`tests/e2e/smoke.spec.ts` 未创建，浏览器未安装）。
  - 运行时内容安全与可用性复核（`tested` 字段）。
  - 真实截图场景（当前 31 条全部使用占位图，已由 `assets-audit.md` 记录并转入 `FOLLOW_UP.md`）。

---

## 7. 落盘确认

- 审查报告已写入：**`D:\PROJECTALL\玩点啥\.anws\v1\wave-reviews\wave-5-review.md`**
- 首行格式：`# Wave 5 Code Review — 2026-06-26`
