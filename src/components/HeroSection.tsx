import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <section className="pt-32 pb-16 px-6 md:px-12">
      <motion.div
        className="mb-8 flex items-center gap-4"
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <span className="border border-foreground px-3 py-1 text-xs font-mono tracking-wider">EST_2024</span>
        <span className="text-xs font-mono tracking-wider text-muted-foreground">NON-CUSTODIAL STATE ANALYSIS ENGINE</span>
      </motion.div>
      <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold leading-[0.9] tracking-tighter mb-10">
        <motion.span
          className="block"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          NOT A CHART BOT.
        </motion.span>
        <motion.span
          className="block"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          A STATE MACHINE
        </motion.span>
        <motion.span
          className="block text-accent"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
        >
          FOR THE MARKET.
        </motion.span>
      </h1>

      <motion.p
        className="text-sm md:text-base leading-relaxed text-muted-foreground max-w-2xl mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        A chart model. An on-chain model. A derivatives model. A sentiment model.
        <br />
        Each one specialized. Each one independent.
        <br />
        An orchestration engine converges them into a single signal.
      </motion.p>

      <motion.div
        className="flex gap-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.0 }}
      >
        <button
          onClick={() => navigate("/agents")}
          className="bg-primary text-primary-foreground px-6 py-3 text-xs font-mono tracking-wider hover:opacity-90 transition-opacity flex items-center gap-2"
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