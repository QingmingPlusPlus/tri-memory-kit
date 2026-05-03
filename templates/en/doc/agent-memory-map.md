# Agent Memory Routing Map

Before substantial development, review, debugging, or docs/spec/skill changes, use this table to locate existing project memory by path or module. When multiple rows match, choose the most specific path and merge the relevant memory.

| Path / Module | Read doc first | Read spec first | Trigger skill | After-change sync | Status |
| --- | --- | --- | --- | --- | --- |
| `AGENTS.md`, `doc/agent-guide.md`, `doc/agent-memory-map.md`, `.agents/skills` | `doc/agent-guide.md`, `doc/agent-memory-map.md` | `<governance-spec>` | `cross-memory-routing` | Update governance spec, routing map, or related skill | active |
| `<module-path>` | `doc/<module-doc>.md` | `<spec-path>` | `<skill-name>` | Update module doc/spec/skill | active |

## Fallback

- If no row matches, use `rg` to search `doc/`, `spec/`, `openspec/specs/`, and `.agents/skills/` for target paths, page names, API names, and business names.
- If there is still no result, create the smallest useful memory using the three-layer model: future constraints to spec, current state to doc, stable workflows to skill.
- Add a routing row when this change creates a long-term module entry, document, spec, or skill.
