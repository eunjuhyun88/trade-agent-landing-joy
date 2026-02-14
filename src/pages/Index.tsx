import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturesGrid from "@/components/FeaturesGrid";
import AgentCards from "@/components/AgentCards";
import TickerBar from "@/components/TickerBar";
import TerminalSection from "@/components/TerminalSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesGrid />
        <AgentCards />
        <TickerBar />
        <TerminalSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
