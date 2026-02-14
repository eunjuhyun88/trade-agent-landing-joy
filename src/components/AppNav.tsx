import { useNavigate } from "react-router-dom";
import { Search, ArrowLeft } from "lucide-react";

interface AppNavProps {
  activeTab?: "trade" | "advisory" | "holdings";
  activeAgent?: string;
  agents: { id: string; code: string }[];
  onAgentChange?: (id: string) => void;
}

const AppNav = ({ activeTab = "trade", activeAgent, agents, onAgentChange }: AppNavProps) => {
  const navigate = useNavigate();

  return (
    <nav className="border-b border-border bg-background/95 backdrop-blur-sm flex items-center justify-between px-3 h-[46px] shrink-0">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <button onClick={() => navigate("/")} className="text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft size={14} />
          </button>
          <span
            className="text-sm font-bold tracking-[2px] font-mono cursor-pointer"
            onClick={() => navigate("/")}
          >
            CLAWHOO
          </span>
        </div>

        {/* Page Tabs */}
        <div className="hidden md:flex items-center">
          {(["Trade", "Advisory", "Holdings"] as const).map((tab) => {
            const key = tab.toLowerCase() as "trade" | "advisory" | "holdings";
            const isActive = key === activeTab;
            return (
              <span
                key={tab}
                onClick={() => {
                  if (key === "trade") navigate("/agents");
                }}
                className={`px-4 py-[13px] text-[9px] font-mono font-medium tracking-[1.5px] uppercase cursor-pointer border-b-2 transition-colors ${
                  isActive
                    ? "text-foreground border-accent"
                    : "text-muted-foreground border-transparent hover:text-foreground/70"
                }`}
              >
                {tab}
              </span>
            );
          })}
        </div>

        {/* Agent Node Switcher */}
        <div className="flex gap-[2px]">
          {agents.map((agent) => (
            <button
              key={agent.id}
              onClick={() => onAgentChange?.(agent.id)}
              className={`font-mono text-[8px] px-[7px] py-[3px] border transition-colors ${
                agent.id === activeAgent
                  ? "bg-accent text-accent-foreground border-accent"
                  : "bg-card border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {agent.code.split("_")[1]}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="font-mono text-[10px] font-bold bg-[hsl(45_90%_55%/0.15)] border border-[hsl(45_90%_55%)] text-[hsl(45_90%_55%)] px-2 py-[3px]">
          ENTRY SCORE 73
        </div>
        <div className="hidden sm:flex items-center gap-[5px] bg-card border border-border px-2 py-1 text-[10px] text-muted-foreground">
          <Search size={10} />
          <span>Search Markets</span>
        </div>
        <span className="font-mono text-[9px] px-[10px] py-1 border border-accent text-accent bg-accent/15">
          ● 0xAB...5542
        </span>
      </div>
    </nav>
  );
};

export default AppNav;
