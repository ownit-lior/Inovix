"use client";

import AmbientOrbs from "@/components/effects/AmbientOrbs";
import SectionShapes from "@/components/effects/SectionShapes";
import HomeBlog from "@/components/landing/HomeBlog";
import Contact from "@/components/landing/Contact";
import Brands from "@/components/landing/Brands";

/**
 * One continuous navy canvas for blog → contact → brands.
 * Shared atmosphere so teal/lime orbs never get cut by a section edge.
 */
export default function HomeEndFlow() {
  return (
    <div className="brand-flow relative overflow-hidden">
      <AmbientOrbs />
      <SectionShapes variant="mixed" />
      <div className="film-grain" aria-hidden />
      <HomeBlog />
      <Contact />
      <Brands />
    </div>
  );
}
