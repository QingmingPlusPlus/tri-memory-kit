# Agent 记忆治理迁移模板

本文是一份项目无关的 agent 记忆治理方案，可复制到其他仓库后按实际模块名替换占位内容。

## 1. 目标

- 让 agent 在每次开发前自动找到已有上下文，避免重复理解已经做过的功能。
- 控制根层 agent 指引长度，避免把所有历史和规则塞进 `AGENTS.md`。
- 将记忆分成三层：需求约束、项目现状、可复用流程。
- 让新增记忆有固定落点，并能被后续任务通过路由表主动读取。

## 2. 三层记忆模型

| 记忆层 | 推荐位置 | 存放内容 | 不存放内容 |
| --- | --- | --- | --- |
| 需求约束 | `openspec/specs/` 或项目的 spec 目录 | 需求规则、验收场景、长期业务约束、明确由 spec 派生的设计决策 | 临时实现说明、页面字段清单 |
| 项目现状 | `doc/` | 模块说明、当前实现、页面结构、字段清单、路由、接口现状、开发记录、迁移记录 | 可执行流程指令、长期操作步骤 |
| 可复用流程 | `.agents/skills/` | 稳定、重复、值得复用的操作知识；包含入口、步骤、约束、自检 | 页面说明、一次性背景、当前 UI 或接口特例 |

判断口诀：

- **约束未来行为**：进 spec。
- **描述现在项目**：进 doc。
- **指导重复操作**：进 skill。

## 3. 推荐文件结构

```text
AGENTS.md
doc/
  agent-guide.md
  agent-memory-map.md
  <module-doc>.md
openspec/
  specs/
    <capability>/spec.md
.agents/
  skills/
    cross-memory-routing/
      SKILL.md
    <workflow-skill>/
      SKILL.md
```

如果项目没有 OpenSpec，可将 `openspec/specs/` 替换为团队已有的 `spec/`、`requirements/` 或 `docs/specs/`，但仍保持“需求约束”和“项目现状”分开。

## 4. `AGENTS.md` 最小模板

```md
# AGENTS 总纲（<project-name>）

本文件只保留仓库级最小硬约束。详细治理规则见 `doc/agent-guide.md`，开发前记忆路由见 `doc/agent-memory-map.md`。

## 仓库边界

- `<app-a>` 只承载 <平台 A> 特有 UI 与平台适配。
- `<app-b>` 只承载 <平台 B> 特有 UI 与平台适配。
- `<shared>` 只承载跨端复用业务逻辑、请求封装、类型定义与纯工具函数。
- 禁止端与端直接依赖；跨端复用统一经 `<shared>` 暴露稳定接口。

## 开发前记忆路由

- 每次开发、评审、排障或文档/spec/skill 改动前，必须先按目标路径或模块读取 `doc/agent-memory-map.md`。
- 按路由表读取相关 `doc/`、`spec` 和 `.agents/skills/`，不要对已经记录过的功能从零重复理解。
- 若路由表没有匹配项，先用 `rg` 在 `doc/`、`spec`、`.agents/skills/` 中查找最近记忆；本次改动形成稳定入口时补充路由表。

## 每次改动清单

1. 标记本次改动归属模块。
2. 判断是否可跨模块复用；可复用内容优先下沉到共享层。
3. 明确记忆落点：需求约束进 spec，项目现状进 `doc/`，稳定流程进 `.agents/skills/`。
4. 若新增或调整模块入口、长期文档、spec 或 skill，补充 `doc/agent-memory-map.md`。
5. 自检边界：确认没有引入错误层级依赖。
```

## 5. `doc/agent-guide.md` 最小模板

```md
# Agent 协作指南

`AGENTS.md` 是根层硬约束；`doc/agent-memory-map.md` 是开发前主动读取记忆的入口。本文只保留当前有效的治理和边界规则。

## 三层治理

- `spec`：保存需求约束、验收场景和长期业务规则。
- `doc/`：保存模块说明、页面结构、字段清单、路由库存、当前实现状态、业务约定、开发记录和迁移记录。
- `.agents/skills/`：只保存稳定、重复、值得复用的操作知识；必须具备明确入口、约束、步骤和自检。

不把页面说明、字段清单、当前接口特例、一次性迁移背景或项目现状放入 skill。

## 开发前读取

1. 根据用户请求和目标路径识别模块。
2. 打开 `doc/agent-memory-map.md`，选择最具体的匹配行。
3. 先读匹配的 `doc` 和 `spec`，再按需使用匹配的 skill。
4. 若没有匹配行，用 `rg` 搜索相关模块名、页面名、接口名或路径。
5. 若本次改动新增了长期入口、模块说明、spec 或稳定流程，更新 `doc/agent-memory-map.md`。

## 改后同步

- 新增或改变需求约束：更新对应 spec。
- 新增或改变当前项目状态：更新对应 `doc/`。
- 新增或改变稳定可复用流程：更新或新增 `.agents/skills/`。
- 新增页面、字段、mock、路由、当前接口参数或页面布局时，默认更新 `doc/`，不要新增 skill。
```

