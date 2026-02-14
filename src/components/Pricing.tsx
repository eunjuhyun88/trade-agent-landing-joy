import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, Wallet } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useWallet } from "@/contexts/WalletContext";
import { useToast } from "@/hooks/use-toast";

const tiers = [
  {
    name: "FREE",
    price: "0",
    token: "$SHO",
    period: "",
    usd: "",
    highlight: false,
    cta: "START FREE",
    features: [
      "5 analyses per day",
      "3 agents: CHART, CHAIN, SOCIAL",
      "Entry Score (3-agent partial)",
      "Delayed feed",
    ],
  },
  {
    name: "PRO MONTHLY",
    price: "50",
    token: "$SHO",
    period: "/mo",
    usd: "~$19 USD",
    highlight: false,
    cta: "UPGRADE TO PRO →",
    features: [
      "Unlimited analyses",
      "All 5 agents",
      "Full Entry Score (5-agent weighted)",
      "Real-time feed",
      "Custom alerts",
      "Webhook integration",
      "Agent deep-dive view",
    ],
  },
  {
    name: "PRO YEARLY",
    price: "500",
    token: "$SHO",
    period: "/yr",
    usd: "~$190 USD",
    save: "Save 16%",
    highlight: true,
    cta: "GET YEARLY →",
    features: [
      "Everything in Pro Monthly",
      "All 5 agents",
      "Full Entry Score (5-agent weighted)",
      "Real-time feed",
      "Custom alerts",
      "Webhook integration",
      "Agent deep-dive view",
      "Priority support",
    ],
  },
];

