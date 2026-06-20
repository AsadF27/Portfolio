import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import FeaturedWork from "@/components/FeaturedWork";
import ActivePipeline from "@/components/ActivePipeline";
import Contact from "@/components/Contact";

export default function Page() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <FeaturedWork />
        <ActivePipeline />
        <Contact />
      </main>
    </>
  );
}
