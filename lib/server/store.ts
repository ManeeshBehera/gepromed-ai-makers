import { promises as fs } from "fs";
import path from "path";
import type {
  Registration,
  NewRegistration,
  LeadStatus,
} from "@/lib/types";

// File-backed shared store. Persists server-side so registrations are visible
// across devices/visitors (unlike per-browser storage). On ephemeral hosts the
// file resets on redeploy — acceptable for a demo, and re-seeded automatically.
const DATA_DIR = process.env.DATA_DIR || path.join(process.cwd(), ".data");
const FILE = path.join(DATA_DIR, "registrations.json");

let writeChain: Promise<unknown> = Promise.resolve();

async function ensureFile(): Promise<void> {
  try {
    await fs.access(FILE);
  } catch {
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.writeFile(FILE, JSON.stringify(seed(), null, 2), "utf8");
  }
}

async function readAll(): Promise<Registration[]> {
  await ensureFile();
  try {
    const raw = await fs.readFile(FILE, "utf8");
    return JSON.parse(raw) as Registration[];
  } catch {
    return [];
  }
}

async function writeAll(list: Registration[]): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(FILE, JSON.stringify(list, null, 2), "utf8");
}

// Serialize writes to avoid lost updates on concurrent requests.
function enqueue<T>(fn: () => Promise<T>): Promise<T> {
  const run = writeChain.then(fn, fn);
  writeChain = run.catch(() => {});
  return run;
}

export async function listRegistrations(): Promise<Registration[]> {
  const list = await readAll();
  return list.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function createRegistration(
  data: NewRegistration,
): Promise<Registration> {
  return enqueue(async () => {
    const list = await readAll();
    const reg: Registration = {
      ...data,
      id: `REG-${Date.now().toString(36).toUpperCase()}-${Math.floor(
        Math.random() * 1e3,
      )
        .toString(36)
        .toUpperCase()}`,
      createdAt: new Date().toISOString(),
      status: "lead",
      followUps: [],
    };
    await writeAll([reg, ...list]);
    return reg;
  });
}

export async function patchRegistration(
  id: string,
  patch: { status?: LeadStatus; followUp?: string },
): Promise<Registration | null> {
  return enqueue(async () => {
    const list = await readAll();
    const idx = list.findIndex((r) => r.id === id);
    if (idx === -1) return null;
    const current = list[idx];
    const updated: Registration = {
      ...current,
      status: patch.status ?? current.status,
      followUps: patch.followUp
        ? [
            { at: new Date().toISOString(), note: patch.followUp },
            ...current.followUps,
          ]
        : current.followUps,
    };
    list[idx] = updated;
    await writeAll(list);
    return updated;
  });
}

export async function deleteRegistration(id: string): Promise<boolean> {
  return enqueue(async () => {
    const list = await readAll();
    const next = list.filter((r) => r.id !== id);
    if (next.length === list.length) return false;
    await writeAll(next);
    return true;
  });
}

function seed(): Registration[] {
  const now = Date.now();
  return [
    {
      id: "REG-DEMO1",
      createdAt: new Date(now - 86400000 * 4).toISOString(),
      sessionSlug: "abord-vasculaire-peripherique-2026-09",
      sessionTitle: "Abord vasculaire périphérique — module avancé",
      firstName: "Camille",
      lastName: "Roux",
      email: "c.roux@chu-exemple.fr",
      phone: "+33 6 12 34 56 78",
      profession: "Chirurgien vasculaire",
      institution: "CHU Exemple",
      country: "France",
      dietary: "Sans gluten",
      arrival: "21/09 au soir",
      needsAccommodation: true,
      elearningAccess: true,
      notes: "Souhaite une facture au nom de l'établissement.",
      status: "contract_signed",
      followUps: [
        { at: new Date(now - 86400000 * 2).toISOString(), note: "Contrat reçu signé." },
        { at: new Date(now - 86400000 * 3).toISOString(), note: "Acompte confirmé." },
      ],
    },
    {
      id: "REG-DEMO2",
      createdAt: new Date(now - 86400000 * 2).toISOString(),
      sessionSlug: "endovasculaire-aortique-2027-02",
      sessionTitle: "Techniques endovasculaires aortiques",
      firstName: "Liam",
      lastName: "Schneider",
      email: "liam.schneider@example.de",
      phone: "+49 151 23456789",
      profession: "Chirurgien vasculaire",
      institution: "Universitätsklinikum",
      country: "Allemagne",
      dietary: "",
      arrival: "À confirmer",
      needsAccommodation: false,
      elearningAccess: false,
      notes: "Intéressé mais attend validation du chef de service.",
      status: "lead",
      followUps: [
        { at: new Date(now - 86400000).toISOString(), note: "Relance e-mail envoyée." },
      ],
    },
  ];
}
