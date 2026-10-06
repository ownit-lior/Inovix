"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import PageHero from "@/components/pages/PageHero";
import PageImage from "@/components/pages/PageImage";
import { IMAGES } from "@/lib/images";

const VALUES = [
  {
    title: "מקצועיות ללא פשרות",
    desc: "תכנון קפדני, ביצוע נקי תוך שמירה על אסתטיקה מירבית, ושימוש בציוד הקצה המוביל בעולם — בכל פרויקט, עד לפרט האחרון.",
  },
  {
    title: "אינטגרציה מלאה",
    desc: "סנכרון מושלם. אנו מחברים עבורכם את מערכות האבטחה, התקשורת, האודיו־וידאו והחשמל החכם למערכת אחת הפועלת בהרמוניה.",
  },
  {
    title: "שקיפות וליווי",
    desc: "ליווי אישי לכל אורך הדרך. מהייעוץ ההתחלתי ועד למסירת המפתח, אנחנו שומרים על שקיפות מלאה מולכם ומול אנשי המקצוע בפרויקט.",
  },
  {
    title: "חוויית לקוח",
    desc: "טכנולוגיה שמשרתת אתכם, ולא להפך. מערכות שעובדות בשקט מאחורי הקלעים, משתלבות בעיצוב הבית, ומעניקות חוויית שימוש יומיומית חלקה וטבעית.",
  },
] as const;

const PROCESS = [
  {
    title: "שיחת ייעוץ והבנת הצרכים",
    desc: "נבין את אורח החיים שלכם ואת החזון שלכם לבית או לעסק.",
  },
  {
    title: "סיור בנכס / סקירת תוכניות",
    desc: "נבחן את השטח או נלמד את תוכניות האדריכל כדי להתאים את הפתרון הטוב ביותר.",
  },
  {
    title: "תכנון מערכות ותשתיות",
    desc: "נבנה תוכנית מפורטת (כולל חלוקת רשתות, מיקומי ציוד ותרחישי אוטומציה).",
  },
  {
    title: "הצעת מחיר מפורטת",
    desc: "נציג בפניכם הצעה שקופה הכוללת את כל מרכיבי המערכת והעבודה.",
  },
  {
    title: "ביצוע מקצועי ומסודר",
    desc: "התקנה נקייה ומוקפדת בשטח, תוך עמידה בלוחות זמנים ותיאום עם שאר בעלי המקצוע.",
  },
  {
    title: "בדיקות, הדרכה ומסירה",
    desc: "נוודא שכל המערכות פועלות בצורה מושלמת ונדריך אתכם על השימוש היומיומי עד לשליטה מלאה.",
  },
] as const;

