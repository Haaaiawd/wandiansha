# recommendation-engine — 最小系统设计

## 1. 范围

`recommendation-engine` 负责安全过滤、筛选排序和随机推荐纯函数。

## 2. 公开类型

```ts
type NetworkMode = "domestic" | "all";
type ContentMode = "light" | "useful";

type FilterState = {
  networkMode: NetworkMode;
  contentMode: ContentMode;
};

type RecommendationBatch = Site[];
```

## 3. 公开函数

```ts
function filterSafeSites(sites: Site[]): Site[];
function sortByNetworkMode(sites: Site[], mode: NetworkMode): Site[];
function sortByContentMode(sites: Site[], mode: ContentMode): Site[];
function shuffleSites(sites: Site[], seed?: number): Site[];
function recommendSites(sites: Site[], filters: FilterState): RecommendationBatch;
```

## 4. 规则顺序

1. 过滤 `safeLevel >= 4`。
2. 过滤 `childFriendly = true`。
3. 应用网络环境排序。
4. 应用内容倾向排序。
5. 在排序分组内随机打乱。

## 5. 边界行为

| 场景 | 结果 |
|------|------|
| 输入为空数组 | 返回空数组 |
| 全部条目不安全 | 返回空数组 |
| 国内优先结果不足 | 可补充安全的非国内优先条目，并保留外网标记 |
| seed 存在 | 测试中可复现随机顺序 |

## 6. 测试策略

- 单元测试覆盖规则顺序、边界输入和非法样本。
- API 接口功能测试覆盖公开函数签名和输入输出契约。
- UI 集成测试覆盖筛选变化后卡片流更新。

## 7. 影响需求

- [REQ-002], [REQ-004], [REQ-005], [REQ-007]

## 8. Trade-offs

- 引用 `../03_ADR/ADR_001_TECH_STACK.md`。
- 引用 `../03_ADR/ADR_002_RECOMMENDATION_AND_SAFETY.md`。
