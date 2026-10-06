"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AnimatePresence,
  motion,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import Logo from "@/components/Logo";
import SocialIcon from "@/components/SocialIcon";
import { CONTACT } from "@/lib/contact";
import { SERVICES } from "@/lib/services";
import { SOCIAL_LINKS } from "@/lib/social";

type NavbarProps = {
  /** Force solid header (service pages / non-hero pages) */
  variant?: "auto" | "solid";
};

const PAGE_LINKS = [
  { href: "/about", label: "אודות" },
  { href: "/blog", label: "בלוג" },
  { href: "/tour", label: "סיור תלת־ממדי" },
  { href: "/#testimonials", label: "לקוחות" },
  { href: "/#contact", label: "צור קשר" },
] as const;

function navLinkClass(lightText: boolean, active = false) {
  return [
    "text-sm font-medium transition-colors",
    lightText
      ? "text-white/90 hover:text-white"
      : "text-[var(--ink)]/75 hover:text-[var(--teal)]",
    active ? (lightText ? "text-[var(--lime-bright)]!" : "text-[var(--teal)]!") : "",
  ].join(" ");
}

export default function Navbar({ variant = "auto" }: NavbarProps) {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const forceSolid = variant === "solid" || !onHome;
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(forceSolid);
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  const onServicePage = SERVICES.some((s) => pathname === s.href);

  useMotionValueEvent(scrollY, "change", (y) => {
    if (forceSolid) return;
    setScrolled(y > 24);
  });

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        setServicesOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const solid = forceSolid || scrolled || open;
  /** Homepage stays in the navy brand family even when scrolled */
  const homeBrand = onHome && !forceSolid;
  const lightText = homeBrand || !solid;
  const logoOnDark = homeBrand || !solid;

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-50"
      animate={{
        backgroundColor: solid
          ? homeBrand
            ? "rgba(5,22,53,0.94)"
            : "rgba(255,255,255,0.97)"
          : "rgba(255,255,255,0)",
        boxShadow: solid
          ? homeBrand
            ? "0 8px 30px rgba(0,0,0,0.28)"
            : "0 8px 30px rgba(5,22,53,0.08)"
          : "0 0 0 rgba(0,0,0,0)",
      }}
      transition={{ duration: 0.3 }}
      style={{ backdropFilter: solid ? "blur(14px)" : "blur(0px)" }}
    >
      <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 px-3 sm:px-4 md:h-16 md:px-6 lg:h-[5rem] lg:px-8">
        {/* Right side (RTL start): company logo */}
        <Link
          href="/"
          className="relative z-10 shrink-0"
          aria-label="INOVIX דף הבית"
          onClick={() => setOpen(false)}
        >
          <span className="lg:hidden">
            <Logo size="sm" onDark={logoOnDark} />
          </span>
          <span className="hidden lg:inline">
            <Logo size="md" onDark={logoOnDark} />
          </span>
        </Link>

        {/* Center nav links */}
        <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-5 xl:gap-7 lg:flex">
          {!onHome && (
            <li>
              <Link href="/" className={navLinkClass(lightText)}>
                דף הבית
              </Link>
            </li>
          )}

          <li
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <button
              type="button"
              className={[
                navLinkClass(lightText, onServicePage),
                "inline-flex items-center gap-1.5",
              ].join(" ")}
              aria-expanded={servicesOpen}
              aria-haspopup="true"
              onClick={() => setServicesOpen((v) => !v)}
            >
              פתרונות
              <svg
                viewBox="0 0 12 12"
                className={`h-3 w-3 transition-transform ${servicesOpen ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden
              >
                <path d="M2 4.5 6 8.5 10 4.5" />
              </svg>
            </button>

            <AnimatePresence>
              {servicesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.18 }}
                  className={[
                    "absolute top-full start-1/2 z-50 mt-2 w-56 -translate-x-1/2 rounded-2xl border p-2 shadow-[0_16px_40px_rgba(5,22,53,0.22)]",
                    homeBrand
                      ? "border-white/15 bg-[var(--navy)]"
                      : "border-slate-100 bg-white",
                  ].join(" ")}
                >
                  {SERVICES.map((s) => (
                    <Link
                      key={s.slug}
                      href={s.href}
                      className={[
                        "block rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                        homeBrand
                          ? "hover:bg-white/10"
                          : "hover:bg-[var(--surface-soft)]",
                        pathname === s.href
                          ? homeBrand
                            ? "text-[var(--lime-bright)]"
                            : "text-[var(--teal)]"
                          : homeBrand
                            ? "text-white/85"
                            : "text-[var(--ink)]/80",
                      ].join(" ")}
                      onClick={() => setServicesOpen(false)}
                    >
                      {s.title}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </li>

          {PAGE_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={navLinkClass(
                  lightText,
                  link.href.startsWith("/") && !link.href.includes("#")
                    ? pathname === link.href
                    : false,
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Left side (physical left): socials + phone */}
        <div
          className="relative z-10 flex items-center gap-2 sm:gap-2.5"
          dir="ltr"
        >
          <ul
            className="hidden items-center gap-1.5 lg:flex"
            aria-label="רשתות חברתיות"
          >
            {SOCIAL_LINKS.map((link) => (
              <li key={link.id}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.name}
                  className={[
                    "flex h-9 w-9 items-center justify-center rounded-full border transition",
                    lightText
                      ? "border-white/25 text-white/85 hover:border-[var(--lime)]/60 hover:bg-white/10 hover:text-[var(--lime-bright)]"
                      : "border-slate-200 text-[var(--ink)]/70 hover:border-[var(--teal)]/40 hover:bg-[var(--surface-soft)] hover:text-[var(--teal)]",
                  ].join(" ")}
                >
                  <SocialIcon link={link} className="h-4 w-4" />
                </a>
              </li>
            ))}
          </ul>
          <a
            href={`tel:${CONTACT.phoneTel}`}
            aria-label={`התקשרו ${CONTACT.phoneDisplay}`}
            title={CONTACT.phoneDisplay}
            className={[
              "hidden h-9 w-9 items-center justify-center rounded-full border transition lg:inline-flex",
              lightText
                ? "border-white/25 text-white/90 hover:border-[var(--lime)]/60 hover:bg-white/10 hover:text-[var(--lime-bright)]"
                : "border-slate-200 text-[var(--ink)]/75 hover:border-[var(--teal)]/40 hover:bg-[var(--surface-soft)] hover:text-[var(--teal)]",
            ].join(" ")}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
              aria-hidden
            >
              <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.1-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.6a2 2 0 0 1-.5 2.1L8.1 9.6a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.5c.8.3 1.7.6 2.6.7A2 2 0 0 1 22 16.9z" />
            </svg>
          </a>

          <button
            type="button"
            className={[
              "inline-flex h-11 w-11 items-center justify-center rounded-full border lg:hidden",
              homeBrand
                ? "border-white/30 bg-white/10"
                : solid
                  ? "border-slate-200 bg-white"
                  : "border-white/35 bg-white/95",
            ].join(" ")}
            aria-label={open ? "סגור תפריט" : "פתח תפריט"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="relative block h-3.5 w-5">
              <span
                className={`absolute start-0 top-0 block h-0.5 w-5 origin-center transition duration-300 ${
                  homeBrand ? "bg-white" : "bg-[var(--navy)]"
                } ${open ? "translate-y-[6px] rotate-45" : ""}`}
              />
              <span
                className={`absolute start-0 top-[6px] block h-0.5 w-5 transition duration-300 ${
                  homeBrand ? "bg-white" : "bg-[var(--navy)]"
                } ${open ? "opacity-0" : ""}`}
              />
              <span
                className={`absolute start-0 top-[12px] block h-0.5 w-5 origin-center transition duration-300 ${
                  homeBrand ? "bg-white" : "bg-[var(--navy)]"
                } ${open ? "-translate-y-[6px] -rotate-45" : ""}`}
              />
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile nav */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            key="mobile-drawer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className={[
              "overflow-hidden border-t lg:hidden",
              homeBrand
                ? "border-white/10 bg-[var(--navy)]"
                : "border-slate-100 bg-white",
            ].join(" ")}
          >
            <ul className="flex flex-col gap-1 px-3 py-4 sm:px-4">
              {!onHome && (
                <li>
                  <Link
                    href="/"
                    className="block rounded-xl px-4 py-3.5 text-base font-semibold text-[var(--ink)] active:bg-[var(--surface-soft)]"
                    onClick={() => setOpen(false)}
                  >
                    דף הבית
                  </Link>
                </li>
              )}

              <li>
                <button
                  type="button"
                  className={[
                    "flex w-full items-center justify-between rounded-xl px-4 py-3.5 text-base font-semibold",
                    homeBrand
                      ? "text-white active:bg-white/10"
                      : "text-[var(--ink)] active:bg-[var(--surface-soft)]",
                  ].join(" ")}
                  aria-expanded={mobileServicesOpen}
                  onClick={() => setMobileServicesOpen((v) => !v)}
                >
                  פתרונות
                  <svg
                    viewBox="0 0 12 12"
                    className={`h-4 w-4 transition-transform ${mobileServicesOpen ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden
                  >
                    <path d="M2 4.5 6 8.5 10 4.5" />
                  </svg>
                </button>
                {mobileServicesOpen && (
                  <ul className="mt-1 space-y-0.5 pb-1">
                    {SERVICES.map((s) => (
                      <li key={s.slug}>
                        <Link
                          href={s.href}
                          className={[
                            "block rounded-xl py-2.5 pe-4 ps-8 text-sm font-medium",
                            homeBrand
                              ? "active:bg-white/10"
                              : "active:bg-[var(--surface-soft)]",
                            pathname === s.href
                              ? homeBrand
                                ? "text-[var(--lime-bright)]"
                                : "text-[var(--teal)]"
                              : homeBrand
                                ? "text-white/75"
                                : "text-[var(--ink)]/75",
                          ].join(" ")}
                          onClick={() => setOpen(false)}
                        >
                          {s.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>

              {PAGE_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={[
                      "block rounded-xl px-4 py-3.5 text-base font-semibold",
                      homeBrand
                        ? "active:bg-white/10"
                        : "active:bg-[var(--surface-soft)]",
                      link.href.startsWith("/") &&
                      !link.href.includes("#") &&
                      pathname === link.href
                        ? homeBrand
                          ? "text-[var(--lime-bright)]"
                          : "text-[var(--teal)]"
                        : homeBrand
                          ? "text-white"
                          : "text-[var(--ink)]",
                    ].join(" ")}
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}

              <li className="pt-2">
                <Link
                  href="/#contact"
                  className="brand-gradient-bg flex min-h-12 items-center justify-center rounded-full px-5 py-3.5 text-sm font-bold text-[var(--navy)]"
                  onClick={() => setOpen(false)}
                >
                  צרו קשר לייעוץ
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
