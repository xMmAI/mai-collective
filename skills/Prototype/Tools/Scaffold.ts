#!/usr/bin/env bun

/**
 * Scaffold — Prototype Boilerplate Generator
 * Part of the MAI Prototype skill
 *
 * Generates throwaway prototype files instantly so you start on the actual
 * design question instead of writing boilerplate in the conversation.
 *
 * USAGE
 *   bun run $MAI_DIR/skills/Prototype/Tools/Scaffold.ts --type logic --name <name>
 *   bun run $MAI_DIR/skills/Prototype/Tools/Scaffold.ts --type ui --name <name> [--variants 3]
 *   bun run $MAI_DIR/skills/Prototype/Tools/Scaffold.ts --help
 *
 * OPTIONS
 *   --type      Required. "logic" or "ui"
 *   --name      Required. Kebab-case name (e.g. "cart-state", "checkout-flow")
 *   --variants  UI only. Number of variants to generate (default: 3, max: 5)
 *   --dir       Where to create the folder (default: current working directory)
 *   --help      Show this message and exit
 */

import { parseArgs } from 'util'
import { existsSync, mkdirSync, writeFileSync } from 'fs'
import { join, resolve } from 'path'

// ─── Parse args ───────────────────────────────────────────────────────────────

const { values } = parseArgs({
  args: process.argv.slice(2),
  options: {
    type:     { type: 'string' },
    name:     { type: 'string' },
    variants: { type: 'string', default: '3' },
    dir:      { type: 'string' },
    help:     { type: 'boolean', default: false },
  },
  allowPositionals: false,
})

// ─── Help ─────────────────────────────────────────────────────────────────────

const HELP = `
Scaffold — Prototype Boilerplate Generator

USAGE
  bun run Scaffold.ts --type logic --name <name>
  bun run Scaffold.ts --type ui    --name <name> [--variants <n>]

OPTIONS
  --type      Required. "logic" or "ui"
  --name      Required. Kebab-case name (e.g. "cart-state", "checkout-flow")
  --variants  UI only.  Number of variants, 2–5 (default: 3)
  --dir       Where to create the folder (default: current directory)
  --help      Show this message

EXAMPLES
  bun run Scaffold.ts --type logic --name cart-state
  bun run Scaffold.ts --type ui    --name dashboard --variants 4
  bun run Scaffold.ts --type logic --name auth-flow --dir src/features/auth

WHAT IT GENERATES
  Logic:  prototype-<name>/logic.ts   → fill in your State, Action types, reducer
          prototype-<name>/run.ts     → fill in commands to match your actions
          prototype-<name>/NOTE.md    → write the question, then the answer

  UI:     prototype-<name>/VariantA.tsx … → fill in each design variant
          prototype-<name>/Switcher.tsx   → adapt the router import (see comments)
          prototype-<name>/NOTE.md        → write the question, then the answer
`

if (values.help || process.argv.length <= 2) {
  console.log(HELP)
  process.exit(0)
}

// ─── Validate ─────────────────────────────────────────────────────────────────

const errors: string[] = []

if (!values.type) {
  errors.push('--type is required. Use "logic" or "ui".')
} else if (!['logic', 'ui'].includes(values.type)) {
  errors.push(`--type must be "logic" or "ui". Got: "${values.type}"`)
}

if (!values.name) {
  errors.push('--name is required. Use kebab-case, e.g. "cart-state".')
} else if (!/^[a-z][a-z0-9-]*$/.test(values.name)) {
  errors.push(`--name must be kebab-case (lowercase, numbers, hyphens). Got: "${values.name}"`)
}

const variantCount = parseInt(values.variants ?? '3', 10)
if (isNaN(variantCount) || variantCount < 2 || variantCount > 5) {
  errors.push(`--variants must be between 2 and 5. Got: "${values.variants}"`)
}

if (errors.length > 0) {
  console.error('\n❌  Cannot scaffold — fix these issues:\n')
  errors.forEach(e => console.error(`  •  ${e}`))
  console.error('\nRun with --help for usage.\n')
  process.exit(1)
}

