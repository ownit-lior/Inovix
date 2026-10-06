import { getDb } from "@/lib/db";

export type Lead = {
  id: number;
  name: string;
  phone: string;
  email: string;
  message: string;
  created_at: string;
};

export async function ensureLeadsTable() {
  const sql = getDb();
  await sql`
    CREATE TABLE IF NOT EXISTS leads (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      phone TEXT NOT NULL,
      email TEXT NOT NULL,
      message TEXT NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;
}

export async function insertLead(input: {
  name: string;
  phone: string;
  email: string;
  message: string;
}) {
  const sql = getDb();
  await ensureLeadsTable();
  const rows = await sql`
    INSERT INTO leads (name, phone, email, message)
    VALUES (${input.name}, ${input.phone}, ${input.email}, ${input.message})
    RETURNING id, name, phone, email, message, created_at
  `;
  return rows[0] as Lead;
}

export async function listLeads(limit = 100) {
  const sql = getDb();
  await ensureLeadsTable();
  const rows = await sql`
    SELECT id, name, phone, email, message, created_at
    FROM leads
    ORDER BY created_at DESC
    LIMIT ${limit}
  `;
  return rows as Lead[];
}
