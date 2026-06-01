# TDD — Test-Driven Development

Lock into vertical slice mode. One test → one implementation → repeat. Nothing moves forward until the current test is green.

## The Only Rule That Matters

```
RED   → write ONE failing test
GREEN → write MINIMAL code to pass it
REFACTOR → clean up, only while green
REPEAT
```

Never write the next test until the current one passes. Never refactor while red.

## What Makes a Good Test

- Tests **behavior**, not implementation — "user can add item to cart" not "addItem() returns updated array"
- Uses the **public interface only** — never tests private methods or internal state
- **Survives a refactor** — if renaming an internal function breaks the test, the test was wrong
- Reads like a **specification** — someone new should understand what the system does just from reading tests

## The Anti-Pattern to Avoid

**Horizontal slicing** — writing all tests first, then all implementation:

```
❌ WRONG:  test1, test2, test3, test4 → impl1, impl2, impl3, impl4
✅ RIGHT:  test1 → impl1 → test2 → impl2 → test3 → impl3
```

Horizontal slicing produces tests that check imagined behavior rather than real behavior. You outrun your own understanding.

## Before Writing Any Code

Ask me:

- [ ] What should the public interface look like?
- [ ] Which behavior is most critical to test first?
- [ ] Which edge cases matter most to cover?

Get my answers, then write one test for the most important behavior. Watch it fail. Then write the minimum code to make it pass.

## Checklist Per Cycle

```
[ ] Test describes behavior, not implementation
[ ] Test uses public interface only
[ ] This test would survive an internal refactor
[ ] Code is minimal — only what this test needs
[ ] No features added that aren't tested yet
```
