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
    <section className="px-6 md:px-12 py-20">
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

      <div className="space-y-0 border border-border">
        {roadmapItems.map((item, i) => (
          <motion.div
            key={item.status}
            className={`flex items-center gap-6 px-6 py-5 border-b border-border last:border-b-0 ${
              item.active ? "bg-card" : ""
            }`}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <span
              className={`text-xs font-mono tracking-wider shrink-0 w-20 ${
                item.active ? "text-status-active font-bold" : "text-muted-foreground"
              }`}
            >
              {item.status}
            </span>
            {item.active && (
              <span className="w-2 h-2 rounded-full bg-status-active animate-pulse-dot shrink-0" />
            )}
            <div>
              <span className="text-sm font-semibold">{item.label}</span>
              <span className="text-sm text-muted-foreground ml-2">— {item.description}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="mt-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
      >
        <button className="bg-primary text-primary-foreground px-6 py-3 text-xs font-mono tracking-wider hover:opacity-90 transition-opacity flex items-center gap-2">
          JOIN WAITLIST
          <span>→</span>
        </button>
      </motion.div>
    </section>
  );
};

export default Roadmap;