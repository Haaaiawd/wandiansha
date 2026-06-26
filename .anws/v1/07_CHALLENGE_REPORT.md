# 07_CHALLENGE_REPORT.md — Challenge Report

> 版本: v1  
> 产出自: /challenge  
> 日期: 2026-06-26  
> REVIEW_MODE: FULL

---

## 问题总览

| 轮次 | 范围 | Critical | High | Medium | Low | 状态 |
|------|------|:--------:|:----:|:------:|:---:|------|
| R1 | Design + Tasks + Code-readiness | 0 | 2 | 5 | 1 | Resolved by `/change` |

---

## 审查摘要

### 整体判断

当前文档已完成 `/change` 修复，可作为 `/forge` 输入。

### 修复记录

| ID | 处理状态 | 修复位置 |
|----|----------|----------|
| CH-01 | Resolved | `04_SYSTEM_DESIGN/*.md` 已创建最小系统设计。 |
| CH-02 | Resolved | `05A_TASKS.md` T1.2.4 与 `05B_VERIFICATION_PLAN.md` REQ-001 已补回链。 |
| CH-03 | Resolved | `05A_TASKS.md` T1.1.1 与 `05B` 已补测试脚本和测试工具入口。 |
| CH-04 | Resolved | `05B` REQ-004/005 已补卡片层、卡片流和 INT 追溯。 |
| CH-05 | Resolved | `05A` T1.2.2/T3.2.1 与 `05B` 已补 description 长度和截断断言。 |
| CH-06 | Resolved | `05A` T1.2.4 与 `05B` 已补 URL 白名单和 `noopener,noreferrer` 契约。 |
| CH-07 | Resolved | `05A` T3.1.1 与 `05B` 已补唯一 schema、枚举、URL 和 image 约束。 |
| CH-08 | Resolved | `02_ARCHITECTURE_OVERVIEW.md` 已改为静态 image path 引用。 |

### 审查范围

| 类型 | 来源 | 状态 |
|------|------|------|
| 产品契约 | `01_PRD.md` | 已审 |
| 架构契约 | `02_ARCHITECTURE_OVERVIEW.md` | 已审 |
| ADR | `03_ADR/ADR_001_TECH_STACK.md`, `03_ADR/ADR_002_RECOMMENDATION_AND_SAFETY.md` | 已审 |
| 系统设计 | `04_SYSTEM_DESIGN/` | 空目录，仅 `.gitkeep` |
| 任务计划 | `05A_TASKS.md` | 已审 |
| 验证计划 | `05B_VERIFICATION_PLAN.md` | 已审 |
| 代码实现 | `src/` | 不存在，代码审查跳过 |

### 子审查执行

| 审查 | 结果 |
|------|------|
| Design Review | 执行；发现 1 High、2 Medium、1 Low。 |
| Task Review | 执行；发现 2 High、3 Medium、1 Low。 |
| Code Review | 因无 `src/` 跳过代码审查；执行实现准备风险审查。 |

### Pre-Mortem 摘要

| 失败场景 | 失真契约 | 证据 | 概率 | 影响 |
|----------|----------|------|------|------|
| 推荐行为不可信 | 安全过滤与筛选排序 | `01_PRD.md` REQ-002/004/005/007，`ADR_002` | 中 | 高 |
| 测试脚手架临场补 | 验证入口与脚本契约 | `ADR_001` 验证策略，`05A` T1.1.1 | 中高 | 中高 |
| 内容录入拖慢实现 | 30 条数据与审核契约 | `01_PRD.md` G2/REQ-007，`05A` T3.1.1/T3.2.1 | 中 | 中 |
| E2E 阶段边界误读 | blueprint 不执行 E2E | `05A` T1.3.3，`05B` §1 | 中 | 中 |

---

## 原始核心发现清单（已处理）

