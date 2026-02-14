import { useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, ArrowDownUp, Plus, Wallet, Copy, ExternalLink } from "lucide-react";
import AppNav from "@/components/AppNav";
import { useWallet, TradeRecord } from "@/contexts/WalletContext";

const mockPortfolio = [
  { asset: "BTC", name: "Bitcoin", amount: "0.2451", value: "$24,973.29", price: "$101,890", change: 2.41, pnl: "+$1,842.30", pnlPct: "+7.95%", allocation: 48 },
  { asset: "ETH", name: "Ethereum", amount: "3.8200", value: "$14,676.44", price: "$3,842", change: -1.32, pnl: "+$624.18", pnlPct: "+4.44%", allocation: 28 },
  { asset: "SOL", name: "Solana", amount: "24.500", value: "$6,088.25", price: "$248.50", change: 5.67, pnl: "+$1,102.50", pnlPct: "+22.10%", allocation: 12 },
  { asset: "AVAX", name: "Avalanche", amount: "85.000", value: "$3,585.30", price: "$42.18", change: -0.89, pnl: "-$128.40", pnlPct: "-3.46%", allocation: 7 },
  { asset: "DOGE", name: "Dogecoin", amount: "12,500", value: "$2,275.00", price: "$0.182", change: 3.12, pnl: "+$312.50", pnlPct: "+15.92%", allocation: 5 },
];

const mockActivity = [
  { type: "BUY", asset: "BTC", amount: "0.05", price: "$98,420", time: "2h ago", status: "filled" },
  { type: "BUY", asset: "SOL", amount: "10.00", price: "$235.80", time: "1d ago", status: "filled" },
  { type: "SELL", asset: "AVAX", amount: "15.00", price: "$43.50", time: "2d ago", status: "filled" },
  { type: "BUY", asset: "ETH", amount: "1.20", price: "$3,720", time: "3d ago", status: "filled" },
  { type: "BUY", asset: "DOGE", amount: "5,000", price: "$0.168", time: "5d ago", status: "filled" },
];

