# Gepromed Brand Kit (for AI skills)

Portable brand assets that every Gepromed Quick Win skill can embed so output
stays on-brand and passes the human-validation gate.

## Files

| File | Use |
|---|---|
| `gepromed-brand-dna.md` | Canonical source of truth — full brand DNA + logo DNA. Read once; align everything to it. |
| `style-guide-block.md` | Short, self-contained block to paste into each skill's prompt/header. |
| `voice-checklist.md` | Tone/voice + compliance self-check each skill runs before "done". |
| `tokens.json` | Official color tokens (machine-readable) for any skill that produces visuals. |
| `tokens.css` | Same tokens as CSS custom properties for web/design output. |

## Core brand codes

- **Gepromed Blue `#007AC2`** — master color (carries the brand).
- **Gepromed Orange `#EC6C17`** — accent only, ~5-10% (the "O" motif, safety markers, key numbers, CTAs).

## How a skill embeds this

1. Paste the contents of `style-guide-block.md` into the skill's system prompt.
2. Add `voice-checklist.md` as the skill's final self-check / human-review gate.
3. For visual output, pull colors from `tokens.json` / `tokens.css`.

## Note for the website

The Next.js site (`tailwind.config.ts`) currently uses **approximated** brand
colors (`brand-500 #2575c4`, `accent #f59e42`). The canonical codes are
`#007AC2` / `#EC6C17`. Align the Tailwind palette to these when ready (separate
task — not changed here to avoid unintended visual shifts).
