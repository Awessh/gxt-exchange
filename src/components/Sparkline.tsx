import React from 'react';
import { View } from 'react-native';
import Svg, { Polyline, Defs, LinearGradient as SvgGradient, Stop, Polygon } from 'react-native-svg';

interface SparklineProps {
  data: number[];
  width?: number;
  height?: number;
  color: string;
  filled?: boolean;
}

export const Sparkline: React.FC<SparklineProps> = ({
  data,
  width = 64,
  height = 28,
  color,
  filled = false,
}) => {
  if (!data || data.length < 2) return <View style={{ width, height }} />;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((v - min) / range) * height;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  });

  const polylinePoints = points.join(' ');
  const fillPoints = `0,${height} ${polylinePoints} ${width},${height}`;
  const gradId = `sparkfill-${color.replace('#', '')}`;

  return (
    <Svg width={width} height={height}>
      {filled && (
        <Defs>
          <SvgGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor={color} stopOpacity={0.35} />
            <Stop offset="1" stopColor={color} stopOpacity={0} />
          </SvgGradient>
        </Defs>
      )}
      {filled && <Polygon points={fillPoints} fill={`url(#${gradId})`} />}
      <Polyline
        points={polylinePoints}
        fill="none"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
