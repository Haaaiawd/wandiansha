# 纠错报告 — 收录方向与卡片体验

> 日期: 2026-06-26

## 问题结论

上一版失败点不是单个 bug，而是产品契约执行偏航：

- 收录方向偏向教育、课程、博物馆和科普平台。
- UI 把“横向滑动卡片流”实现成了多卡并排列表。
- 图片全部占位导致卡片页重复感更强。

## 根因

PRD 中存在“网页玩具”“The Useless Web / Bored Button”“轻松好玩=怪趣/视觉玩具/小游戏”等方向，但后续系统设计、任务和验证没有把“先有趣再安全”变成硬门禁。

因此旧实现能通过 schema、安全过滤和组件测试，却不符合“网页扭蛋机”的体验目标。

## 本次修正

### 数据

- `src/data/sites.json` 已重建为 31 条。
- 剔除课程、教育平台、博物馆静态页和泛学习站点。
- 当前优先方向：互联网怪站、Neal.fun 类互动实验、视觉玩具、声音玩具、AI 玩具、轻量小游戏、离谱选择。

### UI

- `CardCarousel` 已从多卡并排改为一屏一张主卡。
- 桌面端增加上一张/下一张按钮。
- 移动端保留横向滑动。
- `SiteCard` 增加类别标识和“点开玩”CTA，使卡片更像抽到的网页玩具。

### 门禁

- 新增 `tests/api/sites-taste.contract.test.ts`。
- 以后出现课程/课件/教育平台/工具导航等旧方向，测试直接失败。

### 规范

- 新增 `reports/COLLECTION_STANDARD.md`。
- 更新 `reports/IMAGE_ASSET_WORKFLOW.md` 的截图采集优先级。

## 验证结果

- `pnpm run build`: 通过
- `pnpm run lint`: 通过
- `pnpm run test`: 13 files / 69 tests passed

## 当前预览截图

- `screenshots/corrected-home-desktop.png`
- `screenshots/corrected-carousel-desktop.png`
- `screenshots/corrected-carousel-mobile.png`

## 剩余风险

- 31 个网站尚未逐条用 agent-browser 实测。
- 所有卡片仍使用统一占位图。
- 个别站点可能因网络、地区、第三方内容变化需要替换。

## 下一步

先人工预览当前纠错版方向；确认方向对了，再用 agent-browser 按 `reports/IMAGE_ASSET_WORKFLOW.md` 批量采集真实示意图。
