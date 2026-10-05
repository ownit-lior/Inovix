"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { IMAGES } from "@/lib/images";

const FEATURES = [
  {
    href: "/services/smart-home",
    eyebrow: "בית חכם",
    title: "אינטגרציה מלאה מקצה לקצה",
    image: IMAGES.services.smartHome,
    imageAlt: "סלון יוקרתי עם מערכת בית חכם משולבת",
  },
  {
    href: "/services/security",
    eyebrow: "אבטחה",
    title: "מעטפת הגנה חכמה",
    image: IMAGES.services.securityCameras,
    imageAlt: "מצלמת PTZ על חזית וילה יוקרתית",
  },
  {
    href: "/services/networking",
    eyebrow: "תקשורת",
    title: "רשת יציבה בכל חלל",
    image: IMAGES.services.networkingHome,
    imageAlt: "נקודת גישה אלחוטית בתקרה בסלון וילה — כיסוי רשת יציב בכל חלל",
  },
  {
    href: "/services/av",
    eyebrow: "אודיו־וידאו",
    title: "חוויית בידור יוקרתית",
    image: IMAGES.services.av,
    imageAlt: "חלל מגורים עם מערכת אודיו־וידאו אדריכלית",
  },
] as const;

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const item = {
  hidden: { opacity: 0, y: 26 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function Features() {
  return (
    <section
      id="features"
      className="brand-section border-t border-white/5 py-16 sm:py-20 md:py-24"
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
            מה אנחנו עושים
          </p>
          <h2 className="mt-3 text-2xl font-extrabold text-white sm:text-3xl md:text-4xl">
            ייעוץ, תכנון וביצוע — מקצה לקצה
          </h2>
          <div className="mx-auto mt-5 h-px w-16 bg-[var(--lime)]/70" />
        </motion.div>

        <motion.div
          className="mt-10 flex flex-col gap-3 sm:mt-12 sm:gap-4 md:mt-14"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
        >
          {FEATURES.map((f) => (
            <motion.div key={f.href} variants={item}>
              <Link
                href={f.href}
                className="group relative block aspect-[16/9] overflow-hidden sm:aspect-[21/9]"
              >
                <Image
                  src={f.image}
                  alt={f.imageAlt}
                  fill
                  sizes="100vw"
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
                    <p className="text-xs font-semibold tracking-[0.16em] text-[var(--lime-bright)] sm:text-sm">
                      {f.eyebrow}
                    </p>
                    <h3 className="mt-1.5 text-xl font-extrabold text-white sm:text-2xl md:text-3xl">
                      {f.title}
                    </h3>
                    <p className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-white/80 transition group-hover:text-[var(--lime-bright)]">
                      לפרטים
                      <span aria-hidden className="transition group-hover:-translate-x-1">
                        ←
                      </span>
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
