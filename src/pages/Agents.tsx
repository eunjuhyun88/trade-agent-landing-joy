import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  BarChart3, Link2, TrendingUp, MessageSquare, Clock,
  ArrowLeft, ExternalLink, Search, Send, ChevronDown, Settings, Plus,
} from "lucide-react";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";

const sharedWatchlist = [
  { ticker: "BTC", name: "Bitcoin", price: "101,890", change: 2.41 },
  { ticker: "ETH", name: "Ethereum", price: "3,842", change: -1.32 },
  { ticker: "SOL", name: "Solana", price: "248.50", change: 5.67 },
  { ticker: "AVAX", name: "Avalanche", price: "42.18", change: -0.89 },
  { ticker: "DOGE", name: "Dogecoin", price: "0.182", change: 3.12 },
  { ticker: "XRP", name: "Ripple", price: "2.41", change: 1.05 },
];

const agents = [
  {
    id: "chart",
    code: "AGT_01",
    name: "CHART",
    fullName: "Chart Analysis Agent",
    category: "Technical Analysis",
    color: "268 35% 72%",
    icon: <BarChart3 size={16} />,
    status: "active" as const,
    description: "Geometric pattern recognition and liquidity void detection across multiple timeframes.",
    stats: [
      { label: "FIB_LEVEL", value: "0.618" },
      { label: "VOL_PROFILE", value: "HIGH" },
      { label: "RSI_14", value: "58.3" },
      { label: "STATE", value: "SCANNING" },
    ],
    recentSignal: "BTC descending wedge breakout target $108,500. RSI divergence at 0.618 fib.",
    feed: [
      { time: "09:30 EST", date: "Friday, February 14, 2026", content: "BTC is forming a descending wedge pattern on the 4H chart with a potential breakout target of $108,500. RSI divergence detected at the 0.618 Fibonacci retracement level." },
      { time: "08:15 EST", content: "ETH/BTC ratio testing critical support at 0.032. Historical data suggests a bounce from this level with 78% probability." },
      { time: "16:00 EST", date: "Thursday, February 13, 2026", content: "SOL completed a cup-and-handle formation on the weekly chart. Measured move target sits at $285." },
    ],
    headlines: [
      { time: "06:47", text: "BTC breaks $100K as institutional inflows hit record $2.1B weekly", sentiment: "bull" as const },
      { time: "06:18", text: "ETH gas fees spike 300% amid NFT mint frenzy", sentiment: "neutral" as const },
      { time: "02:31", text: "Fibonacci confluence zone holds: SOL bounces from $198 support", sentiment: "bull" as const },
      { time: "23:46", text: "Market-wide liquidation cascade wipes $500M in overleveraged longs", sentiment: "bear" as const },
    ],
    marketStats: [
      { label: "O", value: "98,420" },
      { label: "H", value: "102,350" },
      { label: "L", value: "97,180" },
      { label: "C", value: "101,890" },
    ],
  },
  {
    id: "chain",
    code: "AGT_02",
    name: "CHAIN",
    fullName: "On-Chain Analysis Agent",
    category: "Blockchain Intelligence",
    color: "142 70% 45%",
    icon: <Link2 size={16} />,
    status: "active" as const,
    description: "On-chain flow monitoring, whale wallet heatmaps, and smart money tracking.",
    stats: [
      { label: "NET_FLOW", value: "+492M" },
      { label: "MEMPOOL", value: "ACTIVE" },
      { label: "GAS", value: "34 Gwei" },
      { label: "STATE", value: "TRACKING" },
    ],
    recentSignal: "15,000 BTC ($1.53B) moved from cold storage to Coinbase Prime.",
    feed: [
      { time: "10:00 UTC", date: "Friday, February 14, 2026", content: "Massive whale movement detected: 15,000 BTC ($1.53B) transferred from cold storage to Coinbase Prime." },
      { time: "08:30 UTC", content: "Ethereum staking deposits surged 40% in the last 24 hours, with 32,000 ETH entering the beacon chain." },
    ],
    headlines: [
      { time: "07:12", text: "Whale alert: 50,000 ETH moved to unknown wallet from exchange", sentiment: "bull" as const },
      { time: "05:45", text: "DeFi TVL reaches new ATH of $320B across all chains", sentiment: "bull" as const },
      { time: "03:20", text: "Mempool congestion spikes as NFT collection drops", sentiment: "neutral" as const },
    ],
    marketStats: [
      { label: "NET_FLOW", value: "+492M" },
      { label: "MEMPOOL", value: "ACTIVE" },
      { label: "GAS", value: "34 Gwei" },
      { label: "VALIDATORS", value: "982K" },
    ],
  },
  {
    id: "deriv",
    code: "AGT_03",
    name: "DERIV",
    fullName: "Derivatives Agent",
    category: "Futures & Options",
    color: "0 84% 60%",
    icon: <TrendingUp size={16} />,
    status: "hot" as const,
    description: "Open interest spikes, funding rate arbitrage, and liquidation cascade detection.",
    stats: [
      { label: "OI", value: "$38.2B" },
      { label: "FUNDING", value: "0.0122%" },
      { label: "LIQ_24H", value: "$245M" },
      { label: "STATE", value: "CRITICAL" },
    ],
    recentSignal: "BTC OI surged 12% in 4H. Funding at 0.0122% — liquidation risk elevated.",
    feed: [
      { time: "11:00 EST", date: "Friday, February 14, 2026", content: "BTC open interest surged 12% in the last 4 hours, reaching $38.2B across major exchanges. Funding rates turning positive at 0.0122%." },
      { time: "09:45 EST", content: "ETH options market showing unusual activity: $105M in call options purchased at $4,500 strike for March expiry." },
    ],
    headlines: [
      { time: "08:30", text: "BTC futures premium hits 15% annualized, highest since bull run peak", sentiment: "bull" as const },
      { time: "07:00", text: "Record $2.1B in options expiring Friday, max pain at $96K", sentiment: "neutral" as const },
      { time: "04:15", text: "Funding rates spike to 0.03% on Binance, overheated longs", sentiment: "bear" as const },
    ],
    marketStats: [
      { label: "OI", value: "$38.2B" },
      { label: "FUNDING", value: "0.0122%" },
      { label: "LIQ_24H", value: "$245M" },
      { label: "BASIS", value: "0.45%" },
    ],
  },
  {
    id: "social",
    code: "AGT_04",
    name: "SOCIAL",
    fullName: "Social Sentiment Agent",
    category: "NLP Analysis",
    color: "280 60% 65%",
    icon: <MessageSquare size={16} />,
    status: "active" as const,
    description: "NLP-driven sentiment analysis across 15+ social channels in real-time.",
    stats: [
      { label: "SENTIMENT", value: "87/100" },
      { label: "MENTIONS", value: "4.2K/min" },
      { label: "MOOD", value: "GREED" },
      { label: "STATE", value: "AGGREGATING" },
    ],
    recentSignal: "SOL mentions up 89% in 24h. Extreme bullish bias — contrarian signal watch.",
    feed: [
      { time: "12:00 EST", date: "Friday, February 14, 2026", content: "Sentiment analysis across 15+ channels shows extreme bullish bias for SOL, with mention volume up 89% in 24 hours." },
      { time: "10:30 EST", content: "New memecoin trend detected on Telegram: 'AI Agent' themed tokens gaining traction with combined volume exceeding $50M." },
    ],
    headlines: [
      { time: "09:00", text: "Elon Musk tweets about DOGE, social volume spikes 500%", sentiment: "bull" as const },
      { time: "07:30", text: "Vitalik posts ETH roadmap update, community sentiment surges", sentiment: "bull" as const },
      { time: "05:00", text: "FUD spreading about major exchange hack rumor (unverified)", sentiment: "bear" as const },
    ],
    marketStats: [
      { label: "SENTIMENT", value: "87/100" },
      { label: "MENTIONS", value: "4.2K/min" },
      { label: "MOOD", value: "EXTREME GREED" },
      { label: "INFLUENCER", value: "BULLISH" },
    ],
  },
  {
    id: "alert",
    code: "AGT_05",
    name: "ALERT",
    fullName: "Alert System Agent",
    category: "Trigger Engine",
    color: "45 90% 55%",
    icon: <Clock size={16} />,
    status: "idle" as const,
    description: "Custom deterministic triggers, push notifications, and webhook integrations.",
    stats: [
      { label: "ACTIVE", value: "42" },
      { label: "FIRED_24H", value: "3" },
      { label: "UPTIME", value: "99.97%" },
      { label: "STATE", value: "STANDBY" },
    ],
    recentSignal: "BTC > $100K trigger fired. All 3 confirmations met. 12 webhooks notified.",
    feed: [
      { time: "13:00 EST", date: "Friday, February 14, 2026", content: "TRIGGER FIRED: BTC crossed $100,000 resistance level. All 3 confirmation criteria met. Webhook notification sent to 12 connected endpoints." },
      { time: "11:15 EST", content: "TRIGGER ARMED: ETH funding rate approaching 0.02% threshold on Binance. Currently at 0.0187%." },
    ],
    headlines: [
      { time: "13:00", text: "FIRED: BTC > $100K trigger activated across 12 webhooks", sentiment: "bull" as const },
      { time: "11:15", text: "ARMED: ETH funding rate nearing critical threshold", sentiment: "neutral" as const },
      { time: "08:00", text: "STANDBY: 42 triggers active, system nominal", sentiment: "neutral" as const },
    ],
    marketStats: [
      { label: "ACTIVE", value: "42" },
      { label: "FIRED_24H", value: "3" },
      { label: "UPTIME", value: "99.97%" },
      { label: "LATENCY", value: "230ms" },
    ],
  },
];

