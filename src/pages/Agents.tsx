import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  BarChart3, Link2, TrendingUp, MessageSquare, Clock, Bell,
  ExternalLink, Search, Send, Settings, Plus, ChevronDown, ArrowDownUp, X,
  LineChart, List, Activity, PanelLeftClose, PanelLeftOpen, PanelRightClose, PanelRightOpen, Sun, Moon, Lock, Zap, Users,
} from "lucide-react";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import AppNav from "@/components/AppNav";
import TradingViewChart from "@/components/TradingViewChart";
import TickerBar from "@/components/TickerBar";
import { useWallet } from "@/contexts/WalletContext";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";

const sharedWatchlist = [
  { ticker: "BTC", name: "Bitcoin", price: "101,890", change: 2.41 },
  { ticker: "ETH", name: "Ethereum", price: "3,842", change: -1.32 },
  { ticker: "SOL", name: "Solana", price: "248.50", change: 5.67 },
  { ticker: "AVAX", name: "Avalanche", price: "42.18", change: -0.89 },
  { ticker: "DOGE", name: "Dogecoin", price: "0.182", change: 3.12 },
  { ticker: "XRP", name: "Ripple", price: "2.41", change: 1.05 },
];

const allMarkets = [
  { ticker: "BTC", name: "Bitcoin", price: "101,890", change: 2.41, active: true },
  { ticker: "ETH", name: "Ethereum", price: "3,842", change: -1.32, active: true },
  { ticker: "SOL", name: "Solana", price: "248.50", change: 5.67, active: true },
  { ticker: "AVAX", name: "Avalanche", price: "42.18", change: -0.89, active: false },
  { ticker: "DOGE", name: "Dogecoin", price: "0.182", change: 3.12, active: true },
  { ticker: "XRP", name: "Ripple", price: "2.41", change: 1.05, active: false },
  { ticker: "LINK", name: "Chainlink", price: "18.42", change: 1.8, active: false },
  { ticker: "DOT", name: "Polkadot", price: "7.23", change: -2.1, active: false },
  { ticker: "MATIC", name: "Polygon", price: "0.92", change: 0.5, active: false },
  { ticker: "ADA", name: "Cardano", price: "0.68", change: -0.7, active: false },
  { ticker: "ATOM", name: "Cosmos", price: "9.14", change: 3.2, active: false },
  { ticker: "UNI", name: "Uniswap", price: "12.31", change: 1.1, active: false },
  { ticker: "APT", name: "Aptos", price: "8.90", change: -1.4, active: false },
  { ticker: "ARB", name: "Arbitrum", price: "1.18", change: 2.9, active: false },
  { ticker: "PEPE", name: "Pepe", price: "0.00001842", change: 12.44, active: false },
  { ticker: "WIF", name: "dogwifhat", price: "2.4100", change: -5.23, active: false },
  { ticker: "BONK", name: "Bonk", price: "0.00003150", change: 8.91, active: false },
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

const initialAlertEvents = [
  { id: "e1", exchange: "Binance", type: "liquidation", side: "BUY", pair: "BTCUSDT", amount: "0.542", price: "101,890.30", time: "8:32 PM", mine: true },
  { id: "e2", exchange: "Binance", type: "liquidation", side: "SELL", pair: "ETHUSDT", amount: "25.000", price: "3,842.55", time: "8:32 PM", mine: false },
  { id: "e3", exchange: "Binance", type: "liquidation", side: "BUY", pair: "SOLUSDT", amount: "1,200", price: "248.50", time: "8:31 PM", mine: true },
  { id: "e4", exchange: "OKX", type: "liquidation", side: "SELL", pair: "BTCUSDT", amount: "0.003", price: "101,885.10", time: "8:31 PM", mine: false },
  { id: "e5", exchange: "Binance", type: "liquidation", side: "BUY", pair: "DOGEUSDT", amount: "52,000", price: "0.1820", time: "8:30 PM", mine: true },
  { id: "e6", exchange: "Bybit", type: "liquidation", side: "BUY", pair: "ETHUSDT", amount: "8.500", price: "3,841.20", time: "8:30 PM", mine: false },
  { id: "e7", exchange: "Binance", type: "whale", side: "BUY", pair: "BTCUSDT", amount: "15.000", price: "101,900.00", time: "8:29 PM", mine: true },
  { id: "e8", exchange: "Binance", type: "liquidation", side: "SELL", pair: "XRPUSDT", amount: "45,000", price: "2.4100", time: "8:29 PM", mine: false },
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
  const time = `${now.getHours() > 12 ? now.getHours() - 12 : now.getHours()}:${now.getMinutes().toString().padStart(2, "0")} ${now.getHours() >= 12 ? "PM" : "AM"}`;
  return { id: `live-${id}`, exchange, type, side, pair, amount, price, time, mine: Math.random() > 0.5 };
};

const allFeed = agents.flatMap((a) =>
  a.feed.map((f) => ({ ...f, agentName: a.name, agentEmoji: a.emoji, agentColor: a.color }))
).sort((a, b) => (b.date || "").localeCompare(a.date || "") || b.time.localeCompare(a.time));

// Orchestrated response data: one unified conclusion + per-agent breakdowns
type OrchestratedResponse = {
  conclusion: string;
  signal: string;
  confidence: number;
  agentBreakdowns: Array<{
    agentId: string;
    summary: string;
    keyData: Array<{ label: string; value: string }>;
  }>;
};

const orchestratedResponses: Record<string, OrchestratedResponse> = {
  default: {
    conclusion: "BTC is currently testing the $101,890 resistance zone. Combining the 4H descending wedge + RSI 32.4 oversold divergence, CVD turning positive (buy-side dominant), volume profile high-density zone at $99K-$101K, on-chain net outflow -$492M (accumulation), OI +12% short squeeze buildup, and extreme social greed — **short-term bullish breakout probability is elevated.** Key resistance $102,350 breakout targets $108,500. $103K liquidation cluster is the key variable.",
    signal: "LONG",
    confidence: 73,
    agentBreakdowns: [
      { agentId: "chart", summary: "4H descending wedge pattern. RSI 32.4 oversold divergence + MACD bullish cross. Bounce attempt at 0.618 Fibonacci retracement. CVD turning positive confirms real buy-side inflow. Volume Profile POC $100,200.", keyData: [{ label: "Pattern", value: "Descending Wedge" }, { label: "RSI (4H)", value: "32.4 Oversold" }, { label: "CVD", value: "+$82M (Positive)" }, { label: "Support", value: "$99,180 (S1)" }, { label: "Resistance", value: "$102,350 (R1)" }, { label: "Volume", value: "1.8x vs Avg" }, { label: "Bollinger", value: "Lower touch, contracting" }, { label: "Target", value: "$108,500" }] },
      { agentId: "chain", summary: "Cold wallet → exchange transfer of 15,000 BTC detected. Net outflow -$492M indicates accumulation phase. Long-term holder supply at ATH. Exchange reserves down 3.2% — sell pressure easing.", keyData: [{ label: "Net Flow", value: "-$492M" }, { label: "Whale Activity", value: "HIGH (3/$1B+)" }, { label: "LTH Supply", value: "ATH" }, { label: "Exchange Reserves", value: "-3.2% (Weekly)" }, { label: "SOPR", value: "1.02 (Minimal profit-taking)" }] },
      { agentId: "deriv", summary: "OI surged 12% in 4 hours, reaching $38.2B. Funding rate 0.0122% — short squeeze buildup. $103K liquidation cluster at $245M. Options Put/Call ratio 0.42, call-biased.", keyData: [{ label: "OI", value: "$38.2B (+12%)" }, { label: "Funding", value: "0.0122%" }, { label: "Liq. Cluster", value: "$103K ($245M)" }, { label: "P/C Ratio", value: "0.42 (Call bias)" }, { label: "Max Pain", value: "$96K" }] },
      { agentId: "social", summary: "15+ channels showing extreme greed. X mentions at 4.2K/min. Institutional adoption cycle narrative dominant. Fear & Greed Index 82. Contrarian signal approaching threshold.", keyData: [{ label: "Sentiment", value: "82/100 (Extreme Greed)" }, { label: "Mentions", value: "4.2K/min (+120%)" }, { label: "Narrative", value: "Institutional Adoption" }, { label: "Influencer", value: "85% BULLISH" }] },
    ],
  },
  btc: {
    conclusion: "BTC 1H ascending triangle forming. RSI 45→58 rising, CVD +$124M buy-dominant, volume 1.6x 24H avg. Volume Profile POC $100,200. Support $99,180(S1) / $97,500(S2), resistance $102,350(R1). **$102,350 breakout targets $108,500.** Exchange reserves -3.2% signals sell pressure easing.",
    signal: "LONG",
    confidence: 82,
    agentBreakdowns: [
      { agentId: "chart", summary: "1H ascending triangle. RSI 58 neutral-rising. CVD +$124M real buy-side. ATR 1,420 moderate volatility. Bollinger bands contracting → breakout imminent.", keyData: [{ label: "Pattern", value: "Ascending Triangle" }, { label: "RSI (1H)", value: "58 (Neutral Rising)" }, { label: "CVD", value: "+$124M" }, { label: "Support S1", value: "$99,180" }, { label: "Support S2", value: "$97,500" }, { label: "Resistance R1", value: "$102,350" }, { label: "Volume", value: "1.6x Avg" }, { label: "ATR", value: "$1,420" }, { label: "Target", value: "$108,500" }] },
      { agentId: "chain", summary: "Exchange reserves down 3.2% weekly. Miner outflow at low levels — no capitulation. SOPR 1.02, minimal profit-taking. LTH supply at ATH.", keyData: [{ label: "Exchange Reserves", value: "-3.2%" }, { label: "Miner Outflow", value: "LOW" }, { label: "LTH", value: "ATH" }, { label: "SOPR", value: "1.02" }] },
    ],
  },
  eth: {
    conclusion: "ETH/BTC testing 0.032 support. RSI 38 approaching oversold, CVD +$45M buy inflow. Volume 1.3x avg. Beacon chain deposits surged 40% + $4,500 call $105M bought. **ETH independent rally probability 78%.**",
    signal: "LONG",
    confidence: 75,
    agentBreakdowns: [
      { agentId: "chart", summary: "ETH/BTC 0.032 key support. RSI 38 approaching oversold. CVD +$45M. Daily cup-and-handle forming. Support $3,680(S1), resistance $4,020(R1).", keyData: [{ label: "ETH/BTC", value: "0.032 Support" }, { label: "RSI (4H)", value: "38 (Near Oversold)" }, { label: "CVD", value: "+$45M" }, { label: "Support S1", value: "$3,680" }, { label: "Resistance R1", value: "$4,020" }, { label: "Volume", value: "1.3x Avg" }, { label: "Bounce Prob.", value: "78%" }] },
      { agentId: "chain", summary: "Staking deposits surged 40% in 24H. 32,000 ETH entered beacon chain. Gas at 34 Gwei.", keyData: [{ label: "Staking", value: "+40%" }, { label: "Inflow", value: "32,000 ETH" }, { label: "Gas", value: "34 Gwei" }] },
      { agentId: "deriv", summary: "$105M in $4,500 call options for March expiry detected.", keyData: [{ label: "Options", value: "$105M Call" }, { label: "Strike", value: "$4,500" }, { label: "P/C Ratio", value: "0.38" }] },
    ],
  },
  sol: {
    conclusion: "SOL weekly cup-and-handle completed. RSI 62 bullish momentum, CVD +$67M strong buy-side. Volume surged 2.1x. DeFi TVL +18%, social mentions +89%. **$285 measured target. $230 support must hold.**",
    signal: "STRONG LONG",
    confidence: 85,
    agentBreakdowns: [
      { agentId: "chart", summary: "Weekly cup-and-handle completed. RSI 62 healthy uptrend. CVD +$67M strong real buying. Support $230(S1), resistance $260(R1). Bollinger upper expanding.", keyData: [{ label: "Pattern", value: "Cup & Handle" }, { label: "RSI (1D)", value: "62 (Bullish Momentum)" }, { label: "CVD", value: "+$67M" }, { label: "Support S1", value: "$230" }, { label: "Resistance R1", value: "$260" }, { label: "Volume", value: "2.1x Avg" }, { label: "Target", value: "$285" }] },
      { agentId: "chain", summary: "SOL DeFi TVL up 18% weekly. DEX volume at all-time record.", keyData: [{ label: "TVL", value: "+18%" }, { label: "DEX", value: "ATH" }, { label: "On-chain", value: "ALL GREEN" }] },
      { agentId: "social", summary: "SOL extreme bullish bias. Mention volume surged 89% in 24H.", keyData: [{ label: "Mentions", value: "+89%" }, { label: "Bias", value: "Extreme Bullish" }, { label: "Trend", value: "AI Agent" }] },
    ],
  },
};

const Agents = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { connected, addTrade, chatCount, maxFreeChats, incrementChat, subscription } = useWallet();
  const isPro = subscription && subscription !== "FREE";
  const remaining = isPro ? Infinity : maxFreeChats - chatCount;
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const { toast } = useToast();
  const [mobileTab, setMobileTab] = useState<"chat" | "community" | "market" | "watchlist">("chat");
  const [mobileMarketSub, setMobileMarketSub] = useState<"headlines" | "intelligence" | "agents">("headlines");
  const [coinDropdownOpen, setCoinDropdownOpen] = useState(false);
  const [selectedAgents, setSelectedAgents] = useState<Set<string>>(new Set(agents.map((a) => a.id)));
  const [swapFrom, setSwapFrom] = useState("ETH");
  const [swapTo, setSwapTo] = useState("BTC");
  const [swapAmount, setSwapAmount] = useState("");
  const [swapModalOpen, setSwapModalOpen] = useState(false);
  const [swapSignal, setSwapSignal] = useState<{ asset: string; direction: string } | null>(null);
  const [expandedAgent, setExpandedAgent] = useState<string | null>(null);
  const [alertFilter, setAlertFilter] = useState<"all" | "mine">("all");
  const [watchlistCollapsed, setWatchlistCollapsed] = useState(false);
  const [communityCollapsed, setCommunityCollapsed] = useState(true);
  const [communityInput, setCommunityInput] = useState("");
  const [communityMessages, setCommunityMessages] = useState([
    { id: "c1", user: "Whale_0x7F", avatar: "🐋", text: "BTC breaks 102K, 108K opens up next", time: "8:45 PM", badge: "PRO" },
    { id: "c2", user: "degen_sol", avatar: "🔥", text: "SOL cup & handle complete — 285 target", time: "8:42 PM", badge: null },
    { id: "c3", user: "ChartMaster", avatar: "📐", text: "ETH/BTC 0.032 support bounce prob 78%", time: "8:38 PM", badge: "PRO" },
    { id: "c4", user: "alpha_hunter", avatar: "🎯", text: "Funding rate flipped negative — short squeeze watch", time: "8:35 PM", badge: null },
    { id: "c5", user: "0xSentiment", avatar: "💬", text: "Social grid extremes — reversal signal possible", time: "8:30 PM", badge: "PRO" },
    { id: "c6", user: "onchain_spy", avatar: "⛓", text: "15K BTC cold wallet → exchange transfer detected", time: "8:25 PM", badge: null },
    { id: "c7", user: "derivatives_pro", avatar: "📡", text: "OI surged 12% — $103K liquidation cluster alert", time: "8:20 PM", badge: "PRO" },
    { id: "c8", user: "moon_trader", avatar: "🌙", text: "AVAX bullish divergence — hidden gem", time: "8:15 PM", badge: null },
  ]);
  const communityScrollRef = useRef<HTMLDivElement>(null);
  const [predictions, setPredictions] = useState([
    { id: "p1", question: "BTC hits $110K by Feb 28?", yesPercent: 68, pool: 2450, closes: "13d 4h", myVote: null as "yes" | "no" | null },
    { id: "p2", question: "ETH flips $4K before March?", yesPercent: 42, pool: 1820, closes: "18d 11h", myVote: null as "yes" | "no" | null },
    { id: "p3", question: "SOL breaks $300 this week?", yesPercent: 55, pool: 980, closes: "5d 2h", myVote: null as "yes" | "no" | null },
  ]);
  const handleVote = useCallback((predId: string, vote: "yes" | "no") => {
    setPredictions((prev) =>
      prev.map((p) => {
        if (p.id !== predId) return p;
        if (p.myVote === vote) return p; // already voted same
        const shift = vote === "yes" ? 3 : -3;
        const newYes = Math.max(5, Math.min(95, p.yesPercent + (p.myVote ? shift * 2 : shift)));
        return { ...p, yesPercent: newYes, pool: p.pool + 50, myVote: vote };
      })
    );
    toast({ title: `🎯 Bet placed: ${vote.toUpperCase()}`, description: "Your prediction has been recorded!" });
  }, [toast]);
  const [selectedTickerIndex, setSelectedTickerIndex] = useState(0);
  const timeframes = ["1H", "4H", "1D", "1W"] as const;
  const [selectedTimeframe, setSelectedTimeframe] = useState<string>("4H");
  const [isDark, setIsDark] = useState(() => document.documentElement.classList.contains("dark"));

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);
  const dataSources = ["On-Chain", "Derivatives", "Social", "Technical", "News", "Private Data"];
  const [selectedSources, setSelectedSources] = useState<Set<string>>(new Set(["On-Chain", "Derivatives", "Social", "Technical"]));

  const toggleSource = useCallback((source: string) => {
    setSelectedSources((prev) => {
      const next = new Set(prev);
      if (next.has(source)) next.delete(source);
      else next.add(source);
      return next;
    });
  }, []);

  const [liveAlerts, setLiveAlerts] = useState(initialAlertEvents);
  const alertCounter = useRef(0);
  const alertScrollRef = useRef<HTMLDivElement>(null);
  const selectedTicker = sharedWatchlist[selectedTickerIndex];
  const filteredAlerts = alertFilter === "mine" ? liveAlerts.filter((a) => a.mine) : liveAlerts;

  // Chat state — now with orchestrated responses
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState<Array<{
    id: string;
    type: "user" | "orchestrator";
    content: string;
    signal?: string;
    confidence?: number;
    time: string;
    isTyping?: boolean;
  }>>([]);
  // Right panel agent breakdowns for the latest query
  const [activeBreakdowns, setActiveBreakdowns] = useState<OrchestratedResponse["agentBreakdowns"]>([]);
  const [expandedBreakdown, setExpandedBreakdown] = useState<string | null>(null);

  const chatScrollRef = useRef<HTMLDivElement>(null);
  const msgCounter = useRef(0);

  const getTimeNow = () => {
    const now = new Date();
    const h = now.getHours();
    const m = now.getMinutes().toString().padStart(2, "0");
    const period = h >= 12 ? "PM" : "AM";
    return `${h > 12 ? h - 12 : h}:${m} ${period}`;
  };

  const handleSendCommunityMsg = useCallback(() => {
    if (!communityInput.trim()) return;
    const newMsg = {
      id: `cm-${Date.now()}`,
      user: "You",
      avatar: "👤",
      text: communityInput.trim(),
      time: getTimeNow(),
      badge: isPro ? "PRO" : null,
    };
    setCommunityMessages((prev) => [...prev, newMsg]);
    setCommunityInput("");
    setTimeout(() => {
      if (communityScrollRef.current) communityScrollRef.current.scrollTop = communityScrollRef.current.scrollHeight;
    }, 50);
  }, [communityInput, isPro]);

  const handleSendMessage = useCallback(() => {
    if (!chatInput.trim()) return;
    if (!incrementChat()) {
      setShowUpgradeModal(true);
      return;
    }
    const userMsg = chatInput.trim();
    setChatInput("");

    const userMsgId = `user-${++msgCounter.current}`;
    setChatMessages((prev) => [...prev, {
      id: userMsgId,
      type: "user",
      content: userMsg,
      time: getTimeNow(),
    }]);

    // Determine response key
    const lower = userMsg.toLowerCase();
    let responseKey = "default";
    if (lower.includes("btc") || lower.includes("bitcoin")) responseKey = "btc";
    else if (lower.includes("eth") || lower.includes("ethereum")) responseKey = "eth";
    else if (lower.includes("sol") || lower.includes("solana")) responseKey = "sol";

    const orchestrated = orchestratedResponses[responseKey] || orchestratedResponses.default;

    // If only one agent is selected, show that agent's breakdown directly as the answer
    const singleAgent = selectedAgents.size === 1 ? Array.from(selectedAgents)[0] : null;

    // Show typing indicator
    const typingId = `typing-${++msgCounter.current}`;
    setTimeout(() => {
      setChatMessages((prev) => [...prev, {
        id: typingId,
        type: "orchestrator",
        content: "",
        time: getTimeNow(),
        isTyping: true,
      }]);
    }, 400);

    // Show final orchestrated answer
    setTimeout(() => {
      if (singleAgent) {
        const agentBreakdown = orchestrated.agentBreakdowns.find((b) => b.agentId === singleAgent);
        const agent = agents.find((a) => a.id === singleAgent);
        if (agentBreakdown && agent) {
          setChatMessages((prev) =>
            prev.map((m) => m.id === typingId ? {
              ...m,
              content: `**${agent.emoji} ${agent.name} Solo Analysis:** ${agentBreakdown.summary}`,
              isTyping: false,
              signal: orchestrated.signal,
              confidence: orchestrated.confidence,
            } : m)
          );
          setActiveBreakdowns([agentBreakdown]);
          setExpandedBreakdown(singleAgent);
        }
      } else {
        // Filter breakdowns to selected agents only
        const filteredBreakdowns = orchestrated.agentBreakdowns.filter(
          (b) => selectedAgents.has(b.agentId)
        );
        setChatMessages((prev) =>
          prev.map((m) => m.id === typingId ? {
            ...m,
            content: orchestrated.conclusion,
            isTyping: false,
            signal: orchestrated.signal,
            confidence: orchestrated.confidence,
          } : m)
        );
        setActiveBreakdowns(filteredBreakdowns);
        setExpandedBreakdown(null);
      }
    }, 2000);
  }, [chatInput, selectedAgents, incrementChat]);

  // Auto-scroll chat
  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [chatMessages]);

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
      <div className="relative">
        <AppNav />
        <button
          onClick={() => setIsDark((p) => !p)}
          className="absolute right-[220px] sm:right-[280px] top-1/2 -translate-y-1/2 p-1.5 border border-border hover:border-accent/50 bg-card transition-colors z-10"
          title={isDark ? "Switch to Light" : "Switch to Dark"}
        >
          {isDark ? <Sun size={12} className="text-foreground" /> : <Moon size={12} className="text-foreground" />}
        </button>
      </div>

      {/* === MOBILE LAYOUT === */}
      {isMobile ? (
        <div className="flex-1 flex flex-col overflow-hidden">
        <ResizablePanelGroup direction="vertical" className="flex-1">
          {/* Chart — resizable top panel */}
          <ResizablePanel defaultSize={35} minSize={20} maxSize={60}>
            <div className="h-full flex flex-col overflow-hidden">
              <div className="px-3 py-1.5 flex items-center justify-between shrink-0 border-b border-border">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[10px] text-accent">{selectedTicker?.ticker}</span>
                  <span className="text-[8px] font-mono text-muted-foreground">{selectedTicker?.name}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className={`text-[9px] font-mono font-semibold ${selectedTicker.change > 0 ? "text-status-active" : "text-status-hot"}`}>
                    {selectedTicker.change > 0 ? "+" : ""}{selectedTicker.change}%
                  </span>
                  <div className="flex gap-[1px] ml-1">
                    {timeframes.map((tf) => (
                      <button key={tf} onClick={() => setSelectedTimeframe(tf)} className={`font-mono text-[8px] px-1.5 py-[1px] transition-colors ${selectedTimeframe === tf ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground"}`}>
                        {tf}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex-1 min-h-0">
                <TradingViewChart symbol={selectedTicker?.ticker || "BTC"} fillHeight />
              </div>
            </div>
          </ResizablePanel>

          <ResizableHandle withHandle />

          {/* Bottom: coin bar + tab content */}
          <ResizablePanel defaultSize={65} minSize={30}>
            <div className="h-full flex flex-col overflow-hidden">
              {/* Coin selector bar */}
              <div className="shrink-0 flex items-center border-b border-border bg-card/30 relative">
                <div className="relative shrink-0">
                  <button
                    onClick={() => setCoinDropdownOpen((p) => !p)}
                    className="flex items-center gap-0.5 px-2 py-1.5 text-[9px] font-mono text-muted-foreground hover:text-foreground transition-colors border-r border-border"
                  >
                    <Plus size={10} />
                    <ChevronDown size={8} className={`transition-transform ${coinDropdownOpen ? "rotate-180" : ""}`} />
                  </button>
                  {coinDropdownOpen && (
                    <div className="absolute top-full left-0 z-50 bg-background border border-border shadow-lg min-w-[160px] max-h-[200px] overflow-y-auto">
                      {allMarkets.filter((m) => !sharedWatchlist.some((w) => w.ticker === m.ticker)).map((coin) => (
                        <button
                          key={coin.ticker}
                          onClick={() => {
                            setCoinDropdownOpen(false);
                            toast({ title: `${coin.ticker} added`, description: `${coin.name} added to watchlist` });
                          }}
                          className="w-full flex items-center justify-between px-3 py-2 text-[10px] font-mono hover:bg-accent/10 transition-colors"
                        >
                          <div className="flex items-center gap-1.5">
                            <span className={`w-1.5 h-1.5 rounded-full ${coin.active ? "bg-status-active" : "bg-muted-foreground/30"}`} />
                            <span className="font-semibold text-foreground">{coin.ticker}</span>
                          </div>
                          <span className={`text-[9px] ${coin.change > 0 ? "text-status-active" : "text-status-hot"}`}>
                            {coin.change > 0 ? "+" : ""}{coin.change}%
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex-1 flex items-center gap-0 overflow-x-auto scrollbar-hide">
                  {sharedWatchlist.map((item, idx) => {
                    const marketItem = allMarkets.find((m) => m.ticker === item.ticker);
                    return (
                      <button
                        key={item.ticker}
                        onClick={() => setSelectedTickerIndex(idx)}
                        className={`flex items-center gap-1 px-2.5 py-1.5 text-[9px] font-mono font-semibold whitespace-nowrap transition-colors border-b-2 ${
                          idx === selectedTickerIndex
                            ? "text-accent border-accent"
                            : "text-muted-foreground border-transparent hover:text-foreground"
                        }`}
                      >
                        <span className={`w-1 h-1 rounded-full ${marketItem?.active ? "bg-status-active" : "bg-muted-foreground/30"}`} />
                        <span>{item.ticker}</span>
                        <span className={`text-[8px] font-normal ${item.change > 0 ? "text-status-active" : "text-status-hot"}`}>
                          {item.change > 0 ? "+" : ""}{item.change.toFixed(1)}%
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Tab content — fills remaining space */}
              <div className="flex-1 overflow-hidden flex flex-col">
            {/* CHAT TAB */}
            {mobileTab === "chat" && (
              <div className="flex-1 flex flex-col overflow-hidden">
                <div className="flex-1 overflow-y-auto px-3 py-2" ref={chatScrollRef}>
                  {chatMessages.length === 0 && (
                    <div className="flex flex-col items-center justify-center h-full text-center py-8 opacity-60">
                      <span className="text-2xl mb-2">⊞</span>
                      <p className="text-xs font-mono text-muted-foreground mb-1">Terminal Ready</p>
                      <p className="text-[9px] font-mono text-muted-foreground/60">Enter a query to start</p>
                    </div>
                  )}
                  <AnimatePresence>
                    {chatMessages.map((msg) => (
                      <motion.div key={msg.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }} className="mb-3">
                        {msg.type === "user" ? (
                          <div className="flex justify-end">
                            <div className="bg-accent/15 border border-accent/30 px-3 py-2 max-w-[85%]">
                              <div className="flex items-center gap-2 mb-0.5">
                                <span className="text-[8px] font-mono text-accent font-semibold">YOU</span>
                                <span className="text-[7px] font-mono text-muted-foreground">{msg.time}</span>
                              </div>
                              <p className="text-[11px] leading-relaxed">{msg.content}</p>
                            </div>
                          </div>
                        ) : (
                          <div className="border border-border/50 bg-card/30 p-3">
                            <div className="flex items-center gap-1.5 mb-1.5">
                              <span className="text-[9px]">⊞</span>
                              <span className="text-[8px] font-mono font-semibold text-accent">ORCHESTRATOR</span>
                              <span className="text-[7px] font-mono text-muted-foreground">{msg.time}</span>
                            </div>
                            {msg.isTyping ? (
                              <div className="flex items-center gap-1 py-1">
                                <motion.span className="w-1 h-1 rounded-full bg-accent" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 0.8, repeat: Infinity }} />
                                <motion.span className="w-1 h-1 rounded-full bg-accent" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 0.8, repeat: Infinity, delay: 0.2 }} />
                                <motion.span className="w-1 h-1 rounded-full bg-accent" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 0.8, repeat: Infinity, delay: 0.4 }} />
                                <span className="text-[8px] font-mono text-muted-foreground ml-1">analyzing...</span>
                              </div>
                            ) : (
                              <>
                                <p className="text-[11px] leading-relaxed text-foreground/90 mb-2">{msg.content}</p>
                                {msg.signal && (
                                  <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-border/30">
                                    <span className={`font-mono text-[10px] font-bold ${msg.signal?.includes("LONG") ? "text-status-active" : "text-status-hot"}`}>{msg.signal}</span>
                                    <span className="font-mono text-[10px] font-bold">{msg.confidence}%</span>
                                    <div className="flex-1 h-1 bg-border overflow-hidden min-w-[60px]">
                                      <div className="h-full bg-[hsl(45_90%_55%)]" style={{ width: `${msg.confidence}%` }} />
                                    </div>
                                    <button
                                      onClick={() => {
                                        const asset = msg.content.match(/BTC|ETH|SOL/)?.[0] || "BTC";
                                        setSwapSignal({ asset, direction: msg.signal || "LONG" });
                                        if (msg.signal?.includes("LONG")) { setSwapFrom("USDT"); setSwapTo(asset); }
                                        else { setSwapFrom(asset); setSwapTo("USDT"); }
                                        setSwapAmount("");
                                        setSwapModalOpen(true);
                                      }}
                                      className={`font-mono text-[9px] font-bold px-3 py-1.5 border ${
                                        msg.signal?.includes("LONG")
                                          ? "border-status-active text-status-active bg-status-active/10"
                                          : "border-status-hot text-status-hot bg-status-hot/10"
                                      }`}
                                    >
                                      {msg.signal?.includes("LONG") ? "▲ BUY" : "▼ SELL"}
                                    </button>
                                  </div>
                                )}
                              </>
                            )}
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                {/* Input area */}
                <div className="px-3 pt-1 pb-2 border-t border-border shrink-0">
                  <div className="flex items-center gap-1 mb-1.5 flex-wrap">
                    {agents.map((a) => (
                      <button key={a.id} type="button" onClick={() => toggleAgent(a.id)} className={`text-[9px] px-[5px] py-[2px] transition-colors ${selectedAgents.has(a.id) ? "text-accent-foreground" : "text-muted-foreground/40"}`} style={selectedAgents.has(a.id) ? { backgroundColor: `hsl(${a.color})` } : undefined}>
                        {a.emoji}
                      </button>
                    ))}
                    <span className="text-[7px] font-mono text-muted-foreground ml-1">{selectedAgents.size}/{agents.length}</span>
                  </div>
                  <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }} className="flex items-center gap-2 border border-border bg-card px-3 py-2">
                    <span className="text-accent font-mono text-xs">&gt;</span>
                    <input type="text" value={chatInput} onChange={(e) => setChatInput(e.target.value)} placeholder="Ask agents..." className="bg-transparent text-xs font-mono outline-none flex-1 min-w-0 placeholder:text-muted-foreground/40" />
                    <button type="submit" className="text-accent"><Send size={14} /></button>
                  </form>
                </div>
              </div>
            )}

            {/* MARKET TAB — Headlines + Intelligence + Agent Analysis */}
            {mobileTab === "market" && (
              <div className="flex-1 overflow-y-auto">
                {/* Sub-tabs for market content */}
                <div className="shrink-0 flex border-b border-border bg-card/30">
                  {(["headlines", "intelligence", "agents"] as const).map((sub) => (
                    <button
                      key={sub}
                      onClick={() => setMobileMarketSub(sub)}
                      className={`flex-1 py-2 text-[9px] font-mono font-semibold tracking-wider transition-colors border-b-2 ${
                        mobileMarketSub === sub
                          ? "text-accent border-accent"
                          : "text-muted-foreground border-transparent hover:text-foreground"
                      }`}
                    >
                      {sub === "headlines" ? "HEADLINES" : sub === "intelligence" ? "INTEL" : "AGENTS"}
                    </button>
                  ))}
                </div>

                {mobileMarketSub === "headlines" && (
                  <div className="px-3 py-2 space-y-1">
                    {agents.flatMap((a) => a.headlines.map((h) => ({ ...h, agentEmoji: a.emoji }))).slice(0, 12).map((h, i) => (
                      <div key={i} className="flex gap-2 py-1 border-b border-border/30">
                        <span className="text-[9px] font-mono text-muted-foreground shrink-0 w-8">{h.time}</span>
                        <p className={`text-[10px] leading-snug ${h.sentiment === "bull" ? "text-status-active font-medium" : (h.sentiment as string) === "bear" ? "text-status-hot font-medium" : "text-foreground/70"}`}>{h.text}</p>
                      </div>
                    ))}
                  </div>
                )}

                {mobileMarketSub === "intelligence" && (
                  <div className="px-3 py-3 bg-[hsl(45_90%_55%/0.08)]">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="relative w-[80px] h-[40px] shrink-0">
                        <svg viewBox="0 0 120 60" className="w-full h-full overflow-visible">
                          <path d="M 10 55 A 50 50 0 0 1 110 55" fill="none" stroke="hsl(var(--border))" strokeWidth="6" strokeLinecap="round" />
                          <path d="M 10 55 A 50 50 0 0 1 110 55" fill="none" stroke="hsl(45 90% 55%)" strokeWidth="6" strokeLinecap="round" strokeDasharray={`${Math.PI * 50 * 0.73} ${Math.PI * 50}`} />
                          {(() => { const a = Math.PI - (73/100)*Math.PI; return <line x1="60" y1="55" x2={60+36*Math.cos(a)} y2={55-36*Math.sin(a)} stroke="hsl(45 90% 55%)" strokeWidth="2" strokeLinecap="round" />; })()}
                          <circle cx="60" cy="55" r="3" fill="hsl(45 90% 55%)" />
                        </svg>
                        <div className="absolute bottom-[-2px] left-1/2 -translate-x-1/2"><span className="font-mono text-[16px] font-black">73</span></div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-1.5 mb-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-status-active animate-pulse" />
                          <span className="font-mono text-[10px] font-bold tracking-[1px]">LONG SIGNAL</span>
                        </div>
                        <div className="space-y-[3px]">
                          {[
                            { emoji: "📐", name: "CHART", score: 88, color: "268 35% 72%" },
                            { emoji: "⛓", name: "CHAIN", score: 65, color: "142 70% 45%" },
                            { emoji: "📡", name: "DERIV", score: 78, color: "0 84% 60%" },
                            { emoji: "💬", name: "SOCIAL", score: 72, color: "280 60% 65%" },
                          ].map((a) => (
                            <div key={a.name} className="flex items-center gap-1.5">
                              <span className="font-mono text-[8px] w-8 text-muted-foreground">{a.name}</span>
                              <div className="flex-1 h-[3px] bg-border overflow-hidden">
                                <div className="h-full" style={{ width: `${a.score}%`, backgroundColor: `hsl(${a.color})` }} />
                              </div>
                              <span className="font-mono text-[9px] w-5 text-right text-foreground/70">{a.score}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-1.5 border-t border-[hsl(45_90%_55%/0.12)]">
                      <span className="text-[9px] font-mono text-muted-foreground">COMPOSITE <span className="text-foreground font-bold">73</span></span>
                      <span className="text-[9px] font-mono text-status-active font-bold">BULLISH</span>
                    </div>
                  </div>
                )}

                {mobileMarketSub === "agents" && (
                  <div className="px-3 py-2">
                    {agents.map((agent) => {
                      const isSelected = selectedAgents.has(agent.id);
                      const breakdown = activeBreakdowns.find((b) => b.agentId === agent.id);
                      const isExpanded = expandedBreakdown === agent.id;
                      return (
                        <div key={agent.id} className="border-b border-border last:border-0">
                          <div className={`flex items-center justify-between py-2 cursor-pointer ${isSelected ? "bg-accent/10" : "opacity-50"}`}
                            onClick={() => { if (breakdown) setExpandedBreakdown(isExpanded ? null : agent.id); }}>
                            <div className="flex items-center gap-2">
                              <span className="text-[11px]">{agent.emoji}</span>
                              <span className={`font-mono text-[10px] font-semibold ${isSelected ? "text-foreground" : "text-muted-foreground"}`}>{agent.fullName.toUpperCase()}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              {breakdown && <span className="font-mono text-[8px] text-accent px-1 border border-accent/30">DATA</span>}
                              <span className={`w-[6px] h-[6px] rounded-full ${agent.status !== "idle" ? "bg-status-active" : "bg-muted-foreground"}`} />
                            </div>
                          </div>
                          {isExpanded && breakdown && (
                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} className="pb-2 px-1 overflow-hidden">
                              <p className="text-[10px] leading-relaxed text-foreground/80 mb-2">{breakdown.summary}</p>
                              {breakdown.keyData.map((d, i) => (
                                <div key={i} className="flex justify-between py-[2px] text-[9px]">
                                  <span className="text-muted-foreground">{d.label}</span>
                                  <span className="font-mono text-accent">{d.value}</span>
                                </div>
                              ))}
                            </motion.div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* WATCHLIST TAB — Watchlist + All Markets + Alerts */}
            {mobileTab === "watchlist" && (
              <div className="flex-1 flex flex-col overflow-hidden">
                <div className="px-3 py-1.5 border-b border-border flex items-center justify-between shrink-0">
                  <span className="text-[10px] font-mono font-semibold tracking-[1px] text-status-active">WATCHLIST</span>
                  <Settings size={11} className="text-muted-foreground cursor-pointer hover:text-foreground" onClick={() => toast({ title: "⚙️ Settings", description: "Watchlist settings coming soon!" })} />
                </div>
                <div className="shrink-0 flex items-center px-3 py-[3px] border-b border-border text-[8px] font-mono text-muted-foreground tracking-wider">
                  <span className="flex-1">Ticker</span>
                  <span className="w-14 text-right">% 1D</span>
                  <span className="w-16 text-right">Price</span>
                </div>
                <div className="flex-1 overflow-y-auto">
                  {sharedWatchlist.map((item, idx) => {
                    const marketItem = allMarkets.find((m) => m.ticker === item.ticker);
                    const isActive = marketItem?.active ?? false;
                    return (
                      <div key={item.ticker} onClick={() => setSelectedTickerIndex(idx)} className={`flex items-center px-3 py-[6px] border-b border-border/30 cursor-pointer transition-colors ${idx === selectedTickerIndex ? "bg-accent/10" : "hover:bg-card/50"}`}>
                        <div className="flex items-center gap-1.5 flex-1">
                          <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${isActive ? "bg-status-active" : "bg-muted-foreground/30"}`} />
                          <span className="font-mono text-[11px] font-semibold text-accent">{item.ticker}</span>
                        </div>
                        <span className={`w-14 text-right font-mono text-[10px] font-semibold ${item.change > 0 ? "text-status-active" : "text-status-hot"}`}>
                          {item.change > 0 ? "+" : ""}{item.change.toFixed(2)}%
                        </span>
                        <span className="w-16 text-right font-mono text-[10px] text-foreground/70">{item.price}</span>
                      </div>
                    );
                  })}

                  {/* ALL MARKETS */}
                  <div className="px-3 py-1.5 border-t border-border bg-card/50 flex items-center justify-between">
                    <span className="text-[8px] font-mono font-semibold text-muted-foreground tracking-wider">ALL MARKETS</span>
                    <span className="text-[8px] font-mono text-muted-foreground">{allMarkets.length}</span>
                  </div>
                  {allMarkets.filter((m) => !sharedWatchlist.some((w) => w.ticker === m.ticker)).map((item) => (
                    <div key={item.ticker} className="flex items-center px-3 py-[5px] border-b border-border/30 cursor-pointer hover:bg-card/50 transition-colors">
                      <div className="flex items-center gap-1.5 flex-1">
                        <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${item.active ? "bg-status-active animate-pulse" : "bg-muted-foreground/30"}`} />
                        <span className="font-mono text-[10px] font-semibold text-foreground/60">{item.ticker}</span>
                      </div>
                      <span className={`w-14 text-right font-mono text-[9px] ${item.change > 0 ? "text-status-active" : "text-status-hot"}`}>
                        {item.change > 0 ? "+" : ""}{item.change.toFixed(2)}%
                      </span>
                      <span className="w-16 text-right">
                        {item.active ? (
                          <span className="text-[7px] font-mono font-bold px-1 py-[1px] bg-status-active/20 text-status-active border border-status-active/30">LIVE</span>
                        ) : (
                          <span className="text-[8px] font-mono text-muted-foreground/50">{item.price}</span>
                        )}
                      </span>
                    </div>
                  ))}

                  {/* Alerts inline */}
                  <div className="px-3 py-1.5 border-t border-border bg-card/50 flex items-center gap-1.5">
                    <Bell size={10} className="text-[hsl(45_90%_55%)]" />
                    <span className="text-[9px] font-mono font-semibold tracking-[1px] text-[hsl(45_90%_55%)]">ALERTS</span>
                  </div>
                  {filteredAlerts.slice(0, 10).map((alert) => (
                    <div key={alert.id} className="px-3 py-[5px] border-b border-border/50">
                      <div className="flex items-center gap-1.5 mb-[1px]">
                        <span className="text-[9px] font-mono text-accent">{alert.exchange}</span>
                        <span className="text-[7px] font-mono text-muted-foreground uppercase">{alert.type}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className={`w-1.5 h-1.5 rounded-full ${alert.side === "BUY" ? "bg-status-active" : "bg-status-hot"}`} />
                        <span className="font-mono text-[10px] text-foreground/90">{alert.pair} {alert.side} {alert.amount}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* COMMUNITY TAB */}
            {mobileTab === "community" && (
              <div className="flex-1 flex flex-col overflow-hidden">
                <div className="shrink-0 flex items-center gap-[2px] px-2 py-1.5 border-b border-border">
                  {["GENERAL", "BTC", "ETH", "SOL"].map((ch, i) => (
                    <button key={ch} className={`text-[9px] font-mono px-2 py-[2px] transition-colors ${i === 0 ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground"}`}>
                      {ch}
                    </button>
                  ))}
                  <span className="ml-auto text-[8px] font-mono text-muted-foreground flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-status-active animate-pulse" />142
                  </span>
                </div>

                {/* PREDICTION BETS - Mobile */}
                <div className="shrink-0 border-b border-border px-2.5 py-2">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[9px] font-mono font-semibold tracking-[1px] text-[hsl(45_90%_55%)]">PREDICTION BETS</span>
                    <span className="text-[7px] font-mono text-muted-foreground">🔒 $CLAWHOO</span>
                  </div>
                  {predictions.map((pred, i) => (
                    <div key={pred.id} className={`border border-border bg-card/50 p-2 ${i < predictions.length - 1 ? "mb-1.5" : ""}`}>
                      <p className="text-[10px] font-mono font-semibold text-foreground mb-2">{pred.question}</p>
                      <div className="h-1 bg-border overflow-hidden mb-1.5 flex">
                        <div className="h-full bg-status-active transition-all duration-500" style={{ width: `${pred.yesPercent}%` }} />
                        <div className="h-full bg-status-hot transition-all duration-500" style={{ width: `${100 - pred.yesPercent}%` }} />
                      </div>
                      <div className="flex gap-1.5 mb-1.5">
                        <button
                          onClick={() => handleVote(pred.id, "yes")}
                          className={`flex-1 py-1.5 border text-[10px] font-mono font-bold transition-colors ${
                            pred.myVote === "yes"
                              ? "border-status-active bg-status-active/30 text-status-active ring-1 ring-status-active/50"
                              : "border-status-active/50 bg-status-active/10 text-status-active hover:bg-status-active/20"
                          }`}
                        >YES ({pred.yesPercent}%)</button>
                        <button
                          onClick={() => handleVote(pred.id, "no")}
                          className={`flex-1 py-1.5 border text-[10px] font-mono font-bold transition-colors ${
                            pred.myVote === "no"
                              ? "border-status-hot bg-status-hot/30 text-status-hot ring-1 ring-status-hot/50"
                              : "border-status-hot/50 bg-status-hot/10 text-status-hot hover:bg-status-hot/20"
                          }`}
                        >NO ({100 - pred.yesPercent}%)</button>
                      </div>
                      <div className="flex items-center justify-between text-[8px] font-mono text-muted-foreground">
                        <span>Pool: <span className="text-accent font-semibold">{pred.pool.toLocaleString()} CLAW</span></span>
                        <span>Closes in <span className="text-foreground font-semibold">{pred.closes}</span></span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex-1 overflow-y-auto px-2.5 py-2 space-y-1.5" ref={communityScrollRef}>
                  {communityMessages.map((msg) => (
                    <div key={msg.id} className={`${msg.user === "You" ? "bg-accent/10 border border-accent/20" : "hover:bg-card/50"} px-2 py-1.5 transition-colors`}>
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <span className="text-[10px]">{msg.avatar}</span>
                        <span className={`font-mono text-[9px] font-semibold ${msg.user === "You" ? "text-accent" : "text-foreground"}`}>{msg.user}</span>
                        {msg.badge && <span className="text-[7px] font-mono font-bold px-1 py-[1px] bg-accent/20 text-accent border border-accent/30">{msg.badge}</span>}
                        <span className="text-[8px] font-mono text-muted-foreground ml-auto">{msg.time}</span>
                      </div>
                      <p className="text-[10px] leading-snug text-foreground/80">{msg.text}</p>
                    </div>
                  ))}
                </div>
                <div className="shrink-0 border-t border-border p-2">
                  <form onSubmit={(e) => { e.preventDefault(); handleSendCommunityMsg(); }} className="flex items-center gap-2 border border-border bg-card px-2.5 py-2">
                    <input type="text" value={communityInput} onChange={(e) => setCommunityInput(e.target.value)} placeholder="Message..." className="bg-transparent text-[10px] font-mono outline-none flex-1 min-w-0 placeholder:text-muted-foreground/40" />
                    <button type="submit" className="text-accent hover:text-foreground transition-colors"><Send size={12} /></button>
                  </form>
                </div>
              </div>
            )}
          </div>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>

          {/* Mobile bottom tabs */}
          <div className="shrink-0 border-t border-border bg-background flex">
            {([
              { id: "chat" as const, icon: MessageSquare, label: "AiChat" },
              { id: "community" as const, icon: Users, label: "Community" },
              { id: "market" as const, icon: Activity, label: "Market" },
              { id: "watchlist" as const, icon: List, label: "Watch" },
            ]).map((tab) => (
              <button
                key={tab.id}
                onClick={() => setMobileTab(tab.id)}
                className={`flex-1 flex flex-col items-center gap-0.5 py-2 transition-colors ${mobileTab === tab.id ? "text-accent" : "text-muted-foreground"}`}
              >
                <tab.icon size={15} />
                <span className="text-[7px] font-mono tracking-wider">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      ) : (
      /* === DESKTOP LAYOUT === */
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 flex overflow-hidden">
          {/* Watchlist toggle button */}
          {watchlistCollapsed && (
            <div className="shrink-0 border-r border-border flex flex-col items-center pt-2">
              <button onClick={() => setWatchlistCollapsed(false)} className="p-1.5 hover:bg-card/50 transition-colors" title="Show Watchlist">
                <PanelLeftOpen size={14} className="text-muted-foreground hover:text-foreground" />
              </button>
            </div>
          )}

        <ResizablePanelGroup direction="horizontal" className="flex-1">
          {/* LEFT: Watchlist */}
          {!watchlistCollapsed && (
            <>
            <ResizablePanel defaultSize={18} minSize={12} maxSize={28}>
              <ResizablePanelGroup direction="vertical">
                {/* Watchlist */}
                <ResizablePanel defaultSize={45} minSize={15}>
                  <div className="h-full flex flex-col overflow-hidden">
                    <div className="p-2 border-b border-border flex items-center justify-between shrink-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-mono font-semibold tracking-[1px] text-status-active">WATCHLIST</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Settings size={11} className="text-muted-foreground cursor-pointer hover:text-foreground transition-colors" onClick={() => toast({ title: "⚙️ Settings", description: "Watchlist settings coming soon!" })} />
                        <button onClick={() => setWatchlistCollapsed(true)} className="hover:bg-card/50 p-0.5 transition-colors" title="Hide Watchlist">
                          <PanelLeftClose size={11} className="text-muted-foreground hover:text-foreground" />
                        </button>
                      </div>
                    </div>

                    <div className="shrink-0 px-2 py-0.5 border-b border-border">
                      <div className="flex items-center gap-1.5 border border-border bg-card px-2 py-[2px]">
                        <Search size={9} className="text-muted-foreground" />
                        <input type="text" placeholder="search ..." className="bg-transparent text-[10px] font-mono outline-none flex-1 min-w-0 placeholder:text-muted-foreground/50" />
                      </div>
                    </div>

                    <div className="shrink-0 flex items-center px-2.5 py-[2px] border-b border-border text-[8px] font-mono text-muted-foreground tracking-wider">
                      <span className="flex-1">Ticker</span>
                      <span className="w-12 text-right">% 1D</span>
                      <span className="w-14 text-right">Price</span>
                    </div>

                    <div className="flex-1 overflow-y-auto">
                      {sharedWatchlist.map((item, idx) => {
                        const marketItem = allMarkets.find((m) => m.ticker === item.ticker);
                        const isActive = marketItem?.active ?? false;
                        return (
                          <div key={item.ticker} onClick={() => setSelectedTickerIndex(idx)} className={`flex items-center px-2.5 py-[5px] cursor-pointer transition-colors border-b border-border/30 ${idx === selectedTickerIndex ? "bg-accent/10" : "hover:bg-card/50"}`}>
                            <div className="flex items-center gap-1.5 flex-1">
                              <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${isActive ? "bg-status-active" : "bg-muted-foreground/30"}`} />
                              <span className="font-mono text-[10px] font-semibold text-accent">{item.ticker}</span>
                            </div>
                            <span className={`w-12 text-right font-mono text-[10px] font-semibold ${item.change > 0 ? "text-status-active" : "text-status-hot"}`}>
                              {item.change > 0 ? "+" : ""}{item.change.toFixed(2)}%
                            </span>
                            <span className="w-14 text-right font-mono text-[10px] text-foreground/70">{item.price}</span>
                          </div>
                        );
                      })}
                    </div>

                    <div className="border-t border-border p-1 shrink-0">
                      <button onClick={() => toast({ title: "➕ Add Ticker", description: "Custom ticker tracking coming soon!" })} className="flex items-center gap-1 text-[10px] font-mono text-muted-foreground hover:text-foreground transition-colors w-full px-2 py-0.5">
                        <Plus size={9} /><span>Add Ticker</span>
                      </button>
                    </div>
                  </div>
                </ResizablePanel>

                <ResizableHandle />

                {/* ALL MARKETS */}
                <ResizablePanel defaultSize={30} minSize={15}>
                  <div className="h-full flex flex-col overflow-hidden">
                    <div className="p-2 border-b border-border flex items-center justify-between shrink-0">
                      <span className="text-[10px] font-mono font-semibold tracking-[1px] text-muted-foreground">ALL MARKETS</span>
                      <span className="text-[8px] font-mono text-muted-foreground">{allMarkets.length}</span>
                    </div>
                    <div className="shrink-0 flex items-center px-2.5 py-[2px] border-b border-border text-[8px] font-mono text-muted-foreground tracking-wider">
                      <span className="flex-1">Ticker</span>
                      <span className="w-12 text-right">%</span>
                      <span className="w-10 text-right">Status</span>
                    </div>
                    <div className="flex-1 overflow-y-auto">
                      {allMarkets.map((item) => {
                        const isInWatchlist = sharedWatchlist.some((w) => w.ticker === item.ticker);
                        return (
                          <div key={item.ticker} className={`flex items-center px-2.5 py-[4px] cursor-pointer transition-colors border-b border-border/30 hover:bg-card/50 ${isInWatchlist ? "bg-accent/5" : ""}`}>
                            <div className="flex items-center gap-1.5 flex-1">
                              <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${item.active ? "bg-status-active animate-pulse" : "bg-muted-foreground/30"}`} />
                              <span className={`font-mono text-[10px] font-semibold ${isInWatchlist ? "text-accent" : "text-foreground/60"}`}>{item.ticker}</span>
                            </div>
                            <span className={`w-12 text-right font-mono text-[9px] ${item.change > 0 ? "text-status-active" : "text-status-hot"}`}>
                              {item.change > 0 ? "+" : ""}{item.change.toFixed(1)}%
                            </span>
                            <span className="w-10 text-right">
                              {item.active ? (
                                <span className="text-[7px] font-mono font-bold px-1 py-[1px] bg-status-active/20 text-status-active border border-status-active/30">LIVE</span>
                              ) : (
                                <span className="text-[7px] font-mono text-muted-foreground/50">—</span>
                              )}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </ResizablePanel>

                <ResizableHandle />

                {/* Headlines */}
                <ResizablePanel defaultSize={15} minSize={10}>
                  <div className="h-full flex flex-col overflow-hidden">
                    <div className="p-2 border-b border-border flex items-center justify-between shrink-0">
                      <span className="font-mono text-[9px] tracking-wider text-muted-foreground font-semibold">HEADLINES</span>
                    </div>
                    <div className="flex-1 overflow-y-auto px-2 py-1 space-y-[3px]">
                      {agents.flatMap((a) => a.headlines.map((h) => ({ ...h, agentEmoji: a.emoji, agentColor: a.color }))).slice(0, 8).map((h, i) => (
                        <div key={i} className="flex gap-1.5 group cursor-pointer">
                          <span className="text-[8px] font-mono text-muted-foreground shrink-0 w-7">{h.time}</span>
                          <p className={`text-[9px] leading-tight group-hover:underline line-clamp-1 ${h.sentiment === "bull" ? "text-status-active font-medium" : (h.sentiment as string) === "bear" ? "text-status-hot font-medium" : "text-foreground/60"}`}>{h.text}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </ResizablePanel>

                <ResizableHandle />

                {/* Alerts */}
                <ResizablePanel defaultSize={30} minSize={12}>
                  <div className="h-full flex flex-col overflow-hidden">
                    <div className="p-2 border-b border-border flex items-center justify-between shrink-0">
                      <div className="flex items-center gap-1.5">
                        <Bell size={11} className="text-[hsl(45_90%_55%)]" />
                        <span className="text-[10px] font-mono font-semibold tracking-[1px] text-[hsl(45_90%_55%)]">ALERTS</span>
                      </div>
                      <div className="flex gap-[1px]">
                        {(["all", "mine"] as const).map((f) => (
                          <button key={f} onClick={() => setAlertFilter(f)} className={`font-mono text-[9px] px-[6px] py-[2px] transition-colors ${alertFilter === f ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground"}`}>
                            {f === "all" ? "ALL" : "MINE"}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="flex-1 overflow-y-auto" ref={alertScrollRef}>
                      <AnimatePresence initial={false}>
                        {filteredAlerts.map((alert) => (
                          <motion.div key={alert.id} initial={{ opacity: 0, height: 0, x: -20 }} animate={{ opacity: 1, height: "auto", x: 0 }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3, ease: "easeOut" }} className="overflow-hidden">
                            <div className="px-2.5 py-[5px] border-b border-border/50 hover:bg-card/50 cursor-pointer transition-colors">
                              <div className="flex items-center gap-1.5 mb-[1px]">
                                <span className="text-[10px] font-mono text-accent">{alert.exchange}</span>
                                <span className="text-[8px] font-mono text-muted-foreground uppercase">{alert.type}</span>
                              </div>
                              <div className="flex items-center gap-1.5">
                                <span className={`w-1.5 h-1.5 rounded-full ${alert.side === "BUY" ? "bg-status-active" : "bg-status-hot"}`} />
                                <span className="font-mono text-[10px] text-foreground/90">{alert.pair} {alert.side} {alert.amount} @ {alert.price}</span>
                              </div>
                              <div className="flex items-center justify-end mt-[1px]">
                                <span className="text-[8px] font-mono text-muted-foreground">{alert.time}</span>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>
                    <div className="border-t border-border p-1 shrink-0">
                      <button onClick={() => toast({ title: "🔔 Add Alert", description: "Custom alert creation coming soon!" })} className="flex items-center gap-1 text-[10px] font-mono text-muted-foreground hover:text-foreground transition-colors w-full px-2 py-0.5">
                        <Plus size={9} /><span>Add Alert</span>
                      </button>
                    </div>
                  </div>
                </ResizablePanel>
              </ResizablePanelGroup>
            </ResizablePanel>

            <ResizableHandle withHandle />
            </>
          )}

          {/* MAIN AREA: Vertical split — Chart top, Terminal+Info bottom */}
          <ResizablePanel defaultSize={watchlistCollapsed ? 100 : 82}>
            <ResizablePanelGroup direction="vertical">
              {/* TOP: Chart spanning full width */}
              <ResizablePanel defaultSize={45} minSize={20} maxSize={70}>
                <div className="h-full flex flex-col overflow-hidden border-b border-border">
                  <div className="px-3 pt-2 pb-1 flex items-center justify-between shrink-0">
                     <div className="flex items-center gap-2">
                      <span className="text-xs font-mono tracking-wider text-accent">MARKET LIVE</span>
                      <span className="font-bold text-sm text-accent ml-2">{selectedTicker?.ticker}</span>
                      <span className="text-[11px] font-mono text-muted-foreground">{selectedTicker?.name}</span>
                      <span className={`text-[11px] font-mono font-semibold ${selectedTicker.change > 0 ? "text-status-active" : "text-status-hot"}`}>
                        {selectedTicker.change > 0 ? "+" : ""}{selectedTicker.change}%
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      {timeframes.map((tf) => (
                        <button key={tf} onClick={() => setSelectedTimeframe(tf)} className={`font-mono text-[10px] px-2 py-[2px] transition-colors ${selectedTimeframe === tf ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground"}`}>
                          {tf}
                        </button>
                      ))}
                      <ExternalLink size={12} className="text-muted-foreground ml-1 cursor-pointer hover:text-foreground" onClick={() => toast({ title: "📊 Full Chart", description: "Opening full chart view..." })} />
                    </div>
                  </div>
                  <div className="flex-1 min-h-0">
                    <TradingViewChart symbol={selectedTicker?.ticker || "BTC"} fillHeight />
                  </div>
                </div>
              </ResizablePanel>

              <ResizableHandle withHandle />

              {/* BOTTOM: Terminal + Right info side by side */}
              <ResizablePanel defaultSize={55} minSize={30}>
                <ResizablePanelGroup direction="horizontal">
                  {/* Terminal */}
                  <ResizablePanel defaultSize={58} minSize={30}>
                    <div className="h-full flex flex-col overflow-hidden">
                      <div className="px-4 py-1.5 border-b border-border shrink-0 flex items-center justify-between">
                        <p className="text-[11px] font-mono text-muted-foreground whitespace-nowrap">Terminal — 5 agents</p>
                        <div className="flex gap-3 text-[10px] font-mono shrink-0">
                          {[
                            { label: "Q", value: "127" },
                            { label: "A", value: "34" },
                            { label: "⚡", value: "12" },
                          ].map((stat) => (
                            <span key={stat.label} className="text-muted-foreground">{stat.label} <span className="text-foreground font-bold">{stat.value}</span></span>
                          ))}
                        </div>
                      </div>

                      <div className="flex-1 overflow-y-auto px-4 py-2" ref={chatScrollRef}>
                        {chatMessages.length === 0 && (
                          <div className="flex flex-col items-center justify-center h-full text-center opacity-50">
                            <span className="text-2xl mb-1">⊞</span>
                            <p className="text-xs font-mono text-muted-foreground mb-0.5">Terminal Ready</p>
                            <p className="text-[10px] font-mono text-muted-foreground/50">Enter a query to start</p>
                          </div>
                        )}
                        <AnimatePresence>
                          {chatMessages.map((msg) => (
                            <motion.div key={msg.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="mb-4">
                              {msg.type === "user" ? (
                                <div className="flex justify-end">
                                  <div className="bg-accent/15 border border-accent/30 px-4 py-2.5 max-w-[80%]">
                                    <div className="flex items-center gap-2 mb-1">
                                      <span className="text-[11px] font-mono text-accent font-semibold">YOU</span>
                                      <span className="text-[10px] font-mono text-muted-foreground">{msg.time}</span>
                                    </div>
                                    <p className="text-sm leading-relaxed">{msg.content}</p>
                                  </div>
                                </div>
                              ) : (
                                <div className="border border-border/50 bg-card/30 p-4">
                                  <div className="flex items-center gap-2 mb-2">
                                    <span className="text-xs">⊞</span>
                                    <span className="text-[11px] font-mono font-semibold text-accent">STOCKCLAW ORCHESTRATOR</span>
                                    <span className="text-[11px] font-mono text-muted-foreground">{msg.time}</span>
                                  </div>
                                  {msg.isTyping ? (
                                    <div className="flex items-center gap-1.5 py-1">
                                      <motion.span className="w-1.5 h-1.5 rounded-full bg-accent" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 0.8, repeat: Infinity }} />
                                      <motion.span className="w-1.5 h-1.5 rounded-full bg-accent" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 0.8, repeat: Infinity, delay: 0.2 }} />
                                      <motion.span className="w-1.5 h-1.5 rounded-full bg-accent" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 0.8, repeat: Infinity, delay: 0.4 }} />
                                      <span className="text-[11px] font-mono text-muted-foreground ml-1">
                                        {selectedAgents.size === 1 ? `${agents.find(a => a.id === Array.from(selectedAgents)[0])?.name} analyzing...` : `orchestrating ${selectedAgents.size} agents...`}
                                      </span>
                                    </div>
                                  ) : (
                                    <>
                                      <motion.p className="text-sm leading-relaxed text-foreground/90 mb-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                        {msg.content}
                                      </motion.p>
                                      {msg.signal && (
                                        <motion.div className="flex items-center gap-3 pt-2 border-t border-border/30" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                                          <span className={`font-mono text-xs font-bold ${msg.signal?.includes("LONG") ? "text-status-active" : "text-status-hot"}`}>{msg.signal}</span>
                                          <span className="font-mono text-xs font-bold">{msg.confidence}%</span>
                                          <div className="flex-1 h-1 bg-border overflow-hidden">
                                            <motion.div className="h-full bg-[hsl(45_90%_55%)]" initial={{ width: 0 }} animate={{ width: `${msg.confidence}%` }} transition={{ duration: 0.8, delay: 0.3 }} />
                                          </div>
                                          <button
                                            onClick={() => {
                                              const asset = msg.content.match(/BTC|ETH|SOL/)?.[0] || "BTC";
                                              setSwapSignal({ asset, direction: msg.signal || "LONG" });
                                              if (msg.signal?.includes("LONG")) { setSwapFrom("USDT"); setSwapTo(asset); }
                                              else { setSwapFrom(asset); setSwapTo("USDT"); }
                                              setSwapAmount("");
                                              setSwapModalOpen(true);
                                            }}
                                            className={`font-mono text-[11px] font-bold px-3 py-1.5 border ${
                                              msg.signal?.includes("LONG")
                                                ? "border-status-active text-status-active bg-status-active/10"
                                                : "border-status-hot text-status-hot bg-status-hot/10"
                                            }`}
                                          >
                                            {msg.signal?.includes("LONG") ? "▲ BUY" : "▼ SELL"}
                                          </button>
                                        </motion.div>
                                      )}
                                    </>
                                  )}
                                </div>
                              )}
                            </motion.div>
                          ))}
                        </AnimatePresence>
                      </div>

                       {/* Prompt */}
                       <div className="px-4 py-2 border-t border-border shrink-0">
                         <div className="flex items-center justify-between mb-1.5 px-1">
                           {isPro ? (
                             <span className="text-[11px] font-mono text-status-active flex items-center gap-1">
                               <Zap size={10} /> UNLIMITED
                             </span>
                           ) : (
                             <span className={`text-[11px] font-mono flex items-center gap-1 ${remaining <= 2 ? "text-status-hot" : "text-muted-foreground"}`}>
                               <MessageSquare size={10} /> {remaining}/{maxFreeChats} FREE QUERIES
                             </span>
                           )}
                           {!isPro && remaining <= 2 && (
                             <button onClick={() => navigate("/#pricing")} className="text-[10px] font-mono text-accent hover:underline">
                               UPGRADE →
                             </button>
                           )}
                         </div>
                         <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}>
                           <div className="flex items-center gap-2 border border-border bg-card px-3 py-2.5">
                             <span className="text-accent font-mono text-base">&gt;</span>
                             <div className="flex items-center gap-1 shrink-0 border-r border-border/50 pr-2 mr-1">
                               <LineChart size={12} className="text-accent" />
                               <span className="text-[10px] font-mono text-accent font-semibold">{selectedTicker?.ticker} {selectedTimeframe}</span>
                             </div>
                             <input type="text" value={chatInput} onChange={(e) => setChatInput(e.target.value)} placeholder={remaining <= 0 && !isPro ? "Upgrade to PRO for unlimited..." : "Ask your agents..."} className="bg-transparent text-sm font-mono outline-none flex-1 min-w-0 placeholder:text-muted-foreground/40" disabled={remaining <= 0 && !isPro} />
                             <button type="submit" className="transition-colors text-accent hover:text-foreground" disabled={remaining <= 0 && !isPro}>
                               {remaining <= 0 && !isPro ? <Lock size={14} /> : <Send size={14} />}
                             </button>
                           </div>
                           <div className="flex items-center gap-1.5 mt-1.5 px-1">
                             <div className="flex gap-[2px]">
                               {agents.map((a) => (
                                 <button key={a.id} type="button" onClick={() => toggleAgent(a.id)} className={`w-6 h-6 flex items-center justify-center text-xs transition-colors ${selectedAgents.has(a.id) ? "text-accent-foreground" : "text-muted-foreground/30"}`} style={selectedAgents.has(a.id) ? { backgroundColor: `hsl(${a.color})` } : undefined}>
                                   {a.emoji}
                                 </button>
                               ))}
                             </div>
                             <span className="text-[10px] font-mono text-muted-foreground">{selectedAgents.size}/{agents.length}</span>
                             <div className="w-px h-3 bg-border mx-1" />
                             {dataSources.map((source) => (
                               <button key={source} type="button" onClick={() => toggleSource(source)} className={`text-[9px] font-mono px-1.5 py-[1px] transition-colors ${selectedSources.has(source) ? "text-accent" : "text-muted-foreground/30 hover:text-muted-foreground/50"}`}>
                                 {selectedSources.has(source) && "✓"}{source}
                               </button>
                             ))}
                             <div className="flex-1" />
                             <span className="text-[9px] font-mono text-muted-foreground">/? for help</span>
                           </div>
                         </form>
                       </div>
                    </div>
                  </ResizablePanel>

                  <ResizableHandle withHandle />

                  {/* RIGHT: Agent Analysis + Unified Intelligence */}
                  <ResizablePanel defaultSize={42} minSize={20} maxSize={55}>
                    <ResizablePanelGroup direction="vertical">
                      {/* Agent Breakdowns */}
                      <ResizablePanel defaultSize={60} minSize={20}>
                        <div className="h-full overflow-y-auto border-l border-border px-2.5 py-2">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-mono text-[10px] font-bold tracking-[1px]">AGENT ANALYSIS</span>
                            <span className="font-mono text-[9px] text-muted-foreground">{selectedAgents.size}/{agents.length}</span>
                          </div>
                          {agents.map((agent) => {
                            const isSelected = selectedAgents.has(agent.id);
                            const breakdown = activeBreakdowns.find((b) => b.agentId === agent.id);
                            const isExpanded = expandedBreakdown === agent.id;
                            return (
                              <div key={agent.id} className="border-b border-border/50 last:border-0">
                                <div
                                  className={`flex items-center justify-between py-[5px] cursor-pointer transition-colors ${isSelected ? "" : "opacity-40"}`}
                                  onClick={() => { if (breakdown) setExpandedBreakdown(isExpanded ? null : agent.id); }}
                                >
                                  <div className="flex items-center gap-1.5">
                                    <button
                                      onClick={(e) => { e.stopPropagation(); toggleAgent(agent.id); }}
                                      className={`w-3.5 h-3.5 border flex items-center justify-center text-[8px] transition-colors ${isSelected ? "border-accent bg-accent/20 text-accent" : "border-muted-foreground/50"}`}
                                    >
                                      {isSelected && "✓"}
                                    </button>
                                    <span className="text-xs">{agent.emoji}</span>
                                    <span className={`font-mono text-[10px] font-semibold ${isSelected ? "text-foreground" : "text-muted-foreground"}`}>
                                      {agent.name}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-1.5">
                                    {breakdown && <span className="font-mono text-[8px] text-accent px-1 border border-accent/30">DATA</span>}
                                    <span className={`w-[6px] h-[6px] rounded-full ${agent.status !== "idle" ? "bg-status-active" : "bg-muted-foreground/40"}`} />
                                  </div>
                                </div>
                                {isExpanded && breakdown && (
                                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} className="pb-1.5 overflow-hidden">
                                    <p className="text-[11px] leading-snug text-foreground/80 mb-1.5">{breakdown.summary}</p>
                                    {breakdown.keyData.map((d, i) => (
                                      <div key={i} className="flex justify-between py-[2px] text-[10px]">
                                        <span className="text-muted-foreground">{d.label}</span>
                                        <span className="font-mono text-accent font-medium">{d.value}</span>
                                      </div>
                                    ))}
                                  </motion.div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </ResizablePanel>

                      <ResizableHandle />

                      {/* Unified Intelligence */}
                      <ResizablePanel defaultSize={40} minSize={15}>
                        <div className="h-full overflow-y-auto border-l border-border px-2.5 py-2 bg-[hsl(45_90%_55%/0.06)] border-t border-[hsl(45_90%_55%/0.15)]">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-mono text-[9px] text-muted-foreground tracking-[2px]">UNIFIED INTELLIGENCE</span>
                            <div className="flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-status-active animate-pulse" />
                              <span className="font-mono text-[10px] font-bold tracking-[1px]">LONG</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 mb-2">
                            <div className="relative w-[80px] h-[40px] shrink-0">
                              <svg viewBox="0 0 120 60" className="w-full h-full overflow-visible">
                                <path d="M 10 55 A 50 50 0 0 1 110 55" fill="none" stroke="hsl(var(--border))" strokeWidth="7" strokeLinecap="round" />
                                <path d="M 10 55 A 50 50 0 0 1 110 55" fill="none" stroke="hsl(45 90% 55%)" strokeWidth="7" strokeLinecap="round" strokeDasharray={`${Math.PI * 50 * 0.73} ${Math.PI * 50}`} />
                                {(() => {
                                  const angle = Math.PI - (73 / 100) * Math.PI;
                                  const nx = 60 + 36 * Math.cos(angle);
                                  const ny = 55 - 36 * Math.sin(angle);
                                  return <line x1="60" y1="55" x2={nx} y2={ny} stroke="hsl(45 90% 55%)" strokeWidth="2" strokeLinecap="round" />;
                                })()}
                                <circle cx="60" cy="55" r="3" fill="hsl(45 90% 55%)" />
                              </svg>
                              <div className="absolute bottom-[-2px] left-1/2 -translate-x-1/2">
                                <span className="font-mono text-[18px] font-black">73</span>
                              </div>
                            </div>
                            <div className="flex-1 space-y-[4px]">
                              {[
                                { emoji: "📐", name: "CHART", score: 88, color: "268 35% 72%" },
                                { emoji: "⛓", name: "CHAIN", score: 65, color: "142 70% 45%" },
                                { emoji: "📡", name: "DERIV", score: 78, color: "0 84% 60%" },
                                { emoji: "💬", name: "SOCIAL", score: 72, color: "280 60% 65%" },
                              ].map((a) => (
                                <div key={a.name} className="flex items-center gap-1">
                                  <span className="font-mono text-[8px] w-8 text-muted-foreground">{a.name}</span>
                                  <div className="flex-1 h-[4px] bg-border overflow-hidden">
                                    <div className="h-full" style={{ width: `${a.score}%`, backgroundColor: `hsl(${a.color})` }} />
                                  </div>
                                  <span className="font-mono text-[9px] w-5 text-right font-medium">{a.score}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="flex items-center justify-between pt-1.5 border-t border-[hsl(45_90%_55%/0.12)]">
                            <span className="text-[9px] font-mono text-muted-foreground">COMPOSITE <span className="text-foreground font-bold">73</span></span>
                            <span className="text-[9px] font-mono text-status-active font-bold">BULLISH</span>
                          </div>
                        </div>
                      </ResizablePanel>
                    </ResizablePanelGroup>
                  </ResizablePanel>
                </ResizablePanelGroup>
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
        </ResizablePanelGroup>

          {/* Community toggle button (when collapsed) */}
          {communityCollapsed && (
            <div className="shrink-0 border-l border-border flex flex-col items-center pt-2">
              <button onClick={() => setCommunityCollapsed(false)} className="p-1.5 hover:bg-card/50 transition-colors" title="Show Community">
                <PanelRightOpen size={14} className="text-muted-foreground hover:text-foreground" />
              </button>
              <Users size={12} className="text-muted-foreground mt-2" />
            </div>
          )}

          {/* Community Sidebar */}
          {!communityCollapsed && (
            <div className="shrink-0 w-[280px] border-l border-border flex flex-col overflow-hidden bg-background">
              <div className="p-2 border-b border-border flex items-center justify-between shrink-0">
                <div className="flex items-center gap-1.5">
                  <Users size={11} className="text-accent" />
                  <span className="text-[10px] font-mono font-semibold tracking-[1px] text-accent">COMMUNITY</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-status-active animate-pulse" />
                  <span className="text-[8px] font-mono text-muted-foreground">142 online</span>
                </div>
                <button onClick={() => setCommunityCollapsed(true)} className="hover:bg-card/50 p-0.5 transition-colors" title="Hide Community">
                  <PanelRightClose size={11} className="text-muted-foreground hover:text-foreground" />
                </button>
              </div>

              {/* Channel selector */}
              <div className="shrink-0 flex items-center gap-[2px] px-2 py-1 border-b border-border">
                {["GENERAL", "BTC", "ETH", "SOL"].map((ch, i) => (
                  <button key={ch} className={`text-[8px] font-mono px-1.5 py-[2px] transition-colors ${i === 0 ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground"}`}>
                    {ch}
                  </button>
                ))}
              </div>

              <ResizablePanelGroup direction="vertical" className="flex-1">
                {/* PREDICTION BETS */}
                <ResizablePanel defaultSize={45} minSize={20}>
                  <div className="h-full overflow-y-auto px-2 py-2">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[9px] font-mono font-semibold tracking-[1px] text-[hsl(45_90%_55%)]">PREDICTION BETS</span>
                      <span className="text-[7px] font-mono text-muted-foreground">🔒 $CLAWHOO</span>
                    </div>
                    <p className="text-[8px] font-mono text-muted-foreground/70 mb-2">Bet on agent performance predictions. Hold $CLAWHOO to unlock.</p>
                    {predictions.map((pred, i) => (
                      <div key={pred.id} className={`border border-border bg-card/50 p-2 ${i < predictions.length - 1 ? "mb-1.5" : ""}`}>
                        {i === 0 && <span className="text-[7px] font-mono text-muted-foreground tracking-wider">NEXT PREDICTION</span>}
                        <p className="text-[10px] font-mono font-semibold text-foreground mb-2">{pred.question}</p>
                        {/* Progress bar */}
                        <div className="h-1 bg-border overflow-hidden mb-1.5 flex">
                          <div className="h-full bg-status-active transition-all duration-500" style={{ width: `${pred.yesPercent}%` }} />
                          <div className="h-full bg-status-hot transition-all duration-500" style={{ width: `${100 - pred.yesPercent}%` }} />
                        </div>
                        <div className="flex gap-1.5 mb-2">
                          <button
                            onClick={() => handleVote(pred.id, "yes")}
                            className={`flex-1 py-1.5 border text-[10px] font-mono font-bold transition-colors ${
                              pred.myVote === "yes"
                                ? "border-status-active bg-status-active/30 text-status-active ring-1 ring-status-active/50"
                                : "border-status-active/50 bg-status-active/10 text-status-active hover:bg-status-active/20"
                            }`}
                          >
                            YES ({pred.yesPercent}%)
                          </button>
                          <button
                            onClick={() => handleVote(pred.id, "no")}
                            className={`flex-1 py-1.5 border text-[10px] font-mono font-bold transition-colors ${
                              pred.myVote === "no"
                                ? "border-status-hot bg-status-hot/30 text-status-hot ring-1 ring-status-hot/50"
                                : "border-status-hot/50 bg-status-hot/10 text-status-hot hover:bg-status-hot/20"
                            }`}
                          >
                            NO ({100 - pred.yesPercent}%)
                          </button>
                        </div>
                        <div className="flex items-center justify-between text-[8px] font-mono text-muted-foreground">
                          <span>Pool: <span className="text-accent font-semibold">{pred.pool.toLocaleString()} CLAW</span></span>
                          <span>Closes in <span className="text-foreground font-semibold">{pred.closes}</span></span>
                        </div>
                      </div>
                    ))}
                  </div>
                </ResizablePanel>

                <ResizableHandle />

                {/* Messages */}
                <ResizablePanel defaultSize={55} minSize={20}>
                  <div className="h-full flex flex-col overflow-hidden">
                    <div className="flex-1 overflow-y-auto px-2 py-1.5 space-y-1.5" ref={communityScrollRef}>
                      {communityMessages.map((msg) => (
                        <div key={msg.id} className={`${msg.user === "You" ? "bg-accent/10 border border-accent/20" : "hover:bg-card/50"} px-2 py-1 transition-colors`}>
                          <div className="flex items-center gap-1.5 mb-0.5">
                            <span className="text-[10px]">{msg.avatar}</span>
                            <span className={`font-mono text-[9px] font-semibold ${msg.user === "You" ? "text-accent" : "text-foreground"}`}>{msg.user}</span>
                            {msg.badge && (
                              <span className="text-[7px] font-mono font-bold px-1 py-[1px] bg-accent/20 text-accent border border-accent/30">{msg.badge}</span>
                            )}
                            <span className="text-[7px] font-mono text-muted-foreground ml-auto">{msg.time}</span>
                          </div>
                          <p className="text-[10px] leading-snug text-foreground/80">{msg.text}</p>
                        </div>
                      ))}
                    </div>

                    {/* Input */}
                    <div className="shrink-0 border-t border-border p-1.5">
                      <form onSubmit={(e) => { e.preventDefault(); handleSendCommunityMsg(); }} className="flex items-center gap-2 border border-border bg-card px-2 py-1.5">
                        <input
                          type="text"
                          value={communityInput}
                          onChange={(e) => setCommunityInput(e.target.value)}
                          placeholder="Message..."
                          className="bg-transparent text-[10px] font-mono outline-none flex-1 min-w-0 placeholder:text-muted-foreground/40"
                        />
                        <button type="submit" className="text-accent hover:text-foreground transition-colors">
                          <Send size={11} />
                        </button>
                      </form>
                      <div className="flex items-center justify-between mt-0.5 px-1">
                        <span className="text-[7px] font-mono text-muted-foreground">#{selectedTicker?.ticker || "GENERAL"}</span>
                        <span className="text-[7px] font-mono text-muted-foreground">🔒 PRO: voice chat</span>
                      </div>
                    </div>
                  </div>
                </ResizablePanel>
              </ResizablePanelGroup>
            </div>
          )}
        </div>
      </div>
      )}

      {/* Swap Modal */}
      <AnimatePresence>
        {swapModalOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSwapModalOpen(false)}
          >
            <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
            <motion.div
              className="relative w-full max-w-sm border border-border bg-card shadow-2xl"
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-5">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <ArrowDownUp size={14} className="text-accent" />
                    <span className="font-mono text-[10px] font-bold tracking-[1px]">QUICK SWAP</span>
                  </div>
                  {swapSignal && (
                    <span className={`font-mono text-[9px] font-bold px-2 py-[2px] border ${
                      swapSignal.direction.includes("LONG")
                        ? "border-status-active text-status-active bg-status-active/10"
                        : "border-status-hot text-status-hot bg-status-hot/10"
                    }`}>
                      {swapSignal.direction} {swapSignal.asset}
                    </span>
                  )}
                  <button onClick={() => setSwapModalOpen(false)} className="text-muted-foreground hover:text-foreground">
                    <X size={14} />
                  </button>
                </div>

                {connected ? (
                  <div className="space-y-2">
                    <div className="border border-border p-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[8px] font-mono text-muted-foreground">FROM</span>
                        <span className="text-[8px] font-mono text-muted-foreground">Balance: {swapFrom === "ETH" ? "2.4521" : swapFrom === "USDT" ? "9,424.18" : "0.2451"}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <select value={swapFrom} onChange={(e) => setSwapFrom(e.target.value)} className="bg-secondary border border-border text-[10px] font-mono font-bold px-2 py-1 outline-none text-foreground">
                          <option value="ETH">ETH</option>
                          <option value="BTC">BTC</option>
                          <option value="SOL">SOL</option>
                          <option value="USDT">USDT</option>
                        </select>
                        <input type="text" value={swapAmount} onChange={(e) => setSwapAmount(e.target.value)} placeholder="0.00" className="flex-1 text-right bg-transparent text-sm font-mono outline-none placeholder:text-muted-foreground/30" />
                      </div>
                    </div>

                    <div className="flex justify-center">
                      <button onClick={() => { const tmp = swapFrom; setSwapFrom(swapTo); setSwapTo(tmp); }} className="w-7 h-7 border border-border bg-secondary flex items-center justify-center hover:border-accent/50 transition-colors">
                        <ArrowDownUp size={11} className="text-muted-foreground" />
                      </button>
                    </div>

                    <div className="border border-border p-3">
                      <span className="text-[8px] font-mono text-muted-foreground mb-1 block">TO</span>
                      <div className="flex items-center gap-2">
                        <select value={swapTo} onChange={(e) => setSwapTo(e.target.value)} className="bg-secondary border border-border text-[10px] font-mono font-bold px-2 py-1 outline-none text-foreground">
                          <option value="BTC">BTC</option>
                          <option value="ETH">ETH</option>
                          <option value="SOL">SOL</option>
                          <option value="USDT">USDT</option>
                        </select>
                        <span className="flex-1 text-right text-sm font-mono text-muted-foreground">
                          {swapAmount ? (parseFloat(swapAmount) * (swapFrom === "ETH" && swapTo === "BTC" ? 0.0377 : swapFrom === "USDT" && swapTo === "BTC" ? 0.0000098 : swapFrom === "USDT" && swapTo === "ETH" ? 0.00026 : swapFrom === "USDT" && swapTo === "SOL" ? 0.00402 : 1.2)).toFixed(6) : "0.00"}
                        </span>
                      </div>
                    </div>

                    {swapAmount && (
                      <div className="text-[8px] font-mono text-muted-foreground flex justify-between px-1">
                        <span>Rate: 1 {swapFrom} ≈ {swapFrom === "USDT" && swapTo === "BTC" ? "0.0000098" : swapFrom === "USDT" && swapTo === "ETH" ? "0.00026" : swapFrom === "ETH" && swapTo === "BTC" ? "0.0377" : "1.20"} {swapTo}</span>
                        <span>Gas: ~$2.40</span>
                      </div>
                    )}

                    <button
                      onClick={() => {
                        const toAmount = swapAmount ? (parseFloat(swapAmount) * (swapFrom === "ETH" && swapTo === "BTC" ? 0.0377 : swapFrom === "USDT" && swapTo === "BTC" ? 0.0000098 : swapFrom === "USDT" && swapTo === "ETH" ? 0.00026 : swapFrom === "USDT" && swapTo === "SOL" ? 0.00402 : 1.2)).toFixed(6) : "0";
                        addTrade({
                          type: "SWAP",
                          asset: swapFrom,
                          amount: swapAmount || "0",
                          price: `→ ${toAmount} ${swapTo}`,
                          toAsset: swapTo,
                          toAmount,
                          time: "Just now",
                          status: "filled",
                        });
                        toast({
                          title: "✅ Swap Executed",
                          description: `${swapAmount || "0"} ${swapFrom} → ${toAmount} ${swapTo}`,
                        });
                        setSwapModalOpen(false);
                        setSwapAmount("");
                      }}
                      className="w-full py-2.5 bg-[hsl(45_90%_55%/0.15)] border border-[hsl(45_90%_55%)] text-[hsl(45_90%_55%)] font-mono text-[10px] font-semibold tracking-[2px] uppercase cursor-pointer hover:bg-[hsl(45_90%_55%/0.25)] transition-colors"
                    >
                      EXECUTE SWAP
                    </button>
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <p className="text-[10px] font-mono text-muted-foreground mb-2">Connect your wallet to swap</p>
                    <button onClick={() => setSwapModalOpen(false)} className="text-[9px] font-mono text-accent hover:underline">Connect Wallet →</button>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>


      {/* Status Ticker Bar */}
      <div className="shrink-0 border-t border-border">
        <div className="bg-background text-muted-foreground py-0 overflow-hidden h-[24px] flex items-center">
          <div className="animate-ticker whitespace-nowrap flex">
            <span className="text-[10px] font-mono tracking-[1px] px-4">
              <span className="text-status-active">●</span> CONNECTED | 5 AGENTS | GAS: 14 GWEI | SOL_PRICE: $142.22 | BTC_DOMINANCE: 52.4% | TRADING_VOLUME_24H: $4.2B | LIQUIDATIONS_1H: $1.2M | SYSTEM_STABILITY: 99.98% | BLOCK_HEIGHT: 1982/... | LATENCY: 12ms | UPTIME: 99.98% | v2.4.1
            </span>
            <span className="text-[10px] font-mono tracking-[1px] px-4">
              <span className="text-status-active">●</span> CONNECTED | 5 AGENTS | GAS: 14 GWEI | SOL_PRICE: $142.22 | BTC_DOMINANCE: 52.4% | TRADING_VOLUME_24H: $4.2B | LIQUIDATIONS_1H: $1.2M | SYSTEM_STABILITY: 99.98% | BLOCK_HEIGHT: 1982/... | LATENCY: 12ms | UPTIME: 99.98% | v2.4.1
            </span>
          </div>
        </div>
      </div>

      {/* Upgrade Modal */}
      <AnimatePresence>
        {showUpgradeModal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowUpgradeModal(false)}
          >
            <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
            <motion.div
              className="relative w-full max-w-md border border-border bg-card shadow-2xl"
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-8 text-center">
                <div className="w-14 h-14 mx-auto mb-4 border border-accent/30 bg-accent/10 flex items-center justify-center">
                  <Lock size={24} className="text-accent" />
                </div>
                <h3 className="text-sm font-bold font-mono tracking-[2px] mb-2">FREE LIMIT REACHED</h3>
                <p className="text-xs text-muted-foreground font-mono mb-1">
                  You've used all {maxFreeChats} free agent queries.
                </p>
                <p className="text-[10px] text-muted-foreground/70 font-mono mb-6">
                  Upgrade to PRO for unlimited AI agent access, priority responses, and advanced analysis.
                </p>
                <div className="space-y-2">
                  <button
                    onClick={() => { setShowUpgradeModal(false); navigate("/#pricing"); }}
                    className="w-full py-3 bg-accent text-accent-foreground text-[10px] font-mono font-bold tracking-[2px] hover:bg-accent/90 transition-colors flex items-center justify-center gap-2"
                  >
                    <Zap size={12} /> UPGRADE TO PRO
                  </button>
                  <button
                    onClick={() => setShowUpgradeModal(false)}
                    className="w-full py-2.5 border border-border text-[10px] font-mono text-muted-foreground hover:text-foreground transition-colors"
                  >
                    MAYBE LATER
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Agents;
