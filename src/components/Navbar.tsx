import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const { toast } = useToast();

  const handleDocs = () => {
    toast({ title: "📄 Documentation", description: "Docs page coming soon. Stay tuned!" });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/95 backdrop-blur-md">
      <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center gap-4 sm:gap-8">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
            <motion.div
              className="w-2 h-2 rounded-full bg-accent"
              animate={{ opacity: [1, 0.4, 1], scale: [1, 0.85, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
            <span className="text-lg sm:text-xl font-bold tracking-tight">STOCKCLAW.</span>
          </div>
          <div className="hidden md:flex items-center gap-1 text-sm font-mono tracking-wide">
            <span
              onClick={() => navigate("/agents")}
              className={`border-r border-border pr-4 cursor-pointer transition-colors ${
                location.pathname === "/agents" ? "text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              TERMINAL
            </span>
            <span onClick={handleDocs} className="px-4 text-muted-foreground hover:text-foreground cursor-pointer transition-colors">DOCS</span>
          </div>
        </div>
        <div className="flex items-center gap-3 sm:gap-6">
          <div className="hidden sm:flex items-center gap-2 text-xs font-mono">
            <span className="text-muted-foreground">STATUS:</span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--status-active))] animate-pulse-dot" />
              <span className="text-[hsl(var(--status-active))]">ONLINE</span>
            </span>
          </div>
          <button
            onClick={() => navigate("/agents")}
            className="hidden sm:block bg-accent text-accent-foreground px-5 py-2 text-xs sm:text-sm font-mono tracking-wider hover:opacity-90 transition-all"
            style={{ boxShadow: "0 0 20px hsl(268 50% 72% / 0.15)" }}
          >
            INITIALIZE
          </button>
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-foreground">
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="md:hidden border-t border-border bg-background px-4 py-4 space-y-3"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <button
              onClick={() => { navigate("/agents"); setMenuOpen(false); }}
              className="block w-full text-left text-sm font-mono tracking-wider py-2 text-muted-foreground hover:text-foreground"
            >
              TERMINAL
            </button>
            <button
              onClick={() => { handleDocs(); setMenuOpen(false); }}
              className="block w-full text-left text-sm font-mono tracking-wider py-2 text-muted-foreground hover:text-foreground"
            >
              DOCS
            </button>
            <button
              onClick={() => { navigate("/agents"); setMenuOpen(false); }}
              className="w-full bg-accent text-accent-foreground px-5 py-2.5 text-xs font-mono tracking-wider"
            >
              INITIALIZE
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
