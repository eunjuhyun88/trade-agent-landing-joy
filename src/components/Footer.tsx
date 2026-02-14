import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

const Footer = () => {
  const { toast } = useToast();

  const handleSocial = (platform: string) => {
    toast({ title: `🔗 ${platform}`, description: `${platform} link coming soon!` });
  };

  return (
    <motion.footer
      className="px-4 sm:px-6 md:px-12 py-8 sm:py-12 border-t border-border"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 sm:gap-8 mb-8">
        <div>
          <span className="text-xl sm:text-2xl font-bold tracking-tight">STOCKCLAW.</span>
          <div className="flex items-center gap-4 sm:gap-6 mt-4 text-xs font-mono tracking-wider text-muted-foreground">
            <span onClick={() => handleSocial("Twitter / X")} className="hover:text-foreground cursor-pointer transition-colors">TWITTER / X</span>
            <span onClick={() => handleSocial("Discord")} className="hover:text-foreground cursor-pointer transition-colors">DISCORD</span>
            <span onClick={() => handleSocial("Docs")} className="hover:text-foreground cursor-pointer transition-colors">DOCS</span>
          </div>
        </div>
        <div className="flex flex-col items-start md:items-end gap-2">
          <span className="text-xs font-mono tracking-wider text-muted-foreground">© 2024 STOCKCLAW</span>
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

      <div className="border-t border-border pt-6">
        <p className="text-[10px] font-mono text-muted-foreground/70 leading-relaxed max-w-xl">
          This is not financial advice. Entry Score measures condition favorability, not price direction. Trade at your own risk.
        </p>
      </div>
    </motion.footer>
  );
};

export default Footer;
