import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import IndexSection from "@/components/IndexSection";
import FeaturedWork from "@/components/FeaturedWork";
import ActivePipeline from "@/components/ActivePipeline";
import About from "@/components/About";
import Contact from "@/components/Contact";
import ScrollProgress from "@/components/ui/ScrollProgress";
import ActiveDossierRail from "@/components/ActiveDossierRail";

export default function Page() {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <ActiveDossierRail />
      <main>
        <Hero />
        <About />
        <IndexSection />
        <FeaturedWork />
        <ActivePipeline />
        <Contact />
      </main>
    </>
  );
}
