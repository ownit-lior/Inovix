"use client";

import dynamic from "next/dynamic";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

const TourExperience = dynamic(
  () => import("@/components/tour/TourExperience"),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[100dvh] items-center justify-center bg-[var(--showroom)] px-6 text-center text-white/70">
        טוען סיור תלת־ממד…
      </div>
    ),
  },
);

export default function TourPageClient() {
  return (
    <>
      <Navbar variant="solid" />
      <main className="relative overflow-hidden">
        <TourExperience />
      </main>
      {/* Footer only on larger screens — keeps the tour fullscreen on phones */}
      <div className="hidden bg-[var(--showroom)] md:block">
        <Footer />
      </div>
    </>
  );
}
