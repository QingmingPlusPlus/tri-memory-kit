---
name: cross-memory-routing
description: 用于本仓库中较实质的代码、文档、spec、skill、评审、排障或计划落地工作开始前，按三层记忆模型从 doc/spec/skills 定位相关项目记忆，避免重复理解已记录上下文。
---

# cross-memory-routing

使用 `doc/agent-memory-map.md` 在动手前定位已有项目记忆。

## Steps

1. 识别用户请求涉及的路径、模块、页面、接口或 spec 能力。
2. 打开 `doc/agent-memory-map.md`，选择最具体的匹配行；多行匹配时合并读取。
3. 先读匹配行的 `先读 doc` 和 `先读 spec`，再开始实现。
4. 仅在任务确实需要时使用 `触发 skill` 中列出的 skill。
5. 没有匹配行时，用 `rg` 在 `doc/`、`spec/`、`openspec/specs/`、`.agents/skills/` 中搜索相关关键词和路径。
6. 收尾前判断是否需要更新记忆：约束未来行为进 spec，描述当前项目进 doc，指导重复操作进 skill。
7. 若本次改动新增或调整长期入口、模块文档、spec 或 skill，更新 `doc/agent-memory-map.md`。

## Self-check

- 已读取最相关的路由行，而不是从零理解已有功能。
- 未对已经记录过的能力做重复发现。
- 未把页面状态、字段清单、一次性背景或当前接口细节写入 skill。
- 新增或迁移记忆后，路由表能让后续 agent 自动找到它。
