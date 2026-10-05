import type { Metadata } from "next";
import BlogIndexPage from "@/components/pages/BlogIndexPage";

export const metadata: Metadata = {
  title: "בלוג | INOVIX",
  description:
    "תובנות, טיפים ומגמות בעולם הבית החכם — אבטחה, תקשורת, אודיו־וידאו ואוטומציה.",
};

export default function Page() {
  return <BlogIndexPage />;
}
