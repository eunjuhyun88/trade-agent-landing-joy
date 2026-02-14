import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const agents = [
// ... keep existing code (agents array lines 4-131)
];

const AgentCards = () => {
  const [expandedAgent, setExpandedAgent] = useState<string | null>(null);

  const agent = expandedAgent ? agents.find((a) => a.id === expandedAgent) : null;
  const agentColor = agent ? `hsl(${agent.color})` : "";

  return (
    <section className="px-6 md:px-12 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-0 border border-border">
        {agents.map((agent, i) => (
          <motion.div
            key={agent.id}
            className={`border border-border p-5 flex flex-col justify-between min-h-[280px] transition-colors cursor-pointer ${
              agent.highlighted
                ? "bg-primary text-primary-foreground"
                : "bg-card hover:bg-secondary"
            }`}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            onClick={() => setExpandedAgent(agent.id)}
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className={`text-xs font-mono tracking-wider ${agent.highlighted ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                  {agent.id}
                </span>
                {agent.status === "hot" ? (
                  <span className="bg-status-hot text-primary-foreground text-[10px] font-mono px-2 py-0.5 tracking-wider">HOT</span>
                ) : (
                  <span
                    className={`w-2 h-2 rounded-full ${
                      agent.status === "active" ? "bg-status-active animate-pulse-dot" : "bg-muted-foreground/40"
                    }`}
                  />
                )}
              </div>
              <h3 className="text-2xl font-bold tracking-tight mb-3">{agent.name}</h3>
              <p className={`text-xs leading-relaxed ${agent.highlighted ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                {agent.description}
              </p>
            </div>
            <div className="mt-6 space-y-1">
              {agent.stats.map((stat) => (
                <div key={stat.label} className={`flex justify-between text-[10px] font-mono tracking-wider ${agent.highlighted ? "text-primary-foreground/60" : "text-muted-foreground"}`}>
                  <span>{stat.label}:</span>
                  <span>{stat.value}</span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal Overlay */}
      <AnimatePresence>
        {agent && (
          <motion.div
            key="overlay"
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setExpandedAgent(null)}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />

            {/* Modal Content */}
            <motion.div
              className={`relative w-full max-w-3xl border border-border shadow-2xl ${
                agent.highlighted ? "bg-primary text-primary-foreground" : "bg-card"
              }`}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setExpandedAgent(null)}
                className={`absolute top-4 right-4 p-1 transition-colors ${
                  agent.highlighted ? "text-primary-foreground/60 hover:text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <X size={16} />
              </button>

              <div className="p-6 md:p-8">
                {/* Header */}
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="w-8 h-8 border flex items-center justify-center text-sm font-mono"
                    style={{ borderColor: agentColor, color: agentColor, background: `${agentColor}15` }}
                  >
                    {agent.id.slice(-2)}
                  </div>
                  <div>
                    <h4 className="text-lg font-bold tracking-tight">{agent.name}</h4>
                    <p className={`text-[10px] font-mono ${agent.highlighted ? "text-primary-foreground/60" : "text-muted-foreground"}`}>
                      {agent.role}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Mini Chart */}
                  <div>
                    <span className={`text-[9px] font-mono tracking-wider block mb-2 ${agent.highlighted ? "text-primary-foreground/60" : "text-muted-foreground"}`}>
                      SIGNAL VISUALIZATION
                    </span>
                    <div className="border border-border/50 bg-background/5 p-3 h-32">
                      <svg viewBox="0 0 300 80" className="w-full h-full" preserveAspectRatio="none">
                        <defs>
                          <linearGradient id={`agent-grad-${agent.id}`} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor={agentColor} stopOpacity="0.3" />
                            <stop offset="100%" stopColor={agentColor} stopOpacity="0" />
                          </linearGradient>
                        </defs>
                        <motion.polyline
                          points={agent.chartData}
                          fill="none"
                          stroke={agentColor}
                          strokeWidth="2"
                          vectorEffect="non-scaling-stroke"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 1.2 }}
                        />
                        <motion.polygon
                          points={`${agent.chartData} 300,80 0,80`}
                          fill={`url(#agent-grad-${agent.id})`}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.6, delay: 0.6 }}
                        />
                        <motion.line
                          x1="0" y1="40" x2="300" y2="40"
                          stroke={agentColor}
                          strokeWidth="0.5"
                          strokeDasharray="4 4"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 0.4 }}
                          transition={{ delay: 1 }}
                        />
                      </svg>
                    </div>
                  </div>

                  {/* Analyzes */}
                  <div>
                    <span className={`text-[9px] font-mono tracking-wider block mb-2 ${agent.highlighted ? "text-primary-foreground/60" : "text-muted-foreground"}`}>
                      ANALYZES
                    </span>
                    <ul className="space-y-1.5">
                      {agent.analyzes.map((item, idx) => (
                        <motion.li
                          key={idx}
                          className={`text-xs leading-relaxed flex items-start gap-2 ${agent.highlighted ? "text-primary-foreground/80" : "text-foreground/80"}`}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 + idx * 0.08 }}
                        >
                          <span style={{ color: agentColor }} className="mt-0.5 text-[8px]">▸</span>
                          {item}
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  {/* Sample Output */}
                  <div>
                    <span className={`text-[9px] font-mono tracking-wider block mb-2 ${agent.highlighted ? "text-primary-foreground/60" : "text-muted-foreground"}`}>
                      SAMPLE OUTPUT
                    </span>
                    <div className={`border p-3 space-y-1 ${agent.highlighted ? "border-primary-foreground/20 bg-primary-foreground/5" : "border-border bg-secondary/50"}`}>
                      {Object.entries(agent.sampleOutput).map(([key, val], idx) => (
                        <motion.div
                          key={key}
                          className="flex justify-between text-[10px] font-mono"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.3 + idx * 0.1 }}
                        >
                          <span className={agent.highlighted ? "text-primary-foreground/50" : "text-muted-foreground"}>{key}:</span>
                          <span className={agent.highlighted ? "text-primary-foreground" : "text-foreground"} style={key === "SIGNAL" ? { color: agentColor } : undefined}>
                            {val as string}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default AgentCards;