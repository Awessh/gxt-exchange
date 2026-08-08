import React, { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, radii, spacing } from '../../theme/colors';
import { type } from '../../theme/typography';
import { coins } from '../../data/mockData';
import { generateOrderBook } from '../../data/liveAppMockData';
import { OrderBook } from '../../components/OrderBook';
import { UnderlineTabs } from '../../components/UnderlineTabs';
import type { MarketsStackParamList } from '../../navigation/types';

type Props = {
  route: { params?: MarketsStackParamList['Trading'] }; 
  navigation: any;
};

const topTabs = ['Spot', 'Margin', 'Alpha', 'Trading Bot'] as const;
const orderTypeTabs = ['Limit', 'Market'] as const;
const bottomTabs = ['Open Orders (0)', 'Order History'] as const;
const sliderMarks = [0, 25, 50, 75, 100];

export const TradingScreen: React.FC<Props> = ({ route, navigation }) => {
  const coinId = route.params?.coinId ?? 'btc';
  const coin = coins.find((c) => c.id === coinId) ?? coins[0];

  const [topTab, setTopTab] = useState<(typeof topTabs)[number]>('Spot');
  const [side, setSide] = useState<'buy' | 'sell'>('buy');
  const [orderType, setOrderType] = useState<(typeof orderTypeTabs)[number]>('Limit');
  const [bottomTab, setBottomTab] = useState<(typeof bottomTabs)[number]>('Open Orders (0)');
  const [quantity, setQuantity] = useState('0');

  const decimals = coin.price >= 100 ? 2 : coin.price >= 1 ? 3 : 5;
  const { asks, bids } = useMemo(() => generateOrderBook(coin.price), [coin.id]);
  const positive = coin.change24h >= 0;
  const available = 0.5;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.topTabsRow}>
        <UnderlineTabs options={[...topTabs]} value={topTab} onChange={(v) => setTopTab(v as any)} scrollable />
        </View>

      <Pressable style={styles.pairHeader}>
        <View style={styles.pairIconWrap}>
          <Ionicons name="logo-bitcoin" size={20} color={coin.color} />
        </View>
        <Text style={styles.pairText}>{coin.symbol}/USDT</Text>
        <Text style={[styles.pairChange, { color: positive ? colors.positive : colors.negative }]}>
          {positive ? '+' : ''}
          {coin.change24h.toFixed(2)}%
        </Text>
        <Ionicons name="chevron-down" size={16} color={colors.textTertiary} />
        <View style={{ flex: 1 }} />
        <Ionicons name="bar-chart-outline" size={18} color={colors.textSecondary} style={styles.pairIcon} />
        <Ionicons name="cash-outline" size={18} color={colors.textSecondary} style={styles.pairIcon} />
        <Ionicons name="ellipsis-horizontal" size={18} color={colors.textSecondary} />
            </Pressable>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        <View style={styles.tradeGrid}>
          {/* Order book */}
          <View style={styles.bookCol}>
            <OrderBook asks={asks} bids={bids} midPrice={coin.price} quoteDecimals={decimals} baseSymbol={coin.symbol} positive={positive} />
        </View>

        {/* Order panel */}
          <View style={styles.panelCol}>
          <View style={styles.sideToggle}>
              <Pressable style={[styles.sideBtn, side === 'buy' && styles.sideBtnBuyActive]} onPress={() => setSide('buy')}>
                <Text style={[styles.sideText, side === 'buy' && styles.sideTextActiveBuy]}>Buy</Text>
            </Pressable>
              <Pressable style={[styles.sideBtn, side === 'sell' && styles.sideBtnSellActive]} onPress={() => setSide('sell')}>
                <Text style={[styles.sideText, side === 'sell' && styles.sideTextActiveSell]}>Sell</Text>
            </Pressable>
          </View>

          <View style={styles.orderTypeRow}>
              {orderTypeTabs.map((t) => (
                <Pressable key={t} onPress={() => setOrderType(t)}>
                <Text style={[styles.orderTypeText, orderType === t && styles.orderTypeTextActive]}>{t}</Text>
              </Pressable>
            ))}
          </View>

            <View style={styles.field}>
              <View style={styles.fieldLabelRow}>
                <Text style={styles.fieldLabel}>{orderType} (USDT)</Text>
                {orderType === 'Limit' && <Text style={styles.tickLabel}>tick 0s ago</Text>}
              </View>
              <Text style={styles.fieldValue}>{coin.price.toFixed(decimals)}</Text>
            </View>

            <View style={styles.field}>
              <Text style={styles.fieldLabel}>Quantity ({coin.symbol})</Text>
            <TextInput
                value={quantity}
                onChangeText={setQuantity}
              keyboardType="decimal-pad"
                style={styles.fieldInput}
                placeholderTextColor={colors.textTertiary}
            />
            </View>

            <View style={styles.sliderRow}>
              {sliderMarks.map((m) => (
                <View key={m} style={styles.sliderDiamond} />
              ))}
            </View>

            <View style={styles.miniRow}>
              <Text style={styles.miniLabel}>Total</Text>
              <Text style={styles.miniValue}>0.00 USDT</Text>
            </View>
            <View style={styles.miniRow}>
              <Text style={styles.miniLabel}>Fee</Text>
              <Text style={styles.miniValue}>M 0.08% · T 0.10% · min 5 USDT</Text>
            </View>
            <View style={styles.miniRow}>
              <Text style={styles.miniLabel}>Avail.</Text>
              <Text style={styles.miniValue}>
                {available.toFixed(2)} USDT <Text style={{ color: colors.brand }}>+</Text>
              </Text>
            </View>

            <Pressable style={[styles.submitBtn, { backgroundColor: side === 'buy' ? colors.positive : colors.negative }]}>
              <Text style={styles.submitText}>
                {side === 'buy' ? 'Buy' : 'Sell'} {coin.symbol}
              </Text>
            </Pressable>
          </View>
        </View>

        {/* Bottom orders panel */}
        <View style={styles.ordersSection}>
          <View style={styles.ordersTabsRow}>
            {bottomTabs.map((t) => (
              <Pressable key={t} onPress={() => setBottomTab(t)} style={styles.ordersTab}>
                <Text style={[styles.ordersTabText, bottomTab === t && styles.ordersTabTextActive]}>{t}</Text>
                {bottomTab === t && <View style={styles.ordersIndicator} />}
              </Pressable>
            ))}
          </View>
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>
              {bottomTab === 'Open Orders (0)' ? 'No open orders.' : 'No order history.'}
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  topTabsRow: { paddingHorizontal: spacing.lg, paddingTop: spacing.sm },
  pairHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    marginTop: spacing.xs,
  },
  pairIconWrap: { width: 22, height: 22, alignItems: 'center', justifyContent: 'center' },
  pairText: { ...type.h3, color: colors.textPrimary, fontWeight: '800' },
  pairChange: { fontSize: 13, fontWeight: '700', marginLeft: 2 },
  pairIcon: { marginLeft: spacing.md },
  tradeGrid: { flexDirection: 'row', paddingHorizontal: spacing.lg, gap: spacing.sm, marginTop: spacing.xs },
  bookCol: { flex: 1 },
  panelCol: { flex: 1.15, gap: spacing.sm },
  sideToggle: { flexDirection: 'row', gap: spacing.sm },
  sideBtn: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
    borderRadius: radii.sm,
    backgroundColor: colors.surface,
  },
  sideBtnBuyActive: { backgroundColor: colors.positive },
  sideBtnSellActive: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border },
  sideText: { fontSize: 14, fontWeight: '700', color: colors.textSecondary },
  sideTextActiveBuy: { color: colors.black },
  sideTextActiveSell: { color: colors.textPrimary },
  orderTypeRow: { flexDirection: 'row', gap: spacing.md, marginTop: 2 },
  orderTypeText: { fontSize: 13, color: colors.textTertiary, fontWeight: '600' },
  orderTypeTextActive: { color: colors.textPrimary, fontWeight: '700' },
  field: {
    backgroundColor: colors.surface,
    borderRadius: radii.sm,
    paddingHorizontal: spacing.sm,
    paddingVertical: 8,
  },
  fieldLabelRow: { flexDirection: 'row', justifyContent: 'space-between' },
  fieldLabel: { fontSize: 11, color: colors.textTertiary },
  tickLabel: { fontSize: 10, color: colors.textTertiary },
  fieldValue: { fontSize: 15, fontWeight: '700', color: colors.textPrimary, marginTop: 4 },
  fieldInput: { fontSize: 15, fontWeight: '700', color: colors.textPrimary, marginTop: 4, padding: 0 },
  sliderRow: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 2, marginTop: 2 },
  sliderDiamond: {
    width: 7,
    height: 7,
    backgroundColor: colors.surfaceHigh,
    borderWidth: 1,
    borderColor: colors.border,
    transform: [{ rotate: '45deg' }],
  },
  miniRow: { flexDirection: 'row', justifyContent: 'space-between' },
  miniLabel: { fontSize: 12, color: colors.textTertiary },
  miniValue: { fontSize: 12, color: colors.textSecondary, fontWeight: '600' },
  submitBtn: { borderRadius: radii.pill, alignItems: 'center', paddingVertical: 14, marginTop: spacing.xs },
  submitText: { fontSize: 15, fontWeight: '800', color: colors.black },
  ordersSection: { marginTop: spacing.lg, paddingHorizontal: spacing.lg },
  ordersTabsRow: { flexDirection: 'row', gap: spacing.lg, borderBottomWidth: 1, borderBottomColor: colors.borderSubtle },
  ordersTab: { paddingBottom: spacing.sm },
  ordersTabText: { fontSize: 13, color: colors.textTertiary, fontWeight: '600' },
  ordersTabTextActive: { color: colors.textPrimary, fontWeight: '700' },
  ordersIndicator: { height: 2, backgroundColor: colors.brand, marginTop: 6, borderRadius: 2 },
  emptyState: { alignItems: 'center', paddingVertical: spacing.xl },
  emptyText: { fontSize: 13, color: colors.textTertiary },
});
