# MAI Collective

**A personal AI infrastructure you own, control, and can share with anyone.**

MAI (My AI Infrastructure) is a framework that upgrades your AI coding assistant by giving it a name, a memory of who you are, a library of specialised capabilities, and automated workflows that run in the background. Think of it as installing a personality and a skillset onto your AI, so it stops being a generic chatbot and starts feeling like a capable, personalised assistant.

You do not need to know how to code to install and use MAI. This guide will walk you through every step.

---

## Who is this for?

MAI is built for anyone who works with AI daily and wants more control, consistency, and capability than a standard chatbot gives them.

**Developers and engineers** use it to investigate bugs systematically, review code before merging, plan features before building, write tests first, and automate repetitive tasks that would otherwise require re-explaining context every session.

**Writers and content creators** use it to research topics before drafting, audit content for SEO and AI search visibility, strip AI-sounding language from drafts, stress-test arguments before publishing, and maintain a consistent voice across everything they produce.

**Operations, product, and business professionals** use it to document processes, generate structured handoffs, turn meeting notes into tracked issues, and produce architecture diagrams without needing a designer.

If you use AI regularly and find yourself re-explaining who you are, what you prefer, or how you want something done at the start of every session — MAI is for you.

---

## What does it actually do?

Without MAI, your AI assistant starts every session fresh. It does not know your name, your preferences, or how you like to work.

With MAI installed:

- Your AI greets you by name every session
- It loads only the relevant specialised **skills** when it needs them, keeping responses fast and focused
- It responds to **slash commands**, which are short shortcuts like `/zoom-out` or `/diagnose` that trigger detailed workflows
- It automatically saves a log of your sessions and maintains history across conversations
- It validates potentially dangerous actions before running them
- It speaks out loud when it finishes a task (optional, Mac only)

---

## Works with Claude Code and Cursor

MAI is built on top of Claude Code, but it also works inside **Cursor**, a popular AI-powered code editor. If you prefer Cursor over Claude Code's terminal interface, MAI's skills and commands work there too.


| Feature                               | Claude Code    | Cursor                          |
| ------------------------------------- | -------------- | ------------------------------- |
| Skills (auto-loaded)                  | Yes            | Yes                             |
| Slash commands                        | Yes            | Yes                             |
| Session hooks (background automation) | Yes            | Partial: hooks run via terminal |
| Voice announcements                   | Yes (Mac only) | Yes (Mac only)                  |


For Cursor users: install MAI using the terminal steps below, then open your project in Cursor. Your slash commands and skills will be available inside the Cursor AI chat panel.

---

## Understanding the three building blocks

MAI is built around three concepts. Understanding these will help you get the most out of it.

---

### 1. Slash Commands: You Stay in Control

A slash command (like `/review` or `/diagnose`) is a shortcut you type to trigger a specific workflow instantly. It is completely in your hands. When you type it, you are bypassing the AI's guesswork about what to do and telling it exactly how to process your request.

Think of it like ordering from a menu. Instead of saying "I'd like something to eat," you say "I'll have the salmon." The AI stops deliberating and delivers exactly what you asked for.

Slash commands are for **developer and writer velocity**: they keep you moving fast without explaining your intent every time.

---

### 2. Skills: The AI's Toolkit

A skill is a specific capability you grant to your AI. Each skill has a clear purpose, a defined set of inputs, and a defined output. The AI does not load all skills at once. It reads the task, recognises which skill is relevant, and loads only that one.

Think of skills like specialist consultants on your team. You do not bring every consultant into every meeting. You call the SEO consultant when you are building a landing page. You call the debugger when something is broken. MAI works the same way.

**Why this matters for token usage:** Loading only the relevant skill keeps your AI's working memory focused and efficient. This reduces wasted tokens, keeps responses faster, and makes the AI more accurate because it is not distracted by irrelevant context.

---

### 3. Agents: The Decision Maker

An agent is an autonomous system driven by an AI. Instead of just responding to a prompt and stopping, an agent runs in a loop. You give it a high-level goal, and it decides which steps to take, evaluates the results, and adjusts its plan until the goal is met.

Think of it as the difference between driving a car yourself and hiring a driver. Slash commands and skills are tools you use directly. An agent is something you delegate to.

