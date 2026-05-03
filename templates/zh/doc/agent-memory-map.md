# Agent Memory Routing Map

开发、评审、排障或文档/spec/skill 改动前，先按目标路径或模块读取本表。多行匹配时选择最具体路径，并合并读取相关记忆。

| 路径/模块 | 先读 doc | 先读 spec | 触发 skill | 改后同步 | 状态 |
| --- | --- | --- | --- | --- | --- |
| `AGENTS.md`、`doc/agent-guide.md`、`doc/agent-memory-map.md`、`.agents/skills` | `doc/agent-guide.md`、`doc/agent-memory-map.md` | `<governance-spec>` | `cross-memory-routing` | 更新治理 spec、路由表或对应 skill | active |
| `<module-path>` | `doc/<module-doc>.md` | `<spec-path>` | `<skill-name>` | 更新模块 doc/spec/skill | active |

## Fallback

- 没有匹配项时，先用 `rg` 在 `doc/`、`spec/`、`openspec/specs/`、`.agents/skills/` 中搜索目标路径、页面名、接口名和业务名。
- 若仍无结果，按三层治理创建最小记忆：约束未来行为进 spec，描述当前项目进 doc，指导重复操作进 skill。
- 本次改动新增长期入口、模块文档、spec 或 skill 时，必须补充本表。
