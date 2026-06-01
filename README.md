# MAI Collective

**A personal AI infrastructure you own, control, and can share with anyone.**

MAI (My AI Infrastructure) is a framework that upgrades your AI coding assistant by giving it a name, a memory of who you are, a library of specialised capabilities, and automated workflows that run in the background. Think of it as installing a personality and a skillset onto your AI, so it stops being a generic chatbot and starts feeling like a capable, personalised assistant.

You do not need to know how to code to install and use MAI. This guide will walk you through every step.

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

| Feature | Claude Code | Cursor |
|---|---|---|
| Skills (auto-loaded) | Yes | Yes |
| Slash commands | Yes | Yes |
| Session hooks (background automation) | Yes | Partial: hooks run via terminal |
| Voice announcements | Yes (Mac only) | Yes (Mac only) |

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

A pre-ship audit that checks both technical SEO and AEO compliance for a finished page or content post. Both are weighted equally because a page that ranks in search but does not get cited by AI engines (Perplexity, ChatGPT, Google AI Overviews) is half-optimised.

For code files: checks canonical URL, robots directives, Open Graph images, schema types, brand name consistency, and whether FAQ schema answers are self-contained enough to be extracted as AI answer snippets.

For content posts: checks the database row for completeness (meta title, meta description, keywords, FAQ JSON, images), then reads the body and checks that the first paragraph directly answers the core question, that headings are phrased as real questions, that there are specific attributable facts (not generic claims), and that the content links to the site's primary action pages. Also checks for em dashes (a common style fault that causes rendering issues in some AI output renderers).

---

## What can MAI be used for?

MAI is useful for anyone who builds or writes professionally with AI assistance.

**For developers and engineers:**
- Structured bug investigation with `/diagnose`
- Code review before merging with `/review`
- Test-driven development with `/tdd`
- SEO audit before shipping a page with `/seo-check`
- Rapid prototyping with `/prototype`
- Security review with a dynamic agent using security and adversarial traits

**For writers and content creators:**
- Use `/zoom-out` to step back and assess whether your content achieves its goal
- Use `/grill-me` to stress-test your argument before publishing
- Use `/create-plan` to outline a long-form piece before writing
- Use `/seo-brief` to get keyword, schema, and AEO requirements before drafting
- Use `/seo-check` to audit a finished post before it goes live
- Use agents to run parallel research on different angles of a topic

**For product and operations teams:**
- Document processes with `/document`
- Create structured handoffs with `/handoff`
- Turn session insights into GitHub issues with `/create-issue`
- Generate architecture and flow diagrams with the Art skill

---

## Security

MAI includes built-in protections that run automatically:

**Secrets protection:** The `block-env-file.ts` hook prevents your AI from reading `.env` files or any file that looks like it contains passwords, API keys, or credentials. This runs before every file read.

**Command validation:** The `security-validator.ts` hook scans every shell command your AI wants to run before it executes. It flags commands that look destructive or dangerous and asks for confirmation first.

**Gitignored private files:** Your personal settings, contacts, and session history are listed in `.gitignore` and never uploaded to GitHub.

These protections are always on. You do not need to configure anything.

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

| Command | When to use it |
|---|---|
| `/zoom-out` | You have been deep in a problem and want to step back and see the bigger picture |
| `/grill-me` | You have an idea and want your AI to challenge it with tough questions |
| `/prototype` | You want to quickly test an idea before building it properly |
| `/diagnose` | Something is broken and you want a structured investigation |
| `/create-plan` | You want to plan out a project or feature before starting |
| `/explore` | You have opened a new codebase and want a guided tour |
| `/execute` | You have a plan and want to work through it step by step |
| `/review` | You want your AI to review the code you have written |
| `/tdd` | You want to write tests before writing code |
| `/peer-review` | You want a second opinion on work you have done |
| `/handoff` | You are passing a project to someone else and need a clear summary |
| `/document` | You want to update or generate documentation |
| `/create-issue` | You want to log a bug or task as a GitHub issue |
| `/learning-opp` | You want your AI to surface what you could learn from the current task |

---

## How to personalise

Your personal settings live in `config/user.yaml`. Open it in any text editor and change:

```yaml
USER_NAME: "Your Name"
DA: "Kai"
TIME_ZONE: "America/Los_Angeles"
```

This file is private and never uploaded to GitHub.

---

## Adding your own commands and skills

**New command:** Create a `.md` file in the `commands/` folder named `my-command.md`. It is available as `/my-command` immediately, no restart needed.

**New skill:** Create a folder under `skills/` (e.g. `skills/MySkill/`) and add a `SKILL.md` file inside it. The AI picks it up automatically next session.

No coding required. Both are written in plain Markdown.

---

## Private files: what never gets shared

| File | What it contains |
|---|---|
| `config/user.yaml` | Your name, AI name, timezone |
| `skills/CORE/Contacts.md` | Your personal contacts |
| `skills/CORE/CoreStack.md` | Your preferred tools and stack |
| `skills/CORE/SecurityProtocols.md` | Your personal security rules |
| `history/` | Your session logs |

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
