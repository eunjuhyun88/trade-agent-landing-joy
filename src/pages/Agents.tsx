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
    iconSmall: <BarChart3 size={12} />,
    emoji: "📐",
    status: "active" as const,
    score: 88.2,
    description: "Geometric pattern recognition and liquidity void detection across multiple timeframes.",
    stats: [
      { label: "FIB_LEVEL", value: "0.618" },
      { label: "VOL_PROFILE", value: "HIGH" },
      { label: "RSI_14", value: "58.3" },
      { label: "STATE", value: "SCANNING" },
    ],
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
    iconSmall: <Link2 size={12} />,
    emoji: "⛓",
    status: "active" as const,
    score: 65.0,
    description: "On-chain flow monitoring, whale wallet heatmaps, and smart money tracking.",
    stats: [
      { label: "NET_FLOW", value: "+492M" },
      { label: "MEMPOOL", value: "ACTIVE" },
      { label: "GAS", value: "34 Gwei" },
      { label: "STATE", value: "TRACKING" },
    ],
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
    iconSmall: <TrendingUp size={12} />,
    emoji: "📡",
    status: "hot" as const,
    score: 0,
    description: "Open interest spikes, funding rate arbitrage, and liquidation cascade detection.",
    stats: [
      { label: "OI", value: "$38.2B" },
      { label: "FUNDING", value: "0.0122%" },
      { label: "LIQ_24H", value: "$245M" },
      { label: "STATE", value: "CRITICAL" },
    ],
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
    iconSmall: <MessageSquare size={12} />,
    emoji: "💬",
    status: "active" as const,
    score: 71.8,
    description: "NLP-driven sentiment analysis across 15+ social channels in real-time.",
    stats: [
      { label: "SENTIMENT", value: "87/100" },
      { label: "MENTIONS", value: "4.2K/min" },
      { label: "MOOD", value: "GREED" },
      { label: "STATE", value: "AGGREGATING" },
    ],
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
    iconSmall: <Clock size={12} />,
    emoji: "🌐",
    status: "idle" as const,
    score: 0,
    description: "Custom deterministic triggers, push notifications, and webhook integrations.",
    stats: [
      { label: "ACTIVE", value: "42" },
      { label: "FIRED_24H", value: "3" },
      { label: "UPTIME", value: "99.97%" },
      { label: "STATE", value: "STANDBY" },
    ],
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
      {/* Top Nav */}
      <nav className="border-b border-border bg-background/95 backdrop-blur-sm flex items-center justify-between px-3 h-[46px] shrink-0">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <button onClick={() => navigate("/")} className="text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft size={14} />
            </button>
            <span className="text-sm font-bold tracking-[2px] font-mono">CLAWHOO</span>
          </div>
          {/* Page Tabs */}
          <div className="hidden md:flex items-center">
            {["Trade", "Advisory", "Holdings"].map((tab, i) => (
              <span
                key={tab}
                className={`px-4 py-[13px] text-[9px] font-mono font-medium tracking-[1.5px] uppercase cursor-pointer border-b-2 transition-colors ${
                  i === 0
                    ? "text-foreground border-accent"
                    : "text-muted-foreground border-transparent hover:text-foreground/70"
                }`}
              >
                {tab}
              </span>
            ))}
          </div>
          {/* Agent Node Switcher */}
          <div className="flex gap-[2px]">
            {agents.map((agent) => (
              <button
                key={agent.id}
                onClick={() => setSelectedId(agent.id)}
                className={`font-mono text-[8px] px-[7px] py-[3px] border transition-colors ${
                  agent.id === selectedId
                    ? "bg-accent text-accent-foreground border-accent"
                    : "bg-card border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                {agent.code.split("_")[1]}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="font-mono text-[10px] font-bold bg-[hsl(45_90%_55%/0.15)] border border-[hsl(45_90%_55%)] text-[hsl(45_90%_55%)] px-2 py-[3px]">
            ENTRY SCORE 73
          </div>
          <div className="hidden sm:flex items-center gap-[5px] bg-card border border-border px-2 py-1 text-[10px] text-muted-foreground">
            <Search size={10} />
            <span>Search Markets</span>
          </div>
          <span className="font-mono text-[9px] px-[10px] py-1 border border-accent text-accent bg-accent/15">
            ● 0xAB...5542
          </span>
        </div>
      </nav>

      {/* Main App */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <ResizablePanelGroup direction="horizontal" className="flex-1">
          {/* LEFT: Watchlist + Intel Feed */}
          <ResizablePanel defaultSize={22} minSize={15} maxSize={35}>
            <div className="h-full flex flex-col overflow-hidden">
              {/* Watchlist Header */}
              <div className="p-2.5 border-b border-border flex items-center justify-between shrink-0">
                <span className="text-[9px] font-mono font-semibold tracking-[1px] text-status-active">MY PORTFOLIO</span>
                <div className="flex gap-2 text-[9px] text-muted-foreground">
                  <span className="cursor-pointer hover:text-foreground">+ Add</span>
                  <span className="cursor-pointer hover:text-foreground">✏ Edit</span>
                </div>
              </div>

              {/* Watchlist Items */}
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
                      className="font-mono text-[9px] font-semibold tracking-[1px]"
                      style={{ color: `hsl(45 90% 55%)` }}
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

                {/* Market Sidebar within Intel */}
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
                <div className="w-[22px] h-[22px] bg-accent flex items-center justify-center cursor-pointer text-[10px] text-accent-foreground shrink-0">
                  <Send size={10} />
                </div>
              </div>
            </div>
          </ResizablePanel>

          <ResizableHandle withHandle />

          {/* CENTER: Chart Area */}
          <ResizablePanel defaultSize={48} minSize={30}>
            <div className="h-full flex flex-col overflow-hidden">
              {/* Trade Header */}
              <div className="flex items-center justify-between px-3 py-[7px] border-b border-border bg-background shrink-0">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm font-bold">{selectedTicker?.ticker} / USDT</span>
                  <span className="font-mono text-[7px] tracking-[0.7px] px-[6px] py-[2px] bg-accent/15 text-accent uppercase">Ghost Layer</span>
                  <span className="font-mono text-[7px] tracking-[0.7px] px-[6px] py-[2px] bg-[hsl(var(--status-active)/0.12)] text-status-active uppercase">Orch Active</span>
                  <div className="flex gap-[1px]">
                    {timeframes.map((tf) => (
                      <button
                        key={tf}
                        onClick={() => setSelectedTf(tf)}
                        className={`font-mono text-[8px] px-[7px] py-[3px] border-none cursor-pointer ${
                          tf === selectedTf ? "bg-accent text-accent-foreground" : "text-muted-foreground"
                        }`}
                      >
                        {tf}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="font-mono text-[9px] text-foreground/70 hidden lg:block">
                    {selected.marketStats.map((s, i) => (
                      <span key={i} className="mr-2">
                        <span className="text-muted-foreground">{s.label}</span> {s.value}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-[5px] font-mono text-[8px] text-muted-foreground">
                    RISK STEERING
                    <div className="w-[50px] h-[3px] bg-border relative">
                      <div className="absolute left-0 top-0 h-full w-1/2 bg-accent" />
                      <div className="absolute top-[-3px] left-1/2 w-[9px] h-[9px] rounded-full bg-foreground border-2 border-accent -translate-x-1/2" />
                    </div>
                    BALANCED
                  </div>
                </div>
              </div>

              {/* Chart Area */}
              <div className="flex-1 relative bg-background overflow-hidden">
                {/* Zone Panel */}
                <div className="absolute top-2 left-2 bg-background/95 border border-border p-2 px-3 w-[200px] z-[2]">
                  <div className="font-mono text-[9px] font-semibold tracking-[1px]">ZONE MATCH ANALYSIS</div>
                  <div className="font-mono text-[7px] text-status-hot flex items-center gap-1 mt-[2px] mb-[5px]">
                    <span className="w-1 h-1 rounded-full bg-status-hot animate-pulse-dot" />
                    SYNCING AI FEEDBACK
                  </div>
                  <div className="h-[3px] bg-border overflow-hidden mb-[5px]">
                    <div className="h-full w-[73%] bg-gradient-to-r from-accent to-status-active" />
                  </div>
                  <div className="flex justify-between font-mono text-[8px]">
                    <span className="text-muted-foreground">HISTORICAL STATE PH02</span>
                    <span className="text-status-active">+24.8% EXPECTED</span>
                  </div>
                  <div className="absolute top-2 right-3 font-mono text-[26px] font-bold text-accent">73</div>
                </div>

                {/* Ghost Match Badge */}
                <div className="absolute top-[36%] left-[20%] bg-card border border-accent p-[6px] px-3 flex items-center gap-[7px] z-[2]">
                  <div className="w-[22px] h-[22px] rounded-full bg-accent/15 flex items-center justify-center text-[10px]">👻</div>
                  <div className="font-mono text-[8px]">
                    <div className="font-semibold text-accent">GHOST MATCH DETECTED</div>
                    <div className="text-foreground/70">Historical State: PH02-EXPANSION</div>
                  </div>
                </div>

                {/* Chart Agent Guidance */}
                <div className="absolute top-[30%] left-[48%] z-[2] bg-card border border-[hsl(45_90%_55%)] p-[5px] px-[10px] flex items-center gap-[7px]">
                  <div className="w-[18px] h-[18px] bg-[hsl(45_90%_55%/0.15)] flex items-center justify-center text-[9px] text-[hsl(45_90%_55%)]">🔔</div>
                  <div>
                    <div className="font-mono text-[8px] font-semibold text-[hsl(45_90%_55%)]">CHART AGENT GUIDANCE</div>
                    <div className="font-mono text-[8px] text-foreground/70">Target Zone: $108,500</div>
                  </div>
                </div>

                {/* Alert Trigger */}
                <div className="absolute top-[23%] right-[13%] border border-[hsl(45_90%_55%)] bg-[hsl(45_90%_55%/0.06)] p-[3px] px-2 font-mono text-[7px] text-[hsl(45_90%_55%)] tracking-[0.5px] z-[2]">
                  ALERT TRIGGER: &gt;108,500
                </div>

                {/* Ghost Overlay */}
                <div className="absolute top-[10%] right-[6%] w-[140px] h-[100px] bg-accent/5 border border-dashed border-accent" />

                {/* Price Tag */}
                <div className="absolute right-0 top-[52%] bg-accent text-accent-foreground font-mono text-[9px] px-[5px] py-[2px]">
                  {selectedTicker?.price}
                </div>

                {/* Anchor */}
                <div className="absolute bottom-[38%] left-[50%] font-mono text-[7px] text-muted-foreground tracking-[0.5px]">
                  STATESYNC: OCT-23 ANCHOR
                </div>

                {/* Simulated chart line */}
                <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={agentColor} stopOpacity="0.2" />
                      <stop offset="100%" stopColor={agentColor} stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <motion.polyline
                    points="0,70 50,68 100,72 150,65 200,60 250,58 300,62 350,55 400,50 450,48 500,52 550,45 600,40 650,38 700,42 750,35 800,30 850,33 900,28 950,25 1000,30"
                    fill="none"
                    stroke={agentColor}
                    strokeWidth="1.5"
                    vectorEffect="non-scaling-stroke"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2 }}
                  />
                  <motion.polygon
                    points="0,70 50,68 100,72 150,65 200,60 250,58 300,62 350,55 400,50 450,48 500,52 550,45 600,40 650,38 700,42 750,35 800,30 850,33 900,28 950,25 1000,30 1000,100 0,100"
                    fill="url(#chartGrad)"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1 }}
                  />
                </svg>
              </div>

              {/* Judgment Memory */}
              <div className="flex items-center px-3 py-[5px] border-t border-border bg-card gap-[10px] shrink-0">
                <span className="font-mono text-[8px] font-semibold tracking-[1px] text-accent whitespace-nowrap flex items-center gap-[5px]">
                  ⊙ JUDGMENT MEMORY
                </span>
                <span className="flex items-center gap-[5px] font-mono text-[8px] text-muted-foreground whitespace-nowrap">
                  SIMILARITY:
                  <span className="w-[80px] h-1 bg-border overflow-hidden inline-block align-middle">
                    <span className="block h-full w-[94%] bg-gradient-to-r from-[hsl(45_90%_55%)] to-status-active" />
                  </span>
                  94.2%
                </span>
                <span className="flex-1 text-[9px] text-foreground/70 overflow-hidden text-ellipsis whitespace-nowrap">
                  Current state mirrors Oct 2023 accumulation (PH02). High order flow absorption similarity.
                </span>
              </div>

              {/* Portfolio Stats */}
              <div className="flex items-center px-3 py-[6px] border-t border-border bg-background gap-7 shrink-0">
                {[
                  { label: "Portfolio Balance", value: "$142,500.00" },
                  { label: "24H P&L", value: "+$4,210.15", color: "text-status-active" },
                  { label: "Open Positions", value: "04" },
                  { label: "Risk", value: "LOW", color: "text-status-active" },
                ].map((item) => (
                  <div key={item.label} className="flex flex-col">
                    <span className="font-mono text-[7px] tracking-[0.7px] text-muted-foreground uppercase">{item.label}</span>
                    <span className={`font-mono text-sm font-semibold ${item.color || ""}`}>{item.value}</span>
                  </div>
                ))}
              </div>

              {/* Condition Log */}
              <div className="px-3 py-[5px] border-t border-border bg-background shrink-0 max-h-14 overflow-y-auto">
                <div className="font-mono text-[8px] font-semibold tracking-[1px] text-muted-foreground mb-[2px]">⊞ CONDITION LOG</div>
                {[
                  { time: "14:22:10", text: "[SYS] ALERT INIT: BTC/USDT_PUMP_DETECTOR" },
                  { time: "14:22:15", text: "Evaluating correlation... Match: OCT-2023." },
                  { time: "14:22:18", text: "CONDITION VALID. 4 HISTORICAL REVERSALS.", ok: true },
                ].map((log, i) => (
                  <div key={i} className="font-mono text-[8px] text-muted-foreground flex gap-2 py-[1px]">
                    <span>{log.time}</span>
                    <span className={log.ok ? "text-status-active" : ""}>{log.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </ResizablePanel>

          <ResizableHandle withHandle />

          {/* RIGHT: Agent Cluster */}
          <ResizablePanel defaultSize={30} minSize={18} maxSize={40}>
            <div className="h-full flex flex-col overflow-y-auto">
              <div className="px-3 py-2 border-b border-border flex items-center justify-between shrink-0">
                <span className="font-mono text-[9px] font-semibold tracking-[1px]">AGENT CLUSTER</span>
                <span className="font-mono text-[8px] text-muted-foreground">5 PILOTS</span>
              </div>

              {/* Agent Sections */}
              {agents.map((agent) => {
                const color = `hsl(${agent.color})`;
                const isActive = agent.status !== "idle";
                return (
                  <div key={agent.id} className="border-b border-border">
                    <div
                      className="flex items-center justify-between px-3 py-[7px] cursor-pointer hover:bg-card/50 transition-colors"
                      onClick={() => setSelectedId(agent.id)}
                    >
                      <div className="flex items-center gap-[7px]">
                        <span className="text-[11px]">{agent.emoji}</span>
                        <span className="font-mono text-[9px] font-semibold tracking-[0.5px]">{agent.fullName.toUpperCase()}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {agent.score > 0 && (
                          <span className="font-mono text-[10px] font-bold">{agent.score}</span>
                        )}
                        <span className={`w-[6px] h-[6px] rounded-full ${isActive ? "bg-status-active" : "bg-muted-foreground"}`} />
                      </div>
                    </div>
                    {/* Expanded details for selected agent */}
                    {agent.id === selectedId && agent.clusterDetails.length > 0 && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="px-3 pb-2 overflow-hidden"
                      >
                        {agent.clusterDetails.length > 0 && (
                          <>
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
                          </>
                        )}
                        {agent.clusterMeta.length > 0 && (
                          <div className="flex gap-[10px] mt-[5px] font-mono text-[8px]">
                            {agent.clusterMeta.map((m, i) => (
                              <span key={i}>
                                <span className="text-muted-foreground">{m.label}:</span>{" "}
                                <span className={m.color === "green" ? "text-status-active" : "text-accent"}>{m.value}</span>
                              </span>
                            ))}
                          </div>
                        )}
                        {/* Heatmap for deriv */}
                        {agent.id === "deriv" && (
                          <div className="mt-[5px]">
                            <div className="font-mono text-[7px] text-muted-foreground mb-[3px] tracking-[0.5px]">LIQUIDATION HEATMAP</div>
                            <div className="flex gap-[2px]">
                              <div className="h-2 flex-[3] bg-accent/15" />
                              <div className="h-2 flex-[1] bg-status-hot/15" />
                              <div className="h-2 flex-[0.5] bg-status-hot" />
                            </div>
                            <div className="font-mono text-[7px] text-muted-foreground mt-[2px]">$152k — HIGH DENSITY</div>
                          </div>
                        )}
                        {/* Progress bar for chain */}
                        {agent.id === "chain" && (
                          <div className="mt-[3px]">
                            <div className="h-[3px] bg-border overflow-hidden">
                              <div className="h-full w-[65%] bg-[hsl(45_90%_55%)]" />
                            </div>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </div>
                );
              })}

              {/* Unified Intelligence */}
              <div className="px-3 py-2 bg-[hsl(45_90%_55%/0.15)] shrink-0">
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
              <div className="px-3 py-2 bg-card border-t border-border shrink-0">
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

              {/* Command Input */}
              <div className="flex items-center px-3 py-[5px] border-t border-border bg-card gap-[5px] mt-auto shrink-0">
                <span className="font-mono text-[10px] text-muted-foreground">&gt;</span>
                <input
                  type="text"
                  placeholder="Orchestration command..."
                  className="flex-1 bg-transparent border-none font-mono text-[10px] text-foreground outline-none placeholder:text-muted-foreground"
                />
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
