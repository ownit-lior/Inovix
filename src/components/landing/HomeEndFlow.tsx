"use client";

import AmbientOrbs from "@/components/effects/AmbientOrbs";
import SectionShapes from "@/components/effects/SectionShapes";
import Testimonials from "@/components/landing/Testimonials";
import HomeBlog from "@/components/landing/HomeBlog";
import Contact from "@/components/landing/Contact";
import Brands from "@/components/landing/Brands";

/**
 * One continuous navy canvas: testimonials → blog → contact → brands.
 * Shared atmosphere — no per-section background cuts / divider lines.
 */
export default function HomeEndFlow() {
  return (
    <div className="brand-flow relative overflow-hidden">
      <AmbientOrbs />
      <SectionShapes variant="mixed" />
      <div className="film-grain" aria-hidden />
      <Testimonials />
      <HomeBlog />
      <Contact />
      <Brands />
    </div>
  );
}
