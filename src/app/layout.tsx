import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Heebo } from "next/font/google";
import AccessibilityWidget from "@/components/AccessibilityWidget";
import "./globals.css";

const heebo = Heebo({
  variable: "--font-heebo",
  subsets: ["hebrew", "latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "INOVIX | ייעוץ, תכנון וביצוע מערכות אבטחה ובית חכם",
  description:
    "INOVIX — ייעוץ, תכנון וביצוע של מערכות אבטחה, תקשורת, אודיו־וידאו ובית חכם לבתים ולעסקים.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="he" dir="rtl" className={`${heebo.variable} h-full`}>
      <body className="min-h-full bg-[var(--surface)] text-[var(--ink)] antialiased">
        <a href="#main-content" className="skip-link">
          דלג לתוכן המרכזי
        </a>
        {children}
        <AccessibilityWidget />
      </body>
    </html>
  );
}
