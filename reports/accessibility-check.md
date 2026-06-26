# 性能与可访问性检查报告

> 版本: v1
> 日期: 2026-06-26
> 任务: T1.3.2

## 检查项

### 构建与体积

| 检查项 | 结果 | 证据 |
|--------|------|------|
| `pnpm run build` 通过 | 通过 | `logs/build.log` |
| 无构建错误 | 通过 | `logs/build.log` |
| 未引入非预期依赖 | 通过 | `package.json` 未变更 |

### 键盘可达性（静态检查）

| 元素 | 是否可键盘聚焦 | 说明 |
|------|----------------|------|
| 「抽一下」按钮 | 是 | `type="button"` |
| 网络环境筛选 | 是 | 两个 `type="button"` |
| 内容倾向筛选 | 是 | 两个 `type="button"` |
| 返回按钮 | 是 | `type="button"` |
| SiteCard 链接 | 是 | `a` 元素，默认可达 |

### ARIA 语义

| 组件 | 属性 | 状态 |
|------|------|------|
| FilterSwitch | `role="group"`, `aria-label` | 已落实 |
| FilterSwitch 按钮 | `aria-pressed` | 已落实 |
| CardCarousel | `aria-label="推荐卡片列表"` | 已落实 |
| EmptyState 图标 | `aria-hidden="true"` | 已落实 |
| SiteCard 外网标记 | 文本可见，无 aria-label | 可接受 |

### 性能相关

- 图片使用 `loading="lazy"` 懒加载
- 动画使用 CSS transform/opacity，可硬件加速
- 无第三方追踪脚本
- 字体通过 Google Fonts CDN 异步加载

## 发现

无阻断性问题。

## 结论

T1.3.2 性能与可访问性检查通过。页面满足首屏理解、键盘可达、基础语义和构建稳定性底线。
