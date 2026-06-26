# 网站收录标准 — 纠错版

> 核心原则：先有趣，再安全；先好玩，再有用。

## 1. 反向规则

以下方向默认不收录：

- 儿童教育网站
- AI 学习网站
- 在线课程网站
- 普通工具导航
- 普通小游戏平台首页
- 纯阅读科普文章
- 需要登录、下载、复杂教程的网站

如果一个网站只是“有用”但不好玩，不收录。

## 2. 正向判断

每个候选网站必须尽量满足：

1. 打开后 5 秒内知道怎么玩。
2. 有真实互动，而不是纯阅读。
3. 不需要登录。
4. 不需要下载。
5. 免费可体验。
6. 没有成人、擦边、血腥、惊吓、赌博、强广告。
7. 适合小朋友或亲子现场。
8. 5 到 20 分钟内能获得乐趣。
9. 适合作为一张卡片展示。
10. 有机会采集一张好看的截图或示意图。

## 3. 优先收录方向

### P0：互联网怪站 / 无用但好玩

例如：Pointer Pointer、Find the Invisible Cow、Cat Bounce、Koalas to the Max。

### P0：Neal.fun 类互动网页实验

例如：The Deep Sea、The Size of Space、Spend Bill Gates' Money、Draw Logos From Memory。

### P0：视觉玩具 / 鼠标玩具 / 生成艺术

例如：Weave Silk、Neon Flames、This Is Sand、Fluid Simulation。

### P1：声音 / 音乐 / 节奏网页玩具

例如：Chrome Music Lab、Song Maker、Blob Opera、Patatap、Typedrummer。

### P1：轻量小游戏 / 浏览器即玩小游戏

只收具体页面，不收平台首页。

### P1：轻量选择 / 离谱决策 / 投票感网站

可以好笑，但不能过度黑暗。

### P1：AI 互动网站

只收“能玩”的 AI demo，不收 AI 工具大全。

### P2：探索 / 尺度 / 世界观网站

必须是互动体验，不收纯文章。

## 4. 当前数据门禁

`tests/api/sites-taste.contract.test.ts` 负责防止数据重新漂向课程、教育平台或工具导航。

## 5. 当前纠错结论

旧数据偏向教育、课程、博物馆和科普站，违反“网页扭蛋机”的核心体验。

新数据优先采用怪站、互动实验、视觉玩具、声音玩具和轻量挑战。
