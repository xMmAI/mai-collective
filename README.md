# MAI Collective

**A personal AI infrastructure you own, control, and can share with anyone.**

MAI (My AI Infrastructure) is a framework that upgrades your AI coding assistant by giving it a name, a memory of who you are, a library of specialised capabilities, and automated workflows that run in the background. Think of it as installing a personality and a skillset onto your AI, so it stops being a generic chatbot and starts feeling like a capable, personalised assistant.

You do not need to know how to code to install and use MAI. This guide will walk you through every step.

---

## What does it actually do?

Without MAI, your AI assistant starts every session fresh. It does not know your name, your preferences, or how you like to work.

With MAI installed:

- Your AI greets you by name every session
- It loads a set of specialised **skills** depending on what you are working on
- It responds to **slash commands**, which are short shortcuts like `/zoom-out` or `/diagnose` that trigger detailed workflows
- It automatically saves a log of your sessions, captures what you learn, and maintains history across conversations
- It validates potentially dangerous actions before running them
- It speaks out loud when it finishes a task (optional, Mac only)

---

## Works with Claude Code and Cursor

MAI is built on top of Claude Code, but it also works inside **Cursor**, a popular AI-powered code editor. If you prefer Cursor over Claude Code's terminal interface, MAI's skills and commands work there too.

| Feature | Claude Code | Cursor |
|---|---|---|
| Skills (auto-loaded) | Yes | Yes |
| Slash commands | Yes | Yes |
| Session hooks (automation) | Yes | Partial: hooks run in the terminal |
| Voice announcements | Yes (Mac only) | Yes (Mac only) |

For Cursor users: install MAI using the terminal steps below, then open your project in Cursor. Your slash commands and skills will be available inside the Cursor AI chat panel.

---

## Understanding the three building blocks

MAI is built around three concepts. Understanding these will help you get the most out of it.

### 1. Slash Commands: You Stay in Control

A slash command (like `/review` or `/diagnose`) is a shortcut you type to trigger a specific workflow instantly. It is completely in your hands. When you type it, you are bypassing the AI's guesswork about what to do and telling it exactly how to process your request.

Think of it like ordering from a menu. Instead of saying "I'd like something to eat," you say "I'll have the salmon." The AI stops deliberating and delivers exactly what you asked for.

**Examples of when to use them:**

- You want code reviewed, not documented: type `/review`
- Something is broken and you want a structured investigation: type `/diagnose`
- You have an idea and want your AI to challenge it: type `/grill-me`

Slash commands are great for **developer velocity**: they keep you moving fast without explaining your intent every time.

---

### 2. Skills: The AI's Toolkit

A skill is a specific capability you grant to your AI. Each skill has a clear purpose, a defined set of inputs, and a defined output. The AI does not load all skills at once. It reads the task, recognises which skill is relevant, and loads only that one.

Think of skills like specialist consultants on your team. You do not bring every specialist into every meeting. You call the SEO consultant when you are building a landing page. You call the debugger when something is broken. MAI works the same way.

**Why this matters for token usage:** Loading only the relevant skill instead of everything at once keeps your AI's working memory focused and efficient. This reduces wasted tokens and keeps responses faster and more accurate.

**What MAI includes:**

| Skill | What it does |
|---|---|
| **CORE** | Your AI's identity, your name, and your preferences. Loads every session automatically. |
| **Agents** | Creates specialised sub-agents with different personalities for different tasks. |
| **Art** | Generates hand-drawn-style diagrams, illustrations, and visual content. |
| **Browser** | Opens a real browser, takes screenshots, clicks buttons, and verifies that web pages work correctly. |
| **CreateSkill** | Helps you build your own new skill from scratch. |
| **Diagnose** | Runs a structured six-phase investigation when something is broken. |
| **Prompting** | Builds complex, precise instructions for your AI using templates and standards. |
| **Prototype** | Generates throwaway code to test an idea or design decision quickly, before committing to a real build. |
| **SeoBrief** | Before you build a web page, generates a full list of SEO and answer-engine requirements. |
| **SeoCheck** | After you build a web page, audits it for SEO and answer-engine compliance. |

---

### 3. Agents: The Decision Maker

An agent is an autonomous system driven by an AI. Instead of just responding to a prompt and stopping, an agent runs in a loop. You give it a high-level goal, and it decides which steps to take, evaluates the results, and adjusts its plan until the goal is met.

Think of it as the difference between driving a car yourself and hiring a driver. Slash commands and skills are tools you use directly. An agent is something you delegate to.

**Example:** You tell the agent, "Review our documentation and flag anything that is out of date." It reads the files, identifies issues, logs findings, and reports back, without you managing each step.

MAI's **Agents** skill makes it possible to spin up multiple specialised agents in parallel, each with a different personality or focus area.

---

### How they work together

Here is a real-world example of all three in action:

1. You open a new project and type `/explore`. The slash command triggers the Explore workflow.
2. The AI loads the **Diagnose** skill because it detects a failing test in the codebase.
3. You ask it to investigate further. The AI spins up a **sub-agent** with a focused role: "investigate only this module."
4. The sub-agent reports back. The main AI synthesises the findings and proposes a fix.

You stayed in control (slash command), the AI used the right tool (skill), and complex work was delegated (agent). All three layers worked together.

