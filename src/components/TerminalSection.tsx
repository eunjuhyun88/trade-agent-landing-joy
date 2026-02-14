import { motion } from "framer-motion";
import terminalPreview from "@/assets/terminal-preview.jpg";

const TerminalSection = () => {
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
        <motion.div
          className="bg-primary border border-border relative overflow-hidden min-h-[300px] md:min-h-[400px]"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <img
            src={terminalPreview}
            alt="Terminal interface preview"
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="w-16 h-16 rounded-full bg-primary-foreground/20 backdrop-blur-sm flex items-center justify-center border border-primary-foreground/30"
              whileHover={{ scale: 1.15 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="w-4 h-4 rounded-full bg-primary-foreground/60" />
            </motion.div>
          </div>
          <div className="absolute bottom-4 left-4 right-4">
            <span className="text-xs font-mono tracking-wider text-primary-foreground/60">PREVIEW_SYSTEM.EXE</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TerminalSection;
