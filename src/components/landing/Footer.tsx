"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Logo from "@/components/Logo";
import SocialIcon from "@/components/SocialIcon";
import { CONTACT } from "@/lib/contact";
import { SERVICES } from "@/lib/services";
import { SOCIAL_LINKS } from "@/lib/social";

export default function Footer() {
  return (
    <footer className="relative bg-[var(--navy)]">
      <motion.div
        className="relative mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-3 py-8 text-center sm:gap-7 sm:px-4 sm:py-10 md:flex-row md:items-center md:px-6 md:text-right lg:px-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col items-center gap-2 md:items-start">
          <Link href="/" aria-label="INOVIX דף הבית">
            <Logo size="sm" onDark />
          </Link>
          <p className="text-xs text-white/60 sm:text-sm">
            ייעוץ · תכנון · ביצוע — לבתים ולעסקים
          </p>
          <a
            href={`tel:${CONTACT.phoneTel}`}
            className="mt-2 text-sm font-semibold tracking-wide text-white/85 transition hover:text-[var(--lime-bright)] sm:text-base"
            dir="ltr"
          >
            {CONTACT.phoneDisplay}
          </a>
          <ul
            className="mt-3 flex items-center justify-center gap-2.5 sm:gap-3 md:justify-start"
            aria-label="רשתות חברתיות"
          >
            {SOCIAL_LINKS.map((link) => (
              <li key={link.id}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.name}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/75 transition hover:border-[var(--lime)]/50 hover:bg-white/10 hover:text-[var(--lime-bright)]"
                >
                  <SocialIcon link={link} className="h-[1.15rem] w-[1.15rem]" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex max-w-xl flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm text-white/65 sm:gap-x-5">
          <Link href="/about" className="transition hover:text-[var(--lime-bright)]">
            אודות
          </Link>
          <Link href="/blog" className="transition hover:text-[var(--lime-bright)]">
            בלוג
          </Link>
          <Link href="/tour" className="transition hover:text-[var(--lime-bright)]">
            סיור תלת־ממד
          </Link>
          {SERVICES.map((s) => (
            <Link
              key={s.slug}
              href={s.href}
              className="transition hover:text-[var(--lime-bright)]"
            >
              {s.shortTitle}
            </Link>
          ))}
          <Link href="/#contact" className="transition hover:text-[var(--lime-bright)]">
            צור קשר
          </Link>
          <Link
            href="/accessibility"
            className="transition hover:text-[var(--lime-bright)]"
          >
            הצהרת נגישות
          </Link>
          <Link href="/terms" className="transition hover:text-[var(--lime-bright)]">
            תנאי שימוש
          </Link>
        </div>

        <p className="text-xs text-white/45">
          © {new Date().getFullYear()} INOVIX. כל הזכויות שמורות.
        </p>
      </motion.div>
    </footer>
  );
}
