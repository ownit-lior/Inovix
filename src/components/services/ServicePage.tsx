"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import type { Service, ServiceHighlightIcon } from "@/lib/services";
import { getOtherServices } from "@/lib/services";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

function HighlightIcon({
  icon,
  className = "h-4 w-4",
}: {
  icon: ServiceHighlightIcon;
  className?: string;
}) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className,
    "aria-hidden": true as const,
  };

  switch (icon) {
    case "phone":
      return (
        <svg {...common}>
          <rect x="7" y="2.5" width="10" height="19" rx="2" />
          <path d="M10 18.5h4" />
        </svg>
      );
    case "eye":
      return (
        <svg {...common}>
          <path d="M2 12s3.5-6.5 10-6.5S22 12 22 12s-3.5 6.5-10 6.5S2 12 2 12Z" />
          <circle cx="12" cy="12" r="2.5" />
        </svg>
      );
    case "home":
      return (
        <svg {...common}>
          <path d="M3 10.5 12 3l9 7.5V21a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1v-10.5Z" />
        </svg>
      );
    case "plan":
      return (
        <svg {...common}>
          <path d="M8 4h9a2 2 0 0 1 2 2v14l-3-2-3 2-3-2-3 2V6a2 2 0 0 1 2-2Z" />
          <path d="M10 9h6M10 13h6" />
        </svg>
      );
    case "wifi":
      return (
        <svg {...common}>
          <path d="M5 12.5a9 9 0 0 1 14 0" />
          <path d="M8.5 15.5a4.5 4.5 0 0 1 7 0" />
          <circle cx="12" cy="19" r="1.2" fill="currentColor" stroke="none" />
        </svg>
      );
    case "rack":
      return (
        <svg {...common}>
          <rect x="4" y="4" width="16" height="5" rx="1" />
          <rect x="4" y="10.5" width="16" height="5" rx="1" />
          <rect x="4" y="17" width="16" height="3" rx="1" />
        </svg>
      );
    case "devices":
      return (
        <svg {...common}>
          <rect x="3" y="5" width="12" height="9" rx="1.5" />
          <rect x="14" y="11" width="7" height="8" rx="1.2" />
          <path d="M7 17h4" />
        </svg>
      );
    case "shield":
      return (
        <svg {...common}>
          <path d="M12 3 4 7v5c0 5 3.5 8.5 8 9 4.5-.5 8-4 8-9V7l-8-4Z" />
        </svg>
      );
    case "cinema":
      return (
        <svg {...common}>
          <rect x="3" y="6" width="18" height="12" rx="2" />
          <path d="M8 21h8" />
        </svg>
      );
    case "outdoor":
      return (
        <svg {...common}>
          <path d="M4 20h16" />
          <path d="M6 20V10l6-5 6 5v10" />
          <path d="M10 20v-5h4v5" />
        </svg>
      );
    case "speaker":
      return (
        <svg {...common}>
          <path d="M11 5 6 9H3v6h3l5 4V5Z" />
          <path d="M15.5 8.5a4.5 4.5 0 0 1 0 7" />
          <path d="M18.5 6a8 8 0 0 1 0 12" />
        </svg>
      );
    case "office":
      return (
        <svg {...common}>
          <rect x="4" y="3" width="16" height="18" rx="1.5" />
          <path d="M8 8h3M13 8h3M8 12h3M13 12h3M8 16h8" />
        </svg>
      );
    case "knx":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="3" />
          <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1" />
        </svg>
      );
    case "zigbee":
      return (
        <svg {...common}>
          <path d="M7 7h10l-10 10h10" />
        </svg>
      );
    case "zwave":
      return (
        <svg {...common}>
          <path d="M4 8c4-5 12-5 16 0" />
          <path d="M7 12c3-3.5 7-3.5 10 0" />
          <path d="M10 16c1.5-1.5 2.5-1.5 4 0" />
        </svg>
      );
    case "control":
      return (
        <svg {...common}>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="M8 12h.01M12 12h.01M16 12h.01" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="3" />
        </svg>
      );
  }
}

