# 国内联通性探针报告

> 生成时间: 2026-06-28T07:02:14.848Z
> 超时阈值: 6000ms
> 代理环境: 检测到代理环境变量
> 直连确认: 用户已确认当前网络为直连测试，忽略代理环境变量残留

## 判定口径

- `DOMESTIC_LIKELY_OK`: 当前网络 DNS 与 HTTP 均通过，首包不超过 5 秒。
- `SLOW_BUT_REACHABLE`: 当前网络可访问但较慢，现场仍需复核。
- `REACHABLE_RESTRICTED`: 可连通但返回 4xx，可能有反爬、地区或页面限制。
- `DNS_FAIL` / `TIMEOUT` / `CONNECT_FAIL`: 建议继续标记为可能需要外网。

> 注意：这是当前机器当前网络的探针，不代表全国所有国内网络；当前已按直连测试口径记录，可作为本机网络下的回填依据。最终 `tested` 仍需 agent-browser 打开页面确认。

| ID | 名称 | Host | 状态 | HTTP | ms | 当前外网标记 | 建议 |
|----|------|------|------|------|----|--------------|------|
| pointer-pointer | Pointer Pointer | pointerpointer.com | DOMESTIC_LIKELY_OK | 200 | 819 | false | mayNeedGlobalNetwork 可人工考虑设为 false |
| find-the-invisible-cow | Find the Invisible Cow | findtheinvisiblecow.com | DOMESTIC_LIKELY_OK | 200 | 731 | false | mayNeedGlobalNetwork 可人工考虑设为 false |
| cat-bounce | Cat Bounce | cat-bounce.com | DOMESTIC_LIKELY_OK | 200 | 1201 | false | mayNeedGlobalNetwork 可人工考虑设为 false |
| koalas-to-the-max | Koalas to the Max | koalastothemax.com | DOMESTIC_LIKELY_OK | 200 | 824 | false | mayNeedGlobalNetwork 可人工考虑设为 false |
| long-doge-challenge | Long Doge Challenge | longdogechallenge.com | DOMESTIC_LIKELY_OK | 200 | 288 | false | mayNeedGlobalNetwork 可人工考虑设为 false |
| paper-toilet | Paper Toilet | papertoilet.com | DOMESTIC_LIKELY_OK | 200 | 1546 | false | mayNeedGlobalNetwork 可人工考虑设为 false |
| checkbox-race | Checkbox Race | checkboxrace.com | DOMESTIC_LIKELY_OK | 200 | 298 | false | mayNeedGlobalNetwork 可人工考虑设为 false |
| quick-draw | Quick, Draw! | quickdraw.withgoogle.com | TIMEOUT | - | 6004 | true | 建议保持 mayNeedGlobalNetwork=true |
| auto-draw | AutoDraw | www.autodraw.com | DOMESTIC_LIKELY_OK | 200 | 910 | false | mayNeedGlobalNetwork 可人工考虑设为 false |
| blob-opera | Blob Opera | artsandculture.google.com | TIMEOUT | - | 6004 | true | 建议保持 mayNeedGlobalNetwork=true |
| chrome-music-lab | Chrome Music Lab | musiclab.chromeexperiments.com | DOMESTIC_LIKELY_OK | 200 | 405 | false | mayNeedGlobalNetwork 可人工考虑设为 false |
| song-maker | Song Maker | musiclab.chromeexperiments.com | DOMESTIC_LIKELY_OK | 200 | 271 | false | mayNeedGlobalNetwork 可人工考虑设为 false |
| patatap | Patatap | patatap.com | DOMESTIC_LIKELY_OK | 200 | 207 | false | mayNeedGlobalNetwork 可人工考虑设为 false |
| typedrummer | Typedrummer | typedrummer.com | DOMESTIC_LIKELY_OK | 200 | 1481 | false | mayNeedGlobalNetwork 可人工考虑设为 false |
| purrli | Purrli | purrli.com | DOMESTIC_LIKELY_OK | 200 | 1110 | false | mayNeedGlobalNetwork 可人工考虑设为 false |
| weave-silk | Weave Silk | weavesilk.com | DOMESTIC_LIKELY_OK | 200 | 2419 | false | mayNeedGlobalNetwork 可人工考虑设为 false |
| neon-flames | Neon Flames | 29a.ch | DOMESTIC_LIKELY_OK | 200 | 1196 | false | mayNeedGlobalNetwork 可人工考虑设为 false |
| this-is-sand | This Is Sand | thisissand.com | DOMESTIC_LIKELY_OK | 200 | 1048 | false | mayNeedGlobalNetwork 可人工考虑设为 false |
| sandspiel | Sandspiel | sandspiel.club | DOMESTIC_LIKELY_OK | 200 | 294 | false | mayNeedGlobalNetwork 可人工考虑设为 false |
| fluid-simulation | Fluid Simulation | paveldogreat.github.io | DOMESTIC_LIKELY_OK | 200 | 251 | false | mayNeedGlobalNetwork 可人工考虑设为 false |
| deep-sea | The Deep Sea | neal.fun | REACHABLE_RESTRICTED | 403 | 1563 | true | 保持当前标记，需 agent-browser 实测 |
| size-of-space | The Size of Space | neal.fun | REACHABLE_RESTRICTED | 403 | 717 | true | 保持当前标记，需 agent-browser 实测 |
| spend-bill-gates-money | Spend Bill Gates' Money | neal.fun | REACHABLE_RESTRICTED | 403 | 745 | true | 保持当前标记，需 agent-browser 实测 |
| draw-logos-from-memory | Draw Logos From Memory | neal.fun | REACHABLE_RESTRICTED | 403 | 926 | true | 保持当前标记，需 agent-browser 实测 |
| design-next-iphone | Design the Next iPhone | neal.fun | REACHABLE_RESTRICTED | 403 | 740 | true | 保持当前标记，需 agent-browser 实测 |
| wonders-of-street-view | Wonders of Street View | neal.fun | DOMESTIC_LIKELY_OK | 200 | 1582 | false | mayNeedGlobalNetwork 可人工考虑设为 false |
| password-game | The Password Game | neal.fun | DOMESTIC_LIKELY_OK | 200 | 505 | false | mayNeedGlobalNetwork 可人工考虑设为 false |
| little-alchemy-2 | Little Alchemy 2 | littlealchemy2.com | DOMESTIC_LIKELY_OK | 200 | 844 | false | mayNeedGlobalNetwork 可人工考虑设为 false |
| play-2048 | 2048 | play2048.co | DOMESTIC_LIKELY_OK | 200 | 716 | false | mayNeedGlobalNetwork 可人工考虑设为 false |
| human-benchmark-reaction | Reaction Time Test | humanbenchmark.com | DOMESTIC_LIKELY_OK | 200 | 280 | false | mayNeedGlobalNetwork 可人工考虑设为 false |
| the-zen-zone | The Zen Zone | thezen.zone | DOMESTIC_LIKELY_OK | 200 | 502 | false | mayNeedGlobalNetwork 可人工考虑设为 false |
| staggering-beauty | Staggering Beauty | www.staggeringbeauty.com | DOMESTIC_LIKELY_OK | 200 | 476 | false | mayNeedGlobalNetwork 可人工考虑设为 false |
| eelslap | Eel Slap | eelslap.com | DOMESTIC_LIKELY_OK | 200 | 468 | false | mayNeedGlobalNetwork 可人工考虑设为 false |
| omfgdogs | OMFGDOGS | www.omfgdogs.com | DOMESTIC_LIKELY_OK | 200 | 629 | false | mayNeedGlobalNetwork 可人工考虑设为 false |
| heeeeeeeey | Heeeeeeeey | heeeeeeeey.com | DOMESTIC_LIKELY_OK | 200 | 278 | false | mayNeedGlobalNetwork 可人工考虑设为 false |
| hooooooooo | Hooooooo | hooooooooo.com | DOMESTIC_LIKELY_OK | 200 | 281 | false | mayNeedGlobalNetwork 可人工考虑设为 false |
| cant-not-tweet-this | Can't Not Tweet This | cant-not-tweet-this.com | DOMESTIC_LIKELY_OK | 200 | 285 | false | mayNeedGlobalNetwork 可人工考虑设为 false |
| rrrgggbbb | rrrgggbbb | rrrgggbbb.com | DOMESTIC_LIKELY_OK | 200 | 716 | false | mayNeedGlobalNetwork 可人工考虑设为 false |
| binary-piano | Binary Piano | binarypiano.com | DOMESTIC_LIKELY_OK | 200 | 286 | false | mayNeedGlobalNetwork 可人工考虑设为 false |
| keyboard-drumset | Virtual Drumming | www.virtualdrumming.com | DOMESTIC_LIKELY_OK | 200 | 1093 | false | mayNeedGlobalNetwork 可人工考虑设为 false |
| online-sequencer | Online Sequencer | onlinesequencer.net | REACHABLE_RESTRICTED | 403 | 1935 | true | 保持当前标记，需 agent-browser 实测 |
| beepbox | BeepBox | www.beepbox.co | DOMESTIC_LIKELY_OK | 200 | 240 | false | mayNeedGlobalNetwork 可人工考虑设为 false |
| incredibox-demo | Incredibox Demo | www.incredibox.com | DOMESTIC_LIKELY_OK | 200 | 1020 | false | mayNeedGlobalNetwork 可人工考虑设为 false |
| bomomo | Bomomo | bomomo.com | DOMESTIC_LIKELY_OK | 200 | 870 | false | mayNeedGlobalNetwork 可人工考虑设为 false |
| sketchpad | Sketchpad | sketch.io | DOMESTIC_LIKELY_OK | 200 | 734 | false | mayNeedGlobalNetwork 可人工考虑设为 false |
| mr-doob-harmony | Harmony | mrdoob.com | DOMESTIC_LIKELY_OK | 200 | 488 | false | mayNeedGlobalNetwork 可人工考虑设为 false |
| mr-doob-ball-pool | Ball Pool | mrdoob.com | DOMESTIC_LIKELY_OK | 200 | 81 | false | mayNeedGlobalNetwork 可人工考虑设为 false |
| google-space | Google Space | mrdoob.com | DOMESTIC_LIKELY_OK | 200 | 317 | false | mayNeedGlobalNetwork 可人工考虑设为 false |
| google-gravity | Google Gravity | mrdoob.com | DOMESTIC_LIKELY_OK | 200 | 445 | false | mayNeedGlobalNetwork 可人工考虑设为 false |
| solitaire-card-games | Solitaire | solitaired.com | DOMESTIC_LIKELY_OK | 200 | 571 | false | mayNeedGlobalNetwork 可人工考虑设为 false |
| tetris-n-blox | Tetris N-Blox | www.freetetris.org | DOMESTIC_LIKELY_OK | 200 | 830 | false | mayNeedGlobalNetwork 可人工考虑设为 false |
| hextris | Hextris | hextris.io | DOMESTIC_LIKELY_OK | 200 | 294 | false | mayNeedGlobalNetwork 可人工考虑设为 false |
| turtle-toy | Turtle Toy | turtletoy.net | DOMESTIC_LIKELY_OK | 200 | 783 | false | mayNeedGlobalNetwork 可人工考虑设为 false |
| slither-io | Slither.io | slither.io | DOMESTIC_LIKELY_OK | 200 | 4429 | false | mayNeedGlobalNetwork 可人工考虑设为 false |
| flappy-bird-html5 | Flappy Bird | flappybird.io | DOMESTIC_LIKELY_OK | 200 | 2324 | false | mayNeedGlobalNetwork 可人工考虑设为 false |
| wordle-nytimes | Wordle | www.nytimes.com | TIMEOUT | - | 6003 | true | 建议保持 mayNeedGlobalNetwork=true |
| worldle | Worldle | worldle.teuteuf.fr | DOMESTIC_LIKELY_OK | 200 | 1745 | false | mayNeedGlobalNetwork 可人工考虑设为 false |
| city-guesser | City Guesser | virtualvacation.us | DOMESTIC_LIKELY_OK | 200 | 294 | false | mayNeedGlobalNetwork 可人工考虑设为 false |
| radio-garden | Radio Garden | radio.garden | TIMEOUT | - | 6005 | true | 建议保持 mayNeedGlobalNetwork=true |
| earth-nullschool | Earth Wind Map | earth.nullschool.net | DOMESTIC_LIKELY_OK | 200 | 1682 | false | mayNeedGlobalNetwork 可人工考虑设为 false |
| stars-chrome-experiment | 100,000 Stars | stars.chromeexperiments.com | DOMESTIC_LIKELY_OK | 200 | 414 | false | mayNeedGlobalNetwork 可人工考虑设为 false |
| scale-of-universe | Scale of the Universe | htwins.net | DOMESTIC_LIKELY_OK | 200 | 911 | false | mayNeedGlobalNetwork 可人工考虑设为 false |
| access-mars | Access Mars | accessmars.withgoogle.com | TIMEOUT | - | 6013 | true | 建议保持 mayNeedGlobalNetwork=true |
| metkids-map | MetKids Map | www.metmuseum.org | REACHABLE_RESTRICTED | 429 | 285 | true | 保持当前标记，需 agent-browser 实测 |
| teachable-machine | Teachable Machine | teachablemachine.withgoogle.com | TIMEOUT | - | 6003 | true | 建议保持 mayNeedGlobalNetwork=true |
| shared-piano | Shared Piano | musiclab.chromeexperiments.com | DOMESTIC_LIKELY_OK | 200 | 440 | false | mayNeedGlobalNetwork 可人工考虑设为 false |
| kandinsky-music-lab | Kandinsky | musiclab.chromeexperiments.com | DOMESTIC_LIKELY_OK | 202 | 266 | false | mayNeedGlobalNetwork 可人工考虑设为 false |
| ai-experiments-quickdraw-data | Quick Draw Dataset | quickdraw.withgoogle.com | TIMEOUT | - | 6007 | true | 建议保持 mayNeedGlobalNetwork=true |
