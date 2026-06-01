# Logic Prototype

> **The Scaffold tool should already have been run before reaching this workflow.**
> If not, run it now:
> ```bash
> bun run $MAI_DIR/skills/Prototype/Tools/Scaffold.ts --type logic --name <name>
> ```
> This creates `logic.ts`, `run.ts`, and `NOTE.md`. The steps below guide filling them in.

---

Build a tiny interactive terminal app to test whether logic, a state machine, or a data model behaves correctly.

## The Question

Before writing a single line of code, state the question explicitly:

> "Does [this state machine / this function / this data model] correctly handle [these specific scenarios]?"

If you can't write that sentence, stop and figure it out first. A logic prototype that answers the wrong question is pure waste.

## Structure

Separate concerns into exactly two layers:

**Layer 1 — Pure logic module**
- A reducer, state machine, or set of pure functions
- No I/O, no side effects, no terminal code
- Portable — could be copied into real production code
- This is where the actual question lives

**Layer 2 — Throwaway terminal interface (TUI)**
- Imports Layer 1 and calls into it
- Nothing flows the other direction
- Handles user input and displays output
- Gets deleted when the prototype is done

## Implementation Steps

### 1. State the question
Write it as a comment at the top of the file:
```
// PROTOTYPE — Question: Does the cart state handle concurrent removals?
// Delete when answered.
```

### 2. Choose the language / runtime
Default to the project's existing language. For this MAI system, `bun` is preferred:
```bash
bun run prototype-cart.ts
```

### 3. Build the pure logic module first
Example structure:
```typescript
// logic.ts — PROTOTYPE, throwaway
type State = { ... }
type Action = { type: string; payload?: any }

function reducer(state: State, action: Action): State {
  // pure logic here
}

export { reducer, type State, type Action }
```

### 4. Build the minimal TUI
```typescript
// prototype-cart.ts — PROTOTYPE, throwaway
import { reducer } from './logic.ts'
import * as readline from 'readline'

let state = initialState

const rl = readline.createInterface({ input: process.stdin, output: process.stdout })

function display(state: State) {
  console.clear()
  console.log('=== STATE ===')
  console.log(JSON.stringify(state, null, 2))
  console.log('\nCommands: [a]dd [r]emove [c]lear [q]uit')
}

rl.on('line', (input) => {
  // dispatch action based on input
  state = reducer(state, { type: input.trim() })
  display(state)
})

display(state)
```

### 5. Make it runnable in one command
```bash
bun run prototype-cart.ts
```
Document this command in a comment at the top of the file.

### 6. Push it through the hard cases
Run the exact scenarios that are hard to reason about on paper:
- The edge cases that motivated the prototype
- Concurrent or rapid actions
- Error states and recovery
- Unexpected input sequences

## Anti-Patterns to Avoid

| Wrong | Right |
|-------|-------|
| Mixing UI code into the logic module | Keep logic and TUI in separate files |
| Adding test suites to the prototype | No tests — it's throwaway |
| Connecting to production databases | Memory only (or scratch file) |
| Over-engineering for future scenarios | Answer the specific question, then stop |
| Leaving it in the codebase | Delete it when you have the answer |

## When Done

1. **State the answer** — write it in a comment, commit message, or decision note
2. **Capture what you learned** — anything surprising about how the logic behaved
3. **Delete the prototype files** — both `logic.ts` and the TUI file
4. **Apply validated decisions** to the real implementation
