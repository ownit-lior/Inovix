import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Heebo } from "next/font/google";
import AccessibilityWidget from "@/components/AccessibilityWidget";
import WhatsAppFab from "@/components/effects/WhatsAppFab";
import "./globals.css";

const heebo = Heebo({
  variable: "--font-heebo",
  subsets: ["hebrew", "latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

// Use apex (no www): public DNS still sends www to MyNames parking,
// so Instagram fails to load https://www.../inovix-share.jpg (HTML instead of JPEG).
const SITE_URL = "https://inovix.co.il";
const OG_IMAGE = `${SITE_URL}/wa-preview.jpg`;
const OG_IMAGE_SQUARE = `${SITE_URL}/wa-preview-square.jpg`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "INOVIX | ייעוץ, תכנון וביצוע מערכות אבטחה ובית חכם",
  description:
    "INOVIX — ייעוץ, תכנון וביצוע של מערכות אבטחה, תקשורת, אודיו־וידאו ובית חכם לבתים ולעסקים.",
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: "website",
    locale: "he_IL",
    url: SITE_URL,
    siteName: "INOVIX",
    title: "INOVIX | ייעוץ, תכנון וביצוע מערכות אבטחה ובית חכם",
    description:
      "ייעוץ, תכנון וביצוע של מערכות אבטחה, תקשורת, אודיו־וידאו ובית חכם לבתים ולעסקים.",
    images: [
      {
        url: OG_IMAGE,
        secureUrl: OG_IMAGE,
        width: 1200,
        height: 630,
        type: "image/jpeg",
        alt: "INOVIX — ייעוץ, תכנון וביצוע · אבטחה, תקשורת ובית חכם",
      },
      {
        url: OG_IMAGE_SQUARE,
        secureUrl: OG_IMAGE_SQUARE,
        width: 1080,
        height: 1080,
        type: "image/jpeg",
        alt: "INOVIX",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "INOVIX | ייעוץ, תכנון וביצוע מערכות אבטחה ובית חכם",
    description:
      "ייעוץ, תכנון וביצוע של מערכות אבטחה, תקשורת, אודיו־וידאו ובית חכם לבתים ולעסקים.",
    images: [OG_IMAGE],
  },
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
        <WhatsAppFab />
        <AccessibilityWidget />
      </body>
    </html>
  );
}
