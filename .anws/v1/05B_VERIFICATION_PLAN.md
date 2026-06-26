# 05B_VERIFICATION_PLAN.md — 验证计划

> 版本: v1  
> 产出自: /blueprint  
> 最后更新: 2026-06-26  
> 执行主清单: 05A_TASKS.md（每个验证条目有对应 Task ID）

---

## 1. 范围与目标

本验证计划覆盖 v1 所有 P0/P1 任务。

目标：

- 验证首页、抽卡、筛选、卡片、滑动和跳转主路径。
- 验证 `sites.json` 文件格式、安全字段和图片路径契约。
- 验证推荐规则、安全过滤和随机展示公开函数契约。
- 同时规划单元测试与 API 接口功能测试；本项目的 API 接口功能测试指公开模块接口与本地文件契约测试，不伪造 HTTP 后端。
- 仅记录 E2E 范围与证据预期，不在 `/blueprint` 阶段执行 E2E。

---

## 2. 验证分层策略

| 层次 | 负责范围 | 主要工具/材料 |
|------|---------|--------------|
| 单元测试 | 推荐规则、筛选、随机、组件状态和异常处理 | Vitest / Testing Library |
| API接口功能测试 | `recommend()` 等公开模块接口、`sites.json` schema、图片路径和 `openExternal()` 契约 | Vitest contract tests |
| 集成测试 | 推荐结果进入 UI、卡片流与筛选状态连接 | Testing Library / local app |
| E2E测试 | 首页抽卡、筛选、滑动、整卡跳转关键路径 | Playwright，`/forge` 阶段执行 |
| 冒烟测试 | Sprint 退出关口 | INT-S1 / INT-S2 / INT-S3 |
| 回归测试 | 已完成关键能力不被视觉或内容调整破坏 | 复用 unit/component/E2E smoke |
| 手动验证 | 视觉质量、内容安全、移动端现场体验 | 截图、审查报告、走查记录 |

---

## 3. 风险类别覆盖原则

- 安全过滤风险优先用单元测试和数据契约测试闭合。
- 文件格式风险优先用 API 接口功能测试闭合。
- UI 交互风险优先用组件测试和少量集成测试闭合。
- 关键用户链路用 E2E 冒烟覆盖，不枚举所有筛选组合。
- 内容安全依赖人工审核报告，不用自动化测试冒充审核。

---

## 4. 测试材料与证据要求

| 验证类型 | 测试材料位置 | 证据形式 |
|---------|------------|---------|
| 单元测试 | `tests/unit/` | 测试报告 / CI 日志 |
| API接口功能测试 | `tests/api/` | contract 测试报告 / schema 失败样本 |
| 组件测试 | `tests/components/` | 测试报告 / DOM 断言日志 |
| 集成测试 | `tests/integration/` | 集成测试报告 |
| E2E测试 | `tests/e2e/` | 截图 / 录屏 / Playwright report |
| 冒烟测试 | `reports/INT-S*.md` | 通过/失败记录 + Bug 清单 |
| 手动验证 | `reports/*.md`, `screenshots/` | 走查记录 / 截图 |

---

## 5. Task-by-Task 验证计划

### T1.1.1
- **关联需求**: 基础
- **关联契约**: React + Vite + TypeScript + Tailwind 技术栈契约；测试脚本入口契约
- **风险类别**: 构建失败 / 脚手架漂移
- **单元测试覆盖**: 不适用
- **API接口功能测试覆盖**: 不适用
- **集成/E2E/冒烟覆盖**: INT-S1 执行 build/lint/test 冒烟
- **前置数据**: 无
- **断言**: install、build、lint、test、test:unit 命令可执行且无阻断错误；test:e2e 可发现 Playwright 配置
- **证据**: `logs/install.log`, `logs/build.log`, `logs/lint.log`, `logs/test.log`

### T1.2.1
- **关联需求**: REQ-001, REQ-004, REQ-005
- **关联契约**: 首页首屏可见契约；双态筛选操作契约；默认 FilterState 契约
- **风险类别**: UI 可见性 / 状态切换
- **单元测试覆盖**: 筛选状态默认值与切换状态
- **API接口功能测试覆盖**: 不适用
- **集成/E2E/冒烟覆盖**: INT-S2 验证首页可见和筛选可切换
- **前置数据**: 默认 filter state
- **断言**: 产品名、副标题、抽卡按钮、两个筛选开关存在；默认网络环境为国内优先；切换后状态改变
- **证据**: `tests/components/Home.test.tsx`, `screenshots/home-mobile.png`, `screenshots/home-desktop.png`

