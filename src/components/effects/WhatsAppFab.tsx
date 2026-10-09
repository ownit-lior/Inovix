"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { CONTACT } from "@/lib/contact";

const DEFAULT_MESSAGE =
  "שלום INOVIX, אשמח לייעוץ לגבי מערכות לבית / לעסק";

type WhatsAppFabProps = {
  message?: string;
};

/**
 * WhatsApp FAB on the physical right — opens a chat window first,
 * then continues to WhatsApp (Ginnie-style lead chat).
 */
export default function WhatsAppFab({
  message = DEFAULT_MESSAGE,
}: WhatsAppFabProps) {
  const reduce = useReducedMotion();
  const panelId = useId();
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");
  const panelRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    const t = window.setTimeout(() => nameRef.current?.focus(), 180);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      const t = e.target as Node;
      if (panelRef.current?.contains(t)) return;
      const fab = document.getElementById("inovix-wa-fab");
      if (fab?.contains(t)) return;
      setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  const openWhatsApp = (text: string) => {
    const url = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setOpen(false);
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const parts = [
      message,
      name.trim() ? `שם: ${name.trim()}` : "",
      phone.trim() ? `טלפון: ${phone.trim()}` : "",
      note.trim() ? `הודעה: ${note.trim()}` : "",
    ].filter(Boolean);
    openWhatsApp(parts.join("\n"));
  };

  if (!mounted) return null;

  return (
    <div className="pointer-events-none fixed bottom-4 right-4 z-[95] flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      <AnimatePresence>
        {open && (
          <motion.div
            key="wa-panel"
            ref={panelRef}
            id={panelId}
            role="dialog"
            aria-modal="true"
            aria-label="צ׳אט WhatsApp עם INOVIX"
            initial={
              reduce
                ? { opacity: 0 }
                : { opacity: 0, y: 24, scale: 0.94 }
            }
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={
              reduce
                ? { opacity: 0 }
                : { opacity: 0, y: 16, scale: 0.96 }
            }
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-auto w-[min(22rem,calc(100vw-2rem))] overflow-hidden rounded-2xl border border-black/5 bg-white shadow-[0_20px_50px_rgba(5,22,53,0.28)]"
          >
            {/* Header */}
            <div className="flex items-center justify-between gap-3 bg-[#075E54] px-4 py-3 text-white">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#25D366] text-sm font-extrabold text-white">
                  IN
                </span>
                <div>
                  <p className="text-sm font-bold leading-tight">INOVIX</p>
                  <p className="text-[0.7rem] text-white/75">בדרך כלל עונים מהר</p>
                </div>
              </div>
              <button
                type="button"
                aria-label="סגור חלון"
                className="flex h-8 w-8 items-center justify-center rounded-full text-white/80 transition hover:bg-white/10 hover:text-white"
                onClick={() => setOpen(false)}
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                  <path d="M6 6l12 12M18 6 6 18" />
                </svg>
              </button>
            </div>

            {/* Chat body */}
            <div className="space-y-3 bg-[#ECE5DD] px-3 py-4">
              <div className="max-w-[90%] rounded-2xl rounded-tr-sm bg-white px-3.5 py-2.5 text-sm leading-relaxed text-[var(--ink)] shadow-sm">
                שלום 👋
                <br />
                איך נוכל לעזור לכם היום? השאירו פרטים ונמשיך יחד בוואטסאפ.
              </div>

              <form onSubmit={onSubmit} className="space-y-2.5 rounded-2xl bg-white p-3 shadow-sm">
                <label className="block">
                  <span className="sr-only">שם מלא</span>
                  <input
                    ref={nameRef}
                    type="text"
                    name="name"
                    autoComplete="name"
                    placeholder="שם מלא"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-[var(--surface-soft)] px-3 py-2.5 text-sm text-[var(--ink)] outline-none transition focus:border-[var(--teal)]"
                  />
                </label>
                <label className="block">
                  <span className="sr-only">טלפון</span>
                  <input
                    type="tel"
                    name="phone"
                    autoComplete="tel"
                    inputMode="tel"
                    dir="ltr"
                    placeholder="מספר טלפון"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-[var(--surface-soft)] px-3 py-2.5 text-sm text-[var(--ink)] outline-none transition focus:border-[var(--teal)]"
                  />
                </label>
                <label className="block">
                  <span className="sr-only">הודעה</span>
                  <textarea
                    name="note"
                    rows={2}
                    placeholder="במה נוכל לעזור? (אופציונלי)"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    className="w-full resize-none rounded-xl border border-slate-200 bg-[var(--surface-soft)] px-3 py-2.5 text-sm text-[var(--ink)] outline-none transition focus:border-[var(--teal)]"
                  />
                </label>
                <button
                  type="submit"
                  className="flex w-full min-h-11 items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 py-2.5 text-sm font-bold text-white transition hover:brightness-110"
                >
                  <WhatsAppIcon className="h-5 w-5" />
                  המשך לוואטסאפ
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        id="inovix-wa-fab"
        type="button"
        aria-label={open ? "סגור צ׳אט WhatsApp" : "פתח צ׳אט WhatsApp"}
        aria-expanded={open}
        aria-controls={panelId}
        className="pointer-events-auto relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_12px_36px_rgba(37,211,102,0.5)] transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366] sm:h-[3.75rem] sm:w-[3.75rem]"
        initial={{ opacity: 0, scale: 0.55, y: 18 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 380, damping: 22, delay: 0.35 }}
        whileHover={reduce ? undefined : { scale: 1.07 }}
        whileTap={reduce ? undefined : { scale: 0.94 }}
        onClick={() => setOpen((v) => !v)}
      >
        {!reduce && !open && (
          <>
            <span
              className="whatsapp-pulse absolute inset-0 rounded-full bg-[#25D366]"
              aria-hidden
            />
            <span
              className="whatsapp-pulse absolute inset-0 rounded-full bg-[#25D366] [animation-delay:0.7s]"
              aria-hidden
            />
          </>
        )}
        {open ? (
          <svg viewBox="0 0 24 24" className="relative z-10 h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden>
            <path d="M6 6l12 12M18 6 6 18" />
          </svg>
        ) : (
          <WhatsAppIcon className="relative z-10 h-7 w-7 sm:h-8 sm:w-8" />
        )}
      </motion.button>
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
