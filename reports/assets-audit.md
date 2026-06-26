# 图片资产覆盖审计报告

> 版本: v1  
> 日期: 2026-06-26  
> 任务: T4.1.1

## 占位图策略

- 统一占位图：`/images/placeholders/toy-default.svg`
- 风格：柔和紫色渐变、圆润玩具表情、低信息密度
- 适用：真实截图尚未准备或网站无明确品牌图时

## 真实图策略

- 目标目录：`public/images/sites/`
- 命名约定：`{site-id}.{ext}`（如 `quick-draw.png`）
- 当前状态：v1 Wave 1 未批量导入真实截图，全部使用占位图兜底

## 覆盖清单

| ID | 名称 | 资产类型 | 路径 |
|----|------|---------|------|
| quick-draw | Quick, Draw! | placeholder | /images/placeholders/toy-default.svg |
| auto-draw | AutoDraw | placeholder | /images/placeholders/toy-default.svg |
| ai-duet | AI Duet | placeholder | /images/placeholders/toy-default.svg |
| semantris | Semantris | placeholder | /images/placeholders/toy-default.svg |
| chrome-music-lab | Chrome Music Lab | placeholder | /images/placeholders/toy-default.svg |
| sketchpad | Sketchpad | placeholder | /images/placeholders/toy-default.svg |
| nasa-kids-club | NASA Kids' Club | placeholder | /images/placeholders/toy-default.svg |
| national-geographic-kids | National Geographic Kids | placeholder | /images/placeholders/toy-default.svg |
| exploratorium | Exploratorium | placeholder | /images/placeholders/toy-default.svg |
| phet | PhET 互动仿真 | placeholder | /images/placeholders/toy-default.svg |
| wonderopolis | Wonderopolis | placeholder | /images/placeholders/toy-default.svg |
| china-digital-science-museum | 中国数字科技馆 | placeholder | /images/placeholders/toy-default.svg |
| scratch | Scratch | placeholder | /images/placeholders/toy-default.svg |
| code-org | Code.org | placeholder | /images/placeholders/toy-default.svg |
| blockly-games | Blockly Games | placeholder | /images/placeholders/toy-default.svg |
| khan-academy | Khan Academy | placeholder | /images/placeholders/toy-default.svg |
| duolingo | Duolingo | placeholder | /images/placeholders/toy-default.svg |
| khan-academy-zh | 可汗学院中文版 | placeholder | /images/placeholders/toy-default.svg |
| palace-museum-digital | 故宫博物院数字文物库 | placeholder | /images/placeholders/toy-default.svg |
| national-museum-china | 中国国家博物馆 | placeholder | /images/placeholders/toy-default.svg |
| storyline-online | Storyline Online | placeholder | /images/placeholders/toy-default.svg |
| beauty-of-science | 美丽科学 | placeholder | /images/placeholders/toy-default.svg |
| geoguessr | GeoGuessr | placeholder | /images/placeholders/toy-default.svg |
| cool-math-games | Cool Math Games | placeholder | /images/placeholders/toy-default.svg |
| toy-theater | Toy Theater | placeholder | /images/placeholders/toy-default.svg |
| switch-zoo | Switch Zoo | placeholder | /images/placeholders/toy-default.svg |
| play-2048 | 2048 | placeholder | /images/placeholders/toy-default.svg |
| little-alchemy | Little Alchemy | placeholder | /images/placeholders/toy-default.svg |
| baby-bus | 宝宝巴士 | placeholder | /images/placeholders/toy-default.svg |
| shanghai-natural-history-museum | 上海自然博物馆 | placeholder | /images/placeholders/toy-default.svg |
| kepu-china | 科普中国 | placeholder | /images/placeholders/toy-default.svg |

## 统计

- 总记录数：31
- 真实图：0
- 占位图：31
- 缺失路径：0

## 后续行动

- T3.2.1 内容复核阶段可选配真实截图，替换对应 `Site.image` 为 `/images/sites/{id}.{ext}`
- 建议优先为 visually-driven 站点（Quick Draw、AutoDraw、Chrome Music Lab、故宫博物院、美丽科学）准备截图