// ─── Setup paths ──────────────────────────────────────────────────────────────

const name      = values.name!
const type      = values.type as 'logic' | 'ui'
const baseDir   = values.dir ? resolve(values.dir) : process.cwd()
const protoDir  = join(baseDir, `prototype-${name}`)

if (existsSync(protoDir)) {
  console.error(`\n❌  Already exists: ${protoDir}`)
  console.error(`    Rename or delete it before scaffolding again.\n`)
  process.exit(1)
}

// ─── Write helper ─────────────────────────────────────────────────────────────

function write(filePath: string, content: string): void {
  writeFileSync(filePath, content, 'utf-8')
  const rel = filePath.replace(baseDir + '/', '')
  console.log(`  ✓  ${rel}`)
}

// ─── Logic: logic.ts ──────────────────────────────────────────────────────────

function genLogicTs(): string {
  return [
    `// PROTOTYPE — throwaway. Delete this folder when the question is answered.`,
    `// Question: [fill this in before writing any logic — see NOTE.md]`,
    `// Run with: bun run prototype-${name}/run.ts`,
    ``,
    `// ─── State ────────────────────────────────────────────────────────────────────`,
    `//`,
    `// Define the shape of everything your logic needs to track.`,
    `// Keep it as flat and simple as the question requires.`,
    ``,
    `export type State = {`,
    `  // example: count: number`,
    `}`,
    ``,
    `// ─── Actions ──────────────────────────────────────────────────────────────────`,
    `//`,
    `// Each action represents something that happened.`,
    `// Name them after what happened, not what to do next.`,
    ``,
    `export type Action =`,
    `  | { type: 'EXAMPLE_ACTION' }`,
    `  // Add more here as needed`,
    ``,
    `// ─── Initial state ────────────────────────────────────────────────────────────`,
    ``,
    `export const initialState: State = {`,
    `  // Match your State type above`,
    `}`,
    ``,
    `// ─── Reducer ──────────────────────────────────────────────────────────────────`,
    `//`,
    `// Pure function — no side effects, no I/O, no randomness.`,
    `// Takes current state + an action, returns the next state.`,
    ``,
    `export function reducer(state: State, action: Action): State {`,
    `  switch (action.type) {`,
    `    case 'EXAMPLE_ACTION':`,
    `      return state // Replace with your actual logic`,
    ``,
    `    default:`,
    `      return state`,
    `  }`,
    `}`,
  ].join('\n')
}

// ─── Logic: run.ts ────────────────────────────────────────────────────────────

function genRunTs(): string {
  // Note: ${BT} embeds a backtick character in the output file.
  // \${...} produces ${...} in the output (a template expression for run.ts to evaluate).
  return [
    `// PROTOTYPE — throwaway TUI. Delete this folder when the question is answered.`,
    `// Drives logic.ts interactively — push the state through hard cases.`,
    `// Run with: bun run prototype-${name}/run.ts`,
    ``,
    `import { reducer, initialState, type State } from './logic.ts'`,
    `import * as readline from 'readline'`,
    ``,
    `let state: State = initialState`,
    ``,
    `// ─── Display ──────────────────────────────────────────────────────────────────`,
    `//`,
    `// Called after every action. Shows the full current state.`,
    `// Add extra console.log lines here to see derived values.`,
    ``,
    `function display(state: State): void {`,
    `  console.clear()`,
    `  console.log('=== PROTOTYPE: ${name} ===')`,
    `  console.log('(throwaway — delete this folder when the question is answered)\\n')`,
    ``,
    `  console.log('STATE:')`,
    `  console.log(JSON.stringify(state, null, 2))`,
    ``,
    `  console.log('\\nCOMMANDS:')`,
    `  // Update these to match your Action types in logic.ts`,
    `  console.log('  [e]  EXAMPLE_ACTION')`,
    `  console.log('  [q]  quit')`,
    `}`,
    ``,
    `// ─── Input ────────────────────────────────────────────────────────────────────`,
    ``,
    `const rl = readline.createInterface({`,
    `  input: process.stdin,`,
    `  output: process.stdout,`,
    `})`,
    ``,
    `rl.on('line', (raw) => {`,
    `  const cmd = raw.trim().toLowerCase()`,
    ``,
    `  switch (cmd) {`,
    `    case 'e':`,
    `      state = reducer(state, { type: 'EXAMPLE_ACTION' })`,
    `      break`,
    ``,
    `    case 'q':`,
    `      console.log('\\nPrototype closed.')`,
    `      rl.close()`,
    `      process.exit(0)`,
    `      break`,
    ``,
    `    default:`,
    `      console.log('\\nUnknown command: "' + cmd + '" — try again or [q] to quit')`,
    `  }`,
    ``,
    `  display(state)`,
    `})`,
    ``,
    `rl.on('close', () => process.exit(0))`,
    ``,
    `display(state)`,
  ].join('\n')
}

