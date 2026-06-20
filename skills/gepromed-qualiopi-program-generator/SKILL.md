---
name: gepromed-qualiopi-program-generator
description: Generate a Qualiopi-compliant GEPROMED training PROGRAM as a brand-styled Word (.docx) document, in French or English. A company-wide GEPROMED asset that produces the official "programme de formation" / "fiche programme" with every Référentiel National Qualité (RNQ / Qualiopi) block — intitulé, public visé, prérequis, objectifs pédagogiques (operational, assessable), contenu, durée, modalités pédagogiques (présentiel / distanciel / mixte / simulation), modalités d'évaluation, accessibilité handicap, délais d'accès, tarifs, inscription. Use when asked to create, write, draft, build, or update a training program, programme de formation, fiche programme, syllabus, course outline, or Qualiopi document for surgeons, clinicians, researchers, or other healthcare professionals. The document is blue-headed and logo-stamped per the GEPROMED charte. Output is a draft .docx — the Responsable Qualité (RQ) validates before publication; the skill never invents prices, dates, rates, or certifications. Loads and updates a memory file to get closer to GEPROMED program standards with every use.
---

# GEPROMED — Qualiopi Training Program Generator

Covers GEPROMED AI **need #9** (Qualiopi-compliant training program generation).
Used by the training/education team and the Responsable Qualité.

This is a **company asset**, not a personal tool. It always produces one
consistent **GEPROMED house program** — clinical, precise, RNQ-compliant,
non-promotional — no matter which team member runs it. It turns a course brief
into a complete, brand-styled `.docx` program **without inventing facts**. It
drafts; the **RQ validates** before the program is published.

## Operating principles
1. **Company voice, not individual voice.** The program represents GEPROMED the
   certified organisme de formation. Tone is institutional and non-commercial.
2. **Draft / artifact only.** The skill produces a `.docx` working document. The
   **Responsable Qualité (RQ)** validates compliance before publication.
3. **Memory-driven.** Load `memory/MEMORY.md` first; apply everything in it;
   update it when you learn something durable (see Memory protocol).
4. **Self-scoring.** Score the program against `references/qa-rubric.md`; if below
   95/100, revise before returning.
5. **Zero invention.** Never add prices, dates, success/satisfaction rates,
   certificate numbers, names, or commitments. Unknowns go in `[crochets]` for
   the RQ.

## Bundled knowledge — load in this order
This skill is self-contained. Before generating, read:
1. `memory/MEMORY.md` — learned house style, glossary, recurring programs, corrections. **Highest priority after explicit user instructions.**
2. `references/brand-guidelines.md` — who GEPROMED is, palette, proof points, do/don't.
3. `references/qualiopi-checklist.md` — the RNQ block-by-block requirements (the domain core).
4. `references/intake-questions.md` — the FULL-tier batched intake set + defaults.
5. `references/examples.md` — worked FR/EN programs + anti-patterns.
6. `references/qa-rubric.md` — the 100-point scoring rubric.
7. `assets/gepromed-logo.png` — bundled logo stamped into the header.

**Priority order when sources conflict:** explicit user instruction > `MEMORY.md`
> references/brand. Newer beats older; note the change in the memory correction log.

## Memory protocol (makes the skill self-improving)
- **Load:** At the start of every task, read `memory/MEMORY.md` and apply all
  stored preferences silently.
- **Detect a learning** when the team member: (a) corrects a generated block,
  (b) states a durable preference ("our objectives always…", "we never write…",
  "default duration is…"), (c) gives recurring program/audience context, or
  (d) repeats the same fix twice.
- **Apply now**, then **record it**:
  - In a file-writing environment (Claude Code / agent sandbox), run:
    ```bash
    python scripts/memory_update.py --section "House-style decisions" \
      --entry "BOTH: default satisfaction survey is sent à froid at 4 weeks."
    ```
    The script appends a dated, de-duplicated entry under the right section.
  - In a non-writing environment (ChatGPT GPT / Gemini Gem), emit a block:
    ```
    📝 MEMORY UPDATE → memory/MEMORY.md  [section: House-style decisions]
    - BOTH: default satisfaction survey is sent à froid at 4 weeks.
    ```
    and tell the team member to paste it back into the knowledge file.
- **Confirm** in one short line ("Noted for next time: …").
- **Conflict:** a new instruction overrides memory; log it under "Correction log".
- **Never** store secrets, certificate numbers, prices, or one-off session facts.

