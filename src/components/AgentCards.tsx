import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const agents = [
  {
    id: "AGT_01",
    name: "CHART",
    description: "Geometric pattern recognition and liquidity void detection.",
    status: "active" as const,
    stats: [
      { label: "FIB_LEVEL", value: "0.618" },
      { label: "VOL_PROFILE", value: "HIGH" },
      { label: "STATE", value: "SCANNING" },
    ],
  },
  {
    id: "AGT_02",
    name: "CHAIN",
    description: "On-chain flow monitoring and whale wallet heatmaps.",
    status: "active" as const,
    stats: [
      { label: "MEMPOOL", value: "ACTIVE" },
      { label: "NET_FLOW", value: "+492M" },
      { label: "STATE", value: "TRACKING" },
    ],
  },
  {
    id: "AGT_03",
    name: "DERIV",
    description: "Open interest spikes and funding rate arbitrage signals.",
    status: "hot" as const,
    stats: [
      { label: "OI_CHANGE", value: "+12%" },
      { label: "FUNDING", value: "0.0122" },
      { label: "STATE", value: "CRITICAL" },
    ],
    highlighted: true,
  },
  {
    id: "AGT_04",
    name: "SOCIAL",
    description: "NLP-driven sentiment analysis across 15+ social channels.",
    status: "active" as const,
    stats: [
      { label: "SENTIMENT", value: "BULL" },
      { label: "X_VOL", value: "4.2K/MIN" },
      { label: "STATE", value: "AGGREGATING" },
    ],
  },
  {
    id: "AGT_05",
    name: "ALERT",
    description: "Custom deterministic triggers and push notifications.",
    status: "idle" as const,
    stats: [
      { label: "TRIGGERS", value: "42 ACTIVE" },
      { label: "WEBHOOK", value: "STABLE" },
      { label: "STATE", value: "STANDBY" },
    ],
  },
];

const agentRoutes: Record<string, string> = {
  AGT_01: "chart",
  AGT_02: "chain",
  AGT_03: "deriv",
  AGT_04: "social",
  AGT_05: "alert",
};

const AgentCards = () => {
  const navigate = useNavigate();
  return (
    <section className="px-6 md:px-12 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-0 border border-border">
        {agents.map((agent, i) => (
          <motion.div
            key={agent.id}
            className={`border border-border p-5 flex flex-col justify-between min-h-[280px] transition-colors ${
              agent.highlighted
                ? "bg-primary text-primary-foreground"
                : "bg-card hover:bg-secondary"
            }`}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            onClick={() => navigate(`/agent/${agentRoutes[agent.id]}`)}
            style={{ cursor: "pointer" }}
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
    </section>
  );
};

export default AgentCards;
