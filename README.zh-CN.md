# tri-memory

为 AI agent 项目初始化一套三层记忆治理结构。

`tri-memory` 会生成一组轻量文件，帮助 agent 在动手前找到正确的项目上下文，避免反复从零理解同一套功能。

- `openspec/specs/`（推荐）或已有的 `spec/`：需求、验收场景和长期约束
- `doc/`：当前项目状态、模块、路由、页面、字段、API 和迁移记录
- `.agents/skills/`：稳定可复用的操作流程、步骤和自检清单

## 使用方式

初始化英文模板：

```bash
npx tri-memory init
```

初始化中文模板：

```bash
npx tri-memory init --chinese
```

等价的语言参数：

```bash
npx tri-memory init --lang en
npx tri-memory init --lang zh
```

只预览将要创建的文件，不实际写入：

```bash
npx tri-memory init --dry-run
```

覆盖已有的非 `AGENTS.md` 文件。已有 `AGENTS.md` 只会替换或追加 `tri-memory` 记忆区块：

```bash
npx tri-memory init --force
```

初始化到其他目录：

```bash
npx tri-memory init ./my-project
```

## 生成文件

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

## OpenSpec 推荐

新项目推荐优先使用 `openspec/specs/` 作为 spec 层。只有在迁移已有项目且项目已经使用 `spec/` 目录时，才继续保留 `spec/`。

## 方法

核心规则很简单：

- 约束未来行为：进 `openspec/specs/`。
- 描述当前项目：进 doc。
- 指导重复操作：进 skills。

完整迁移模板见 `agent-memory-governance-template.md`。

## 适用工具
所有支持AGENTS.md的agent工具均可(Codex、Jules、Factory、Aider、goose、opencode、Zed、Warp、VS Code、Devin、Junie、Amp、Cursor、RooCode、Gemini CLI、Kilo Code、Phoenix、Semgrep、GitHub Copilot、Windsurf、Augment Code 等)

## 如何在Claude Code中使用
我不建议使用Claude Code

我认可 Claude 模型本身的能力，也承认它在代码理解、推理和生成方面有很强的表现。但这并不意味着我会无条件信任 Claude Code 这类由其母公司推出的开发工具。对我来说，模型能力和工具信任是两个不同的问题。

我不信任 Claude Code，并不是因为它是一款商业工具，而是因为我对其母公司的价值取向、产品治理方式以及对开源生态的态度存在疑虑。开发工具会深入参与代码编写、项目管理和工作流程，因此它背后的公司是否值得信任，本身就是一个重要问题。

一个理想的开发工具应该尊重开源精神，保持透明、可审计，并尽量避免通过封闭生态制造用户依赖。如果工具频繁推出不够谨慎的更新，甚至造成破坏性影响，那么开发者就必须为厂商的不负责任承担成本。

因此，我不认为 Claude Code 是一个值得长期依赖的选择。相比之下，我更倾向于使用 OpenCode 这类开源工具。开源工具不仅更透明，也更容易被社区监督、修复和改进，能够让开发者保有更多技术自主权

对于确实需要使用Claude Code 的用户，可以把AGENTS.md 的对应内容复制到CLAUDE.md 中
