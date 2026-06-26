# Wave 4 — E2E Verification Guide (INT-S2)

> 版本: v1
> 日期: 2026-06-26
> 对应任务: INT-S2 — S2 Playable UI 手动验证

<!--
评测列语义（旅程结果 / Step 结果）：仅允许 PASS | PARTIAL_PASS | FAIL。
未在用户授权并完成浏览器回填前：留空或写「待实机」。
-->

## Scope

- PRD / 需求来源: `.anws/v1/01_PRD.md`
- Target: S2 已完成的 Playable UI：首页、筛选、随机抽卡、横向卡片、整卡跳转、空状态、错误边界
- Environment: `pnpm run dev` on `http://localhost:5173`
- Browser / Viewport（计划）: Chrome / Edge 桌面端 1280x720 及以上；必要时补 375x667 移动端
- User Role: 匿名访客
- Build / Commit: feature/forge-s1-data-core

## PRD traceability (RTM)

| PRD ref | Summary | Priority | Journeys |
| --- | --- | --- | --- |
| REQ-001 | 首页展示随机收录的网站卡片 | P0 | J1 |
| REQ-002 | 点击卡片进入整卡页 / 原始链接 | P0 | J1, J2 |
| REQ-003 | 筛选器按分类过滤内容 | P0 | J1 |
| REQ-008 | 随机抽卡（Random Pick）推荐一个网站 | P0 | J3 |
| REQ-012 | 安全/儿童友好过滤 | P0 | J1, J3 |
| REQ-013 | 响应式布局 | P1 | J4 |
| REQ-015 | 空状态与错误处理 | P1 | J1, J3, J5 |

## Surface coverage

| 功能面 / 入口 | 如何发现 | Journey | PRD ref | Notes |
| --- | --- | --- | --- | --- |
| 首页卡片网格 | 打开首页首屏 | J1 | REQ-001 | 默认展示 6 张随机卡片 |
| 筛选标签栏 | 首页顶部横向标签 | J1 | REQ-003 | 全部 / 游戏 / 创意 / 学习 / 工具 / 解压 / 其他 |
| 随机抽卡按钮 | 首页顶部右侧「手气不错」 | J3 | REQ-008 | 点击后跳转至抽卡结果 |
| 整卡弹窗 | 点击任意卡片封面 | J2 | REQ-002 | 横向轮播展示整卡信息 |
| 空状态提示 | 选择无结果标签后首页中部 | J1 | REQ-015 | 出现 EmptyState 并允许重置 |
| 错误边界 | 当 sites 数据异常或加载失败时 | J5 | REQ-015 | AppErrorBoundary 兜底 |
| 响应式适配 | 调整浏览器宽度 | J4 | REQ-013 | 移动端单栏，桌面端多栏 |

## Journeys（旅程级）

| ID | PRD ref | User Journey | 旅程结果 | Evidence | Notes |
| --- | --- | --- | --- | --- | --- |
| J1 | REQ-001, REQ-003, REQ-015 | 访客打开首页，查看默认推荐，切换筛选标签，观察结果变化 | 待实机 | 首页截图、筛选后截图 | |
| J2 | REQ-002 | 访客点击卡片，打开整卡弹窗，查看详情后关闭 | 待实机 | 弹窗截图 | |
| J3 | REQ-008, REQ-015 | 访客点击「手气不错」，跳转到抽卡结果并查看整卡 | 待实机 | 抽卡结果截图 | |
| J4 | REQ-013 | 访客在桌面与移动端视口下浏览首页 | 待实机 | 多视口截图 | |
| J5 | REQ-015 | 模拟数据异常时页面展示错误边界 | 待实机 | 浏览器 console 与 UI 截图 | 可通过临时破坏 sites.json 或拦截请求实现 |

## Step breakdown

| Journey | Step | PRD ref | Step 结果 | Evidence | Notes |
| --- | --- | --- | --- | --- | --- |
| J1 | S1: 打开 `http://localhost:5173`；预期看到首页标题、筛选标签栏、6 张卡片网格 | REQ-001 | 待实机 | 整页截图 | |
| J1 | S2: 点击「游戏」标签；预期卡片过滤为仅游戏类，若无结果显示空状态 | REQ-003, REQ-015 | 待实机 | 筛选后截图 | |
| J1 | S3: 点击「全部」标签；预期恢复默认随机推荐 | REQ-003 | 待实机 | 筛选后截图 | |
| J2 | S1: 在首页点击任意一张 SiteCard 封面 | REQ-002 | 待实机 | 卡片点击前截图 | |
| J2 | S2: 预期弹出整卡弹窗，显示封面、标题、标签、描述、访问按钮 | REQ-002 | 待实机 | 弹窗截图 | |
| J2 | S3: 点击关闭按钮或遮罩；预期弹窗关闭，返回首页 | REQ-002 | 待实机 | 关闭后截图 | |
| J3 | S1: 点击首页右上角「手气不错」按钮 | REQ-008 | 待实机 | 首页截图 | |
| J3 | S2: 预期页面跳转/滚动到抽卡结果区域，展示 1 张推荐卡片 | REQ-008 | 待实机 | 抽卡结果截图 | |
| J3 | S3: 点击推荐卡片的「查看整卡」或封面；预期打开整卡弹窗 | REQ-002, REQ-008 | 待实机 | 弹窗截图 | |
| J4 | S1: 在桌面视口（≥1280px）打开首页，确认多列网格 | REQ-013 | 待实机 | 桌面截图 | |
| J4 | S2: 切换为移动视口（375px），确认单列卡片且不出现横向溢出 | REQ-013 | 待实机 | 移动截图 | |
| J5 | S1: 临时将 `src/data/sites.json` 改为非法 JSON 或空数组 | REQ-015 | 待实机 | 修改后的文件截图 | 仅测试用，测后回滚 |
| J5 | S2: 刷新页面，预期出现 AppErrorBoundary 错误提示而非白屏 | REQ-015 | 待实机 | 错误页截图 | |
| J5 | S3: 恢复 `sites.json` 后刷新，首页恢复正常 | REQ-015 | 待实机 | 恢复后截图 | |

## Findings

（实机回填后追加）

## Coverage gaps

- 真实浏览器交互（hover、focus、键盘 Tab 顺序）未在组件测试中覆盖，计划在浏览器实机阶段补充。
- 网络失败场景（sites.json 404）需通过浏览器 DevTools 拦截或临时移除文件模拟。
- 跨浏览器兼容性（Firefox / Safari）不在 v1 S2 范围内。

## Recommendation

- 当前组件测试 64 例全绿，构建与 Lint 通过，S2 核心功能具备合并条件。
- 建议在浏览器实机回填 J1–J5 后，将 verdict 更新为 PASS / PARTIAL_PASS / FAIL 并补充 Evidence。
- 若实机发现 P0 阻断问题，回退至 `/change` 修复后再复测。
