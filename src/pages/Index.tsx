import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturesGrid from "@/components/FeaturesGrid";
import AgentCards from "@/components/AgentCards";
import EntryScore from "@/components/EntryScore";
import YourEdge from "@/components/YourEdge";
import TerminalSection from "@/components/TerminalSection";
import Roadmap from "@/components/Roadmap";
import TickerBar from "@/components/TickerBar";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesGrid />
        <AgentCards />
        <EntryScore />
        <YourEdge />
        <TerminalSection />
        <Roadmap />
      </main>
      <TickerBar />
      <Footer />
    </div>
  );
};

export default Index;