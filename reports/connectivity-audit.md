# 国内联通性探针报告

> 生成时间: 2026-06-26T13:54:37.152Z
> 超时阈值: 5000ms
> 代理环境: 检测到代理，结果不可直接视为国内直连

## 判定口径

- `DOMESTIC_LIKELY_OK`: 当前网络 DNS 与 HTTP 均通过，首包不超过 5 秒。
- `SLOW_BUT_REACHABLE`: 当前网络可访问但较慢，现场仍需复核。
- `REACHABLE_RESTRICTED`: 可连通但返回 4xx，可能有反爬、地区或页面限制。
- `DNS_FAIL` / `TIMEOUT` / `CONNECT_FAIL`: 建议继续标记为可能需要外网。

> 注意：这是当前机器当前网络的探针，不代表全国所有国内网络；如果检测到代理，不得据此把 `mayNeedGlobalNetwork` 自动改为 false。最终 `tested` 仍需 agent-browser 打开页面确认。

| ID | 名称 | Host | 状态 | HTTP | ms | 当前外网标记 | 建议 |
|----|------|------|------|------|----|--------------|------|
| pointer-pointer | Pointer Pointer | pointerpointer.com | DOMESTIC_LIKELY_OK | 200 | 671 | true | 当前环境检测到代理，不建议据此改为 false |
| find-the-invisible-cow | Find the Invisible Cow | findtheinvisiblecow.com | DOMESTIC_LIKELY_OK | 200 | 186 | true | 当前环境检测到代理，不建议据此改为 false |
| cat-bounce | Cat Bounce | cat-bounce.com | DOMESTIC_LIKELY_OK | 200 | 1491 | true | 当前环境检测到代理，不建议据此改为 false |
| koalas-to-the-max | Koalas to the Max | koalastothemax.com | DOMESTIC_LIKELY_OK | 200 | 644 | true | 当前环境检测到代理，不建议据此改为 false |
| long-doge-challenge | Long Doge Challenge | longdogechallenge.com | CONNECT_FAIL | - | 68 | true | 当前环境检测到代理，不建议据此改为 false |
| paper-toilet | Paper Toilet | papertoilet.com | DOMESTIC_LIKELY_OK | 200 | 916 | true | 当前环境检测到代理，不建议据此改为 false |
| checkbox-race | Checkbox Race | checkboxrace.com | CONNECT_FAIL | - | 66 | true | 当前环境检测到代理，不建议据此改为 false |
| quick-draw | Quick, Draw! | quickdraw.withgoogle.com | TIMEOUT | - | 5016 | true | 当前环境检测到代理，不建议据此改为 false |
| auto-draw | AutoDraw | www.autodraw.com | DOMESTIC_LIKELY_OK | 200 | 776 | true | 当前环境检测到代理，不建议据此改为 false |
| blob-opera | Blob Opera | artsandculture.google.com | TIMEOUT | - | 5017 | true | 当前环境检测到代理，不建议据此改为 false |
| chrome-music-lab | Chrome Music Lab | musiclab.chromeexperiments.com | DOMESTIC_LIKELY_OK | 200 | 951 | true | 当前环境检测到代理，不建议据此改为 false |
| song-maker | Song Maker | musiclab.chromeexperiments.com | DOMESTIC_LIKELY_OK | 200 | 277 | true | 当前环境检测到代理，不建议据此改为 false |
| patatap | Patatap | patatap.com | TIMEOUT | - | 5000 | true | 当前环境检测到代理，不建议据此改为 false |
| typedrummer | Typedrummer | typedrummer.com | CONNECT_FAIL | - | 3039 | true | 当前环境检测到代理，不建议据此改为 false |
| purrli | Purrli | purrli.com | CONNECT_FAIL | - | 328 | true | 当前环境检测到代理，不建议据此改为 false |
| weave-silk | Weave Silk | weavesilk.com | TIMEOUT | - | 5003 | true | 当前环境检测到代理，不建议据此改为 false |
| neon-flames | Neon Flames | 29a.ch | DOMESTIC_LIKELY_OK | 200 | 1544 | true | 当前环境检测到代理，不建议据此改为 false |
| this-is-sand | This Is Sand | thisissand.com | DOMESTIC_LIKELY_OK | 200 | 812 | true | 当前环境检测到代理，不建议据此改为 false |
| sandspiel | Sandspiel | sandspiel.club | TIMEOUT | - | 5010 | true | 当前环境检测到代理，不建议据此改为 false |
| fluid-simulation | Fluid Simulation | paveldogreat.github.io | DOMESTIC_LIKELY_OK | 200 | 471 | true | 当前环境检测到代理，不建议据此改为 false |
| deep-sea | The Deep Sea | neal.fun | REACHABLE_RESTRICTED | 403 | 695 | true | 当前环境检测到代理，不建议据此改为 false |
| size-of-space | The Size of Space | neal.fun | DOMESTIC_LIKELY_OK | 200 | 608 | true | 当前环境检测到代理，不建议据此改为 false |
| spend-bill-gates-money | Spend Bill Gates' Money | neal.fun | REACHABLE_RESTRICTED | 403 | 230 | true | 当前环境检测到代理，不建议据此改为 false |
| draw-logos-from-memory | Draw Logos From Memory | neal.fun | REACHABLE_RESTRICTED | 403 | 596 | true | 当前环境检测到代理，不建议据此改为 false |
| design-next-iphone | Design the Next iPhone | neal.fun | REACHABLE_RESTRICTED | 403 | 616 | true | 当前环境检测到代理，不建议据此改为 false |
| wonders-of-street-view | Wonders of Street View | neal.fun | REACHABLE_RESTRICTED | 403 | 586 | true | 当前环境检测到代理，不建议据此改为 false |
| password-game | The Password Game | neal.fun | REACHABLE_RESTRICTED | 403 | 650 | true | 当前环境检测到代理，不建议据此改为 false |
| little-alchemy-2 | Little Alchemy 2 | littlealchemy2.com | DOMESTIC_LIKELY_OK | 200 | 482 | true | 当前环境检测到代理，不建议据此改为 false |
| play-2048 | 2048 | play2048.co | DOMESTIC_LIKELY_OK | 200 | 695 | true | 当前环境检测到代理，不建议据此改为 false |
| human-benchmark-reaction | Reaction Time Test | humanbenchmark.com | DOMESTIC_LIKELY_OK | 200 | 202 | true | 当前环境检测到代理，不建议据此改为 false |
| the-zen-zone | The Zen Zone | thezen.zone | DOMESTIC_LIKELY_OK | 200 | 188 | true | 当前环境检测到代理，不建议据此改为 false |
| staggering-beauty | Staggering Beauty | staggeringbeauty.com | CONNECT_FAIL | - | 476 | true | 当前环境检测到代理，不建议据此改为 false |
| eelslap | Eel Slap | eelslap.com | CONNECT_FAIL | - | 511 | true | 当前环境检测到代理，不建议据此改为 false |
| omfgdogs | OMFGDOGS | www.omfgdogs.com | DOMESTIC_LIKELY_OK | 200 | 597 | true | 当前环境检测到代理，不建议据此改为 false |
| heeeeeeeey | Heeeeeeeey | heeeeeeeey.com | TIMEOUT | - | 5009 | true | 当前环境检测到代理，不建议据此改为 false |
| hooooooooo | Hooooooo | hooooooooo.com | TIMEOUT | - | 5013 | true | 当前环境检测到代理，不建议据此改为 false |
| cant-not-tweet-this | Can't Not Tweet This | cant-not-tweet-this.com | CONNECT_FAIL | - | 64 | true | 当前环境检测到代理，不建议据此改为 false |
| rrrgggbbb | rrrgggbbb | rrrgggbbb.com | CONNECT_FAIL | - | 275 | true | 当前环境检测到代理，不建议据此改为 false |
| binary-piano | Binary Piano | binarypiano.com | CONNECT_FAIL | - | 70 | true | 当前环境检测到代理，不建议据此改为 false |
| keyboard-drumset | Virtual Drumming | www.virtualdrumming.com | DOMESTIC_LIKELY_OK | 200 | 710 | true | 当前环境检测到代理，不建议据此改为 false |
| online-sequencer | Online Sequencer | onlinesequencer.net | REACHABLE_RESTRICTED | 403 | 661 | true | 当前环境检测到代理，不建议据此改为 false |
| beepbox | BeepBox | www.beepbox.co | TIMEOUT | - | 5004 | true | 当前环境检测到代理，不建议据此改为 false |
| incredibox-demo | Incredibox Demo | www.incredibox.com | DOMESTIC_LIKELY_OK | 200 | 854 | true | 当前环境检测到代理，不建议据此改为 false |
| bomomo | Bomomo | bomomo.com | DOMESTIC_LIKELY_OK | 200 | 739 | true | 当前环境检测到代理，不建议据此改为 false |
| sketchpad | Sketchpad | sketch.io | CONNECT_FAIL | - | 155 | true | 当前环境检测到代理，不建议据此改为 false |
| mr-doob-harmony | Harmony | mrdoob.com | DOMESTIC_LIKELY_OK | 200 | 622 | true | 当前环境检测到代理，不建议据此改为 false |
| mr-doob-ball-pool | Ball Pool | mrdoob.com | DOMESTIC_LIKELY_OK | 200 | 155 | true | 当前环境检测到代理，不建议据此改为 false |
| ribbon | Ribbon | mrdoob.com | REACHABLE_RESTRICTED | 404 | 162 | true | 当前环境检测到代理，不建议据此改为 false |
| google-gravity | Google Gravity | mrdoob.com | DOMESTIC_LIKELY_OK | 200 | 166 | true | 当前环境检测到代理，不建议据此改为 false |
| solitaire-card-games | Solitaire | solitaired.com | DOMESTIC_LIKELY_OK | 200 | 428 | true | 当前环境检测到代理，不建议据此改为 false |
| tetris-n-blox | Tetris N-Blox | www.freetetris.org | DOMESTIC_LIKELY_OK | 200 | 864 | true | 当前环境检测到代理，不建议据此改为 false |
| hextris | Hextris | hextris.io | CONNECT_FAIL | - | 153 | true | 当前环境检测到代理，不建议据此改为 false |
| agar-io | Agar.io | agar.io | DOMESTIC_LIKELY_OK | 200 | 858 | true | 当前环境检测到代理，不建议据此改为 false |
| slither-io | Slither.io | slither.io | DOMESTIC_LIKELY_OK | 200 | 1552 | true | 当前环境检测到代理，不建议据此改为 false |
| flappy-bird-html5 | Flappy Bird | flappybird.io | DOMESTIC_LIKELY_OK | 200 | 747 | true | 当前环境检测到代理，不建议据此改为 false |
| wordle-nytimes | Wordle | www.nytimes.com | TIMEOUT | - | 5004 | true | 当前环境检测到代理，不建议据此改为 false |
| worldle | Worldle | worldle.teuteuf.fr | DOMESTIC_LIKELY_OK | 200 | 702 | true | 当前环境检测到代理，不建议据此改为 false |
| geoguessr-free | GeoGuessr Free | www.geoguessr.com | DOMESTIC_LIKELY_OK | 200 | 680 | true | 当前环境检测到代理，不建议据此改为 false |
| radio-garden | Radio Garden | radio.garden | TIMEOUT | - | 5009 | true | 当前环境检测到代理，不建议据此改为 false |
| earth-nullschool | Earth Wind Map | earth.nullschool.net | DOMESTIC_LIKELY_OK | 200 | 469 | true | 当前环境检测到代理，不建议据此改为 false |
| stars-chrome-experiment | 100,000 Stars | stars.chromeexperiments.com | DOMESTIC_LIKELY_OK | 200 | 691 | true | 当前环境检测到代理，不建议据此改为 false |
| scale-of-universe | Scale of the Universe | htwins.net | DOMESTIC_LIKELY_OK | 200 | 708 | true | 当前环境检测到代理，不建议据此改为 false |
| access-mars | Access Mars | accessmars.withgoogle.com | TIMEOUT | - | 5007 | true | 当前环境检测到代理，不建议据此改为 false |
| metkids-map | MetKids Map | www.metmuseum.org | REACHABLE_RESTRICTED | 429 | 197 | true | 当前环境检测到代理，不建议据此改为 false |
| teachable-machine | Teachable Machine | teachablemachine.withgoogle.com | TIMEOUT | - | 5001 | true | 当前环境检测到代理，不建议据此改为 false |
| semiconductor | Semi-Conductor | semiconductor.withgoogle.com | TIMEOUT | - | 5009 | true | 当前环境检测到代理，不建议据此改为 false |
| thing-translator | Thing Translator | thing-translator.appspot.com | TIMEOUT | - | 5014 | true | 当前环境检测到代理，不建议据此改为 false |
| ai-experiments-quickdraw-data | Quick Draw Dataset | quickdraw.withgoogle.com | TIMEOUT | - | 5007 | true | 当前环境检测到代理，不建议据此改为 false |
