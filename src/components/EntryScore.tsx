import { motion } from "framer-motion";

const scoreData = [
  { label: "CHART ANALYSIS", score: 88.2, hasScore: true, color: "142 70% 45%" },
  { label: "ON-CHAIN FLOW", score: 65, hasScore: true, color: "200 80% 50%" },
  { label: "DERIV AGENT", score: 0, hasScore: false, color: "0 85% 55%" },
  { label: "SENTIMENT", score: 71.8, hasScore: true, color: "270 70% 55%" },
  { label: "ALERT SYSTEM", score: 0, hasScore: false, color: "45 90% 55%" },
];

const EntryScore = () => {
  return (
    <section className="px-6 md:px-12 py-16 sm:py-20">
      <motion.div
        className="border border-border bg-card p-5 sm:p-8 md:p-12 max-w-4xl mx-auto relative overflow-hidden"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
      >
        {/* Subtle background glow */}
        <div
          className="absolute -top-20 -right-20 w-60 h-60 rounded-full opacity-20 pointer-events-none"
          style={{ background: "radial-gradient(circle, hsl(268 50% 72% / 0.3) 0%, transparent 70%)" }}
        />

        <span className="text-xs font-mono tracking-wider text-accent mb-6 block">UNIFIED INTELLIGENCE</span>

        <div className="flex flex-col sm:flex-row sm:items-end gap-2 sm:gap-6 mb-8 sm:mb-10">
          <div>
            <span className="text-sm font-mono text-muted-foreground">LONG SIGNAL</span>
            <div className="flex items-baseline gap-2 mt-1">
              <motion.span
                className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tighter"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, type: "spring" }}
              >
                73
              </motion.span>
              <span className="text-xl text-muted-foreground font-mono">/ 100</span>
            </div>
          </div>
          <motion.div
            className="flex items-center gap-2 sm:mb-2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <span className="w-2 h-2 rounded-full bg-[hsl(var(--status-active))] animate-pulse-dot" />
            <span className="text-xs font-mono text-[hsl(var(--status-active))]">CONSENSUS 3/5</span>
          </motion.div>
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
              <div className="flex items-center gap-2 w-28 sm:w-36 shrink-0">
                <span
                  className="w-1.5 h-6 shrink-0"
                  style={{ background: item.hasScore ? `hsl(${item.color})` : "hsl(var(--border))" }}
                />
                <span className="text-[9px] sm:text-[10px] font-mono tracking-wider text-muted-foreground">{item.label}</span>
              </div>
              <div className="flex-1 h-5 bg-border/30 overflow-hidden relative">
                {item.hasScore ? (
                  <motion.div
                    className="h-full"
                    style={{ background: `linear-gradient(90deg, hsl(${item.color} / 0.8), hsl(${item.color}))` }}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${item.score}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3 + i * 0.1 }}
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center">
                    <span className="text-[8px] font-mono text-muted-foreground/40 tracking-widest">STANDBY</span>
                  </div>
                )}
              </div>
              <span className="text-xs font-mono w-12 text-right" style={item.hasScore ? { color: `hsl(${item.color})` } : undefined}>
                {item.hasScore ? item.score : "—"}
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
