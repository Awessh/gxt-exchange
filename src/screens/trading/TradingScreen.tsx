import React, { useMemo, useState } from 'react';
import {
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, radii, spacing } from '../../theme/colors';
import { type } from '../../theme/typography';
import { coins } from '../../data/mockData';
import { CoinIcon } from '../../components/CoinIcon';
import { ChangeBadge } from '../../components/ChangeBadge';
import { CandlestickChart, generateCandles } from '../../components/CandlestickChart';
import { Button } from '../../components/Button';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { MainTabParamList } from '../../navigation/types';
import type { MarketsStackParamList } from '../../navigation/types';

//type Props = NativeStackScreenProps<MarketsStackParamList, 'Trading'>;
type Props = BottomTabScreenProps<MainTabParamList, 'Trading'>;

const timeframes = ['1H', '4H', '1D', '1W'];
const orderTypes = ['Market', 'Limit', 'Stop'];

export const TradingScreen: React.FC<Props> = ({ route, navigation }) => {
  const coinId = route.params?.coinId ?? 'btc';
  const coin = coins.find((c) => c.id === coinId) ?? coins[0];

  const [side, setSide] = useState<'buy' | 'sell'>('buy');
  const [orderType, setOrderType] = useState('Market');
  const [timeframe, setTimeframe] = useState('1D');
  const [amount, setAmount] = useState('');

  const candles = useMemo(() => generateCandles(coin.price), [coin.id]);
  const width = Dimensions.get('window').width - spacing.lg * 2;
  const availableUsd = 12480.32;
  const positive = coin.change24h >= 0;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: spacing.xxl }}>
        <View style={styles.header}>
          <Pressable onPress={() => navigation.goBack()} hitSlop={10}>
            <Ionicons name="arrow-back" size={22} color={colors.textPrimary} />
          </Pressable>
          <View style={styles.pairRow}>
            <CoinIcon symbol={coin.symbol} color={coin.color} size={28} />
            <Text style={styles.pairText}>{coin.symbol}/USDT</Text>
          </View>
          <Pressable hitSlop={10}>
            <Ionicons name="star-outline" size={20} color={colors.textTertiary} />
          </Pressable>
        </View>

        <View style={styles.priceRow}>
          <Text style={[styles.price, { color: positive ? colors.positive : colors.negative }]}>
            ${coin.price.toLocaleString(undefined, { maximumFractionDigits: 2 })}
          </Text>
          <ChangeBadge value={coin.change24h} size="md" />
        </View>
        <Text style={styles.priceUsd}>≈ ${coin.price.toFixed(2)} USD</Text>

        <View style={styles.timeframeRow}>
          {timeframes.map((tf) => (
            <Pressable key={tf} onPress={() => setTimeframe(tf)} style={[styles.tfChip, timeframe === tf && styles.tfChipActive]}>
              <Text style={[styles.tfText, timeframe === tf && styles.tfTextActive]}>{tf}</Text>
            </Pressable>
          ))}
        </View>

        <View style={styles.chartWrap}>
          <CandlestickChart candles={candles} width={width} height={220} />
        </View>

        {/* Order panel */}
        <View style={styles.orderPanel}>
          <View style={styles.sideToggle}>
            <Pressable
              style={[styles.sideBtn, side === 'buy' && styles.sideBtnBuyActive]}
              onPress={() => setSide('buy')}
            >
              <Text style={[styles.sideText, side === 'buy' && { color: colors.textOnBrand }]}>Buy</Text>
            </Pressable>
            <Pressable
              style={[styles.sideBtn, side === 'sell' && styles.sideBtnSellActive]}
              onPress={() => setSide('sell')}
            >
              <Text style={[styles.sideText, side === 'sell' && { color: colors.white }]}>Sell</Text>
            </Pressable>
          </View>

          <View style={styles.orderTypeRow}>
            {orderTypes.map((t) => (
              <Pressable key={t} onPress={() => setOrderType(t)} style={[styles.orderTypeChip, orderType === t && styles.orderTypeChipActive]}>
                <Text style={[styles.orderTypeText, orderType === t && styles.orderTypeTextActive]}>{t}</Text>
              </Pressable>
            ))}
          </View>

          <Text style={styles.fieldLabel}>Amount ({coin.symbol})</Text>
          <View style={styles.amountRow}>
            <TextInput
              value={amount}
              onChangeText={setAmount}
              placeholder="0.00"
              placeholderTextColor={colors.textTertiary}
              keyboardType="decimal-pad"
              style={styles.amountInput}
            />
            <Pressable style={styles.maxBtn} onPress={() => setAmount('0.42')}>
              <Text style={styles.maxBtnText}>MAX</Text>
            </Pressable>
          </View>

          <View style={styles.balanceRow}>
            <Text style={styles.balanceLabel}>Available balance</Text>
            <Text style={styles.balanceValue}>${availableUsd.toLocaleString()}</Text>
          </View>

          <Button
            label={`${side === 'buy' ? 'Buy' : 'Sell'} ${coin.symbol}`}
            variant={side === 'buy' ? 'primary' : 'danger'}
            style={{ marginTop: spacing.md }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  pairRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs },
  pairText: { ...type.h3, color: colors.textPrimary, fontWeight: '700' },
  priceRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, paddingHorizontal: spacing.lg, marginTop: spacing.xs },
  price: { ...type.display, fontWeight: '800' },
  priceUsd: { ...type.caption, color: colors.textTertiary, paddingHorizontal: spacing.lg, marginTop: 2 },
  timeframeRow: { flexDirection: 'row', gap: spacing.xs, paddingHorizontal: spacing.lg, marginTop: spacing.md },
  tfChip: { paddingHorizontal: spacing.sm, paddingVertical: 6, borderRadius: radii.pill },
  tfChipActive: { backgroundColor: colors.brandGlow },
  tfText: { ...type.caption, color: colors.textTertiary, fontWeight: '700' },
  tfTextActive: { color: colors.brand },
  chartWrap: {
    marginHorizontal: spacing.lg,
    marginTop: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    padding: spacing.sm,
  },
  orderPanel: {
    marginHorizontal: spacing.lg,
    marginTop: spacing.lg,
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    padding: spacing.md,
  },
  sideToggle: {
    flexDirection: 'row',
    backgroundColor: colors.surfaceHigh,
    borderRadius: radii.md,
    padding: 4,
  },
  sideBtn: { flex: 1, alignItems: 'center', paddingVertical: 10, borderRadius: radii.sm },
  sideBtnBuyActive: { backgroundColor: colors.positive },
  sideBtnSellActive: { backgroundColor: colors.negative },
  sideText: { ...type.bodySemiBold, color: colors.textSecondary, fontWeight: '700' },
  orderTypeRow: { flexDirection: 'row', gap: spacing.xs, marginTop: spacing.md },
  orderTypeChip: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 6,
    borderRadius: radii.pill,
    borderWidth: 1,
    borderColor: colors.border,
  },
  orderTypeChipActive: { borderColor: colors.brand, backgroundColor: colors.brandGlow },
  orderTypeText: { ...type.caption, color: colors.textSecondary, fontWeight: '600' },
  orderTypeTextActive: { color: colors.brand },
  fieldLabel: { ...type.caption, color: colors.textSecondary, marginTop: spacing.md, marginBottom: 6, fontWeight: '600' },
  amountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceHigh,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.sm,
    height: 50,
  },
  amountInput: { flex: 1, color: colors.textPrimary, ...type.h3 },
  maxBtn: { paddingHorizontal: spacing.xs, paddingVertical: 4, backgroundColor: colors.brandGlow, borderRadius: radii.xs },
  maxBtnText: { ...type.caption, color: colors.brand, fontWeight: '800' },
  balanceRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: spacing.sm },
  balanceLabel: { ...type.caption, color: colors.textTertiary },
  balanceValue: { ...type.caption, color: colors.textSecondary, fontWeight: '600' },
});