MAI supports two types of agents:

**Named agents** have persistent personalities, backstories, and assigned voices. They are the same "person" across every session. The three built-in named agents are:

- **The Intern** ("The Brilliant Overachiever") — Enthusiastic, fast-talking, endlessly curious. Asks "but why?" about everything.
- **The Architect** ("The Academic Visionary") — Deep thinker with a PhD background in distributed systems. Knows which patterns are timeless versus trends.
- **The Engineer** ("The Battle-Scarred Leader") — 15 years from junior to technical lead. Thinks in years, not sprints. Asks "what problem are we solving?" before touching solutions.

**Dynamic agents** are composed on the fly by combining traits from three categories: expertise (security, legal, finance, technical, research, creative, business, data), personality (skeptical, enthusiastic, cautious, bold, analytical, contrarian, pragmatic, and more), and approach (thorough, rapid, systematic, exploratory, adversarial, consultative, and more). Each dynamic agent is automatically assigned a matching voice.

---

### How they work together

Here is a real example of all three in action:

1. You open a new project and type `/explore`. The slash command triggers the Explore workflow.
2. The AI loads the **Diagnose** skill because it detects a failing test.
3. You ask it to go deeper. The AI spins up a **dynamic agent** with a focused role: security expertise, skeptical personality, adversarial approach.
4. The agent reports back in a distinct voice. The main AI synthesises the findings and proposes a fix.

You stayed in control (slash command), the AI used the right tool (skill), and complex work was delegated (agent).

---

## Skills: what each one actually does

### CORE

Defines your AI's identity and loads it at the start of every session. It reads your name, your AI's name, and your preferences from your personal config file, and injects them so your AI knows who it is talking to. Without this, your AI starts every session as a blank slate.

### Agents

Manages the creation and orchestration of specialised agents. Two modes:

**Named agents** are persistent characters with defined backstories, speaking styles, and TTS voices. Use them for recurring work where you want the same "person" across sessions.

**Dynamic agents** are built on demand by combining traits from a library of 28 composable options across three categories (expertise, personality, approach). The AgentFactory tool builds the agent and assigns it an appropriate voice automatically. You can run multiple dynamic agents in parallel for complex multi-step work.

### Art

Generates visual content using an Excalidraw hand-drawn aesthetic: slightly wobbly lines, simple shapes, dark backgrounds with electric blue and cyan accents. Three workflows:

- **Technical diagrams** — architecture, system flow, API diagrams
- **Blog headers / editorial illustrations** — for articles and posts
- **Comics** — multi-panel sequential narrative, editorial style

All generated images go to `~/Downloads/` first so you can review them before placing them in your project.

### Browser

Automates a real browser to take screenshots, verify that page elements exist, and open URLs for inspection. The key advantage is efficiency: where the standard Playwright MCP tool loads approximately 13,700 tokens into every session, the Browser skill uses pre-written code that runs from a single command and uses close to zero tokens. That is a 99% reduction in token usage for browser tasks.

For simple tasks (screenshot, verify, open): use the one-line CLI command.
For complex tasks (form filling, authentication flows, multi-step interactions): use the pre-written workflows.

### CreateSkill

A meta-skill that helps you build new skills from scratch. It reads the MAI skill specification, scaffolds the correct folder and file structure, and validates that all workflow references resolve correctly. Use it when you want to add a new capability to your MAI setup without learning the structure manually.

### Diagnose

A structured six-phase debugging methodology for hard bugs and performance regressions. The core insight: the single most important step is building a fast, deterministic, repeatable pass/fail signal for the bug. Everything else is mechanical. Diagnose builds that loop first, then works through root cause analysis phase by phase. Use it when something is broken and you want a systematic investigation rather than guessing.

### Prompting

A meta-prompting system for building precise, structured instructions programmatically. It contains two major components:

**Standards.md** is a complete prompt engineering guide based on Anthropic's Claude 4.x best practices and over 1,500 academic papers on prompt optimisation. When you need to write a complex prompt, this is the reference.

**Templates** are five Handlebars-based primitives for generating prompts from data: ROSTER (agent or skill definitions), VOICE (personality calibration), STRUCTURE (multi-step workflows), BRIEFING (agent context handoffs), and GATE (validation checklists). Use this when you are building an AI application and need to generate consistent, structured prompts from your own data.

