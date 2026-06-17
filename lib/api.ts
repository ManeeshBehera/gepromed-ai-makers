"use client";

import type { Registration, NewRegistration, LeadStatus } from "./types";

export async function fetchRegistrations(): Promise<Registration[]> {
  const res = await fetch("/api/registrations", { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to load registrations");
  return res.json();
}

export async function postRegistration(
  data: NewRegistration,
): Promise<Registration> {
  const res = await fetch("/api/registrations", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const e = await res.json().catch(() => ({}));
    throw new Error(e.error || "Failed to submit registration");
  }
  return res.json();
}

export async function patchRegistration(
  id: string,
  patch: { status?: LeadStatus; followUp?: string },
): Promise<Registration> {
  const res = await fetch(`/api/registrations/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(patch),
  });
  if (!res.ok) throw new Error("Failed to update");
  return res.json();
}

export async function deleteRegistration(id: string): Promise<void> {
  const res = await fetch(`/api/registrations/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete");
}
