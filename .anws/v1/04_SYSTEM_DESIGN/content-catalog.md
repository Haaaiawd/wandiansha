# content-catalog — 最小系统设计

## 1. 范围

`content-catalog` 负责 `sites.json` 数据契约、内容安全字段和人工审核记录。

## 2. 数据模型

```ts
type ContentMode = "light" | "useful";

type Site = {
  id: string;
  name: string;
  url: string;
  description: string;
  image: string;
  category: string;
  tags: string[];
  contentMode: ContentMode;
  domesticPriority: boolean;
  mayNeedGlobalNetwork: boolean;
  childFriendly: boolean;
  safeLevel: 1 | 2 | 3 | 4 | 5;
  tested: boolean;
};
```

## 3. Schema 约束

- 唯一 schema 源为 `src/data/siteSchema.ts` 或等价校验器。
- `id` 必须唯一。
- `url` 只允许 `http:` 或 `https:`。
- `image` 必须指向 `/images/...` 下的静态路径或占位图。
- `contentMode` 只能是 `light` 或 `useful`。
- `description` 控制在 1-2 句话；超长文案须由内容复核处理。

## 4. 审核语义

| 字段 | 语义 |
|------|------|
| `safeLevel` | 默认推荐只展示 4 或 5 |
| `childFriendly` | 默认推荐必须为 true |
| `tested` | 是否已人工打开并复核核心体验 |
| `mayNeedGlobalNetwork` | 是否可能需要外网环境 |

## 5. 测试策略

- API 接口功能测试覆盖 schema 正常样本和非法样本。
- 内容审核报告覆盖禁止内容清单、外网标记和 `tested` 字段。
- 资产覆盖报告记录每条数据使用真实图或占位图。

## 6. 影响需求

- [REQ-002], [REQ-003], [REQ-004], [REQ-005], [REQ-006], [REQ-007]

## 7. 与 asset-library 的关系

`content-catalog` 仅保存图片路径字段；它不在运行时依赖 `asset-library`，但会通过 schema 或审核报告校验路径可解析。

## 8. Trade-offs

- 引用 `../03_ADR/ADR_001_TECH_STACK.md`。
- 引用 `../03_ADR/ADR_002_RECOMMENDATION_AND_SAFETY.md`。