### T1.2.2
- **关联需求**: REQ-003, REQ-006
- **关联契约**: 卡片展示契约；整卡点击契约；图片兜底契约
- **风险类别**: UI 信息密度 / 外部跳转 / 图片缺失
- **单元测试覆盖**: 标签最多 3 个；图片缺失使用占位图；超长说明截断或受控展示
- **API接口功能测试覆盖**: 不适用
- **集成/E2E/冒烟覆盖**: INT-S2 验证卡片可见；INT-S3 验证跳转
- **前置数据**: 有效 Site 样本与缺图 Site 样本
- **断言**: 名称、1-2 句话说明、图片、标签渲染符合 PRD；超长说明不撑破卡片；点击区域覆盖整卡
- **证据**: `tests/components/SiteCard.test.tsx`, `screenshots/card.png`

### T1.2.3
- **关联需求**: REQ-002, REQ-004, REQ-005
- **关联契约**: 横向滑动操作契约；推荐结果展示契约
- **风险类别**: UI 与推荐集成 / 触屏浏览
- **单元测试覆盖**: carousel 边界状态
- **API接口功能测试覆盖**: 不适用
- **集成/E2E/冒烟覆盖**: 集成测试验证推荐结果进入卡片流；INT-S2 验证可滑动
- **前置数据**: 多条 Site 样本
- **断言**: 卡片按推荐结果展示；滑动不会丢失卡片；末尾可到达
- **证据**: `tests/components/CardCarousel.test.tsx`, `tests/integration/recommendation-flow.test.tsx`

### T1.2.4
- **关联需求**: REQ-001, REQ-002, REQ-006
- **关联契约**: 外部跳转契约；空结果错误语义；数据失败错误语义；URL 协议白名单；`noopener,noreferrer` 防护
- **风险类别**: 错误语义 / 外部跳转
- **单元测试覆盖**: 空结果与加载失败 UI
- **API接口功能测试覆盖**: `openExternal()` 对合法/非法 URL、协议白名单、`noopener,noreferrer` 与 `window.opener` 防护的行为契约
- **集成/E2E/冒烟覆盖**: INT-S2 验证空状态；INT-S3 验证跳转主路径
- **前置数据**: 空推荐结果、非法 URL 样本、合法 URL 样本
- **断言**: 空结果提示文案准确；加载失败不空白页；非法 URL 不跳转；合法 URL 用 `noopener,noreferrer` 新页打开
- **证据**: `tests/components/EmptyState.test.tsx`, `tests/api/openExternal.contract.test.ts`

### T1.2.5
- **关联需求**: REQ-001, REQ-003, REQ-008
- **关联契约**: UI 可见性、筛选状态、卡片展示、错误提示契约
- **风险类别**: UI 回归
- **单元测试覆盖**: 首页、筛选、卡片、空状态组件
- **API接口功能测试覆盖**: 不适用
- **集成/E2E/冒烟覆盖**: INT-S2 作为 UI 完成关口
- **前置数据**: 组件样本数据
- **断言**: 关键组件测试通过
- **证据**: `tests/components/*.test.tsx`, `reports/component-tests.log`

### T1.3.1
- **关联需求**: REQ-008
- **关联契约**: 视觉风格、低信息密度、移动端 360px 可用契约
- **风险类别**: 视觉质量 / 响应式布局
- **单元测试覆盖**: 不适用
- **API接口功能测试覆盖**: 不适用
- **集成/E2E/冒烟覆盖**: INT-S3 截图走查
- **前置数据**: 完整 UI 页面
- **断言**: 移动端和桌面端布局可读、不拥挤、不牺牲对比度
- **证据**: `screenshots/home-mobile.png`, `screenshots/carousel-desktop.png`

