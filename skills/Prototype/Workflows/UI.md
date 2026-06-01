# UI Prototype

> **The Scaffold tool should already have been run before reaching this workflow.**
> If not, run it now:
> ```bash
> bun run $MAI_DIR/skills/Prototype/Tools/Scaffold.ts --type ui --name <name> --variants 3
> ```
> This creates `VariantA.tsx` … `Switcher.tsx` and `NOTE.md`. The steps below guide filling them in.

---

Build multiple structurally different design variations on a single route, switchable via a URL parameter and a floating bottom bar.

## The Question

Before writing a single line of code, state the question explicitly:

> "What should [this page / this component / this flow] look like?"

**A populated route beats an empty one.** Mount variants on a real existing page with real data — design problems that a fake isolated prototype hides will appear naturally.

## Two Paths

### Path A — Preferred: Variants on an existing route

Mount the variants on a route that already exists using `?variant=a`, `?variant=b`, etc.

The page's real data, auth, and surrounding UI stay constant. Only the rendering changes. This reveals design problems that isolated prototypes hide.

```
/dashboard?variant=a   ← compact card grid
/dashboard?variant=b   ← full-width table
/dashboard?variant=c   ← timeline view
```

### Path B — Last resort: Dedicated throwaway route

Only create a new route when the feature has no natural existing home.

- Follow the project's existing routing conventions
- Make the prototype path obvious: `/prototype-checkout`, `/dev/onboarding-v2`
- Gate it behind `NODE_ENV !== 'production'` so it cannot ship accidentally

## What Makes a Good Variant

Each variant must be **structurally different** — distinct layout, different information hierarchy, or a completely different primary affordance.

❌ **Wrong:** Three slightly-tweaked card grids  
✅ **Right:** Card grid vs. full-width list vs. timeline vs. map view

If two drafts are converging on the same structure, add an explicit constraint: "This one must not use cards at all."

Generate **3–5 variants** — enough to see real differences, not so many that comparison becomes overwhelming.

## The Floating Switcher

Every UI prototype gets a fixed bottom-center bar that is:

- Visible only in development (`NODE_ENV !== 'production'`)
- Shows: Previous `←` | Current variant key + name | Next `→`
- Arrow keys also navigate (unless an input is focused)
- Updates the URL using the framework's router (so variants are shareable and reload-stable)
- Visually distinct from the design being evaluated — use a neutral color that doesn't influence perception

**Basic implementation pattern:**
```tsx
// PROTOTYPE — switcher component, throwaway
// Only renders in development
if (process.env.NODE_ENV === 'production') return null

const variants = ['a', 'b', 'c']
const current = searchParams.get('variant') ?? 'a'
const currentIndex = variants.indexOf(current)

function navigate(direction: 'prev' | 'next') {
  const next = direction === 'next'
    ? variants[(currentIndex + 1) % variants.length]
    : variants[(currentIndex - 1 + variants.length) % variants.length]
  router.push(`?variant=${next}`)
}
```

## Prototype Rules

1. **Mark it clearly.** Top of every file: `// PROTOTYPE — throwaway. Delete when variant is chosen.`
2. **One command to run.** Use the project's existing dev server — `bun dev`, `bun run dev`, etc.
3. **No persistence.** State in memory. If a variant genuinely requires a database, use a seed script or mock data.
4. **Skip the polish.** No error handling beyond making it renderable. No tests. No abstractions.
5. **Show real content.** Use the actual data the page will have, not placeholder text. "Lorem ipsum" hides layout problems.

## Anti-Patterns to Avoid

| Wrong | Right |
|-------|-------|
| All variants look nearly the same | Each variant has a structurally different layout |
| Isolated empty route with fake data | Real route with real data |
| No switcher — manually editing the URL | Floating switcher with keyboard navigation |
| Keeping the prototype "just in case" | Delete everything except the chosen variant |
| Folding prototype code into production | Rebuild the winner as properly tested code |

## When Done

Once a direction is chosen:

1. **Document the decision** — note which variant won and *why* in a commit message or decision note
2. **Delete all losing variants** and their variant-specific code
3. **Remove the floating switcher** entirely
4. **Remove the `?variant` URL param** handling
5. **Rebuild the winner** as properly structured, tested production code

The prototype answered the question. Now throw it away.
