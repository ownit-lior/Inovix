"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import AmbientOrbs from "@/components/effects/AmbientOrbs";
import CountUp from "@/components/effects/CountUp";
import Magnetic from "@/components/effects/Magnetic";
import ScrollProgress from "@/components/effects/ScrollProgress";
import { IMAGES } from "@/lib/images";
import { SERVICES } from "@/lib/services";

const VALUES = [
  {
    title: "מקצועיות ללא פשרות",
    desc: "תכנון קפדני, ביצוע נקי תוך שמירה על אסתטיקה מירבית, ושימוש בציוד הקצה המוביל בעולם — בכל פרויקט, עד לפרט האחרון.",
  },
  {
    title: "אינטגרציה מלאה",
    desc: "סנכרון מושלם. אנו מחברים עבורכם את מערכות האבטחה, התקשורת, האודיו וידאו והחשמל החכם למערכת אחת הפועלת בהרמוניה.",
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
    desc: "נבנה תוכנית מפורטת — כולל חלוקת רשתות, מיקומי ציוד ותרחישי אוטומציה.",
  },
  {
    title: "הצעת מחיר מפורטת",
    desc: "נציג בפניכם הצעה שקופה הכוללת את כל מרכיבי המערכת והעבודה.",
  },
  {
    title: "ביצוע מקצועי ומסודר",
    desc: "התקנה נקייה ומוקפדת בשטח, תוך עמידה בלוחות זמנים ותיאום עם בעלי המקצוע.",
  },
  {
    title: "בדיקות, הדרכה ומסירה",
    desc: "נוודא שכל המערכות פועלות בצורה מושלמת ונדריך אתכם עד לשליטה מלאה.",
  },
] as const;

const STATS = [
  { value: 4, suffix: "", label: "תחומי מומחיות" },
  { value: 100, suffix: "%", label: "אינטגרציה מקצה לקצה" },
  { value: 24, suffix: "/7", label: "מערכות שעובדות בשבילכם" },
  { value: 1, suffix: "", label: "גורם אחראי על הכל" },
] as const;

const WHY = [
  {
    title: "לא מתקינים ונעלמים",
    body: "מלווים אתכם גם אחרי המסירה — עדכונים, תרחישים חדשים והרחבות.",
  },
  {
    title: "עובדים עם האנשים שלכם",
    body: "תיאום מול אדריכל, חשמלאי וקבלן — או ביצוע מלא דרכנו.",
  },
  {
    title: "בחירת תקן לפי הנכס",
    body: "KNX, Zigbee, Z‑Wave או שילוב — לפי בנייה חדשה או בית קיים.",
  },
] as const;

