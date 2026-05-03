# tri-memory

Initialize a three-layer memory governance structure for AI agent projects.

`tri-memory` creates a small set of files that help agents find the right project context before they work:

- `spec` / `openspec/specs`: requirements, acceptance scenarios, and long-term constraints
- `doc/`: current project state, modules, routes, pages, fields, APIs, and migration notes
- `.agents/skills/`: stable reusable workflows with steps and self-checks

## Usage

Initialize English templates:

```bash
npx tri-memory init
```

Initialize Chinese templates:

```bash
npx tri-memory init --chinese
```

Equivalent language flags:

```bash
npx tri-memory init --lang en
npx tri-memory init --lang zh
```

Preview files without writing:

```bash
npx tri-memory init --dry-run
```

Overwrite existing files:

```bash
npx tri-memory init --force
```

Initialize another directory:

```bash
npx tri-memory init ./my-project
```

## Generated Files

```text
AGENTS.md
doc/
  agent-guide.md
  agent-memory-map.md
.agents/
  skills/
    cross-memory-routing/
      SKILL.md
openspec/
  specs/
    .gitkeep
```

## Method

The core rule is simple:

- Future behavior constraints go to spec.
- Current project state goes to doc.
- Reusable operation workflows go to skills.

See `agent-memory-governance-template.md` for the full migration template.
