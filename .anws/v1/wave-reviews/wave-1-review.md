# Wave 1 Code Review — 2026-06-26

## 1. 总结结论

**Partial Pass（静态意义下）**。

T1.1.1 工程骨架、T3.1.1 数据契约与 T4.1.1 资产策略的核心产物均已落盘，技术栈、脚本入口、`Site` 类型、`sites.json` 字段、占位图路径等基本符合 `ADR_001`、`ADR_002`、`content-catalog.md` 与 `asset-library.md` 的承诺。审查中发现的两个 Medium 契约缺口（`safeLevel` 未限定整数、`tags` 长度被错误限制为 ≤3）已在本波修复。全部 31 条记录仍 `tested=false`、图片全部使用占位图，内容安全与视觉完成度依赖后续 T3.2.1 / T1.3.1 补齐。

## 2. 审查范围与静态边界

**已读**：

- 实现：`src/App.tsx`、`src/main.tsx`、`src/vite-env.d.ts`、`src/styles/globals.css`、`src/data/siteTypes.ts`、`src/data/siteSchema.ts`、`src/data/sites.json`
- 工程配置：`package.json`、`vite.config.ts`、`vitest.config.ts`、`playwright.config.ts`、`tailwind.config.js`
- 测试：`tests/setup.ts`、`tests/unit/smoke.test.ts`、`tests/api/smoke.test.ts`、`tests/api/sites-schema.contract.test.ts`、`tests/api/assets.contract.test.ts`
- 资产与报告：`public/images/placeholders/toy-default.svg`、`reports/assets-audit.md`
- 日志：`logs/build.log`、`logs/lint.log`、`logs/test.log`
- 契约输入：`.anws/v1/01_PRD.md`、`.anws/v1/02_ARCHITECTURE_OVERVIEW.md`、`.anws/v1/03_ADR/ADR_001_TECH_STACK.md`、`.anws/v1/03_ADR/ADR_002_RECOMMENDATION_AND_SAFETY.md`、`.anws/v1/04_SYSTEM_DESIGN/content-catalog.md`、`.anws/v1/04_SYSTEM_DESIGN/asset-library.md`、`.anws/v1/05A_TASKS.md`、`.anws/v1/05B_VERIFICATION_PLAN.md`、`.anws/v1/07_CHALLENGE_REPORT.md`

**未读/未执行**：

- 未读取 `eslint.config.js`、`postcss.config.js`、`tsconfig*.json` 等配置细节；lint 通过依赖 `logs/lint.log`，配置本身未逐条审查。
- 未运行 `pnpm install/build/lint/test`，仅依据已有 `logs/*.log` 与文件形态做静态判断。
- 未验证 `test:unit`、`test:e2e` 实际执行结果；`logs/test.log` 仅覆盖默认 `vitest run` 且未包含当前已存在的 contract tests。
- 未读取 `public/images/sites/` 下具体文件清单，仅由 `assets.contract.test.ts` 与 `reports/assets-audit.md` 间接确认。

**需人工验证项**：

- `pnpm test:unit` 与 `pnpm test:e2e` 是否可正常执行。
- `public/images/sites/` 目录是否真实存在并可被构建工具正确复制。
- 全部 `tested=false` 的网站是否已在 T3.2.1 阶段完成人工打开复核。

## 3. 契约 → 代码映射摘要

| 核心承诺 | 来源 | 对应实现区域 |
|---------|------|-------------|
| React + Vite + TypeScript + Tailwind + local JSON | `ADR_001` §决策 | `package.json:16-42`、`vite.config.ts:1-12`、`tailwind.config.js:1-11`、`src/main.tsx:1-10` |
| `sites.json` 必需字段与 `Site` 类型 | `content-catalog.md` §2、`01_PRD.md` REQ-007 | `src/data/siteTypes.ts:1-17`、`src/data/sites.json:1-591` |
| Schema 唯一源、URL 协议、image 路径、`contentMode` 枚举 | `content-catalog.md` §3、`05A_TASKS.md` T3.1.1 | `src/data/siteSchema.ts:1-143` |
| 安全过滤 `safeLevel >= 4` 且 `childFriendly = true` | `ADR_002` §决策 | `src/data/siteSchema.ts:141-143` |
| 占位图兜底与资产覆盖记录 | `asset-library.md` §2-3、`05A_TASKS.md` T4.1.1 | `public/images/placeholders/toy-default.svg`、`reports/assets-audit.md` |
| 测试脚本入口（build/lint/test/test:unit/test:e2e） | `05A_TASKS.md` T1.1.1 | `package.json:6-14` |

## 4. Lens 结果摘要

