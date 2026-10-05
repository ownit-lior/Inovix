import type { Metadata } from "next";
import AboutPage from "@/components/pages/AboutPage";

export const metadata: Metadata = {
  title: "אודות | INOVIX",
  description:
    "INOVIX — ייעוץ, תכנון וביצוע של מערכות אבטחה, תקשורת, אודיו־וידאו ובית חכם לבתים ולעסקים.",
};

export default function Page() {
  return <AboutPage />;
}
