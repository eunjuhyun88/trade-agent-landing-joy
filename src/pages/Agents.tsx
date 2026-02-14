import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  BarChart3, Link2, TrendingUp, MessageSquare, Clock, Bell,
  ExternalLink, Search, Send, Settings, Plus, ChevronDown,
} from "lucide-react";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import AppNav from "@/components/AppNav";
import TradingViewChart from "@/components/TradingViewChart";

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
    conclusion: "BTC는 현재 $101,890 저항대를 테스트 중이며, 기술적 패턴(하락 웨지), 온체인 축적 신호(-$492M 유출), 파생상품 숏 스퀴즈 가능성(OI +12%), 소셜 극단적 탐욕 지수를 종합할 때 **단기 상승 돌파 가능성이 높습니다.** 다만 $103K 청산 클러스터 돌파 여부가 핵심 변수입니다.",
    signal: "LONG",
    confidence: 73,
    agentBreakdowns: [
      { agentId: "chart", summary: "4H 하락 웨지 패턴 형성 중. RSI 다이버전스 + 0.618 피보나치 리트레이스먼트. 돌파 목표가 $108,500.", keyData: [{ label: "패턴", value: "Descending Wedge" }, { label: "RSI", value: "32.4 (과매도)" }, { label: "목표가", value: "$108,500" }] },
      { agentId: "chain", summary: "콜드 월렛 → 거래소 15,000 BTC 이동 감지. 순 유출 -$492M으로 축적 국면. 장기 보유자 공급량 ATH.", keyData: [{ label: "순유출", value: "-$492M" }, { label: "고래 활동", value: "HIGH" }, { label: "LTH 공급", value: "ATH" }] },
      { agentId: "deriv", summary: "OI 4시간 내 12% 급증, $38.2B 도달. 펀딩 레이트 0.0122% — 숏 스퀴즈 빌드업. $103K 청산 클러스터 주목.", keyData: [{ label: "OI", value: "$38.2B (+12%)" }, { label: "펀딩", value: "0.0122%" }, { label: "청산 클러스터", value: "$103K" }] },
      { agentId: "social", summary: "15+ 채널 극단적 탐욕. X 언급량 4.2K/min. 기관 채택 사이클 내러티브 지배적. 역발상 신호 임계치 접근.", keyData: [{ label: "감성", value: "EXTREME GREED" }, { label: "언급량", value: "4.2K/min" }, { label: "내러티브", value: "기관 채택" }] },
    ],
  },
  btc: {
    conclusion: "BTC 1H 상승 삼각형 + 주간 채굴자 유출 감소 + OI 급증을 종합하면, **$102,350 돌파 시 $108,500까지 상승 여력이 있습니다.** 거래소 보유량 3.2% 감소는 매도 압력 완화를 시사합니다.",
    signal: "LONG",
    confidence: 82,
    agentBreakdowns: [
      { agentId: "chart", summary: "1H 상승 삼각형 형성. 핵심 저항 $102,350, 피보나치 익스텐션 목표 $108,500. 볼륨 프로파일 고활성 구간 $99K-$101K.", keyData: [{ label: "패턴", value: "Ascending Triangle" }, { label: "저항", value: "$102,350" }, { label: "목표가", value: "$108,500" }] },
      { agentId: "chain", summary: "거래소 보유량 주간 3.2% 감소. 채굴자 유출 낮은 수준 — 캐피출레이션 없음. LTH 공급 ATH.", keyData: [{ label: "거래소 보유량", value: "-3.2%" }, { label: "채굴자 유출", value: "LOW" }, { label: "LTH", value: "ATH" }] },
    ],
  },
  eth: {
    conclusion: "ETH/BTC 0.032 지지선 테스트 + 비콘체인 40% 급증 + 옵션 시장 $4,500 콜 매수를 종합하면, **ETH 독립 상승 구간 진입 가능성이 높습니다.** 역사적 반등 확률 78%.",
    signal: "LONG",
    confidence: 75,
    agentBreakdowns: [
      { agentId: "chart", summary: "ETH/BTC 비율 0.032 핵심 지지 테스트. 역사적 반등 확률 78%. 일봉 컵앤핸들 형성 중.", keyData: [{ label: "ETH/BTC", value: "0.032 지지" }, { label: "반등 확률", value: "78%" }, { label: "패턴", value: "Cup & Handle" }] },
      { agentId: "chain", summary: "스테이킹 예치 24H 40% 급증. 32,000 ETH 비콘체인 유입. Gas 34 Gwei — 건강한 네트워크.", keyData: [{ label: "스테이킹", value: "+40%" }, { label: "유입", value: "32,000 ETH" }, { label: "Gas", value: "34 Gwei" }] },
      { agentId: "deriv", summary: "$105M 규모 $4,500 콜옵션 3월 만기 대량 매수 감지. 이례적 활동.", keyData: [{ label: "옵션", value: "$105M 콜" }, { label: "행사가", value: "$4,500" }, { label: "만기", value: "3월" }] },
    ],
  },
  sol: {
    conclusion: "SOL 주봉 컵앤핸들 완성 + DeFi TVL 18% 성장 + 소셜 언급량 89% 급증을 종합하면, **$285 측정 목표까지 상승 모멘텀이 강합니다.** $230 지지 유지가 전제 조건.",
    signal: "STRONG LONG",
    confidence: 85,
    agentBreakdowns: [
      { agentId: "chart", summary: "주봉 컵앤핸들 완성. 측정 이동 목표 $285. $230 지지에서 강한 볼륨 확인.", keyData: [{ label: "패턴", value: "Cup & Handle" }, { label: "목표가", value: "$285" }, { label: "지지", value: "$230" }] },
      { agentId: "chain", summary: "SOL DeFi TVL 주간 18% 증가. DEX 거래량 신기록. 온체인 활동 지표 올 그린.", keyData: [{ label: "TVL", value: "+18%" }, { label: "DEX", value: "신기록" }, { label: "온체인", value: "ALL GREEN" }] },
      { agentId: "social", summary: "SOL 극단적 강세 편향. 언급량 24시간 89% 급증. AI 에이전트 테마 토큰 열풍.", keyData: [{ label: "언급량", value: "+89%" }, { label: "편향", value: "극단적 강세" }, { label: "트렌드", value: "AI Agent" }] },
    ],
  },
};