---

## What can MAI be used for?

MAI is useful for anyone who writes, builds, or thinks professionally with AI assistance. It is not limited to software development.

**For developers and engineers:**
- Structured bug investigation with `/diagnose`
- Code review before merging with `/review`
- Test-driven development with `/tdd`
- SEO audit before shipping a page with `/seocheck`
- Rapid prototyping with `/prototype`

**For writers and content creators:**
- Use `/zoom-out` to step back and assess whether your content achieves its goal
- Use `/grill-me` to stress-test your argument before publishing
- Use `/create-plan` to outline a long-form piece before writing
- Use `/learning-opp` to surface what you can improve from a finished draft
- Use agents to run parallel research on different angles of a topic

**For product and operations teams:**
- Document processes with `/document`
- Create structured handoffs with `/handoff`
- Turn session insights into GitHub issues with `/create-issue`

---

## Security

MAI includes built-in protections that run automatically in the background:

**Secrets protection:** The `block-env-file.ts` hook prevents your AI from reading `.env` files or any file that looks like it contains passwords, API keys, or credentials. This runs before every file read.

**Command validation:** The `security-validator.ts` hook scans every shell command your AI wants to run before it executes. It flags commands that look destructive or dangerous and asks for your confirmation first.

**Gitignored private files:** Your personal settings, contacts, and session history are listed in `.gitignore` and never uploaded to GitHub, even if you push the rest of the repo.

These protections are always on. You do not need to configure anything.

---

## Before you install

You need two free tools installed on your computer. Both have simple installers.

1. **Claude Code**: the AI assistant this framework runs on
   Download: [claude.ai/code](https://claude.ai/code)

2. **Bun**: a fast JavaScript runtime that handles the automation behind the scenes
   Download: [bun.sh](https://bun.sh) — takes under a minute

If you are on a Mac, both tools work out of the box. Windows support requires WSL (Windows Subsystem for Linux). See the Claude Code documentation for Windows setup.

---

## How to install

Open your **Terminal** app (on Mac: press `Cmd + Space`, type "Terminal", press Enter) and run these commands one at a time.

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

Here is everything inside the `mai-collective` folder, explained plainly:

```
mai-collective/
|
+-- install.sh              <- Run this once to set everything up
+-- README.md               <- This file
|
+-- config/
|   +-- user.template.yaml  <- The template for your personal settings
|   +-- user.yaml           <- YOUR settings (created by installer, private)
|
+-- commands/               <- Slash commands: shortcuts you type to your AI
|   +-- zoom-out.md
|   +-- diagnose.md
|   +-- prototype.md
|   +-- ... (12 commands total)
|
+-- skills/                 <- Capabilities your AI loads when needed
|   +-- CORE/               <- Identity: your name, your AI's name, preferences
|   +-- Agents/             <- Creates and manages specialised sub-agents
|   |   +-- SKILL.md
|   |   +-- AgentPersonalities.md
|   |   +-- Workflows/      <- Step-by-step agent workflows
|   |   +-- Tools/          <- Programs the AI can run for this skill
|   +-- Art/                <- Generates diagrams and visual content
|   +-- Browser/            <- Controls a browser to test or verify web pages
|   +-- CreateSkill/        <- Helps you build new skills
|   +-- Diagnose/           <- Structured bug investigation
|   +-- Prompting/          <- Builds complex prompts from templates
|   +-- Prototype/          <- Creates throwaway code to test ideas quickly
|   +-- SeoBrief/           <- SEO requirements before you build
|   +-- SeoCheck/           <- SEO audit after you build
|
+-- hooks/                  <- Background automation (runs silently each session)
|   +-- initialize-session.ts       <- Sets up the session environment
|   +-- load-core-context.ts        <- Loads your identity and preferences
|   +-- capture-all-events.ts       <- Logs what happens during the session
|   +-- capture-session-summary.ts  <- Saves a summary when the session ends
|   +-- stop-hook.ts                <- Runs when your AI finishes a task
|   +-- stop-hook-voice.ts          <- Speaks aloud when finished (Mac only)
|   +-- security-validator.ts       <- Checks risky commands before running
|   +-- block-env-file.ts           <- Prevents your secrets file from being read
|
+-- history/                <- Auto-saved logs of your sessions (never uploaded)
    +-- sessions/           <- Full session transcripts, organised by month
    +-- raw-outputs/        <- Raw event data for each session
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
| `/explore` | You have opened a new codebase and want a guided tour of what is inside |
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

**New command:** Create a `.md` file in the `commands/` folder. Name it `my-command.md`. It is available as `/my-command` immediately, no restart needed.

**New skill:** Create a folder under `skills/` (e.g. `skills/MySkill/`) and add a `SKILL.md` file inside it. The next session, your AI picks it up automatically.

No coding required for basic commands and skills. Both are written in plain Markdown.

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
Bun is not installed yet. Visit [bun.sh](https://bun.sh) and follow the one-line install instruction.

**My slash commands are not working in Cursor**
Open a new Cursor window and try again. Cursor reads commands on startup.

**I want to undo the install**
Run this in Terminal to restore your original commands folder:
```bash
rm ~/.claude/commands && mv ~/.claude/commands.bak ~/.claude/commands
```
Then remove the MAI lines from `~/.claude/settings.json`.
