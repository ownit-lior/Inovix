"use client";

import { useState, type FormEvent } from "react";
import { submitLead } from "@/lib/submit-lead";

export default function LandingLeadForm({
  topicTitle,
  ctaLabel = "שלחו ואחזור אליכם",
}: {
  topicTitle: string;
  ctaLabel?: string;
}) {
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const note = String(data.get("note") ?? "").trim();
    if (!name || !phone) return;

    setSubmitting(true);
    setError("");
    const result = await submitLead({
      name,
      phone,
      message: [
        `פנייה מדף נחיתה: ${topicTitle}`,
        note || "מעוניין בייעוץ",
      ].join("\n"),
    });
    if (!result.ok) {
      setError(result.error);
      setSubmitting(false);
      return;
    }
    setSent(true);
    form.reset();
    setSubmitting(false);
  };

  if (sent) {
    return (
      <div className="rounded-2xl border border-[var(--lime)]/30 bg-white/10 px-5 py-8 text-center text-white">
        <p className="text-lg font-extrabold">קיבלנו את הפרטים</p>
        <p className="mt-2 text-sm text-white/75">
          נחזור אליכם לתיאום ייעוץ ב{topicTitle}.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <input
        name="name"
        required
        placeholder="שם מלא"
        className="min-h-12 w-full rounded-xl border border-white/20 bg-[var(--surface)] px-4 text-[var(--ink)] outline-none focus:ring-2 focus:ring-[var(--lime)]/50"
      />
      <input
        name="phone"
        type="tel"
        required
        placeholder="טלפון"
        className="min-h-12 w-full rounded-xl border border-white/20 bg-[var(--surface)] px-4 text-[var(--ink)] outline-none focus:ring-2 focus:ring-[var(--lime)]/50"
        dir="ltr"
      />
      <textarea
        name="note"
        rows={3}
        placeholder="ספרו בקצרה על הנכס / הצורך (אופציונלי)"
        className="w-full resize-none rounded-xl border border-white/20 bg-[var(--surface)] px-4 py-3 text-[var(--ink)] outline-none focus:ring-2 focus:ring-[var(--lime)]/50"
      />
      {error ? <p className="text-sm text-red-300">{error}</p> : null}
      <button
        type="submit"
        disabled={submitting}
        className="brand-gradient-bg flex min-h-12 w-full items-center justify-center rounded-full text-sm font-bold text-[var(--navy)] disabled:opacity-60"
      >
        {submitting ? "שולח…" : ctaLabel}
      </button>
      <p className="text-center text-xs text-white/55">
        בלי ספאם. רק חזרה לתיאום ייעוץ.
      </p>
    </form>
  );
}
