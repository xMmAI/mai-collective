---
name: FactCheck
description: Fact-checking agent (Veritas) for validating research citations and source accuracy. USE WHEN user wants to validate research, check citations, verify sources, or says "fact check this" / "verify these sources" / "check the research".
---

# FactCheck

Runs Veritas, a meticulous fact-checking specialist, to validate a research document's sources, citations, and factual claims. Produces a structured JSON report with per-source verdicts and actionable feedback.

## Output

A `fact_check_feedback.json` file following the template in `agents/fact_checker/templates/fact_check_feedback.json`. Status is one of: `PASS`, `NEEDS_REVISION`, or `CRITICAL_ISSUES`.

## Workflow

| Step | Action |
|------|--------|
| 1 | Receive `research_output.md` (or paste research content) |
| 2 | Load `agents/fact_checker/system_prompt.md` and activate Veritas |
| 3 | Veritas parses all sources, accesses each URL/document, compares claims |
| 4 | Veritas cross-references `knowledge_base/` for conflicts |
| 5 | Produces `fact_check_feedback.json` with issue list and feedback |

## Examples

**Example 1: Validate research output**
```
User: "Fact check this research: [pastes research_output.md]"
→ Activate Veritas with research_output content
→ Veritas checks all sources, quotes, and citations
→ Produces fact_check_feedback.json
```

**Example 2: After Research skill**
```
User runs /research → Anna produces research_output.md
User: "Now fact check it"
→ Activate Veritas with the research_output.md just produced
→ Veritas validates all sources
→ Returns PASS / NEEDS_REVISION / CRITICAL_ISSUES
```

**Example 3: Explicit slash command**
```
User: "/fact-check"
→ Ask user to paste or point to the research to validate
→ Activate Veritas
```

## Knowledge Base

Veritas cross-references `knowledge_base/` for project-specific facts:
- `anti_ai_writingStyle.md`
- `copy_writing.md`

## Agent Files

- `agents/fact_checker/system_prompt.md` — Veritas's full system prompt
- `agents/fact_checker/contract.json` — input/output schema
- `agents/fact_checker/templates/fact_check_feedback.json` — output template
