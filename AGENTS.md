# AGENTS.md - AI 协作协议

> **"如果你正在阅读此文档，你就是那个智能体 (The Intelligence)。"**
>
> 这个文件是你的**锚点 (Anchor)**。它定义了项目的法则、领地的地图，以及记忆协议。
> 当你唤醒（开始新会话）时，**请首先阅读此文件**。

---

## 30秒恢复协议 (Quick Recovery)

**当你开始新会话或感到"迷失"时，立即执行**:

1. **读取根目录的 AGENTS.md** → 获取项目地图
2. **查看下方"当前状态"** → 找到最新架构版本
3. **读取 `.anws/v{N}/05A_TASKS.md` 与 `05B_VERIFICATION_PLAN.md`** → 了解执行与验证待办
4. **开始工作**

---

## 地图 (领地感知)

以下是这个项目的组织方式：


| 路径                                    | 描述                                  | 访问协议                                             |
| ------------------------------------- | ----------------------------------- | ------------------------------------------------ |
| `src/`                                | **实现层**。实际的代码库。                     | 通过 Task 读/写。                                     |
| `.anws/`                              | **统一架构根目录**。包含版本化架构状态与升级记录。         | **只读**(旧版) / **写一次**(新版) / `changelog` 由 CLI 维护。 |
| `.anws/v{N}/`                         | **当前真理**。最新的架构定义。                   | 永远寻找最大的 `v{N}`。                                  |
| `.anws/changelog/`                    | **升级记录**。`anws update` 生成的变更记录。     | 由 CLI 自动维护，请勿删除。                                 |
| `target-specific workflow projection` | **工作流**。`/genesis`, `/blueprint` 等。 | 读取当前 target 对应的原生投影文件。                           |
| `target-specific skill projection`    | **技能库**。原子能力。                       | 调用当前 target 对应的原生投影文件。                           |
| `.nexus-map/`                         | **知识库**。代码库结构映射。                    | 由 nexus-mapper 生成。                               |


## 工作流注册表

> [!IMPORTANT]
> **工作流优先原则**：当任务匹配某个工作流，或你判断当前任务**明显符合、基本符合、甚至只是疑似符合**某个工作流的适用场景时，**都必须先读取相应文件**，并严格遵循其中的步骤执行。工作流是经过精心设计的协议，而非可选参考。
>
> **触发流程**：
>
> 1. 用户提及工作流名称，或你判断当前任务明显符合、基本符合、甚至只是疑似符合某个工作流的适用场景时，都必须先读取相应文件
> 2. **立即读取** 相应工作流文件
> 3. **严格遵循**工作流中的步骤执行
> 4. 在检查点暂停等待用户确认