### Prototype

Generates throwaway code to answer a specific design question before committing to a production build. A prototype here means code that gets deleted after it answers its question. There are two modes:

**Logic prototypes** are for validating state machines, data models, and business rules. They generate a reducer file, a command runner, and a notes file. Run them with one command and see full state printed after every action.

**UI prototypes** are for comparing design variants. They generate multiple variant files and a Switcher component for flipping between them. Use this when you have two ideas for a layout and want to compare them side by side before choosing.

The Scaffold tool generates all boilerplate instantly. Your job is to fill in the logic or design, observe the result, write the answer in the notes file, and delete the whole folder.

### SeoBrief

Generates a complete SEO and AEO (Answer Engine Optimisation) requirements brief at the start of planning, before any code is written or content is drafted. It classifies the page type, recommends a URL, defines search intent and audience, specifies keywords, writes a meta title and description, lists exact technical requirements for the developer, specifies the schema types and fields needed, defines the internal linking strategy, and generates the primary AI query the page must answer along with the direct answer sentence that should appear in the first paragraph.

Use this before designing, wiring, or writing any public-facing page. It gives every team member (developer, designer, content writer) the same brief so SEO and AEO are built in from day one, not retrofitted.

### SeoCheck

A pre-ship audit that checks both technical SEO and AEO compliance for a finished page or content post.

For code files: checks canonical URL, robots directives, Open Graph images, schema types, brand name consistency, and whether FAQ schema answers are self-contained enough to be extracted as AI answer snippets.

For content posts: checks the database row for completeness (meta title, meta description, keywords, FAQ JSON, images), then reads the body and checks that the first paragraph directly answers the core question, that headings are phrased as real questions, that there are specific attributable facts (not generic claims), and that the content links to the site's primary action pages. Also checks for em dashes (a common style fault that causes rendering issues in some AI output renderers).

### Research

Runs Anna, a blog writing research specialist, who produces a complete research document to inform a blog post. Every output covers three layers:

**SEO** — competitor gap analysis, keyword research (primary, secondary, long-tail, semantic), angle gaps, and content structure recommendations based on what the top-ranking pages include and miss.

**AEO (Answer Engine Optimisation)** — featured snippet opportunities, People Also Ask questions extracted from the SERP, voice search phrasing, schema markup recommendations (FAQ, HowTo, Article), and which sections of the post should be formatted as direct 40-60 word Q&A answers.

**GEO (Generative Engine Optimisation)** — whether Perplexity, ChatGPT, or Google AI Overviews currently cover the topic and which sources they cite, entity clarity gaps, fact density requirements, E-E-A-T signals the post needs, and a citation-worthiness checklist so the post gets picked up by AI systems.

Anna works within hard credit limits: 12 web searches maximum, 5 competitor URLs, 3 forum searches. She stops as soon as each section has enough data, writes it, and moves on. She does not loop. Use `/research` before drafting.

### FactCheck

Runs Veritas, a fact-checking specialist, to validate the citations, sources, and factual claims in a research document before it goes to a writer. Veritas navigates to every URL, extracts text, and compares it against what the research claims the source says. Issues are flagged by severity: critical (blocks drafting until fixed), warning (proceed with notes), or info (style and completeness). Output is a structured JSON report with per-source verdicts and a prioritised fix list. Use `/fact-check` after `/research`.

### Anti-AI Voice Editor

A voice editor that rewrites AI-sounding text so it reads like a clear, specific human. It removes a hard-ban list of over 40 AI vocabulary words (delve, showcase, leverage, robust, tapestry, and more), rewrites twelve specific AI sentence patterns (the "In a world where..." opener, the "Most people vs. the few who win" split, the "Stop X, start Y" switch, and others), and strips common AI writing habits including fake suspense, vague moral lessons, hollow transitions, repeated sentence rhythm, and inflated adjectives.

Paste any text after typing `/anti-ai` and receive only the rewritten version — no notes, no list of changes. The full rule source and copywriting reference are in `knowledge_base/`.

---

## What can MAI be used for?

MAI is useful for anyone who builds or writes professionally with AI assistance.

**For developers and engineers:**