### T1.3.2
- **关联需求**: REQ-001, REQ-002, REQ-008
- **关联契约**: 首屏理解契约；现场不卡契约
- **风险类别**: 性能 / 可访问性 / 构建稳定
- **单元测试覆盖**: 不适用
- **API接口功能测试覆盖**: 不适用
- **集成/E2E/冒烟覆盖**: INT-S3 发布前冒烟
- **前置数据**: 完整应用
- **断言**: build 通过；核心按钮可键盘触达；页面在 30-80 条数据下无明显卡顿
- **证据**: `logs/build.log`, `reports/accessibility-check.md`, `reports/performance-check.md`

### T1.3.3
- **关联需求**: REQ-001, REQ-002, REQ-006
- **关联契约**: 关键用户路径端到端契约
- **风险类别**: 现场主路径失败
- **单元测试覆盖**: 不适用
- **API接口功能测试覆盖**: 不适用
- **集成/E2E/冒烟覆盖**: E2E 冒烟覆盖首页抽卡、筛选、滑动、跳转
- **前置数据**: 完整应用和测试网站数据
- **断言**: 关键路径通过；不枚举所有筛选组合
- **证据**: `tests/e2e/smoke.spec.ts`, `reports/e2e-smoke.md`, `screenshots/e2e/`

### T2.1.1
- **关联需求**: REQ-002, REQ-004, REQ-005, REQ-007
- **关联契约**: 安全过滤契约；网络环境契约；contentMode 排序契约；`FilterState` 和 `RecommendationBatch` 公开类型契约
- **风险类别**: 推荐规则错误 / 安全漏放
- **单元测试覆盖**: safeLevel、childFriendly、domesticPriority、mayNeedGlobalNetwork、contentMode、空结果
- **API接口功能测试覆盖**: `recommendSites()`, `filterSafeSites()`, `sortByNetworkMode()`, `sortByContentMode()`, `shuffleSites()` 公开函数输入输出契约
- **集成/E2E/冒烟覆盖**: INT-S1 验证测试通过；INT-S2 验证 UI 集成
- **前置数据**: 合法、非法、边界 Site 样本
- **断言**: safeLevel < 4 或 childFriendly = false 不进入默认结果；筛选优先级符合 ADR
- **证据**: `tests/unit/recommend.test.ts`, `tests/api/recommend.contract.test.ts`

### T2.1.2
- **关联需求**: REQ-002, REQ-004, REQ-005, REQ-007
- **关联契约**: 推荐公开接口契约；`sites.json` 文件格式契约
- **风险类别**: 契约漂移 / 组合测试膨胀
- **单元测试覆盖**: 表驱动测试覆盖正常、边界、异常样本
- **API接口功能测试覆盖**: 推荐模块公开接口与 schema contract 测试
- **集成/E2E/冒烟覆盖**: INT-S1 关门任务
- **前置数据**: 测试夹具与真实 `sites.json`
- **断言**: 所有代表性样本通过；无安全规则漏测
- **证据**: `tests/unit/recommend.test.ts`, `tests/api/*.contract.test.ts`, `reports/test.log`

### T3.1.1
- **关联需求**: REQ-007
- **关联契约**: `sites.json` 文件格式契约；唯一 schema 源契约；安全字段契约；枚举值和 URL/image 约束
- **风险类别**: 数据缺字段 / 不安全内容进入推荐
- **单元测试覆盖**: 不适用
- **API接口功能测试覆盖**: schema 校验正常样本、缺字段、非法 `contentMode`、非法 URL 协议、非法 image 路径样本
- **集成/E2E/冒烟覆盖**: INT-S1 验证真实数据可被推荐函数消费
- **前置数据**: 首批网站条目
- **断言**: 至少 30 条；必需字段齐全；`siteSchema.ts` 或等价校验器是唯一 schema 源；safeLevel 与 childFriendly 可被测试读取
- **证据**: `tests/api/sites-schema.contract.test.ts`, `reports/content-audit.md`

### T3.2.1
- **关联需求**: REQ-007
- **关联契约**: 禁止内容清单；`tested` 字段审核契约；图片路径引用契约；description 长度复核契约；资产覆盖记录契约
- **风险类别**: 内容安全 / 外部网站变化 / 图片路径失效
- **单元测试覆盖**: 不适用
- **API接口功能测试覆盖**: 图片路径引用、schema 状态字段和 description 长度校验
- **集成/E2E/冒烟覆盖**: INT-S3 现场路径走查
- **前置数据**: 完整 `sites.json` 和图片资产
- **断言**: 不出现禁止内容；外网标记准确；`tested` 字段记录清楚；description 满足 1-2 句话；资产覆盖记录存在
- **证据**: `reports/content-audit.md`, `reports/assets-audit.md`, `logs/content-check.log`

