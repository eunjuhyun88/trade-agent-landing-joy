import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  BarChart3, Link2, TrendingUp, MessageSquare, Clock, Bell,
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

const initialAlertEvents = [
  { id: "e1", exchange: "Binance", type: "liquidation", side: "BUY", pair: "BTCUSDT", amount: "0.542", price: "101,890.30", time: "오후 8:32", mine: true },
  { id: "e2", exchange: "Binance", type: "liquidation", side: "SELL", pair: "ETHUSDT", amount: "25.000", price: "3,842.55", time: "오후 8:32", mine: false },
  { id: "e3", exchange: "Binance", type: "liquidation", side: "BUY", pair: "SOLUSDT", amount: "1,200", price: "248.50", time: "오후 8:31", mine: true },
  { id: "e4", exchange: "OKX", type: "liquidation", side: "SELL", pair: "BTCUSDT", amount: "0.003", price: "101,885.10", time: "오후 8:31", mine: false },
  { id: "e5", exchange: "Binance", type: "liquidation", side: "BUY", pair: "DOGEUSDT", amount: "52,000", price: "0.1820", time: "오후 8:30", mine: true },
  { id: "e6", exchange: "Bybit", type: "liquidation", side: "BUY", pair: "ETHUSDT", amount: "8.500", price: "3,841.20", time: "오후 8:30", mine: false },
  { id: "e7", exchange: "Binance", type: "whale", side: "BUY", pair: "BTCUSDT", amount: "15.000", price: "101,900.00", time: "오후 8:29", mine: true },
  { id: "e8", exchange: "Binance", type: "liquidation", side: "SELL", pair: "XRPUSDT", amount: "45,000", price: "2.4100", time: "오후 8:29", mine: false },
];

const randomPairs = ["BTCUSDT", "ETHUSDT", "SOLUSDT", "DOGEUSDT", "XRPUSDT", "AVAXUSDT", "BNBUSDT"];
const randomExchanges = ["Binance", "OKX", "Bybit", "Bitget"];
const randomTypes = ["liquidation", "liquidation", "liquidation", "whale"];

const generateRandomAlert = (id: number) => {
  const pair = randomPairs[Math.floor(Math.random() * randomPairs.length)];
  const side = Math.random() > 0.4 ? "BUY" : "SELL";
  const exchange = randomExchanges[Math.floor(Math.random() * randomExchanges.length)];
  const type = randomTypes[Math.floor(Math.random() * randomTypes.length)];
  const amount = (Math.random() * 100).toFixed(3);
  const price = (Math.random() * 100000 + 1000).toFixed(2);
  const now = new Date();
  const time = `오후 ${now.getHours() > 12 ? now.getHours() - 12 : now.getHours()}:${now.getMinutes().toString().padStart(2, "0")}`;
  return { id: `live-${id}`, exchange, type, side, pair, amount, price, time, mine: Math.random() > 0.5 };
};

const allFeed = agents.flatMap((a) =>
  a.feed.map((f) => ({ ...f, agentName: a.name, agentEmoji: a.emoji, agentColor: a.color }))
).sort((a, b) => (b.date || "").localeCompare(a.date || "") || b.time.localeCompare(a.time));

