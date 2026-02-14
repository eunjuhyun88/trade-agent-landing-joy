const HeroSection = () => {
  return (
    <section className="pt-32 pb-16 px-6 md:px-12">
      <div className="mb-8 flex items-center gap-4">
        <span className="border border-foreground px-3 py-1 text-xs font-mono tracking-wider">EST_2024</span>
        <span className="text-xs font-mono tracking-wider text-muted-foreground">NON-CUSTODIAL STATE ANALYSIS ENGINE</span>
      </div>
      <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold leading-[0.9] tracking-tighter">
        NOT A CHART BOT.
        <br />
        A STATE MACHINE
        <br />
        <span className="text-accent">FOR THE MARKET.</span>
      </h1>
    </section>
  );
};

export default HeroSection;
