import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import {
  BarChart3, LineChart, CandlestickChart, TrendingUp,
  Link2, Blocks, Database, Wallet,
  MessageCircle, Twitter, Rss, Globe,
  ArrowUpDown, Shield, Layers, Target,
} from "lucide-react";

const ICON_GROUPS = [
  { label: "CHART", color: "hsl(var(--status-active))", icons: [BarChart3, LineChart, CandlestickChart, TrendingUp] },
  { label: "CHAIN", color: "hsl(var(--accent))", icons: [Link2, Blocks, Database, Wallet] },
  { label: "SOCIAL", color: "hsl(var(--status-hot))", icons: [MessageCircle, Twitter, Rss, Globe] },
  { label: "DERIV", color: "hsl(268, 35%, 62%)", icons: [ArrowUpDown, Shield, Layers, Target] },
];

const ALL_ICONS = ICON_GROUPS.flatMap((g, gi) =>
  g.icons.map((Icon, ii) => ({
    Icon,
    color: g.color,
    id: `${gi}-${ii}`,
    // scattered positions (percentage based)
    startX: 15 + ((gi * 4 + ii) * 17) % 70,
    startY: 10 + ((ii * 3 + gi * 7) * 13) % 75,
  }))
);

const TerminalSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [converged, setConverged] = useState(false);

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => setConverged(true), 2200);
      return () => clearTimeout(timer);
    }
  }, [isInView]);

  return (
    <section className="px-6 md:px-12 py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
        <motion.div
          className="bg-card border border-border p-8 md:p-12 flex flex-col justify-center"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-xs font-mono tracking-wider text-accent mb-4">CORE_ENGINE</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[0.95] tracking-tighter mb-6">
            THE TERMINAL
            <br />
            <span className="text-accent">INTERFACE.</span>
          </h2>
          <p className="text-sm leading-relaxed text-muted-foreground max-w-md mb-8">
            No clutter. No noise. Just the raw data vectors you need to make professional-grade decisions in real-time.
          </p>
          <div className="flex gap-3">
            <button className="bg-primary text-primary-foreground px-6 py-3 text-xs font-mono tracking-wider hover:opacity-90 transition-opacity flex items-center gap-2">
              VIEW LIVE STATE
              <span>→</span>
            </button>
            <button className="border border-foreground px-6 py-3 text-xs font-mono tracking-wider hover:bg-secondary transition-colors">
              DOCUMENTATION
            </button>
          </div>
        </motion.div>

        {/* Floating icons → converge animation */}
        <motion.div
          ref={containerRef}
          className="bg-primary border border-border relative overflow-hidden min-h-[400px] md:min-h-[500px]"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          {/* Floating icons */}
          {ALL_ICONS.map(({ Icon, color, id, startX, startY }, i) => (
            <motion.div
              key={id}
              className="absolute"
              style={{ left: `${startX}%`, top: `${startY}%` }}
              initial={{ opacity: 0, scale: 0 }}
              animate={
                isInView
                  ? converged
                    ? {
                        left: "50%",
                        top: "50%",
                        x: "-50%",
                        y: "-50%",
                        opacity: 0,
                        scale: 0.3,
                      }
                    : {
                        opacity: [0, 0.8, 0.6, 0.8],
                        scale: 1,
                        x: [0, (i % 2 === 0 ? 8 : -8), 0],
                        y: [0, (i % 3 === 0 ? -6 : 6), 0],
                      }
                  : {}
              }
              transition={
                converged
                  ? { duration: 0.8, delay: i * 0.03, ease: "easeInOut" }
                  : {
                      opacity: { duration: 0.5, delay: i * 0.08 },
                      scale: { duration: 0.4, delay: i * 0.08 },
                      x: { duration: 3, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" },
                      y: { duration: 2.5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay: i * 0.15 },
                    }
              }
            >
              <div
                className="w-10 h-10 md:w-12 md:h-12 rounded-sm border flex items-center justify-center backdrop-blur-sm"
                style={{
                  borderColor: color,
                  background: `${color}15`,
                  boxShadow: `0 0 20px ${color}30`,
                }}
              >
                <Icon size={18} style={{ color }} />
              </div>
            </motion.div>
          ))}

          {/* Core engine reveal */}
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center z-10"
            initial={{ opacity: 0 }}
            animate={converged ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <motion.div
              className="w-24 h-24 md:w-32 md:h-32 border-2 border-accent rounded-sm flex items-center justify-center relative"
              initial={{ scale: 0, rotate: -180 }}
              animate={converged ? { scale: 1, rotate: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4, type: "spring", stiffness: 120 }}
              style={{
                background: "hsl(var(--accent) / 0.1)",
                boxShadow: "0 0 60px hsl(var(--accent) / 0.3), inset 0 0 30px hsl(var(--accent) / 0.1)",
              }}
            >
              <Blocks size={40} className="text-accent" />
              {/* Orbiting dots */}
              {[0, 1, 2, 3].map((j) => (
                <motion.div
                  key={j}
                  className="absolute w-2 h-2 rounded-full"
                  style={{
                    background: ICON_GROUPS[j].color,
                    boxShadow: `0 0 8px ${ICON_GROUPS[j].color}`,
                  }}
                  animate={
                    converged
                      ? {
                          rotate: 360,
                          x: [0, Math.cos((j * Math.PI) / 2) * 52],
                          y: [0, Math.sin((j * Math.PI) / 2) * 52],
                        }
                      : {}
                  }
                  transition={{
                    rotate: { duration: 6, repeat: Infinity, ease: "linear", delay: j * 1.5 },
                    x: { duration: 0.5, delay: 0.6 + j * 0.1 },
                    y: { duration: 0.5, delay: 0.6 + j * 0.1 },
                  }}
                />
              ))}
            </motion.div>
            <motion.span
              className="text-xs font-mono tracking-[0.3em] text-primary-foreground/80 mt-6"
              initial={{ opacity: 0, y: 10 }}
              animate={converged ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1.2 }}
            >
              CORE_ENGINE.ACTIVE
            </motion.span>
            <motion.div
              className="flex gap-4 mt-3"
              initial={{ opacity: 0 }}
              animate={converged ? { opacity: 1 } : {}}
              transition={{ delay: 1.5 }}
            >
              {ICON_GROUPS.map((g) => (
                <span
                  key={g.label}
                  className="text-[10px] font-mono tracking-wider"
                  style={{ color: g.color }}
                >
                  {g.label}
                </span>
              ))}
            </motion.div>
          </motion.div>

          <div className="absolute bottom-4 left-4 right-4 z-10">
            <span className="text-xs font-mono tracking-wider text-primary-foreground/60">
              {converged ? "ENGINE_INITIALIZED" : "AGGREGATING_SOURCES..."}
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TerminalSection;
