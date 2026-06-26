# ADR-001: 前端技术栈与静态部署

## 状态

Accepted

## 日期

2026-06-26

## 背景

`玩点啥.ai` v1 是面向线下 AI 体验活动的轻量网页 Demo。

- PRD 要求首页、抽卡、筛选、横向滑动卡片和整卡跳转。
- v1 不做登录、后台、数据库、实时搜索或向量检索。
- 现场目标是能跑、不卡、低失败率、手机和桌面都可用。
- 团队与预算未提供；评估假设 H-01：优先选择主流、低学习成本、免费开源方案。

## 决策驱动因素

- 因素 1: 纯前端本地数据足以满足 [REQ-001] 至 [REQ-008]。
- 因素 2: 现场稳定性优先于服务端扩展能力。
- 因素 3: 卡片视觉和滑动体验需要组件化开发。
- 因素 4: 网站库只有 30-80 条规模，本地 JSON 足够。
- 因素 5: 验证门禁必须覆盖推荐纯函数、卡片 UI 和关键 E2E 路径。

## 候选方案

### 方案 A: React + Vite + TypeScript + Tailwind CSS + local JSON

- **描述**: 单页静态应用，使用本地 `sites.json` 与静态图片资产。
- **优点**:
  - 满足所有 MVP 交互需求。
  - 构建和部署简单。
  - TypeScript 便于约束网站数据结构。
  - Tailwind 适合快速实现响应式卡片和柔和视觉。
- **缺点**:
  - 不内置后台内容管理。
  - Tailwind 类名可能膨胀，需要克制组件结构。

### 方案 B: Next.js + TypeScript + Tailwind CSS

- **描述**: 使用 Next.js 构建可静态导出的 React 应用。
- **优点**:
  - 路由和部署生态成熟。
  - 后续扩展 SSR、API Route 或 CMS 更顺。
- **缺点**:
  - v1 没有服务端需求，框架能力过剩。
  - 引入路由和运行时概念会增加认知负担。

### 方案 C: Vanilla TypeScript + CSS Modules

- **描述**: 不使用 React，直接用浏览器 API 实现 UI。
- **优点**:
  - 运行时最轻。
  - 依赖最少。
- **缺点**:
  - 组件复用和交互状态维护成本更高。
  - 卡片、筛选和 carousel 组合后容易形成手写 DOM 复杂度。

### 12 维评估摘要

| 维度 | React + Vite | Next.js | Vanilla TS |
|------|:------------:|:-------:|:----------:|
| 需求匹配 | 5 | 5 | 3 |
| 扩展性 | 4 | 5 | 2 |
| 性能 | 4 | 4 | 5 |
| 安全性 | 4 | 4 | 3 |
| 团队技能 | 5 | 4 | 3 |
| 人才市场 | 5 | 5 | 4 |
| 开发速度 | 5 | 4 | 3 |
| TCO | 5 | 4 | 4 |
| 社区生态 | 5 | 5 | 3 |
| 长期维护 | 4 | 5 | 2 |
| 集成能力 | 4 | 5 | 2 |
| AI 就绪 | 3 | 4 | 2 |
| **总分** | **53** | **54** | **36** |

Next.js 分数略高，但其优势主要来自 v1 不需要的服务端和扩展能力；React + Vite 的实际复杂度更低。

## 决策

采用 **React + Vite + TypeScript + Tailwind CSS + local JSON**。

验证策略如下：

- 单元测试覆盖 `recommend.ts`、`filters.ts`、`shuffle.ts`。
- 组件测试覆盖 `FilterSwitch`、`SiteCard`、`CardCarousel` 的关键状态。
- E2E 冒烟覆盖首页抽卡、筛选切换、横向滑动和整卡跳转。
- PR 前门禁为 lint、build、unit test。
- 发布前门禁为关键 E2E 冒烟和移动端人工走查。

## 后果

### 正面

- 首版部署简单，可直接托管静态站点。
- 推荐逻辑可用纯函数独立测试。
- UI 组件化足够支撑卡片、开关和滑动页。
- 不提前引入后台和数据库。

### 负面

- 网站库维护依赖人工编辑 JSON。
- 大规模内容运营需要后续版本引入 CMS 或后台。
- Tailwind 需要约束类名使用，避免组件可读性下降。

### 需要的后续行动

- 在 `/blueprint` 中定义 Vite 项目初始化任务。
- 在 `/blueprint` 中定义推荐纯函数测试任务。
- 在 `/blueprint` 中定义 E2E 冒烟路径。

## 参考资料

- `.anws/v1/01_PRD.md`
- `.anws/v1/02_ARCHITECTURE_OVERVIEW.md`
- Sequential Thinking session: `wandian-tech-evaluation`

## 影响范围

本 ADR 被以下系统引用:

- [web-app](../04_SYSTEM_DESIGN/web-app.md) - §8 Trade-offs
- [recommendation-engine](../04_SYSTEM_DESIGN/recommendation-engine.md) - §8 Trade-offs
- [content-catalog](../04_SYSTEM_DESIGN/content-catalog.md) - §8 Trade-offs
- [asset-library](../04_SYSTEM_DESIGN/asset-library.md) - §8 Trade-offs

> **维护说明**: 当 SYSTEM_DESIGN 在 §8 引用本 ADR 时，应在此处添加引用记录。