### T4.1.1
- **关联需求**: REQ-003, REQ-007, REQ-008
- **关联契约**: 卡片图片必需契约；图片缺失兜底契约；30 条内容图片覆盖记录契约
- **风险类别**: 图片缺失 / 视觉退化
- **单元测试覆盖**: 不适用
- **API接口功能测试覆盖**: assets contract 测试验证占位图、引用路径和每条 Site 的 image 可解析
- **集成/E2E/冒烟覆盖**: INT-S2/INT-S3 截图验证
- **前置数据**: 图片路径清单
- **断言**: 默认占位图存在；真实图片路径可被访问；缺图时兜底可见；30 条内容均有真实图或占位策略记录
- **证据**: `tests/api/assets.contract.test.ts`, `screenshots/card-placeholder.png`, `reports/assets-audit.md`

### INT-S1
- **关联需求**: S1 退出标准
- **关联契约**: 技术栈、`sites.json`、推荐函数、图片资产契约
- **风险类别**: Sprint 关口 / 基础集成失败
- **单元测试覆盖**: 执行推荐单元测试
- **API接口功能测试覆盖**: 执行 schema、recommend、assets contract 测试
- **集成/E2E/冒烟覆盖**: build/lint/test 冒烟
- **前置数据**: S1 所有任务已完成
- **断言**: build、lint、unit、API contract 全部通过
- **证据**: `reports/INT-S1.md`, `logs/build.log`, `reports/test.log`

### INT-S2
- **关联需求**: S2 退出标准
- **关联契约**: 首页、筛选、卡片、滑动、跳转、空状态契约
- **风险类别**: UI 集成失败 / 主流程不可演示
- **单元测试覆盖**: 组件测试集合
- **API接口功能测试覆盖**: 复用推荐与跳转 contract 测试
- **集成/E2E/冒烟覆盖**: 本地手动冒烟与集成测试
- **前置数据**: S2 所有任务已完成
- **断言**: 抽卡主路径可演示；失败记录 Bug
- **证据**: `reports/INT-S2.md`, `screenshots/playable-flow.png`

### INT-S3
- **关联需求**: S3 退出标准
- **关联契约**: 现场可用性、E2E 冒烟、内容安全复核契约
- **风险类别**: 发布前主路径失败 / 内容安全漏检
- **单元测试覆盖**: 回归运行已有测试
- **API接口功能测试覆盖**: 回归运行 contract 测试
- **集成/E2E/冒烟覆盖**: E2E 冒烟 + 移动端人工走查
- **前置数据**: S3 所有任务已完成
- **断言**: 首页抽卡、筛选、滑动、整卡跳转通过；内容审核报告存在
- **证据**: `reports/INT-S3.md`, `reports/e2e-smoke.md`, `screenshots/e2e/`

---

## 6. Contract Coverage Overlay

