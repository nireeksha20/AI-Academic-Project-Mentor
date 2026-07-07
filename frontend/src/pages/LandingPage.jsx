import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import StatsSection from "../components/StatsSection";
import FeaturesSection from "../components/FeaturesSection";
import HowItWorksSection from "../components/HowItWorksSection";
import Footer from "../components/Footer";

export default function LandingPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#060B1F]">
      {/* ================= Background Glow ================= */}

      <div className="absolute -top-40 -left-40 h-[32rem] w-[32rem] rounded-full bg-cyan-500/15 blur-[170px]" />

      <div className="absolute top-96 -right-48 h-[36rem] w-[36rem] rounded-full bg-purple-600/15 blur-[190px]" />

      <div className="absolute bottom-20 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-blue-500/10 blur-[170px]" />

      {/* =================================================== */}

      <div className="relative z-10">
        <Navbar />

        <HeroSection />

        <StatsSection />

        <FeaturesSection />

        <HowItWorksSection />

        <Footer />
      </div>
    </div>
  );
}
