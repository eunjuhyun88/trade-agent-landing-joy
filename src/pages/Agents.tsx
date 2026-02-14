import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  BarChart3, Link2, TrendingUp, MessageSquare, Clock,
  ExternalLink, Search, Send, Settings, Plus, ChevronDown,
} from "lucide-react";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import AppNav from "@/components/AppNav";

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
    emoji: "📐",
    status: "active" as const,
    score: 88.2,
    description: "Geometric pattern recognition and liquidity void detection across multiple timeframes.",
    clusterDetails: [
      { label: "RANGE_LOW - Support", value: "94.2%" },
      { label: "EQ_REJECTION", value: "12.8%" },
      { label: "LIQUIDITY_GAP - Bullish", value: "88.7%" },
    ],
    clusterMeta: [
      { label: "RSI", value: "32.4", color: "accent" },
      { label: "MACD", value: "Bullish X", color: "green" },
    ],
    feed: [
      { time: "09:30 EST", date: "Friday, February 14, 2026", content: "BTC is forming a descending wedge pattern on the 4H chart with a potential breakout target of $108,500. RSI divergence detected at the 0.618 Fibonacci retracement level." },
      { time: "08:15 EST", content: "ETH/BTC ratio testing critical support at 0.032. Historical data suggests a bounce from this level with 78% probability." },
      { time: "16:00 EST", date: "Thursday, February 13, 2026", content: "SOL completed a cup-and-handle formation on the weekly chart. Measured move target sits at $285." },
    ],
    headlines: [
      { time: "06:47", text: "BTC breaks $100K as institutional inflows hit record $2.1B weekly", sentiment: "bull" as const },
      { time: "06:18", text: "ETH gas fees spike 300% amid NFT mint frenzy", sentiment: "neutral" as const },
      { time: "02:31", text: "Fibonacci confluence zone holds: SOL bounces from $198 support", sentiment: "bull" as const },
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
    fullName: "On-Chain Flow",
    category: "Blockchain Intelligence",
    color: "142 70% 45%",
    icon: <Link2 size={16} />,
    emoji: "⛓",
    status: "active" as const,
    score: 65.0,
    description: "On-chain flow monitoring, whale wallet heatmaps, and smart money tracking.",
    clusterDetails: [
      { label: "Exchange Outflow", value: "+2,340 SOL" },
      { label: "Whale Activity", value: "HIGH" },
    ],
    clusterMeta: [],
    feed: [
      { time: "10:00 UTC", date: "Friday, February 14, 2026", content: "Massive whale movement detected: 15,000 BTC ($1.53B) transferred from cold storage to Coinbase Prime." },
      { time: "08:30 UTC", content: "Ethereum staking deposits surged 40% in the last 24 hours, with 32,000 ETH entering the beacon chain." },
    ],
    headlines: [
      { time: "07:12", text: "Whale alert: 50,000 ETH moved to unknown wallet from exchange", sentiment: "bull" as const },
      { time: "05:45", text: "DeFi TVL reaches new ATH of $320B across all chains", sentiment: "bull" as const },
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
    fullName: "Deriv Agent",
    category: "Futures & Options",
    color: "0 84% 60%",
    icon: <TrendingUp size={16} />,
    emoji: "📡",
    status: "hot" as const,
    score: 0,
    description: "Open interest spikes, funding rate arbitrage, and liquidation cascade detection.",
    clusterDetails: [
      { label: "FUNDING", value: "-0.012%", color: "hot" },
      { label: "OI", value: "+3.2%", color: "active" },
    ],
    clusterMeta: [],
    feed: [
      { time: "11:00 EST", date: "Friday, February 14, 2026", content: "BTC open interest surged 12% in the last 4 hours, reaching $38.2B across major exchanges. Funding rates turning positive at 0.0122%." },
      { time: "09:45 EST", content: "ETH options market showing unusual activity: $105M in call options purchased at $4,500 strike for March expiry." },
    ],
    headlines: [
      { time: "08:30", text: "BTC futures premium hits 15% annualized, highest since bull run peak", sentiment: "bull" as const },
      { time: "07:00", text: "Record $2.1B in options expiring Friday, max pain at $96K", sentiment: "neutral" as const },
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
    fullName: "Sentiment",
    category: "NLP Analysis",
    color: "280 60% 65%",
    icon: <MessageSquare size={16} />,
    emoji: "💬",
    status: "active" as const,
    score: 71.8,
    description: "NLP-driven sentiment analysis across 15+ social channels in real-time.",
    clusterDetails: [],
    clusterMeta: [],
    feed: [
      { time: "12:00 EST", date: "Friday, February 14, 2026", content: "Sentiment analysis across 15+ channels shows extreme bullish bias for SOL, with mention volume up 89% in 24 hours." },
      { time: "10:30 EST", content: "New memecoin trend detected on Telegram: 'AI Agent' themed tokens gaining traction with combined volume exceeding $50M." },
    ],
    headlines: [
      { time: "09:00", text: "Elon Musk tweets about DOGE, social volume spikes 500%", sentiment: "bull" as const },
      { time: "07:30", text: "Vitalik posts ETH roadmap update, community sentiment surges", sentiment: "bull" as const },
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
    fullName: "Alert System",
    category: "Trigger Engine",
    color: "45 90% 55%",
    icon: <Clock size={16} />,
    emoji: "🌐",
    status: "idle" as const,
    score: 0,
    description: "Custom deterministic triggers, push notifications, and webhook integrations.",
    clusterDetails: [],
    clusterMeta: [],
    feed: [
      { time: "13:00 EST", date: "Friday, February 14, 2026", content: "TRIGGER FIRED: BTC crossed $100,000 resistance level. All 3 confirmation criteria met. Webhook notification sent to 12 connected endpoints." },
      { time: "11:15 EST", content: "TRIGGER ARMED: ETH funding rate approaching 0.02% threshold on Binance. Currently at 0.0187%." },
    ],
    headlines: [
      { time: "13:00", text: "FIRED: BTC > $100K trigger activated across 12 webhooks", sentiment: "bull" as const },
      { time: "11:15", text: "ARMED: ETH funding rate nearing critical threshold", sentiment: "neutral" as const },
    ],
    marketStats: [
      { label: "ACTIVE", value: "42" },
      { label: "FIRED_24H", value: "3" },
      { label: "UPTIME", value: "99.97%" },
      { label: "LATENCY", value: "230ms" },
    ],
  },
];

const timeframes = ["1M", "5M", "15M", "1H", "4H"];

const Agents = () => {
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState("chart");
  const [selectedTf, setSelectedTf] = useState("1H");
  const selected = agents.find((a) => a.id === selectedId)!;
  const agentColor = `hsl(${selected.color})`;
  const selectedTicker = sharedWatchlist[0];

  return (
    <div className="h-screen bg-background text-foreground flex flex-col overflow-hidden">
      <AppNav
        activeTab="trade"
        activeAgent={selectedId}
        agents={agents}
        onAgentChange={(id) => setSelectedId(id)}
      />

      {/* Main App */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <ResizablePanelGroup direction="horizontal" className="flex-1">
          {/* LEFT: Watchlist + Intel Feed */}
          <ResizablePanel defaultSize={22} minSize={15} maxSize={35}>
            <div className="h-full flex flex-col overflow-hidden">
              <div className="p-2.5 border-b border-border flex items-center justify-between shrink-0">
                <span className="text-[9px] font-mono font-semibold tracking-[1px] text-status-active">MY PORTFOLIO</span>
                <div className="flex gap-2 text-[9px] text-muted-foreground">
                  <span className="cursor-pointer hover:text-foreground">+ Add</span>
                  <span className="cursor-pointer hover:text-foreground">✏ Edit</span>
                </div>
              </div>

              <div className="shrink-0 max-h-[40%] overflow-y-auto">
                {sharedWatchlist.map((item) => (
                  <div
                    key={item.ticker}
                    className={`flex items-center justify-between px-3 py-[6px] cursor-pointer transition-colors border-l-[3px] ${
                      item.ticker === selectedTicker?.ticker
                        ? "bg-accent/15 border-l-accent"
                        : "border-l-transparent hover:bg-card"
                    }`}
                  >
                    <div className="min-w-0 flex-1 mr-2">
                      <span className="font-mono text-[11px] font-semibold text-accent block">{item.ticker}</span>
                      <span className="text-[8px] text-muted-foreground">{item.name}</span>
                    </div>
                    <div className="text-right">
                      <div className="font-mono text-[10px] text-foreground/70">{item.price}</div>
                      <div className={`font-mono text-[9px] font-semibold ${item.change > 0 ? "text-status-active" : "text-status-hot"}`}>
                        {item.change > 0 ? "+" : ""}{item.change.toFixed(1)}%
                      </div>
                    </div>
                  </div>
                ))}
                <div className="px-3 py-[6px] font-mono text-[9px] text-accent cursor-pointer border-b border-border">+ Add Ticker</div>
              </div>

              {/* Intel Feed */}
              <div className="flex-1 flex flex-col overflow-hidden border-t border-border">
                <div className="px-3 py-2 border-b border-border flex items-center justify-between shrink-0 bg-background">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={selectedId}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="font-mono text-[9px] font-semibold tracking-[1px] text-[hsl(45_90%_55%)]"
                    >
                      {selectedTicker?.ticker} INTEL
                    </motion.span>
                  </AnimatePresence>
                  <div className="flex">
                    {["FEED", "NEWS", "MARKET"].map((mode, i) => (
                      <span
                        key={mode}
                        className={`font-mono text-[8px] px-2 py-[2px] cursor-pointer border-b ${
                          i === 0 ? "text-[hsl(45_90%_55%)] border-[hsl(45_90%_55%)]" : "text-muted-foreground border-transparent"
                        }`}
                      >
                        {mode}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={selectedId}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.2 }}
                    >
                      {selected.feed.map((entry, i) => (
                        <div key={`${selectedId}-${i}`} className="px-3 py-2.5 border-b border-border">
                          <div className="font-mono text-[8px] text-muted-foreground mb-[3px]">
                            {entry.date ? `${entry.date} — ` : ""}{entry.time}
                          </div>
                          <p className="text-[11px] text-foreground/70 leading-[1.55]">{entry.content}</p>
                        </div>
                      ))}
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Market Headlines */}
                <div className="shrink-0 max-h-[30%] overflow-y-auto border-t border-border">
                  <div className="font-mono text-[8px] font-semibold tracking-[1px] text-status-active px-3 py-2 border-b border-border sticky top-0 bg-background">
                    MARKET LIVE
                  </div>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={selectedId}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      {selected.headlines.map((h, i) => (
                        <div key={i} className="px-3 py-[6px] border-b border-border">
                          <div className="font-mono text-[8px] text-muted-foreground">{h.time}</div>
                          <div className={`text-[10px] leading-[1.35] mt-[2px] ${
                            h.sentiment === "bull" ? "text-status-active" : (h.sentiment as string) === "bear" ? "text-status-hot" : "text-foreground/70"
                          }`}>
                            {h.text}
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* Chat Input */}
              <div className="shrink-0 px-3 py-[7px] border-t border-border bg-card flex items-center gap-[6px]">
                <span className="text-accent text-[11px]">&gt;</span>
                <input
                  type="text"
                  placeholder="Ask your agent anything..."
                  className="flex-1 bg-transparent border-none text-[10px] text-foreground outline-none placeholder:text-muted-foreground"
                />
                <span className="font-mono text-[8px] text-muted-foreground whitespace-nowrap">/Deep Research ▾</span>
                <div className="w-[22px] h-[22px] bg-accent flex items-center justify-center cursor-pointer text-accent-foreground shrink-0">
                  <Send size={10} />
                </div>
              </div>
            </div>
          </ResizablePanel>

          <ResizableHandle withHandle />

          {/* CENTER: Feed + Prompt */}
          <ResizablePanel defaultSize={48} minSize={30}>
            <div className="h-full flex flex-col overflow-hidden">
              {/* Agent Info Bar */}
              <div className="flex items-center justify-between px-4 py-2 border-b border-border shrink-0">
                <div className="flex items-center gap-3">
                  <span style={{ color: agentColor }}>{selected.icon}</span>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm tracking-tight">{selected.name}</span>
                      <span className="text-[10px] font-mono text-muted-foreground">/ {selected.category}</span>
                    </div>
                    <p className="text-[10px] text-muted-foreground">{selected.fullName}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-status-active animate-pulse-dot" />
                    <span className="text-[10px] font-mono text-muted-foreground">ONLINE</span>
                  </div>
                  <button
                    onClick={() => navigate(`/agent/${selectedId}`)}
                    className="flex items-center gap-1 text-[10px] font-mono text-muted-foreground hover:text-foreground transition-colors"
                  >
                    OVERVIEW <ExternalLink size={10} />
                  </button>
                </div>
              </div>

              {/* Feed Area */}
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
                      <motion.div
                        key={`${selectedId}-${i}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.08 }}
                      >
                        {entry.date && (
                          <div className="mb-2 mt-4 first:mt-0">
                            <span className="font-mono text-[10px] tracking-wide text-foreground/70">{entry.date}</span>
                          </div>
                        )}
                        <div className="mb-4 pb-4 border-b border-border/50 last:border-0">
                          <span className="text-[9px] font-mono text-muted-foreground">{entry.time}</span>
                          <p className="mt-1.5 text-xs leading-relaxed text-foreground/90">{entry.content}</p>
                          <button className="text-[9px] font-mono text-muted-foreground hover:text-foreground mt-1.5 transition-colors">
                            ..More
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Chat Input */}
              <div className="border-t border-border p-3 shrink-0">
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
                    <button className="text-[9px] font-mono text-muted-foreground flex items-center gap-1 hover:text-foreground transition-colors">
                      /Deep Research <ChevronDown size={8} />
                    </button>
                    <button className="text-muted-foreground hover:text-foreground transition-colors" style={{ color: agentColor }}>
                      <Send size={12} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </ResizablePanel>

          <ResizableHandle withHandle />

          {/* RIGHT: Chart + Market Data + Headlines (vertical scroll) */}
          <ResizablePanel defaultSize={30} minSize={18} maxSize={40}>
            <div className="h-full flex flex-col overflow-y-auto border-l border-border">
              {/* Market Live Header */}
              <div className="p-3 border-b border-border shrink-0">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono tracking-wider" style={{ color: agentColor }}>MARKET LIVE</span>
                  <ExternalLink size={10} className="text-muted-foreground" />
                </div>
                {/* Compact Market Stats */}
                <div className="border border-border bg-card p-2.5">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="font-bold text-xs" style={{ color: agentColor }}>{selectedTicker?.ticker}</span>
                    <span className="text-[9px] font-mono text-muted-foreground truncate">{selectedTicker?.name}</span>
                  </div>
                  <div className="flex gap-2 text-[9px] font-mono text-muted-foreground mb-2 flex-wrap">
                    {selected.marketStats.map((stat) => (
                      <span key={stat.label} className="whitespace-nowrap">
                        <span>{stat.label}</span>{" "}
                        <span className="text-foreground">{stat.value}</span>
                      </span>
                    ))}
                  </div>
                  {/* Mini Chart */}
                  <div className="relative h-16 overflow-hidden">
                    <svg viewBox="0 0 300 80" className="w-full h-full" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id={`miniGrad-${selectedId}`} x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor={agentColor} stopOpacity="0.3" />
                          <stop offset="100%" stopColor={agentColor} stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      <motion.polyline
                        key={`line-${selectedId}`}
                        points="0,55 30,50 60,60 90,45 120,35 150,38 180,25 210,28 240,22 270,18 300,20"
                        fill="none"
                        stroke={agentColor}
                        strokeWidth="1.5"
                        vectorEffect="non-scaling-stroke"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1.5 }}
                      />
                      <motion.polygon
                        key={`area-${selectedId}`}
                        points="0,55 30,50 60,60 90,45 120,35 150,38 180,25 210,28 240,22 270,18 300,20 300,80 0,80"
                        fill={`url(#miniGrad-${selectedId})`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Headlines */}
              <div className="p-3 border-b border-border">
                <div className="mb-2">
                  <span className="font-mono text-[9px] tracking-wider text-muted-foreground">HEADLINES</span>
                </div>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedId}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className="space-y-2"
                  >
                    {selected.headlines.map((h, i) => (
                      <div key={i} className="flex gap-2 group cursor-pointer py-0.5">
                        <span className="text-[9px] font-mono text-muted-foreground shrink-0 mt-0.5">{h.time}</span>
                        <p className={`text-[10px] leading-relaxed group-hover:underline ${
                          h.sentiment === "bull" ? "text-status-active" : (h.sentiment as string) === "bear" ? "text-status-hot" : "text-foreground/70"
                        }`}>
                          {h.text}
                        </p>
                      </div>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Agent Cluster */}
              <div className="p-3 border-b border-border">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-[9px] font-semibold tracking-[1px]">AGENT CLUSTER</span>
                  <span className="font-mono text-[8px] text-muted-foreground">5 PILOTS</span>
                </div>
                {agents.map((agent) => {
                  const isActive = agent.status !== "idle";
                  return (
                    <div key={agent.id} className="border-b border-border last:border-0">
                      <div
                        className="flex items-center justify-between py-[6px] cursor-pointer hover:bg-card/50 transition-colors"
                        onClick={() => setSelectedId(agent.id)}
                      >
                        <div className="flex items-center gap-[7px]">
                          <span className="text-[11px]">{agent.emoji}</span>
                          <span className="font-mono text-[9px] font-semibold tracking-[0.5px]">{agent.fullName.toUpperCase()}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          {agent.score > 0 && <span className="font-mono text-[10px] font-bold">{agent.score}</span>}
                          <span className={`w-[6px] h-[6px] rounded-full ${isActive ? "bg-status-active" : "bg-muted-foreground"}`} />
                        </div>
                      </div>
                      {agent.id === selectedId && agent.clusterDetails.length > 0 && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          className="pb-2 overflow-hidden"
                        >
                          <div className="font-mono text-[7px] text-muted-foreground mb-[3px] tracking-[0.5px]">IDENTIFIED ZONES</div>
                          {agent.clusterDetails.map((d, i) => (
                            <div key={i} className="flex justify-between py-[2px] text-[9px]">
                              <span className="text-muted-foreground">{d.label}</span>
                              <span className={`font-mono text-[9px] ${
                                (d as any).color === "hot" ? "text-status-hot" :
                                (d as any).color === "active" ? "text-status-active" : ""
                              }`}>{d.value}</span>
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Unified Intelligence */}
              <div className="px-3 py-2 bg-[hsl(45_90%_55%/0.15)]">
                <div className="font-mono text-[7px] text-muted-foreground tracking-[1px] mb-[2px]">UNIFIED INTELLIGENCE</div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-lg font-bold">LONG SIGNAL</span>
                  <div className="text-right">
                    <div className="font-mono text-[22px] font-bold">73</div>
                    <div className="font-mono text-[7px] text-muted-foreground">SCORE</div>
                  </div>
                </div>
                <div className="h-1 bg-border overflow-hidden mt-[5px]">
                  <div className="h-full w-[73%] bg-[hsl(45_90%_55%)]" />
                </div>
              </div>

              {/* Pilot Section */}
              <div className="px-3 py-2 bg-card border-t border-border">
                <div className="flex items-center gap-[5px] mb-[5px]">
                  <div className="w-[18px] h-[18px] bg-accent/15 flex items-center justify-center text-[8px] text-accent">⊞</div>
                  <span className="font-mono text-[8px] font-semibold tracking-[1px]">CLAWHOO PILOT</span>
                  <span className="font-mono text-[7px] text-muted-foreground border border-border px-[3px]">V2.4</span>
                </div>
                <div className="bg-secondary p-[7px] px-[9px] mb-[5px]">
                  <div className="font-mono text-[7px] font-semibold text-accent tracking-[0.5px] mb-[2px]">■ MARKET SENTIMENT</div>
                  <p className="text-[10px] text-foreground leading-[1.4]">
                    Algorithmic convergence at $152k. Expecting volatility compression before asymmetric breakout.
                  </p>
                </div>
                <button className="w-full py-[7px] bg-[hsl(45_90%_55%/0.15)] border border-[hsl(45_90%_55%)] text-[hsl(45_90%_55%)] font-mono text-[9px] font-semibold tracking-[2px] uppercase cursor-pointer hover:bg-[hsl(45_90%_55%/0.25)] transition-colors">
                  EXECUTE HISTORICAL TRADE
                </button>
              </div>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>

      {/* Status Bar */}
      <div className="flex items-center justify-between px-3 h-[22px] bg-background border-t border-border font-mono text-[7px] text-muted-foreground tracking-[0.5px] shrink-0">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-[3px]">
            <span className="w-1 h-1 rounded-full bg-status-active" /> CONNECTED
          </span>
          <span className="flex items-center gap-[3px]">
            <span className="w-1 h-1 rounded-full bg-accent" /> 5 AGENTS
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span>LATENCY: 12ms</span>
          <span>UPTIME: 99.98%</span>
          <span>v2.4.1</span>
        </div>
      </div>
    </div>
  );
};

export default Agents;