| 契约 | 类型 | 实现承接 | 验证承接 | 状态 |
|------|------|---------|---------|:----:|
| React + Vite + TypeScript + Tailwind 技术栈 | 配置结构 | T1.1.1 | T1.1.1 build/lint/test, INT-S1 | ⬜ |
| 测试脚本入口 | 配置结构 | T1.1.1 | T1.1.1 build/lint/test, INT-S1 | ⬜ |
| `sites.json` 必需字段 | 文件格式 | T3.1.1 | T3.1.1 API接口功能测试, T2.1.2 | ⬜ |
| `sites.json` schema 唯一源 | 文件格式 | T3.1.1 | T3.1.1 API接口功能测试 | ⬜ |
| `safeLevel >= 4` 默认过滤 | 操作契约 | T2.1.1 | T2.1.1 单元测试, T2.1.2 | ⬜ |
| `childFriendly = true` 默认过滤 | 操作契约 | T2.1.1 | T2.1.1 单元测试, T2.1.2 | ⬜ |
| 国内优先排序 | 操作契约 | T2.1.1 | T2.1.1 单元测试, INT-S2 | ⬜ |
| 全部模式外网标记 | UI/数据契约 | T1.2.2, T2.1.1 | T1.2.2 组件测试, INT-S3 | ⬜ |
| 内容倾向排序 | 操作契约 | T2.1.1 | T2.1.1 单元测试 | ⬜ |
| 卡片最多 3 个标记 | UI 契约 | T1.2.2 | T1.2.2 组件测试 | ⬜ |
| 卡片说明 1-2 句话与截断 | UI/内容契约 | T1.2.2, T3.2.1 | T1.2.2 组件测试, T3.2.1 内容审核 | ⬜ |
| 图片缺失占位图 | 静态资产契约 | T4.1.1, T1.2.2 | T4.1.1 API接口功能测试, T1.2.2 组件测试 | ⬜ |
| 30 条内容图片覆盖记录 | 静态资产契约 | T4.1.1, T3.2.1 | T4.1.1 API接口功能测试, T3.2.1 审核报告 | ⬜ |
| 整卡新页跳转 | 操作契约 | T1.2.4 | T1.2.4 API接口功能测试, INT-S3 | ⬜ |
| 外部跳转安全属性 | 安全契约 | T1.2.4 | T1.2.4 API接口功能测试 | ⬜ |
| 空结果提示文案 | 错误语义 | T1.2.4 | T1.2.4 组件测试 | ⬜ |
| 本地数据加载失败提示 | 错误语义 | T1.2.4 | T1.2.4 组件测试, INT-S2 | ⬜ |
| 禁止内容清单 | 内容安全契约 | T3.2.1 | T3.2.1 手动审核报告 | ⬜ |
| AI 智能推荐不进入 v1 | 范围契约 | T2.1.1, T3.1.1 | INT-S3 范围审查 | ⬜ |

---

## 7. Testing Coverage Overlay

| 测试责任 | 风险类别 | 覆盖方法 | 任务承接 | 测试材料 | 状态 |
|---------|---------|---------|---------|---------|:----:|
| 推荐规则正常/边界/异常 | 业务逻辑 | 单元测试 + 表驱动样本 | T2.1.1, T2.1.2 | `tests/unit/recommend.test.ts` | ⬜ |
| 公开推荐函数输入输出 | API接口契约 | API接口功能测试 | T2.1.1, T2.1.2 | `tests/api/recommend.contract.test.ts` | ⬜ |
| `sites.json` 字段与类型 | 文件格式 | API接口功能测试 | T3.1.1, T2.1.2 | `tests/api/sites-schema.contract.test.ts` | ⬜ |
| `sites.json` 枚举、URL、image 约束 | 文件格式 | API接口功能测试 + 非法样本 | T3.1.1 | `tests/api/sites-schema.contract.test.ts` | ⬜ |
| 图片路径和占位图 | 静态资产契约 | API接口功能测试 + 截图 | T4.1.1 | `tests/api/assets.contract.test.ts` | ⬜ |
| 外部跳转安全 | 安全契约 | API接口功能测试 + 代表性 URL 样本 | T1.2.4 | `tests/api/openExternal.contract.test.ts` | ⬜ |
| 首页与筛选组件 | UI 状态 | 组件测试 | T1.2.1, T1.2.5 | `tests/components/Home.test.tsx` | ⬜ |
| 卡片展示和点击 | UI/操作契约 | 组件测试 + E2E 冒烟 | T1.2.2, T1.2.4 | `tests/components/SiteCard.test.tsx`, `tests/e2e/smoke.spec.ts` | ⬜ |
| 横向滑动与推荐集成 | 跨模块协作 | 集成测试 + 冒烟 | T1.2.3, INT-S2 | `tests/integration/recommendation-flow.test.tsx` | ⬜ |
| 现场主路径 | 端到端风险 | E2E 冒烟，不做组合爆炸 | T1.3.3, INT-S3 | `tests/e2e/smoke.spec.ts` | ⬜ |
| 内容安全复核 | 内容风险 | 人工审核 + 报告 | T3.2.1 | `reports/content-audit.md` | ⬜ |
| 构建与发布前稳定性 | 工程风险 | build/lint/test + INT 冒烟 | T1.1.1, INT-S1, INT-S3 | `logs/*.log`, `reports/INT-S*.md` | ⬜ |

---

## 8. Verification Traceability Matrix