// ─── UI: VariantX.tsx ─────────────────────────────────────────────────────────

const LETTERS = ['A', 'B', 'C', 'D', 'E']

const VARIANT_HINTS: Record<string, string> = {
  A: 'First approach — describe the layout concept in the comment below',
  B: 'Second approach — make this structurally different from Variant A',
  C: 'Third approach — different primary affordance or information hierarchy',
  D: 'Fourth approach',
  E: 'Fifth approach',
}

function genVariantTsx(letter: string): string {
  const hint = VARIANT_HINTS[letter] ?? `Variant ${letter}`
  return [
    `// PROTOTYPE — Variant ${letter}. Throwaway. Delete this folder when a variant is chosen.`,
    `// ${hint}`,
    `//`,
    `// HOW TO MOUNT`,
    `//   In your page, read the ?variant= search param and render accordingly:`,
    `//`,
    `//   const variant = searchParams.get('variant') ?? 'a'`,
    `//   if (variant === '${letter.toLowerCase()}') return <Variant${letter} {...props} />`,
    `//`,
    `// RULES`,
    `//   Make this structurally different from the other variants.`,
    `//   Use real data, not placeholder text — layout problems hide behind lorem ipsum.`,
    `//   No polish: no error handling, no loading states, no abstractions.`,
    ``,
    `export function Variant${letter}({ ...props }: Record<string, unknown>) {`,
    `  return (`,
    `    <div>`,
    `      {/*`,
    `        Variant ${letter}`,
    `        Layout concept: [describe what makes this approach unique]`,
    `      */}`,
    `    </div>`,
    `  )`,
    `}`,
  ].join('\n')
}

// ─── UI: Switcher.tsx ─────────────────────────────────────────────────────────

