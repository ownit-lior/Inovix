"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { IMAGES } from "@/lib/images";

export default function ShowroomPlaceholder() {
  return (
    <section
      id="showroom"
      className="relative flex min-h-[70vh] items-center overflow-hidden bg-[var(--navy)] py-20 text-white sm:min-h-[75vh] sm:py-24 md:py-28"
    >
      <div className="absolute inset-0 z-0">
        <Image
          src={IMAGES.services.av}
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center"
          priority={false}
        />
        <div
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(180deg, rgba(5,22,53,0.55) 0%, rgba(5,22,53,0.45) 45%, rgba(5,22,53,0.78) 100%),
              linear-gradient(115deg, rgba(42,146,155,0.25) 0%, transparent 60%)
            `,
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-3xl px-3 text-center sm:px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.65 }}
        >
          <p className="text-xs font-semibold tracking-[0.2em] text-[var(--lime-bright)] uppercase sm:text-sm sm:tracking-[0.24em]">
            אדריכלות ולייף־סטייל
          </p>
          <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl md:text-5xl">
            טכנולוגיה שנעלמת בעיצוב
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-white/75 sm:text-base md:text-lg">
            אבטחה, רשת, אודיו־וידאו ובית חכם — משתלבים בטבעיות בחלל יוקרתי,
            בלי לוותר על האסתטיקה.
          </p>
          <Link
            href="/tour"
            className="mt-8 inline-flex min-h-12 items-center justify-center rounded-full bg-[var(--lime)] px-8 py-3.5 text-sm font-bold text-[var(--navy)] transition hover:bg-[var(--lime-bright)]"
          >
            כניסה לסיור תלת־ממד
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
