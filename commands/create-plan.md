# Plan Creation Stage

Based on our full exchange, produce a markdown plan document.

## Requirements

- Clear, minimal, concise steps only.
- Track status of each step with emojis:
  - 🟩 Done
  - 🟨 In Progress
  - 🟥 To Do
- Dynamic overall progress percentage at the top.
- No extra scope or unnecessary complexity beyond explicitly clarified details.
- Steps should be modular, elegant, minimal, and integrate seamlessly within the existing codebase.

## Output Template

```markdown
# Feature Implementation Plan

**Overall Progress:** `0%`

## TLDR
Short summary of what we're building and why.

## Critical Decisions
Key architectural/implementation choices made during exploration:
- Decision 1: [choice] - [brief rationale]
- Decision 2: [choice] - [brief rationale]

## Tasks

- [ ] 🟥 **Step 1: [Name]**
  - [ ] 🟥 Subtask 1
  - [ ] 🟥 Subtask 2

- [ ] 🟥 **Step 2: [Name]**
  - [ ] 🟥 Subtask 1
  - [ ] 🟥 Subtask 2
```

## Behavior Rules

- Write the plan document directly — no preamble, no commentary.
- Stick strictly to what was discussed. No added scope.
- Save the plan as a markdown file in the project (e.g. `tasks/plan-[feature-name].md`).
