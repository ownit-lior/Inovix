"use client";

import Image from "next/image";
import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { CONTACT } from "@/lib/contact";
import { IMAGES } from "@/lib/images";

export default function Contact() {
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section
      id="contact"
      className="brand-tint py-14 sm:py-16 md:py-24 lg:py-28"
    >
      <div className="relative mx-auto grid max-w-6xl grid-cols-1 gap-8 px-3 sm:gap-10 sm:px-4 md:grid-cols-2 md:gap-16 md:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs font-semibold tracking-[0.18em] text-[var(--teal)] uppercase sm:text-sm sm:tracking-[0.22em]">
            ייעוץ ראשוני
          </p>
          <h2 className="mt-2 text-2xl font-extrabold text-[var(--ink)] sm:mt-3 sm:text-3xl md:text-4xl">
            בואו נתחיל בייעוץ לבית או לעסק שלכם
          </h2>
          <div className="mt-4 h-px w-14 bg-[var(--lime)]/60" />
          <p className="mt-4 text-sm leading-relaxed text-[var(--muted)] sm:text-base">
            השאירו פרטים ונחזור אליכם לשיחת ייעוץ. נבין את הצרכים — ונציע תכנון
            וביצוע מדויקים לאבטחה, תקשורת, אודיו־וידאו ובית חכם.
          </p>
          <a
            href={`tel:${CONTACT.phoneTel}`}
            className="mt-5 inline-flex items-center gap-2.5 text-lg font-extrabold tracking-wide text-[var(--ink)] transition hover:text-[var(--teal)] sm:mt-6 sm:text-xl"
            dir="ltr"
          >
            <span
              className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--teal)]/12 text-[var(--teal)]"
              aria-hidden
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1.1-.2 1.2.4 2.5.6 3.8.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.6.6 3.8.1.4 0 .8-.3 1.1L6.6 10.8z" />
              </svg>
            </span>
            {CONTACT.phoneDisplay}
          </a>
          <ul className="mt-6 space-y-3 text-sm text-[var(--ink)]/80 sm:mt-8">
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
            className="relative mt-8 hidden aspect-[16/10] overflow-hidden rounded-2xl border border-[var(--teal)]/15 shadow-[0_16px_40px_rgba(5,22,53,0.08)] md:mt-10 md:block"
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
          className="rounded-2xl border border-[var(--teal)]/15 bg-white/90 p-4 shadow-[0_20px_50px_rgba(5,22,53,0.08)] backdrop-blur-sm sm:rounded-3xl sm:p-6 md:p-8"
          initial={{ opacity: 0, y: 48 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, delay: 0.1 }}
        >
          {sent ? (
            <div className="flex min-h-[240px] flex-col items-center justify-center text-center sm:min-h-[280px]">
              <div className="mb-3 text-3xl text-[var(--teal)]">✓</div>
              <p className="text-lg font-bold text-[var(--ink)]">קיבלנו את הפרטים</p>
              <p className="mt-2 text-sm text-[var(--muted)]">
                נחזור אליכם לתיאום שיחת ייעוץ. תודה שבחרתם ב־INOVIX.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <Field label="שם מלא" name="name" required />
              <Field label="טלפון" name="phone" type="tel" required />
              <Field label="אימייל" name="email" type="email" required />
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-[var(--ink)]">
                  ספרו לנו על הפרויקט
                </span>
                <textarea
                  name="message"
                  rows={4}
                  required
                  className="w-full resize-none rounded-xl border border-slate-200 bg-[var(--surface-soft)] px-3 py-3 text-base outline-none transition focus:border-[var(--teal)] focus:ring-2 focus:ring-[var(--teal)]/20 sm:px-4"
                />
              </label>
              <button
                type="submit"
                className="brand-gradient-bg mt-2 flex min-h-12 w-full items-center justify-center rounded-full py-3.5 text-sm font-bold text-[var(--navy)] transition hover:brightness-110"
              >
                דברו איתנו לייעוץ
              </button>
            </div>
          )}
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
      <span className="mb-1.5 block text-sm font-medium text-[var(--ink)]">
        {label}
      </span>
      <input
        name={name}
        type={type}
        required={required}
        className="w-full rounded-xl border border-slate-200 bg-[var(--surface-soft)] px-3 py-3 text-base outline-none transition focus:border-[var(--teal)] focus:ring-2 focus:ring-[var(--teal)]/20 sm:px-4"
      />
    </label>
  );
}