## When to use
- "Crée / rédige un programme de formation Qualiopi pour [action]."
- "Build a Qualiopi training programme / fiche programme / syllabus for [course]."
- "Mets à jour le programme du Bootcamp Vasculaire." · "Add the assessment block."
- Whenever a compliant, brand-styled `.docx` program is needed for an action.

## Inputs
**Required (gathered via intake):** the action's topic, public visé, prérequis,
objectifs, durée, modalités pédagogiques, modalités d'évaluation, délais d'accès,
tarifs, inscription. **Always auto-added:** accessibilité handicap (process),
sanction (attestation). **Optional:** `reference`, `version`, `date`, `moyens`,
`contact`, `indicateurs` (only if real). `language` (FR/EN, default FR).

## Clarification protocol (ask before half-baked output)
**Intake tier: FULL.** Run a structured intake before generating; the exact set is
in `references/intake-questions.md`. Follow the company standard (`skills/CONVENTIONS.md`):
- Ask **one batched round of ≤5** numbered questions, each with a **default** or
  2–3 options. Skip anything the user already gave or `MEMORY.md` answers.
- Always offer: *"Reply `go` and I'll proceed with the defaults above."*
- **Cap: 2 rounds.** Then generate with clearly bracketed placeholders for any
  RNQ-required block still missing, flagged for the RQ. Never stall.
- Accessibilité handicap is never asked — it is always inserted as the standard
  GEPROMED process paragraph.

## Routing logic / workflow
1. Load memory + references (`qualiopi-checklist.md` is the domain core).
2. Detect language (FR default). Run the FULL-tier intake unless the brief is
   already complete or the user says `go`.
3. Map each answer to its RNQ block; draft assessable objectives (action verbs);
   align the evaluation block to the objectives.
4. Apply safe GEPROMED defaults (accessibilité, sanction); bracket every unknown
   price/date/rate for the RQ.
5. Assemble the program JSON; run the generator to produce the `.docx`.
6. Self-score with the QA rubric; if < 95, revise (most often: objectives not
   assessable, or evaluation not mapped to objectives).
7. Detect any memory learnings; apply + record + confirm.
8. Return the output format + the path to the generated `.docx`.

## Deterministic helpers
```bash
# Show the program JSON schema the generator expects
python scripts/generate_program_docx.py --print-schema

# Render a program from a JSON brief into a brand-styled .docx
python scripts/generate_program_docx.py --in program.json --out program.docx

# Render the bundled FR demo (sanity check the styling end-to-end)
python scripts/generate_program_docx.py --demo --out demo.docx

# Append a learned preference to memory
python scripts/memory_update.py --section "House-style decisions" \
  --entry "BOTH: default duration for the vascular bootcamp is 14 h over 2 days."
```
The model writes `program.json` from the validated intake (keys per the schema),
then calls the generator. Lists render as bullets; empty required blocks render a
bracketed placeholder so the gap is visible to the RQ.

## Output format
```
Assumptions: <language / format / defaults applied — only if inferred>   ← omit if all given

Program: <intitulé>
File: <path/to/program.docx>

Summary of RNQ blocks rendered:
- <one line per block, noting any [bracketed] value the RQ must confirm>

Notes: <facts/decisions the RQ must validate before publication>   ← omit if none
QA: <score>/100                                                    ← internal check, keep ≥95
Noted for next time: <one line>                                    ← only if memory updated
```

## Quality rules (non-negotiable)
- Every RNQ-required block present (value or bracket); **zero invented** prices,
  dates, rates, certifications.
- Objectives are **operational and assessable** (action verbs); the evaluation
  block **maps to the objectives**.
- Accessibilité handicap is always a **process** (référent handicap, case-by-case).
- Prérequis never blank ("Aucun prérequis" if none).
- No hype/superlatives in the intitulé or content; institutional, non-commercial.
- Correct, native FR or EN with accurate RNQ terminology.
- **The RQ validates before publication. This skill only drafts the document.**

## Brand constants (visual elements)
Primary blue `#007AC2` (headings, rules) · Accent orange `#EC6C17` (rare, ≤10% —
the "Programme de formation" tag and key markers only) · Dark text `#1F2A33` ·
Muted text `#5F6B73`. The bundled logo (`assets/gepromed-logo.png`) carries the
orange; do not overuse it. Footer flags the document as a working draft for the RQ.
