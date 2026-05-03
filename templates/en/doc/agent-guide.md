# Agent Collaboration Guide

`AGENTS.md` contains root-level hard constraints. `doc/agent-memory-map.md` is the entry point for finding project memory before work begins.

## Three-Layer Governance

- `spec` or `openspec/specs/`: requirements, acceptance scenarios, long-term business rules, and design decisions derived from specs.
- `doc/`: module explanations, current implementation state, page structure, fields, routes, API state, development notes, and migration notes.
- `.agents/skills/`: stable, repeated, reusable operation knowledge with clear entry conditions, constraints, steps, and self-checks.

Do not put page descriptions, field lists, current API exceptions, one-off migration context, or current project state into skills.

## Read Policy

1. Identify the path, module, page, API, or spec capability involved in the request.
2. Open `doc/agent-memory-map.md` and choose the most specific matching row.
3. Read the matched `doc` and `spec` first, then use listed skills only when useful.
4. If no row matches, use `rg` to search module names, page names, API names, and paths in `doc/`, `spec/`, `openspec/specs/`, and `.agents/skills/`.
5. If this work adds a long-term entry point, module document, spec, or stable workflow, update `doc/agent-memory-map.md`.

## After-Change Sync

- New or changed requirements: update the corresponding spec.
- New or changed current project state: update the corresponding `doc/` file.
- New or changed stable reusable workflow: update or create a `.agents/skills/` skill.
- New pages, fields, mocks, routes, current API parameters, or layout details default to `doc/`, not skills.

## Freshness

- Prefer recently verified memory when multiple records overlap.
- Mark obsolete documents or routing rows as deprecated instead of leaving conflicting active guidance.
- When code and docs disagree, inspect the current implementation and update stale memory as part of the change.
