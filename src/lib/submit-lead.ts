/**
 * Shared client helper — same endpoint as the homepage contact form
 * and landing lead forms: POST /api/leads → Neon leads table.
 */
export type LeadPayload = {
  name: string;
  phone: string;
  email?: string;
  message: string;
};

export type LeadSubmitResult =
  | { ok: true; id?: number }
  | { ok: false; error: string };

export async function submitLead(
  input: LeadPayload,
): Promise<LeadSubmitResult> {
  const name = input.name.trim();
  const phone = input.phone.trim();
  const email = (input.email ?? "").trim();
  const message = input.message.trim();

  if (!name || !phone || !message) {
    return { ok: false, error: "נא למלא שם, טלפון והודעה" };
  }

  try {
    const res = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, phone, email, message }),
    });
    const payload = (await res.json()) as { error?: string; id?: number };
    if (!res.ok) {
      return { ok: false, error: payload.error || "שליחה נכשלה. נסו שוב." };
    }
    return { ok: true, id: payload.id };
  } catch {
    return { ok: false, error: "שגיאת רשת. נסו שוב." };
  }
}
