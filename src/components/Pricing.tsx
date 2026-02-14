import { motion } from "framer-motion";
import { Check } from "lucide-react";

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

      {/* Cards — 3 columns */}
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
            <span
              className={`text-xs font-mono tracking-[0.2em] mb-6 ${
                tier.highlight ? "text-primary-foreground/70" : "text-muted-foreground"
              }`}
            >
              {tier.name}
            </span>

            <div className="mb-1">
              <span className="text-4xl md:text-5xl font-bold tracking-tighter">{tier.price}</span>
              <span
                className={`text-sm font-mono ml-1 ${
                  tier.highlight ? "text-primary-foreground/70" : "text-muted-foreground"
                }`}
              >
                {tier.token}
                {tier.period}
              </span>
            </div>
            {tier.usd && (
              <span
                className={`text-xs font-mono mb-1 ${
                  tier.highlight ? "text-primary-foreground/50" : "text-muted-foreground"
                }`}
              >
                {tier.usd}
              </span>
            )}
            {tier.save ? (
              <span className="text-xs font-mono text-status-active font-bold mb-6">
                {tier.save}
              </span>
            ) : (
              <div className="mb-6" />
            )}

            <div
              className={`h-[1px] mb-6 ${
                tier.highlight ? "bg-primary-foreground/20" : "bg-border"
              }`}
            />

            <ul className="space-y-3 flex-1 mb-8">
              {tier.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2.5">
                  <Check
                    size={14}
                    className={`shrink-0 mt-0.5 ${
                      tier.highlight ? "text-accent" : "text-status-active"
                    }`}
                  />
                  <span
                    className={`text-sm leading-snug ${
                      tier.highlight ? "text-primary-foreground/90" : "text-foreground"
                    }`}
                  >
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            <button
              className={`w-full py-3 text-xs font-mono tracking-wider transition-colors ${
                tier.highlight
                  ? "bg-accent text-accent-foreground hover:opacity-90"
                  : "border border-foreground hover:bg-secondary"
              }`}
            >
              {tier.cta}
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
    </section>
  );
};

export default Pricing;
