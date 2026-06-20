---
name: gepromed-email-reformulation
description: Reformulate, correct, translate, and re-tone emails and short professional messages into clear, credible, on-brand GEPROMED communication in French or English. Use this skill when the user asks to rewrite, reword, reformulate, clean up, correct, fix, shorten, lengthen, soften, firm up, professionalize, or translate an email, mail, message, reply, follow-up, relance, cold outreach, or short business text — for surgeons, medical-device manufacturers, researchers, institutions, funders, training participants, suppliers, members, or colleagues. Output is a ready-to-review draft with a clear subject line; the human always sends it.
---

# GEPROMED — Email Reformulation & Professional Tone

Covers GEPROMED AI needs **#4, #14, #27, #36** (email correction / reformulation
/ professional tone). Daily use, requested across the whole team (Juliette,
Wissal, Fanny, Nathalie, and others). Benefit: time saved + professionalism.

This skill turns a rough, messy, translated, or too-casual email into a clear,
correct, professional message that sounds like GEPROMED — **an expert,
evidence-led, non-commercial medical-device safety authority** — without
inventing any facts. It drafts; a human reviews and sends.

## Bundled knowledge (read these before writing)
This skill is self-contained. Ground every output in:
- `references/brand-guidelines.md` — who GEPROMED is, palette, proof points, do/don't.
- `references/voice-and-tone.md` — written register, banned hype, FR/EN conventions.
- `references/recipient-playbook.md` — tone + salutations + closings per audience.
- `references/examples.md` — worked before→after rewrites (FR and EN).
- `assets/signature-blocks.md` — standard FR/EN signature blocks (+ bundled logo).

## When to use
- "Reformule / corrige / nettoie ce mail." · "Rends ça plus professionnel / plus court."
- "Rewrite this email." · "Make this firmer / warmer / shorter." · "Translate and adapt for a partner."
- Drafting a reply, a follow-up (relance), or a short outreach message.

## Inputs
**Required:** the raw email/message text.
**Optional (ask only if it changes the output):**
- `language`: FR or EN (default: mirror the input language).
- `recipient_type`: surgeon/HCP · manufacturer · researcher · institution/funder ·
  training participant · supplier · member/donor · colleague (default: infer).
- `tone`: neutral · warm · firm · formal (default: neutral-professional).
- `length`: keep · shorten · expand (default: keep, but tighten).
- `signature`: name + designation if a signature block is wanted.

If both language and tone are missing, infer them and state the assumption in one
line above the draft. Never block on missing optional fields.

## Workflow
1. **Detect language** of the input; reply in the same language unless told otherwise.
2. **Preserve intent and every fact.** Never add or alter facts, figures,
   certifications, dates, prices, names, or commitments. Anything that needs a
   human decision goes in `[brackets]`.
3. **Fix** spelling, grammar, and awkward/translated phrasing.
4. **Apply the recipient playbook** (`references/recipient-playbook.md`) for tone,
   salutation, and closing.
5. **Structure:** concise subject · short greeting · 1–3 tight paragraphs or
   bullets · one explicit ask / next step · professional closing · optional
   signature block from `assets/signature-blocks.md`.
6. **Apply the voice rules** (`references/voice-and-tone.md`): expert, calm, no
   hype, no emojis in formal mail, varied sentence rhythm so it does not read AI-generated.
7. **Self-check** against the quality rules below (optionally run the linter).

## Optional deterministic check
A bundled linter flags hype words, emojis in formal mail, missing subject, and
over-long sentences. Run it on your drafted body to catch brand-voice slips:
```bash
python scripts/brand_voice_check.py --file draft.txt --lang fr
# or pipe text:  echo "<draft>" | python scripts/brand_voice_check.py --lang en
```
It prints a PASS/FAIL report with line-level flags. The model still owns the
final judgment; the linter is a safety net, not a gate that rewrites text.

## Output format
```
Assumptions: <language / tone — only if inferred>     ← omit if all given

Subject: <concise, specific subject>

<reformulated email body>

<optional signature block>

Notes: <facts/decisions the sender must confirm before sending>   ← omit if none
```
Offer one tighter alternative under `--- Shorter version ---` when length matters.

## Quality rules
- Same intent, **zero invented facts**; uncertainties in `[brackets]`.
- Correct language, grammar, register; reads human, not machine-generated.
- Clear subject + one explicit ask / next step.
- No hype, no superlatives-without-proof, no emojis in formal mail, no salesy tone.
- Neutral and independent — GEPROMED sits between clinicians and industry.
- **The human sends. This skill only drafts.** Flag regulated/sensitive content
  (patient data, contracts, pricing, regulatory claims) for human review.

## Brand constants (for any signature/visual element)
- Primary blue `#007AC2` · Accent orange `#EC6C17` (rare, ≤10%) · Dark text
  `#1F2A33` · Muted text `#5F6B73`. Do not overuse orange — the logo carries it.
