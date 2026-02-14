import { motion } from "framer-motion";

const Footer = () => {
  return (
    <motion.footer
      className="px-6 md:px-12 py-12 border-t border-border"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
        <div>
          <span className="text-2xl font-bold tracking-tight">CLAWHOO.</span>
          <div className="flex items-center gap-6 mt-4 text-xs font-mono tracking-wider text-muted-foreground">
            <span className="hover:text-foreground cursor-pointer transition-colors">TWITTER / X</span>
            <span className="hover:text-foreground cursor-pointer transition-colors">DISCORD</span>
            <span className="hover:text-foreground cursor-pointer transition-colors">DOCS</span>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <span className="text-xs font-mono tracking-wider text-muted-foreground">© 2024 CLAWHOO</span>
          <div className="border border-border p-3 flex items-center gap-4">
            <div className="text-[10px] font-mono tracking-wider text-muted-foreground space-y-0.5">
              <div>ENTRY_SCORE</div>
              <div>STATE: LONG_SIGNAL</div>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-bold">73</span>
              <span className="text-lg text-muted-foreground">/100</span>
            </div>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;