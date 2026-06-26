# Wave 2 Code Review — 2026-06-26

## 1. 总结结论

**Partial Pass（静态意义下）**

T2.1.1、T2.1.2、INT-S1 的实现产物在静态层面基本兑现了 ADR-002、recommendation-engine 系统设计与 05A_TASKS.md 的承诺：安全过滤、网络/内容排序、随机打乱、schema 校验、API 契约测试与 S1 冒烟报告均已落地。但存在若干 Medium/Low 级缺口：部分边界场景未在测试中断言、`recommendSites` 的 `seed` 参数超出 System Design 公开签名、`App.tsx` 仍为占位实现，需后续波次闭合。

## 2. 审查范围与静态边界

### 已读

- 实现代码：`src/utils/recommend.ts`、`src/utils/filters.ts`、`src/utils/shuffle.ts`、`src/data/siteTypes.ts`、`src/data/siteSchema.ts`、`src/data/sites.json`、`src/App.tsx`、`src/main.tsx`、`src/styles/globals.css`
- 测试代码：`tests/unit/recommend.test.ts`、`tests/api/recommend.contract.test.ts`、`tests/api/sites-schema.contract.test.ts`、`tests/api/assets.contract.test.ts`、`tests/setup.ts`
- 工程配置：`package.json`、`vitest.config.ts`、`vite.config.ts`、`tailwind.config.js`、`eslint.config.js`、`index.html`
- 架构/契约文档：`.anws/v1/01_PRD.md`、`.anws/v1/02_ARCHITECTURE_OVERVIEW.md`、`.anws/v1/03_ADR/ADR_001_TECH_STACK.md`、`.anws/v1/03_ADR/ADR_002_RECOMMENDATION_AND_SAFETY.md`、`.anws/v1/04_SYSTEM_DESIGN/recommendation-engine.md`、`.anws/v1/05A_TASKS.md`、`.anws/v1/05B_VERIFICATION_PLAN.md`、`.anws/v1/07_CHALLENGE_REPORT.md`
- S1 证据：`reports/INT-S1.md`、`reports/assets-audit.md`

### 未读/未执行

- 未读取 `.anws/v1/wave-reviews/wave-1-review.md`（该文件不存在，无法引用）。
- 未执行任何测试、lint、build、浏览器或 E2E；所有运行时结论标记为「需人工验证」。
- `logs/` 目录不存在，未读取执行日志。

### 需人工验证项

- `pnpm run test:unit` / `pnpm run test` 实际通过情况。
- `pnpm run build` 与 `pnpm run lint` 实际通过情况。
- 真实浏览器中 `App.tsx` 占位页是否仍展示「正在加载好玩的网站…」。

## 3. 契约 → 代码映射摘要

| 核心承诺 | 实现区域 | 状态 |
|---|---|---|
| 安全过滤 `safeLevel >= 4 && childFriendly` | `src/utils/filters.ts:3-5` filterSafeSites | 已兑现 |
| 网络环境排序（国内优先 / 全部） | `src/utils/filters.ts:13-23` sortByNetworkMode | 已兑现 |
| 内容倾向排序（light / useful） | `src/utils/filters.ts:27-33` sortByContentMode | 已兑现 |
| 排序分组内随机打乱 | `src/utils/shuffle.ts:12-22` shuffleSites | 已兑现 |
| 推荐组合函数 | `src/utils/recommend.ts:14-23` recommendSites | 已兑现，签名扩展 seed |
| `FilterState` / `RecommendationBatch` 公开类型 | `src/utils/recommend.ts:7-12` | 已兑现 |
| `sites.json` schema 校验 | `src/data/siteSchema.ts:39-137` validateSite / validateSites | 已兑现 |
| 图片路径与占位图兜底 | `tests/api/assets.contract.test.ts:15-25`、`public/images/placeholders/toy-default.svg` | 已兑现 |
| S1 冒烟证据 | `reports/INT-S1.md` | 已落盘 |

## 4. Lens 结果摘要

