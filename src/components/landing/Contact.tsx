"use client";

import Image from "next/image";
import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { CONTACT } from "@/lib/contact";
import { IMAGES } from "@/lib/images";
import { submitLead } from "@/lib/submit-lead";

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    if (!name || !phone || !email || !message) return;

    setSubmitting(true);
    setError("");
    const result = await submitLead({ name, phone, email, message });
    if (!result.ok) {
      setError(result.error);
      setSubmitting(false);
      return;
    }
    setSent(true);
    form.reset();
    setSubmitting(false);
  };

  return (
    <section
      id="contact"
      className="relative z-10 py-14 sm:py-16 md:py-24 lg:py-28"
    >
      <div className="relative mx-auto grid max-w-6xl grid-cols-1 gap-8 px-3 sm:gap-10 sm:px-4 md:grid-cols-2 md:gap-16 md:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs font-semibold tracking-[0.18em] text-[var(--lime-bright)] uppercase sm:text-sm sm:tracking-[0.22em]">
            ייעוץ ראשוני
          </p>
          <h2 className="mt-2 text-2xl font-extrabold text-white sm:mt-3 sm:text-3xl md:text-4xl">
            בואו נתחיל בייעוץ לבית או לעסק שלכם
          </h2>
          <div className="mt-4 h-px w-14 bg-[var(--lime)]/70" />
          <p className="mt-4 text-sm leading-relaxed text-white/70 sm:text-base">
            השאירו פרטים ונחזור אליכם לשיחת ייעוץ. נבין את הצרכים — ונציע תכנון
            וביצוע מדויקים לאבטחה, תקשורת, אודיו וידאו ובית חכם.
          </p>
          <a
            href={`tel:${CONTACT.phoneTel}`}
            className="mt-5 inline-flex items-center gap-2.5 text-lg font-extrabold tracking-wide text-white transition hover:text-[var(--lime-bright)] sm:mt-6 sm:text-xl"
            dir="ltr"
          >
            <span
              className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--teal)]/25 text-[var(--lime-bright)]"
              aria-hidden
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1.1-.2 1.2.4 2.5.6 3.8.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.6.6 3.8.1.4 0 .8-.3 1.1L6.6 10.8z" />
              </svg>
            </span>
            {CONTACT.phoneDisplay}
          </a>
          <ul className="mt-6 space-y-3 text-sm text-white/80 sm:mt-8">
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--lime)]" />
              ייעוץ מקצועי ללא התחייבות
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--lime)]" />
              תכנון מותאם לבית או לעסק
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--lime)]" />
              ביצוע מקצועי מקצה לקצה
            </li>
          </ul>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.12 }}
            className="relative mt-8 hidden aspect-[16/10] overflow-hidden rounded-2xl border border-white/15 shadow-[0_16px_40px_rgba(0,0,0,0.35)] md:mt-10 md:block"
          >
            <Image
              src={IMAGES.home.contact}
              alt="חצר וילה עם בריכה ואזור ישיבה יוקרתי"
              fill
              sizes="(max-width: 1024px) 50vw, 520px"
              className="object-cover"
            />
          </motion.div>
        </motion.div>

        <motion.form
          onSubmit={onSubmit}
          className="brand-band-panel overflow-hidden rounded-2xl border shadow-[0_24px_60px_rgba(0,0,0,0.35)] sm:rounded-3xl"
          initial={{ opacity: 0, y: 48 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, delay: 0.1 }}
        >
          <div
            className="px-4 py-4 text-white sm:px-6 sm:py-5"
            style={{
              background:
                "linear-gradient(135deg, #051635 0%, #1f5f78 55%, #2a929b 100%)",
            }}
          >
            <p className="text-xs font-semibold tracking-[0.18em] text-[var(--lime-bright)] uppercase">
              טופס פנייה
            </p>
            <p className="mt-1 text-lg font-extrabold sm:text-xl">
              השאירו פרטים לייעוץ
            </p>
          </div>

          <div className="relative p-4 sm:p-6 md:p-8">
            <div
              className="pointer-events-none absolute inset-0 opacity-90"
              style={{
                background:
                  "radial-gradient(ellipse 60% 45% at 0% 0%, rgba(42,146,155,0.14), transparent 55%), radial-gradient(ellipse 50% 40% at 100% 100%, rgba(126,211,33,0.1), transparent 50%)",
              }}
              aria-hidden
            />
            {sent ? (
              <div className="relative flex min-h-[240px] flex-col items-center justify-center text-center sm:min-h-[280px]">
                <div className="brand-gradient-bg mb-3 flex h-12 w-12 items-center justify-center rounded-full text-xl font-bold text-[var(--navy)]">
                  ✓
                </div>
                <p className="text-lg font-bold text-[var(--ink)]">
                  קיבלנו את הפרטים
                </p>
                <p className="mt-2 text-sm text-[var(--muted)]">
                  הפנייה נשמרה. נחזור אליכם לתיאום שיחת ייעוץ. תודה שבחרתם
                  ב־INOVIX.
                </p>
              </div>
            ) : (
              <div className="relative space-y-4">
                <Field label="שם מלא" name="name" required />
                <Field label="טלפון" name="phone" type="tel" required />
                <Field label="אימייל" name="email" type="email" required />
                <label className="block">
                  <span className="mb-1.5 block text-sm font-medium text-[var(--teal)]">
                    ספרו לנו על הפרויקט
                  </span>
                  <textarea
                    name="message"
                    rows={4}
                    required
                    className="brand-band-input w-full resize-none rounded-xl border px-3 py-3 text-base text-[var(--ink)] outline-none transition focus:border-[var(--teal)] focus:ring-2 focus:ring-[var(--teal)]/25 sm:px-4"
                  />
                </label>
                {error ? (
                  <p className="text-sm text-red-600" role="alert">
                    {error}
                  </p>
                ) : null}
                <button
                  type="submit"
                  disabled={submitting}
                  className="brand-gradient-bg mt-2 flex min-h-12 w-full items-center justify-center rounded-full py-3.5 text-sm font-bold text-[var(--navy)] shadow-[0_12px_28px_rgba(126,211,33,0.28)] transition hover:brightness-110 disabled:opacity-60"
                >
                  {submitting ? "שולח…" : "צרו קשר לייעוץ"}
                </button>
              </div>
            )}
          </div>
        </motion.form>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-[var(--teal)]">
        {label}
      </span>
      <input
        name={name}
        type={type}
        required={required}
        className="brand-band-input w-full rounded-xl border px-3 py-3 text-base text-[var(--ink)] outline-none transition focus:border-[var(--teal)] focus:ring-2 focus:ring-[var(--teal)]/25 sm:px-4"
      />
    </label>
  );
}