function genSwitcherTsx(letters: string[]): string {
  // Build the variant arrays as strings (regular template literals in function body)
  const variantList  = letters.map(l => `'${l.toLowerCase()}'`).join(', ')
  const namesEntries = letters.map(l => `  ${l.toLowerCase()}: 'Variant ${l}'`).join(',\n')

  // ${BT} embeds a backtick in the output. \${...} produces ${...} in the output.
  return [
    `// PROTOTYPE — Switcher. Throwaway. Remove entirely when a variant is chosen.`,
    `//`,
    `// Place <PrototypeSwitcher /> on the page alongside your variant content.`,
    `// Only renders in development — safe to leave until you pick a winner.`,
    `//`,
    `// ADAPT THE ROUTER IMPORT for your framework:`,
    `//`,
    `//   Next.js App Router (default below):`,
    `//     import { useRouter, useSearchParams } from 'next/navigation'`,
    `//     router.push('?variant=' + next)`,
    `//`,
    `//   Next.js Pages Router:`,
    `//     import { useRouter } from 'next/router'`,
    `//     const router = useRouter()`,
    `//     router.push({ query: { variant: next } })`,
    `//`,
    `//   React Router / Remix:`,
    `//     import { useNavigate, useSearchParams } from 'react-router-dom'`,
    `//     const navigate = useNavigate()`,
    `//     navigate('?variant=' + next)`,
    `//`,
    ``,
    `'use client' // Remove if not using Next.js App Router`,
    ``,
    `import { useRouter, useSearchParams } from 'next/navigation'`,
    `import { useEffect, useCallback } from 'react'`,
    ``,
    `const VARIANTS = [${variantList}] as const`,
    `type Variant = typeof VARIANTS[number]`,
    ``,
    `const VARIANT_NAMES: Record<Variant, string> = {`,
    namesEntries,
    `}`,
    ``,
    `export function PrototypeSwitcher() {`,
    `  // Never render in production — safety net so this cannot accidentally ship`,
    `  if (process.env.NODE_ENV === 'production') return null`,
    ``,
    `  const router      = useRouter()`,
    `  const searchParams = useSearchParams()`,
    `  const current     = (searchParams.get('variant') ?? VARIANTS[0]) as Variant`,
    `  const idx         = VARIANTS.indexOf(current)`,
    ``,
    `  const go = useCallback((dir: 'prev' | 'next') => {`,
    `    const next = dir === 'next'`,
    `      ? VARIANTS[(idx + 1) % VARIANTS.length]`,
    `      : VARIANTS[(idx - 1 + VARIANTS.length) % VARIANTS.length]`,
    `    router.push('?variant=' + next)`,
    `  }, [idx, router])`,
    ``,
    `  // Arrow key navigation — skips when an input field is focused`,
    `  useEffect(() => {`,
    `    function onKey(e: KeyboardEvent) {`,
    `      const tag = (e.target as HTMLElement)?.tagName`,
    `      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return`,
    `      if (e.key === 'ArrowLeft')  go('prev')`,
    `      if (e.key === 'ArrowRight') go('next')`,
    `    }`,
    `    window.addEventListener('keydown', onKey)`,
    `    return () => window.removeEventListener('keydown', onKey)`,
    `  }, [go])`,
    ``,
    `  return (`,
    `    <div style={{`,
    `      position: 'fixed',`,
    `      bottom: 24,`,
    `      left: '50%',`,
    `      transform: 'translateX(-50%)',`,
    `      background: '#0f0f23',`,
    `      color: '#c9c9e0',`,
    `      border: '1px solid #2a2a4a',`,
    `      borderRadius: 8,`,
    `      padding: '8px 16px',`,
    `      display: 'flex',`,
    `      alignItems: 'center',`,
    `      gap: 12,`,
    `      fontFamily: 'monospace',`,
    `      fontSize: 13,`,
    `      zIndex: 9999,`,
    `      boxShadow: '0 4px 24px rgba(0,0,0,0.5)',`,
    `      userSelect: 'none',`,
    `      whiteSpace: 'nowrap',`,
    `    }}>`,
    `      <Btn onClick={() => go('prev')}>prev</Btn>`,
    `      <span>PROTOTYPE · {VARIANT_NAMES[current]}</span>`,
    `      <Btn onClick={() => go('next')}>next</Btn>`,
    `    </div>`,
    `  )`,
    `}`,
    ``,
    `function Btn({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {`,
    `  return (`,
    `    <button onClick={onClick} style={{`,
    `      background: 'transparent',`,
    `      border: '1px solid #3a3a5a',`,
    `      color: '#c9c9e0',`,
    `      borderRadius: 4,`,
    `      cursor: 'pointer',`,
    `      padding: '3px 10px',`,
    `      fontFamily: 'monospace',`,
    `      fontSize: 13,`,
    `    }}>`,
    `      {children}`,
    `    </button>`,
    `  )`,
    `}`,
  ].join('\n')
}

// ─── NOTE.md ──────────────────────────────────────────────────────────────────

