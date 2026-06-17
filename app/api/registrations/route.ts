import { NextResponse } from "next/server";
import { listRegistrations, createRegistration } from "@/lib/server/store";
import type { NewRegistration } from "@/lib/types";

export const dynamic = "force-dynamic";

export async function GET() {
  const list = await listRegistrations();
  return NextResponse.json(list);
}

export async function POST(req: Request) {
  let body: Partial<NewRegistration>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const required: (keyof NewRegistration)[] = [
    "sessionSlug",
    "sessionTitle",
    "firstName",
    "lastName",
    "email",
  ];
  for (const key of required) {
    if (!body[key] || String(body[key]).trim() === "") {
      return NextResponse.json(
        { error: `Missing field: ${key}` },
        { status: 400 },
      );
    }
  }

  const reg = await createRegistration({
    sessionSlug: String(body.sessionSlug),
    sessionTitle: String(body.sessionTitle),
    firstName: String(body.firstName),
    lastName: String(body.lastName),
    email: String(body.email),
    phone: String(body.phone ?? ""),
    profession: String(body.profession ?? ""),
    institution: String(body.institution ?? ""),
    country: String(body.country ?? ""),
    dietary: String(body.dietary ?? ""),
    arrival: String(body.arrival ?? ""),
    needsAccommodation: Boolean(body.needsAccommodation),
    elearningAccess: Boolean(body.elearningAccess),
    notes: String(body.notes ?? ""),
  });

  return NextResponse.json(reg, { status: 201 });
}
