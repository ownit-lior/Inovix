"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

export default function TourPageClient() {
  return (
    <div className="bg-[var(--navy)] text-white">
      <Navbar variant="solid" />
      <main className="relative flex min-h-[100dvh] items-center overflow-hidden pt-24 pb-16 sm:pt-28 sm:pb-20">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: `
              radial-gradient(circle at 18% 30%, rgba(126,211,33,0.18), transparent 42%),
              radial-gradient(circle at 82% 70%, rgba(42,146,155,0.26), transparent 48%)
            `,
          }}
          aria-hidden
        />

        <div className="relative z-10 mx-auto w-full max-w-3xl px-3 text-center sm:px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
          >
            <p className="text-xs font-semibold tracking-[0.2em] text-[var(--lime-bright)] uppercase sm:text-sm sm:tracking-[0.24em]">
              סיור תלת־ממד
            </p>
            <h1 className="mt-4 text-3xl font-extrabold leading-tight sm:text-4xl md:text-5xl">
              בבנייה — עולה בקרוב
            </h1>
            <div className="mx-auto mt-5 h-px w-16 bg-[var(--lime)]/70" />
            <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-white/80 sm:text-base md:text-lg">
              אנחנו משלימים את הסיור התלת־ממדי בווילה החכמה. בקרוב תוכלו לסייר
              בחללים ולגלות את מערכות האבטחה, התקשורת, האודיו־וידאו והבית החכם
              משולבות בעיצוב.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <Link
                href="/#contact"
                className="brand-gradient-bg inline-flex min-h-12 w-full items-center justify-center rounded-full px-8 py-3.5 text-sm font-bold text-[var(--navy)] shadow-[0_12px_32px_rgba(126,211,33,0.32)] transition hover:brightness-110 sm:w-auto"
              >
                צרו קשר לייעוץ
              </Link>
              <Link
                href="/"
                className="inline-flex min-h-12 w-full items-center justify-center rounded-full border border-white/35 bg-white/10 px-8 py-3.5 text-sm font-semibold text-white transition hover:bg-white/20 sm:w-auto"
              >
                חזרה לדף הבית
              </Link>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
