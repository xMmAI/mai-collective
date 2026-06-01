# Handoff

Compact this conversation into a handoff document so a fresh agent can continue without losing context.

## Rules

- Save to the OS temp directory — resolve from `$TMPDIR`, fall back to `/tmp`
- Filename: `handoff-[short-description]-[YYYYMMDD-HHMM].md`
- Reference existing files and memory by **path only** — do not duplicate their content
- **Redact** all API keys, tokens, passwords, and personal data before saving
- Include a **Suggested Skills** section listing which MAI skills the next agent should invoke

## Document Structure

```markdown
# Handoff: [what this session was about]
Generated: [timestamp]

## Context
[What we were building and why — 3–5 sentences max]

## Current State
[What is complete, what is in progress, what is blocked or unresolved]

## Key Decisions Made
[Decisions that would be hard to re-derive — bullet list with brief rationale]

## Files Created or Modified
[Absolute paths to files touched this session]

## Memory Files Relevant
[Paths to any MAI memory files that apply to this work]

## Next Steps
[Exactly what the next agent should do first — be specific]

## Suggested Skills
[Which MAI skills to invoke: /diagnose, /prototype, /grill-me, etc.]
```

## After Saving

Tell me the full absolute path to the handoff file so I can find it.
