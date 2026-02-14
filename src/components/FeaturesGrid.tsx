import { motion } from "framer-motion";

const FeaturesGrid = () => {
  return (
    <section className="px-4 sm:px-6 md:px-12 py-12 sm:py-16">
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
        <span className="text-accent">FIVE CAN.</span>
      </motion.h2>

      {/* Subcopy */}
      <motion.p
        className="text-sm leading-relaxed text-muted-foreground max-w-lg mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.15 }}
      >
        General-purpose AI knows everything at surface level.
        We built domain-specific models that go deep.
        When they disagree — that's the real signal.
      </motion.p>

      {/* 3 Feature Blocks */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-border pt-8">
        {[
          {
            id: "01",
            label: "SPECIALIZED",
            description: "BTC chart structure model. On-chain flow model. Derivatives structure model. Sentiment NLP model.",
          },
          {
            id: "02",
            label: "INDEPENDENT",
            description: "Each model analyzes without referencing the others. Zero cross-contamination. Parallel, unbiased.",
          },
          {
            id: "03",
            label: "CONVERGED",
            description: "Agreement raises signal strength. Conflict triggers priority rules. Output: Entry Score (0–100).",
          },
        ].map((f, i) => (
          <motion.div
            key={f.id}
            className="space-y-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: i * 0.15 }}
          >
            <div className="flex items-center gap-2 text-xs font-mono tracking-wider">
              <span className="text-accent">{f.id}</span>
              <span className="text-accent">/ {f.label}</span>
            </div>
            <p className="text-sm leading-relaxed text-foreground max-w-sm">{f.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesGrid;