"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { CONTACT } from "@/lib/contact";

const DEFAULT_MESSAGE =
  "שלום INOVIX, אשמח לייעוץ לגבי מערכות לבית / לעסק";

type WhatsAppFabProps = {
  /** Prefill message for wa.me */
  message?: string;
};

export default function WhatsAppFab({
  message = DEFAULT_MESSAGE,
}: WhatsAppFabProps) {
  const reduce = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const [tip, setTip] = useState(false);

  const href = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(message)}`;

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 280);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!visible || reduce) return;
    const show = window.setTimeout(() => setTip(true), 1400);
    const hide = window.setTimeout(() => setTip(false), 7000);
    return () => {
      window.clearTimeout(show);
      window.clearTimeout(hide);
    };
  }, [visible, reduce]);

  return (
    <div className="pointer-events-none fixed bottom-4 end-4 z-[95] flex flex-col items-end gap-2 sm:bottom-6 sm:end-6">
      <AnimatePresence>
        {visible && tip && (
          <motion.p
            key="wa-tip"
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.96 }}
            transition={{ duration: 0.35 }}
            className="pointer-events-none relative max-w-[12.5rem] rounded-2xl bg-white px-3.5 py-2.5 text-center text-xs font-semibold leading-snug text-[var(--ink)] shadow-[0_12px_32px_rgba(5,22,53,0.22)]"
          >
            דברו איתנו בוואטסאפ
            <span
              className="absolute -bottom-1.5 end-6 h-3 w-3 rotate-45 bg-white"
              aria-hidden
            />
          </motion.p>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {visible && (
          <motion.a
            key="wa-fab"
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="שלחו הודעה ב־WhatsApp"
            className="pointer-events-auto relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_12px_32px_rgba(37,211,102,0.45)] transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366] sm:h-16 sm:w-16"
            initial={{ opacity: 0, scale: 0.6, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.7, y: 12 }}
            transition={{ type: "spring", stiffness: 380, damping: 22 }}
            whileHover={reduce ? undefined : { scale: 1.06 }}
            whileTap={reduce ? undefined : { scale: 0.94 }}
          >
            {!reduce && (
              <span
                className="whatsapp-pulse absolute inset-0 rounded-full bg-[#25D366]"
                aria-hidden
              />
            )}
            <WhatsAppIcon className="relative z-10 h-7 w-7 sm:h-8 sm:w-8" />
          </motion.a>
        )}
      </AnimatePresence>
    </div>
  );
}

function WhatsAppIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M12.04 2C6.58 2 2.15 6.4 2.15 11.84c0 1.95.55 3.8 1.52 5.38L2 22l4.94-1.62a9.93 9.93 0 0 0 5.1 1.38h.01c5.46 0 9.89-4.4 9.89-9.84C21.94 6.4 17.5 2 12.04 2Zm5.78 13.94c-.24.68-1.4 1.25-1.94 1.33-.5.07-1.13.1-1.82-.11-.42-.13-.96-.31-1.65-.61-2.9-1.26-4.79-4.19-4.93-4.38-.14-.19-1.15-1.53-1.15-2.92 0-1.39.73-2.07.99-2.35.26-.28.57-.35.76-.35h.55c.17 0 .4-.07.63.48.24.57.81 1.98.88 2.12.07.14.12.31.02.5-.1.19-.14.31-.28.48-.14.17-.3.37-.42.5-.14.14-.28.29-.12.56.16.28.71 1.17 1.52 1.9 1.05.93 1.93 1.22 2.2 1.36.28.14.44.12.6-.07.17-.19.7-.81.89-1.09.19-.28.38-.23.63-.14.26.1 1.64.77 1.92.91.28.14.47.21.54.33.07.12.07.69-.17 1.37Z" />
    </svg>
  );
}
