"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { IMAGES } from "@/lib/images";

export default function ShowroomPlaceholder() {
  return (
    <section
      id="showroom"
      className="brand-section border-t border-white/5 py-16 text-white sm:py-20 md:py-24"
    >
      <div className="relative mx-auto max-w-6xl px-3 sm:px-4 md:px-6 lg:px-8">
        <motion.div
          className="mx-auto max-w-2xl text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.55 }}
        >
          <p className="text-xs font-semibold tracking-[0.2em] text-[var(--lime-bright)] uppercase sm:text-sm sm:tracking-[0.24em]">
            אדריכלות ולייף־סטייל
          </p>
          <h2 className="mt-3 text-2xl font-extrabold text-white sm:text-3xl md:text-4xl">
            טכנולוגיה שנעלמת בעיצוב
          </h2>
          <div className="mx-auto mt-5 h-px w-16 bg-[var(--lime)]/70" />
        </motion.div>

        <motion.div
          className="mt-10 sm:mt-12 md:mt-14"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <Link
            href="/tour"
            className="group relative block aspect-[16/9] overflow-hidden sm:aspect-[21/9]"
          >
            <Image
              src={IMAGES.services.av}
              alt="חלל מגורים יוקרתי עם טכנולוגיה משולבת בעיצוב"
              fill
              sizes="(max-width: 1152px) 100vw, 1152px"
              className="object-cover transition duration-700 group-hover:scale-[1.04]"
            />
            <div
              className="absolute inset-0 transition duration-500 group-hover:opacity-95"
              style={{
                background:
                  "linear-gradient(90deg, rgba(5,22,53,0.82) 0%, rgba(5,22,53,0.35) 52%, rgba(5,22,53,0.2) 100%)",
              }}
            />
            <div className="absolute inset-y-0 end-0 w-1 bg-[var(--lime)]/0 transition group-hover:bg-[var(--lime)]" />
            <div className="absolute inset-0 flex items-end p-5 sm:items-center sm:p-8 md:p-10">
              <div className="max-w-xl text-right">
                <p className="text-sm leading-relaxed text-white/85 sm:text-base">
                  אבטחה, רשת, אודיו־וידאו ובית חכם — משתלבים בטבעיות בחלל יוקרתי,
                  בלי לוותר על האסתטיקה.
                </p>
                <p className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-white/80 transition group-hover:text-[var(--lime-bright)]">
                  כניסה לסיור תלת־ממד
                  <span aria-hidden className="transition group-hover:-translate-x-1">
                    ←
                  </span>
                </p>
              </div>
            </div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
