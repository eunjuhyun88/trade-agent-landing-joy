import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  BarChart3, Link2, TrendingUp, MessageSquare, Clock,
  ArrowLeft, ExternalLink,
} from "lucide-react";

const agents = [
  {
    id: "chart",
    code: "AGT_01",
    name: "CHART",
    fullName: "Chart Analysis Agent",
    category: "Technical Analysis",
    color: "268 35% 72%",
    icon: <BarChart3 size={18} />,
    status: "active" as const,
    description: "Geometric pattern recognition and liquidity void detection across multiple timeframes.",
    stats: [
      { label: "FIB_LEVEL", value: "0.618" },
      { label: "VOL_PROFILE", value: "HIGH" },
      { label: "RSI_14", value: "58.3" },
      { label: "STATE", value: "SCANNING" },
    ],
    recentSignal: "BTC descending wedge breakout target $108,500. RSI divergence at 0.618 fib.",
  },
  {
    id: "chain",
    code: "AGT_02",
    name: "CHAIN",
    fullName: "On-Chain Analysis Agent",
    category: "Blockchain Intelligence",
    color: "142 70% 45%",
    icon: <Link2 size={18} />,
    status: "active" as const,
    description: "On-chain flow monitoring, whale wallet heatmaps, and smart money tracking.",
    stats: [
      { label: "NET_FLOW", value: "+492M" },
      { label: "MEMPOOL", value: "ACTIVE" },
      { label: "GAS", value: "34 Gwei" },
      { label: "STATE", value: "TRACKING" },
    ],
    recentSignal: "15,000 BTC ($1.53B) moved from cold storage to Coinbase Prime.",
  },
  {
    id: "deriv",
    code: "AGT_03",
    name: "DERIV",
    fullName: "Derivatives Agent",
    category: "Futures & Options",
    color: "0 84% 60%",
    icon: <TrendingUp size={18} />,
    status: "hot" as const,
    description: "Open interest spikes, funding rate arbitrage, and liquidation cascade detection.",
    stats: [
      { label: "OI", value: "$38.2B" },
      { label: "FUNDING", value: "0.0122%" },
      { label: "LIQ_24H", value: "$245M" },
      { label: "STATE", value: "CRITICAL" },
    ],
    recentSignal: "BTC OI surged 12% in 4H. Funding at 0.0122% — liquidation risk elevated.",
  },
  {
    id: "social",
    code: "AGT_04",
    name: "SOCIAL",
    fullName: "Social Sentiment Agent",
    category: "NLP Analysis",
    color: "280 60% 65%",
    icon: <MessageSquare size={18} />,
    status: "active" as const,
    description: "NLP-driven sentiment analysis across 15+ social channels in real-time.",
    stats: [
      { label: "SENTIMENT", value: "87/100" },
      { label: "MENTIONS", value: "4.2K/min" },
      { label: "MOOD", value: "GREED" },
      { label: "STATE", value: "AGGREGATING" },
    ],
    recentSignal: "SOL mentions up 89% in 24h. Extreme bullish bias — contrarian signal watch.",
  },
  {
    id: "alert",
    code: "AGT_05",
    name: "ALERT",
    fullName: "Alert System Agent",
    category: "Trigger Engine",
    color: "45 90% 55%",
    icon: <Clock size={18} />,
    status: "idle" as const,
    description: "Custom deterministic triggers, push notifications, and webhook integrations.",
    stats: [
      { label: "ACTIVE", value: "42" },
      { label: "FIRED_24H", value: "3" },
      { label: "UPTIME", value: "99.97%" },
      { label: "STATE", value: "STANDBY" },
    ],
    recentSignal: "BTC > $100K trigger fired. All 3 confirmations met. 12 webhooks notified.",
  },
];

