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
 * WhatsApp FAB — lead form first; WhatsApp opens only after successful submit.
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
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const panelRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    const t = window.setTimeout(() => nameRef.current?.focus(), 180);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !submitting) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("keydown", onKey);
    };
  }, [open, submitting]);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (submitting) return;
      const t = e.target as Node;
      if (panelRef.current?.contains(t)) return;
      const fab = document.getElementById("inovix-wa-fab");
      if (fab?.contains(t)) return;
      setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open, submitting]);

  const openWhatsApp = (text: string) => {
    const url = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const cleanName = name.trim();
    const cleanPhone = phone.trim();
    const cleanEmail = email.trim();
    const cleanNote = note.trim();
    const leadMessage = cleanNote || message;

    if (!cleanName || !cleanPhone) {
      setError("נא למלא שם וטלפון");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: cleanName,
          phone: cleanPhone,
          email: cleanEmail,
          message: `[וואטסאפ] ${leadMessage}`,
        }),
      });
      const payload = (await res.json()) as { error?: string };
      if (!res.ok) {
        setError(payload.error || "שליחה נכשלה. נסו שוב.");
        return;
      }

      const waText = [
        message,
        `שם: ${cleanName}`,
        `טלפון: ${cleanPhone}`,
        cleanEmail ? `אימייל: ${cleanEmail}` : "",
        cleanNote ? `הודעה: ${cleanNote}` : "",
      ]
        .filter(Boolean)
        .join("\n");

      openWhatsApp(waText);
      setName("");
      setPhone("");
      setEmail("");
      setNote("");
      setOpen(false);
    } catch {
      setError("שגיאת רשת. נסו שוב.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!mounted) return null;

  const inputClass =
    "w-full rounded-xl border border-slate-200 bg-[var(--surface-soft)] px-3 py-2.5 text-sm text-[var(--ink)] outline-none transition focus:border-[var(--teal)] disabled:opacity-60";

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
            aria-label="טופס פנייה לוואטסאפ"
            initial={
              reduce ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.94 }
            }
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={
              reduce ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.96 }
            }
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-auto w-[min(22rem,calc(100vw-2rem))] overflow-hidden rounded-2xl border border-black/5 bg-white shadow-[0_20px_50px_rgba(5,22,53,0.28)]"
          >
            <div className="flex items-center justify-between gap-3 bg-[#075E54] px-4 py-3 text-white">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#25D366] text-sm font-extrabold text-white">
                  IN
                </span>
                <div>
                  <p className="text-sm font-bold leading-tight">INOVIX</p>
                  <p className="text-[0.7rem] text-white/75">
                    השאירו פרטים ונמשיך בוואטסאפ
                  </p>
                </div>
              </div>
              <button
                type="button"
                aria-label="סגור חלון"
                disabled={submitting}
                className="flex h-8 w-8 items-center justify-center rounded-full text-white/80 transition hover:bg-white/10 hover:text-white disabled:opacity-50"
                onClick={() => setOpen(false)}
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden
                >
                  <path d="M6 6l12 12M18 6 6 18" />
                </svg>
              </button>
            </div>

            <div className="space-y-3 bg-[#ECE5DD] px-3 py-4">
              <div className="max-w-[92%] rounded-2xl rounded-tr-sm bg-white px-3.5 py-2.5 text-sm leading-relaxed text-[var(--ink)] shadow-sm">
                שלום 👋
                <br />
                מלאו את הפרטים — אחרי השליחה תועברו לוואטסאפ להמשך השיחה.
              </div>

              <form
                onSubmit={onSubmit}
                className="space-y-2.5 rounded-2xl bg-white p-3 shadow-sm"
              >
                <label className="block">
                  <span className="mb-1 block text-[0.7rem] font-semibold text-[var(--muted)]">
                    שם מלא *
                  </span>
                  <input
                    ref={nameRef}
                    type="text"
                    name="name"
                    required
                    autoComplete="name"
                    placeholder="שם מלא"
                    value={name}
                    disabled={submitting}
                    onChange={(e) => setName(e.target.value)}
                    className={inputClass}
                  />
                </label>
                <label className="block">
                  <span className="mb-1 block text-[0.7rem] font-semibold text-[var(--muted)]">
                    טלפון *
                  </span>
                  <input
                    type="tel"
                    name="phone"
                    required
                    autoComplete="tel"
                    inputMode="tel"
                    dir="ltr"
                    placeholder="050-000-0000"
                    value={phone}
                    disabled={submitting}
                    onChange={(e) => setPhone(e.target.value)}
                    className={inputClass}
                  />
                </label>
                <label className="block">
                  <span className="mb-1 block text-[0.7rem] font-semibold text-[var(--muted)]">
                    אימייל
                  </span>
                  <input
                    type="email"
                    name="email"
                    autoComplete="email"
                    dir="ltr"
                    placeholder="email@example.com"
                    value={email}
                    disabled={submitting}
                    onChange={(e) => setEmail(e.target.value)}
                    className={inputClass}
                  />
                </label>
                <label className="block">
                  <span className="mb-1 block text-[0.7rem] font-semibold text-[var(--muted)]">
                    הודעה
                  </span>
                  <textarea
                    name="note"
                    rows={2}
                    placeholder="במה נוכל לעזור?"
                    value={note}
                    disabled={submitting}
                    onChange={(e) => setNote(e.target.value)}
                    className={`${inputClass} resize-none`}
                  />
                </label>

                {error ? (
                  <p className="text-xs font-semibold text-red-600" role="alert">
                    {error}
                  </p>
                ) : null}

                <button
                  type="submit"
                  disabled={submitting}
                  className="flex w-full min-h-11 items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 py-2.5 text-sm font-bold text-white transition hover:brightness-110 disabled:cursor-wait disabled:opacity-70"
                >
                  {submitting ? (
                    "שומר פרטים..."
                  ) : (
                    <>
                      <WhatsAppIcon className="h-5 w-5" />
                      שליחה ומעבר לוואטסאפ
                    </>
                  )}
                </button>
                <p className="text-center text-[0.65rem] leading-snug text-[var(--muted)]">
                  הפרטים נשמרים אצלנו — ורק אז נפתח וואטסאפ
                </p>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        id="inovix-wa-fab"
        type="button"
        aria-label={open ? "סגור טופס WhatsApp" : "פתח טופס WhatsApp"}
        aria-expanded={open}
        aria-controls={panelId}
        className="pointer-events-auto relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_12px_36px_rgba(37,211,102,0.5)] transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366] sm:h-[3.75rem] sm:w-[3.75rem]"
        initial={{ opacity: 0, scale: 0.55, y: 18 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 380, damping: 22, delay: 0.35 }}
        whileHover={reduce ? undefined : { scale: 1.07 }}
        whileTap={reduce ? undefined : { scale: 0.94 }}
        onClick={() => {
          if (submitting) return;
          setOpen((v) => !v);
          setError("");
        }}
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
          <svg
            viewBox="0 0 24 24"
            className="relative z-10 h-6 w-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            aria-hidden
          >
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
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
      aria-hidden
    >
      <path d="M12.04 2C6.58 2 2.15 6.4 2.15 11.84c0 1.95.55 3.8 1.52 5.38L2 22l4.94-1.62a9.93 9.93 0 0 0 5.1 1.38h.01c5.46 0 9.89-4.4 9.89-9.84C21.94 6.4 17.5 2 12.04 2Zm5.78 13.94c-.24.68-1.4 1.25-1.94 1.33-.5.07-1.13.1-1.82-.11-.42-.13-.96-.31-1.65-.61-2.9-1.26-4.79-4.19-4.93-4.38-.14-.19-1.15-1.53-1.15-2.92 0-1.39.73-2.07.99-2.35.26-.28.57-.35.76-.35h.55c.17 0 .4-.07.63.48.24.57.81 1.98.88 2.12.07.14.12.31.02.5-.1.19-.14.31-.28.48-.14.17-.3.37-.42.5-.14.14-.28.29-.12.56.16.28.71 1.17 1.52 1.9 1.05.93 1.93 1.22 2.2 1.36.28.14.44.12.6-.07.17-.19.7-.81.89-1.09.19-.28.38-.23.63-.14.26.1 1.64.77 1.92.91.28.14.47.21.54.33.07.12.07.69-.17 1.37Z" />
    </svg>
  );
}
