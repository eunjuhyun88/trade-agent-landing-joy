import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight, ChevronDown } from "lucide-react";

const HeroSection = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  return (
    <section className="min-h-[90vh] flex flex-col justify-center pt-20 sm:pt-24 pb-8 sm:pb-12 px-4 sm:px-6 md:px-12 relative">
      <motion.div
        className="mb-8 sm:mb-10 flex flex-wrap items-center gap-2 sm:gap-4"
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <span className="border border-foreground/40 px-3 py-1.5 text-[11px] sm:text-xs font-mono tracking-[0.2em] text-foreground/80">EST_2024</span>
        <span className="text-[11px] sm:text-xs font-mono tracking-[0.15em] text-muted-foreground">NON-CUSTODIAL STATE ANALYSIS ENGINE</span>
      </motion.div>

      <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold leading-[0.9] tracking-tighter mb-8 sm:mb-12">
        <motion.span className="block" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}>
          NOT A CHART BOT.
        </motion.span>
        <motion.span className="block" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.4 }}>
          A STATE MACHINE
        </motion.span>
        <motion.span
          className="block text-accent"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          style={{ textShadow: "0 0 60px hsl(268 45% 75% / 0.3)" }}
        >
          FOR THE MARKET.
        </motion.span>
      </h1>

      <motion.p
        className="text-sm sm:text-base md:text-lg leading-relaxed text-muted-foreground max-w-2xl mb-8 sm:mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        A chart model. An on-chain model. A derivatives model. A sentiment model.
        <br className="hidden sm:block" />
        Each one specialized. Each one independent.
        <br className="hidden sm:block" />
        An orchestration engine converges them into a single signal.
      </motion.p>

      <motion.div
        className="flex flex-col sm:flex-row gap-3 sm:gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.0 }}
      >
        <button
          onClick={() => navigate("/agents")}
          className="bg-accent text-accent-foreground px-8 py-4 text-sm font-mono tracking-wider hover:opacity-90 transition-all flex items-center justify-center gap-3 group"
          style={{ boxShadow: "0 0 30px hsl(268 45% 75% / 0.2)" }}
        >
          VIEW LIVE STATE
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </button>
        <button
          onClick={() => toast({ title: "📄 Documentation", description: "Docs page coming soon. Stay tuned!" })}
          className="border border-foreground/30 px-8 py-4 text-sm font-mono tracking-wider hover:bg-secondary hover:border-foreground/50 transition-all"
        >
          DOCUMENTATION
        </button>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <span className="text-[10px] font-mono tracking-[0.3em] text-muted-foreground/50">SCROLL</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={16} className="text-muted-foreground/40" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