| ID | 严重度 | 位置 | 发现 | 影响 | 建议 |
|----|--------|------|------|------|------|
| CH-01 | High | `02_ARCHITECTURE_OVERVIEW.md` §2 design doc links; `04_SYSTEM_DESIGN/` | 四个系统设计文档均标为待创建但实际为空。 | 组件职责、公开函数、错误语义和系统级测试契约会被推到实现期临场决定。 | forge 前补最小系统设计，或由用户显式签收以 PRD/ADR/02/05A/05B 作为实现唯一依据。 |
| CH-02 | High | `01_PRD.md` US-001; `05A_TASKS.md` T1.2.4; `05B_VERIFICATION_PLAN.md` REQ-001 row | REQ-001 的“网站库加载失败友好错误提示”由 T1.2.4 承接但未回链到 REQ-001。 | 首页快速开始需求可能只验首屏可见，漏掉本地数据失败不空白页的失败态。 | 将 REQ-001 补到 T1.2.4 与 05B REQ-001 追溯行，并加入加载失败断言。 |
| CH-03 | Medium | `05A_TASKS.md` T1.1.1; `05B_VERIFICATION_PLAN.md` §2 | 基础任务要求 build/lint，但未明确 Vitest、Testing Library、Playwright 和测试 scripts。 | 后续测试任务入口可能漂移，forge 阶段会反复补脚手架。 | 把 `pnpm test`、`test:unit`、`test:e2e` 和相关配置纳入 T1.1.1 或新增基础测试任务。 |
| CH-04 | Medium | `01_PRD.md` REQ-004/005; `05B_VERIFICATION_PLAN.md` REQ-004/005 rows | 网络环境和内容倾向的追溯矩阵偏向纯函数，未完整串到卡片层和卡片流集成。 | 推荐规则可能测试通过，但 UI 仍展示旧集合、旧顺序或漏外网标记。 | 在 REQ-004/005 追溯行加入 T1.2.2、T1.2.3、INT-S2/INT-S3 的 UI 集成断言。 |
| CH-05 | Medium | `01_PRD.md` REQ-003; `05A_TASKS.md` T1.2.2/T3.2.1; `05B` REQ-003 row | 卡片说明 1-2 句话和长文截断未成为显式验证断言。 | 卡片可能退化成文字密集导航站，违背低信息密度目标。 | 给 T1.2.2 或 T3.2.1 增加 description 长度与截断断言。 |
| CH-06 | Medium | `01_PRD.md` REQ-006; `05A_TASKS.md` T1.2.4; `05B` T1.2.4 | 外部跳转未写明 `http/https` 白名单、`noopener,noreferrer` 和 `window.opener` 防护。 | 第三方新页打开可能留下 opener 风险，非法协议处理也可能不一致。 | 在 `openExternal()` 契约中固化协议白名单与 noreferrer 防护，并加入 contract test。 |
| CH-07 | Medium | `01_PRD.md` REQ-007; `05A_TASKS.md` T3.1.1; `05B` T3.1.1 | `sites.json` schema 缺少唯一源、枚举值和 URL/image 约束。 | 数据、类型和测试可能各写一套规则，安全过滤与内容维护容易漂移。 | 明确 `siteSchema.ts` 或等价校验器，并定义 `contentMode`、URL 协议、image 路径和非法样本。 |
| CH-08 | Low | `02_ARCHITECTURE_OVERVIEW.md` §System 3/Dependency Graph | `content-catalog` 到 `asset-library` 的关系被画成依赖，但实际只是 image path 字段引用。 | 读者可能误认为存在运行时依赖，增加不必要的边界耦合。 | 将该关系改写为静态字段引用或校验引用。 |

---

## 承诺闭合验证

| 维度 | 结论 | 证据 | 对应问题 |
|------|------|------|----------|
| 结果态 | Pass | REQ-001 失败态已回链到 T1.2.4 与 05B 追溯矩阵。 | CH-02 |
| 状态态 | Pass | `FilterState` 初始值已写入 `04_SYSTEM_DESIGN/web-app.md`。 | CH-01 |
| 时间态 | Pass | 首屏 3 秒理解由 PRD、05A 和 05B 共同承接。 | - |
| 错误态 | Pass | 加载失败和外部跳转安全契约已补入 05A/05B。 | CH-02, CH-06 |
| 安全态 | Pass | schema 唯一源、URL 协议和外部跳转安全属性已补入 04/05A/05B。 | CH-06, CH-07 |
| 审计态 | Pass | 05B 规划了 `reports/content-audit.md`、INT 报告和测试报告。 | - |
| 运行态 | Pass | 测试脚本入口和测试工具配置已补入 T1.1.1 与 05B。 | CH-03 |
| 验证责任 | Pass | REQ-004/005 UI 集成链路和 REQ-003 文案断言已补入 05B。 | CH-04, CH-05 |

---

## 建议行动

### P1 — forge 前建议修复（已处理）

- 修复 CH-02 的 REQ-001 失败态追溯缺口。
- 修复 CH-03 的测试脚手架入口缺口。
- 修复 CH-06 的外部跳转安全契约。
- 对 CH-01 做二选一：补最小系统设计，或由用户显式签收跳过设计文档的风险。

### P2 — 实现阶段同步修复（已处理）

- 修复 CH-04 的筛选 UI 集成追溯缺口。
- 修复 CH-05 的卡片文案长度与截断断言。
- 修复 CH-07 的 `sites.json` schema 唯一源。

### P3 — 后续整理（已处理）

- 修复 CH-08 的静态引用措辞。

---

## 最终判断

无 Critical。

本轮 High 已由 `/change` 修复。

可进入 `/forge`，但 `/forge` 仍需按 `05A_TASKS.md` 与 `05B_VERIFICATION_PLAN.md` 逐项执行并验证。

---

## 附录：跳过项

| 项 | 原因 |
|----|------|
| Code Review | 当前仓库无 `src/`、`package.json`、`public/` 实现代码。 |
| E2E 执行 | `/challenge` 仅审查规划，不执行 E2E。 |
