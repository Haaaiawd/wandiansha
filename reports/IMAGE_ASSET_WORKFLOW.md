# 图片资产采集规范

> 目标：为 31 个收录网站补充清晰、美观、风格统一的示意图片；不阻断 v1 MVP。

## 资产标准

| 项目 | 规范 |
|------|------|
| 目标目录 | `public/images/sites/` |
| 命名 | `{site-id}.png`，必须与 `src/data/sites.json` 的 `id` 一致 |
| 推荐尺寸 | 1200 x 900 |
| 展示比例 | 4:3 |
| 格式 | PNG 优先，必要时 WebP |
| 内容 | 网站首屏、核心互动区、代表性作品页或清晰品牌界面 |
| 禁止 | 登录页、Cookie 弹窗、广告遮挡、低清缩略图、明显版权水印、成人/惊吓/赌博内容 |

## 采集优先级

### P0：最能改变卡片观感的网页玩具

- `pointer-pointer`
- `cat-bounce`
- `koalas-to-the-max`
- `weave-silk`
- `neon-flames`
- `this-is-sand`
- `fluid-simulation`
- `blob-opera`
- `deep-sea`
- `size-of-space`

### P1：活动现场高频展示站点

- 打开即玩且截图能表达玩法的站点
- 视觉反馈强、声音反馈强或荒诞感强的站点
- 卡片说明较抽象、需要图片辅助理解的站点

### P2：其余站点

- 继续使用统一占位图，不阻断 MVP。

## agent-browser 采集流程

### 1. 打开目标网站

```bash
agent-browser open <site-url>
agent-browser wait --load networkidle
```

### 2. 清理遮挡

- 如果出现 Cookie 弹窗、广告弹窗或欢迎浮层，优先关闭。
- 如果无法关闭，放弃该页，记录为 `blocked`。

### 3. 选择截图视口

```bash
agent-browser set viewport 1200 900
agent-browser screenshot public/images/sites/<site-id>.png
```

### 4. 质量检查

每张图必须满足：

- 首屏主体清晰
- 没有明显加载骨架或空白
- 没有弹窗遮挡
- 不泄露账号、用户信息或定位信息
- 视觉上能说明“这是个什么网站”

### 5. 更新数据

将 `src/data/sites.json` 对应记录的 `image` 改为：

```json
"/images/sites/<site-id>.png"
```

### 6. 更新审计

同步更新：

- `reports/assets-audit.md`
- `reports/content-audit.md`（如采集时发现内容风险）

## 失败处理

| 情况 | 处理 |
|------|------|
| 网站打不开 | 保留占位图，记录在 `reports/content-audit.md` |
| 需要登录 | 保留占位图，不采集登录后内容 |
| 弹窗无法关闭 | 保留占位图，备注 blocked |
| 内容风险不确定 | 保留占位图，标记人工复核 |
| 视觉质量差 | 保留占位图，后续找替代页面 |

## 验证命令

```bash
pnpm run test
pnpm run build
```

重点关注：

- `tests/api/assets.contract.test.ts`
- `tests/api/sites-schema.contract.test.ts`
- `tests/components/SiteCard.test.tsx`

## MVP 决策

当前 v1 MVP 允许继续使用统一占位图。真实截图采集属于后续优化，不阻断功能关门。
