# tri-memory

[中文说明](https://github.com/QingmingPlusPlus/tri-memory-kit/blob/main/README.zh-CN.md)

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

Overwrite existing non-`AGENTS.md` files. Existing `AGENTS.md` files are updated by replacing or appending only the `tri-memory` memory block:

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

## Supported Tools

Any agent tool that supports `AGENTS.md` can use this structure, including Codex, Jules, Factory, Aider, goose, opencode, Zed, Warp, VS Code, Devin, Junie, Amp, Cursor, RooCode, Gemini CLI, Kilo Code, Phoenix, Semgrep, GitHub Copilot, Windsurf, Augment Code, and others.

## How to Use with Claude Code

I do not recommend using Claude Code.

I recognize the capability of the Claude model itself, and I acknowledge that it performs strongly in code understanding, reasoning, and generation. But that does not mean I will unconditionally trust a development tool such as Claude Code, which is produced by its parent company. To me, model capability and tool trust are two different issues.

My distrust of Claude Code is not because it is a commercial tool, but because I have concerns about its parent company's values, product governance, and attitude toward the open source ecosystem. Development tools participate deeply in code writing, project management, and day-to-day workflows, so whether the company behind the tool is trustworthy is itself an important question.

An ideal development tool should respect the spirit of open source, remain transparent and auditable, and avoid creating user dependence through a closed ecosystem. If a tool frequently ships updates that are not cautious enough, or even causes destructive impact, developers are forced to pay the cost of the vendor's irresponsibility.

For that reason, I do not consider Claude Code a choice worth relying on for the long term. By comparison, I prefer open source tools such as OpenCode. Open source tools are more transparent, easier for the community to supervise, fix, and improve, and better preserve developers' technical autonomy.

For users who do need to use Claude Code, copy the corresponding content from `AGENTS.md` into `CLAUDE.md`.