const Agents = () => {
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState("chart");
  const selected = agents.find((a) => a.id === selectedId)!;
  const agentColor = `hsl(${selected.color})`;

  return (
    <div className="h-screen bg-background text-foreground flex flex-col overflow-hidden">
      {/* Top Bar */}
      <nav className="border-b border-border bg-background/95 backdrop-blur-sm flex items-center justify-between px-4 py-3 shrink-0">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate("/")} className="text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft size={18} />
          </button>
          <span className="text-lg font-bold tracking-tight">CLAWHOO.</span>
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
      </nav>

      {/* Main Layout */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Detail Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-border shrink-0">
          <div className="flex items-center gap-3">
            <span style={{ color: agentColor }}>{selected.icon}</span>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-base tracking-tight">{selected.name}</span>
                <span className="text-[10px] font-mono text-muted-foreground">/ {selected.category}</span>
              </div>
              <p className="text-[10px] text-muted-foreground">{selected.description}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(`/agent/${selectedId}`)}
              className="flex items-center gap-1.5 text-[10px] font-mono text-muted-foreground hover:text-foreground transition-colors"
            >
              FULL VIEW <ExternalLink size={10} />
            </button>
            <button className="bg-primary text-primary-foreground px-3 py-1 text-[10px] font-mono tracking-wider hover:opacity-90 transition-opacity">
              INITIALIZE
            </button>
          </div>
        </div>

        {/* Resizable: Watchlist | Feed | Market */}
        <ResizablePanelGroup direction="horizontal" className="flex-1">
          {/* Watchlist (shared, stable) */}
          <ResizablePanel defaultSize={22} minSize={15} maxSize={35}>
            <div className="h-full flex flex-col overflow-hidden border-r border-border">
              <div className="p-3 border-b border-border">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono tracking-wider text-muted-foreground">WATCHLIST</span>
                  <Settings size={12} className="text-muted-foreground" />
                </div>
                <div className="flex items-center gap-1.5 border border-border bg-card px-2 py-1">
                  <Search size={10} className="text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="bg-transparent text-[10px] font-mono outline-none flex-1 min-w-0 placeholder:text-muted-foreground/50"
                  />
                </div>
              </div>
              <div className="flex-1 overflow-y-auto p-1.5">
                {sharedWatchlist.map((item) => (
                  <div
                    key={item.ticker}
                    className="flex items-center justify-between px-2 py-1.5 hover:bg-secondary cursor-pointer transition-colors"
                  >
                    <div className="min-w-0 flex-1 mr-2">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[11px] font-bold block truncate">{item.ticker}</span>
                        <span className="text-[9px] text-muted-foreground truncate">{item.name}</span>
                      </div>
                      <span className="text-[10px] font-mono text-foreground/70">${item.price}</span>
                    </div>
                    <span className={`text-[10px] font-mono shrink-0 ${item.change > 0 ? "text-status-active" : item.change < 0 ? "text-status-hot" : "text-muted-foreground"}`}>
                      {item.change > 0 ? "+" : ""}{item.change.toFixed(1)}%
                    </span>
                  </div>
                ))}
              </div>
              <div className="border-t border-border p-1.5">
                <button className="flex items-center gap-1.5 text-[9px] font-mono text-muted-foreground hover:text-foreground transition-colors w-full px-2 py-1">
                  <Plus size={9} />
                  <span>Add Ticker</span>
                </button>
              </div>
            </div>
          </ResizablePanel>

          <ResizableHandle withHandle />

          {/* Feed with Agent Tabs on top */}
          <ResizablePanel defaultSize={48} minSize={30}>
            <div className="h-full flex flex-col overflow-hidden">
              {/* Agent Icon Tabs */}
              <div className="flex items-center border-b border-border shrink-0">
                {agents.map((agent) => {
                  const isActive = agent.id === selectedId;
                  const color = `hsl(${agent.color})`;
                  return (
                    <button
                      key={agent.id}
                      onClick={() => setSelectedId(agent.id)}
                      className={`flex-1 flex items-center justify-center py-2.5 transition-colors relative ${
                        isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground/70"
                      }`}
                      title={agent.fullName}
                    >
                      <span style={isActive ? { color } : undefined}>{agent.icon}</span>
                      {isActive && (
                        <motion.div
                          className="absolute bottom-0 left-0 right-0 h-[2px]"
                          style={{ backgroundColor: color }}
                          layoutId="agentTabIndicator"
                          transition={{ type: "spring", stiffness: 500, damping: 35 }}
                        />
                      )}
                      {agent.status === "hot" && (
                        <span className="absolute top-1 right-1/4 w-1.5 h-1.5 rounded-full bg-status-hot" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Feed Content - only this animates */}
              <div className="flex-1 overflow-y-auto px-5 py-4">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedId}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.2 }}
                  >
                    {selected.feed.map((entry, i) => (
                      <div key={`${selectedId}-${i}`}>
                        {entry.date && (
                          <div className="mb-2 mt-4 first:mt-0">
                            <span className="font-mono text-[10px] tracking-wide text-foreground/70">{entry.date}</span>
                          </div>
                        )}
                        <div className="mb-4 pb-4 border-b border-border/50 last:border-0">
                          <span className="text-[9px] font-mono text-muted-foreground">{entry.time}</span>
                          <p className="mt-1.5 text-xs leading-relaxed text-foreground/90">{entry.content}</p>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Chat Input */}
              <div className="border-t border-border p-3">
                <div className="border border-border bg-card px-3 py-2">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-muted-foreground/50 font-mono text-xs">&gt;</span>
                    <input
                      type="text"
                      placeholder="Ask your agent anything..."
                      className="bg-transparent text-xs font-mono outline-none flex-1 min-w-0 placeholder:text-muted-foreground/40"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button className="text-[9px] font-mono text-muted-foreground flex items-center gap-1 hover:text-foreground transition-colors">
                        /Deep Research <ChevronDown size={8} />
                      </button>
                    </div>
                    <button className="text-muted-foreground hover:text-foreground transition-colors" style={{ color: agentColor }}>
                      <Send size={12} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </ResizablePanel>

          <ResizableHandle withHandle />

          {/* Market Data & Headlines */}
          <ResizablePanel defaultSize={30} minSize={18} maxSize={40}>
            <div className="h-full flex flex-col overflow-hidden border-l border-border">
              <div className="p-3 border-b border-border">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono tracking-wider" style={{ color: agentColor }}>MARKET LIVE</span>
                  <ExternalLink size={10} className="text-muted-foreground" />
                </div>
                <div className="border border-border bg-card p-2.5">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="font-bold text-xs">{sharedWatchlist[0]?.ticker}</span>
                    <span className="text-[9px] font-mono text-muted-foreground truncate">{sharedWatchlist[0]?.name}</span>
                  </div>
                  <div className="flex gap-2 text-[9px] font-mono text-muted-foreground mb-2 flex-wrap">
                    {selected.marketStats.map((stat) => (
                      <span key={stat.label} className="whitespace-nowrap">
                        <span>{stat.label}</span>{" "}
                        <span className="text-foreground">{stat.value}</span>
                      </span>
                    ))}
                  </div>
                  <svg viewBox="0 0 300 80" className="w-full h-14">
                    <defs>
                      <linearGradient id={`grad-${selectedId}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={agentColor} stopOpacity="0.3" />
                        <stop offset="100%" stopColor={agentColor} stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <motion.path
                      d="M0,55 L40,50 L80,60 L120,45 L160,35 L200,38 L240,25 L280,28 L300,20"
                      fill="none"
                      stroke={agentColor}
                      strokeWidth="1.5"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1.5, delay: 0.2 }}
                    />
                    <motion.path
                      d="M0,55 L40,50 L80,60 L120,45 L160,35 L200,38 L240,25 L280,28 L300,20 L300,80 L0,80 Z"
                      fill={`url(#grad-${selectedId})`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.8, delay: 1 }}
                    />
                  </svg>
                </div>
              </div>

              {/* Headlines - animate on switch */}
              <div className="flex-1 overflow-y-auto p-3">
                <div className="mb-2">
                  <span className="font-mono text-[9px] tracking-wider text-muted-foreground">HEADLINES</span>
                </div>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedId}
                    className="space-y-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {selected.headlines.map((headline, i) => (
                      <div
                        key={`${selectedId}-h-${i}`}
                        className="flex gap-2 group cursor-pointer py-0.5"
                      >
                        <span className="text-[9px] font-mono text-muted-foreground shrink-0 mt-0.5">{headline.time}</span>
                        <p className={`text-[10px] leading-relaxed group-hover:underline ${
                          headline.sentiment === "bull"
                            ? "text-status-active"
                            : headline.sentiment === "bear"
                              ? "text-status-hot"
                              : "text-foreground/70"
                        }`}>
                          {headline.text}
                        </p>
                      </div>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
};

export default Agents;