export default function ServicePage({ service }: { service: Service }) {
  const others = getOtherServices(service.slug);

  return (
    <>
      <Navbar variant="solid" />
      <main id="main-content">
        {/* Hero — full-bleed image across the header */}
        <section className="relative flex min-h-[70dvh] items-end overflow-hidden bg-[var(--navy)] pt-24 pb-14 text-white sm:min-h-[75dvh] sm:pt-28 sm:pb-16 md:items-center md:pt-32 md:pb-20">
          <div className="absolute inset-0 z-0" aria-hidden>
            <Image
              src={service.image}
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
                  linear-gradient(
                    180deg,
                    rgba(5, 22, 53, 0.55) 0%,
                    rgba(5, 22, 53, 0.28) 42%,
                    rgba(5, 22, 53, 0.72) 100%
                  ),
                  linear-gradient(
                    100deg,
                    rgba(5, 22, 53, 0.7) 0%,
                    rgba(5, 22, 53, 0.25) 55%,
                    transparent 100%
                  )
                `,
              }}
            />
          </div>
          <div className="relative z-10 mx-auto w-full max-w-6xl px-3 sm:px-4 md:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-xs font-semibold tracking-[0.18em] text-[var(--lime-bright)] uppercase sm:text-sm sm:tracking-[0.22em]">
                {service.eyebrow}
              </p>
              <h1 className="mt-3 max-w-3xl text-3xl font-extrabold leading-tight [text-shadow:0_2px_24px_rgba(5,22,53,0.55)] sm:text-4xl md:text-5xl lg:text-6xl">
                {service.title}
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/90 [text-shadow:0_2px_16px_rgba(5,22,53,0.5)] sm:mt-5 sm:text-base md:text-lg">
                {service.heroLead}
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:gap-4">
                <Link
                  href="/#contact"
                  className="brand-gradient-bg inline-flex min-h-12 items-center justify-center rounded-full px-7 py-3.5 text-sm font-bold text-[var(--navy)] shadow-[0_12px_32px_rgba(126,211,33,0.35)] transition hover:brightness-110"
                >
                  צרו קשר לייעוץ
                </Link>
                <Link
                  href="/#features"
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/35 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-white/20"
                >
                  לכל התחומים
                </Link>
              </div>
            </motion.div>
          </div>
          <span className="sr-only">{service.imageAlt}</span>
        </section>

        {/* Overview */}
        <section className="bg-[var(--surface-soft)] py-14 sm:py-16 md:py-20">
          <div className="mx-auto grid max-w-6xl gap-8 px-3 sm:gap-10 sm:px-4 md:grid-cols-2 md:gap-14 md:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55 }}
            >
              <p className="text-xs font-semibold tracking-[0.18em] text-[var(--teal)] uppercase sm:text-sm">
                הסקירה
              </p>
              <h2 className="mt-2 text-2xl font-extrabold text-[var(--ink)] sm:text-3xl">
                {service.overviewTitle ?? "חוויה יוקרתית. ביצוע מדויק."}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[var(--muted)] sm:mt-4 sm:text-base">
                {service.summary}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-[var(--ink)]/80 sm:text-base">
                {service.audience}
              </p>
            </motion.div>

            <motion.ul
              className="space-y-3"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55, delay: 0.08 }}
            >
              {service.highlights.map((item) => (
                <li
                  key={item.text}
                  className="flex items-center gap-3 rounded-2xl border border-slate-200/80 bg-white px-4 py-3.5 shadow-[0_8px_30px_rgba(15,23,42,0.04)] sm:px-5"
                >
                  <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[var(--teal)]/10 text-[var(--teal)]">
                    <HighlightIcon icon={item.icon} />
                  </span>
                  <span className="text-sm font-medium text-[var(--ink)] sm:text-[0.95rem]">
                    {item.text}
                  </span>
                </li>
              ))}
            </motion.ul>
          </div>
        </section>

        {/* Offerings */}
        <section className="bg-white py-14 sm:py-16 md:py-20">
          <div className="mx-auto max-w-6xl px-3 sm:px-4 md:px-6 lg:px-8">
            <motion.div
              className="mx-auto max-w-2xl text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-xs font-semibold tracking-[0.18em] text-[var(--teal)] uppercase sm:text-sm">
                נושאים בתחום
              </p>
              <h2 className="mt-2 text-2xl font-extrabold text-[var(--ink)] sm:text-3xl md:text-4xl">
                מה כלול ב{service.title}
              </h2>
            </motion.div>

            <div
              className={[
                "mt-8 grid grid-cols-1 gap-4 sm:mt-10 sm:gap-5",
                service.offerings.some((o) => o.image)
                  ? service.offerings.length === 3
                    ? "md:grid-cols-3"
                    : "md:grid-cols-2"
                  : "md:grid-cols-2",
              ].join(" ")}
            >
              {service.offerings.map((item, i) => {
                const href = item.topicSlug
                  ? `${service.href}/${item.topicSlug}`
                  : undefined;
                const body = (
                  <>
                    {item.image && (
                      <div
                        className={`relative aspect-[4/3] overflow-hidden ${
                          item.imageFit === "contain"
                            ? "bg-white"
                            : "bg-slate-200"
                        }`}
                      >
                        <Image
                          src={item.image}
                          alt={item.imageAlt ?? item.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className={
                            item.imageFit === "contain"
                              ? "object-contain transition duration-500 group-hover:scale-[1.03]"
                              : "object-cover transition duration-500 group-hover:scale-[1.03]"
                          }
                        />
                      </div>
                    )}
                    <div className="p-5 sm:p-6">
                      <h3 className="text-base font-bold text-[var(--ink)] sm:text-lg">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                        {item.desc}
                      </p>
                      {href ? (
                        <p className="mt-3 text-sm font-semibold text-[var(--teal)]">
                          לדף המלא ←
                        </p>
                      ) : null}
                    </div>
                  </>
                );

                return (
                  <motion.article
                    key={item.title}
                    initial={{ opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.5, delay: i * 0.06 }}
                    className="overflow-hidden rounded-2xl border border-slate-200/80 bg-[var(--surface-soft)]"
                  >
                    {href ? (
                      <Link href={href} className="group block h-full">
                        {body}
                      </Link>
                    ) : (
                      body
                    )}
                  </motion.article>
                );
              })}
            </div>
          </div>
        </section>

        {/* Ecosystem — security (and any service with ecosystem) */}
        {service.ecosystem && (
          <section className="relative overflow-hidden bg-[var(--navy)] py-14 text-white sm:py-16 md:py-20">
            <div
              className="pointer-events-none absolute inset-0 opacity-60"
              style={{
                background: `
                  radial-gradient(circle at 15% 30%, rgba(126,211,33,0.18), transparent 40%),
                  radial-gradient(circle at 90% 70%, rgba(42,146,155,0.28), transparent 45%)
                `,
              }}
              aria-hidden
            />
            <div className="relative mx-auto max-w-6xl px-3 sm:px-4 md:px-6 lg:px-8">
              <motion.div
                className="mx-auto max-w-3xl text-center"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.55 }}
              >
                <p className="text-xs font-semibold tracking-[0.18em] text-[var(--lime-bright)] uppercase sm:text-sm">
                  {service.ecosystem.eyebrow}
                </p>
                <h2 className="mt-3 text-2xl font-extrabold leading-tight sm:text-3xl md:text-4xl">
                  {service.ecosystem.title}
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-white/80 sm:mt-5 sm:text-base md:text-lg">
                  {service.ecosystem.body}
                </p>
                <Link
                  href="/services/smart-home"
                  className="mt-7 inline-flex min-h-12 items-center justify-center rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/18"
                >
                  לעמוד חשמל ובית חכם
                </Link>
              </motion.div>
            </div>
          </section>
        )}

        {/* Related + CTA */}
        <section className="bg-[var(--surface-soft)] py-14 sm:py-16 md:py-20">
          <div className="mx-auto max-w-6xl px-3 sm:px-4 md:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-2xl font-extrabold text-[var(--ink)] sm:text-3xl">
                תחומים נוספים
              </h2>
              <p className="mt-2 text-sm text-[var(--muted)] sm:text-base">
                כל המערכות עובדות יחד — בחר תחום נוסף להעמקה.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {others.map((s) => (
                <Link
                  key={s.slug}
                  href={s.href}
                  className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:border-[var(--teal)]/40 hover:shadow-[0_12px_36px_rgba(15,23,42,0.06)]"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-200">
                    <Image
                      src={s.image}
                      alt={s.imageAlt}
                      fill
                      sizes="(max-width: 640px) 100vw, 33vw"
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5">
                    <p className="text-xs font-semibold tracking-[0.14em] text-[var(--teal)] uppercase">
                      {s.eyebrow}
                    </p>
                    <h3 className="mt-2 text-lg font-bold text-[var(--ink)]">
                      {s.title}
                    </h3>
                    <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-[var(--muted)]">
                      {s.summary}
                    </p>
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-10 rounded-3xl bg-[var(--navy)] px-5 py-10 text-center text-white sm:mt-12 sm:px-8 md:py-12">
              <h2 className="text-2xl font-extrabold sm:text-3xl">
                מוכנים להתחיל בייעוץ?
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-sm text-white/75 sm:text-base">
                נבין את הצרכים של הבית או העסק — ונציע תכנון וביצוע מדויקים בתחום{" "}
                {service.shortTitle}.
              </p>
              <Link
                href="/#contact"
                className="brand-gradient-bg mt-6 inline-flex min-h-12 items-center justify-center rounded-full px-8 py-3.5 text-sm font-bold text-[var(--navy)] transition hover:brightness-110"
              >
                השאירו פרטים לייעוץ
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