| REQ/Contract | Task | Verification | Test Material | Evidence | Status |
|---|---|---|---|---|---|
| REQ-001 首页快速开始 | T1.2.1, T1.2.4, T1.2.5, INT-S2 | 组件测试 + 加载失败断言 + 冒烟 | `tests/components/Home.test.tsx`, `tests/components/EmptyState.test.tsx` | 首页截图 / INT-S2 | ⬜ |
| REQ-002 抽卡生成推荐流 | T2.1.1, T1.2.3, INT-S2 | 单元测试 + 集成测试 + 冒烟 | `tests/unit/recommend.test.ts`, `tests/integration/recommendation-flow.test.tsx` | 测试报告 / INT-S2 | ⬜ |
| REQ-003 极简卡片展示 | T1.2.2, T3.2.1, T4.1.1, T1.3.1 | 组件测试 + 内容审核 + 截图审查 | `tests/components/SiteCard.test.tsx`, `reports/content-audit.md` | 卡片截图 | ⬜ |
| REQ-004 网络环境筛选 | T2.1.1, T2.1.2, T1.2.1, T1.2.2, T1.2.3, INT-S2, INT-S3 | 单元测试 + 组件测试 + 集成/冒烟 | `tests/unit/recommend.test.ts`, `tests/components/Home.test.tsx`, `tests/integration/recommendation-flow.test.tsx` | 测试报告 / INT-S2 / INT-S3 | ⬜ |
| REQ-005 内容倾向筛选 | T2.1.1, T2.1.2, T1.2.1, T1.2.3, INT-S2 | 单元测试 + 组件测试 + 集成/冒烟 | `tests/unit/recommend.test.ts`, `tests/integration/recommendation-flow.test.tsx` | 测试报告 / INT-S2 | ⬜ |
| REQ-006 整卡跳转 | T1.2.2, T1.2.4, T1.3.3 | API接口功能测试 + E2E 冒烟 | `tests/api/openExternal.contract.test.ts`, `tests/e2e/smoke.spec.ts` | E2E 截图 / 报告 | ⬜ |
| REQ-007 网站库数据契约 | T3.1.1, T2.1.2, T3.2.1 | API接口功能测试 + 内容审核 | `tests/api/sites-schema.contract.test.ts` | content-audit 报告 | ⬜ |
| REQ-008 视觉与交互质感 | T1.3.1, T1.3.2, INT-S3 | 手动验证 + 回归 + 冒烟 | `reports/accessibility-check.md`, `reports/performance-check.md` | 移动/桌面截图 | ⬜ |
| `sites.json` 文件格式 | T3.1.1, T2.1.2 | API接口功能测试 | `tests/api/sites-schema.contract.test.ts` | contract 测试报告 | ⬜ |
| `siteSchema.ts` 唯一 schema 源 | T3.1.1 | API接口功能测试 | `tests/api/sites-schema.contract.test.ts` | contract 测试报告 | ⬜ |
| 推荐公开函数契约 | T2.1.1, T2.1.2 | 单元测试 + API接口功能测试 | `tests/unit/recommend.test.ts`, `tests/api/recommend.contract.test.ts` | 测试报告 | ⬜ |
| 图片缺失兜底 | T4.1.1, T1.2.2 | API接口功能测试 + 组件测试 | `tests/api/assets.contract.test.ts`, `tests/components/SiteCard.test.tsx` | 测试报告 / 截图 | ⬜ |
| 外部跳转契约 | T1.2.4, T1.3.3 | API接口功能测试 + E2E 冒烟 | `tests/api/openExternal.contract.test.ts`, `tests/e2e/smoke.spec.ts` | E2E 报告 | ⬜ |
| 外部跳转安全属性 | T1.2.4 | API接口功能测试 | `tests/api/openExternal.contract.test.ts` | contract 测试报告 | ⬜ |
| S1 退出标准 | INT-S1 | 冒烟测试 | build/lint/unit/API contract | `reports/INT-S1.md` | ⬜ |
| S2 退出标准 | INT-S2 | 冒烟测试 | component/integration/manual path | `reports/INT-S2.md` | ⬜ |
| S3 退出标准 | INT-S3 | 冒烟测试 + 手动验证 | E2E smoke/content audit/mobile check | `reports/INT-S3.md` | ⬜ |
