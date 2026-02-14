import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  BarChart3, Link2, MessageSquare, TrendingUp,
  Plus, Send, Search, Settings,
  ChevronDown, ExternalLink, Clock
} from "lucide-react";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import AppNav from "@/components/AppNav";
import { useToast } from "@/hooks/use-toast";

const agentList = [
  { id: "chart", code: "AGT_01" },
  { id: "chain", code: "AGT_02" },
  { id: "deriv", code: "AGT_03" },
  { id: "social", code: "AGT_04" },
  { id: "alert", code: "AGT_05" },
];

const agentData: Record<string, {
  name: string;
  fullName: string;
  category: string;
  color: string;
  watchlist: { ticker: string; name: string; change: number }[];
  feed: { time: string; date?: string; content: string }[];
  headlines: { time: string; text: string; sentiment: "bull" | "bear" | "neutral" }[];
  marketStats: { label: string; value: string }[];
}> = {
  chart: {
    name: "CHART",
    fullName: "Chart Analysis Agent",
    category: "Technical Analysis",
    color: "268 35% 72%",
    watchlist: [
      { ticker: "BTC", name: "Bitcoin", change: 2.41 },
      { ticker: "ETH", name: "Ethereum", change: -1.32 },
      { ticker: "SOL", name: "Solana", change: 5.67 },
      { ticker: "AVAX", name: "Avalanche", change: -0.89 },
      { ticker: "DOGE", name: "Dogecoin", change: 3.12 },
      { ticker: "XRP", name: "Ripple", change: 1.05 },
    ],
    feed: [
      { time: "09:30 EST", date: "Friday, February 14, 2026", content: "BTC is forming a descending wedge pattern on the 4H chart with a potential breakout target of $108,500. RSI divergence detected at the 0.618 Fibonacci retracement level, suggesting bullish momentum building." },
      { time: "08:15 EST", content: "ETH/BTC ratio testing critical support at 0.032. Historical data suggests a bounce from this level with 78% probability." },
      { time: "16:00 EST", date: "Thursday, February 13, 2026", content: "SOL completed a cup-and-handle formation on the weekly chart. Measured move target sits at $285." },
    ],
    headlines: [
      { time: "06:47", text: "BTC breaks $100K as institutional inflows hit record $2.1B weekly", sentiment: "bull" },
      { time: "06:18", text: "ETH gas fees spike 300% amid NFT mint frenzy", sentiment: "neutral" },
      { time: "02:31", text: "Fibonacci confluence zone holds: SOL bounces from $198 support", sentiment: "bull" },
      { time: "23:46", text: "Market-wide liquidation cascade wipes $500M in overleveraged longs", sentiment: "bear" },
    ],
    marketStats: [
      { label: "O", value: "98,420" },
      { label: "H", value: "102,350" },
      { label: "L", value: "97,180" },
      { label: "C", value: "101,890" },
    ],
  },
  chain: {
    name: "CHAIN",
    fullName: "On-Chain Analysis Agent",
    category: "Blockchain Intelligence",
    color: "142 70% 45%",
    watchlist: [
      { ticker: "WHALE_01", name: "Unknown Wallet", change: 12.4 },
      { ticker: "WHALE_02", name: "Jump Trading", change: -5.2 },
      { ticker: "WHALE_03", name: "Wintermute", change: 3.8 },
      { ticker: "DEX_VOL", name: "DEX Volume 24h", change: 15.3 },
      { ticker: "GAS_AVG", name: "Avg Gas (Gwei)", change: -2.1 },
      { ticker: "TVL_ETH", name: "ETH TVL", change: 1.7 },
    ],
    feed: [
      { time: "10:00 UTC", date: "Friday, February 14, 2026", content: "Massive whale movement detected: 15,000 BTC ($1.53B) transferred from cold storage to Coinbase Prime." },
      { time: "08:30 UTC", content: "Ethereum staking deposits surged 40% in the last 24 hours, with 32,000 ETH entering the beacon chain." },
    ],
    headlines: [
      { time: "07:12", text: "Whale alert: 50,000 ETH moved to unknown wallet from exchange", sentiment: "bull" },
      { time: "05:45", text: "DeFi TVL reaches new ATH of $320B across all chains", sentiment: "bull" },
      { time: "03:20", text: "Mempool congestion spikes as NFT collection drops", sentiment: "neutral" },
    ],
    marketStats: [
      { label: "NET_FLOW", value: "+492M" },
      { label: "MEMPOOL", value: "ACTIVE" },
      { label: "GAS", value: "34 Gwei" },
      { label: "VALIDATORS", value: "982K" },
    ],
  },
  deriv: {
    name: "DERIV",
    fullName: "Derivatives Agent",
    category: "Futures & Options",
    color: "0 84% 60%",
    watchlist: [
      { ticker: "BTC-PERP", name: "BTC Perpetual", change: 2.1 },
      { ticker: "ETH-PERP", name: "ETH Perpetual", change: -1.5 },
      { ticker: "BTC-OI", name: "BTC Open Interest", change: 12.0 },
      { ticker: "FUND_RATE", name: "Funding Rate", change: 0.01 },
      { ticker: "LIQ_24H", name: "Liquidations 24h", change: -15.2 },
      { ticker: "BASIS", name: "Futures Basis", change: 0.45 },
    ],
    feed: [
      { time: "11:00 EST", date: "Friday, February 14, 2026", content: "BTC open interest surged 12% in the last 4 hours, reaching $38.2B. Funding rates turning positive at 0.0122%." },
      { time: "09:45 EST", content: "ETH options market showing unusual activity: $105M in call options purchased at $4,500 strike for March expiry." },
    ],
    headlines: [
      { time: "08:30", text: "BTC futures premium hits 15% annualized, highest since bull run peak", sentiment: "bull" },
      { time: "07:00", text: "Record $2.1B in options expiring Friday, max pain at $96K", sentiment: "neutral" },
      { time: "04:15", text: "Funding rates spike to 0.03% on Binance, overheated longs", sentiment: "bear" },
    ],
    marketStats: [
      { label: "OI", value: "$38.2B" },
      { label: "FUNDING", value: "0.0122%" },
      { label: "LIQ_24H", value: "$245M" },
      { label: "BASIS", value: "0.45%" },
    ],
  },
  social: {
    name: "SOCIAL",
    fullName: "Social Sentiment Agent",
    category: "NLP Analysis",
    color: "280 60% 65%",
    watchlist: [
      { ticker: "#BTC", name: "Bitcoin mentions", change: 45.2 },
      { ticker: "#ETH", name: "Ethereum mentions", change: 12.8 },
      { ticker: "#SOL", name: "Solana mentions", change: 89.3 },
      { ticker: "#MEME", name: "Memecoin buzz", change: 120.5 },
      { ticker: "CT_VOL", name: "Crypto Twitter Vol", change: 34.1 },
      { ticker: "REDDIT", name: "Reddit Activity", change: 18.7 },
    ],
    feed: [
      { time: "12:00 EST", date: "Friday, February 14, 2026", content: "Sentiment analysis across 15+ channels shows extreme bullish bias for SOL, with mention volume up 89% in 24 hours." },
      { time: "10:30 EST", content: "New memecoin trend detected on Telegram: 'AI Agent' themed tokens gaining traction with combined volume exceeding $50M." },
    ],
    headlines: [
      { time: "09:00", text: "Elon Musk tweets about DOGE, social volume spikes 500%", sentiment: "bull" },
      { time: "07:30", text: "Vitalik posts ETH roadmap update, community sentiment surges", sentiment: "bull" },
      { time: "05:00", text: "FUD spreading about major exchange hack rumor (unverified)", sentiment: "bear" },
    ],
    marketStats: [
      { label: "SENTIMENT", value: "87/100" },
      { label: "MENTIONS", value: "4.2K/min" },
      { label: "MOOD", value: "EXTREME GREED" },
      { label: "INFLUENCER", value: "BULLISH" },
    ],
  },
  alert: {
    name: "ALERT",
    fullName: "Alert System Agent",
    category: "Trigger Engine",
    color: "45 90% 55%",
    watchlist: [
      { ticker: "TRG_001", name: "BTC > $105K", change: 0 },
      { ticker: "TRG_002", name: "ETH < $3,200", change: 0 },
      { ticker: "TRG_003", name: "SOL RSI > 70", change: 0 },
      { ticker: "TRG_004", name: "BTC Vol Spike", change: 0 },
      { ticker: "TRG_005", name: "Whale Alert > $10M", change: 0 },
      { ticker: "TRG_006", name: "Funding > 0.02%", change: 0 },
    ],
    feed: [
      { time: "13:00 EST", date: "Friday, February 14, 2026", content: "TRIGGER FIRED: BTC crossed $100,000 resistance level. All 3 confirmation criteria met. Webhook notification sent to 12 connected endpoints." },
      { time: "11:15 EST", content: "TRIGGER ARMED: ETH funding rate approaching 0.02% threshold on Binance. Currently at 0.0187%." },
    ],
    headlines: [
      { time: "13:00", text: "FIRED: BTC > $100K trigger activated across 12 webhooks", sentiment: "bull" },
      { time: "11:15", text: "ARMED: ETH funding rate nearing critical threshold", sentiment: "neutral" },
      { time: "08:00", text: "STANDBY: 42 triggers active, system nominal", sentiment: "neutral" },
    ],
    marketStats: [
      { label: "ACTIVE", value: "42" },
      { label: "FIRED_24H", value: "3" },
      { label: "UPTIME", value: "99.97%" },
      { label: "LATENCY", value: "230ms" },
    ],
  },
};

