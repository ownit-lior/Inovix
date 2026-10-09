import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import HomeAbout from "@/components/landing/HomeAbout";
import Testimonials from "@/components/landing/Testimonials";
import HomeBlog from "@/components/landing/HomeBlog";
import Contact from "@/components/landing/Contact";
import Brands from "@/components/landing/Brands";
import Footer from "@/components/landing/Footer";
import ScrollProgress from "@/components/effects/ScrollProgress";
import SmoothScroll from "@/components/effects/SmoothScroll";
import ScrollScene from "@/components/effects/ScrollScene";

export default function Home() {
  return (
    <SmoothScroll>
      <div className="bg-[var(--navy)] text-white">
        <ScrollProgress />
        <Navbar />
        <main id="main-content">
          <Hero />
          <ScrollScene>
            <Features />
          </ScrollScene>
          <ScrollScene intensity={1.1}>
            <HomeAbout />
          </ScrollScene>
          <ScrollScene>
            <Testimonials />
          </ScrollScene>
          <ScrollScene intensity={0.9}>
            <HomeBlog />
          </ScrollScene>
          <ScrollScene intensity={0.85}>
            <Contact />
          </ScrollScene>
          <ScrollScene intensity={0.7}>
            <Brands />
          </ScrollScene>
        </main>
        <Footer />
      </div>
    </SmoothScroll>
  );
}