const Agents = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Top Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-6">
            <button
              onClick={() => navigate("/")}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft size={18} />
            </button>
            <span className="text-xl font-bold tracking-tight">CLAWHOO.</span>
            <div className="h-4 w-px bg-border" />
            <span className="text-xs font-mono tracking-wider text-muted-foreground">
              AGENT_OVERVIEW / ALL_SYSTEMS
            </span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-status-active animate-pulse-dot" />
              <span className="text-xs font-mono text-muted-foreground">4 ACTIVE</span>
            </div>
            <span className="text-xs font-mono text-muted-foreground">1 STANDBY</span>
          </div>
        </div>
      </nav>

      <main className="pt-20 px-6 md:px-12 pb-12">
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">AGENT SYSTEMS</h1>
          <p className="text-sm text-muted-foreground font-mono">
            Real-time monitoring dashboard — 5 autonomous analysis agents
          </p>
        </motion.div>

        {/* Agent Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-0 border border-border">
          {agents.map((agent, i) => {
            const agentColor = `hsl(${agent.color})`;
            return (
              <motion.div
                key={agent.id}
                className="border border-border bg-card hover:bg-secondary transition-colors cursor-pointer group"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                onClick={() => navigate(`/agent/${agent.id}`)}
              >
                {/* Card Header */}
                <div className="flex items-center justify-between p-5 border-b border-border">
                  <div className="flex items-center gap-3">
                    <span style={{ color: agentColor }}>{agent.icon}</span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-lg tracking-tight">{agent.name}</span>
                        <span className="text-[10px] font-mono text-muted-foreground">{agent.code}</span>
                      </div>
                      <span className="text-[10px] font-mono text-muted-foreground tracking-wider">
                        {agent.category}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {agent.status === "hot" ? (
                      <span className="bg-status-hot text-primary-foreground text-[10px] font-mono px-2 py-0.5 tracking-wider">
                        HOT
                      </span>
                    ) : agent.status === "active" ? (
                      <span className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-status-active animate-pulse-dot" />
                        <span className="text-[10px] font-mono text-muted-foreground">ACTIVE</span>
                      </span>
                    ) : (
                      <span className="text-[10px] font-mono text-muted-foreground">IDLE</span>
                    )}
                    <ExternalLink
                      size={12}
                      className="text-muted-foreground/0 group-hover:text-muted-foreground transition-colors ml-2"
                    />
                  </div>
                </div>

                {/* Description */}
                <div className="px-5 pt-4 pb-3">
                  <p className="text-xs text-muted-foreground leading-relaxed">{agent.description}</p>
                </div>

                {/* Stats Grid */}
                <div className="px-5 pb-4">
                  <div className="grid grid-cols-2 gap-x-6 gap-y-1.5">
                    {agent.stats.map((stat) => (
                      <div
                        key={stat.label}
                        className="flex justify-between text-[10px] font-mono tracking-wider text-muted-foreground"
                      >
                        <span>{stat.label}:</span>
                        <span
                          className="text-foreground"
                          style={
                            stat.label === "STATE"
                              ? { color: agentColor }
                              : undefined
                          }
                        >
                          {stat.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Signal */}
                <div className="px-5 pb-5 pt-2 border-t border-border">
                  <span className="text-[10px] font-mono tracking-wider text-muted-foreground block mb-1.5">
                    LATEST_SIGNAL
                  </span>
                  <p className="text-xs text-foreground/80 leading-relaxed line-clamp-2">
                    {agent.recentSignal}
                  </p>
                </div>
              </motion.div>
            );
          })}

          {/* Empty cell for grid alignment on 3-col */}
          <motion.div
            className="border border-border bg-card/50 hidden xl:flex items-center justify-center min-h-[280px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="text-center">
              <span className="text-[10px] font-mono text-muted-foreground/50 tracking-wider block mb-2">
                SLOT_AVAILABLE
              </span>
              <span className="text-muted-foreground/30 text-3xl">+</span>
              <span className="text-[10px] font-mono text-muted-foreground/40 tracking-wider block mt-2">
                DEPLOY NEW AGENT
              </span>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Agents;
