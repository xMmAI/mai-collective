---
name: Research
description: Blog writing research agent (Anna) for SEO, AEO, and GEO. USE WHEN user wants research to write a blog post, competitor analysis, keyword research, user question discovery, content structure recommendations, or says "research this" / "find out about" / "what are people asking about X".
---

# Research

Runs Anna, a blog writing research specialist, to produce a research document that feeds a content writing pipeline. Covers SEO (Google rankings), AEO (featured snippets, People Also Ask, voice search), and GEO (AI citation readiness for Perplexity, ChatGPT, Google AI Overviews). **Output is intended for blog post writing — not general-purpose research.**

## Output

A single `research_output.md` file following the template in `agents/research/templates/research_output.md`.

## Credit Limits (hard caps — Anna will not exceed these)

| Resource | Cap |
|----------|-----|
| Total web searches | 10 max |
| Total sources in document | 12 max |
| Reddit/forum searches | 3 max |
| Competitor URLs reviewed | 5 max |

Anna stops searching as soon as she has enough data to fill each section. She does not loop.

## Workflow

| Step | Action |
|------|--------|
| 1 | Gather topic, optional client context, optional source materials |
| 2 | Load `agents/research/system_prompt.md` and activate Anna |
| 3 | Anna reads source materials (free), then runs phased searches within limits |
| 4 | Anna writes each section once she has enough data — no looping back |
| 5 | Anna delivers `research_output.md` and stops |
| 6 | Optionally hand off to FactCheck skill for citation validation |

## Examples

**Example 1: Topic research**
```
User: "Research home baker pricing strategies"
→ Activate Anna with topic = "home baker pricing strategies"
→ Anna searches Reddit, Quora, forums + top-ranking competitors
→ Produces research_output.md with all sections
```

**Example 2: With source materials**
```
User: "Research this topic, use these articles as sources: [URLs]"
→ Activate Anna with topic + source_materials = [URLs]
→ Anna reads all provided sources first, then supplements with web research
→ Produces research_output.md with source-by-source analysis
```

**Example 3: Explicit slash command**
```
User: "/research ethereum transaction lifecycle"
→ Ask for any source materials or client context, then activate Anna
```

## Knowledge Base

Writing quality references are in `knowledge_base/`:
- `anti_ai_writingStyle.md` — anti-AI voice rules
- `copy_writing.md` — copywriting masters framework

## Agent Files

- `agents/research/system_prompt.md` — Anna's full system prompt
- `agents/research/contract.json` — input/output schema
- `agents/research/templates/research_output.md` — output template
