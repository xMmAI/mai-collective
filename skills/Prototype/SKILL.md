---
name: Prototype
description: Throwaway code that answers a specific design question before committing to production. USE WHEN user wants to validate logic, test a state model, explore UI design options, try out an idea, or says "prototype this" / "test this idea" / "which design" / "before I build this" / "let's try".
---

# Prototype

A prototype is **throwaway code that answers a question**. The question decides the shape.

**Never build a prototype without first identifying the question it is answering.**

---

## Workflow Routing

| Workflow | Trigger | File |
|----------|---------|------|
| **Logic** | "Does this logic feel right?" / state machine / data model / business rules / "will this work?" | `Workflows/Logic.md` |
| **UI** | "What should this look like?" / layout / design options / component variations / "which version" | `Workflows/UI.md` |

**If ambiguous:** ask the user one question — "Is this about whether the logic works, or what it should look like?" — then route.

---

## Tool: Scaffold — ALWAYS RUN BEFORE WRITING CODE

**MANDATORY: As soon as the prototype type is confirmed, run Scaffold FIRST.**

Do not write prototype boilerplate in the conversation. The tool generates it instantly. Your role is to guide the user through filling in the generated files.

### Logic prototype
```bash
bun run $MAI_DIR/skills/Prototype/Tools/Scaffold.ts --type logic --name <kebab-case-name>
```

### UI prototype
```bash
bun run $MAI_DIR/skills/Prototype/Tools/Scaffold.ts --type ui --name <kebab-case-name> --variants <n>
```

### How to call it correctly

| Decision | Rule |
|----------|------|
| When to run it | After confirming type (logic or UI), BEFORE any other step |
| Derive `--name` from | What the user described — "cart state machine" → `cart-state`, "checkout flow" → `checkout-flow` |
| `--variants` default | 3 — only change if the user specifies a different number |
| If directory already exists | Tell the user — ask them to rename or delete before continuing |
| Where files are created | Current working directory of the project — make sure you're in the right folder |

### What it generates

**Logic:** `prototype-<name>/logic.ts` · `run.ts` · `NOTE.md`
**UI:** `prototype-<name>/VariantA.tsx` … · `Switcher.tsx` · `NOTE.md`

After the tool runs, follow the matching workflow (`Workflows/Logic.md` or `Workflows/UI.md`) to guide the user through filling in the files.

---

## Rules That Apply to Both Branches

1. **Throwaway from day one, clearly marked.** The scaffold tool handles this — every file has a PROTOTYPE header.
2. **One command to run.** `bun run prototype-<name>/run.ts` for logic. Project dev server for UI.
3. **No persistence by default.** State in memory only. Use `PROTOTYPE-wipe-me.db` if a database is genuinely needed.
4. **Skip the polish.** No error handling beyond runnable. No tests. No abstractions.
5. **Surface full state.** Logic: show full state after every action. UI: show full state on every variant switch.
6. **Delete when done.** Write the answer in `NOTE.md`, then delete the entire `prototype-<name>/` folder.

---

## Examples

**Example 1: Logic validation**
```
User: "I'm not sure if my cart state machine handles concurrent item removals correctly"
→ Route to Logic
→ Run: bun run $MAI_DIR/skills/Prototype/Tools/Scaffold.ts --type logic --name cart-state
→ Follow Workflows/Logic.md to guide filling in logic.ts and run.ts
```

**Example 2: UI exploration**
```
User: "What should the dashboard look like? I have two ideas"
→ Route to UI
→ Run: bun run $MAI_DIR/skills/Prototype/Tools/Scaffold.ts --type ui --name dashboard --variants 3
→ Follow Workflows/UI.md to guide filling in the variant files and Switcher
```

**Example 3: Ambiguous**
```
User: "Let's prototype the checkout flow"
→ Ask: "Is this about whether the checkout logic works, or what it should look like?"
→ Route based on answer, derive name as "checkout-flow", run Scaffold
```

**Example 4: Explicit slash command**
```
User: "/prototype the onboarding flow"
→ Ask the routing question (logic or UI?)
→ Confirm name → "onboarding-flow"
→ Run Scaffold, then follow the matching workflow
```
