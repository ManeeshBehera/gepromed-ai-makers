# Gepromed — Website Demo (redesign & rebranding)

A demo of a restructured, rebranded **Gepromed** website with an **enhanced training
registration** workflow. Built with **Next.js (App Router) + TypeScript + Tailwind CSS**.
Bilingual **FR / EN**. No AI.

## What's inside

- **Rebranded marketing site** — home with storytelling + real Gepromed KPIs, specialties,
  About / mission / Qualiopi & quality, contact (with the real Strasbourg addresses).
- **Trainings** — catalogue with **upcoming vs past** sessions, specialty filters, capacity
  ("spots left"), and **proof** on past sessions (satisfaction %, pass rate, photos).
- **Enhanced registration** — captures an interested person as a **lead before payment**,
  with pre-training **logistics** (dietary, arrival, accommodation, e-learning access).
- **Organizer space (dashboard)** — shared pipeline of every request:
  `lead → deposit paid → contract signed → confirmed`, with follow-up notes. This is the
  capability Nicole flagged as missing today.
- **Shared server store** — registrations persist server-side via a small JSON-backed store
  and a REST API (`/api/registrations`), so leads are visible across devices/visitors.

## Run locally

```bash
npm install
npm run dev      # http://localhost:3000
```

```bash
npm run build && npm run start   # production
```

## Deploy on Render

This repo includes a `render.yaml` blueprint (Web Service, Node runtime).

1. Push the branch (already done).
2. In Render: **New + → Blueprint**, connect this repository, pick the branch.
3. Render runs `npm install && npm run build` then `npm run start`.

Manual setup (without the blueprint): **New + → Web Service**, Build `npm install && npm run build`,
Start `npm run start`, Node 22.

> On Render's free plan the filesystem is ephemeral, so the demo registration data resets on
> redeploy and re-seeds automatically. For durable storage, point `DATA_DIR` at a Render Persistent
> Disk or swap the store in `lib/server/store.ts` for a database.

## Brand colors

The palette is an **approximation** of gepromed.com (medical azure blue + orange-style accent),
centralized in `tailwind.config.ts` (`brand` scale + `accent`). Swap in the exact brand hex there
in one place.

## Project structure

```
app/
  page.tsx               Home
  trainings/             Catalogue + [slug] detail
  register/              Registration flow (Suspense → RegisterFlow)
  dashboard/             Organizer pipeline
  about/  contact/
  api/registrations/     REST API (GET/POST, PATCH/DELETE by id)
components/               Header, Footer, cards, views, RegisterFlow
lib/
  i18n.tsx               FR/EN provider + dictionary
  trainings.ts           Bilingual session data + helpers
  types.ts               Registration + lead-status model
  api.ts                 Client fetch helpers
  server/store.ts        File-backed shared store
```
