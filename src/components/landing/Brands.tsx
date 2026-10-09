"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ALL_BRANDS, type Brand } from "@/lib/brands";

/** Enough copies for a seamless loop on wide screens */
const LOOP = [...ALL_BRANDS, ...ALL_BRANDS, ...ALL_BRANDS];

function LogoSlide({ brand, keyId }: { brand: Brand; keyId: string }) {
  return (
    <li
      key={keyId}
      className="flex h-16 w-[160px] shrink-0 items-center justify-center sm:h-[4.5rem] sm:w-[180px] md:w-[200px]"
    >
      <div className="brand-band-logo flex h-full w-[92%] items-center justify-center rounded-2xl border px-4 shadow-[0_8px_24px_rgba(0,0,0,0.2)] transition duration-300 hover:shadow-[0_12px_28px_rgba(42,146,155,0.25)]">
        <Image
          src={brand.logo}
          alt={brand.name}
          width={220}
          height={72}
          className="max-h-9 w-auto max-w-[130px] object-contain opacity-90 transition duration-300 hover:opacity-100 sm:max-h-10 sm:max-w-[150px]"
        />
      </div>
    </li>
  );
}

export default function Brands() {
  const reduce = useReducedMotion();
  const [paused, setPaused] = useState(false);

  return (
    <section
      id="brands"
      className="relative overflow-hidden pb-16 pt-2 sm:pb-20 sm:pt-4 md:pb-24"
      aria-labelledby="brands-heading"
    >
      <div className="relative mx-auto max-w-6xl px-3 sm:px-4 md:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55 }}
          className="text-center"
        >
          <p className="text-xs font-semibold tracking-[0.18em] text-[var(--lime-bright)] uppercase sm:text-sm sm:tracking-[0.22em]">
            שותפים ומותגים
          </p>
          <h2
            id="brands-heading"
            className="mt-2 text-2xl font-extrabold text-white sm:mt-3 sm:text-3xl"
          >
            המותגים שאנחנו עובדים איתם
          </h2>
          <div className="mx-auto mt-4 h-px w-14 bg-[var(--lime)]/70" />
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/70 sm:text-base">
            ציוד קצה ותשתיות מהמותגים המובילים בעולם — אבטחה, תקשורת, אודיו
            וידאו, חשמל ובית חכם.
          </p>
        </motion.div>
      </div>

      <motion.div
        className="relative mt-10 sm:mt-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.55, delay: 0.1 }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
            setPaused(false);
          }
        }}
      >
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 sm:w-20 md:w-28"
          style={{
            background:
              "linear-gradient(to right, var(--navy) 0%, rgba(5,22,53,0) 100%)",
          }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 sm:w-20 md:w-28"
          style={{
            background:
              "linear-gradient(to left, var(--navy) 0%, rgba(5,22,53,0) 100%)",
          }}
          aria-hidden
        />

        {reduce ? (
          <ul className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-3 gap-y-3 px-4">
            {ALL_BRANDS.map((brand) => (
              <LogoSlide key={brand.name} brand={brand} keyId={brand.name} />
            ))}
          </ul>
        ) : (
          <div className="overflow-hidden py-2" dir="ltr">
            <ul
              className="brand-marquee flex w-max items-center gap-2 sm:gap-3"
              style={{
                animationPlayState: paused ? "paused" : "running",
              }}
              aria-label="קרוסלת מותגים"
            >
              {LOOP.map((brand, i) => (
                <LogoSlide
                  key={`${brand.name}-${i}`}
                  brand={brand}
                  keyId={`${brand.name}-${i}`}
                />
              ))}
            </ul>
          </div>
        )}
      </motion.div>
    </section>
  );
}
