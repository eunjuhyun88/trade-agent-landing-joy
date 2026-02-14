import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <section className="pt-24 sm:pt-32 pb-12 sm:pb-16 px-4 sm:px-6 md:px-12">
      <motion.div
        className="mb-6 sm:mb-8 flex flex-wrap items-center gap-2 sm:gap-4"
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <span className="border border-foreground px-3 py-1 text-[10px] sm:text-xs font-mono tracking-wider">EST_2024</span>
        <span className="text-[10px] sm:text-xs font-mono tracking-wider text-muted-foreground">NON-CUSTODIAL STATE ANALYSIS ENGINE</span>
      </motion.div>
      <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-bold leading-[0.9] tracking-tighter mb-6 sm:mb-10">
        <motion.span className="block" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}>
          NOT A CHART BOT.
        </motion.span>
        <motion.span className="block" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.4 }}>
          A STATE MACHINE
        </motion.span>
        <motion.span className="block text-accent" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.6 }}>
          FOR THE MARKET.
        </motion.span>
      </h1>

      <motion.p
        className="text-xs sm:text-sm md:text-base leading-relaxed text-muted-foreground max-w-2xl mb-6 sm:mb-10"
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
        className="flex flex-col sm:flex-row gap-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.0 }}
      >
        <button
          onClick={() => navigate("/agents")}
          className="bg-primary text-primary-foreground px-6 py-3 text-xs font-mono tracking-wider hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
        >
          VIEW LIVE STATE
          <span>→</span>
        </button>
        <button className="border border-foreground px-6 py-3 text-xs font-mono tracking-wider hover:bg-secondary transition-colors">
          DOCUMENTATION
        </button>
      </motion.div>
    </section>
  );
};

export default HeroSection;
