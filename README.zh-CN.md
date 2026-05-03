# tri-memory

为 AI agent 项目初始化一套三层记忆治理结构。

`tri-memory` 会生成一组轻量文件，帮助 agent 在动手前找到正确的项目上下文，避免反复从零理解同一套功能。

- `spec` / `openspec/specs`：需求、验收场景和长期约束
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

覆盖已有文件：

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

## 方法

核心规则很简单：

- 约束未来行为：进 spec。
- 描述当前项目：进 doc。
- 指导重复操作：进 skills。

完整迁移模板见 `agent-memory-governance-template.md`。
