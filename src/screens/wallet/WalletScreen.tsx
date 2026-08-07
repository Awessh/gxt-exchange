import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, radii, spacing } from '../../theme/colors';
import { type } from '../../theme/typography';
import { coins, portfolio, transactions } from '../../data/mockData';
import { ScreenHeader, SectionHeader } from '../../components/Headers';
import { CoinListItem } from '../../components/CoinListItem';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';

const txIcon: Record<string, keyof typeof Ionicons.glyphMap> = {
  deposit: 'arrow-down-circle-outline',
  withdraw: 'arrow-up-circle-outline',
  buy: 'add-circle-outline',
  sell: 'remove-circle-outline',
  transfer: 'swap-horizontal-outline',
};

export const WalletScreen: React.FC = () => {
  const heldCoins = coins.filter((c) => (c.balance ?? 0) > 0);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScreenHeader title="Wallet" subtitle="Manage your assets" />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        <Card style={styles.totalCard}>
          <Text style={styles.totalLabel}>Estimated total value</Text>
          <Text style={styles.totalValue}>${portfolio.totalBalanceUsd.toLocaleString(undefined, { maximumFractionDigits: 2 })}</Text>
          <View style={styles.actionsRow}>
            <Button label="Deposit" size="sm" icon={<Ionicons name="arrow-down" size={14} color={colors.textOnBrand} />} style={{ flex: 1 }} />
            <Button label="Withdraw" size="sm" variant="secondary" icon={<Ionicons name="arrow-up" size={14} color={colors.textPrimary} />} style={{ flex: 1 }} />
            <Button label="Transfer" size="sm" variant="secondary" icon={<Ionicons name="swap-horizontal" size={14} color={colors.textPrimary} />} style={{ flex: 1 }} />
          </View>
        </Card>

        <View style={styles.section}>
          <SectionHeader title="Your assets" actionLabel="Hide small balances" />
          {heldCoins.map((c) => (
            <CoinListItem key={c.id} coin={c} showSparkline={false} showBalance />
          ))}
        </View>

        <View style={styles.section}>
          <SectionHeader title="Recent transactions" actionLabel="View all" />
          {transactions.map((tx) => (
            <View key={tx.id} style={styles.txRow}>
              <View style={styles.txIconWrap}>
                <Ionicons name={txIcon[tx.type]} size={18} color={colors.brand} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.txTitle}>
                  {tx.type.charAt(0).toUpperCase() + tx.type.slice(1)} {tx.coinSymbol}
                </Text>
                <Text style={styles.txDate}>
                  {new Date(tx.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })} · {tx.status}
                </Text>
              </View>
              <View style={{ alignItems: 'flex-end' }}>
                <Text style={styles.txAmount}>
                  {tx.type === 'withdraw' || tx.type === 'sell' ? '-' : '+'}
                  {tx.amount} {tx.coinSymbol}
                </Text>
                <Text style={styles.txUsd}>${tx.usdValue.toLocaleString()}</Text>
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
  scroll: { paddingHorizontal: spacing.lg, paddingBottom: spacing.xxl },
  totalCard: { alignItems: 'center', paddingVertical: spacing.lg, gap: spacing.md },
  totalLabel: { ...type.caption, color: colors.textTertiary },
  totalValue: { ...type.display, color: colors.textPrimary, fontWeight: '800' },
  actionsRow: { flexDirection: 'row', gap: spacing.sm, width: '100%', marginTop: spacing.xs },
  section: { marginTop: spacing.xl },
  txRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, paddingVertical: spacing.sm },
  txIconWrap: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.brandGlow,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txTitle: { ...type.bodyMedium, color: colors.textPrimary, fontWeight: '700' },
  txDate: { ...type.caption, color: colors.textTertiary, marginTop: 2, textTransform: 'capitalize' },
  txAmount: { ...type.numericSm, color: colors.textPrimary, fontWeight: '700' },
  txUsd: { ...type.caption, color: colors.textTertiary, marginTop: 2 },
});
