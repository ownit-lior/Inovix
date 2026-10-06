"use client";

import { FormEvent, useState } from "react";

type Lead = {
  id: number;
  name: string;
  phone: string;
  email: string;
  message: string;
  created_at: string;
};

export default function AdminLeadsPage() {
  const [secret, setSecret] = useState("");
  const [leads, setLeads] = useState<Lead[] | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const load = async (e?: FormEvent) => {
    e?.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/leads", {
        headers: { Authorization: `Bearer ${secret}` },
      });
      const data = (await res.json()) as { leads?: Lead[]; error?: string };
      if (!res.ok) {
        setError(data.error || "הכניסה נכשלה");
        setLeads(null);
        return;
      }
      setLeads(data.leads ?? []);
    } catch {
      setError("שגיאת רשת");
      setLeads(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      id="main-content"
      className="mx-auto min-h-screen max-w-3xl px-4 py-10 text-[var(--ink)]"
    >
      <h1 className="text-2xl font-extrabold">פניות מהאתר</h1>
      <p className="mt-2 text-sm text-[var(--muted)]">
        הזינו את סיסמת הניהול כדי לראות את הפניות שנשמרו במסד הנתונים.
      </p>

      <form onSubmit={load} className="mt-6 flex flex-col gap-3 sm:flex-row">
        <input
          type="password"
          value={secret}
          onChange={(e) => setSecret(e.target.value)}
          placeholder="סיסמת ניהול"
          className="min-h-11 flex-1 rounded-xl border border-slate-200 px-3"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="brand-gradient-bg min-h-11 rounded-full px-5 text-sm font-bold text-[var(--navy)] disabled:opacity-60"
        >
          {loading ? "טוען…" : "הצג פניות"}
        </button>
      </form>

      {error ? <p className="mt-4 text-sm text-red-600">{error}</p> : null}

      {leads ? (
        <div className="mt-8 space-y-4">
          <p className="text-sm text-[var(--muted)]">{leads.length} פניות</p>
          {leads.length === 0 ? (
            <p className="text-sm">עדיין אין פניות.</p>
          ) : (
            leads.map((lead) => (
              <article
                key={lead.id}
                className="rounded-2xl border border-[var(--teal)]/15 bg-white p-4 shadow-sm"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h2 className="font-bold">{lead.name}</h2>
                  <time className="text-xs text-[var(--muted)]" dir="ltr">
                    {new Date(lead.created_at).toLocaleString("he-IL")}
                  </time>
                </div>
                <p className="mt-1 text-sm" dir="ltr">
                  {lead.phone} · {lead.email}
                </p>
                <p className="mt-3 whitespace-pre-wrap text-sm text-[var(--ink)]/85">
                  {lead.message}
                </p>
              </article>
            ))
          )}
        </div>
      ) : null}
    </main>
  );
}
