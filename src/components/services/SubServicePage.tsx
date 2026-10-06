"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import type { ServiceTopic } from "@/lib/service-topics";
import { CONTACT } from "@/lib/contact";
import Logo from "@/components/Logo";
import LandingLeadForm from "@/components/services/LandingLeadForm";

export default function SubServicePage({ topic }: { topic: ServiceTopic }) {
  const waHref = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(
    `שלום INOVIX, אשמח לייעוץ בנושא ${topic.title}`,
  )}`;

  return (
    <div className="bg-[var(--navy)] pb-20 text-white md:pb-0">
      {/* Landing-only header — not the full site nav */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[var(--navy)]/90 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-3 px-3 sm:h-16 sm:px-5">
          <Link href="/" aria-label="INOVIX">
            <Logo size="sm" onDark />
          </Link>
          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href={`tel:${CONTACT.phoneTel}`}
              className="hidden text-sm font-bold tracking-wide text-white/90 transition hover:text-[var(--lime-bright)] sm:inline"
              dir="ltr"
            >
              {CONTACT.phoneDisplay}
            </a>
            <a
              href="#lead"
              className="brand-gradient-bg inline-flex min-h-10 items-center justify-center rounded-full px-4 text-xs font-bold text-[var(--navy)] sm:px-5 sm:text-sm"
            >
              לייעוץ חינם
            </a>
          </div>
        </div>
      </header>

      <main id="main-content">
        {/* Hero — single offer focus */}
        <section className="relative flex min-h-[100dvh] items-end overflow-hidden pb-16 pt-24 sm:items-center sm:pb-24 sm:pt-28">
          <div className="absolute inset-0 z-0" aria-hidden>
            <Image
              src={topic.image}
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
            <div
              className="absolute inset-0"
              style={{
                background: `
                  linear-gradient(180deg, rgba(5,22,53,0.45) 0%, rgba(5,22,53,0.35) 40%, rgba(5,22,53,0.88) 100%),
                  linear-gradient(105deg, rgba(5,22,53,0.82) 0%, rgba(5,22,53,0.25) 55%, transparent 100%)
                `,
              }}
            />
          </div>

          <div className="relative z-10 mx-auto grid w-full max-w-5xl gap-8 px-3 sm:px-5 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:gap-10">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
            >
              <p className="text-xs font-semibold tracking-[0.2em] text-[var(--lime-bright)] uppercase sm:text-sm">
                {topic.eyebrow}
              </p>
              <h1 className="mt-3 text-[2rem] font-extrabold leading-[1.15] [text-shadow:0_2px_28px_rgba(5,22,53,0.55)] sm:text-5xl md:text-6xl">
                {topic.title}
              </h1>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-white/92 sm:text-lg">
                {topic.heroLead}
              </p>
              <ul className="mt-6 flex flex-wrap gap-2 text-xs font-semibold text-white/80 sm:text-sm">
                {["ייעוץ מקצועי", "תכנון מדויק", "התקנה נקייה", "ליווי אחרי מסירה"].map(
                  (t) => (
                    <li
                      key={t}
                      className="rounded-full border border-white/20 bg-white/10 px-3 py-1.5"
                    >
                      {t}
                    </li>
                  ),
                )}
              </ul>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#lead"
                  className="brand-gradient-bg inline-flex min-h-12 items-center justify-center rounded-full px-8 text-sm font-bold text-[var(--navy)] shadow-[0_12px_32px_rgba(126,211,33,0.35)]"
                >
                  לקבלת הצעה ל{topic.shortTitle}
                </a>
                <a
                  href={waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/35 bg-white/10 px-8 text-sm font-semibold"
                >
                  שליחה ב־WhatsApp
                </a>
              </div>
            </motion.div>

            <motion.div
              id="lead"
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08 }}
              className="rounded-3xl border border-white/15 bg-[rgba(5,22,53,0.72)] p-5 shadow-[0_24px_60px_rgba(0,0,0,0.35)] backdrop-blur-md sm:p-6"
            >
              <p className="text-sm font-bold text-[var(--lime-bright)]">
                ייעוץ ראשוני · בלי התחייבות
              </p>
              <h2 className="mt-1 text-xl font-extrabold">
                השאירו פרטים — נחזור אליכם עוד היום
              </h2>
              <div className="mt-4">
                <LandingLeadForm topicTitle={topic.title} />
              </div>
            </motion.div>
          </div>
          <span className="sr-only">{topic.imageAlt}</span>
        </section>

        {/* Problem */}
        <section className="bg-[var(--surface)] px-3 py-14 text-[var(--ink)] sm:px-5 sm:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold tracking-[0.18em] text-[var(--teal)] uppercase">
              הבעיה
            </p>
            <h2 className="mt-3 text-2xl font-extrabold leading-snug sm:text-4xl">
              {topic.needTitle}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-[var(--muted)] sm:text-lg">
              {topic.need}
            </p>
          </div>
        </section>

        {/* Solution */}
        <section className="bg-[var(--surface-soft)] px-3 py-14 text-[var(--ink)] sm:px-5 sm:py-20">
          <div className="mx-auto max-w-5xl">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-xs font-semibold tracking-[0.18em] text-[var(--teal)] uppercase">
                הפתרון
              </p>
              <h2 className="mt-3 text-2xl font-extrabold leading-snug sm:text-4xl">
                {topic.solutionTitle}
              </h2>
              <p className="mt-5 text-base leading-relaxed text-[var(--muted)] sm:text-lg">
                {topic.solution}
              </p>
            </div>
            <div className="mt-10 grid gap-3 sm:grid-cols-2">
              {topic.solutionPoints.map((point, i) => (
                <motion.div
                  key={point}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-4"
                >
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--teal)]/12 text-sm font-bold text-[var(--teal)]">
                    {i + 1}
                  </span>
                  <p className="text-sm font-semibold leading-relaxed text-[var(--ink)] sm:text-[0.95rem]">
                    {point}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Why us */}
        <section className="bg-[var(--navy)] px-3 py-14 sm:px-5 sm:py-20">
          <div className="mx-auto max-w-5xl">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-xs font-semibold tracking-[0.18em] text-[var(--lime-bright)] uppercase">
                למה INOVIX
              </p>
              <h2 className="mt-3 text-2xl font-extrabold sm:text-4xl">
                ייעוץ, תכנון והתקנה שמרגישים את ההבדל
              </h2>
            </div>
            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {topic.whyUs.map((item) => (
                <article
                  key={item.title}
                  className="rounded-3xl border border-white/10 bg-white/5 p-6"
                >
                  <h3 className="text-lg font-extrabold text-[var(--lime-bright)]">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/80">
                    {item.body}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Process + includes */}
        <section className="bg-[var(--surface)] px-3 py-14 text-[var(--ink)] sm:px-5 sm:py-20">
          <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-2">
            <div>
              <p className="text-xs font-semibold tracking-[0.18em] text-[var(--teal)] uppercase">
                איך זה עובד
              </p>
              <h2 className="mt-2 text-2xl font-extrabold sm:text-3xl">
                שלושה שלבים ברורים עד מערכת עובדת
              </h2>
              <ol className="mt-8 space-y-4">
                {topic.process.map((step, i) => (
                  <li key={step.title} className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--navy)] text-sm font-bold text-white">
                      {i + 1}
                    </div>
                    <div>
                      <h3 className="font-bold">{step.title}</h3>
                      <p className="mt-1 text-sm text-[var(--muted)]">
                        {step.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-[var(--surface-soft)] p-6 sm:p-8">
              <h3 className="text-xl font-extrabold">מה כלול בתהליך</h3>
              <ul className="mt-5 space-y-3">
                {topic.includes.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm font-medium">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--lime)]/20 text-xs font-bold text-[var(--navy)]">
                      ✓
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Close deal */}
        <section className="bg-[var(--surface-soft)] px-3 py-14 text-[var(--ink)] sm:px-5 sm:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold tracking-[0.18em] text-[var(--teal)] uppercase">
              לסגור בראש שקט
            </p>
            <h2 className="mt-3 text-2xl font-extrabold sm:text-4xl">
              {topic.closeTitle}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-[var(--muted)] sm:text-lg">
              {topic.closeBody}
            </p>
            <ul className="mx-auto mt-8 max-w-xl space-y-3 text-right">
              {topic.closeBullets.map((b) => (
                <li
                  key={b}
                  className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold"
                >
                  {b}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <a
                href="#lead"
                className="brand-gradient-bg inline-flex min-h-12 items-center justify-center rounded-full px-8 text-sm font-bold text-[var(--navy)]"
              >
                להשארת פרטים
              </a>
              <a
                href={`tel:${CONTACT.phoneTel}`}
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-[var(--navy)]/20 bg-white px-8 text-sm font-bold text-[var(--navy)]"
                dir="ltr"
              >
                {CONTACT.phoneDisplay}
              </a>
            </div>
          </div>
        </section>

        {/* FAQ */}
        {topic.faqs.length > 0 ? (
          <section className="bg-white px-3 py-14 text-[var(--ink)] sm:px-5 sm:py-20">
            <div className="mx-auto max-w-3xl">
              <h2 className="text-center text-2xl font-extrabold sm:text-3xl">
                שאלות נפוצות לפני שמתקדמים
              </h2>
              <div className="mt-8 space-y-3">
                {topic.faqs.map((faq) => (
                  <details
                    key={faq.q}
                    className="rounded-2xl border border-slate-200 px-5 py-4"
                  >
                    <summary className="cursor-pointer list-none text-sm font-bold marker:content-none">
                      {faq.q}
                    </summary>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                      {faq.a}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        {/* Final CTA band */}
        <section className="border-t border-white/10 bg-[var(--navy)] px-3 py-14 sm:px-5 sm:py-16">
          <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-6 text-center md:flex-row md:text-right">
            <div>
              <h2 className="text-2xl font-extrabold sm:text-3xl">
                מוכנים להתקדם עם {topic.shortTitle}?
              </h2>
              <p className="mt-2 text-sm text-white/70">
                שיחת ייעוץ קצרה — נבין את הנכס ונציע כיוון מדויק וממוקד.
              </p>
            </div>
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <a
                href="#lead"
                className="brand-gradient-bg inline-flex min-h-12 items-center justify-center rounded-full px-7 text-sm font-bold text-[var(--navy)]"
              >
                להשארת פרטים
              </a>
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/30 px-7 text-sm font-semibold"
              >
                WhatsApp
              </a>
            </div>
          </div>
          <p className="mt-10 text-center text-xs text-white/40">
            <Link href="/" className="underline-offset-2 hover:text-white/70 hover:underline">
              לאתר INOVIX המלא
            </Link>
            {" · "}
            <a href={`tel:${CONTACT.phoneTel}`} dir="ltr">
              {CONTACT.phoneDisplay}
            </a>
          </p>
        </section>
      </main>

      {/* Sticky mobile conversion bar */}
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-[var(--navy)]/95 p-3 backdrop-blur md:hidden">
        <div className="mx-auto grid max-w-lg grid-cols-2 gap-2">
          <a
            href={`tel:${CONTACT.phoneTel}`}
            className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/25 text-sm font-bold"
          >
            חיוג
          </a>
          <a
            href="#lead"
            className="brand-gradient-bg inline-flex min-h-11 items-center justify-center rounded-full text-sm font-bold text-[var(--navy)]"
          >
            השאירו פרטים
          </a>
        </div>
      </div>
    </div>
  );
}
