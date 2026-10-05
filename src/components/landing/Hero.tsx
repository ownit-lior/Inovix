"use client";

import Image from "next/image";
import { useRef, type MouseEvent } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

import { IMAGES } from "@/lib/images";

const HERO_IMAGE = IMAGES.home.hero;

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const scrollY = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", reduce ? "0%" : "12%"],
  );

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 90, damping: 22, mass: 0.4 });
  const springY = useSpring(mouseY, { stiffness: 90, damping: 22, mass: 0.4 });

  const titleX = useTransform(springX, [-0.5, 0.5], reduce ? [0, 0] : [12, -12]);
  const titleY = useTransform(springY, [-0.5, 0.5], reduce ? [0, 0] : [8, -8]);
  const subX = useTransform(springX, [-0.5, 0.5], reduce ? [0, 0] : [7, -7]);
  const subY = useTransform(springY, [-0.5, 0.5], reduce ? [0, 0] : [5, -5]);
  const ctaX = useTransform(springX, [-0.5, 0.5], reduce ? [0, 0] : [4, -4]);
  const ctaY = useTransform(springY, [-0.5, 0.5], reduce ? [0, 0] : [3, -3]);
  const brandX = useTransform(springX, [-0.5, 0.5], reduce ? [0, 0] : [9, -9]);
  const brandY = useTransform(springY, [-0.5, 0.5], reduce ? [0, 0] : [6, -6]);

  const onMouseMove = (e: MouseEvent<HTMLElement>) => {
    if (reduce || !ref.current) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const rect = ref.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const onMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const titleFilter = useMotionTemplate`drop-shadow(0 2px 3px rgba(5,22,53,0.45)) drop-shadow(0 14px 36px rgba(5,22,53,0.4))`;

  return (
    <section
      id="hero"
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="relative flex min-h-[100dvh] items-end overflow-hidden bg-[var(--navy)] px-0 pb-14 pt-24 sm:pb-20 sm:pt-28 md:items-center md:pb-28 md:pt-32"
    >
      <motion.div
        className="absolute inset-0 z-0 overflow-hidden"
        style={{ y: scrollY }}
        aria-hidden
      >
        <motion.div
          className="absolute inset-[-5%]"
          animate={
            reduce
              ? { scale: 1.03 }
              : {
                  scale: [1.03, 1.09, 1.03],
                  x: ["0%", "-0.8%", "0%"],
                  y: ["0%", "0.6%", "0%"],
                }
          }
          transition={
            reduce
              ? undefined
              : { duration: 34, repeat: Infinity, ease: "easeInOut" }
          }
        >
          <Image
            src={`${HERO_IMAGE}?v=5`}
            alt="וילה יוקרתית עם בריכה בתאורת ערב"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[58%_42%] sm:object-center"
          />
        </motion.div>

        {/* Soft brand wash — keeps pool teal visible, lifts title on dark stone */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(
                180deg,
                rgba(5, 22, 53, 0.62) 0%,
                rgba(5, 22, 53, 0.22) 36%,
                rgba(5, 22, 53, 0.34) 58%,
                rgba(5, 22, 53, 0.78) 100%
              ),
              linear-gradient(
                100deg,
                rgba(5, 22, 53, 0.72) 0%,
                rgba(5, 22, 53, 0.28) 40%,
                rgba(42, 146, 155, 0.16) 72%,
                transparent 100%
              ),
              radial-gradient(
                70% 55% at 78% 58%,
                rgba(42, 146, 155, 0.22) 0%,
                transparent 68%
              )
            `,
          }}
        />
      </motion.div>

      <div className="relative z-10 mx-auto w-full max-w-6xl px-3 sm:px-4 md:px-6 lg:px-8">
        <motion.div
          style={{ x: brandX, y: brandY }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.08 }}
        >
          <p className="text-[1.65rem] font-extrabold tracking-[0.18em] text-white [text-shadow:0_2px_22px_rgba(5,22,53,0.75)] sm:text-3xl sm:tracking-[0.22em] md:text-4xl">
            INOVIX
          </p>
          <p className="mt-2 text-xs font-semibold tracking-[0.2em] text-[var(--lime-bright)] uppercase [text-shadow:0_1px_12px_rgba(5,22,53,0.7)] sm:text-sm sm:tracking-[0.26em]">
            ייעוץ · תכנון · ביצוע
          </p>
        </motion.div>

        <motion.h1
          className="mt-5 max-w-3xl text-[1.85rem] leading-[1.2] font-extrabold text-white sm:mt-6 sm:text-4xl sm:leading-[1.15] md:text-5xl lg:text-6xl"
          style={{ x: titleX, y: titleY, filter: titleFilter }}
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.18 }}
        >
          טכנולוגיה מתקדמת,
          <br className="hidden sm:block" />{" "}
          <span className="text-[var(--lime-bright)]">
            מהתכנון ועד לביצוע המושלם.
          </span>
        </motion.h1>

        <motion.p
          className="mt-4 max-w-xl text-[0.95rem] leading-relaxed text-white/92 [text-shadow:0_2px_16px_rgba(5,22,53,0.6)] sm:mt-5 sm:text-base md:text-lg"
          style={{ x: subX, y: subY }}
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.32 }}
        >
          מערכות מתח נמוך, אודיו־וידאו, תקשורת ובית חכם בסטנדרט הגבוה ביותר.
        </motion.p>

        <motion.div
          className="mt-7 flex w-full flex-col gap-3 sm:mt-9 sm:w-auto sm:flex-row sm:items-center sm:gap-4"
          style={{ x: ctaX, y: ctaY }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
        >
          <a
            href="#contact"
            className="brand-gradient-bg inline-flex min-h-12 w-full items-center justify-center rounded-full px-8 py-3.5 text-sm font-bold text-[var(--navy)] shadow-[0_12px_32px_rgba(126,211,33,0.32)] transition hover:brightness-110 sm:w-auto"
          >
            דברו איתנו לייעוץ
          </a>
          <a
            href="/tour"
            className="inline-flex min-h-12 w-full items-center justify-center rounded-full border border-white/40 bg-[rgba(5,22,53,0.4)] px-8 py-3.5 text-sm font-semibold text-white backdrop-blur-[2px] transition hover:border-[var(--lime)]/60 hover:bg-[rgba(5,22,53,0.55)] sm:w-auto"
          >
            סיור תלת־ממד
          </a>
        </motion.div>
      </div>

      <motion.div
        className="pointer-events-none absolute bottom-5 left-1/2 z-10 hidden -translate-x-1/2 md:block"
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{
          opacity: { delay: 1.1, duration: 0.6 },
          y: { delay: 1.1, duration: 1.8, repeat: Infinity, ease: "easeInOut" },
        }}
      >
        <div className="h-8 w-px bg-gradient-to-b from-transparent via-[var(--lime)]/70 to-transparent" />
      </motion.div>
    </section>
  );
}
