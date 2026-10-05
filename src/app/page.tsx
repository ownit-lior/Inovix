import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import Testimonials from "@/components/landing/Testimonials";
import Contact from "@/components/landing/Contact";
import Brands from "@/components/landing/Brands";
import Footer from "@/components/landing/Footer";

export default function Home() {
  return (
    <div className="bg-[var(--navy)] text-white">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Testimonials />
        <Contact />
        <Brands />
      </main>
      <Footer />
    </div>
  );
}
