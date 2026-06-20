#!/usr/bin/env python3
"""GEPROMED brand-voice linter for reformulated emails.

A deterministic safety net that flags brand-voice slips in a drafted email body:
hype words, emojis in formal mail, missing subject line, salesy CTAs, and
over-long sentences. It does NOT rewrite text — it reports, and the model owns
the final judgment.

Usage:
    python brand_voice_check.py --file draft.txt --lang fr
    echo "<draft>" | python brand_voice_check.py --lang en
Exit code 0 = PASS (no findings), 1 = findings reported.
"""
from __future__ import annotations

import argparse
import re
import sys
from dataclasses import dataclass

# Hype / anti-brand vocabulary (EN + FR), matched case-insensitively on word boundaries.
HYPE_TERMS = [
    "excited to announce", "thrilled", "world-class", "world class", "best-in-class",
    "best in class", "game-changer", "game changer", "cutting-edge", "cutting edge",
    "leading", "revolutionary", "amazing", "incredible", "don't miss", "act now",
    "ravi de vous annoncer", "incroyable", "révolutionnaire", "leader mondial",
    "le meilleur", "la meilleure", "unique en son genre", "réservez vite",
    "ne manquez pas", "à ne pas manquer", "exceptionnel",
]

# Salesy CTA patterns.
SALESY = ["don't miss out", "act now", "limited time", "réservez vite", "dépêchez-vous"]

EMOJI_RE = re.compile(
    "["
    "\U0001F300-\U0001FAFF"
    "\U00002600-\U000027BF"
    "\U0001F1E6-\U0001F1FF"
    "✀-➿"
    "]",
    flags=re.UNICODE,
)

MAX_SENTENCE_WORDS = 35


@dataclass
class Finding:
    severity: str   # "error" | "warn"
    message: str


def read_text(args: argparse.Namespace) -> str:
    if args.file:
        with open(args.file, "r", encoding="utf-8") as fh:
            return fh.read()
    return sys.stdin.read()


def find_terms(text: str, terms: list[str]) -> list[str]:
    low = text.lower()
    hits = []
    for term in terms:
        if re.search(r"\b" + re.escape(term) + r"\b", low):
            hits.append(term)
    return hits


def long_sentences(text: str) -> list[str]:
    # Naive sentence split on . ! ? and newlines.
    sentences = re.split(r"(?<=[.!?])\s+|\n+", text)
    flagged = []
    for s in sentences:
        words = [w for w in re.split(r"\s+", s.strip()) if w]
        if len(words) > MAX_SENTENCE_WORDS:
            flagged.append(f"{len(words)} words: \"{s.strip()[:70]}...\"")
    return flagged


def check(text: str) -> list[Finding]:
    findings: list[Finding] = []

    hype = find_terms(text, HYPE_TERMS)
    for term in hype:
        findings.append(Finding("error", f'Hype/anti-brand term: "{term}"'))

    salesy = find_terms(text, SALESY)
    for term in salesy:
        findings.append(Finding("error", f'Salesy CTA: "{term}"'))

    emojis = EMOJI_RE.findall(text)
    if emojis:
        findings.append(Finding("warn", f"Emoji(s) in formal mail: {' '.join(sorted(set(emojis)))}"))

    if not re.search(r"(?im)^\s*(subject|objet)\s*:", text):
        findings.append(Finding("warn", "No subject line detected (expected 'Subject:' / 'Objet :')."))

    for ls in long_sentences(text):
        findings.append(Finding("warn", f"Long sentence (>{MAX_SENTENCE_WORDS} words) — consider splitting: {ls}"))

    return findings


def main() -> int:
    parser = argparse.ArgumentParser(description="GEPROMED brand-voice linter for emails.")
    parser.add_argument("--file", help="Path to a text file. If omitted, reads stdin.")
    parser.add_argument("--lang", choices=["fr", "en"], default="en", help="Language hint (reporting only).")
    args = parser.parse_args()

    text = read_text(args)
    findings = check(text)

    if not findings:
        print("PASS — no brand-voice issues detected.")
        return 0

    errors = [f for f in findings if f.severity == "error"]
    warns = [f for f in findings if f.severity == "warn"]
    print(f"FINDINGS ({len(errors)} error, {len(warns)} warn):")
    for f in findings:
        tag = "✗" if f.severity == "error" else "•"
        print(f"  {tag} [{f.severity}] {f.message}")
    print("\nFix the errors before sending; review the warnings. The human still sends.")
    return 1


if __name__ == "__main__":
    raise SystemExit(main())