- After using /cto, use /write-prd to generate prd
- Use `/create-plan` with the PRD to plan your build
- Start generating code with /execute
- Structured bug investigation with `/diagnose`
- Code review before merging with `/review, then /peer-review with a different AI to help review`
- Test-driven development with `/tdd`
- SEO audit before shipping a page with `/seo-check`
- Rapid prototyping with `/prototype`
- Security review with a dynamic agent using security and adversarial traits

**For writers and content creators:**

- Use `/zoom-out` to step back and assess whether your content achieves its goal
- Use `/grill-me` to stress-test your argument before publishing
- Use `/seo-brief` to get keyword, schema, and AEO requirements before drafting
- Use `/seo-check` to audit a finished post before it goes live
- Use `/research` to run Anna, the blog research specialist, for SEO, AEO, and GEO-ready research before drafting
- Use `/fact-check` to validate research citations and sources before writing
- Use `/anti-ai` to strip AI voice patterns from a finished draft
- Use agents to run parallel research on different angles of a topic

**For product and operations teams:**

- Document processes with `/document`
- Create structured handoffs with `/handoff`
- Turn session insights into GitHub issues with `/create-issue`
- Generate architecture and flow diagrams with the Art skill

---

## Security

MAI includes four layers of built-in protection that run automatically. You do not need to configure anything.

**Your passwords and API keys are protected.** Before your AI reads any file, MAI checks whether it looks like a credentials file. If it does, the read is blocked. Your AI cannot accidentally expose your secrets to itself or log them anywhere.

**Risky commands require your approval.** Before your AI runs any system command on your computer, MAI checks whether that command looks destructive or irreversible. Commands like deleting folders, force-pushing code, or overwriting data are flagged and paused until you explicitly confirm. Your AI cannot take drastic actions without your say-so.

**Your personal files never leave your machine.** Your name, preferences, contacts, and session history are stored locally and are excluded from GitHub uploads by default. Even if you share or publish your MAI setup, your personal configuration stays private.

**Your writing is checked for AI patterns before it goes public.** The `/anti-ai` command and the knowledge base writing rules are baked into the system so content produced with MAI assistance can be reviewed for AI voice patterns before publishing — protecting your professional reputation.

---

## Your data and privacy

**MAI runs on your computer.** There are no MAI servers. The framework is a set of files that lives in a folder on your machine and shapes how your AI assistant behaves.