const Holdings = () => {
  const [tab, setTab] = useState<"portfolio" | "activity">("portfolio");
  const { connected, address, connectedWallet, trades } = useWallet();
  const allActivity = [...trades, ...mockActivity];
  const totalValue = "$51,598.28";
  const totalPnl = "+$3,753.08";
  const totalPnlPct = "+7.84%";

  return (
    <div className="h-screen bg-background text-foreground flex flex-col overflow-hidden">
      <AppNav />

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-5xl mx-auto px-6 py-8">

          {/* Wallet Info Card */}
          {connected ? (
            <motion.div
              className="border border-accent/30 bg-accent/5 p-4 mb-6"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{connectedWallet?.icon}</span>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-xs font-mono font-bold">{connectedWallet?.name}</p>
                      <span className="text-[7px] font-mono px-1.5 py-[1px] bg-status-active/20 text-status-active border border-status-active/30">CONNECTED</span>
                    </div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <p className="text-[10px] font-mono text-muted-foreground">{address}</p>
                      <Copy size={9} className="text-muted-foreground hover:text-foreground cursor-pointer" />
                      <ExternalLink size={9} className="text-muted-foreground hover:text-foreground cursor-pointer" />
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-6 text-right">
                  <div>
                    <p className="text-[8px] font-mono text-muted-foreground tracking-wider">BALANCE</p>
                    <p className="text-sm font-mono font-bold">2.4521 ETH</p>
                  </div>
                  <div>
                    <p className="text-[8px] font-mono text-muted-foreground tracking-wider">USD VALUE</p>
                    <p className="text-sm font-mono font-bold">$9,424.18</p>
                  </div>
                  <div>
                    <p className="text-[8px] font-mono text-muted-foreground tracking-wider">NETWORK</p>
                    <p className="text-sm font-mono font-bold">{connectedWallet?.id === "base" ? "Base" : "Ethereum"}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="border border-border border-dashed p-6 mb-6 flex flex-col items-center justify-center text-center">
              <Wallet size={24} className="text-muted-foreground mb-2" />
              <p className="text-xs font-mono text-muted-foreground mb-1">지갑이 연결되지 않았습니다</p>
              <p className="text-[9px] font-mono text-muted-foreground/60">상단의 Connect Wallet 버튼을 눌러 지갑을 연결하세요</p>
            </div>
          )}

          {/* Portfolio Summary */}
          <div className="border border-border p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-[9px] font-mono text-muted-foreground tracking-[1px] mb-1">TOTAL PORTFOLIO VALUE</p>
                <p className="text-3xl font-bold font-mono tracking-tight">{totalValue}</p>
              </div>
              <div className="text-right">
                <p className="text-[9px] font-mono text-muted-foreground tracking-[1px] mb-1">UNREALIZED P&L</p>
                <p className="text-xl font-bold font-mono text-status-active">{totalPnl}</p>
                <p className="text-[10px] font-mono text-status-active">{totalPnlPct}</p>
              </div>
            </div>

            {/* Allocation bar */}
            <div className="mb-2">
              <p className="text-[8px] font-mono text-muted-foreground tracking-[1px] mb-1">ALLOCATION</p>
              <div className="flex h-2 overflow-hidden border border-border">
                {mockPortfolio.map((item, i) => (
                  <div
                    key={item.asset}
                    className="h-full transition-all"
                    style={{
                      width: `${item.allocation}%`,
                      backgroundColor: `hsl(${[45, 220, 142, 0, 270][i]} ${[90, 80, 70, 85, 70][i]}% ${[55, 50, 45, 55, 55][i]}%)`,
                    }}
                  />
                ))}
              </div>
              <div className="flex gap-3 mt-1">
                {mockPortfolio.map((item, i) => (
                  <span key={item.asset} className="text-[7px] font-mono text-muted-foreground">
                    <span
                      className="inline-block w-1.5 h-1.5 mr-0.5"
                      style={{
                        backgroundColor: `hsl(${[45, 220, 142, 0, 270][i]} ${[90, 80, 70, 85, 70][i]}% ${[55, 50, 45, 55, 55][i]}%)`,
                      }}
                    />
                    {item.asset} {item.allocation}%
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-0 border-b border-border mb-0">
            {(["portfolio", "activity"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-4 py-2.5 text-[9px] font-mono tracking-[1.5px] uppercase border-b-2 transition-colors ${
                  tab === t ? "text-foreground border-accent" : "text-muted-foreground border-transparent hover:text-foreground"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Portfolio Table */}
          {tab === "portfolio" && (
            <div className="border border-border border-t-0">
              <div className="flex items-center px-4 py-2 border-b border-border text-[8px] font-mono text-muted-foreground tracking-wider">
                <span className="w-24">Asset</span>
                <span className="flex-1">Holdings</span>
                <span className="w-24 text-right">Price</span>
                <span className="w-20 text-right">24H</span>
                <span className="w-28 text-right">Value</span>
                <span className="w-28 text-right">P&L</span>
              </div>
              {mockPortfolio.map((item, i) => (
                <motion.div
                  key={item.asset}
                  className="flex items-center px-4 py-3 border-b border-border/50 last:border-0 hover:bg-card/50 transition-colors cursor-pointer"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <div className="w-24">
                    <span className="text-xs font-mono font-bold text-accent">{item.asset}</span>
                    <span className="text-[9px] font-mono text-muted-foreground ml-1.5">{item.name}</span>
                  </div>
                  <span className="flex-1 text-[10px] font-mono text-foreground/80">{item.amount}</span>
                  <span className="w-24 text-right text-[10px] font-mono">{item.price}</span>
                  <span className={`w-20 text-right text-[10px] font-mono font-semibold ${item.change > 0 ? "text-status-active" : "text-status-hot"}`}>
                    {item.change > 0 ? "+" : ""}{item.change}%
                  </span>
                  <span className="w-28 text-right text-[10px] font-mono">{item.value}</span>
                  <span className={`w-28 text-right text-[10px] font-mono font-semibold ${item.pnl.startsWith("+") ? "text-status-active" : "text-status-hot"}`}>
                    {item.pnl} <span className="text-[8px]">({item.pnlPct})</span>
                  </span>
                </motion.div>
              ))}

              <div className="px-4 py-2 border-t border-border">
                <button className="flex items-center gap-1.5 text-[9px] font-mono text-muted-foreground hover:text-foreground transition-colors">
                  <Plus size={9} />
                  <span>Add Position</span>
                </button>
              </div>
            </div>
          )}

          {/* Activity Table */}
          {tab === "activity" && (
            <div className="border border-border border-t-0">
              <div className="flex items-center px-4 py-2 border-b border-border text-[8px] font-mono text-muted-foreground tracking-wider">
                <span className="w-16">Type</span>
                <span className="w-20">Asset</span>
                <span className="flex-1">Amount</span>
                <span className="w-24 text-right">Price</span>
                <span className="w-20 text-right">Time</span>
                <span className="w-16 text-right">Status</span>
              </div>
              {allActivity.map((item, i) => (
                <motion.div
                  key={i}
                  className="flex items-center px-4 py-3 border-b border-border/50 last:border-0 hover:bg-card/50 transition-colors"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <span className="w-16">
                    <span className={`text-[9px] font-mono font-bold flex items-center gap-1 ${item.type === "BUY" ? "text-status-active" : item.type === "SELL" ? "text-status-hot" : "text-accent"}`}>
                      {item.type === "BUY" ? <TrendingUp size={10} /> : item.type === "SELL" ? <TrendingDown size={10} /> : <ArrowDownUp size={10} />}
                      {item.type}
                    </span>
                  </span>
                  <span className="w-20 text-xs font-mono font-bold text-accent">{item.asset}</span>
                  <span className="flex-1 text-[10px] font-mono text-foreground/80">{item.amount}</span>
                  <span className="w-24 text-right text-[10px] font-mono">{item.price}</span>
                  <span className="w-20 text-right text-[9px] font-mono text-muted-foreground">{item.time}</span>
                  <span className="w-16 text-right text-[8px] font-mono text-status-active uppercase">{item.status}</span>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Status Bar */}
      <div className="shrink-0 border-t border-border">
        <div className="bg-background text-muted-foreground py-0 overflow-hidden h-[22px] flex items-center">
          <div className="animate-ticker whitespace-nowrap flex">
            <span className="text-[8px] font-mono tracking-[1px] px-4">
              <span className="text-status-active">●</span> CONNECTED | GAS: 14 GWEI | SOL_PRICE: $142.22 | BTC_DOMINANCE: 52.4% | TRADING_VOLUME_24H: $4.2B
            </span>
            <span className="text-[8px] font-mono tracking-[1px] px-4">
              <span className="text-status-active">●</span> CONNECTED | GAS: 14 GWEI | SOL_PRICE: $142.22 | BTC_DOMINANCE: 52.4% | TRADING_VOLUME_24H: $4.2B
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Holdings;
