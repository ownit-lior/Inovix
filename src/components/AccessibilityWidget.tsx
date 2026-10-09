"use client";

import { useEffect, useId, useState } from "react";
import Link from "next/link";

const STORAGE_KEY = "inovix-a11y";

type A11yState = {
  text: 0 | 1 | 2;
  highContrast: boolean;
  underlineLinks: boolean;
  readable: boolean;
  reduceMotion: boolean;
};

const DEFAULT_STATE: A11yState = {
  text: 0,
  highContrast: false,
  underlineLinks: false,
  readable: false,
  reduceMotion: false,
};

function applyA11y(state: A11yState) {
  const root = document.documentElement;
  root.classList.toggle("a11y-text-lg", state.text === 1);
  root.classList.toggle("a11y-text-xl", state.text === 2);
  root.classList.toggle("a11y-high-contrast", state.highContrast);
  root.classList.toggle("a11y-underline-links", state.underlineLinks);
  root.classList.toggle("a11y-readable", state.readable);
  root.classList.toggle("a11y-reduce-motion", state.reduceMotion);
}

export default function AccessibilityWidget() {
  const panelId = useId();
  const [open, setOpen] = useState(false);
  const [state, setState] = useState<A11yState>(DEFAULT_STATE);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = { ...DEFAULT_STATE, ...(JSON.parse(raw) as Partial<A11yState>) };
      setState(parsed);
      applyA11y(parsed);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    applyA11y(state);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* ignore */
    }
  }, [state]);

  const update = (patch: Partial<A11yState>) =>
    setState((prev) => ({ ...prev, ...patch }));

  const reset = () => setState(DEFAULT_STATE);

  return (
    <div className="a11y-widget fixed bottom-4 left-4 z-[100] sm:bottom-6 sm:left-6">
      <button
        type="button"
        className="a11y-fab flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-[var(--navy)] text-white shadow-[0_10px_28px_rgba(5,22,53,0.35)] transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--lime)]"
        aria-label={open ? "סגור תפריט נגישות" : "פתח תפריט נגישות"}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
      >
        <AccessibilityIcon className="h-7 w-7" />
      </button>

      {open ? (
        <div
          id={panelId}
          role="dialog"
          aria-label="תפריט נגישות"
          className="absolute bottom-16 left-0 w-[min(18.5rem,calc(100vw-2rem))] rounded-2xl border border-[var(--teal)]/20 bg-[var(--surface)] p-4 text-[var(--ink)] shadow-[0_20px_50px_rgba(5,22,53,0.2)]"
        >
          <div className="mb-3 flex items-center justify-between gap-2">
            <h2 className="text-base font-extrabold">נגישות</h2>
            <button
              type="button"
              className="text-sm text-[var(--muted)] underline-offset-2 hover:underline"
              onClick={() => setOpen(false)}
            >
              סגור
            </button>
          </div>

          <div className="space-y-2">
            <ToggleRow
              label="הגדלת טקסט"
              pressed={state.text > 0}
              onClick={() =>
                update({ text: state.text === 0 ? 1 : state.text === 1 ? 2 : 0 })
              }
              detail={
                state.text === 0 ? "רגיל" : state.text === 1 ? "גדול" : "גדול מאוד"
              }
            />
            <ToggleRow
              label="ניגודיות גבוהה"
              pressed={state.highContrast}
              onClick={() => update({ highContrast: !state.highContrast })}
            />
            <ToggleRow
              label="הדגשת קישורים"
              pressed={state.underlineLinks}
              onClick={() => update({ underlineLinks: !state.underlineLinks })}
            />
            <ToggleRow
              label="גופן קריא"
              pressed={state.readable}
              onClick={() => update({ readable: !state.readable })}
            />
            <ToggleRow
              label="הפסקת אנימציות"
              pressed={state.reduceMotion}
              onClick={() => update({ reduceMotion: !state.reduceMotion })}
            />
          </div>

          <div className="mt-3 flex flex-col gap-2 border-t border-slate-100 pt-3">
            <button
              type="button"
              onClick={reset}
              className="min-h-10 rounded-full border border-slate-200 px-3 text-sm font-semibold transition hover:bg-slate-50"
            >
              איפוס הגדרות
            </button>
            <Link
              href="/accessibility"
              className="text-center text-sm font-semibold text-[var(--teal)] underline-offset-2 hover:underline"
              onClick={() => setOpen(false)}
            >
              הצהרת נגישות
            </Link>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function ToggleRow({
  label,
  pressed,
  onClick,
  detail,
}: {
  label: string;
  pressed: boolean;
  onClick: () => void;
  detail?: string;
}) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={onClick}
      className={`flex min-h-11 w-full items-center justify-between rounded-xl border px-3 text-sm font-semibold transition ${
        pressed
          ? "border-[var(--teal)] bg-[var(--teal)]/10 text-[var(--navy)]"
          : "border-slate-200 bg-[var(--surface-soft)] text-[var(--ink)] hover:border-[var(--teal)]/40"
      }`}
    >
      <span>{label}</span>
      <span className="text-xs font-medium text-[var(--muted)]">
        {detail ?? (pressed ? "פעיל" : "כבוי")}
      </span>
    </button>
  );
}

function AccessibilityIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <circle cx="12" cy="4.5" r="2.2" />
      <path d="M4.8 9.2c.3-.8 1.2-1.2 2-1l5.2 1.3 5.2-1.3c.8-.2 1.7.2 2 1 .2.8-.2 1.6-1 1.9l-3.7.9v3.3l1.9 5.2c.3.8-.2 1.7-1 2-.8.3-1.7-.2-2-1L12 16.2l-1.4 3.9c-.3.8-1.2 1.3-2 1-.8-.3-1.3-1.2-1-2l1.9-5.2v-3.3l-3.7-.9c-.8-.2-1.2-1.1-1-1.9Z" />
    </svg>
  );
}
