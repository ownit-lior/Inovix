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

export default function Home() {
  return (
    <div className="bg-[var(--navy)] text-white">
      <ScrollProgress />
      <Navbar />
      <main id="main-content">
        <Hero />
        <Features />
        <HomeAbout />
        <Testimonials />
        <HomeBlog />
        <Contact />
        <Brands />
      </main>
      <Footer />
    </div>
  );
}
