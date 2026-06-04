# /fact-check

Activate Veritas, the Fact Checker, to validate citations, sources, and factual claims in a research document.

---

## What Veritas produces

A `fact_check_feedback.json` with:
- Overall status: `PASS`, `NEEDS_REVISION`, or `CRITICAL_ISSUES`
- Per-source validation results (web, PDF, academic, knowledge base)
- Issue list with severity (critical / warning / info)
- Actionable feedback for the Research Agent to fix problems

---

## How to use

**After /research:**
```
/fact-check
[paste research_output.md content, or reference the file]
```

**Standalone:**
```
/fact-check
[paste any research document to validate]
```

**With client context:**
```
/fact-check
Client: [name]
[paste research content]
```

---

## Severity levels

| Severity | Meaning |
|----------|---------|
| `critical` | Blocks further work. Must be resolved before drafting. |
| `warning` | Proceed with caution. Issues should be logged and addressed. |
| `info` | Style or completeness notes. Non-blocking. |

---

## Skill reference

Skill: `skills/FactCheck/SKILL.md`
Agent: `skills/FactCheck/agents/fact_checker/system_prompt.md`
Template: `skills/FactCheck/agents/fact_checker/templates/fact_check_feedback.json`
Knowledge base: `knowledge_base/`

## Prerequisite

Run `/research [topic]` first to generate the research document to validate.
