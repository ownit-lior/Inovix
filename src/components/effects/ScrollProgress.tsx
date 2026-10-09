"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    mass: 0.35,
  });

  return (
    <motion.div
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[2.5px] origin-right bg-transparent"
      aria-hidden
    >
      <motion.div
        className="h-full origin-right"
        style={{
          scaleX,
          background:
            "linear-gradient(90deg, #7ed321 0%, #3db89a 45%, #2a7a9b 100%)",
        }}
      />
    </motion.div>
  );
}
