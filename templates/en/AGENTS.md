# AGENTS Guide

<!-- tri-memory:start -->
## tri-memory Three-Layer Memory

This repository uses `tri-memory` to keep agent context small, findable, and current.

### Memory Entry

- Read `doc/agent-memory-map.md` before substantial development, review, debugging, or docs/spec/skill changes.
- Choose the most specific matching row, then read the listed `doc`, `spec`, and skills before implementation.
- If no row matches, search `doc/`, `spec/`, `openspec/specs/`, and `.agents/skills/` with `rg`; add a routing row when this work creates a long-term entry point.

### Three-Layer Placement

- Future behavior constraints, acceptance scenarios, and long-term business rules go in `spec/` or `openspec/specs/`.
- Current project state, modules, routes, pages, fields, APIs, and migration notes go in `doc/`.
- Stable reusable workflows with clear steps and self-checks go in `.agents/skills/`.

### Memory Hygiene

- Update `doc/agent-memory-map.md` when adding or changing a long-term module entry, spec, document, or skill.
- Do not put page descriptions, field lists, current API exceptions, one-off migration context, or current project state into skills.
- Do not store secrets, credentials, private customer data, or short-lived debugging notes in project memory.
<!-- tri-memory:end -->
