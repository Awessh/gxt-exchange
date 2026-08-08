import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View, Pressable, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, radii, spacing } from '../../theme/colors';
import { type } from '../../theme/typography';
import { coins, portfolio } from '../../data/mockData';
import { presale, homeActionGrid } from '../../data/liveAppMockData';
import { ChangeBadge } from '../../components/ChangeBadge';
import { CoinIcon } from '../../components/CoinIcon';
import { IconAction } from '../../components/IconAction';
import { SegmentTabs } from '../../components/SegmentTabs';
import { UnderlineTabs } from '../../components/UnderlineTabs';
import { DepositButton } from '../../components/DepositButton';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { MainTabParamList } from '../../navigation/types';
import { LinearGradient } from 'expo-linear-gradient';

type Props = BottomTabScreenProps<MainTabParamList, 'Home'>;

const marketTabs = ['Hot', 'Gainers', 'Losers', 'New'] as const;

export const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const [book, setBook] = useState<'Spot' | 'Futures'>('Spot');
  const [marketTab, setMarketTab] = useState<(typeof marketTabs)[number]>('Hot');
  const positive = portfolio.todayChangeUsd >= 0;

  const listed =
    marketTab === 'Gainers'
      ? [...coins].sort((a, b) => b.change24h - a.change24h)
      : marketTab === 'Losers'
      ? [...coins].sort((a, b) => a.change24h - b.change24h)
      : marketTab === 'New'
      ? [...coins].slice().reverse()
      : coins;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Top bar */}
      <View style={styles.topBar}>
        <Pressable
          onPress={() => navigation.navigate('Profile')}
        >
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>A</Text>
          </View>
        </Pressable>
        <Pressable style={styles.topIconBtn}>
          <Ionicons name="notifications-outline" size={20} color={colors.textPrimary} />
        </Pressable>
        <View style={{ flex: 1 }} />
        <Pressable style={styles.topIconBtn}>
          <Ionicons name="headset-outline" size={20} color={colors.textPrimary} />
        </Pressable>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        <View style={{ paddingHorizontal: spacing.lg }}>
          <SegmentTabs options={['Spot', 'Futures']} value={book} onChange={(v) => setBook(v as any)} />
        </View>

        {/* Search */}
        <View style={styles.searchWrap}>
          <Ionicons name="search-outline" size={18} color={colors.textTertiary} />
          <TextInput
            placeholder="Search spot pairs..."
            placeholderTextColor={colors.textTertiary}
            style={styles.searchInput}
          />
        </View>

        {/* Total assets */}
        <View style={styles.assetsRow}>
          <View style={{ flex: 1 }}>
            <Text style={styles.assetsLabel}>Total Assets (USD)</Text>
            <Text style={styles.assetsValue}>${portfolio.totalBalanceUsd.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')}</Text>
            <Text style={styles.assetsBtc}>≈ 0.00077251 BTC</Text>
            <View style={styles.pnlRow}>
              <Text style={[styles.pnlText, { color: positive ? colors.positive : colors.negative }]}>
                PNL · {positive ? '+' : ''}${portfolio.todayChangeUsd.toFixed(2)} ({positive ? '+' : ''}
                {portfolio.todayChangePercent.toFixed(2)}%) 1D
              </Text>
              <Ionicons name="chevron-up" size={14} color={colors.textTertiary} />
            </View>
          </View>
          <DepositButton label="Deposit" size="md" fullWidth={false} variant="secondary" style={styles.depositBtn} textColor={colors.textOnBrand} />
        </View>

        {/* Presale banner */}
        <Pressable style={styles.presaleCard}>
          <LinearGradient
            colors={['rgba(59, 161, 198, 0.55)', 'rgba(19, 57, 71, 0.25)', '#0A0A0A']}
            locations={[0, 0.25, 0.55, 1]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={styles.linearGrad}
          >
            <View style={styles.presaleTop}>
              <View style={styles.presaleDot} />
              <Text style={styles.presaleTitle}>GXT Presale {presale.stage} · {presale.status}</Text>
            </View>
            <View style={styles.presaleBottom}>
              <View>
                <Text style={styles.presalePrice}>
                  <Text style={styles.presaleInitial}>${presale.price.toFixed(2)}</Text> <Text style={styles.presaleArrow}>→ listing</Text> ${presale.listingPrice.toFixed(2)}
                </Text>
                <View style={styles.bonusPill}>
                  <Text style={styles.bonusText}>
                      Buy ${presale.bonusThresholdUsd}+ get +{presale.bonusPercent}% bonus
                  </Text>
                </View>
              </View>
              <View style={styles.buyNowBtn}>
                <Text style={styles.buyNowText}>Buy now</Text>
                <Ionicons name="arrow-forward" size={14} color={colors.black} />
              </View>
            </View>
          </LinearGradient>
        </Pressable>

        {/* Action grid */}
        <View style={styles.grid}>
          {homeActionGrid.map((a) => (
            <IconAction
              key={a.key}
              icon={a.icon as any}
              label={a.label}
              tag={a.tag}
              style={styles.gridItem}
            />
          ))}
        </View>

        {/* Market tabs */}
        <View style={{ marginTop: spacing.lg }}>
          <UnderlineTabs options={[...marketTabs]} value={marketTab} onChange={(v) => setMarketTab(v as any)} scrollable />
        </View>

        <View style={styles.listWrap}>
          {listed.map((c, i) => (
            <Pressable
              key={c.id}
              style={[styles.coinRow, i === listed.length - 1 && styles.coinRowLast]}
              onPress={() => navigation.navigate('Trade', { coinId: c.id })}
            >
              <CoinIcon symbol={c.symbol} color={c.color} size={34} />
              <View style={styles.coinIdentity}>
                <Text style={styles.coinSymbol}>{c.symbol}/USDT</Text>
                <Text style={styles.coinVol}>Vol {(c.price * 3.2).toFixed(0)}M</Text>
              </View>
              <View style={{ alignItems: 'flex-end' }}>
                <Text style={styles.coinPrice}>
                  {c.price.toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 2 })}
                </Text>
                <Text style={[styles.coinChange, { color: c.change24h >= 0 ? colors.positive : colors.negative }]}>
                  {c.change24h >= 0 ? '+' : ''}
                  {c.change24h.toFixed(2)}%
                </Text>
          </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  scroll: { paddingBottom: 100 },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    gap: spacing.sm,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.brand,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { color: colors.black, fontWeight: '800', fontSize: 15 },
  topIconBtn: { padding: 4 },
  searchWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radii.pill,
    marginHorizontal: spacing.lg,
    marginTop: spacing.sm,
    paddingHorizontal: spacing.md,
    height: 44,
    gap: spacing.xs,
  },
  searchInput: { flex: 1, color: colors.textPrimary, ...type.body },
  assetsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    marginTop: spacing.lg,
  },
  assetsLabel: { ...type.caption, color: colors.textTertiary },
  assetsValue: { fontSize: 28, fontWeight: '600', color: colors.textPrimary, marginTop: 4 },
  assetsBtc: { ...type.caption, color: colors.textSecondary, marginTop: 2 },
  pnlRow: { flexDirection: 'row', alignItems: 'center', gap: 2, marginTop: spacing.xs },
  pnlText: { ...type.caption, fontWeight: '700' },
  depositBtn: {
    backgroundColor: colors.white,
    color: colors.textOnBrand,
    borderWidth: 0,
    borderRadius: radii.pill,
    paddingHorizontal: spacing.lg,
  },
  presaleCard: {
    marginHorizontal: spacing.lg,
    marginTop: spacing.lg,
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.brandDim,
    gap: spacing.sm,
  },
  linearGrad: {
    padding: spacing.md,
    borderRadius: radii.lg,
  },
  presaleTop: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  presaleDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: colors.brand },
  presaleTitle: { ...type.caption, color: colors.textPrimary, fontWeight: '600' },
  presaleBottom: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  presalePrice: { fontSize: 13, color: colors.textPrimary, fontWeight: '600' },
  presaleInitial: { color: colors.brand, fontWeight: '600' },
  presaleArrow: { color: colors.textSecondary },
  bonusPill: {
    backgroundColor: colors.surfaceBrand,
    borderRadius: radii.pill,
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
    marginTop: 6,
    alignSelf: 'flex-start',
  },
  bonusText: { fontSize: 11, color: colors.brand, fontWeight: '600' },
  buyNowBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.brand,
    borderRadius: radii.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: 10,
  },
  buyNowText: { color: colors.black, fontWeight: '600', fontSize: 13 },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: spacing.lg,
    marginTop: spacing.lg,
    rowGap: spacing.md,
  },
  gridItem: {
    width: '25%',
  },
  listWrap: { 
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.lg, 
    marginTop: spacing.sm,
    marginHorizontal: spacing.lg,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
  },
  coinRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.sm + 2,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderSubtle,
  },
  coinRowLast: {
    borderBottomWidth: 0,
  },
  coinIdentity: { flex: 1 },
  coinSymbol: { ...type.bodyMedium, color: colors.textPrimary, fontWeight: '700' },
  coinVol: { ...type.caption, color: colors.textTertiary, marginTop: 2, fontSize: 12 },
  coinPrice: { ...type.bodyMedium, color: colors.textPrimary, fontWeight: '700' },
  coinChange: { fontSize: 13, fontWeight: '700', marginTop: 2 },
});
