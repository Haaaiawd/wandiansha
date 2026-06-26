# Wave 3 Code Review — 2026-06-26

## 1. 总结结论

**Partial Pass（静态意义下）**

T1.2.1–T1.2.4 的实现产物均已落盘，首页、筛选、卡片、横向滑动、空状态、外部跳转的主路径在静态层面可闭合。波末审查发现的 1 项 High（数据加载失败提示无法覆盖真实加载异常）、2 项 Medium（推荐排序语义漂移、运行时数据未校验）和 3 项 Low（SiteCard 语义、Carousel label、EmptyState emoji）已在本波修复。残留 1 项 Medium：Wave 3 组件测试文件尚未创建，属 T1.2.5 范围，需在 Wave 4 补齐后方可 INT-S2 关门。

---

## 2. 审查范围与静态边界

### 已读

- `src/` 下全部业务文件（`.tsx`、`.ts`、`.json`、`.css`）
- `tests/` 下全部现有测试文件
- `package.json`、`vitest.config.ts`、`playwright.config.ts`
- `.anws/v1/01_PRD.md`、`.anws/v1/02_ARCHITECTURE_OVERVIEW.md`
- `.anws/v1/03_ADR/ADR_001_TECH_STACK.md`、`.anws/v1/03_ADR/ADR_002_RECOMMENDATION_AND_SAFETY.md`
- `.anws/v1/04_SYSTEM_DESIGN/web-app.md`
- `.anws/v1/05A_TASKS.md`、`.anws/v1/05B_VERIFICATION_PLAN.md`
- `.anws/v1/07_CHALLENGE_REPORT.md`

### 未读 / 未深入

- `tailwind.config.js`、`postcss.config.js`、`eslint.config.js`、`vite.config.ts` 的具体规则未逐条审查（与 T1.2.x 行为契约无直接关联）。
- 未执行 `pnpm build` / `pnpm test` / E2E（纯静态审查）。

### 需人工验证

- 真实移动设备 / 模拟器上的触屏横向滑动与 snap 手感。
- 360px 宽度下首页主按钮是否仍在首屏可见。
- 真实浏览器中点击卡片后 `window.opener` 是否为 `null`。
- 图片加载失败时占位图 fallback 的闪烁与可感知性。
- 键盘导航（Tab、Enter）在筛选开关与卡片流中的可达性。

---

## 3. 契约 → 代码映射摘要

| 核心承诺 | 对应实现区域 | 状态 |
|---|---|---|
| 默认 FilterState：国内优先 / 轻松好玩 | `src/App.tsx:12-15` | ✅ |
| 首页显示产品名、副标题、抽卡按钮、两个筛选开关 | `src/pages/Home.tsx:11-48` | ✅ |
| 双态筛选控件 | `src/components/FilterSwitch.tsx:9-51` | ✅ |
| 卡片展示名称、1-2 句话说明、图片、最多 3 个标记 | `src/components/SiteCard.tsx:35-50` | ✅ |
| 图片缺失使用占位图 | `src/components/SiteCard.tsx:18-25`、`public/images/placeholders/toy-default.svg` | ✅ |
| 外网可能性标记 | `src/components/SiteCard.tsx:27-31` | ✅ |
| 横向滑动卡片流 | `src/components/CardCarousel.tsx:11-45` | ✅ |
| 空结果提示文案 | `src/App.tsx:50-65`、`src/components/EmptyState.tsx:9-21` | ✅ |
| 本地数据加载失败不空白页 | `src/components/AppErrorBoundary.tsx:1-27`、`src/data/sites.ts:1-10`、`src/App.tsx:37-45` | ✅ |
| 外部跳转 http/https 白名单 + `noopener,noreferrer` | `src/utils/openExternal.ts:1-14` | ✅ |
| 安全过滤 `safeLevel >= 4` 且 `childFriendly = true` | `src/utils/filters.ts:4-6`、`src/utils/recommend.ts:31` | ✅ |
| 国内优先 / 内容倾向排序 + 分组内随机 | `src/utils/recommend.ts:15-45` | ✅ |

