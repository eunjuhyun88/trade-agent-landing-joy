const features = [
  {
    id: "01",
    label: "ARCHITECTURE",
    description: "Moving beyond reactive indicators into deterministic state transitions. We don't guess price; we map possibilities.",
  },
  {
    id: "02",
    label: "LATENCY",
    description: "Sub-millisecond data ingestion across 40+ decentralized exchanges and perpetual markets simultaneously.",
  },
  {
    id: "03",
    label: "EXECUTION",
    description: "Autonomous agent coordination for risk-adjusted entry and exit based on multi-vector sentiment analysis.",
  },
];

const FeaturesGrid = () => {
  return (
    <section className="px-6 md:px-12 py-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-border pt-8">
        {features.map((f) => (
          <div key={f.id} className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono tracking-wider">
              <span className="text-accent">{f.id}</span>
              <span className="text-accent">/ {f.label}</span>
            </div>
            <p className="text-sm leading-relaxed text-foreground max-w-sm">{f.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesGrid;