- **L1 契约忠实度**：基本符合。`filterSafeSites`、`sortByNetworkMode`、`sortByContentMode`、`shuffleSites`、`recommendSites` 均与 System Design §3 公开函数签名一致，但 `recommendSites` 额外引入 `seed?: number` 参数，超出 System Design 公开签名，属于未回流的公共契约扩展（`src/utils/recommend.ts:14-18`）。
- **L2 任务兑现与交付闭合**：T2.1.1/T2.1.2/INT-S1 已实现并产生测试与报告；`tests/components/`、`tests/integration/`、`tests/e2e/` 尚未创建，属于 S2 任务，不在本波范围。
- **L3 架构适配与复杂度健康**：纯函数边界清晰，无 UI 状态污染。`ContentMode` 类型由 `Site['contentMode']` 推导（`src/utils/filters.ts:25`），与 System Design 直接定义 `type ContentMode = "light" | "useful"` 在语义上等价，但来源依赖 data layer，轻微耦合。
- **L4 静态运行风险与安全边界**：`validateSite` 对 URL 协议做 http/https 白名单校验（`src/data/siteSchema.ts:22-29`）；图片路径强制 `/images/` 前缀（`src/data/siteSchema.ts:31-33`）；无 PII/密钥硬编码。`shuffleSites` 在 seed 缺失时使用 `Math.random`，符合设计但不可复现，已在测试中声明为「需人工验证」的边界。
- **L5 验证证据与可观测性**：单元/API 测试覆盖规则、边界输入、非法样本与真实 `sites.json`，共 35 条用例（据 INT-S1.md）。但部分 System Design 边界行为（国内优先结果不足补充、safeLevel 恰好为 4、随机种子对 `recommendSites` 的影响）未显式断言。
- **L6 回流一致性与交接证据**：INT-S1.md 与 assets-audit.md 已更新；`App.tsx` 仍为 Wave 1 占位，未体现 T1.2.1 首页契约，需 S2 闭合。`recommendSites` 新增 `seed` 参数未同步回 System Design 公开签名。

## 5. Issues

### Medium

| Severity | Lens | Title | Evidence(path:line) | Impact | Minimum fix | Anchor |
|---|---|---|---|---|---|---|
| Medium | L1 | Undocumented Contract: recommendSites 公开签名扩展 seed 参数 | `src/utils/recommend.ts:14-18` | System Design 仅定义 `recommendSites(sites, filters)`，新增 `seed` 会误导消费者认为该参数在契约内；未来若替换为其他随机策略，调用方可能依赖未文档化行为。 | 在 `04_SYSTEM_DESIGN/recommendation-engine.md` §3 公开函数签名中补充 `seed?: number`，或移除 `recommendSites` 的 seed 参数仅保留 `shuffleSites` 暴露。 | `04_SYSTEM_DESIGN/recommendation-engine.md` §3 |
| Medium | L2+L5 | Acceptance Gap: 国内优先「结果不足补充非国内优先」未在测试中显式断言 | `tests/unit/recommend.test.ts:47-63`、`tests/api/recommend.contract.test.ts:30-35` | System Design §5 要求国内优先结果不足时可补充安全非国内优先条目；现有测试仅验证排序前后，未验证非国内优先条目仍保留在结果中。 | 在 `tests/unit/recommend.test.ts` 增加一条用例：输入仅含非国内优先安全站点时，`domestic` 模式下仍返回这些站点。 | `05B_VERIFICATION_PLAN.md` T2.1.1、T2.1.2 |
| Medium | L2+L5 | Acceptance Gap: safeLevel 恰好为 4 的边界未显式测试 | `tests/unit/recommend.test.ts:30-45` | PRD §6.2 / ADR-002 要求默认仅推荐 `safeLevel >= 4`；现有测试只覆盖 5 和 3，缺少刚好等于 4 的样本。 | 增加 `safeLevel: 4` 的站点被保留、以及 `safeLevel: 3` 被拒绝的成对断言。 | `05B_VERIFICATION_PLAN.md` T2.1.2 |
| Medium | L6 | Missing Change Backflow: App.tsx 仍为 Wave 1 占位，未承接 T1.2.1 首页契约 | `src/App.tsx:1-12` | 当前页面只展示标题与「正在加载好玩的网站…」，未包含 PRD US-001 要求的产品名、副标题、抽卡按钮和两个筛选开关。 | 在 Wave 3 / S2 实现 `src/pages/Home.tsx`、`src/components/FilterSwitch.tsx`、`src/components/RandomButton.tsx` 并替换 `App.tsx` 引入。 | `05A_TASKS.md` T1.2.1、`01_PRD.md` US-001 |

