---
name: SeoBrief
description: Proactive SEO and AEO requirements brief generated BEFORE building or writing begins. USE WHEN starting a new page, new feature, new content type, or new blog post — before any code design, wireframe, or draft. Produces a structured brief for architects, developers, designers, and content writers so SEO and AEO are requirements, not afterthoughts.
---

# SeoBrief

Generates a structured SEO + AEO requirements brief at the START of planning — before architecture, before content, before code. Every team (dev, design, content, marketing) works from the same brief so discoverability is built in, not bolted on.

**Use this before:**
- Designing a new page or route
- Planning a new feature that has a public-facing URL
- Starting a new blog post or content series
- Adding a new content type or page category

---

## Usage

```
/seo-brief "Contact page for a B2B SaaS platform"
/seo-brief "Blog post: why sole traders can't use novated leases"
/seo-brief "Location landing page: caravan finance Melbourne"
/seo-brief "Broker profile page for a finance directory"
/seo-brief "Calculator tool — loan repayment estimator"
```

Provide a one-sentence description of what the page/feature is and who it's for. The more specific, the better the brief. If the description is vague, ask one clarifying question before generating.

---

## Step 0: Load project context

Read `CLAUDE.md` in the current working directory. Extract:
- **Domain and brand name** — used in title templates and schema
- **Existing page types** — to understand the site's content architecture and avoid cannibalisation
- **Primary audience** — who the site serves
- **Internal link destinations** — key pages the site converts through (e.g. /brokers, /calculator, /products, /pricing)
- **Private routes** — paths that should never be indexed

If no CLAUDE.md exists, ask the user for brand name and domain before proceeding.

---

## Step 1: Classify the page

Before generating the brief, classify the page/feature into one of these types. The type determines what the brief includes.

| Type | Description | Examples |
|------|-------------|---------|
| **Content** | Article, guide, blog post, explainer | Blog post, FAQ page, how-to guide |
| **Directory/Listing** | Navigational index of items | Broker list, product catalogue, search results |
| **Profile/Detail** | Individual item page | Broker profile, product page, case study |
| **Tool/Calculator** | Interactive utility | Loan calculator, quote tool, configurator |
| **Location** | Geo-targeted landing page | "Caravan finance Melbourne", "Broker Sydney" |
| **Transactional/Private** | Form flows, admin, auth | Claim listing, verify token, checkout |
| **Static/Utility** | Legal, contact, about | Privacy policy, contact, terms |

State the classification at the top of the brief.

---

## The Brief

Generate each section below. Be specific — generic advice is useless. Every recommendation must be actionable.

---

### 1. Indexability decision

State clearly: **Index** or **Noindex**, and the reason.

- Index: all public pages that should appear in search results
- Noindex: form flows, authentication pages, admin routes, duplicate/filtered URLs, thank-you pages
- If uncertain (e.g. filtered listing pages with low unique value), explain the tradeoff

**Technical requirement:**
```
robots: { index: true/false, follow: true/false }
googleBot: { "max-snippet": -1 }   // on all indexed pages
```

---

### 2. URL and canonical

Recommend a URL slug following these rules:
- Lowercase, hyphens only, no underscores
- Include the primary keyword where natural
- No stop words unless they're part of the keyword
- No trailing slash

```
Recommended URL:   /path/to/page
Canonical:         https://[domain]/path/to/page
```

Flag if a similar URL already exists on the site (cannibalisation risk).

---

### 3. Search intent and audience

**Search intent:** Classify as one of:
- Informational — "how does X work", "what is X"
- Decision-stage — "X vs Y", "best X for Y", "should I X"
- Transactional — "get X", "find X near me", "compare X"
- Navigational — user is looking for a specific known resource

**Target audience:** One sentence describing the specific person — their situation, what they already know, what they're trying to decide.

**Stage in journey:** Awareness / Consideration / Decision

---

### 4. Keyword targeting

```
Primary keyword:    [exact phrase — what this page is the best result for]
Secondary keywords: [2–4 supporting phrases]
Competitor gap:     [what most search results get wrong or miss about this topic]
```

Only include keywords that match the page's actual content and intent. Do not recommend keywords the page cannot genuinely be the best result for.

---

### 5. Title and meta description

```
Meta title:        [max 70 chars — primary keyword near the front, brand at the end]
Meta description:  [max 160 chars — answers the search intent, includes a reason to click]
```

Both must be written to the actual page topic, not generic placeholders.

---

### 6. Technical SEO requirements

Specify exactly what the developer needs to implement:

```tsx
// Next.js App Router pattern — adapt to project framework
alternates: { canonical: "https://[domain]/[slug]" }
robots: {
  index: true,
  follow: true,
  googleBot: { "max-snippet": -1, "max-image-preview": "large" }
}
openGraph: {
  title: "[meta title]",
  description: "[meta description]",
  type: "website" | "article",
  images: [{ url: "[og-image-url]", width: 1200, height: 630 }]
}
```

---

### 7. Schema / JSON-LD requirements

Specify the schema type(s) and required fields. Match to the page classification:

| Page type | Primary schema | Additional |
|-----------|---------------|------------|
| Content / Blog | `Article` (datePublished, author, publisher, keywords) | `FAQPage`, `BreadcrumbList` |
| Directory/Listing | `CollectionPage` (name, description, publisher) | `BreadcrumbList` |
| Profile/Detail | `LocalBusiness` or `Person` | `BreadcrumbList` |
| Location | `LocalBusiness` + `Service` | `BreadcrumbList` |
| Tool/Calculator | `WebApplication` | — |
| Contact | `ContactPage` + `ContactPoint` | — |
| Static/Utility | `WebPage` | — |
| Homepage | `Organization` + `WebSite` + `SearchAction` | — |

For each schema, list the specific fields that must be populated — not just the type name.

---

### 8. Internal linking strategy

**Links INTO this page** — which existing pages should add a link to this new page, and where:
```
[existing page] → link to this page in the [section/context]
```

**Links OUT from this page** — what this page should link to, and when:
```
When the copy [context] → link to [destination]
```

Minimum 2 outbound internal links for any content page. For tools and calculators, specify where in the user flow links should appear.

---

### 9. AEO requirements

*(Include this section for Content, Location, and Profile page types. Skip for Transactional/Private and Tool pages.)*

**Primary AI query this page must answer:**
> "[Exact question as someone would ask Perplexity or ChatGPT]"

**Direct answer sentence** *(must appear in the first paragraph of the page body):*
> "[2–3 sentence direct answer. No preamble. Usable as a standalone AI answer snippet.]"

**Why AI will cite this page over competitors:**
- [Specific gap: what does this page say that competitors don't?]
- [Specific mechanism: why does it explain the HOW, not just the WHAT?]

**Citation anchors** *(2–3 specific, attributable facts the page must contain):*
- [Specific fact: number, rule, regulation, or named mechanism — not a generic claim]
- [Specific fact]

**Entity signals** *(named authorities, legislation, or standards the page must reference):*
- [Entity name] — [why it matters for this topic]

**FAQ seed questions** *(3–5 questions for the FAQPage schema and body FAQ section):*
1. [Question as a real searcher would phrase it]
2. [Question]
3. [Question]

**Content quality gate:**
- Minimum word count: [700 / 800 / 1000 — based on topic depth required]
- Must include: [worked example / case study / specific data point — what makes this non-generic]
- Human review required for: [any section with statistics or regulatory claims]

---

### 10. Summary card

A one-page summary for sharing with the full team:

```
PAGE:              [name]
TYPE:              [classification]
INDEX:             Yes / No
URL:               /[slug]
PRIMARY KEYWORD:   [keyword]
SEARCH INTENT:     [informational / decision / transactional]
SCHEMA:            [types required]
AEO QUERY:         "[primary AI query]"
DIRECT ANSWER:     "[2-sentence answer]"
INTERNAL LINKS IN: [source pages]
INTERNAL LINKS OUT: [destinations]
OWNER:             [dev / content / both]
```

---

## Examples

```
User: /seo-brief "Blog post about why a broker's lender panel size matters for caravan loans"
→ Classifies as Content
→ Primary keyword: "lender panel caravan finance australia"
→ Search intent: Informational
→ AEO query: "What is a lender panel and why does it matter for a caravan loan?"
→ Direct answer sentence written
→ Schema: Article + FAQPage + BreadcrumbList
→ Full brief generated

User: /seo-brief "New location page: boat finance in Queensland"
→ Classifies as Location
→ Checks CLAUDE.md for existing location pages to avoid cannibalisation
→ Primary keyword: "boat finance queensland"
→ Schema: LocalBusiness + Service + BreadcrumbList
→ Full brief generated

User: /seo-brief "Admin page: broker dashboard to view leads"
→ Classifies as Transactional/Private
→ Indexability: Noindex — private authenticated route
→ Skips AEO section
→ Brief covers URL, canonical, noindex directive only
```
