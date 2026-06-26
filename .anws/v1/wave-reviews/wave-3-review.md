# Wave 3 Code Review — 2026-06-26

## 1. 总结结论

**Partial Pass（静态意义下）**

T1.2.1–T1.2.4 的实现产物均已落盘，首页、筛选、卡片、横向滑动、空状态、外部跳转的主路径在静态层面可闭合。存在 1 项 High（数据加载失败提示无法覆盖真实加载异常）和 3 项 Medium（推荐排序语义漂移、运行时数据未校验、Wave 3 组件测试缺失），需在继续推进 INT-S2 前处理或明确接受风险。

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
| 默认 FilterState：国内优先 / 轻松好玩 | `src/App.tsx:9-12` | ✅ |
| 首页显示产品名、副标题、抽卡按钮、两个筛选开关 | `src/pages/Home.tsx:11-48` | ✅ |
| 双态筛选控件 | `src/components/FilterSwitch.tsx:9-51` | ✅ |
| 卡片展示名称、1-2 句话说明、图片、最多 3 个标记 | `src/components/SiteCard.tsx:35-50` | ✅ |
| 图片缺失使用占位图 | `src/components/SiteCard.tsx:18-25`、`public/images/placeholders/toy-default.svg` | ✅ |
| 外网可能性标记 | `src/components/SiteCard.tsx:27-31` | ✅ |
| 横向滑动卡片流 | `src/components/CardCarousel.tsx:11-45` | ✅ |
| 空结果提示文案 | `src/App.tsx:43-58`、`src/components/EmptyState.tsx:9-21` | ✅ |
| 本地数据加载失败不空白页 | `src/App.tsx:34-41` | ⚠️ 仅覆盖空数组，未覆盖 JSON 解析/导入失败 |
| 外部跳转 http/https 白名单 + `noopener,noreferrer` | `src/utils/openExternal.ts:1-14` | ✅ |
| 安全过滤 `safeLevel >= 4` 且 `childFriendly = true` | `src/utils/filters.ts:4-6`、`src/utils/recommend.ts:19` | ✅ |
| 国内优先 / 内容倾向排序 + 随机 | `src/utils/filters.ts:14-31`、`src/utils/recommend.ts:15-22` | ⚠️ 排序后被全数组 shuffle，分组优先语义被弱化 |

---

## 4. Lens 结果摘要

- **L1 契约忠实度**：基本对齐。高优异常在于 `App.tsx` 的加载失败提示无法捕获真实的 JSON 导入异常；`recommend.ts` 的全数组 shuffle 与 ADR-002 “在排序分组内随机打乱”存在语义漂移。
- **L2 任务兑现与交付闭合**：T1.2.1–T1.2.4 输出文件齐全，但组件测试文件（T1.2.5 范围）尚未创建，05B 期望的 `tests/components/*.test.tsx` 空缺。
- **L3 架构适配与复杂度健康**：组件边界与 Architecture Overview 一致，`web-app` 负责状态与 UI，`recommendation-engine` 保持纯函数，`content-catalog` 与 `asset-library` 静态引用，无循环依赖。
- **L4 静态运行风险与安全边界**：`openExternal` 协议白名单与 `noopener,noreferrer` 正确；`sites.ts` 运行时将 JSON 直接 `as Site[]` 存在类型信任风险；`SiteCard` 使用 `<button>` 做外部跳转，语义不佳。
- **L5 验证证据与可观测性**：单元/API 契约测试覆盖推荐、schema、跳转、资产；但 UI 组件测试、集成测试、`App.tsx` 状态连接测试缺失，Wave 3 交付的验证证据不完整。
- **L6 回流一致性与交接证据**：`05A_TASKS.md` 中 T1.2.1–T1.2.4 已标记完成，与代码产出一致；T1.2.5 尚未完成导致 INT-S2 不能关门，需在 AGENTS.md Wave 状态或任务清单中如实保留。

---

## 5. Issues

### High

| Severity | Lens | Title | Evidence | Impact | Minimum fix | Anchor |
|---|---|---|---|---|---|---|
| High | L1+L4 | Load-failure handling only covers empty array | `src/App.tsx:34-41` | Vite 中 `sites.json` 解析异常会在模块导入阶段抛出，组件无法挂载，仍呈现空白页，违反 REQ-001 “本地网站库加载失败时不显示空白页” | 将 `src/data/sites.ts` 的静态导入改为带 try/catch 的动态导入或运行时校验，并在 `App` 中捕获后渲染 `EmptyState` | PRD REQ-001 AC，`05A_TASKS.md` T1.2.4 |

