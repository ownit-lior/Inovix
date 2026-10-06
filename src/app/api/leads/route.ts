import { NextResponse } from "next/server";
import { insertLead } from "@/lib/leads";

export const runtime = "nodejs";

function clean(value: unknown, max: number) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, unknown>;
    const name = clean(body.name, 120);
    const phone = clean(body.phone, 40);
    const email = clean(body.email, 160);
    const message = clean(body.message, 4000);

    if (!name || !phone || !message) {
      return NextResponse.json(
        { error: "נא למלא שם, טלפון והודעה" },
        { status: 400 },
      );
    }

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "אימייל לא תקין" }, { status: 400 });
    }

    if (!process.env.DATABASE_URL) {
      return NextResponse.json(
        { error: "מסד הנתונים עדיין לא הוגדר" },
        { status: 503 },
      );
    }

    const lead = await insertLead({
      name,
      phone,
      email: email || "no-email@inovix.co.il",
      message,
    });
    return NextResponse.json({ ok: true, id: lead.id });
  } catch (error) {
    console.error("leads POST failed", error);
    return NextResponse.json(
      { error: "שגיאה בשמירת הפנייה. נסו שוב." },
      { status: 500 },
    );
  }
}
