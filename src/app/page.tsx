import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import HomeAbout from "@/components/landing/HomeAbout";
import HomeImagine from "@/components/landing/HomeImagine";
import HomeProcessScroll from "@/components/landing/HomeProcessScroll";
import HomeEndFlow from "@/components/landing/HomeEndFlow";
import Footer from "@/components/landing/Footer";
import ScrollProgress from "@/components/effects/ScrollProgress";
import SmoothScroll from "@/components/effects/SmoothScroll";

export default function Home() {
  return (
    <SmoothScroll>
      <div className="overflow-x-clip bg-[var(--navy)] text-white">
        <ScrollProgress />
        <Navbar />
        <main id="main-content">
          <Hero />
          <HomeImagine />
          <Features />
          <HomeAbout />
          <HomeProcessScroll />
          <HomeEndFlow />
        </main>
        <Footer />
      </div>
    </SmoothScroll>
  );
}