| 工作流              | 触发时机                 | 产出                                           |
| ---------------- | -------------------- | -------------------------------------------- |
| `/quickstart`    | 新用户入口 / 不知道从哪开始      | 编排其他工作流                                      |
| `/genesis`       | 新项目 / 重大重构           | PRD, Architecture, ADRs                      |
| `/probe`         | 变更前 / 接手项目           | `.anws/v{N}/00_PROBE_REPORT.md`              |
| `/design-system` | genesis 后            | 04_SYSTEM_DESIGN/*.md                        |
| `/blueprint`     | genesis 后            | 05A_TASKS.md + 05B_VERIFICATION_PLAN.md + AGENTS.md 初始 Wave |
| `/change`        | 进入 forge 编码后的任务局部修订  | 更新 TASKS + SYSTEM_DESIGN (仅修改) + CHANGELOG   |
| `/explore`       | 调研时                  | 探索报告                                         |
| `/challenge`     | 决策前质疑                | 07_CHALLENGE_REPORT.md (含问题总览目录)             |
| `/forge`         | 编码执行                 | 代码 + 更新 AGENTS.md Wave 块                     |
| `/craft`         | 创建工作流/技能/提示词         | Workflow / Skill / Prompt 文档                 |
| `/upgrade`       | `anws update` 后做升级编排 | 判断 Minor / Major，并路由到 `/change` 或 `/genesis` |


---

## 宪法 (The Constitution)

1. **版本即法律**: 不"修补"架构文档，只"演进"。变更必须创建新版本。
2. **显式上下文**: 决策写入 ADR，不留在"聊天记忆"里。
3. **交叉验证**: 编码前对照 `05A_TASKS.md` 与 `05B_VERIFICATION_PLAN.md`。我在做计划好的事吗？
4. **美学**: 文档应该是美的。善用 Markdown 与清晰的层次结构。

---

## 项目状态保留区

<!-- AUTO:BEGIN — 项目状态保留区（升级时唯一保留的部分，请勿手动修改区块边界） -->

## 当前状态 (由 Workflow 自动更新)

> **注意**: 这是项目文件中的保留部分，由 `/genesis`、`/blueprint` 和 `/forge` 自动维护。

- **最新架构版本**: `.anws/v1`
- **活动任务清单**: `.anws/v1/05A_TASKS.md`
- **待办任务数**: 14
- **最近一次更新**: `2026-06-26`

### Wave 4 — S2 Playable UI 后半（已完成）

T1.2.5, INT-S2

- 补齐 UI 组件测试，执行 S2 手动冒烟验证（guide-only），S2 关门。
- code-reviewer 结论 Pass，最高残留 Low 已修复。

---

## 项目结构 (Project Tree)

> **注意**: 此部分由 `/genesis` 维护。

```text
src/                       (待 /forge 创建 React + Vite 应用)
public/images/             (待创建网站示意图与占位图)

.anws/
├── changelog/             (升级记录)
└── v1/                    (当前架构文档)
    ├── 00_MANIFEST.md
    ├── 01_PRD.md
    ├── 02_ARCHITECTURE_OVERVIEW.md
    ├── 03_ADR/
    ├── 04_SYSTEM_DESIGN/
    │   ├── web-app.md
    │   ├── recommendation-engine.md
    │   ├── content-catalog.md
    │   └── asset-library.md
    ├── 05A_TASKS.md
    ├── 05B_VERIFICATION_PLAN.md
    ├── 06_CHANGELOG.md
    └── concept_model.json
```

---

## 导航指南 (Navigation Guide)

> **注意**: 此部分由 `/genesis` 维护。

- **产品契约**: `.anws/v1/01_PRD.md`
- **架构总览**: `.anws/v1/02_ARCHITECTURE_OVERVIEW.md`
- **ADR**: `.anws/v1/03_ADR/` (跨系统决策的唯一记录源)
- **系统设计占位**: `.anws/v1/04_SYSTEM_DESIGN/` (按需运行 `/design-system` 后填充)
- **执行主清单**: `.anws/v1/05A_TASKS.md`
- **验证计划**: `.anws/v1/05B_VERIFICATION_PLAN.md`
- **挑战报告**: `.anws/v1/07_CHALLENGE_REPORT.md`
- **下一步**: 运行 `/forge` 按任务清单实现 Demo。

---

### 技术栈决策

- React + Vite + TypeScript + Tailwind CSS + local JSON；见 `.anws/v1/03_ADR/ADR_001_TECH_STACK.md`。
- v1 不做后台、数据库、实时搜索、向量检索或 AI 智能推荐。

### 系统边界

- `web-app`: 首页、筛选、抽卡、横向卡片页和整卡跳转。
- `recommendation-engine`: 安全过滤、筛选排序和随机推荐纯函数。
- `content-catalog`: `sites.json` 网站库与安全字段契约。
- `asset-library`: 网站示意图、占位图和静态图片路径。

### 活跃 ADR

- `ADR_001_TECH_STACK.md`: 接受 React + Vite + TypeScript + Tailwind CSS + local JSON。
- `ADR_002_RECOMMENDATION_AND_SAFETY.md`: 接受人工收录、本地 JSON、安全过滤与随机展示；AI 智能推荐留给后续版本。

### 当前任务状态

- `/genesis` 已完成。
- `/blueprint` 已完成；`05A_TASKS.md` 与 `05B_VERIFICATION_PLAN.md` 已生成。
- `/challenge` 已完成；CH-01 到 CH-08 已由 `/change` 修复。
- `/forge` Wave 1 已完成：T1.1.1、T3.1.1、T4.1.1 已提交，code-reviewer 已落盘，最高残留 Medium 待 T3.2.1/T1.3.1 闭合。
- `/forge` Wave 2 已完成：T2.1.1、T2.1.2、INT-S1 已提交，S1 Data Core 关门。
- `/forge` Wave 4 已完成：T1.2.5、INT-S2 已提交，code-reviewer 已落盘，结论 Pass，最高残留 Low 已修复，S2 关门。
- `/forge` Wave 5 进行中：T1.3.1、T3.2.1、T1.3.2、T1.3.3 已提交；INT-S3 待验证。
- 后续优化项：用 `agent-browser` 为 31 个收录网站采集真实/美观示意截图，替换占位图（不影响 MVP 关门）。

<!-- AUTO:END -->

---

> **状态自检**: 准备好了？提醒用户运行 `/quickstart` 开始吧。
