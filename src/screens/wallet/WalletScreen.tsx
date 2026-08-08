import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, radii, spacing } from '../../theme/colors';
import { type } from '../../theme/typography';
import { coins, portfolio } from '../../data/mockData';
import { gxtToken, assetActions } from '../../data/liveAppMockData';
import { CoinIcon } from '../../components/CoinIcon';
import { UnderlineTabs } from '../../components/UnderlineTabs';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { AssetsStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<AssetsStackParamList, 'AssetsHome'>;

const topTabs = ['Overview', 'Funding', 'Trading', 'Futures'] as const;
const subTabs = ['Coin', 'Account', 'Ongoing'] as const;

const assetList = [
  { id: 'gxt', symbol: gxtToken.symbol, priceLabel: `$${gxtToken.price}`, balance: gxtToken.balance, usdValue: 49.49, color: gxtToken.color },
  { id: 'usdt', symbol: 'USDT', priceLabel: '$1', balance: 0.5, usdValue: 0.5, color: '#26A17B' },
  { id: 'bnb', symbol: 'BNB', priceLabel: '$591.92', balance: 0, usdValue: 0, color: '#F3BA2F' },
  { id: 'btc', symbol: 'BTC', priceLabel: '$64,729.38', balance: 0, usdValue: 0, color: '#F7931A' },
  { id: 'eth', symbol: 'ETH', priceLabel: '$1,910.39', balance: 0, usdValue: 0, color: '#8C9EFF' },
  { id: 'sol', symbol: 'SOL', priceLabel: '$73.38', balance: 0, usdValue: 0, color: '#14F195' },
  { id: 'usdc', symbol: 'USDC', priceLabel: '$1', balance: 0, usdValue: 0, color: '#2775CA' },
];

export const WalletScreen: React.FC<Props> = ({ navigation }) => {
  const [topTab, setTopTab] = useState<(typeof topTabs)[number]>('Overview');
  const [subTab, setSubTab] = useState<(typeof subTabs)[number]>('Coin');

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={{ paddingHorizontal: spacing.lg, paddingTop: spacing.sm }}>
        <UnderlineTabs options={[...topTabs]} value={topTab} onChange={(v) => setTopTab(v as any)} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        <View style={styles.totalRow}>
          <View style={{ flex: 1 }}>
            <View style={styles.totalLabelRow}>
              <Text style={styles.totalLabel}>Total Assets</Text>
              <Ionicons name="eye-outline" size={14} color={colors.textSecondary} />
            </View>
            <Text style={styles.totalValue}>${portfolio.totalBalanceUsd.toFixed(2).slice(0, 5)}</Text>
            <View style={styles.btcRow}>
              <Text style={styles.btcValue}>≈ 0.00077227 BTC</Text>
              <Ionicons name="chevron-down" size={13} color={colors.textSecondary} />
            </View>
          </View>
          <LinearGradient
            colors={['rgba(59,213,254,0)', 'rgba(59,213,254,0.35)']}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={styles.miniChart}
          />
        </View>

        <View style={styles.actionsRow}>
          {assetActions.map((a) => (
            <Pressable
              key={a.key}
              style={styles.actionItem}
              onPress={() => {
                if (a.key === 'deposit') {
                  navigation.navigate('Deposit');
                } else {
                  const tabMap: Record<string, 'Transfer' | 'Send' | 'Withdraw' | 'History'> = {
                    send: 'Send',
                    withdraw: 'Withdraw',
                    transfer: 'Transfer',
                    history: 'History',
                  };
                  navigation.navigate('WalletFlow', { tab: tabMap[a.key] });
                }
              }}
            >
              <View style={styles.actionCircle}>
                <Ionicons name={a.icon as any} size={20} color={colors.textPrimary} />
              </View>
              <Text style={styles.actionLabel}>{a.label}</Text>
            </Pressable>
          ))}
        </View>

        <View style={styles.subTabsRow}>
          <UnderlineTabs options={[...subTabs]} value={subTab} onChange={(v) => setSubTab(v as any)} />
          <View style={{ flex: 1 }} />
          <Ionicons name="options-outline" size={17} color={colors.textSecondary} style={{ marginRight: spacing.sm }} />
          <Ionicons name="information-circle-outline" size={17} color={colors.textSecondary} />
              </View>

        <View style={styles.listCard}>
          {assetList.map((a, i) => (
            <View key={a.id} style={[styles.row, i !== assetList.length - 1 && styles.rowBorder]}>
              <CoinIcon symbol={a.symbol} color={a.color} size={34} />
              <View style={styles.identity}>
                <Text style={styles.symbol}>{a.symbol}</Text>
                <Text style={styles.priceLabel}>{a.priceLabel}</Text>
              </View>
              <View style={{ alignItems: 'flex-end' }}>
                <Text style={styles.balance}>
                  {a.balance === 0 ? '0' : a.balance.toLocaleString(undefined, { maximumFractionDigits: 8 })}
                </Text>
                <Text style={styles.usdValue}>${a.usdValue.toFixed(2)}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  scroll: { paddingBottom: 100 },
  totalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    marginTop: spacing.lg,
  },
  totalLabelRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  totalLabel: { fontSize: 13, color: colors.textSecondary },
  totalValue: { fontSize: 32, fontWeight: '600', color: colors.textPrimary, marginTop: 1 },
  btcRow: { flexDirection: 'row', alignItems: 'center', gap: 2, marginTop: 1 },
  btcValue: { fontSize: 12, color: colors.textSecondary },
  miniChart: { width: 96, height: 45, borderRadius: radii.xs, marginTop: 4 },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    marginTop: spacing.xl,
  },
  actionItem: { alignItems: 'center', gap: 8, width: 56 },
  actionCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionLabel: { fontSize: 11.5, color: colors.textSecondary, fontWeight: '600' },
  subTabsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    marginTop: spacing.xl,
  },
  listCard: {
    marginHorizontal: spacing.lg,
    marginTop: spacing.sm,
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    paddingHorizontal: spacing.md,
  },
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, paddingVertical: spacing.sm + 3 },
  rowBorder: { borderBottomWidth: 1, borderBottomColor: colors.borderSubtle },
  identity: { flex: 1 },
  symbol: { ...type.bodyMedium, color: colors.textPrimary, fontWeight: '700' },
  priceLabel: { fontSize: 12, color: colors.textTertiary, marginTop: 2 },
  balance: { ...type.bodyMedium, color: colors.textPrimary, fontWeight: '700' },
  usdValue: { fontSize: 12, color: colors.textTertiary, marginTop: 2 },
});