---

## 4. Lens 结果摘要

- **L1 契约忠实度**：对齐。`App.tsx` 通过 `AppErrorBoundary` 与 `sitesLoadError` 覆盖数据加载/校验失败；`recommend.ts` 已改为分组内 shuffle，符合 ADR-002 “在排序分组内随机打乱”。
- **L2 任务兑现与交付闭合**：T1.2.1–T1.2.4 输出文件齐全，但组件测试文件（T1.2.5 范围）尚未创建，05B 期望的 `tests/components/*.test.tsx` 空缺。
- **L3 架构适配与复杂度健康**：组件边界与 Architecture Overview 一致，`web-app` 负责状态与 UI，`recommendation-engine` 保持纯函数，`content-catalog` 与 `asset-library` 静态引用，无循环依赖。
- **L4 静态运行风险与安全边界**：`openExternal` 协议白名单与 `noopener,noreferrer` 正确；`sites.ts` 运行时通过 `validateSites()` 校验；`SiteCard` 已改用 `<a>` 标签；`CardCarousel` 已加 `aria-label`。
- **L5 验证证据与可观测性**：单元/API 契约测试覆盖推荐、schema、跳转、资产；UI 组件测试、集成测试、`App.tsx` 状态连接测试缺失，Wave 3 交付的验证证据不完整。
- **L6 回流一致性与交接证据**：`05A_TASKS.md` 中 T1.2.1–T1.2.4 已标记完成，与代码产出一致；T1.2.5 尚未完成导致 INT-S2 不能关门，需在 AGENTS.md Wave 状态或任务清单中如实保留。

---

## 5. Issues

### Medium (残留)

| Severity | Lens | Title | Evidence | Impact | Minimum fix | Anchor |
|---|---|---|---|---|---|---|
| Medium | L2+L5 | Component tests for Wave 3 not yet present | `tests/components/`（目录缺失） | 05B 明确要求 `tests/components/Home.test.tsx`、`SiteCard.test.tsx`、`CardCarousel.test.tsx`、`EmptyState.test.tsx`；当前仅存在 unit/api 测试 | 按 T1.2.5 补齐关键组件测试，覆盖可见性、筛选状态、卡片渲染、空状态文案 | `05A_TASKS.md` T1.2.5，`05B_VERIFICATION_PLAN.md` T1.2.1–T1.2.4 |

### Low

无残留 Low。

---

## 6. 安全 / 测试覆盖补充

### 已闭合的安全边界

- `src/utils/openExternal.ts:1-14` 仅允许 `http:` / `https:`，非法 URL 与非法协议均返回 `false` 且不调用 `window.open`。
- `window.open` 第三参数为 `'noopener,noreferrer'`；`SiteCard` 已改用 `<a rel="noopener noreferrer">`。
- `src/utils/filters.ts:5` 安全过滤 `safeLevel >= MIN_SAFE_LEVEL && site.childFriendly` 与 ADR-002 一致。
- `src/data/sites.ts` 运行时通过 `validateSites()` 校验，失败将 `sites` 置空并暴露 `sitesLoadError`。
- `src/components/AppErrorBoundary.tsx` 捕获渲染异常，避免空白页。

### 高风险缺口

- **运行时数据加载失败**：已由 `AppErrorBoundary` + `sites.ts` 校验覆盖，但生产环境真实异常路径需 E2E/人工验证。
- 所有 30 条网站的内容安全性与现场可访问性（依赖 T3.2.1 人工复核）。

### 无法静态确认的边界

- 横向滑动在真实触屏设备上的惯性、snap 对齐与边界回弹。
- 360px 移动端首屏主按钮是否可见、文字是否被截断。
- 外部网站实际打开行为（被拦截、弹窗、HTTPS 证书问题）。
- `useMemo` 在 30–80 条数据下的重新计算是否造成可感知卡顿。

---

*审查结束。下阶段建议：按 T1.2.5 补齐组件测试，然后执行 INT-S2。*
