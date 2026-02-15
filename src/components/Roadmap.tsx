import { motion } from "framer-motion";

const roadmapItems = [
  {
    status: "LIVE",
    label: "AI Orchestration Engine",
    description: "5 specialist models, real-time analysis",
    active: true,
  },
  {
    status: "Q2 2026",
    label: "Trading Passport",
    description: "On-chain verified signal marketplace",
    active: false,
  },
  {
    status: "Q3 2026",
    label: "Prediction Market",
    description: "Bet on signal outcomes",
    active: false,
  },
];

const Roadmap = () => {
  return (
    <section className="px-6 md:px-12 py-16 sm:py-20">
      <motion.div
        className="mb-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <span className="text-xs font-mono tracking-wider text-accent">ROADMAP</span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-2">
          WHAT'S <span className="text-accent">NEXT.</span>
        </h2>
        <div className="w-full h-[1px] bg-border mb-10" />
      </motion.div>

      {/* Timeline with vertical line */}
      <div className="relative">
        {/* Vertical timeline line */}
        <div className="absolute left-[39px] sm:left-[47px] top-0 bottom-0 w-[1px] bg-border" />

        <div className="space-y-0">
          {roadmapItems.map((item, i) => (
            <motion.div
              key={item.status}
              className={`flex items-start gap-4 sm:gap-6 px-4 sm:px-6 py-5 sm:py-6 relative ${
                item.active ? "" : ""
              }`}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
            >
              {/* Timeline dot */}
              <div className="relative z-10 shrink-0 w-5 flex justify-center pt-0.5">
                {item.active ? (
                  <motion.div
                    className="w-3 h-3 rounded-full bg-[hsl(var(--status-active))]"
                    animate={{ boxShadow: ["0 0 0px hsl(142 76% 36% / 0.4)", "0 0 12px hsl(142 76% 36% / 0.6)", "0 0 0px hsl(142 76% 36% / 0.4)"] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                ) : (
                  <div className="w-3 h-3 rounded-full border-2 border-border bg-background" />
                )}
              </div>

              {/* Content */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 flex-1">
                <span
                  className={`text-xs font-mono tracking-wider shrink-0 w-20 ${
                    item.active ? "text-[hsl(var(--status-active))] font-bold" : "text-muted-foreground"
                  }`}
                >
                  {item.status}
                </span>
                <div className="flex-1">
                  <span className="text-sm font-semibold">{item.label}</span>
                  <span className="text-sm text-muted-foreground ml-2">— {item.description}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div
        className="mt-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
      >
        <button className="bg-accent text-accent-foreground px-6 py-3 text-xs font-mono tracking-wider hover:opacity-90 transition-opacity flex items-center gap-2"
          style={{ boxShadow: "0 0 20px hsl(268 50% 72% / 0.15)" }}
        >
          JOIN WAITLIST
          <span>→</span>
        </button>
      </motion.div>
    </section>
  );
};

export default Roadmap;
