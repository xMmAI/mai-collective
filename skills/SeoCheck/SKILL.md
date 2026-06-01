---
name: SeoCheck
description: Pre-ship SEO AND AEO compliance audit for any web project. USE WHEN finishing a new page, reviewing content before publishing, or running a pre-deploy check. AEO (Answer Engine Optimisation) is checked equally alongside technical SEO. Reads CLAUDE.md to discover project-specific brand rules, private routes, and schema requirements.
---

# AEO + SEO Check

Pre-ship compliance auditor. Covers both technical SEO (canonicals, robots, schema) and AEO (Answer Engine Optimisation — how well content gets cited by Perplexity, ChatGPT, and Google AI Overviews).

**Both matter equally. A page that ranks but isn't cited by AI engines is half-optimised.**

---

## Usage

```
/seo-check app/some-page/page.tsx          # code-level audit (SEO + schema)
/seo-check --blog some-post-slug           # blog/content post full audit (SEO + AEO + DB row)
/seo-check app/blog/[slug]/page.tsx --blog my-slug   # both at once
```

If no argument is provided, ask: "What would you like to check — a page file, a content post slug, or both?"

---

## Step 0: Read project context

Before running any checks, read `CLAUDE.md` in the current working directory. Extract:
- **Brand name(s)** — the canonical brand name and any known incorrect variants to flag
- **Private routes** — paths that must never be indexed (e.g. /claim/, /verify/, /api/)
- **Required internal links** — destination paths that content should link to (e.g. /brokers, /calculator, /products)
- **Primary content DB table** — where blog/content posts are stored (if any)
- **OG image path** — the default social sharing image
- **Domain** — the canonical site URL

If CLAUDE.md is not found or doesn't cover these, use generic best-practice defaults and note that project context was not loaded.

---

## Part 1: Code File Audit (SEO + Schema)

Read the file and check each item. Report PASS or FAIL with a one-line fix for each failure.

### Technical metadata
- [ ] `alternates.canonical` — present, points to the correct full https URL for this page, no trailing slash
- [ ] `robots` directive — present on the metadata export or generateMetadata return
- [ ] `googleBot["max-snippet"]: -1` — present on all public pages (prevents search engines overriding the written meta description with body text)
- [ ] `robots.index: false` — present on any page under a private route (from CLAUDE.md; defaults: /admin, /api, /verify, /claim)
- [ ] `openGraph.images` — present with a social image, width 1200, height 630

### Schema — SEO signals
- [ ] At least one `<script type="application/ld+json">` block present
- [ ] If Article schema: `publisher` block present with `name` and `logo`
- [ ] If Article schema: `author` fallback is the publisher/organisation name (not a stale old brand name)
- [ ] If Organisation schema on homepage: `alternateName` array present with known aliases

### Schema — AEO signals
- [ ] If content page (blog, article, guide): `FAQPage` JSON-LD present alongside `Article`
- [ ] `FAQPage` has at least 3 `Question`/`acceptedAnswer` pairs
- [ ] Each FAQ answer is self-contained — understandable without the surrounding article (AI engines extract these individually)
- [ ] `Article.keywords` field is set (not null or empty)

### Brand and routing
- [ ] Brand name in all JSON-LD and metadata matches the canonical name from CLAUDE.md — flag any stale variants
- [ ] No resource IDs (UUIDs, numeric IDs) used in any link href where a slug should be used — check CLAUDE.md for the project's slug pattern

---

## Part 2: Content Post Full Audit (`--blog <slug>`)

### DB row completeness
Using the DB table identified from CLAUDE.md (or ask which table to query), fetch the row where slug matches. Check:

- [ ] `slug` — hyphens only, no spaces or special characters
- [ ] `meta_title` — set, 10–70 characters
- [ ] `meta_description` — set, 50–160 characters
- [ ] `excerpt` — set, not empty
- [ ] `keywords` — set, not null, at least 3 comma-separated terms
- [ ] `faq` — valid JSON array, at least 3 objects, each with `question` and `answer` keys
- [ ] Hero/thumbnail image URL — set, not null, does not contain placeholder text like "[TBD" or "coming soon"
- [ ] Cover/feature image URL — set, not null, no placeholder text
- [ ] `category` — set
- [ ] `author` — set
- [ ] `status` — if "published", ALL above must pass; flag any that are missing

### AEO body content audit
Read the body/content field and check:

- [ ] **Direct answer in first paragraph** — the first 2–3 sentences directly answer the core question the title promises. No preamble, no scene-setting. AI engines extract the opening paragraph as the answer snippet.
- [ ] **All H2 headings are questions** — phrased as something a real person would type into Google or ask an AI. Statement headings do not get extracted as featured snippets or People Also Ask results.
- [ ] **At least 2 citation anchors** — specific attributable facts: worked numbers, named regulatory rules, exact percentages with a source. Generic statements ("it varies by lender") are not citable by AI engines.
- [ ] **Entity signals** — the relevant regulatory bodies, legislation, official bodies, or named standards for this domain are named where applicable. These tell AI engines the content is authoritative.
- [ ] **Internal links — minimum 2** — linking to the project's primary action pages (from CLAUDE.md). Only at natural decision points, not stuffed.
- [ ] **FAQ section present** — a clearly labelled FAQ heading, 3–5 Q&A pairs, above any disclaimer. Each answer 2–4 sentences, self-contained.
- [ ] **Disclaimer present** (if required by project) — final paragraph, exact wording per project standards.
- [ ] **No em dashes** — none in body, headings, or FAQ answers. (Em dashes cause rendering issues in some AI output renderers and are a common style fault.)
- [ ] **Word count** — at least 700 words (guides/explainers) or 800 words (decision/comparison content). Flag if under.
- [ ] **Cross-content links** — where the article references a concept covered in another published post, a link to that post should exist. Flag obvious missing cross-links.

---

## Output Format

```
AEO + SEO CHECK — app/blog/[slug]/page.tsx
────────────────────────────────────────────
Project context loaded from CLAUDE.md: [brand name], [domain]

TECHNICAL SEO
  PASS  alternates.canonical
  PASS  robots max-snippet:-1
  FAIL  openGraph.images — add images block with 1200×630 social image

SCHEMA — SEO
  PASS  Article publisher block present
  FAIL  Article author fallback uses old brand name "Acme Corp Old" — update to "Acme Corp"

SCHEMA — AEO
  PASS  FAQPage present (4 Q&A pairs)
  FAIL  FAQ answer 2 references "the section above" — must be self-contained
  PASS  Article.keywords set

BRAND & ROUTING
  PASS  No stale brand name variants
  PASS  No resource IDs in hrefs

2 issues found. Fix before deploying.
```

For content post audits, group output as "SUPABASE ROW" (or DB name) and "AEO BODY".

---

## Examples

```
User: /seo-check app/contact/page.tsx
→ Read CLAUDE.md, read file, run Part 1 checks, report

User: /seo-check --blog my-post-slug
→ Read CLAUDE.md, query DB for slug, run Part 2 row + body checks, report

User: /seo-check app/blog/[slug]/page.tsx --blog my-post-slug
→ Run Part 1 + Part 2, report combined
```
