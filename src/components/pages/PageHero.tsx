"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  lead: string;
  image?: { src: string; alt: string };
  cta?: { href: string; label: string };
  secondaryCta?: { href: string; label: string };
};

export default function PageHero({
  eyebrow,
  title,
  lead,
  image,
  cta,
  secondaryCta,
}: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-[var(--navy)] pt-24 pb-14 text-white sm:pt-28 sm:pb-16 md:pt-32 md:pb-20">
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background: `
            radial-gradient(circle at 20% 20%, rgba(126,211,33,0.22), transparent 42%),
            radial-gradient(circle at 85% 70%, rgba(42,146,155,0.28), transparent 45%)
          `,
        }}
        aria-hidden
      />
      <div className="relative mx-auto max-w-6xl px-3 sm:px-4 md:px-6 lg:px-8">
        <div className={image ? "grid items-center gap-8 md:grid-cols-2 md:gap-12" : ""}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xs font-semibold tracking-[0.18em] text-[var(--lime-bright)] uppercase sm:text-sm sm:tracking-[0.22em]">
              {eyebrow}
            </p>
            <h1 className="mt-3 max-w-3xl text-3xl font-extrabold leading-tight sm:text-4xl md:text-5xl lg:text-6xl">
              {title}
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/85 sm:mt-5 sm:text-base md:text-lg">
              {lead}
            </p>
            {(cta || secondaryCta) && (
              <div className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:gap-4">
                {cta && (
                  <Link
                    href={cta.href}
                    className="brand-gradient-bg inline-flex min-h-12 items-center justify-center rounded-full px-7 py-3.5 text-sm font-bold text-[var(--navy)] shadow-[0_12px_32px_rgba(126,211,33,0.35)] transition hover:brightness-110"
                  >
                    {cta.label}
                  </Link>
                )}
                {secondaryCta && (
                  <Link
                    href={secondaryCta.href}
                    className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/35 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-white/20"
                  >
                    {secondaryCta.label}
                  </Link>
                )}
              </div>
            )}
          </motion.div>

          {image && (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.65, delay: 0.1 }}
              className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/15 shadow-[0_24px_60px_rgba(0,0,0,0.35)] md:aspect-[5/4]"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--navy)]/40 to-transparent" />
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