- **L1 契约忠实度**：基本满足；`siteSchema.ts` 中 `safeLevel` 已补整数校验，`tags` 长度限制已移除以符合 `01_PRD.md` REQ-007 边界条件。
- **L2 任务兑现与交付闭合**：T1.1.1/T3.1.1/T4.1.1 输出文件与 `05A_TASKS.md` 清单大体一致；`App.tsx` 为占位页，首页完整功能由后续 T1.2.x 承接，符合本波范围。
- **L3 架构适配与复杂度健康**：当前 `src/` 结构为骨架态，尚未形成 `02_ARCHITECTURE_OVERVIEW.md` 预期的 `pages/components/utils` 目录，属 Wave 1 合理中间态。
- **L4 静态运行风险与安全边界**：全部 31 条记录 `tested=false`，内容安全依赖人工复核（T3.2.1）；`safeLevel` 校验不严可能让非整数值通过。
- **L5 验证证据与可观测性**：`tests/api/sites-schema.contract.test.ts` 与 `tests/api/assets.contract.test.ts` 已覆盖 T3.1.1/T4.1.1 核心契约；`logs/test.log` 仅反映旧版 smoke 运行，未覆盖当前 contract tests。
- **L6 回流一致性与交接证据**：`reports/assets-audit.md` 与 `05A_TASKS.md` checkbox 已回流；`tests/api/` 下新增 contract tests 未在 `05B_VERIFICATION_PLAN.md` 状态列中体现为已完成。

## 5. Issues

### Medium (已修复)

| Severity | Lens | Title | Evidence | Impact | Minimum fix | Anchor |
|---------|------|-------|----------|--------|-------------|--------|
| ~~Medium~~ → Fixed | L1+L4 | `safeLevel` 未校验整数，浮点值可通过 schema | `src/data/siteSchema.ts:96`（已改为 `Number.isInteger`） | 类型契约声明 `safeLevel: 1 \| 2 \| 3 \| 4 \| 5`，`4.5` 等浮点数会被验证通过，导致安全过滤语义与类型不一致。 | 将 `isNumber` 或 safeLevel 分支改为 `Number.isInteger` 并在 1-5 范围内。 | `content-catalog.md` §2-3、`ADR_002` §决策 |
| ~~Medium~~ → Fixed | L1 | `tags` 长度被限制为 ≤3，与 PRD 冲突 | `src/data/siteSchema.ts:76-78`（已移除长度限制） | PRD 明确「tags 可多于 3 个，但卡片最多展示 3 个」；schema 限制会阻止内容维护者录入超过 3 个 tag。 | 移除 schema 的 `tags.length > 3` 校验，将「最多展示 3 个」限制前移至卡片组件层（T1.2.2）。 | `01_PRD.md` §4 US-007 边界条件 |

### Medium (残留)

| Severity | Lens | Title | Evidence | Impact | Minimum fix | Anchor |
|---------|------|-------|----------|--------|-------------|--------|
| Medium | L4 | 全部网站 `tested=false`，内容安全依赖后续人工复核 | `src/data/sites.json:19-589`（所有条目 `tested: false`） | 当前数据未经过人工打开复核，ADR 允许进入数据集但要求 T3.2.1 完成审核；若 T3.2.1 被跳过，现场可能出现不可访问或内容漂移风险。 | T3.2.1 按 `ADR_002` 禁止内容清单逐条复核并更新 `tested` 与审核报告。 | `ADR_002` §内容安全规则、`05A_TASKS.md` T3.2.1 |

### Low (已修复)

| Severity | Lens | Title | Evidence | Impact | Minimum fix | Anchor |
|---------|------|-------|----------|--------|-------------|--------|
| ~~Low~~ → Fixed | L2+L5 | `logs/test.log` 未覆盖当前已存在的 contract tests | `logs/test.log:7-11`（已重新执行并更新） | log 仅显示 2 个 smoke test 通过，未包含当前已存在的 contract tests。 | 重新执行 `pnpm test` / `pnpm test:unit` 并更新 `logs/test.log`。 | `05A_TASKS.md` T1.1.1 验收标准 |

### Low (残留)

| Severity | Lens | Title | Evidence | Impact | Minimum fix | Anchor |
|---------|------|-------|----------|--------|-------------|--------|
| Low | L2+L4 | 全部 31 条记录使用占位图，无真实截图 | `reports/assets-audit.md:57-59` | 满足「图片缺失有统一占位兜底」的最低契约，但卡片视觉同质性高，现场体验可能下降。 | T3.2.1 / T1.3.1 阶段为 visually-driven 站点补充真实截图并更新 `Site.image`。 | `asset-library.md` §3、`01_PRD.md` REQ-003 |

## 6. 安全 / 测试覆盖补充

**高风险缺口（需后续波次闭合）**：

1. **内容安全人工审核未闭环**：`src/data/sites.json` 全部 31 条 `tested=false`，`ADR_002` 明确禁止内容清单需人工复核。该风险无法通过静态审查消除，必须等待 T3.2.1 完成。
2. **外部 URL 可用性**：所有 URL 均为第三方站点，静态无法确认其当前可访问性、广告弹窗或内容变化；`mayNeedGlobalNetwork` 标记依赖人工判断。
3. **首页错误处理未实现**：`src/App.tsx:1-12` 仅为静态占位，未接入 `sites.json` 加载失败提示；该契约由 T1.2.4 承接，不在本波范围。

**无法静态确认的边界**：

- `pnpm test:unit`、`pnpm test:e2e` 的实际可执行性与结果。
- `vite build` 与 `eslint .` 在当前完整文件集下是否仍通过（已有 log 显示通过，但静态审查不保证）。
- `public/images/sites/` 目录是否真实存在（`assets.contract.test.ts:27-30` 断言其存在，但静态未列目录验证）。
- 第三方网站内容是否仍符合 `safeLevel >= 4` 且 `childFriendly = true` 的人工审核标准。
