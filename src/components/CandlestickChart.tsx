import React, { useMemo } from 'react';
import { View } from 'react-native';
import Svg, { Line, Rect, Path, Defs, LinearGradient as SvgGradient, Stop } from 'react-native-svg';
import { colors } from '../theme/colors';

export type Candle = { open: number; high: number; low: number; close: number };

interface CandlestickChartProps {
  candles: Candle[];
  width: number;
  height: number;
}

// Deterministic pseudo-random candle generator so the chart looks alive
// without a backend — seeded off basePrice for stable renders per coin.
export function generateCandles(basePrice: number, count = 40): Candle[] {
  let price = basePrice * 0.97;
  const candles: Candle[] = [];
  let seed = Math.floor(basePrice * 1000) % 9973;
  const rand = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
  for (let i = 0; i < count; i++) {
    const open = price;
    const volatility = basePrice * 0.012;
    const close = open + (rand() - 0.48) * volatility;
    const high = Math.max(open, close) + rand() * volatility * 0.6;
    const low = Math.min(open, close) - rand() * volatility * 0.6;
    candles.push({ open, high, low, close });
    price = close;
  }
  return candles;
}

export const CandlestickChart: React.FC<CandlestickChartProps> = ({ candles, width, height }) => {
  const { bars, min, max } = useMemo(() => {
    const highs = candles.map((c) => c.high);
    const lows = candles.map((c) => c.low);
    return { bars: candles, min: Math.min(...lows), max: Math.max(...highs) };
  }, [candles]);

  const range = max - min || 1;
  const padding = 8;
  const chartH = height - padding * 2;
  const gap = 3;
  const barWidth = Math.max(2, width / bars.length - gap);

  const yFor = (v: number) => padding + chartH - ((v - min) / range) * chartH;

  const closingLine = bars
    .map((c, i) => `${i === 0 ? 'M' : 'L'} ${i * (barWidth + gap) + barWidth / 2} ${yFor(c.close)}`)
    .join(' ');

  return (
    <Svg width={width} height={height}>
      <Defs>
        <SvgGradient id="chartFade" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor={colors.brand} stopOpacity={0.12} />
          <Stop offset="1" stopColor={colors.brand} stopOpacity={0} />
        </SvgGradient>
      </Defs>
      {bars.map((c, i) => {
        const up = c.close >= c.open;
        const x = i * (barWidth + gap);
        const color = up ? colors.positive : colors.negative;
        const bodyTop = yFor(Math.max(c.open, c.close));
        const bodyBottom = yFor(Math.min(c.open, c.close));
        return (
          <React.Fragment key={i}>
            <Line
              x1={x + barWidth / 2}
              x2={x + barWidth / 2}
              y1={yFor(c.high)}
              y2={yFor(c.low)}
              stroke={color}
              strokeWidth={1}
            />
            <Rect
              x={x}
              y={bodyTop}
              width={barWidth}
              height={Math.max(1.5, bodyBottom - bodyTop)}
              fill={color}
              rx={1}
            />
          </React.Fragment>
        );
      })}
      <Path d={closingLine} stroke={colors.brand} strokeOpacity={0.25} strokeWidth={1} fill="none" />
    </Svg>
  );
};