const Agents = () => {
  const navigate = useNavigate();
  const [selectedAgents, setSelectedAgents] = useState<Set<string>>(new Set(agents.map((a) => a.id)));
  const [expandedAgent, setExpandedAgent] = useState<string | null>(null);
  const [alertFilter, setAlertFilter] = useState<"all" | "mine">("all");
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
  const selectedTicker = sharedWatchlist[0];
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

  const handleSendMessage = useCallback(() => {
    if (!chatInput.trim()) return;
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
              content: `**${agent.emoji} ${agent.name} 단독 분석:** ${agentBreakdown.summary}`,
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
  }, [chatInput, selectedAgents]);

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
      <AppNav />

      <div className="flex-1 flex flex-col overflow-hidden">
        <ResizablePanelGroup direction="horizontal" className="flex-1">
          {/* LEFT: Watchlist */}
          <ResizablePanel defaultSize={18} minSize={12} maxSize={28}>
            <div className="h-full flex flex-col overflow-hidden">
              <div className="p-2.5 border-b border-border flex items-center justify-between shrink-0">
                <span className="text-[9px] font-mono font-semibold tracking-[1px] text-status-active">WATCHLIST</span>
                <Settings size={12} className="text-muted-foreground cursor-pointer hover:text-foreground transition-colors" />
              </div>

              <div className="shrink-0 px-2 py-1 border-b border-border">
                <div className="flex items-center gap-1.5 border border-border bg-card px-2 py-[3px]">
                  <Search size={9} className="text-muted-foreground" />
                  <input type="text" placeholder="search ..." className="bg-transparent text-[9px] font-mono outline-none flex-1 min-w-0 placeholder:text-muted-foreground/50" />
                </div>
              </div>

              <div className="shrink-0 flex items-center px-3 py-[3px] border-b border-border text-[7px] font-mono text-muted-foreground tracking-wider">
                <span className="flex-1">Ticker</span>
                <span className="w-14 text-right">% 1D</span>
                <span className="w-16 text-right">Price</span>
              </div>

              <div className="flex-1 overflow-y-auto">
                <div className="px-3 py-[3px] border-b border-border bg-card/50">
                  <span className="text-[7px] font-mono font-semibold text-muted-foreground tracking-wider">CRYPTO</span>
                </div>
                {sharedWatchlist.map((item) => (
                  <div key={item.ticker} className={`flex items-center px-3 py-[5px] cursor-pointer transition-colors border-b border-border/30 ${item.ticker === selectedTicker?.ticker ? "bg-accent/10" : "hover:bg-card/50"}`}>
                    <span className="flex-1 font-mono text-[10px] font-semibold text-accent">{item.ticker}</span>
                    <span className={`w-14 text-right font-mono text-[9px] font-semibold ${item.change > 0 ? "text-status-active" : "text-status-hot"}`}>
                      {item.change > 0 ? "+" : ""}{item.change.toFixed(2)}%
                    </span>
                    <span className="w-16 text-right font-mono text-[9px] text-foreground/70">{item.price}</span>
                  </div>
                ))}

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
                  <Plus size={9} /><span>Add Ticker</span>
                </button>
              </div>

              {/* Alerts */}
              <div className="shrink-0 border-t border-border flex flex-col max-h-[45%] overflow-hidden">
                <div className="p-2.5 border-b border-border flex items-center justify-between shrink-0">
                  <div className="flex items-center gap-1.5">
                    <Bell size={10} className="text-[hsl(45_90%_55%)]" />
                    <span className="text-[9px] font-mono font-semibold tracking-[1px] text-[hsl(45_90%_55%)]">ALERTS</span>
                  </div>
                  <div className="flex gap-[1px]">
                    {(["all", "mine"] as const).map((f) => (
                      <button key={f} onClick={() => setAlertFilter(f)} className={`font-mono text-[8px] px-[7px] py-[2px] transition-colors ${alertFilter === f ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground"}`}>
                        {f === "all" ? "ALL" : "MINE"}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto" ref={alertScrollRef}>
                  <AnimatePresence initial={false}>
                    {filteredAlerts.map((alert) => (
                      <motion.div key={alert.id} initial={{ opacity: 0, height: 0, x: -20 }} animate={{ opacity: 1, height: "auto", x: 0 }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3, ease: "easeOut" }} className="overflow-hidden">
                        <div className="px-3 py-[6px] border-b border-border/50 hover:bg-card/50 cursor-pointer transition-colors">
                          <div className="flex items-center gap-1.5 mb-[2px]">
                            <span className="text-[9px] font-mono text-accent">{alert.exchange}</span>
                            <span className="text-[7px] font-mono text-muted-foreground uppercase">{alert.type}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span className={`w-2 h-2 rounded-full ${alert.side === "BUY" ? "bg-status-active" : "bg-status-hot"}`} />
                            <span className="font-mono text-[10px] text-foreground/90">{alert.pair} {alert.side} {alert.amount} @ {alert.price}</span>
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
                    <Plus size={9} /><span>Add Alert</span>
                  </button>
                </div>
              </div>
            </div>
          </ResizablePanel>

          <ResizableHandle withHandle />

          {/* CENTER: Feed + Prompt */}
          <ResizablePanel defaultSize={52} minSize={35}>
            <div className="h-full flex flex-col overflow-hidden">
              {/* Header bar */}
              <div className="px-5 py-2.5 border-b border-border shrink-0 flex items-center justify-between">
                <p className="text-[10px] font-mono text-muted-foreground">StockClaw Terminal — 5 agents online</p>
                <div className="flex gap-4 text-[9px] font-mono">
                  {[
                    { label: "Queries", value: "127" },
                    { label: "Analyses", value: "34" },
                    { label: "Alerts", value: "12" },
                  ].map((stat) => (
                    <span key={stat.label} className="text-muted-foreground">{stat.label} <span className="text-foreground font-semibold">{stat.value}</span></span>
                  ))}
                </div>
              </div>

              {/* Feed + Chat */}
              <div className="flex-1 overflow-y-auto px-5 py-2" ref={chatScrollRef}>
                {/* Empty state when no messages */}
                {chatMessages.length === 0 && (
                  <div className="flex flex-col items-center justify-center h-full text-center py-16 opacity-60">
                    <span className="text-3xl mb-3">⊞</span>
                    <p className="text-sm font-mono text-muted-foreground mb-1">StockClaw Terminal Ready</p>
                    <p className="text-[10px] font-mono text-muted-foreground/60">질문을 입력하면 에이전트들이 분석을 시작합니다</p>
                  </div>
                )}

                {/* Chat messages — orchestrated single answer */}
                <AnimatePresence>
                  {chatMessages.map((msg) => (
                    <motion.div key={msg.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="mb-4">
                      {msg.type === "user" ? (
                        <div className="flex justify-end">
                          <div className="bg-accent/15 border border-accent/30 px-4 py-2.5 max-w-[80%]">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-[9px] font-mono text-accent font-semibold">YOU</span>
                              <span className="text-[8px] font-mono text-muted-foreground">{msg.time}</span>
                            </div>
                            <p className="text-xs leading-relaxed">{msg.content}</p>
                          </div>
                        </div>
                      ) : (
                        <div className="border border-border/50 bg-card/30 p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-[10px]">⊞</span>
                            <span className="text-[9px] font-mono font-semibold text-accent">STOCKCLAW ORCHESTRATOR</span>
                            <span className="text-[9px] font-mono text-muted-foreground">{msg.time}</span>
                          </div>
                          {msg.isTyping ? (
                            <div className="flex items-center gap-1.5 py-1">
                              <motion.span className="w-1.5 h-1.5 rounded-full bg-accent" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 0.8, repeat: Infinity, delay: 0 }} />
                              <motion.span className="w-1.5 h-1.5 rounded-full bg-accent" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 0.8, repeat: Infinity, delay: 0.2 }} />
                              <motion.span className="w-1.5 h-1.5 rounded-full bg-accent" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 0.8, repeat: Infinity, delay: 0.4 }} />
                              <span className="text-[9px] font-mono text-muted-foreground ml-1">
                                {selectedAgents.size === 1 ? `${agents.find(a => a.id === Array.from(selectedAgents)[0])?.name} analyzing...` : `orchestrating ${selectedAgents.size} agents...`}
                              </span>
                            </div>
                          ) : (
                            <>
                              <motion.p className="text-xs leading-relaxed text-foreground/90 mb-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                                {msg.content}
                              </motion.p>
                              {msg.signal && (
                                <motion.div className="flex items-center gap-3 pt-2 border-t border-border/30" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                                  <div className="flex items-center gap-1.5">
                                    <span className="font-mono text-[8px] text-muted-foreground">SIGNAL</span>
                                    <span className={`font-mono text-[11px] font-bold ${msg.signal?.includes("LONG") ? "text-status-active" : "text-status-hot"}`}>{msg.signal}</span>
                                  </div>
                                  <div className="flex items-center gap-1.5">
                                    <span className="font-mono text-[8px] text-muted-foreground">CONFIDENCE</span>
                                    <span className="font-mono text-[11px] font-bold">{msg.confidence}%</span>
                                  </div>
                                  <div className="flex-1 h-1 bg-border overflow-hidden">
                                    <motion.div className="h-full bg-[hsl(45_90%_55%)]" initial={{ width: 0 }} animate={{ width: `${msg.confidence}%` }} transition={{ duration: 0.8, delay: 0.3 }} />
                                  </div>
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
              <div className="px-5 pt-3 pb-4 border-t border-border shrink-0">
                <div className="flex items-center gap-2 mb-3 flex-wrap">
                  <span className="text-[9px] font-mono text-muted-foreground">Searching from :</span>
                  {dataSources.map((source) => (
                    <button key={source} onClick={() => toggleSource(source)} className={`text-[8px] font-mono px-2 py-[3px] border transition-all ${selectedSources.has(source) ? "border-accent/50 text-foreground bg-accent/10" : "border-border text-muted-foreground/50 hover:text-muted-foreground hover:border-border"}`}>
                      {selectedSources.has(source) && <span className="mr-1">✓</span>}{source}
                    </button>
                  ))}
                </div>
                <div className="border border-border bg-card px-3 py-2">
                  <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-accent font-mono text-xs">&gt;</span>
                      <input type="text" value={chatInput} onChange={(e) => setChatInput(e.target.value)} placeholder="Ask your agents — try 'Analyze BTC' or 'What's happening with ETH?'" className="bg-transparent text-xs font-mono outline-none flex-1 min-w-0 placeholder:text-muted-foreground/40" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-[2px]">
                          {agents.map((a) => (
                            <button key={a.id} type="button" onClick={() => toggleAgent(a.id)} className={`text-[8px] font-mono px-[6px] py-[2px] transition-colors ${selectedAgents.has(a.id) ? "text-accent-foreground" : "text-muted-foreground/40 hover:text-muted-foreground"}`} style={selectedAgents.has(a.id) ? { backgroundColor: `hsl(${a.color})` } : undefined} title={a.fullName}>
                              {a.emoji}
                            </button>
                          ))}
                        </div>
                        <span className="text-[8px] font-mono text-muted-foreground">{selectedAgents.size}/{agents.length}</span>
                        {selectedAgents.size === 1 && (
                          <span className="text-[8px] font-mono text-accent">
                            → {agents.find(a => a.id === Array.from(selectedAgents)[0])?.name} SOLO
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[8px] font-mono text-muted-foreground">/? for help</span>
                        <button type="submit" className="transition-colors text-accent hover:text-foreground"><Send size={12} /></button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </ResizablePanel>

          <ResizableHandle withHandle />

          {/* RIGHT: Market + Agent Breakdowns */}
          <ResizablePanel defaultSize={30} minSize={18} maxSize={40}>
            <div className="h-full flex flex-col overflow-y-auto border-l border-border">
              {/* TradingView Chart */}
              <div className="p-3 border-b border-border shrink-0">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono tracking-wider text-accent">MARKET LIVE</span>
                  <ExternalLink size={10} className="text-muted-foreground" />
                </div>
                <div className="border border-border bg-card overflow-hidden">
                  <div className="flex items-center gap-2 px-2.5 pt-2 pb-1">
                    <span className="font-bold text-xs text-accent">{selectedTicker?.ticker}</span>
                    <span className="text-[9px] font-mono text-muted-foreground truncate">{selectedTicker?.name}</span>
                    <span className={`text-[9px] font-mono font-semibold ml-auto ${selectedTicker.change > 0 ? "text-status-active" : "text-status-hot"}`}>
                      {selectedTicker.change > 0 ? "+" : ""}{selectedTicker.change}%
                    </span>
                  </div>
                  <TradingViewChart symbol={selectedTicker?.ticker || "BTC"} height={140} />
                </div>
              </div>

              {/* Headlines */}
              <div className="p-3 border-b border-border">
                <div className="mb-2">
                  <span className="font-mono text-[9px] tracking-wider text-muted-foreground">HEADLINES</span>
                </div>
                <div className="space-y-2">
                  {agents.flatMap((a) => a.headlines.map((h) => ({ ...h, agentEmoji: a.emoji, agentColor: a.color }))).slice(0, 6).map((h, i) => (
                    <div key={i} className="flex gap-2 group cursor-pointer py-0.5">
                      <span className="text-[9px] font-mono text-muted-foreground shrink-0 mt-0.5">{h.time}</span>
                      <p className={`text-[10px] leading-relaxed group-hover:underline ${h.sentiment === "bull" ? "text-status-active" : (h.sentiment as string) === "bear" ? "text-status-hot" : "text-foreground/70"}`}>{h.text}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Agent Breakdowns — from orchestration result */}
              <div className="p-3 border-b border-border">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-[9px] font-semibold tracking-[1px]">AGENT ANALYSIS</span>
                  <span className="font-mono text-[8px] text-muted-foreground">{selectedAgents.size}/{agents.length} ACTIVE</span>
                </div>

                {/* Agent selector checkboxes */}
                {agents.map((agent) => {
                  const isSelected = selectedAgents.has(agent.id);
                  const breakdown = activeBreakdowns.find((b) => b.agentId === agent.id);
                  const isExpanded = expandedBreakdown === agent.id;

                  return (
                    <div key={agent.id} className="border-b border-border last:border-0">
                      <div
                        className={`flex items-center justify-between py-[6px] cursor-pointer transition-colors ${isSelected ? "bg-accent/10" : "hover:bg-card/50 opacity-50"}`}
                        onClick={() => {
                          if (breakdown) setExpandedBreakdown(isExpanded ? null : agent.id);
                        }}
                      >
                        <div className="flex items-center gap-[7px]">
                          <button
                            onClick={(e) => { e.stopPropagation(); toggleAgent(agent.id); }}
                            className={`w-3 h-3 border flex items-center justify-center text-[7px] transition-colors ${isSelected ? "border-accent bg-accent/20 text-accent" : "border-muted-foreground"}`}
                          >
                            {isSelected && "✓"}
                          </button>
                          <span className="text-[11px]">{agent.emoji}</span>
                          <span className={`font-mono text-[9px] font-semibold tracking-[0.5px] ${isSelected ? "text-foreground" : "text-muted-foreground"}`}>
                            {agent.fullName.toUpperCase()}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          {breakdown && (
                            <span className="font-mono text-[7px] text-accent px-1 border border-accent/30">DATA</span>
                          )}
                          <span className={`w-[6px] h-[6px] rounded-full ${agent.status !== "idle" ? "bg-status-active" : "bg-muted-foreground"}`} />
                        </div>
                      </div>

                      {/* Expanded breakdown from orchestrated result */}
                      {isExpanded && breakdown && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} className="pb-2 px-1 overflow-hidden">
                          <p className="text-[10px] leading-relaxed text-foreground/80 mb-2 px-1">{breakdown.summary}</p>
                          {breakdown.keyData.map((d, i) => (
                            <div key={i} className="flex justify-between py-[2px] text-[9px] px-1">
                              <span className="text-muted-foreground">{d.label}</span>
                              <span className="font-mono text-[9px] text-accent">{d.value}</span>
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

              {/* Pilot */}
              <div className="px-3 py-2 bg-card border-t border-border">
                <div className="flex items-center gap-[5px] mb-[5px]">
                  <div className="w-[18px] h-[18px] bg-accent/15 flex items-center justify-center text-[8px] text-accent">⊞</div>
                  <span className="font-mono text-[8px] font-semibold tracking-[1px]">STOCKCLAW PILOT</span>
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
          <span className="flex items-center gap-[3px]"><span className="w-1 h-1 rounded-full bg-status-active" /> CONNECTED</span>
          <span className="flex items-center gap-[3px]"><span className="w-1 h-1 rounded-full bg-accent" /> 5 AGENTS</span>
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
