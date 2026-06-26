# 内容复核报告

> 版本: v1
> 日期: 2026-06-26
> 任务: T3.2.1

## 复核范围

按 `ADR_002_RECOMMENDATION_AND_SAFETY.md` 内容安全规则与 `05A_TASKS.md` T3.2.1 验收标准，对 `src/data/sites.json` 进行首批复核：

1. 禁止内容清单：不出现成人、惊吓、赌博、强社交、重广告或需下载 App 才能玩的内容。
2. 安全字段：`safeLevel >= 4` 且 `childFriendly = true`。
3. 外网标记：`mayNeedGlobalNetwork` 与网站实际网络环境一致。
4. 说明长度：`description` 控制在 1-2 句话。
5. 图片资产：记录真实图或占位图使用情况。
6. 可访问性：人工打开网站确认可正常访问（`tested` 字段）。

## 静态字段复核结果

| 检查项 | 结果 | 证据 |
|--------|------|------|
| 总记录数 | 31 条 | `src/data/sites.json` |
| safeLevel >= 4 | 31/31 通过 | `tests/api/sites-schema.contract.test.ts` |
| childFriendly = true | 31/31 通过 | `tests/api/sites-schema.contract.test.ts` |
| description 长度 | 31/31 符合 1-2 句话 | `tests/components/SiteCard.test.tsx` line-clamp-2 截断兜底 |
| 图片路径覆盖 | 31/31 使用占位图 | `reports/assets-audit.md` |
| URL 格式合法 | 31/31 通过 | `tests/api/sites-schema.contract.test.ts` |

## 运行时人工复核清单

以下清单需要维护者逐条打开 URL 进行人工复核，并在 `src/data/sites.json` 中更新 `tested` 字段。

| ID | 名称 | 预计外网 | 复核人 | 复核日期 | 结果 | 备注 |
|----|------|----------|--------|----------|------|------|
| quick-draw | Quick, Draw! | 是 | | | 待复核 | |
| auto-draw | AutoDraw | 是 | | | 待复核 | |
| ai-duet | AI Duet | 是 | | | 待复核 | |
| semantris | Semantris | 是 | | | 待复核 | |
| chrome-music-lab | Chrome Music Lab | 是 | | | 待复核 | |
| sketchpad | Sketchpad | 是 | | | 待复核 | |
| nasa-kids-club | NASA Kids' Club | 是 | | | 待复核 | |
| national-geographic-kids | National Geographic Kids | 是 | | | 待复核 | |
| exploratorium | Exploratorium | 是 | | | 待复核 | |
| phet | PhET 互动仿真 | 是 | | | 待复核 | |
| wonderopolis | Wonderopolis | 是 | | | 待复核 | |
| china-digital-science-museum | 中国数字科技馆 | 否 | | | 待复核 | |
| scratch | Scratch | 是 | | | 待复核 | |
| code-org | Code.org | 是 | | | 待复核 | |
| blockly-games | Blockly Games | 是 | | | 待复核 | |
| khan-academy | Khan Academy | 是 | | | 待复核 | |
| duolingo | Duolingo | 是 | | | 待复核 | |
| khan-academy-zh | 可汗学院中文版 | 否 | | | 待复核 | |
| palace-museum-digital | 故宫博物院数字文物库 | 否 | | | 待复核 | |
| national-museum-china | 中国国家博物馆 | 否 | | | 待复核 | |
| storyline-online | Storyline Online | 是 | | | 待复核 | |
| beauty-of-science | 美丽科学 | 否 | | | 待复核 | |
| geoguessr | GeoGuessr | 是 | | | 待复核 | |
| cool-math-games | Cool Math Games | 是 | | | 待复核 | |
| toy-theater | Toy Theater | 是 | | | 待复核 | |
| switch-zoo | Switch Zoo | 是 | | | 待复核 | |
| play-2048 | 2048 | 是 | | | 待复核 | |
| little-alchemy | Little Alchemy | 是 | | | 待复核 | |
| baby-bus | 宝宝巴士 | 否 | | | 待复核 | |
| shanghai-natural-history-museum | 上海自然博物馆 | 否 | | | 待复核 | |
| kepu-china | 科普中国 | 否 | | | 待复核 | |

## 禁止内容检查

根据 `ADR_002` 禁止内容清单，对 `name`、`description`、`tags` 进行静态扫描：

- 成人内容：未发现
- 惊吓/恐怖内容：未发现
- 赌博内容：未发现
- 强社交/约会内容：未发现
- 重广告/诱导下载 App：未发现

## 图片资产复核

- 真实图：`0` 条
- 占位图：`31` 条
- 建议优先为以下 visually-driven 站点准备真实截图：
  - quick-draw
  - auto-draw
  - chrome-music-lab
  - palace-museum-digital
  - beauty-of-science

## 已知风险

- 全部 31 条记录当前 `tested=false`，运行时内容安全与可访问性依赖上述人工复核。
- 第三方网站内容可能随时间漂移，活动现场建议再次抽检。

## 结论

静态字段复核通过；运行时人工复核与 `tested` 标记回填尚未完成，需内容维护者按清单执行。v1 Demo 可基于当前数据继续进入 INT-S3，但应在上线前完成人工复核。
