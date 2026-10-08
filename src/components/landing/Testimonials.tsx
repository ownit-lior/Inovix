"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IMAGES } from "@/lib/images";

const REVIEWS = [
  {
    name: "נציג ועד בית",
    role: "פרויקט מגורים בנתניה",
    quote:
      "חיפשנו פתרון מקיף ומקצועי לשני בנייני המגורים שלנו, ו-INOVIX סיפקו עבודה ברמה הגבוהה ביותר. ההתקנה של עשרות מצלמות אבטחה ותשתית רשת מתקדמת על פני מספר מפלסי חניון בוצעה בצורה אסתטית, חכמה וללא פשרות. פשוט שקט נפשי.",
    image: IMAGES.services.securityCameras,
    imageAlt: "מצלמות אבטחה ותשתית מקצועית בפרויקט מגורים",
  },
  {
    name: "מנהל תפעול",
    role: "פארק מדע וטכנולוגיה",
    quote:
      "כמשרד שדורש טכנולוגיה מתקדמת, היה לנו קריטי לעבוד עם אינטגרטור שמבין עניין. הצוות תכנן והטמיע עבורנו אקוסיסטם שלם שמשלב בקרת כניסה חכמה למשרדים, מצלמות, אזעקה ורשת תקשורת יציבה. שירות מקצועי וזמינות מלאה לכל שאלה.",
    image: IMAGES.projects.office,
    imageAlt: "משרדים — בקרת כניסה, אבטחה ותקשורת משולבת",
  },
  {
    name: "בעלי עסק",
    role: "עגלת קפה",
    quote:
      "ליאור נתן לנו שירות מעולה ומהיר מהרגע הראשון. מעבר להתקנה המקצועית של מערכות האזעקה והאבטחה לעסק, קיבלנו ליווי מסודר בכל נושא אישורי הבטיחות והתקנים הנדרשים. ממליצים בחום לכל בעל עסק.",
    image: IMAGES.services.securityAlarm,
    imageAlt: "מערכת אזעקה ואבטחה לעסק קטן",
  },
] as const;

export default function Testimonials() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % REVIEWS.length);
    }, 7200);
    return () => window.clearInterval(id);
  }, []);

  const go = (dir: -1 | 1) => {
    setIndex((i) => (i + dir + REVIEWS.length) % REVIEWS.length);
  };

  const review = REVIEWS[index];

  return (
    <section
      id="testimonials"
      className="brand-section border-t border-white/5 py-16 text-white sm:py-20 md:py-24"
    >
      <div className="relative mx-auto max-w-6xl px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <motion.p
            className="text-xs font-semibold tracking-[0.2em] text-[var(--lime-bright)] uppercase sm:text-sm sm:tracking-[0.24em]"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            לקוחות מספרים
          </motion.p>
          <motion.h2
            className="mt-3 text-2xl font-extrabold text-white sm:text-3xl md:text-4xl"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.06 }}
          >
            מקצועיות שמורגשת בשטח
          </motion.h2>
          <div className="mx-auto mt-5 h-px w-16 bg-[var(--lime)]/70" />
        </div>

        <div className="relative mt-10 sm:mt-12 md:mt-14">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="relative aspect-[16/10] min-h-[280px] w-full sm:min-h-[380px] md:aspect-[21/9] md:min-h-[440px]">
                <Image
                  src={review.image}
                  alt={review.imageAlt}
                  fill
                  sizes="100vw"
                  className="object-cover"
                  priority
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(5,22,53,0.15) 0%, rgba(5,22,53,0.55) 55%, rgba(5,22,53,0.88) 100%)",
                  }}
                />
                <blockquote className="absolute inset-x-0 bottom-0 p-5 text-center sm:p-8 md:p-10 md:text-right">
                  <p className="mx-auto max-w-3xl text-sm leading-relaxed font-medium text-white sm:text-base md:ms-auto md:me-0 md:text-lg lg:text-xl">
                    “{review.quote}”
                  </p>
                  <footer className="mt-4 sm:mt-5">
                    <div className="font-bold text-[var(--lime-bright)]">
                      {review.name}
                    </div>
                    <div className="mt-1 text-sm text-white/65">{review.role}</div>
                  </footer>
                </blockquote>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-7 flex items-center justify-center gap-3 sm:mt-8 sm:gap-4">
          <button
            type="button"
            onClick={() => go(-1)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-white/5 text-white transition hover:border-[var(--lime)] hover:text-[var(--lime-bright)]"
            aria-label="הקודם"
          >
            →
          </button>
          <div className="flex gap-2">
            {REVIEWS.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`ביקורת ${i + 1}`}
                onClick={() => setIndex(i)}
                className={`h-2 rounded-full transition-all ${
                  i === index ? "w-8 bg-[var(--lime)]" : "w-2 bg-white/30"
                }`}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={() => go(1)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-white/5 text-white transition hover:border-[var(--lime)] hover:text-[var(--lime-bright)]"
            aria-label="הבא"
          >
            ←
          </button>
        </div>
      </div>
    </section>
  );
}