**Where your conversations go.** When you type a message, it travels directly from your computer to Anthropic's API — the company that makes Claude. Anthropic's privacy policy governs what happens to that data. You can read it in full at [anthropic.com/legal/privacy](https://www.anthropic.com/legal/privacy).

Key points from Anthropic's policy:

- Conversations deleted from Claude.ai are removed from their systems within 30 days
- You can opt out of your data being used to train future models through your account settings
- API usage (which is how Claude Code works) has different terms than the consumer Claude.ai product — check Anthropic's privacy centre for the current details

**What MAI itself stores.** MAI saves a log of your sessions in a `history/` folder on your computer. This is local only and is never uploaded to GitHub or any external service. You can delete it at any time.

**Sensitive information.** Do not share passwords, API keys, personal data belonging to other people, or confidential business information you are not authorised to process through a third-party AI service. If you are unsure whether a type of data is appropriate to use with an AI tool, check with your organisation's IT or legal team before proceeding.

---

## Before you install

You need two free tools installed on your computer.

1. **Claude Code**: the AI assistant this framework runs on
  Download: [claude.ai/code](https://claude.ai/code)
2. **Bun**: a fast JavaScript runtime that handles the background automation
  Download: [bun.sh](https://bun.sh) — takes under a minute

Mac users: both tools work out of the box. Windows support requires WSL (Windows Subsystem for Linux). See the Claude Code documentation for Windows setup.

---

## How to install

Open your **Terminal** app (Mac: press `Cmd + Space`, type "Terminal", press Enter) and run these commands one at a time.

**Step 1: Download MAI onto your computer**

```bash
git clone https://github.com/xMmAI/mai-collective.git ~/mai-collective
```

**Step 2: Move into the MAI folder**

```bash
cd ~/mai-collective
```

**Step 3: Run the installer**

```bash
./install.sh
```

The installer will ask you three questions:

- Your name (e.g. `Tammy`)
- What you would like to call your AI assistant (default is `Kai`)
- Your timezone (e.g. `America/Los_Angeles` or `Australia/Melbourne`)

Once done, close and reopen Claude Code or Cursor. Your AI will greet you by name in the next session.

---

## Folder structure

```
mai-collective/
|
+-- install.sh              <- Run this once to set everything up
+-- README.md               <- This file
|
+-- config/
|   +-- user.template.yaml  <- Template for your personal settings
|   +-- user.yaml           <- YOUR settings (created by installer, never committed)
|
+-- commands/               <- Slash commands you type to your AI
|   +-- zoom-out.md
|   +-- diagnose.md
|   +-- prototype.md
|   +-- ... (12 commands total)
|
+-- skills/                 <- Capabilities your AI loads when needed
|   +-- CORE/               <- Identity: your name, your AI's name, preferences
|   +-- Agents/             <- Named agents + dynamic agent composition from traits
|   |   +-- SKILL.md
|   |   +-- AgentPersonalities.md   <- The Intern, The Architect, The Engineer
|   |   +-- Data/Traits.yaml        <- 28 composable traits + voice mappings
|   |   +-- Templates/              <- Agent prompt template
|   |   +-- Tools/AgentFactory.ts   <- Dynamic agent composition engine
|   |   +-- Workflows/              <- CreateCustomAgent, ListTraits, SpawnParallel
|   +-- Art/                <- Diagrams, blog headers, comics (Excalidraw aesthetic)
|   |   +-- Workflows/TechnicalDiagrams.md
|   |   +-- Workflows/Essay.md
|   |   +-- Workflows/Comics.md
|   +-- Browser/            <- Browser automation, screenshots, page verification
|   |   +-- Tools/Browse.ts         <- One-command CLI for screenshots and verify
|   |   +-- Workflows/              <- Multi-step browser workflows
|   +-- CreateSkill/        <- Scaffold and validate new skills
|   +-- Diagnose/           <- Six-phase structured debugging
|   |   +-- Workflows/Diagnose.md
|   +-- Prompting/          <- Meta-prompting, Handlebars templates, standards
|   |   +-- Standards.md            <- Prompt engineering guide (1,500+ papers)
|   |   +-- Templates/Primitives/   <- ROSTER, VOICE, STRUCTURE, BRIEFING, GATE
|   |   +-- Tools/RenderTemplate.ts
|   +-- Prototype/          <- Throwaway code to test an idea before building it
|   |   +-- Tools/Scaffold.ts       <- Generates boilerplate for logic or UI prototypes
|   |   +-- Workflows/Logic.md
|   |   +-- Workflows/UI.md
|   +-- SeoBrief/           <- Full SEO + AEO requirements brief before you build
|   +-- SeoCheck/           <- Pre-ship SEO + AEO compliance audit
|   +-- Research/           <- Blog writing research agent (Anna) — SEO, AEO, GEO
|   |   +-- agents/research/system_prompt.md
|   |   +-- agents/research/contract.json
|   |   +-- agents/research/templates/research_output.md
|   +-- FactCheck/          <- Fact-checking agent (Veritas) — validates citations and sources
|   |   +-- agents/fact_checker/system_prompt.md
|   |   +-- agents/fact_checker/contract.json
|   |   +-- agents/fact_checker/templates/fact_check_feedback.json
|
+-- knowledge_base/         <- Writing reference files (never committed if private)
|   +-- anti_ai_writingStyle.md  <- Anti-AI voice rules + Wikipedia reference
|   +-- copy_writing.md          <- Copywriting masters framework (Hopkins, Ogilvy, etc.)
|
+-- hooks/                  <- Background automation (runs silently each session)
|   +-- initialize-session.ts       <- Sets up the session environment
|   +-- load-core-context.ts        <- Loads your name and preferences
|   +-- capture-all-events.ts       <- Logs what happens during the session
|   +-- capture-session-summary.ts  <- Saves a summary when the session ends
|   +-- stop-hook.ts                <- Runs tasks when your AI finishes
|   +-- stop-hook-voice.ts          <- Speaks aloud when finished (Mac only)
|   +-- security-validator.ts       <- Checks risky commands before running
|   +-- block-env-file.ts           <- Prevents secrets files from being read
|
+-- history/                <- Auto-saved session logs (never uploaded to GitHub)
    +-- sessions/           <- Full session transcripts by month
    +-- raw-outputs/        <- Raw event data
    +-- learnings/          <- Things your AI flagged as worth remembering
```

---

## Slash commands: full list


| Command         | When to use it                                                                   |
| --------------- | -------------------------------------------------------------------------------- |
| `/zoom-out`     | You have been deep in a problem and want to step back and see the bigger picture |
| `/grill-me`     | You have an idea and want your AI to challenge it with tough questions           |
| `/prototype`    | You want to quickly test an idea before building it properly                     |
| `/diagnose`     | Something is broken and you want a structured investigation                      |
| `/create-plan`  | You want to plan out a project or feature before starting                        |
| `/explore`      | You have opened a new codebase and want a guided tour                            |
| `/execute`      | You have a plan and want to work through it step by step                         |
| `/review`       | You want your AI to review the code you have written                             |
| `/tdd`          | You want to write tests before writing code                                      |
| `/peer-review`  | You want a second opinion on work you have done                                  |
| `/handoff`      | You are passing a project to someone else and need a clear summary               |
| `/document`     | You want to update or generate documentation                                     |
| `/create-issue` | You want to log a bug or task as a GitHub issue                                  |
| `/learning-opp` | You want your AI to surface what you could learn from the current task           |
| `/research`     | Research a topic for a blog post — covers SEO, AEO, and GEO in one document      |
| `/fact-check`   | Validate citations and sources in a research document before drafting            |
| `/anti-ai`      | Rewrite AI-sounding text so it reads like a clear, specific human                |


---

## How to personalise

Your personal settings live in `config/user.yaml`. Open it in any text editor and change:

```yaml
USER_NAME: "Your Name"
DA: "M.AI"
TIME_ZONE: "America/Los_Angeles"
```

This file is private and never uploaded to GitHub.

Have a play around with creating a skill, and using slash commands. Then when you are ready to personalise it even further to meet you specific requirements to your roles and responsibilities, open a fresh claude terminal: 

```yaml
What is your name? 
# it should respond with the name you gave it

What skills do you have, list them all? 
# you should see the list of skills 

# To personalised:
  I want to be personalised further for my role as a [ input job title ] for [company], understand the requirements to excel in this position. I want you to understand, evaluate, synthesis, and ask me questions to truely grasps what its needed, then recommend knowledge based, architecture to improve your system for me.

#or

❯ i want to personalise you further to my roles and responsbilitlies as a [ role and industry ]. First, tell me what skills and agents i have, then recommend updated knowledged based, ask me questions if you need to recommend the bests setup.
```

---

Claude will work you through its recommendation. Think of it as a your partner, chat with it so that it can fully understand. 

## Adding your own commands and skills

**New command:** Create a `.md` file in the `commands/` folder named `my-command.md`. It is available as `/my-command` immediately, no restart needed.

**New skill:** Create a folder under `skills/` (e.g. `skills/MySkill/`) and add a `SKILL.md` file inside it. The AI picks it up automatically next session.

No coding required. Both are written in plain Markdown.

---

## Private files: what never gets shared


| File                               | What it contains               |
| ---------------------------------- | ------------------------------ |
| `config/user.yaml`                 | Your name, AI name, timezone   |
| `skills/CORE/Contacts.md`          | Your personal contacts         |
| `skills/CORE/CoreStack.md`         | Your preferred tools and stack |
| `skills/CORE/SecurityProtocols.md` | Your personal security rules   |
| `history/`                         | Your session logs              |


---

## Troubleshooting

**My AI does not know my name after installing**
Restart Claude Code or Cursor completely (quit and reopen). Identity is injected at session start.

**I see an error about `bun` not found**
Bun is not installed. Visit [bun.sh](https://bun.sh) and follow the one-line install instruction.

**My slash commands are not working in Cursor**
Open a new Cursor window and try again. Cursor reads commands on startup.

**I want to undo the install**
Run this in Terminal to restore your original commands folder:

```bash
rm ~/.claude/commands && mv ~/.claude/commands.bak ~/.claude/commands
```

Then remove the MAI lines from `~/.claude/settings.json`.