const Pricing = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { connected, address, connectedWallet, wallets, connect, subscription, subscribe } = useWallet();
  const [paymentModal, setPaymentModal] = useState<typeof tiers[0] | null>(null);
  const [walletSelectOpen, setWalletSelectOpen] = useState(false);
  const [processing, setProcessing] = useState(false);

  const handleCta = (tier: typeof tiers[0]) => {
    if (tier.name === "FREE") {
      navigate("/agents");
      return;
    }
    // Already subscribed to this plan
    if (subscription === tier.name) {
      toast({ title: "✅ Already Active", description: `You already have an active ${tier.name} subscription.` });
      return;
    }
    if (!connected) {
      setPaymentModal(tier);
      setWalletSelectOpen(true);
    } else {
      setPaymentModal(tier);
      setWalletSelectOpen(false);
    }
  };

  const handleWalletConnect = (walletId: string) => {
    connect(walletId);
    setWalletSelectOpen(false);
  };

  const handlePayment = () => {
    if (!paymentModal) return;
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      subscribe(paymentModal.name as any);
      setPaymentModal(null);
      toast({
        title: "✅ Subscription Activated",
        description: `${paymentModal.price} $SHO payment confirmed. ${paymentModal.name} access granted.`,
      });
    }, 2500);
  };

  return (
    <section className="px-6 md:px-12 py-20">
      <motion.div
        className="mb-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <span className="text-xs font-mono tracking-wider text-accent">ACCESS_TIERS</span>
      </motion.div>

      <motion.h2
        className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[0.95] tracking-tighter mb-12"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        CHOOSE YOUR
        <br />
        <span className="text-accent">ACCESS LEVEL.</span>
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0 border border-border max-w-5xl">
        {tiers.map((tier, i) => (
          <motion.div
            key={tier.name}
            className={`p-6 sm:p-8 flex flex-col border border-border ${
              tier.highlight ? "bg-primary text-primary-foreground" : "bg-card"
            }`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <div className="flex items-center gap-2 mb-6">
              <span className={`text-xs font-mono tracking-[0.2em] ${tier.highlight ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                {tier.name}
              </span>
              {subscription === tier.name && (
                <span className="text-[7px] font-mono font-bold px-1.5 py-[2px] bg-status-active/20 text-status-active border border-status-active/30 tracking-[1px]">
                  ACTIVE
                </span>
              )}
            </div>
            <div className="mb-1">
              <span className="text-4xl md:text-5xl font-bold tracking-tighter">{tier.price}</span>
              <span className={`text-sm font-mono ml-1 ${tier.highlight ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                {tier.token}{tier.period}
              </span>
            </div>
            {tier.usd && (
              <span className={`text-xs font-mono mb-1 ${tier.highlight ? "text-primary-foreground/50" : "text-muted-foreground"}`}>
                {tier.usd}
              </span>
            )}
            {tier.save ? (
              <span className="text-xs font-mono text-status-active font-bold mb-6">{tier.save}</span>
            ) : (
              <div className="mb-6" />
            )}
            <div className={`h-[1px] mb-6 ${tier.highlight ? "bg-primary-foreground/20" : "bg-border"}`} />
            <ul className="space-y-3 flex-1 mb-8">
              {tier.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2.5">
                  <Check size={14} className={`shrink-0 mt-0.5 ${tier.highlight ? "text-accent" : "text-status-active"}`} />
                  <span className={`text-sm leading-snug ${tier.highlight ? "text-primary-foreground/90" : "text-foreground"}`}>
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
            <button
              onClick={() => handleCta(tier)}
              className={`w-full py-3 text-xs font-mono tracking-wider transition-colors ${
                subscription === tier.name
                  ? "bg-status-active/15 border border-status-active text-status-active cursor-default"
                  : tier.highlight
                    ? "bg-accent text-accent-foreground hover:opacity-90"
                    : "border border-foreground hover:bg-secondary"
              }`}
            >
              {subscription === tier.name
                ? "✓ ACTIVE"
                : tier.name === "FREE"
                  ? tier.cta
                  : connected
                    ? `PAY ${tier.price} $SHO`
                    : `CONNECT & PAY ${tier.price} $SHO`
              }
            </button>
          </motion.div>
        ))}
      </div>

      <motion.p
        className="text-xs font-mono text-muted-foreground mt-8 max-w-lg"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
      >
        Non-custodial. No exchange API keys required.
        <br />
        We read the market. We never touch your funds.
      </motion.p>

      {/* Payment Modal */}
      <AnimatePresence>
        {paymentModal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => { if (!processing) { setPaymentModal(null); setWalletSelectOpen(false); } }}
          >
            <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
            <motion.div
              className="relative w-full max-w-md border border-border bg-card shadow-2xl"
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2">
                    <Wallet size={14} className="text-accent" />
                    <span className="font-mono text-[11px] font-bold tracking-[1px]">
                      {walletSelectOpen ? "CONNECT WALLET" : "CONFIRM PAYMENT"}
                    </span>
                  </div>
                  <button
                    onClick={() => { if (!processing) { setPaymentModal(null); setWalletSelectOpen(false); } }}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <X size={14} />
                  </button>
                </div>

                {walletSelectOpen && !connected ? (
                  <div className="space-y-2">
                    <p className="text-[10px] font-mono text-muted-foreground mb-4">
                      Connect your wallet to pay with $SHO tokens.
                    </p>
                    {wallets.map((wallet) => (
                      <button
                        key={wallet.id}
                        onClick={() => handleWalletConnect(wallet.id)}
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
                ) : (
                  <div>
                    {/* Plan Summary */}
                    <div className="border border-accent/30 bg-accent/5 p-4 mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-mono text-[9px] tracking-[1px] text-muted-foreground">PLAN</span>
                        <span className="font-mono text-[10px] font-bold">{paymentModal.name}</span>
                      </div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-mono text-[9px] tracking-[1px] text-muted-foreground">AMOUNT</span>
                        <span className="font-mono text-lg font-bold">{paymentModal.price} <span className="text-xs text-muted-foreground">$SHO</span></span>
                      </div>
                      {paymentModal.usd && (
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-[9px] tracking-[1px] text-muted-foreground">USD EQUIVALENT</span>
                          <span className="font-mono text-[10px] text-muted-foreground">{paymentModal.usd}</span>
                        </div>
                      )}
                    </div>

                    {/* Wallet Info */}
                    <div className="border border-border p-3 mb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-lg">{connectedWallet?.icon}</span>
                        <div>
                          <p className="text-[10px] font-mono font-semibold">{connectedWallet?.name}</p>
                          <p className="text-[9px] font-mono text-muted-foreground">{address}</p>
                        </div>
                      </div>
                      <div className="flex gap-4 text-[9px] font-mono">
                        <div>
                          <span className="text-muted-foreground">$SHO Balance</span>
                          <p className="text-foreground font-semibold">1,250.00 $SHO</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Network</span>
                          <p className="text-foreground font-semibold">{connectedWallet?.id === "base" ? "Base" : "Ethereum"}</p>
                        </div>
                      </div>
                    </div>

                    {/* Fee Breakdown */}
                    <div className="space-y-1 mb-4 px-1">
                      <div className="flex justify-between text-[9px] font-mono">
                        <span className="text-muted-foreground">Subscription</span>
                        <span>{paymentModal.price} $SHO</span>
                      </div>
                      <div className="flex justify-between text-[9px] font-mono">
                        <span className="text-muted-foreground">Network Fee (est.)</span>
                        <span>~0.5 $SHO</span>
                      </div>
                      <div className="border-t border-border my-1" />
                      <div className="flex justify-between text-[10px] font-mono font-bold">
                        <span>Total</span>
                        <span>{(parseFloat(paymentModal.price) + 0.5).toFixed(1)} $SHO</span>
                      </div>
                    </div>

                    <button
                      onClick={handlePayment}
                      disabled={processing}
                      className="w-full py-3 bg-accent text-accent-foreground font-mono text-[10px] font-semibold tracking-[2px] uppercase hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {processing ? (
                        <>
                          <motion.span
                            className="w-2 h-2 rounded-full bg-accent-foreground"
                            animate={{ opacity: [0.3, 1, 0.3] }}
                            transition={{ duration: 0.8, repeat: Infinity }}
                          />
                          PROCESSING TRANSACTION...
                        </>
                      ) : (
                        `CONFIRM & PAY ${paymentModal.price} $SHO`
                      )}
                    </button>

                    <p className="text-[8px] font-mono text-muted-foreground/60 text-center mt-3">
                      By confirming, you authorize a one-time transfer of {paymentModal.price} $SHO from your wallet.
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Pricing;