### Low

| Severity | Lens | Title | Evidence(path:line) | Impact | Minimum fix | Anchor |
|---|---|---|---|---|---|---|
| Low | L1+L3 | Contract Drift: 安全阈值常量在不同模块重复定义 | `src/utils/filters.ts:4`、`src/data/siteSchema.ts:4`、`src/data/siteSchema.ts:139-141` | `filterSafeSites` 硬编码 `>= 4`，而 `siteSchema.ts` 已定义 `MIN_SAFE_LEVEL = 4` 与 `isRecommendable`；重复定义未来易导致单边修改。 | 让 `filterSafeSites` 导入 `MIN_SAFE_LEVEL` 或 `isRecommendable` 保持一致。 | `ADR_002_RECOMMENDATION_AND_SAFETY.md` §决策 |
| Low | L3 | Type Coupling: ContentMode 由 Site 类型派生而非独立定义 | `src/utils/filters.ts:25` | 与 System Design §2 直接定义 `type ContentMode = "light" | "useful"` 相比，当前实现依赖 `Site['contentMode']`，使推荐层类型契约隐含依赖数据层。 | 在 `src/data/siteTypes.ts` 导出独立 `ContentMode` 类型，并在 `filters.ts` 显式导入使用。 | `04_SYSTEM_DESIGN/recommendation-engine.md` §2 |
| Low | L5 | Test Verifiability Gap: 随机性测试未断言无 seed 时结果仍为安全/排序后集合 | `tests/unit/recommend.test.ts:75-87` | `shuffleSites` 无 seed 测试只断言长度，未断言元素集合不变，也未断言 `recommendSites` 无 seed 时仍完成过滤与排序。 | 增加断言：shuffle 输出是输入的排列；recommendSites 无 seed 时输出集合等于安全排序后集合。 | `05B_VERIFICATION_PLAN.md` T2.1.1 |

## 6. 安全 / 测试覆盖补充

### 已覆盖的安全边界

- URL 协议白名单：`src/data/siteSchema.ts:22-29` 仅允许 `http:` / `https:`。
- 图片路径前缀约束：`src/data/siteSchema.ts:31-33` 强制 `/images/` 开头。
- 安全过滤：推荐入口默认执行 `safeLevel >= 4 && childFriendly`。
- 无敏感数据/密钥/个人身份信息在代码中硬编码。

### 无法静态确认的高风险边界

- **外部网站运行时内容安全**：ADR-002 已明确系统无法控制第三方网站内容，依赖人工审核；`tested: false` 全部 31 条，需 T3.2.1 人工复核。
- **国内优先可访问性**：排序只是风险降低策略，不代表网站在现场网络一定可达，需 S3 现场走查验证。
- **真实图片资产**：`public/images/sites/` 存在但为空，当前 31 条全部使用占位图；卡片视觉效果需 S3 人工验证。
- **E2E 与 UI 集成**：首页、筛选、卡片、滑动、跳转尚未实现，无法静态确认可用性。

### 建议补充的最小测试

1. `tests/unit/recommend.test.ts` 增加 `safeLevel = 4` 边界用例。
2. `tests/unit/recommend.test.ts` 增加「国内优先输入全为非国内优先安全站点仍返回全部」用例。
3. `tests/api/recommend.contract.test.ts` 增加 `recommendSites(sites, {networkMode: 'domestic', contentMode: 'light'}, seed)` 输出前 N 项为国内优先友好的断言。
4. 将 `recommendSites` 的 `seed` 参数同步到 `04_SYSTEM_DESIGN/recommendation-engine.md` 公开函数签名。
