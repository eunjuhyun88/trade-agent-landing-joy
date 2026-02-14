import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Search, ArrowLeft, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useWallet } from "@/contexts/WalletContext";
import { useToast } from "@/hooks/use-toast";

const AppNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { connected, address, wallets, connectedWallet, connect, disconnect, subscription } = useWallet();
  const { toast } = useToast();
  const [walletOpen, setWalletOpen] = useState(false);

  const handleConnect = (walletId: string) => {
    connect(walletId);
    setWalletOpen(false);
  };

  const handleDisconnect = () => {
    disconnect();
    setWalletOpen(false);
  };

  const tabs = [
    { label: "Terminal", path: "/agents" },
    { label: "Holdings", path: "/holdings" },
  ];

  return (
    <>
      <nav className="border-b border-border bg-background/95 backdrop-blur-sm flex items-center justify-between px-3 h-[46px] shrink-0">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <button onClick={() => navigate("/")} className="text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft size={14} />
            </button>
            <span className="text-sm font-bold tracking-[2px] font-mono cursor-pointer" onClick={() => navigate("/")}>
              STOCKCLAW
            </span>
          </div>

          <div className="flex items-center">
            {tabs.map((tab) => {
              const isActive = location.pathname === tab.path;
              return (
                <span
                  key={tab.path}
                  onClick={() => navigate(tab.path)}
                  className={`px-3 sm:px-4 py-[13px] text-[9px] font-mono font-medium tracking-[1.5px] uppercase cursor-pointer border-b-2 transition-colors ${
                    isActive ? "text-foreground border-accent" : "text-muted-foreground border-transparent hover:text-foreground"
                  }`}
                >
                  {tab.label}
                </span>
              );
            })}
          </div>
        </div>

        <div className="flex items-center gap-3">
          {subscription && subscription !== "FREE" && (
            <div className="hidden sm:flex font-mono text-[9px] font-bold bg-status-active/15 border border-status-active text-status-active px-2 py-[3px] items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-status-active" />
              {subscription === "PRO YEARLY" ? "PRO YR" : "PRO"} ACTIVE
            </div>
          )}
          <div className="font-mono text-[10px] font-bold bg-[hsl(45_90%_55%/0.15)] border border-[hsl(45_90%_55%)] text-[hsl(45_90%_55%)] px-2 py-[3px]">
            ENTRY SCORE 73
          </div>
          <div onClick={() => toast({ title: "🔍 Search", description: "Market search coming soon!" })} className="hidden sm:flex items-center gap-[5px] bg-card border border-border px-2 py-1 text-[10px] text-muted-foreground cursor-pointer hover:border-accent/50 transition-colors">
            <Search size={10} />
            <span>Search Markets</span>
          </div>

          {connected ? (
            <button
              onClick={() => setWalletOpen(true)}
              className="font-mono text-[9px] px-[10px] py-1 border border-accent text-accent bg-accent/15 flex items-center gap-1.5 hover:bg-accent/25 transition-colors"
            >
              <span>{connectedWallet?.icon}</span>
              <span>{address}</span>
            </button>
          ) : (
            <button
              onClick={() => setWalletOpen(true)}
              className="font-mono text-[9px] px-[10px] py-1 border border-accent text-accent bg-accent/15 hover:bg-accent/25 transition-colors"
            >
              Connect Wallet
            </button>
          )}
        </div>
      </nav>

      {/* Wallet Modal */}
      <AnimatePresence>
        {walletOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setWalletOpen(false)}
          >
            <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
            <motion.div
              className="relative w-full max-w-sm border border-border bg-card shadow-2xl"
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-sm font-bold font-mono tracking-[1px]">
                    {connected ? "WALLET CONNECTED" : "CONNECT WALLET"}
                  </h3>
                  <button onClick={() => setWalletOpen(false)} className="text-muted-foreground hover:text-foreground">
                    <X size={14} />
                  </button>
                </div>

                {connected ? (
                  <div>
                    <div className="border border-border p-4 mb-4">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-2xl">{connectedWallet?.icon}</span>
                        <div>
                          <p className="text-xs font-mono font-semibold">{connectedWallet?.name}</p>
                          <p className="text-[10px] font-mono text-muted-foreground">{address}</p>
                        </div>
                      </div>
                      <div className="flex gap-3 text-[9px] font-mono">
                        <div>
                          <span className="text-muted-foreground">Balance</span>
                          <p className="text-foreground font-semibold">2.4521 ETH</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">USD Value</span>
                          <p className="text-foreground font-semibold">$9,424.18</p>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={handleDisconnect}
                      className="w-full py-2.5 border border-status-hot text-status-hot text-[10px] font-mono tracking-[1px] hover:bg-status-hot/10 transition-colors"
                    >
                      DISCONNECT
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {wallets.map((wallet) => (
                      <button
                        key={wallet.id}
                        onClick={() => handleConnect(wallet.id)}
                        className="w-full flex items-center gap-3 p-4 border border-border hover:border-accent/50 hover:bg-accent/5 transition-all"
                      >
                        <span className="text-2xl">{wallet.icon}</span>
                        <div className="text-left">
                          <p className="text-xs font-mono font-semibold">{wallet.name}</p>
                          <p className="text-[9px] font-mono text-muted-foreground">
                            {wallet.id === "metamask" ? "Browser extension wallet" : "Coinbase L2 wallet"}
                          </p>
                        </div>
                      </button>
                    ))}
                    <p className="text-[8px] font-mono text-muted-foreground/60 text-center pt-2">
                      Non-custodial. We never access your private keys.
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AppNav;
