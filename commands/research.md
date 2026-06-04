# /research

Activate Anna, the Research Specialist, to produce a comprehensive research document on any topic.

---

## Credit limits

Anna runs within hard caps: **10 web searches max, 12 sources max, 3 forum searches max**. She stops as soon as she has enough data for each section — no infinite loops.

## What Anna produces

A `research_output.md` covering:
- Source-by-source analysis of all provided materials
- Real user questions from Reddit, Quora, and forums
- Competitor analysis and content gaps
- Keyword research
- Angle gap analysis
- Content structure recommendations with H2/H3 mapping

---

## How to use

**Basic:**
```
/research [topic]
```

**With source materials:**
```
/research [topic]
Sources: [URLs or file paths]
```

**With client context:**
```
/research [topic]
Client: [name]
Sources: [optional]
```

---

## Skill reference

Skill: `skills/Research/SKILL.md`
Agent: `skills/Research/agents/research/system_prompt.md`
Template: `skills/Research/agents/research/templates/research_output.md`

## Follow-up

Run `/fact-check` after research to validate citations and sources.
