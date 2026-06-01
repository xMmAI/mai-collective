---
name: Diagnose
description: Structured 6-phase debugging methodology for hard bugs and performance regressions. USE WHEN user reports a bug, something is broken/failing/throwing/crashing, describes unexpected behavior, mentions a regression, or says "diagnose this" / "debug this" / "why is this failing" / "fix this bug".
---

# Diagnose

Structured debugging methodology. **Skip phases only when explicitly justified.**

The single most important insight: if you have a fast, deterministic, repeatable pass/fail signal for the bug, you will find the cause. Everything else is mechanical. Build the loop first.

## Workflow Routing

| Workflow | Trigger | File |
|----------|---------|------|
| **Diagnose** | Any bug report, failure, regression, or explicit debug request | `Workflows/Diagnose.md` |

## Examples

**Example 1: Something is throwing**
```
User: "This function keeps throwing a TypeError on line 42"
→ Load Workflows/Diagnose.md
→ Phase 1 — build a feedback loop first, then reproduce
```

**Example 2: Performance regression**
```
User: "The page was fast yesterday, now it takes 8 seconds to load"
→ Load Workflows/Diagnose.md
→ Phase 1 — establish a timing harness as the feedback loop
```

**Example 3: Unexpected behavior**
```
User: "The cart total is calculating wrong but only sometimes"
→ Load Workflows/Diagnose.md
→ Phase 1 — non-deterministic bug, build a loop that raises reproduction rate
```

**Example 4: Explicit slash command**
```
User: "/diagnose"
→ Ask what the bug is, then load Workflows/Diagnose.md
```
