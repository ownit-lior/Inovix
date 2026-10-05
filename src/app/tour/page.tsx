import type { Metadata } from "next";
import TourPageClient from "./TourPageClient";

export const metadata: Metadata = {
  title: "סיור תלת־ממד | INOVIX",
  description:
    "הסיור התלת־ממדי של INOVIX בבנייה ויעלה בקרוב — וילה חכמה עם אבטחה, תקשורת, אודיו־וידאו ובית חכם.",
};

export default function TourPage() {
  return <TourPageClient />;
}
