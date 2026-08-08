import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, spacing } from '../theme/colors';
import type { OrderBookRow } from '../data/liveAppMockData';

interface OrderBookProps {
  asks: OrderBookRow[];
  bids: OrderBookRow[];
  midPrice: number;
  quoteDecimals?: number;
  baseSymbol: string;
  positive: boolean;
}

const Row: React.FC<{ row: OrderBookRow; color: string; decimals: number; fillSide: 'left' | 'right' }> = ({
  row,
  color,
  decimals,
  fillSide,
}) => {
  // Depth-fill bar width is derived from amount, capped for visual variety without a real book.
  const fillPct = Math.min(92, 14 + row.amount * 14);
  return (
    <View style={styles.rowWrap}>
      <View
        style={[
          styles.fillBar,
          fillSide === 'left' ? { right: 0, width: `${fillPct}%` } : { left: 0, width: `${fillPct}%` },
          { backgroundColor: color },
        ]}
      />
      <Text style={[styles.priceText, { color }]}>{row.price.toFixed(decimals)}</Text>
      <Text style={styles.amountText}>{row.amount.toFixed(4)}</Text>
    </View>
  );
};

export const OrderBook: React.FC<OrderBookProps> = ({ asks, bids, midPrice, quoteDecimals = 2, baseSymbol, positive }) => {
  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.headerText}>Price (USDT)</Text>
        <Text style={styles.headerText}>Total ({baseSymbol})</Text>
      </View>
      {asks.map((r, i) => (
        <Row key={`a${i}`} row={r} color={colors.negative} decimals={quoteDecimals} fillSide="left" />
      ))}
      <View style={styles.midRow}>
        <Text style={[styles.midPrice, { color: positive ? colors.positive : colors.negative }]}>
          {midPrice.toLocaleString(undefined, { minimumFractionDigits: quoteDecimals, maximumFractionDigits: quoteDecimals })}
        </Text>
      </View>
      {bids.map((r, i) => (
        <Row key={`b${i}`} row={r} color={colors.positive} decimals={quoteDecimals} fillSide="left" />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: spacing.xs },
  headerText: { fontSize: 11, color: colors.textTertiary },
  rowWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 3,
    position: 'relative',
  },
  fillBar: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    opacity: 0.1,
  },
  priceText: { fontSize: 13, fontWeight: '600', zIndex: 1 },
  amountText: { fontSize: 13, color: colors.textSecondary, zIndex: 1 },
  midRow: { paddingVertical: spacing.xs, alignItems: 'flex-start' },
  midPrice: { fontSize: 22, fontWeight: '800' },
});