const categoryIcons: Record<string, React.ReactNode> = {
  chart: <BarChart3 size={16} />,
  chain: <Link2 size={16} />,
  deriv: <TrendingUp size={16} />,
  social: <MessageSquare size={16} />,
  alert: <Clock size={16} />,
};

const AgentDetail = () => {
  const { agentId } = useParams<{ agentId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const agent = agentData[agentId || "chart"];
  const [chatInput, setChatInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedFeed, setExpandedFeed] = useState<number | null>(null);

  if (!agent) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground font-mono">AGENT_NOT_FOUND</p>
      </div>
    );
  }

  const agentColor = `hsl(${agent.color})`;

  const filteredWatchlist = searchQuery
    ? agent.watchlist.filter(
        (w) =>
          w.ticker.toLowerCase().includes(searchQuery.toLowerCase()) ||
          w.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : agent.watchlist;

  const handleSendChat = () => {
    if (!chatInput.trim()) return;
    toast({
      title: `${agent.name} Agent`,
      description: `Processing: "${chatInput.trim()}" — Agent response coming soon.`,
    });
    setChatInput("");
  };

  const handleAddTicker = () => {
    toast({ title: "➕ Add Ticker", description: "Custom ticker tracking coming soon!" });
  };

  const handleSettings = () => {
    toast({ title: "⚙️ Settings", description: "Watchlist settings coming soon!" });
  };

  const handleDeepResearch = () => {
    toast({ title: "🔍 Deep Research", description: "Deep research mode coming soon!" });
  };

  const handleHeadlineClick = (text: string) => {
    toast({ title: "📰 Headline", description: text });
  };

  return (
    <div className="h-screen bg-background text-foreground flex flex-col overflow-hidden">
      <AppNav />

      {/* Agent Info Bar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-border shrink-0">
        <div className="flex items-center gap-3">
          <span style={{ color: agentColor }}>{categoryIcons[agentId || "chart"]}</span>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm tracking-tight">{agent.name}</span>
              <span className="text-[10px] font-mono text-muted-foreground">/ {agent.category}</span>
            </div>
            <p className="text-[10px] text-muted-foreground">{agent.fullName}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-status-active animate-pulse-dot" />
            <span className="text-[10px] font-mono text-muted-foreground">ONLINE</span>
          </div>
          <button
            onClick={() => navigate("/agents")}
            className="flex items-center gap-1 text-[10px] font-mono text-muted-foreground hover:text-foreground transition-colors"
          >
            OVERVIEW <ExternalLink size={10} />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <ResizablePanelGroup direction="horizontal" className="flex-1">
        {/* Left Sidebar - Watchlist */}
        <ResizablePanel defaultSize={22} minSize={15} maxSize={35}>
          <div className="h-full flex flex-col overflow-hidden border-r border-border">
            <div className="p-3 border-b border-border">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono tracking-wider" style={{ color: agentColor }}>
                  MY WATCHLIST
                </span>
                <Settings size={12} className="text-muted-foreground cursor-pointer hover:text-foreground transition-colors" onClick={handleSettings} />
              </div>
              <div className="flex items-center gap-1.5 border border-border bg-card px-2 py-1">
                <Search size={10} className="text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent text-[10px] font-mono outline-none flex-1 min-w-0 placeholder:text-muted-foreground/50"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-1.5">
              <div className="flex items-center justify-between mb-1.5 px-2">
                <span className="text-[9px] font-mono text-muted-foreground tracking-wider">Default Watchlist</span>
                <ChevronDown size={9} className="text-muted-foreground" />
              </div>
              {filteredWatchlist.map((item, i) => (
                <motion.div
                  key={item.ticker}
                  className="flex items-center justify-between px-2 py-1.5 hover:bg-secondary cursor-pointer transition-colors"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.03 }}
                  onClick={() => toast({ title: `📊 ${item.ticker}`, description: `Viewing ${item.name} data...` })}
                >
                  <div className="min-w-0 flex-1 mr-2">
                    <span className="text-[11px] font-bold block truncate" style={{ color: agentColor }}>{item.ticker}</span>
                    <p className="text-[9px] text-muted-foreground truncate">{item.name}</p>
                  </div>
                  <span className={`text-[10px] font-mono shrink-0 ${item.change > 0 ? "text-status-active" : item.change < 0 ? "text-status-hot" : "text-muted-foreground"}`}>
                    {item.change > 0 ? "+" : ""}{item.change.toFixed(1)}%
                  </span>
                </motion.div>
              ))}
              {filteredWatchlist.length === 0 && (
                <p className="text-[9px] font-mono text-muted-foreground/50 text-center py-4">No results found</p>
              )}
            </div>

            <div className="border-t border-border p-1.5">
              <button onClick={handleAddTicker} className="flex items-center gap-1.5 text-[9px] font-mono text-muted-foreground hover:text-foreground transition-colors w-full px-2 py-1">
                <Plus size={9} />
                <span>Add Ticker</span>
              </button>
            </div>
          </div>
        </ResizablePanel>

        <ResizableHandle withHandle />

        {/* Center - Analysis Feed */}
        <ResizablePanel defaultSize={48} minSize={30}>
          <div className="h-full flex flex-col overflow-hidden">
            <div className="flex-1 overflow-y-auto px-5 py-4">
              {agent.feed.map((entry, i) => (
                <motion.div
                  key={i}
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
                    <p className={`mt-1.5 text-xs leading-relaxed text-foreground/90 ${expandedFeed === i ? "" : "line-clamp-3"}`}>{entry.content}</p>
                    <button
                      onClick={() => setExpandedFeed(expandedFeed === i ? null : i)}
                      className="text-[9px] font-mono text-muted-foreground hover:text-foreground mt-1.5 transition-colors"
                    >
                      {expandedFeed === i ? "..Less" : "..More"}
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Chat Input */}
            <div className="border-t border-border p-3">
              <form onSubmit={(e) => { e.preventDefault(); handleSendChat(); }} className="border border-border bg-card px-3 py-2">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-muted-foreground/50 font-mono text-xs">&gt;</span>
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Ask your agent anything..."
                    className="bg-transparent text-xs font-mono outline-none flex-1 min-w-0 placeholder:text-muted-foreground/40"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button type="button" onClick={handleDeepResearch} className="text-[9px] font-mono text-muted-foreground flex items-center gap-1 hover:text-foreground transition-colors">
                      /Deep Research <ChevronDown size={8} />
                    </button>
                  </div>
                  <button type="submit" className="text-muted-foreground hover:text-foreground transition-colors" style={{ color: agentColor }}>
                    <Send size={12} />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </ResizablePanel>

        <ResizableHandle withHandle />

        {/* Right - Market Data & Headlines */}
        <ResizablePanel defaultSize={30} minSize={18} maxSize={40}>
          <div className="h-full flex flex-col overflow-hidden border-l border-border">
            <div className="p-3 border-b border-border">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono tracking-wider" style={{ color: agentColor }}>MARKET LIVE</span>
                <ExternalLink size={10} className="text-muted-foreground cursor-pointer hover:text-foreground" onClick={() => toast({ title: "📊 Market", description: "Opening full market view..." })} />
              </div>
              <div className="border border-border bg-card p-2.5">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="font-bold text-xs">{agent.watchlist[0]?.ticker}</span>
                  <span className="text-[9px] font-mono text-muted-foreground truncate">{agent.watchlist[0]?.name}</span>
                </div>
                <div className="flex gap-2 text-[9px] font-mono text-muted-foreground mb-2 flex-wrap">
                  {agent.marketStats.map((stat) => (
                    <span key={stat.label} className="whitespace-nowrap">
                      <span>{stat.label}</span>{" "}
                      <span className="text-foreground">{stat.value}</span>
                    </span>
                  ))}
                </div>
                <svg viewBox="0 0 300 80" className="w-full h-14">
                  <defs>
                    <linearGradient id={`grad-${agentId}`} x1="0" y1="0" x2="0" y2="1">
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
                    fill={`url(#grad-${agentId})`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 1 }}
                  />
                </svg>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-3">
              <div className="mb-2">
                <span className="font-mono text-[9px] tracking-wider text-muted-foreground">HEADLINES</span>
              </div>
              <div className="space-y-2">
                {agent.headlines.map((headline, i) => (
                  <motion.div
                    key={i}
                    className="flex gap-2 group cursor-pointer py-0.5"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.06 }}
                    onClick={() => handleHeadlineClick(headline.text)}
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
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>

      {/* Status Bar */}
      <div className="flex items-center justify-between px-3 h-[22px] bg-background border-t border-border font-mono text-[7px] text-muted-foreground tracking-[0.5px] shrink-0">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-[3px]">
            <span className="w-1 h-1 rounded-full bg-status-active" /> CONNECTED
          </span>
          <span className="flex items-center gap-[3px]">
            <span className="w-1 h-1 rounded-full bg-accent" /> {agent.name} ACTIVE
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

export default AgentDetail;
