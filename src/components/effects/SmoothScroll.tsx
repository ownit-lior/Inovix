"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import { useReducedMotion } from "framer-motion";

type SmoothScrollProps = {
  children: ReactNode;
};

/**
 * Buttery homepage scrolling via Lenis.
 * Honors prefers-reduced-motion and the site a11y reduce-motion toggle.
 */
export default function SmoothScroll({ children }: SmoothScrollProps) {
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;

    const prefersReduce = () =>
      document.documentElement.classList.contains("a11y-reduce-motion");

    if (prefersReduce()) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.15,
    });

    let raf = 0;
    const loop = (time: number) => {
      if (prefersReduce()) {
        lenis.stop();
      } else {
        lenis.start();
        lenis.raf(time);
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const anchor = target?.closest?.('a[href^="#"]') as HTMLAnchorElement | null;
      if (!anchor) return;
      const id = anchor.getAttribute("href")?.slice(1);
      if (!id) return;
      const el = document.getElementById(id);
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el, { offset: -8, duration: 1.25 });
    };
    document.addEventListener("click", onClick);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("click", onClick);
      lenis.destroy();
    };
  }, [reduce]);

  return <>{children}</>;
}