const Agents = () => {
  const navigate = useNavigate();
  const [selectedAgents, setSelectedAgents] = useState<Set<string>>(new Set(agents.map((a) => a.id)));
  const [expandedAgent, setExpandedAgent] = useState<string | null>(null);
  const [selectedTf, setSelectedTf] = useState("1H");
  const [alertFilter, setAlertFilter] = useState<"all" | "mine">("all");
  const dataSources = ["On-Chain", "Derivatives", "Social", "Technical", "News", "Private Data"];
  const [selectedSources, setSelectedSources] = useState<Set<string>>(new Set(["On-Chain", "Derivatives", "Social", "Technical"]));

  const toggleSource = useCallback((source: string) => {
    setSelectedSources((prev) => {
      const next = new Set(prev);
      if (next.has(source)) {
        next.delete(source);
      } else {
        next.add(source);
      }
      return next;
    });
  }, []);
  const [liveAlerts, setLiveAlerts] = useState(initialAlertEvents);
  const alertCounter = useRef(0);
  const alertScrollRef = useRef<HTMLDivElement>(null);
  const selectedTicker = sharedWatchlist[0];
  const filteredAlerts = alertFilter === "mine" ? liveAlerts.filter((a) => a.mine) : liveAlerts;

  useEffect(() => {
    const interval = setInterval(() => {
      alertCounter.current += 1;
      const newAlert = generateRandomAlert(alertCounter.current);
      setLiveAlerts((prev) => [newAlert, ...prev].slice(0, 50));
    }, 2000 + Math.random() * 3000);
    return () => clearInterval(interval);
  }, []);

  const toggleAgent = (id: string) => {
    setSelectedAgents((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        if (next.size > 1) next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <div className="h-screen bg-background text-foreground flex flex-col overflow-hidden">
      <AppNav activeTab="trade" />

      {/* Main App */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <ResizablePanelGroup direction="horizontal" className="flex-1">
          {/* LEFT: Watchlist */}
          <ResizablePanel defaultSize={18} minSize={12} maxSize={28}>
            <div className="h-full flex flex-col overflow-hidden">
              <div className="p-2.5 border-b border-border flex items-center justify-between shrink-0">
                <span className="text-[9px] font-mono font-semibold tracking-[1px] text-status-active">WATCHLIST</span>
                <Settings size={12} className="text-muted-foreground cursor-pointer hover:text-foreground transition-colors" />
              </div>

              {/* Search */}
              <div className="shrink-0 px-2 py-1 border-b border-border">
                <div className="flex items-center gap-1.5 border border-border bg-card px-2 py-[3px]">
                  <Search size={9} className="text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="search ..."
                    className="bg-transparent text-[9px] font-mono outline-none flex-1 min-w-0 placeholder:text-muted-foreground/50"
                  />
                </div>
              </div>

              {/* Table Header */}
              <div className="shrink-0 flex items-center px-3 py-[3px] border-b border-border text-[7px] font-mono text-muted-foreground tracking-wider">
                <span className="flex-1">Ticker</span>
                <span className="w-14 text-right">% 1D</span>
                <span className="w-16 text-right">Price</span>
              </div>

              {/* Section: Crypto */}
              <div className="flex-1 overflow-y-auto">
                <div className="px-3 py-[3px] border-b border-border bg-card/50">
                  <span className="text-[7px] font-mono font-semibold text-muted-foreground tracking-wider">CRYPTO</span>
                </div>
                {sharedWatchlist.map((item) => (
                  <div
                    key={item.ticker}
                    className={`flex items-center px-3 py-[5px] cursor-pointer transition-colors border-b border-border/30 ${
                      item.ticker === selectedTicker?.ticker ? "bg-accent/10" : "hover:bg-card/50"
                    }`}
                  >
                    <span className="flex-1 font-mono text-[10px] font-semibold text-accent">{item.ticker}</span>
                    <span className={`w-14 text-right font-mono text-[9px] font-semibold ${item.change > 0 ? "text-status-active" : "text-status-hot"}`}>
                      {item.change > 0 ? "+" : ""}{item.change.toFixed(2)}%
                    </span>
                    <span className="w-16 text-right font-mono text-[9px] text-foreground/70">{item.price}</span>
                  </div>
                ))}

                {/* Most Active section */}
                <div className="px-3 py-[3px] border-b border-border bg-card/50 border-t">
                  <span className="text-[7px] font-mono font-semibold text-muted-foreground tracking-wider">MOST ACTIVE</span>
                </div>
                {[
                  { ticker: "PEPE", change: 12.44, price: "0.00001842" },
                  { ticker: "WIF", change: -5.23, price: "2.4100" },
                  { ticker: "BONK", change: 8.91, price: "0.00003150" },
                ].map((item) => (
                  <div key={item.ticker} className="flex items-center px-3 py-[5px] cursor-pointer hover:bg-card/50 transition-colors border-b border-border/30">
                    <span className="flex-1 font-mono text-[10px] font-semibold text-accent">{item.ticker}</span>
                    <span className={`w-14 text-right font-mono text-[9px] font-semibold ${item.change > 0 ? "text-status-active" : "text-status-hot"}`}>
                      {item.change > 0 ? "+" : ""}{item.change.toFixed(2)}%
                    </span>
                    <span className="w-16 text-right font-mono text-[9px] text-foreground/70">{item.price}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-border p-1.5 shrink-0">
                <button className="flex items-center gap-1.5 text-[9px] font-mono text-muted-foreground hover:text-foreground transition-colors w-full px-2 py-1">
                  <Plus size={9} />
                  <span>Add Ticker</span>
                </button>
              </div>

              {/* Alerts Section */}
              <div className="shrink-0 border-t border-border flex flex-col max-h-[45%] overflow-hidden">
                <div className="p-2.5 border-b border-border flex items-center justify-between shrink-0">
                  <div className="flex items-center gap-1.5">
                    <Bell size={10} className="text-[hsl(45_90%_55%)]" />
                    <span className="text-[9px] font-mono font-semibold tracking-[1px] text-[hsl(45_90%_55%)]">ALERTS</span>
                  </div>
                  <div className="flex gap-[1px]">
                    {(["all", "mine"] as const).map((f) => (
                      <button
                        key={f}
                        onClick={() => setAlertFilter(f)}
                        className={`font-mono text-[8px] px-[7px] py-[2px] transition-colors ${
                          alertFilter === f ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {f === "all" ? "ALL" : "MINE"}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto" ref={alertScrollRef}>
                  <AnimatePresence initial={false}>
                    {filteredAlerts.map((alert) => (
                      <motion.div
                        key={alert.id}
                        initial={{ opacity: 0, height: 0, x: -20 }}
                        animate={{ opacity: 1, height: "auto", x: 0 }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-3 py-[6px] border-b border-border/50 hover:bg-card/50 cursor-pointer transition-colors">
                          <div className="flex items-center gap-1.5 mb-[2px]">
                            <span className="text-[9px] font-mono text-accent">{alert.exchange}</span>
                            <span className="text-[7px] font-mono text-muted-foreground uppercase">{alert.type}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span className={`w-2 h-2 rounded-full ${alert.side === "BUY" ? "bg-status-active" : "bg-status-hot"}`} />
                            <span className="font-mono text-[10px] text-foreground/90">
                              {alert.pair} {alert.side} {alert.amount} @ {alert.price}
                            </span>
                          </div>
                          <div className="flex items-center justify-end mt-[2px]">
                            <span className="text-[7px] font-mono text-muted-foreground">{alert.time}</span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
                <div className="border-t border-border p-1.5 shrink-0">
                  <button className="flex items-center gap-1.5 text-[9px] font-mono text-muted-foreground hover:text-foreground transition-colors w-full px-2 py-1">
                    <Plus size={9} />
                    <span>Add Alert</span>
                  </button>
                </div>
              </div>
            </div>
          </ResizablePanel>

          <ResizableHandle withHandle />

          {/* CENTER: Feed + Prompt */}
          <ResizablePanel defaultSize={52} minSize={35}>
            <div className="h-full flex flex-col overflow-hidden">
              {/* Greeting + Performance */}
              <div className="px-5 pt-5 pb-3 border-b border-border shrink-0">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h2 className="text-lg font-bold tracking-tight mb-0.5">Good evening. What are you working on?</h2>
                    <p className="text-[10px] font-mono text-muted-foreground">ClawHoo Terminal — 5 agents online</p>
                  </div>
                </div>
                {/* Performance Stats */}
                <div className="flex gap-4 text-[9px] font-mono">
                  {[
                    { label: "Queries", value: "127", width: "40%" },
                    { label: "Analyses", value: "34", width: "25%" },
                    { label: "Alerts Fired", value: "12", width: "15%" },
                    { label: "Hours Saved", value: "48.2 H", width: "10%" },
                  ].map((stat) => (
                    <div key={stat.label} className="flex-1">
                      <div className="flex items-center justify-between mb-[2px]">
                        <span className="text-muted-foreground">{stat.label}</span>
                        <span className="text-foreground font-semibold">{stat.value}</span>
                      </div>
                      <div className="h-[3px] bg-border overflow-hidden">
                        <div className="h-full bg-status-active" style={{ width: stat.width }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Prompt Area */}
              <div className="px-5 pt-4 shrink-0">
                {/* Source selector chips */}
                <div className="flex items-center gap-2 mb-3 flex-wrap">
                  <span className="text-[9px] font-mono text-muted-foreground">Searching from :</span>
                  {dataSources.map((source) => (
                    <button
                      key={source}
                      onClick={() => toggleSource(source)}
                      className={`text-[8px] font-mono px-2 py-[3px] border transition-all ${
                        selectedSources.has(source)
                          ? "border-accent/50 text-foreground bg-accent/10"
                          : "border-border text-muted-foreground/50 hover:text-muted-foreground hover:border-border"
                      }`}
                    >
                      {selectedSources.has(source) && <span className="mr-1">✓</span>}
                      {source}
                    </button>
                  ))}
                </div>

                {/* Chat Input */}
                <div className="border border-border bg-card px-3 py-2 mb-3">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-accent font-mono text-xs">&gt;</span>
                    <input
                      type="text"
                      placeholder="Ask your Agent to start your workflow"
                      className="bg-transparent text-xs font-mono outline-none flex-1 min-w-0 placeholder:text-muted-foreground/40"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-[2px]">
                        {agents.map((a) => (
                          <button
                            key={a.id}
                            onClick={() => toggleAgent(a.id)}
                            className={`text-[8px] font-mono px-[6px] py-[2px] transition-colors ${
                              selectedAgents.has(a.id)
                                ? "text-accent-foreground"
                                : "text-muted-foreground/40 hover:text-muted-foreground"
                            }`}
                            style={selectedAgents.has(a.id) ? { backgroundColor: `hsl(${a.color})` } : undefined}
                            title={a.fullName}
                          >
                            {a.emoji}
                          </button>
                        ))}
                      </div>
                      <span className="text-[8px] font-mono text-muted-foreground">{selectedAgents.size}/{agents.length}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[8px] font-mono text-muted-foreground">/? for help, shortcuts</span>
                      <button className="transition-colors text-accent hover:text-foreground">
                        <Send size={12} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Feed Area */}
              <div className="flex-1 overflow-y-auto px-5 py-2">
                {allFeed.map((entry, i) => (
                  <motion.div
                    key={`feed-${i}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    {entry.date && (
                      <div className="mb-2 mt-4 first:mt-0">
                        <span className="font-mono text-[10px] tracking-wide text-foreground/70">{entry.date}</span>
                      </div>
                    )}
                    <div className="mb-4 pb-4 border-b border-border/50 last:border-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px]">{entry.agentEmoji}</span>
                        <span className="text-[9px] font-mono font-semibold" style={{ color: `hsl(${entry.agentColor})` }}>{entry.agentName}</span>
                        <span className="text-[9px] font-mono text-muted-foreground">{entry.time}</span>
                      </div>
                      <p className="text-xs leading-relaxed text-foreground/90">{entry.content}</p>
                      <button className="text-[9px] font-mono text-muted-foreground hover:text-foreground mt-1.5 transition-colors">
                        ..More
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </ResizablePanel>

          <ResizableHandle withHandle />

          {/* RIGHT: Market + Headlines + Agent Status (vertical scroll) */}
          <ResizablePanel defaultSize={30} minSize={18} maxSize={40}>
            <div className="h-full flex flex-col overflow-y-auto border-l border-border">
              {/* Market Live */}
              <div className="p-3 border-b border-border shrink-0">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono tracking-wider text-accent">MARKET LIVE</span>
                  <ExternalLink size={10} className="text-muted-foreground" />
                </div>
                <div className="border border-border bg-card p-2.5">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="font-bold text-xs text-accent">{selectedTicker?.ticker}</span>
                    <span className="text-[9px] font-mono text-muted-foreground truncate">{selectedTicker?.name}</span>
                  </div>
                  <div className="flex gap-2 text-[9px] font-mono text-muted-foreground mb-2 flex-wrap">
                    <span className="whitespace-nowrap">O <span className="text-foreground">98,420</span></span>
                    <span className="whitespace-nowrap">H <span className="text-foreground">102,350</span></span>
                    <span className="whitespace-nowrap">L <span className="text-foreground">97,180</span></span>
                    <span className="whitespace-nowrap">C <span className="text-foreground">101,890</span></span>
                  </div>
                  <div className="relative h-16 overflow-hidden">
                    <svg viewBox="0 0 300 80" className="w-full h-full" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="miniGradStatic" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity="0.3" />
                          <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      <motion.polyline
                        points="0,55 30,50 60,60 90,45 120,35 150,38 180,25 210,28 240,22 270,18 300,20"
                        fill="none"
                        stroke="hsl(var(--accent))"
                        strokeWidth="1.5"
                        vectorEffect="non-scaling-stroke"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1.5 }}
                      />
                      <motion.polygon
                        points="0,55 30,50 60,60 90,45 120,35 150,38 180,25 210,28 240,22 270,18 300,20 300,80 0,80"
                        fill="url(#miniGradStatic)"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Headlines - static, not agent-dependent */}
              <div className="p-3 border-b border-border">
                <div className="mb-2">
                  <span className="font-mono text-[9px] tracking-wider text-muted-foreground">HEADLINES</span>
                </div>
                <div className="space-y-2">
                  {agents.flatMap((a) => a.headlines.map((h) => ({ ...h, agentEmoji: a.emoji, agentColor: a.color }))).slice(0, 6).map((h, i) => (
                    <div key={i} className="flex gap-2 group cursor-pointer py-0.5">
                      <span className="text-[9px] font-mono text-muted-foreground shrink-0 mt-0.5">{h.time}</span>
                      <p className={`text-[10px] leading-relaxed group-hover:underline ${
                        h.sentiment === "bull" ? "text-status-active" : (h.sentiment as string) === "bear" ? "text-status-hot" : "text-foreground/70"
                      }`}>
                        {h.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Agent Cluster - orchestration selector, no feed coupling */}
              <div className="p-3 border-b border-border">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-[9px] font-semibold tracking-[1px]">ORCHESTRATION</span>
                  <span className="font-mono text-[8px] text-muted-foreground">{selectedAgents.size}/{agents.length} ACTIVE</span>
                </div>
                {agents.map((agent) => {
                  const isActive = agent.status !== "idle";
                  const isSelected = selectedAgents.has(agent.id);
                  const isExpanded = expandedAgent === agent.id;
                  return (
                    <div key={agent.id} className="border-b border-border last:border-0">
                      <div
                        className={`flex items-center justify-between py-[6px] cursor-pointer transition-colors ${
                          isSelected ? "bg-accent/10" : "hover:bg-card/50 opacity-50"
                        }`}
                        onClick={() => setExpandedAgent(isExpanded ? null : agent.id)}
                      >
                        <div className="flex items-center gap-[7px]">
                          <button
                            onClick={(e) => { e.stopPropagation(); toggleAgent(agent.id); }}
                            className={`w-3 h-3 border flex items-center justify-center text-[7px] transition-colors ${
                              isSelected ? "border-accent bg-accent/20 text-accent" : "border-muted-foreground"
                            }`}
                          >
                            {isSelected && "✓"}
                          </button>
                          <span className="text-[11px]">{agent.emoji}</span>
                          <span className={`font-mono text-[9px] font-semibold tracking-[0.5px] ${isSelected ? "text-foreground" : "text-muted-foreground"}`}>
                            {agent.fullName.toUpperCase()}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          {agent.score > 0 && <span className="font-mono text-[10px] font-bold">{agent.score}</span>}
                          <span className={`w-[6px] h-[6px] rounded-full ${isActive ? "bg-status-active" : "bg-muted-foreground"}`} />
                        </div>
                      </div>
                      {isExpanded && agent.clusterDetails.length > 0 && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          className="pb-2 px-1 overflow-hidden"
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