### Medium

| Severity | Lens | Title | Evidence | Impact | Minimum fix | Anchor |
|---|---|---|---|---|---|---|
| Medium | L1+L2 | Domestic/content priority weakened by full-array shuffle | `src/utils/recommend.ts:15-22` | ADR-002 要求“在排序分组内随机打乱”，当前对完整排序结果做 shuffle，导致国内优先/内容倾向的“优先展示”语义被稀释 | 先按网络/内容模式分组，再在组内分别 shuffle 后拼接；或显式在 ADR/System Design 中修订为“全结果随机”并同步测试 | ADR-002 §推荐顺序规则，PRD REQ-004/005 |
| Medium | L4 | Runtime sites.json lacks validation | `src/data/sites.ts:4` | 运行时将 `sites.json` 直接 `as Site[]`，若测试/审核被绕过，字段类型错误可能在 UI 中抛出 | 使用 `validateSites()` 在运行时校验，校验失败走 `EmptyState` 错误路径 | `05A_TASKS.md` T3.1.1，ADR-002 |
| Medium | L2+L5 | Component tests for Wave 3 not yet present | `tests/components/`（目录缺失） | 05B 明确要求 `tests/components/Home.test.tsx`、`SiteCard.test.tsx`、`CardCarousel.test.tsx`、`EmptyState.test.tsx`；当前仅存在 unit/api 测试 | 按 T1.2.5 补齐关键组件测试，覆盖可见性、筛选状态、卡片渲染、空状态文案 | `05A_TASKS.md` T1.2.5，`05B_VERIFICATION_PLAN.md` T1.2.1–T1.2.4 |

### Low

| Severity | Lens | Title | Evidence | Impact | Minimum fix | Anchor |
|---|---|---|---|---|---|---|
| Low | L4 | SiteCard uses button for external navigation | `src/components/SiteCard.tsx:12` | 语义上应为链接；右键/中键新标签、链接预览、屏幕阅读器“链接”认知均受损 | 改用 `<a>` 元素并设置 `href={site.url}`、`target="_blank"`、`rel="noopener noreferrer"`，同时保留整卡点击区域样式 | PRD REQ-006，`04_SYSTEM_DESIGN/web-app.md` §5 |
| Low | L4 | Carousel scroll region lacks accessible label | `src/components/CardCarousel.tsx:29` | 屏幕阅读器用户难以识别横向滚动区域的用途 | 添加 `aria-label="推荐卡片列表"` 或等价语义 | PRD REQ-002，T1.3.2 |
| Low | L4 | EmptyState emoji lacks text fallback | `src/components/EmptyState.tsx:13` | 部分屏幕阅读器对 🎴 的朗读不可控 | 使用 `aria-hidden="true"` 包裹装饰性 emoji，或提供 `aria-label` | PRD REQ-008 |

---

## 6. 安全 / 测试覆盖补充

### 已闭合的安全边界

- `src/utils/openExternal.ts:1-14` 仅允许 `http:` / `https:`，非法 URL 与非法协议均返回 `false` 且不调用 `window.open`。
- `window.open` 第三参数为 `'noopener,noreferrer'`，静态代码无 `window.opener` 残留风险；`window.opener` 实际是否为 `null` 需浏览器运行时人工验证。
- `src/utils/filters.ts:5` 安全过滤 `safeLevel >= MIN_SAFE_LEVEL && site.childFriendly` 与 ADR-002 一致。

### 高风险缺口

- **运行时数据加载失败**：见 High issue。静态 SPA 的 JSON 导入异常会在组件渲染前触发，当前 `sites.length === 0` 分支无法兜底。
- **运行时 schema 校验缺失**：见 Medium issue。生产构建不会运行测试，若 `sites.json` 被手动改坏，只有浏览器控制台报错，用户看到空白或崩溃页。

### 无法静态确认的边界

- 横向滑动在真实触屏设备上的惯性、snap 对齐与边界回弹。
- 360px 移动端首屏主按钮是否可见、文字是否被截断。
- 外部网站实际打开行为（被拦截、弹窗、HTTPS 证书问题）。
- 所有 30 条网站的内容安全性与现场可访问性（依赖 T3.2.1 人工复核）。
- `useMemo` 在 30–80 条数据下的重新计算是否造成可感知卡顿。

---

*审查结束。下阶段建议：先修复 High 与两项 Medium（排序语义、运行时校验），再推进 T1.2.5 组件测试与 INT-S2。*
