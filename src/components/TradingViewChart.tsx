import { useEffect, useRef } from "react";
import { createChart, ColorType, CandlestickSeries, HistogramSeries, type IChartApi } from "lightweight-charts";

interface TradingViewChartProps {
  symbol?: string;
  height?: number;
  fillHeight?: boolean;
}

// Generate realistic-looking candlestick data
const generateCandleData = () => {
  const data = [];
  let basePrice = 98000;
  const now = new Date();
  const startDate = new Date(now);
  startDate.setDate(startDate.getDate() - 90);

  for (let i = 0; i < 90; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);

    const volatility = 800 + Math.random() * 1200;
    const direction = Math.random() > 0.45 ? 1 : -1;
    const open = basePrice;
    const close = open + direction * (Math.random() * volatility);
    const high = Math.max(open, close) + Math.random() * volatility * 0.5;
    const low = Math.min(open, close) - Math.random() * volatility * 0.5;

    data.push({
      time: `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`,
      open: Math.round(open * 100) / 100,
      high: Math.round(high * 100) / 100,
      low: Math.round(low * 100) / 100,
      close: Math.round(close * 100) / 100,
    });

    basePrice = close + (Math.random() - 0.4) * 300;
  }

  return data;
};

const generateVolumeData = (candles: ReturnType<typeof generateCandleData>) =>
  candles.map((c) => ({
    time: c.time,
    value: Math.round(Math.random() * 50000 + 10000),
    color: c.close >= c.open ? "rgba(38, 166, 91, 0.3)" : "rgba(239, 83, 80, 0.3)",
  }));

const TradingViewChart = ({ symbol = "BTC", height = 140, fillHeight = false }: TradingViewChartProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const chartHeight = fillHeight ? containerRef.current.clientHeight : height;
    const chart = createChart(containerRef.current, {
      height: chartHeight,
      layout: {
        background: { type: ColorType.Solid, color: "transparent" },
        textColor: "rgba(255, 255, 255, 0.5)",
        fontSize: 9,
      },
      grid: {
        vertLines: { color: "rgba(255, 255, 255, 0.04)" },
        horzLines: { color: "rgba(255, 255, 255, 0.04)" },
      },
      crosshair: {
        vertLine: { color: "rgba(255, 255, 255, 0.15)", width: 1, style: 2 },
        horzLine: { color: "rgba(255, 255, 255, 0.15)", width: 1, style: 2 },
      },
      rightPriceScale: {
        borderColor: "rgba(255, 255, 255, 0.08)",
        scaleMargins: { top: 0.1, bottom: 0.2 },
      },
      timeScale: {
        borderColor: "rgba(255, 255, 255, 0.08)",
        timeVisible: false,
      },
      handleScale: false,
      handleScroll: false,
    });

    const candleSeries = chart.addSeries(CandlestickSeries, {
      upColor: "#26a65b",
      downColor: "#ef5350",
      borderUpColor: "#26a65b",
      borderDownColor: "#ef5350",
      wickUpColor: "#26a65b",
      wickDownColor: "#ef5350",
    });

    const candles = generateCandleData();
    candleSeries.setData(candles as any);

    const volumeSeries = chart.addSeries(HistogramSeries, {
      priceFormat: { type: "volume" },
      priceScaleId: "",
    });

    volumeSeries.priceScale().applyOptions({
      scaleMargins: { top: 0.8, bottom: 0 },
    });

    volumeSeries.setData(generateVolumeData(candles) as any);

    chart.timeScale().fitContent();
    chartRef.current = chart;

    return () => {
      chart.remove();
      chartRef.current = null;
    };
  }, [symbol, height, fillHeight]);

  useEffect(() => {
    if (!fillHeight || !containerRef.current || !chartRef.current) return;
    const ro = new ResizeObserver(() => {
      if (containerRef.current && chartRef.current) {
        chartRef.current.resize(containerRef.current.clientWidth, containerRef.current.clientHeight);
      }
    });
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, [fillHeight]);

  return <div ref={containerRef} className={`w-full ${fillHeight ? "h-full" : ""}`} />;
};

export default TradingViewChart;
