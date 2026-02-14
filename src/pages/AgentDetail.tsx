import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  BarChart3, Link2, MessageSquare, TrendingUp,
  ArrowLeft, Plus, Send, Search, Settings,
  ChevronDown, ExternalLink, Clock
} from "lucide-react";

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
      { ticker: "ADA", name: "Cardano", change: -2.34 },
      { ticker: "DOT", name: "Polkadot", change: 0.78 },
    ],
    feed: [
      { time: "09:30 EST", date: "Friday, February 14, 2026", content: "BTC is forming a descending wedge pattern on the 4H chart with a potential breakout target of $108,500. RSI divergence detected at the 0.618 Fibonacci retracement level, suggesting bullish momentum building. Volume profile shows significant accumulation zone between $95,200-$97,800." },
      { time: "08:15 EST", content: "ETH/BTC ratio testing critical support at 0.032. Historical data suggests a bounce from this level with 78% probability. Bollinger Bands squeezing on the daily, indicating imminent volatility expansion." },
      { time: "16:00 EST", date: "Thursday, February 13, 2026", content: "SOL completed a cup-and-handle formation on the weekly chart. Measured move target sits at $285. MACD crossover confirmed on the daily timeframe with increasing histogram momentum." },
    ],
    headlines: [
      { time: "06:47", text: "BTC breaks $100K as institutional inflows hit record $2.1B weekly", sentiment: "bull" },
      { time: "06:18", text: "ETH gas fees spike 300% amid NFT mint frenzy", sentiment: "neutral" },
      { time: "02:31", text: "Fibonacci confluence zone holds: SOL bounces from $198 support", sentiment: "bull" },
      { time: "23:46", text: "Market-wide liquidation cascade wipes $500M in overleveraged longs", sentiment: "bear" },
      { time: "22:47", text: "Golden cross forming on ADA daily chart signals potential rally", sentiment: "bull" },
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
      { ticker: "WHALE_04", name: "Alameda Rem.", change: -8.1 },
      { ticker: "DEX_VOL", name: "DEX Volume 24h", change: 15.3 },
      { ticker: "GAS_AVG", name: "Avg Gas (Gwei)", change: -2.1 },
      { ticker: "TVL_ETH", name: "ETH TVL", change: 1.7 },
      { ticker: "BRIDGE", name: "Bridge Volume", change: 7.9 },
    ],
    feed: [
      { time: "10:00 UTC", date: "Friday, February 14, 2026", content: "Massive whale movement detected: 15,000 BTC ($1.53B) transferred from cold storage to Coinbase Prime. This pattern historically precedes large OTC deals or institutional selling pressure. Monitoring for follow-up transactions." },
      { time: "08:30 UTC", content: "Ethereum staking deposits surged 40% in the last 24 hours, with 32,000 ETH entering the beacon chain. Net validator growth rate accelerating, reducing circulating supply pressure." },
      { time: "18:00 UTC", date: "Thursday, February 13, 2026", content: "Cross-chain bridge activity spiking on Arbitrum and Base. $890M moved in 6 hours, suggesting capital rotation from L1 to L2 ecosystems. Smart money wallets leading the flow." },
    ],
    headlines: [
      { time: "07:12", text: "Whale alert: 50,000 ETH moved to unknown wallet from exchange", sentiment: "bull" },
      { time: "05:45", text: "DeFi TVL reaches new ATH of $320B across all chains", sentiment: "bull" },
      { time: "03:20", text: "Mempool congestion spikes as NFT collection drops", sentiment: "neutral" },
      { time: "01:15", text: "Exchange reserves drop to 2-year low, supply squeeze incoming", sentiment: "bull" },
      { time: "23:00", text: "Suspicious contract deployment detected on Base network", sentiment: "bear" },
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
      { ticker: "BTC-0328", name: "BTC Mar Futures", change: 2.3 },
      { ticker: "ETH-0328", name: "ETH Mar Futures", change: -1.2 },
      { ticker: "BTC-OI", name: "BTC Open Interest", change: 12.0 },
      { ticker: "FUND_RATE", name: "Funding Rate", change: 0.01 },
      { ticker: "LIQ_24H", name: "Liquidations 24h", change: -15.2 },
      { ticker: "BASIS", name: "Futures Basis", change: 0.45 },
    ],
    feed: [
      { time: "11:00 EST", date: "Friday, February 14, 2026", content: "BTC open interest surged 12% in the last 4 hours, reaching $38.2B across major exchanges. Funding rates turning positive at 0.0122%, indicating leveraged longs building aggressively. Historical data suggests elevated liquidation risk above 0.015%." },
      { time: "09:45 EST", content: "ETH options market showing unusual activity: $105M in call options purchased at $4,500 strike for March expiry. Put/call ratio dropped to 0.45, the most bullish reading in 6 months." },
      { time: "17:30 EST", date: "Thursday, February 13, 2026", content: "Massive short squeeze triggered on SOL perpetuals. $45M in shorts liquidated within 15 minutes as price broke above $220 resistance. Cascading liquidation engine activated." },
    ],
    headlines: [
      { time: "08:30", text: "BTC futures premium hits 15% annualized, highest since bull run peak", sentiment: "bull" },
      { time: "07:00", text: "Record $2.1B in options expiring Friday, max pain at $96K", sentiment: "neutral" },
      { time: "04:15", text: "Funding rates spike to 0.03% on Binance, overheated longs", sentiment: "bear" },
      { time: "02:00", text: "CME gap at $94,200 still unfilled, potential magnet for price", sentiment: "bear" },
      { time: "00:30", text: "Institutional basis trade volume doubles on Deribit", sentiment: "bull" },
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
      { ticker: "DISCORD", name: "Discord Signals", change: -5.4 },
      { ticker: "TELEGRAM", name: "Telegram Alerts", change: 22.9 },
    ],
    feed: [
      { time: "12:00 EST", date: "Friday, February 14, 2026", content: "Sentiment analysis across 15+ channels shows extreme bullish bias for SOL, with mention volume up 89% in 24 hours. Key influencers (500K+ followers) posting bullish technical analysis. Caution: historically, extreme social sentiment precedes local tops with 65% probability." },
      { time: "10:30 EST", content: "New memecoin trend detected on Telegram: 'AI Agent' themed tokens gaining traction. 4 new launches in the last 2 hours with combined volume exceeding $50M. Social engagement metrics suggest early-stage viral potential." },
      { time: "20:00 EST", date: "Thursday, February 13, 2026", content: "Reddit r/cryptocurrency fear & greed index shifted from 'Greed' to 'Extreme Greed' (87/100). Word cloud analysis shows 'moon', 'ATH', and 'supercycle' as top trending terms. Contrarian signal activated." },
    ],
    headlines: [
      { time: "09:00", text: "Elon Musk tweets about DOGE, social volume spikes 500%", sentiment: "bull" },
      { time: "07:30", text: "Vitalik posts ETH roadmap update, community sentiment surges", sentiment: "bull" },
      { time: "05:00", text: "FUD spreading about major exchange hack rumor (unverified)", sentiment: "bear" },
      { time: "03:15", text: "AI agent token narrative dominates crypto Twitter discourse", sentiment: "neutral" },
      { time: "01:45", text: "Whale influencer account signals large BTC position entry", sentiment: "bull" },
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
      { ticker: "TRG_007", name: "Gas > 100 Gwei", change: 0 },
      { ticker: "TRG_008", name: "Sentiment Flip", change: 0 },
    ],
    feed: [
      { time: "13:00 EST", date: "Friday, February 14, 2026", content: "TRIGGER FIRED: BTC crossed $100,000 resistance level. All 3 confirmation criteria met: (1) 4H candle close above, (2) volume exceeds 20-day average by 2.3x, (3) RSI above 55. Webhook notification sent to 12 connected endpoints." },
      { time: "11:15 EST", content: "TRIGGER ARMED: ETH funding rate approaching 0.02% threshold on Binance. Currently at 0.0187%. Estimated trigger time: ~45 minutes at current rate of change. Push notification queued." },
      { time: "22:00 EST", date: "Thursday, February 13, 2026", content: "DAILY SUMMARY: 42 active triggers monitored. 3 fired in the last 24 hours. 7 triggers within 10% of activation threshold. System uptime: 99.97%. Average notification latency: 230ms." },
    ],
    headlines: [
      { time: "13:00", text: "FIRED: BTC > $100K trigger activated across 12 webhooks", sentiment: "bull" },
      { time: "11:15", text: "ARMED: ETH funding rate nearing critical threshold", sentiment: "neutral" },
      { time: "08:00", text: "STANDBY: 42 triggers active, system nominal", sentiment: "neutral" },
      { time: "06:30", text: "FIRED: Whale movement >$50M detected on-chain", sentiment: "bear" },
      { time: "04:00", text: "ARMED: SOL RSI approaching overbought territory", sentiment: "neutral" },
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
  const agent = agentData[agentId || "chart"];

  if (!agent) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground font-mono">AGENT_NOT_FOUND</p>
      </div>
    );
  }

  const agentColor = `hsl(${agent.color})`;

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
          <div className="flex items-center gap-2">
            <span style={{ color: agentColor }}>{categoryIcons[agentId || "chart"]}</span>
            <span className="font-mono text-sm tracking-wider">{agent.name}</span>
            <span className="text-xs text-muted-foreground font-mono">/ {agent.category}</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-status-active animate-pulse-dot" />
            <span className="text-xs font-mono text-muted-foreground">ONLINE</span>
          </div>
          <button className="bg-primary text-primary-foreground px-4 py-1.5 text-xs font-mono tracking-wider hover:opacity-90 transition-opacity">
            INITIALIZE
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar - Watchlist */}
        <motion.aside
          className="w-80 border-r border-border flex flex-col shrink-0 overflow-hidden"
          initial={{ x: -40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <div className="p-4 border-b border-border">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono tracking-wider" style={{ color: agentColor }}>
                MY WATCHLIST
              </span>
              <button className="text-muted-foreground hover:text-foreground transition-colors">
                <Settings size={14} />
              </button>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex-1 flex items-center gap-2 border border-border bg-card px-3 py-1.5">
                <Search size={12} className="text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-transparent text-xs font-mono outline-none flex-1 placeholder:text-muted-foreground/50"
                />
              </div>
              <button className="border border-border p-1.5 text-muted-foreground hover:text-foreground transition-colors">
                <Plus size={14} />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            <div className="p-3">
              <div className="flex items-center justify-between mb-2 px-1">
                <span className="text-[10px] font-mono text-muted-foreground tracking-wider">Default Watchlist</span>
                <ChevronDown size={12} className="text-muted-foreground" />
              </div>
              {agent.watchlist.map((item, i) => (
                <motion.div
                  key={item.ticker}
                  className="flex items-center justify-between px-3 py-2.5 hover:bg-secondary cursor-pointer transition-colors group"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <div>
                    <span className="text-sm font-bold" style={{ color: agentColor }}>{item.ticker}</span>
                    <p className="text-[10px] text-muted-foreground mt-0.5">{item.name}</p>
                  </div>
                  <span className={`text-xs font-mono ${item.change > 0 ? "text-status-active" : item.change < 0 ? "text-status-hot" : "text-muted-foreground"}`}>
                    {item.change > 0 ? "+" : ""}{item.change.toFixed(2)}%
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="border-t border-border p-3">
            <button className="flex items-center gap-2 text-xs font-mono text-muted-foreground hover:text-foreground transition-colors w-full px-3 py-2">
              <Plus size={12} />
              <span>Add Ticker</span>
            </button>
          </div>
        </motion.aside>

        {/* Center - Analysis Feed */}
        <motion.div
          className="flex-1 flex flex-col overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <div className="flex-1 overflow-y-auto px-8 py-6">
            {agent.feed.map((entry, i) => (
              <div key={i}>
                {entry.date && (
                  <div className="mb-4 mt-6 first:mt-0">
                    <span className="font-mono text-sm tracking-wide text-foreground">{entry.date}</span>
                  </div>
                )}
                <div className="mb-6">
                  <span className="text-xs font-mono text-muted-foreground">{entry.time}</span>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/90">{entry.content}</p>
                  <button className="text-xs font-mono text-muted-foreground hover:text-foreground mt-2 transition-colors">
                    ..More
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Chat Input */}
          <div className="border-t border-border p-4">
            <div className="border border-border bg-card px-4 py-3">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-muted-foreground/50 font-mono text-sm">&gt;</span>
                <input
                  type="text"
                  placeholder="Ask your agent anything..."
                  className="bg-transparent text-sm font-mono outline-none flex-1 placeholder:text-muted-foreground/40"
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button className="text-xs font-mono text-muted-foreground flex items-center gap-1 hover:text-foreground transition-colors">
                    /Deep Research <ChevronDown size={10} />
                  </button>
                  <button className="text-xs font-mono text-muted-foreground flex items-center gap-1 hover:text-foreground transition-colors">
                    All Sources <ChevronDown size={10} />
                  </button>
                </div>
                <button className="text-muted-foreground hover:text-foreground transition-colors" style={{ color: agentColor }}>
                  <Send size={16} />
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Sidebar - Market Data & Headlines */}
        <motion.aside
          className="w-96 border-l border-border flex flex-col shrink-0 overflow-hidden"
          initial={{ x: 40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          {/* Market Stats */}
          <div className="p-4 border-b border-border">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono tracking-wider" style={{ color: agentColor }}>MARKET LIVE</span>
              <ExternalLink size={12} className="text-muted-foreground" />
            </div>

            {/* Mini Chart Placeholder */}
            <div className="border border-border bg-card p-3 mb-3">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-bold text-sm">{agent.watchlist[0]?.ticker}</span>
                <span className="text-[10px] font-mono text-muted-foreground">{agent.watchlist[0]?.name}</span>
              </div>
              <div className="flex gap-3 text-[10px] font-mono text-muted-foreground mb-3">
                {agent.marketStats.map((stat) => (
                  <span key={stat.label}>
                    <span className="text-muted-foreground">{stat.label}</span>{" "}
                    <span className="text-foreground">{stat.value}</span>
                  </span>
                ))}
              </div>

              {/* SVG Mini Chart */}
              <svg viewBox="0 0 300 100" className="w-full h-24">
                <defs>
                  <linearGradient id={`grad-${agentId}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={agentColor} stopOpacity="0.3" />
                    <stop offset="100%" stopColor={agentColor} stopOpacity="0" />
                  </linearGradient>
                </defs>
                <motion.path
                  d="M0,70 L30,65 L60,75 L90,60 L120,55 L150,40 L180,45 L210,30 L240,35 L270,20 L300,25"
                  fill="none"
                  stroke={agentColor}
                  strokeWidth="2"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, delay: 0.5 }}
                />
                <motion.path
                  d="M0,70 L30,65 L60,75 L90,60 L120,55 L150,40 L180,45 L210,30 L240,35 L270,20 L300,25 L300,100 L0,100 Z"
                  fill={`url(#grad-${agentId})`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 1.5 }}
                />
              </svg>
            </div>
          </div>

          {/* Headlines */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="mb-3">
              <span className="font-mono text-xs tracking-wide text-foreground">Friday, February 14, 2026</span>
            </div>
            <div className="space-y-3">
              {agent.headlines.map((headline, i) => (
                <motion.div
                  key={i}
                  className="flex gap-3 group cursor-pointer"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                >
                  <span className="text-[10px] font-mono text-muted-foreground shrink-0 mt-0.5">{headline.time}</span>
                  <p className={`text-xs leading-relaxed group-hover:underline ${
                    headline.sentiment === "bull"
                      ? "text-status-active"
                      : headline.sentiment === "bear"
                        ? "text-status-hot"
                        : "text-foreground/80"
                  }`}>
                    {headline.text}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.aside>
      </div>

      {/* Left Icon Bar (like reference) */}
      <div className="fixed left-0 top-[53px] bottom-0 w-12 border-r border-border bg-background flex flex-col items-center py-4 gap-4 z-10">
        {Object.entries(categoryIcons).map(([key, icon]) => (
          <button
            key={key}
            onClick={() => navigate(`/agent/${key}`)}
            className={`p-2 transition-colors ${
              key === agentId
                ? "text-foreground bg-secondary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {icon}
          </button>
        ))}
      </div>

      {/* Offset left sidebar for icon bar */}
      <style>{`
        .flex.flex-1.overflow-hidden > aside:first-child {
          margin-left: 48px;
        }
      `}</style>
    </div>
  );
};

export default AgentDetail;
