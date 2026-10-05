import type { Metadata } from "next";
import TourPageClient from "./TourPageClient";

export const metadata: Metadata = {
  title: "סיור תלת־ממד | INOVIX",
  description:
    "סיור אינטראקטיבי תלת־ממדי בווילה חכמה — אבטחה, תקשורת, אודיו־וידאו ובית חכם משולבים בעיצוב.",
};

export default function TourPage() {
  return <TourPageClient />;
}
