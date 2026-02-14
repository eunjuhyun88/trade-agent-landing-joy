const tickerData = "BLOCK_HEIGHT: 19827361 | GAS: 14 GWEI | SOL_PRICE: $142.22 | BTC_DOMINANCE: 52.4% | STATE_HASH: 0X44FF...A2 | TRADING_VOLUME_24H: $4.2B | LIQUIDATIONS_1H: $1.2M | SYSTEM_STABILITY: 99.98%";

const TickerBar = () => {
  return (
    <div className="bg-primary text-primary-foreground py-2.5 overflow-hidden">
      <div className="animate-ticker whitespace-nowrap flex">
        <span className="text-xs font-mono tracking-wider px-4">{tickerData}</span>
        <span className="text-xs font-mono tracking-wider px-4">{tickerData}</span>
      </div>
    </div>
  );
};

export default TickerBar;
