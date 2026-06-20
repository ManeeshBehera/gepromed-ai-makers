# Gepromed — Add-in Skills

Self-contained, uploadable AI skills derived from the Gepromed Quick Wins
("Deliverable as skills"). Each skill is **stateless**, has **no integrations**
(no Brevo / LMS / payment / OneDrive / Jira / machine sync), produces a
document / draft / analysis on demand, and ends with **a human validating
before anything is published or sent**.

Every skill embeds the [Gepromed brand kit](../brand/) guardrails and is
**bilingual (FR/EN)** — it answers in the user's language or follows an explicit
language request.

## How to install

| Platform | Mechanism | How |
|---|---|---|
| **Claude** | Skills | Upload the skill folder (with `SKILL.md`) at claude.ai → Settings → Capabilities → Skills (or via the API/Agent SDK). |
| **ChatGPT** | Custom GPT | New GPT → paste `instructions-portable.md` into *Instructions*; optionally attach `../brand/` files as Knowledge. |
| **Gemini** | Gem | New Gem → paste `instructions-portable.md` into the instructions; attach brand files as knowledge. |

## Package anatomy (gold standard)

Each skill is a **self-contained, brand-loaded, self-improving package** — not a
thin prompt. Every skill is a **company asset**: it writes in one consistent
GEPROMED house voice for any team member (not a personal tool).

```
<skill-name>/
├── SKILL.md                 # Claude Agent Skill: trigger-rich description, routing logic,
│                            #   memory protocol, workflow, output spec, brand constants
├── agents/openai.yaml       # cross-platform manifest (ChatGPT/Gemini display + examples)
├── references/              # bundled knowledge: scoped brand guidelines, voice & tone,
│                            #   recipient playbook, FR↔EN glossary, type templates,
│                            #   worked FR/EN examples, 100-pt QA rubric
├── memory/MEMORY.md         # self-updating house-style memory: loaded first, appended
│                            #   to as the team corrects it — converges toward correct
├── assets/                  # real brand assets (logo, fonts, base templates, signatures)
├── scripts/                 # deterministic helpers: brand-voice lint, memory updater,
│                            #   artifact generators (for script-backed skills)
└── instructions-portable.md # paste-able build + knowledge-upload steps for ChatGPT/Gemini
```

Skills are self-contained on upload (each bundles its **own** brand reference;
the repo-root `/brand` kit is the master source, mirrored per skill). Each skill
**self-scores ≥95/100** against its QA rubric before returning output, and
**learns over time** via its memory file.

## The 16 skills

Status: ✅ built · ⬜ specced (build pending). Need #s reference `GEPROMED_Besoins_IA.xlsx`.

### Document & template generation
| # | Skill | Needs | Dept | Priority | Validator | Status |
|---|---|---|---|---|---|---|
| 1 | Qualiopi training program generator | #9 | ED | High | Qualiopi/RQ | ⬜ |
| 2 | Training admin doc pack (badges, attendance, RGPD notices) | #10 | ED | Medium | DPO | ⬜ |
| 3 | Branded template library | #7 | All | High | — | ⬜ |
| 4 | E-learning module structurer | #25 | ED | High | — | ⬜ |

### Communication & content
| # | Skill | Needs | Dept | Priority | Validator | Status |
|---|---|---|---|---|---|---|
| 5 | LinkedIn post drafter + format validator | #1, #8 | AE/All | High | Juliette+Nicole | ⬜ |
| 6 | Editorial / publication calendar builder | #2 | AE | — | — | ⬜ |
| 7 | Infographic & technical-figure spec generator | #3, #15 | AE/PT | Low | — | ⬜ |
| 8 | **Email reformulation / professional tone** | #4, #14, #27, #36 | All | Daily | sender | ✅ gold standard |
| 9 | Website content generator (Ibexa-ready) | #24 | All | High | Nicole | ⬜ |
| 10 | Scientific writing & bibliography summarizer | #5, #26, #28 | AE/R&D | — | author | ⬜ |

### Prospecting (drafting only, not a CRM)
| # | Skill | Needs | Dept | Priority | Validator | Status |
|---|---|---|---|---|---|---|
| 11 | Prospect research + outreach drafter | #6, #16 | AE/PT | High | sender | ⬜ |

### Data analysis
| # | Skill | Needs | Dept | Priority | Validator | Status |
|---|---|---|---|---|---|---|
| 12 | Stats & publication-chart skill | #19, #20 | PT/R&D | Low | scientific | ⬜ |

### Compliance & quality drafting
| # | Skill | Needs | Dept | Priority | Validator | Status |
|---|---|---|---|---|---|---|
| 13 | RGPD document drafter / reviewer | #22 | All | Medium | DPO | ⬜ |
| 14 | ISO gap analysis + ISO 9001 update summaries | #38, #39 | Qualité | Medium | RQ | ⬜ |
| 15 | Management-review deck + auto meeting-minutes | #40, #41 | Qualité | Medium | RQ | ⬜ |
| 16 | HR drafting (offers, internal regulations, HR legal Q&A) | #43, #44 | RH | Medium | RAF | ⬜ |

**Build order:** Email reformulation is the ✅ **gold-standard exemplar** — all
other skills are built to this exact bar. Next per the recommended first batch:
Branded template generator → LinkedIn + editorial calendar.

## Out of scope (section 2 — not skills)

Stateful / integrated needs are intentionally excluded: Vascular Supervisors
Network, registration/lead tracking, quote-to-invoice & treasury anomaly
detection, expense receipt auto-filing to OneDrive (#47), Satellite/Jira
(#21, #30-33), machine connectivity/calibration (#17), Blockwise/MTS parser
(#12), fiscal receipts auto-send (#48), DUERP/expiry tracking (#45), standards
watch (#18, #37). These need a product/integration/persistent state.
