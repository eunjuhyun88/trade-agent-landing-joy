import { motion } from "framer-motion";
import { Layers, Split, Target } from "lucide-react";

const features = [
  {
    id: "01",
    label: "SPECIALIZED",
    description: "Not one generic AI — each chain gets its own trained model. BTC model, ETH model, SOL model. Domain-specific, coin-specific, zero generalization.",
    Icon: Layers,
  },
  {
    id: "02",
    label: "INDEPENDENT",
    description: "Each model analyzes without referencing the others. Zero cross-contamination. Parallel, unbiased. 5 agents × N chains = full coverage.",
    Icon: Split,
  },
  {
    id: "03",
    label: "CONVERGED",
    description: "Agreement raises signal strength. Conflict triggers priority rules. Output: Entry Score (0–100) — per coin, per model, per timeframe.",
    Icon: Target,
  },
];

const FeaturesGrid = () => {
  return (
    <section className="px-4 sm:px-6 md:px-12 py-16 sm:py-20">
      {/* Section tag */}
      <motion.div
        className="mb-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <span className="text-xs font-mono tracking-wider text-accent">CORE_ARCHITECTURE</span>
      </motion.div>

      {/* Headline */}
      <motion.h2
        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[0.95] tracking-tighter mb-6"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        ONE MODEL CAN'T
        <br />
        READ THE MARKET.
        <br />
        <span className="text-accent">FIVE × EVERY CHAIN.</span>
      </motion.h2>

      {/* Subcopy */}
      <motion.p
        className="text-sm leading-relaxed text-muted-foreground max-w-lg mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.15 }}
      >
        General-purpose AI uses one model for everything.
        We train separate models for each coin — BTC, ETH, SOL, and more.
        5 specialist agents per chain. When they disagree — that's the real signal.
      </motion.p>

      {/* 3 Feature Blocks */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-border">
        {features.map((f, i) => (
          <motion.div
            key={f.id}
            className="border border-border p-6 sm:p-8 bg-card hover:bg-secondary/50 transition-colors group"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: i * 0.15 }}
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 border border-accent/30 bg-accent/5 flex items-center justify-center group-hover:border-accent/60 transition-colors">
                <f.Icon size={18} className="text-accent" />
              </div>
              <div className="text-xs font-mono tracking-wider">
                <span className="text-accent">{f.id}</span>
                <span className="text-accent"> / {f.label}</span>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-foreground/80 max-w-sm">{f.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesGrid;
