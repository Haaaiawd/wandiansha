# asset-library — 最小系统设计

## 1. 范围

`asset-library` 负责网站示意图、统一占位图和图片路径可解析性。

## 2. 目录契约

```text
public/images/
  placeholders/
    toy-default.svg
  sites/
    *.jpg | *.png | *.webp | *.svg
```

## 3. 资产规则

- 每个 `Site.image` 必须可解析到 `public/images/` 下的静态资源。
- 缺少真实截图时使用统一占位图。
- `reports/assets-audit.md` 记录每个站点使用真实图或占位图。

## 4. 测试策略

- API 接口功能测试验证占位图存在。
- API 接口功能测试验证 `sites.json` 中所有 image 引用可解析。
- 截图证据覆盖真实图和占位图混合场景。

## 5. 影响需求

- [REQ-003], [REQ-007], [REQ-008]

## 8. Trade-offs

- 引用 `../03_ADR/ADR_001_TECH_STACK.md`。
- 引用 `../03_ADR/ADR_002_RECOMMENDATION_AND_SAFETY.md`。
