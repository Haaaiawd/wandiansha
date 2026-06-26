# 后续优化待办

> 不影响 v1 MVP 关门，作为后续迭代候选。

## 图片资产优化

- [ ] 使用 `agent-browser` 为 31 个收录网站采集清晰美观的示意截图
- [ ] 将截图存入 `public/images/sites/{site-id}.{ext}`
- [ ] 更新 `src/data/sites.json` 中对应 `image` 路径
- [ ] 更新 `reports/assets-audit.md` 覆盖统计
- [ ] 建议优先处理的 visually-driven 站点：
  - `quick-draw`
  - `auto-draw`
  - `chrome-music-lab`
  - `palace-museum-digital`
  - `beauty-of-science`

## 运行时内容复核

- [ ] 按 `reports/content-audit.md` 清单逐条打开 URL 复核
- [ ] 将 `src/data/sites.json` 中 `tested` 字段从 `false` 更新为 `true`
- [ ] 记录运行时发现的禁止内容或外网标记调整

## E2E 实机回填

- [ ] 在浏览器中实机执行 `.anws/v1/wave-reviews/wave-4-e2e.md` J1–J5
- [ ] 将 `待实机` 结果更新为 PASS / PARTIAL_PASS / FAIL
- [ ] 补充截图 Evidence

## 动效增强（可选）

- [ ] 抽卡按钮点击后增加卡片进入动画
- [ ] 横向滑动增加更明显的 snap 提示
- [ ] 首页背景增加轻微的动态渐变/粒子效果
