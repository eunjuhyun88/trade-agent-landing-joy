import { motion } from "framer-motion";

const comparisons = [
  {
    before: "TradingView + Coinglass + Glassnode + Twitter + exchange",
    after: "One dashboard.",
  },
  {
    before: "2 hours collecting data daily",
    after: "5-minute briefing.",
  },
  {
    before: '"What does this number mean?"',
    after: "Entry Score + reasoning.",
  },
  {
    before: "Manual synthesis in your head",
    after: "5 specialist models auto-converge.",
  },
  {
    before: 'Ask a general AI "How\'s BTC?"',
    after: "Domain-specific orchestration.",
  },
];

const YourEdge = () => {
  return (
    <section className="px-6 md:px-12 py-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-4">
          YOUR <span className="text-accent">EDGE.</span>
        </h2>
        <p className="text-sm text-muted-foreground mb-10">
          What used to take 6 tabs and 2 hours now takes 5 minutes.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-border">
        {/* Header */}
        <div className="border-b border-border px-5 py-3 bg-card">
          <span className="text-xs font-mono tracking-wider text-muted-foreground">BEFORE</span>
        </div>
        <div className="border-b border-border px-5 py-3 bg-card">
          <span className="text-xs font-mono tracking-wider text-accent">AFTER</span>
        </div>

        {/* Rows */}
        {comparisons.map((row, i) => (
          <motion.div
            key={i}
            className="contents"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
          >
            <div className="border-b border-border px-5 py-4 text-sm text-muted-foreground">
              {row.before}
            </div>
            <div className="border-b border-border px-5 py-4 text-sm font-semibold text-foreground">
              {row.after}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default YourEdge;