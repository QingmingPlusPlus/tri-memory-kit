---
name: cross-memory-routing
description: Use before substantial code, documentation, spec, skill, review, debugging, or planning work in this repository to locate relevant three-layer project memory from doc/spec/skills instead of rediscovering existing context.
---

# cross-memory-routing

Use `doc/agent-memory-map.md` to locate existing project memory before starting work.

## Steps

1. Identify the request's target paths, modules, pages, APIs, or spec capabilities.
2. Open `doc/agent-memory-map.md` and select the most specific matching row. Merge rows when multiple relevant paths match.
3. Read the row's `Read doc first` and `Read spec first` entries before implementation.
4. Use skills listed in `Trigger skill` only when their workflow is relevant to the task.
5. If no row matches, search `doc/`, `spec/`, `openspec/specs/`, and `.agents/skills/` with `rg`.
6. Before finishing, decide whether the change should update memory: future constraints to spec, current state to doc, stable workflows to skill.
7. Update `doc/agent-memory-map.md` when adding or changing a long-term entry point, document, spec, or skill.

## Self-Check

- The most relevant routing row was read before implementation.
- Existing documented capability was not rediscovered from scratch.
- Page state, field lists, one-off background, and current API details were not written into skills.
- New or migrated memory can be found by a future agent through the routing map.