function genNoteMd(letters?: string[]): string {
  const runSection = type === 'logic'
    ? [
        `    bun run prototype-${name}/run.ts`,
        ``,
        `Push the state through the scenarios that are hard to reason about on paper.`,
        `Each keypress dispatches an action and re-displays the full state.`,
      ].join('\n')
    : [
        `Mount the variant components + PrototypeSwitcher in an existing route.`,
        `See the HOW TO MOUNT comment at the top of each Variant file.`,
        ``,
        `Then navigate to that route with ?variant=a, or use the floating bar.`,
        `Arrow keys (left/right) also switch variants when no input is focused.`,
      ].join('\n')

  const filesSection = type === 'logic'
    ? [
        `| File       | What to fill in                                          |`,
        `|------------|----------------------------------------------------------|`,
        `| logic.ts   | State type, Action union, initialState, reducer cases    |`,
        `| run.ts     | Commands in the switch block to match your Action types  |`,
      ].join('\n')
    : [
        ...(letters ?? []).map(l =>
          `| Variant${l}.tsx | Fill in the layout for Variant ${l}                         |`
        ),
        `| Switcher.tsx | Adapt the router import (see comments at the top)        |`,
      ].join('\n')

  return [
    `# PROTOTYPE: ${name}`,
    ``,
    `> WARNING: This folder is throwaway. Delete it entirely when the question is answered.`,
    ``,
    `---`,
    ``,
    `## 1 — Write the question`,
    ``,
    `Do this before touching any code.`,
    ``,
    `> What question does this prototype answer?`,
    ``,
    `[Replace this line with your actual question]`,
    ``,
    `---`,
    ``,
    `## 2 — Fill in the files`,
    ``,
    filesSection,
    ``,
    `---`,
    ``,
    `## 3 — Run it`,
    ``,
    runSection,
    ``,
    `---`,
    ``,
    `## 4 — Write the answer`,
    ``,
    `> What did you learn? What decision did this prototype validate?`,
    ``,
    `[Replace this line with the answer]`,
    ``,
    `---`,
    ``,
    `## 5 — Delete this folder`,
    ``,
    `Once you have the answer:`,
    `  1. Apply validated decisions to the real codebase`,
    `  2. Delete: rm -rf prototype-${name}/`,
    ``,
    `The answer is the only thing worth keeping.`,
    `Put it in a commit message, a note, or a decision record — not in this folder.`,
  ].join('\n')
}

// ─── Generate ─────────────────────────────────────────────────────────────────

console.log(`\nScaffolding ${type} prototype → prototype-${name}/\n`)

mkdirSync(protoDir, { recursive: true })

if (type === 'logic') {

  write(join(protoDir, 'logic.ts'), genLogicTs())
  write(join(protoDir, 'run.ts'),   genRunTs())
  write(join(protoDir, 'NOTE.md'),  genNoteMd())

} else {

  const letters = LETTERS.slice(0, variantCount)
  for (const letter of letters) {
    write(join(protoDir, `Variant${letter}.tsx`), genVariantTsx(letter))
  }
  write(join(protoDir, 'Switcher.tsx'), genSwitcherTsx(letters))
  write(join(protoDir, 'NOTE.md'),      genNoteMd(letters))

}

// ─── Next steps ───────────────────────────────────────────────────────────────

console.log(`\n✅  prototype-${name}/ is ready.\n`)

if (type === 'logic') {
  console.log('Next steps:')
  console.log(`  1.  Open NOTE.md     — write the question before touching any code`)
  console.log(`  2.  Open logic.ts    — define State, Action, initialState, reducer`)
  console.log(`  3.  Open run.ts      — update the commands to match your Action types`)
  console.log(`  4.  Run it:          bun run prototype-${name}/run.ts`)
  console.log(`  5.  Push it through edge cases and watch the state after each action`)
  console.log(`  6.  Write the answer in NOTE.md, then delete the folder`)
} else {
  const letters = LETTERS.slice(0, variantCount)
  console.log('Next steps:')
  console.log(`  1.  Open NOTE.md          — write the question before touching any code`)
  for (const l of letters) {
    console.log(`  .   Open Variant${l}.tsx      — build a structurally different layout`)
  }
  console.log(`  .   Open Switcher.tsx     — adapt the router import (see comments at top)`)
  console.log(`  .   Mount variants + <PrototypeSwitcher /> in an existing route`)
  console.log(`  .   Navigate to ?variant=a and use the switcher or arrow keys to compare`)
  console.log(`  .   Write the answer in NOTE.md, then delete the folder`)
}

console.log('')
