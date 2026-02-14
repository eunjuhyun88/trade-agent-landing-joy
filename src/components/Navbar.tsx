import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-8">
          <span className="text-xl font-bold tracking-tight cursor-pointer" onClick={() => navigate("/")}>CLAWHOO.</span>
          <div className="hidden md:flex items-center gap-1 text-sm font-mono tracking-wide">
            <span onClick={() => navigate("/agents")} className="border-r border-border pr-4 text-muted-foreground hover:text-foreground cursor-pointer transition-colors">TERMINAL</span>
            <span className="px-4 text-muted-foreground hover:text-foreground cursor-pointer transition-colors">DOCS_V2</span>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="hidden sm:flex flex-col items-end text-xs font-mono">
            <span className="text-muted-foreground">LATENCY_MS</span>
            <span className="text-foreground">1.2043</span>
          </div>
          <button
            onClick={() => navigate("/agents")}
            className="bg-primary text-primary-foreground px-5 py-2 text-sm font-mono tracking-wider hover:opacity-90 transition-opacity"
          >
            INITIALIZE
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
