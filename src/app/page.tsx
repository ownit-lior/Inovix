import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import HomeAbout from "@/components/landing/HomeAbout";
import HomeImagine from "@/components/landing/HomeImagine";
import HomeProcessScroll from "@/components/landing/HomeProcessScroll";
import Testimonials from "@/components/landing/Testimonials";
import HomeBlog from "@/components/landing/HomeBlog";
import Contact from "@/components/landing/Contact";
import Brands from "@/components/landing/Brands";
import Footer from "@/components/landing/Footer";
import AmbientOrbs from "@/components/effects/AmbientOrbs";
import SectionShapes from "@/components/effects/SectionShapes";
import ScrollProgress from "@/components/effects/ScrollProgress";
import SmoothScroll from "@/components/effects/SmoothScroll";

export default function Home() {
  return (
    <SmoothScroll>
      <div className="page-canvas relative overflow-x-clip bg-[var(--navy)] text-white">
        {/* One shared atmosphere for the whole page — no per-block cuts */}
        <AmbientOrbs />
        <SectionShapes variant="mixed" />
        <div className="film-grain" aria-hidden />

        <ScrollProgress />
        <Navbar />
        <main id="main-content" className="relative z-10">
          <Hero />
          <HomeImagine />
          <Features />
          <HomeAbout />
          <HomeProcessScroll />
          <Testimonials />
          <HomeBlog />
          <Contact />
          <Brands />
        </main>
        <Footer />
      </div>
    </SmoothScroll>
  );
}
