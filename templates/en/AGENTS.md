# AGENTS Guide (<project-name>)

This file keeps only repository-level hard constraints. See `doc/agent-guide.md` for memory governance rules, and read `doc/agent-memory-map.md` before substantial development, review, debugging, or documentation changes.

## Repository Boundaries

- `<app-a>` owns platform A UI and platform adaptation only.
- `<app-b>` owns platform B UI and platform adaptation only.
- `<shared>` owns reusable business logic, request wrappers, type definitions, and pure utilities.
- Do not make one app depend directly on another app. Cross-platform reuse must go through stable interfaces exposed by `<shared>`.

## Memory Routing

- For small local edits, read the relevant row in `doc/agent-memory-map.md`.
- For feature work, reviews, debugging, or docs/spec/skill changes, read the matching `doc`, `spec`, and listed skills before implementation.
- If no row matches, use `rg` to search `doc/`, `spec/`, `openspec/specs/`, and `.agents/skills/`; add a routing row when the change creates a long-term entry point.

## Change Checklist

1. Identify the module owned by this change.
2. Decide whether any behavior should move to a shared layer.
3. Put future constraints in spec, current project state in `doc/`, and reusable workflows in `.agents/skills/`.
4. Update `doc/agent-memory-map.md` when adding or changing a long-term module entry, spec, document, or skill.
5. Check that no invalid dependency direction was introduced.

## Conflict Priority

When records disagree, prefer: current user request > spec > tests > implementation > doc > skill/history.

## Safety

Do not store secrets, credentials, private customer data, or short-lived debugging notes in project memory.