## 6. `doc/agent-memory-map.md` 模板

```md
# Agent Memory Routing Map

开发、评审、排障或文档/spec/skill 改动前，先按目标路径或模块读取本表。多行匹配时选择最具体路径，并合并读取相关记忆。

| 路径/模块 | 先读 doc | 先读 spec | 触发 skill | 改后同步 |
| --- | --- | --- | --- | --- |
| `AGENTS.md`、`doc/agent-guide.md`、`doc/agent-memory-map.md`、`.agents/skills` | `doc/agent-guide.md`、`doc/agent-memory-map.md` | `<governance-spec>` | `cross-memory-routing` | 更新治理 spec、路由表或对应 skill |
| `<module-path>` | `doc/<module-doc>.md` | `<spec-path>` | `<skill-name>` | 更新模块 doc/spec/skill |

## Fallback

- 没有匹配项时，先用 `rg` 在 `doc/`、`spec`、`.agents/skills/` 中搜索目标路径、页面名、接口名和业务名。
- 若仍无结果，按三层治理创建最小记忆：需求约束进 spec，当前项目状态进 doc，稳定流程进 skill。
- 本次改动新增长期入口、模块文档、spec 或 skill 时，必须补充本表。
```

## 7. `cross-memory-routing` skill 模板

```md
---
name: cross-memory-routing
description: 用于每次开发前按改动路径自动读取相关 doc/spec/skill，避免重复理解已完成能力；适用于任何涉及代码、文档、spec 或项目级 skill 的修改、评审、排障和计划落地。
---

# cross-memory-routing

使用 `doc/agent-memory-map.md` 在动手前定位已有项目记忆。

## Steps

1. 识别用户请求涉及的路径、模块、页面、接口或 spec 能力。
2. 打开 `doc/agent-memory-map.md`，选择最具体的匹配行；多行匹配时合并读取。
3. 先读匹配行的 `先读 doc` 和 `先读 spec`，再按需使用 `触发 skill` 中列出的 skill。
4. 没有匹配行时，用 `rg` 在 `doc/`、`spec`、`.agents/skills/` 中搜索相关关键词和路径。
5. 改动完成前判断是否需要更新记忆：需求约束进 spec，项目现状进 doc，稳定流程进 skill。
6. 若本次改动新增长期入口、模块文档、spec 或 skill，更新 `doc/agent-memory-map.md`。

## Self-check

- 已读取最相关的路由行，而不是从零理解已有功能。
- 未把页面状态、字段清单或一次性背景写入 skill。
- 新增或迁移记忆后，路由表能让后续 agent 自动找到它。
```

## 8. 迁移步骤

1. 收短 `AGENTS.md`，只保留仓库边界、开发前记忆路由、改后清单。
2. 新建 `doc/agent-guide.md`，写入三层治理和改后同步规则。
3. 新建 `doc/agent-memory-map.md`，先覆盖最常改的 5 到 10 个模块。
4. 新建 `.agents/skills/cross-memory-routing/SKILL.md`，只写固定读取流程。
5. 审计已有文档和 skills：
   - 页面说明、字段清单、当前状态迁入 `doc/`。
   - 稳定排障流程、配置流程、跨模块协作流程保留为 skill。
   - 需求约束和验收场景迁入 spec。
6. 每次后续改动都检查是否需要补充路由表。

## 9. 自检清单

- `AGENTS.md` 是否足够短，只包含必须先看的内容。
- 是否存在“页面说明型 skill”；有则迁回 `doc/`。
- 是否存在“需求约束只写在 doc 里”；有则迁到 spec。
- `doc/agent-memory-map.md` 是否能从路径直接定位到相关 doc/spec/skill。
- 新增模块后，后续 agent 是否无需用户手动提醒就能找到相关记忆。
