import { motion } from "framer-motion";

const scoreData = [
  { label: "CHART ANALYSIS", score: 88.2, hasScore: true },
  { label: "ON-CHAIN FLOW", score: 65, hasScore: true },
  { label: "DERIV AGENT", score: 0, hasScore: false },
  { label: "SENTIMENT", score: 71.8, hasScore: true },
  { label: "ALERT SYSTEM", score: 0, hasScore: false },
];

const EntryScore = () => {
  return (
    <section className="px-6 md:px-12 py-20">
      <motion.div
        className="border border-border bg-card p-5 sm:p-8 md:p-12 max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
      >
        <span className="text-xs font-mono tracking-wider text-accent mb-6 block">UNIFIED INTELLIGENCE</span>

        <div className="flex flex-col sm:flex-row sm:items-end gap-2 sm:gap-6 mb-8 sm:mb-10">
          <div>
            <span className="text-sm font-mono text-muted-foreground">LONG SIGNAL</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tighter">73</span>
              <span className="text-xl text-muted-foreground font-mono">SCORE</span>
            </div>
          </div>
        </div>

        {/* Score bars */}
        <div className="space-y-3 mb-8 sm:mb-10 border border-border p-3 sm:p-5">
          {scoreData.map((item, i) => (
            <motion.div
              key={item.label}
              className="flex items-center gap-4"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <span className="text-[9px] sm:text-[10px] font-mono tracking-wider text-muted-foreground w-24 sm:w-32 shrink-0">{item.label}</span>
              <div className="flex-1 h-4 bg-border/50 overflow-hidden">
                {item.hasScore ? (
                  <motion.div
                    className="h-full bg-accent"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${item.score}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3 + i * 0.1 }}
                  />
                ) : (
                  <div className="h-full w-full bg-border/30" />
                )}
              </div>
              <span className="text-xs font-mono w-10 text-right">
                {item.hasScore ? item.score : "●"}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Description */}
        <div className="space-y-3 text-sm leading-relaxed text-muted-foreground">
          <p>Five specialist models analyze independently. The orchestration engine computes a weighted consensus. Higher agreement = higher Score. On conflict, priority rules apply (Deriv &gt; Chain &gt; Chart).</p>
          <p className="text-xs font-mono text-accent">
            ⚠ Entry Score ≠ price prediction. It scores how favorable current entry conditions are.
          </p>
        </div>
      </motion.div>
    </section>
  );
};

export default EntryScore;