export default function AboutPage() {
  return (
    <>
      <ScrollProgress />
      <Navbar variant="solid" />
      <main id="main-content">
        {/* Full-bleed hero */}
        <section className="relative flex min-h-[72dvh] items-end overflow-hidden bg-[var(--navy)] pt-24 pb-14 text-white sm:min-h-[78dvh] sm:pt-28 sm:pb-16 md:items-center md:pt-32 md:pb-20">
          <div className="absolute inset-0 z-0" aria-hidden>
            <Image
              src={IMAGES.about.hero}
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover object-center scale-105 animate-kenburns"
            />
            <div
              className="absolute inset-0"
              style={{
                background: `
                  linear-gradient(
                    180deg,
                    rgba(5, 22, 53, 0.55) 0%,
                    rgba(5, 22, 53, 0.28) 42%,
                    rgba(5, 22, 53, 0.78) 100%
                  ),
                  linear-gradient(
                    100deg,
                    rgba(5, 22, 53, 0.72) 0%,
                    rgba(5, 22, 53, 0.25) 55%,
                    transparent 100%
                  )
                `,
              }}
            />
          </div>
          <AmbientOrbs className="z-[1] opacity-70" />
          <div className="film-grain z-[1]" aria-hidden />

          <div className="relative z-10 mx-auto w-full max-w-6xl px-3 sm:px-4 md:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65 }}
            >
              <p className="text-xs font-semibold tracking-[0.18em] text-[var(--lime-bright)] uppercase sm:text-sm sm:tracking-[0.22em]">
                אודות INOVIX
              </p>
              <h1 className="mt-3 max-w-3xl text-3xl font-extrabold leading-tight [text-shadow:0_2px_24px_rgba(5,22,53,0.55)] sm:text-4xl md:text-5xl lg:text-6xl">
                מומחים בייעוץ, תכנון וביצוע מערכות טכנולוגיה
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/90 [text-shadow:0_2px_16px_rgba(5,22,53,0.5)] sm:mt-5 sm:text-base md:text-lg">
                INOVIX נוסדה כדי לתת לבתים ולעסקים פתרון מקצועי אחד — מאבטחה
                ותקשורת, דרך אודיו וידאו, ועד בית חכם שעובד באמת.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:gap-4">
                <Magnetic strength={0.28}>
                  <Link
                    href="/#contact"
                    className="brand-gradient-bg inline-flex min-h-12 items-center justify-center rounded-full px-7 py-3.5 text-sm font-bold text-[var(--navy)] shadow-[0_12px_32px_rgba(126,211,33,0.35)] transition hover:brightness-110"
                  >
                    צרו קשר לייעוץ
                  </Link>
                </Magnetic>
                <Magnetic strength={0.22}>
                  <Link
                    href="/#features"
                    className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/35 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-white/20"
                  >
                    הפתרונות שלנו
                  </Link>
                </Magnetic>
              </div>
            </motion.div>
          </div>
          <span className="sr-only">וילה מודרנית עם בריכה ופטיו</span>
        </section>

        {/* Stats */}
        <section className="border-b border-slate-200/80 bg-[var(--surface)] py-10 sm:py-12">
          <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-3 sm:gap-8 sm:px-4 md:grid-cols-4 md:px-6 lg:px-8">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.06 }}
                className="text-center"
              >
                <p className="text-3xl font-extrabold text-[var(--navy)] sm:text-4xl">
                  <CountUp value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="mt-1.5 text-xs font-medium text-[var(--muted)] sm:text-sm">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Story */}
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
              <h2 className="mt-2 text-2xl font-extrabold text-[var(--ink)] sm:text-3xl md:text-4xl">
                טכנולוגיה מתקדמת, מהתכנון ועד לביצוע המושלם
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-[var(--muted)] sm:text-base">
                אנחנו ב־INOVIX מאמינים שבית חכם לא נמדד בכמות האפליקציות שיש לכם
                בטלפון, אלא באיכות התכנון שמחבר הכל יחד. השאיפה שלנו היא לספק
                לכם שקט תפעולי אמיתי — מערכות מתח נמוך, תשתיות תקשורת חזקות
                ופתרונות אבטחה מותאמים אישית, מקצה לקצה.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-[var(--muted)] sm:text-base">
                אנחנו עובדים עם בעלי בתים פרטיים, וילות, דירות יוקרה ועסקים —
                ומלווים כל פרויקט באופן אישי, מקצועי ושקוף. מהייעוץ הראשון ועד
                ההדרכה במסירה, אתם תמיד יודעים מה קורה ולמה.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-[var(--ink)]/80 sm:text-base">
                התוצאה: טכנולוגיה שנעלמת ברקע — ונשארת חוויה חלקה, מדויקת
                ואינטואיטיבית.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.08 }}
              className="order-1 relative aspect-[4/3] overflow-hidden md:order-2"
            >
              <Image
                src={IMAGES.about.team}
                alt="חלל פנים יוקרתי עם יציאה לבריכה"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--navy)]/35 to-transparent" />
            </motion.div>
          </div>
        </section>

        {/* Domains */}
        <section className="bg-[var(--surface)] py-14 sm:py-16 md:py-20">
          <div className="mx-auto max-w-6xl px-3 sm:px-4 md:px-6 lg:px-8">
            <motion.div
              className="mx-auto max-w-2xl text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-xs font-semibold tracking-[0.18em] text-[var(--teal)] uppercase sm:text-sm">
                תחומי המומחיות
              </p>
              <h2 className="mt-2 text-2xl font-extrabold text-[var(--ink)] sm:text-3xl md:text-4xl">
                ארבעה תחומים. מערכת אחת.
              </h2>
              <p className="mt-3 text-sm text-[var(--muted)] sm:text-base">
                כל תחום לבד חזק — יחד הם הופכים את הבית או העסק לחוויה שלמה.
              </p>
            </motion.div>

            <div className="mt-8 grid grid-cols-1 gap-3 sm:mt-10 sm:grid-cols-2 sm:gap-4">
              {SERVICES.map((s, i) => (
                <motion.div
                  key={s.slug}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.45, delay: i * 0.05 }}
                >
                  <Link
                    href={s.href}
                    className="group relative block aspect-[16/9] overflow-hidden sm:aspect-[2/1]"
                  >
                    <Image
                      src={s.image}
                      alt={s.imageAlt}
                      fill
                      sizes="(max-width: 640px) 100vw, 50vw"
                      className="object-cover transition duration-700 group-hover:scale-[1.04]"
                    />
                    <div
                      className="absolute inset-0 transition duration-500"
                      style={{
                        background:
                          "linear-gradient(100deg, rgba(5,22,53,0.85) 0%, rgba(5,22,53,0.35) 55%, rgba(5,22,53,0.2) 100%)",
                      }}
                    />
                    <div className="absolute inset-0 flex flex-col justify-end p-5 sm:p-6">
                      <p className="text-xs font-semibold tracking-[0.16em] text-[var(--lime-bright)] uppercase">
                        {s.eyebrow}
                      </p>
                      <h3 className="mt-1 text-xl font-extrabold text-white sm:text-2xl">
                        {s.title}
                      </h3>
                      <p className="mt-2 line-clamp-2 max-w-md text-sm text-white/75">
                        {s.summary}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="bg-[var(--surface-soft)] py-14 sm:py-16 md:py-20">
          <div className="mx-auto max-w-6xl px-3 sm:px-4 md:px-6 lg:px-8">
            <motion.div
              className="mx-auto max-w-2xl text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-xs font-semibold tracking-[0.18em] text-[var(--teal)] uppercase sm:text-sm">
                העקרונות שלנו
              </p>
              <h2 className="mt-2 text-2xl font-extrabold text-[var(--ink)] sm:text-3xl md:text-4xl">
                איך אנחנו חושבים על כל פרויקט
              </h2>
            </motion.div>

            <div className="mt-8 grid grid-cols-1 gap-5 sm:mt-10 sm:grid-cols-2 sm:gap-6">
              {VALUES.map((v, i) => (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.45, delay: i * 0.06 }}
                  className="border-t-2 border-[var(--teal)]/60 pt-5"
                >
                  <p className="text-xs font-bold tracking-[0.16em] text-[var(--teal)]">
                    0{i + 1}
                  </p>
                  <h3 className="mt-2 text-lg font-bold text-[var(--ink)] sm:text-xl">
                    {v.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                    {v.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="relative overflow-hidden bg-[var(--surface)] py-14 sm:py-16 md:py-20">
          <div className="mx-auto max-w-6xl px-3 sm:px-4 md:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
              className="mx-auto mb-10 max-w-4xl overflow-hidden sm:mb-12"
            >
              <div className="relative aspect-[21/9]">
                <Image
                  src={IMAGES.about.process}
                  alt="מטבח יוקרתי עם תאורה משולבת בעיצוב"
                  fill
                  sizes="(max-width: 768px) 100vw, 896px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
              </div>
            </motion.div>

            <div className="mx-auto max-w-2xl text-center">
              <p className="text-xs font-semibold tracking-[0.18em] text-[var(--teal)] uppercase sm:text-sm">
                איך אנחנו עובדים
              </p>
              <h2 className="mt-2 text-2xl font-extrabold text-[var(--ink)] sm:text-3xl md:text-4xl">
                תהליך ברור. תוצאה מדויקת.
              </h2>
            </div>

            <ol className="relative mx-auto mt-10 max-w-3xl space-y-0">
              <div
                className="pointer-events-none absolute top-3 bottom-3 right-[1.15rem] hidden w-px bg-gradient-to-b from-[var(--teal)]/50 via-[var(--teal)]/20 to-transparent sm:block"
                aria-hidden
              />
              {PROCESS.map((step, i) => (
                <motion.li
                  key={step.title}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="relative grid gap-3 border-b border-slate-200/80 py-6 last:border-b-0 sm:grid-cols-[3.5rem_1fr] sm:gap-5 sm:py-7"
                >
                  <span className="relative z-10 inline-flex h-9 w-9 items-center justify-center rounded-full bg-[var(--navy)] text-sm font-bold text-white shadow-[0_0_0_4px_var(--surface)] sm:h-10 sm:w-10">
                    {i + 1}
                  </span>
                  <div>
                    <span className="block text-base font-bold text-[var(--ink)] sm:text-lg">
                      {step.title}
                    </span>
                    <p className="mt-1.5 text-sm leading-relaxed text-[var(--muted)]">
                      {step.desc}
                    </p>
                  </div>
                </motion.li>
              ))}
            </ol>
          </div>
        </section>

        {/* Why INOVIX */}
        <section className="relative overflow-hidden bg-[var(--navy)] py-14 text-white sm:py-16 md:py-20">
          <AmbientOrbs />
          <div className="film-grain" aria-hidden />
          <div className="relative mx-auto max-w-6xl px-3 sm:px-4 md:px-6 lg:px-8">
            <motion.div
              className="mx-auto max-w-2xl text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-xs font-semibold tracking-[0.18em] text-[var(--lime-bright)] uppercase sm:text-sm">
                למה INOVIX
              </p>
              <h2 className="mt-2 text-2xl font-extrabold sm:text-3xl md:text-4xl">
                שותפים לפרויקט — לא רק מתקינים
              </h2>
            </motion.div>

            <div className="mt-8 grid grid-cols-1 gap-6 sm:mt-10 sm:grid-cols-3 sm:gap-8">
              {WHY.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.08 }}
                  className="border-t border-white/20 pt-5"
                >
                  <h3 className="text-lg font-bold text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/70">
                    {item.body}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="relative overflow-hidden bg-[var(--surface-soft)] py-14 text-center sm:py-16 md:py-20">
          <div className="mx-auto max-w-2xl px-3 sm:px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
            >
              <h2 className="text-2xl font-extrabold text-[var(--ink)] sm:text-3xl">
                מוכנים לפרויקט הבא שלכם?
              </h2>
              <p className="mt-3 text-sm text-[var(--muted)] sm:text-base">
                בואו נדבר על הבית או העסק — ונבנה יחד מערכת שתעבוד בשבילכם.
              </p>
              <Magnetic className="mt-6 inline-block" strength={0.3}>
                <Link
                  href="/#contact"
                  className="brand-gradient-bg inline-flex min-h-12 items-center justify-center rounded-full px-8 py-3.5 text-sm font-bold text-[var(--navy)] shadow-[0_12px_32px_rgba(126,211,33,0.3)] transition hover:brightness-110"
                >
                  השאירו פרטים לייעוץ
                </Link>
              </Magnetic>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
