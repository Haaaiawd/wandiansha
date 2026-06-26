# web-app — 最小系统设计

## 1. 范围

`web-app` 负责首页、筛选、抽卡入口、横向卡片流、空状态和外部跳转触发。

## 2. 组件职责

| 组件 | 职责 | 输入 | 输出 |
|------|------|------|------|
| `Home` | 展示产品入口和筛选控件 | `FilterState` | 用户操作事件 |
| `FilterSwitch` | 双态筛选控件 | 当前值、左右选项 | 新筛选值 |
| `RandomButton` | 触发抽卡 | 点击事件 | `draw` action |
| `SiteCard` | 展示单个网站卡片 | `Site` | 外部跳转请求 |
| `CardCarousel` | 展示横向卡片流 | `Site[]` | 滑动浏览状态 |
| `EmptyState` | 展示空结果或加载失败 | 错误类型 | 友好提示文案 |

## 3. 默认状态

```ts
type NetworkMode = "domestic" | "all";
type ContentMode = "light" | "useful";

type FilterState = {
  networkMode: NetworkMode;
  contentMode: ContentMode;
};

const defaultFilterState: FilterState = {
  networkMode: "domestic",
  contentMode: "light"
};
```

## 4. 错误语义

| 场景 | UI 行为 |
|------|---------|
| 推荐结果为空 | 显示“这一组已经抽完啦，换个筛选再试试。” |
| 本地数据加载失败 | 显示友好错误提示，不显示空白页 |
| 图片路径不可用 | 使用 `toy-default.svg` 占位图 |
| 外部 URL 非法 | 不跳转，并由 contract test 失败暴露 |

## 5. 外部跳转契约

- 只允许 `http:` 和 `https:` URL。
- 新页面打开必须使用 `noopener,noreferrer`。
- 不允许保留可访问 `window.opener` 的跳转方式。

## 6. 测试策略

- 组件测试覆盖首页可见性、筛选状态、卡片展示、空状态和图片兜底。
- 集成测试覆盖推荐结果进入卡片流。
- E2E 冒烟只覆盖关键用户链路，不枚举所有筛选组合。

## 7. 影响需求

- [REQ-001], [REQ-002], [REQ-003], [REQ-004], [REQ-005], [REQ-006], [REQ-008]

## 8. Trade-offs

- 引用 `../03_ADR/ADR_001_TECH_STACK.md`。
- 引用 `../03_ADR/ADR_002_RECOMMENDATION_AND_SAFETY.md`。
