import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const agents = [
  {
    id: "AGT_01",
    name: "CHART",
    role: "BTC price structure specialist model",
    description: "Geometric pattern recognition + liquidity void detection across multiple timeframes.",
    status: "active" as const,
    stats: [
      { label: "FIB_LEVEL", value: "0.618" },
      { label: "VOL_PROFILE", value: "HIGH" },
      { label: "STATE", value: "SCANNING" },
    ],
    analyzes: [
      "Pattern detection (Wedge, Triangle, H&S)",
      "Support/Resistance, Order Blocks, FVG",
      "RSI, MACD, Bollinger Bands, ATR",
      "Multi-timeframe (1H / 4H / 1D)",
    ],
    sampleOutput: {
      SIGNAL: "LONG",
      CONFIDENCE: "88.2",
      ZONE: "RANGE_LOW - Support (94.2%)",
    },
    chartData: "0,55 30,50 60,60 90,45 120,35 150,38 180,25 210,28 240,22 270,18 300,15",
    color: "268 35% 72%",
  },
  {
    id: "AGT_02",
    name: "CHAIN",
    role: "On-chain fund flow specialist model",
    description: "On-chain flow monitoring + whale wallet heatmaps.",
    status: "active" as const,
    stats: [
      { label: "MEMPOOL", value: "ACTIVE" },
      { label: "NET_FLOW", value: "+492M" },
      { label: "STATE", value: "TRACKING" },
    ],
    analyzes: [
      "Exchange inflows/outflows (Binance, Coinbase, Kraken)",
      "$10M+ whale transfers in real-time",
      "Holder distribution shifts (LTH / STH)",
      "Mempool activity",
    ],
    sampleOutput: {
      SIGNAL: "ACCUMULATION",
      NET_FLOW: "-$492M (outflow = accumulation)",
      MEMPOOL: "ACTIVE",
    },
    chartData: "0,40 30,38 60,42 90,35 120,30 150,28 180,32 210,25 240,20 270,22 300,18",
    color: "142 70% 45%",
  },
  {
    id: "AGT_03",
    name: "DERIV",
    role: "Derivatives structure specialist model",
    description: "Open interest spikes + funding rate arbitrage.",
    status: "hot" as const,
    stats: [
      { label: "OI_CHANGE", value: "+12%" },
      { label: "FUNDING", value: "0.0122" },
      { label: "STATE", value: "CRITICAL" },
    ],
    highlighted: true,
    analyzes: [
      "Open Interest rate of change",
      "Funding Rate history",
      "Liquidation heatmap (long/short cluster zones)",
      "Unusual options activity detection",
    ],
    sampleOutput: {
      SIGNAL: "SHORT_SQUEEZE_POTENTIAL",
      OI_CHANGE: "+12%",
      FUNDING: "0.0122",
    },
    chartData: "0,60 30,55 60,50 90,45 120,55 150,65 180,60 210,70 240,75 270,72 300,78",
    color: "0 84% 60%",
  },
  {
    id: "AGT_04",
    name: "SOCIAL",
    role: "Market sentiment specialist NLP model",
    description: "NLP-driven sentiment analysis across 15+ channels.",
    status: "active" as const,
    stats: [
      { label: "SENTIMENT", value: "BULL" },
      { label: "X_VOL", value: "4.2K/MIN" },
      { label: "STATE", value: "AGGREGATING" },
    ],
    analyzes: [
      "Twitter / Reddit / Telegram — 15+ channels",
      "Mention volume + sentiment scoring",
      "Dominant narrative tracking",
      "Memecoin trend detection",
    ],
    sampleOutput: {
      SIGNAL: "CONTRARIAN_BULLISH",
      SENTIMENT: "BULL",
      X_VOL: "4.2K/MIN",
    },
    chartData: "0,30 30,35 60,40 90,50 120,55 150,65 180,70 210,60 240,75 270,80 300,78",
    color: "280 60% 65%",
  },
  {
    id: "AGT_05",
    name: "ALERT",
    role: "Condition-based trigger + notification system",
    description: "Custom deterministic triggers + push notifications.",
    status: "idle" as const,
    stats: [
      { label: "TRIGGERS", value: "42" },
      { label: "WEBHOOK", value: "STABLE" },
      { label: "STATE", value: "STANDBY" },
    ],
    analyzes: [
      "User-defined trigger conditions",
      "Price, indicator, on-chain event combinations",
      "Webhook + push notifications",
      "Multi-confirmation support",
    ],
    sampleOutput: {
      TRIGGERS: "42 ACTIVE",
      WEBHOOK: "STABLE",
      LAST_FIRED: "BTC crossed $100K — 3 criteria met",
    },
    chartData: "0,50 30,50 60,50 90,50 120,50 150,80 180,50 210,50 240,50 270,50 300,50",
    color: "45 90% 55%",
  },
];

const AgentCards = () => {
  const [expandedAgent, setExpandedAgent] = useState<string | null>(null);

  return (
    <section className="px-6 md:px-12 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-0 border border-border">
        {agents.map((agent, i) => {
          const isExpanded = expandedAgent === agent.id;
          return (
            <motion.div
              key={agent.id}
              className={`border border-border p-5 flex flex-col justify-between min-h-[280px] transition-colors cursor-pointer ${
                agent.highlighted
                  ? "bg-primary text-primary-foreground"
                  : isExpanded
                  ? "bg-secondary"
                  : "bg-card hover:bg-secondary"
              }`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              whileHover={!isExpanded ? { y: -4, transition: { duration: 0.2 } } : undefined}
              onClick={() => setExpandedAgent(isExpanded ? null : agent.id)}
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
          );
        })}
      </div>

      {/* Expanded Agent Detail Panel */}
      <AnimatePresence>
        {expandedAgent && (() => {
          const agent = agents.find((a) => a.id === expandedAgent);
          if (!agent) return null;
          const agentColor = `hsl(${agent.color})`;

          return (
            <motion.div
              key={expandedAgent}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="overflow-hidden border border-border border-t-0"
            >
              <div className={`p-6 md:p-8 ${agent.highlighted ? "bg-primary text-primary-foreground" : "bg-card"}`}>
                {/* Header */}
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="w-8 h-8 border flex items-center justify-center text-sm"
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
                        {/* Signal line */}
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
                            {val}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })()}
      </AnimatePresence>
    </section>
  );
};

export default AgentCards;