export default function AboutPage() {
  return (
    <>
      <Navbar variant="solid" />
      <main id="main-content">
        <PageHero
          eyebrow="אודות INOVIX"
          title="מומחים בייעוץ, תכנון וביצוע מערכות טכנולוגיה"
          lead="INOVIX נוסדה כדי לתת לבתים ולעסקים פתרון מקצועי אחד — מאבטחה ותקשורת, דרך אודיו־וידאו, ועד בית חכם שעובד באמת."
          image={{
            src: IMAGES.about.hero,
            alt: "וילה מודרנית עם בריכה ופטיו",
          }}
          cta={{ href: "/#contact", label: "צרו קשר לייעוץ" }}
          secondaryCta={{ href: "/#features", label: "הפתרונות שלנו" }}
        />

        <section className="bg-[var(--surface-soft)] py-14 sm:py-16 md:py-20">
          <div className="mx-auto grid max-w-6xl gap-10 px-3 sm:px-4 md:grid-cols-2 md:gap-14 md:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
              className="order-2 md:order-1"
            >
              <p className="text-xs font-semibold tracking-[0.18em] text-[var(--teal)] uppercase sm:text-sm">
                הסיפור שלנו
              </p>
              <h2 className="mt-2 text-2xl font-extrabold text-[var(--ink)] sm:text-3xl">
                טכנולוגיה מתקדמת, מהתכנון ועד לביצוע המושלם
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-[var(--muted)] sm:text-base">
                אנחנו ב־INOVIX מאמינים שבית חכם לא נמדד בכמות האפליקציות שיש
                לכם בטלפון, אלא באיכות התכנון שמחבר הכל יחד. השאיפה שלנו היא
                לספק לכם שקט תפעולי אמיתי. לכן, אנו מתמחים בתכנון קפדני של
                מערכות מתח נמוך, תשתיות תקשורת חזקות ופתרונות אבטחה מותאמים
                אישית — מקצה לקצה.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-[var(--muted)] sm:text-base">
                אנחנו עובדים עם בעלי בתים פרטיים, וילות, דירות יוקרה ועסקים —
                ומלווים כל פרויקט באופן אישי, מקצועי ושקוף.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.08 }}
              className="order-1 md:order-2"
            >
              <PageImage
                src={IMAGES.about.team}
                alt="חלל פנים יוקרתי עם יציאה לבריכה"
                aspect="aspect-[4/3]"
              />
            </motion.div>

            <motion.ul
              className="order-3 space-y-3 md:col-span-2 md:grid md:grid-cols-2 md:gap-3"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.12 }}
            >
              {VALUES.map((v) => (
                <li
                  key={v.title}
                  className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0_8px_30px_rgba(15,23,42,0.04)]"
                >
                  <h3 className="font-bold text-[var(--ink)]">{v.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-[var(--muted)]">
                    {v.desc}
                  </p>
                </li>
              ))}
            </motion.ul>
          </div>
        </section>

        <section className="bg-white py-14 sm:py-16 md:py-20">
          <div className="mx-auto max-w-6xl px-3 sm:px-4 md:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
              className="mx-auto mb-10 max-w-4xl sm:mb-12"
            >
              <PageImage
                src={IMAGES.about.process}
                alt="מטבח יוקרתי עם תאורה משולבת בעיצוב"
                aspect="aspect-[21/9]"
              />
            </motion.div>

            <div className="mx-auto max-w-2xl text-center">
              <p className="text-xs font-semibold tracking-[0.18em] text-[var(--teal)] uppercase sm:text-sm">
                איך אנחנו עובדים
              </p>
              <h2 className="mt-2 text-2xl font-extrabold text-[var(--ink)] sm:text-3xl md:text-4xl">
                תהליך ברור. תוצאה מדויקת.
              </h2>
            </div>

            <ol className="mx-auto mt-8 grid max-w-3xl gap-3 sm:mt-10">
              {PROCESS.map((step, i) => (
                <motion.li
                  key={step.title}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="flex items-start gap-4 rounded-2xl border border-slate-200/80 bg-[var(--surface-soft)] px-4 py-3.5 sm:px-5 sm:py-4"
                >
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--teal)]/10 text-sm font-bold text-[var(--teal)]">
                    {i + 1}
                  </span>
                  <div>
                    <span className="block text-sm font-bold text-[var(--ink)] sm:text-base">
                      {step.title}
                    </span>
                    <p className="mt-1 text-sm leading-relaxed text-[var(--muted)]">
                      {step.desc}
                    </p>
                  </div>
                </motion.li>
              ))}
            </ol>
          </div>
        </section>

        <section className="bg-[var(--navy)] py-14 text-center text-white sm:py-16 md:py-20">
          <div className="mx-auto max-w-2xl px-3 sm:px-4">
            <h2 className="text-2xl font-extrabold sm:text-3xl">
              מוכנים לפרויקט הבא שלכם?
            </h2>
            <p className="mt-3 text-sm text-white/75 sm:text-base">
              בואו נדבר על הבית או העסק — ונבנה יחד מערכת שתעבוד בשבילכם.
            </p>
            <Link
              href="/#contact"
              className="brand-gradient-bg mt-6 inline-flex min-h-12 items-center justify-center rounded-full px-8 py-3.5 text-sm font-bold text-[var(--navy)] transition hover:brightness-110"
            >
              השאירו פרטים לייעוץ
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
