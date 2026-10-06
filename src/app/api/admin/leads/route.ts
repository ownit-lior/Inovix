import { NextResponse } from "next/server";
import { listLeads } from "@/lib/leads";

export const runtime = "nodejs";

function authorized(request: Request) {
  const secret = process.env.LEADS_ADMIN_SECRET;
  if (!secret) return false;
  const header = request.headers.get("authorization") ?? "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : "";
  return token === secret;
}

export async function GET(request: Request) {
  if (!authorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!process.env.DATABASE_URL) {
    return NextResponse.json(
      { error: "DATABASE_URL is not configured" },
      { status: 503 },
    );
  }

  try {
    const leads = await listLeads(200);
    return NextResponse.json({ leads });
  } catch (error) {
    console.error("admin leads GET failed", error);
    return NextResponse.json({ error: "Failed to load leads" }, { status: 500 });
  }
}
