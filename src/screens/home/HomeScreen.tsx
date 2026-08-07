import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, radii, shadow, spacing } from '../../theme/colors';
import { type } from '../../theme/typography';
import { coins, portfolio } from '../../data/mockData';
import { SectionHeader } from '../../components/Headers';
import { ChangeBadge } from '../../components/ChangeBadge';
import { CoinIcon } from '../../components/CoinIcon';
import { Sparkline } from '../../components/Sparkline';
import { Card } from '../../components/Card';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { MainTabParamList } from '../../navigation/types';
import type { CompositeScreenProps } from '@react-navigation/native';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

type Props = BottomTabScreenProps<MainTabParamList, 'Home'>;

const quickActions: { key: string; label: string; icon: keyof typeof Ionicons.glyphMap }[] = [
  { key: 'deposit', label: 'Deposit', icon: 'arrow-down-circle-outline' },
  { key: 'withdraw', label: 'Withdraw', icon: 'arrow-up-circle-outline' },
  { key: 'buy', label: 'Buy', icon: 'add-circle-outline' },
  { key: 'sell', label: 'Sell', icon: 'remove-circle-outline' },
];

export const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const trending = [...coins].sort((a, b) => b.change24h - a.change24h).slice(0, 5);
  const positive = portfolio.todayChangeUsd >= 0;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {/* Top bar */}
        <View style={styles.topBar}>
          <Pressable 
            style={styles.userRow} 
            onPress={() => navigation.navigate('Profile')}
          >
            <Image source={require('../../../assets/icon.png')} style={styles.logoMini} resizeMode="contain" />
            <View>
              <Text style={styles.greeting}>Good evening</Text>
              <Text style={styles.username}>Jules Konan</Text>
            </View>
          </Pressable>
          <View style={styles.topIcons}>
            <Pressable style={styles.iconBtn}>
              <Ionicons name="search-outline" size={20} color={colors.textPrimary} />
            </Pressable>
            <Pressable style={styles.iconBtn}>
              <Ionicons name="notifications-outline" size={20} color={colors.textPrimary} />
              <View style={styles.dot} />
            </Pressable>
          </View>
        </View>

        {/* Portfolio card */}
        <LinearGradient colors={['#12212A', '#0D1319']} style={[styles.portfolioCard, shadow.card]}>
          <Text style={styles.portfolioLabel}>Total portfolio balance</Text>
          <View style={styles.balanceRow}>
            <Text style={styles.balance}>${portfolio.totalBalanceUsd.toLocaleString(undefined, { maximumFractionDigits: 2 })}</Text>
            <Ionicons name="eye-outline" size={18} color={colors.textTertiary} />
          </View>
          <View style={styles.pnlRow}>
            <ChangeBadge value={portfolio.todayChangePercent} size="md" />
            <Text style={[styles.pnlUsd, { color: positive ? colors.positive : colors.negative }]}>
              {positive ? '+' : '-'}${Math.abs(portfolio.todayChangeUsd).toLocaleString(undefined, { maximumFractionDigits: 2 })} today
            </Text>
          </View>

          <View style={styles.quickActionsRow}>
            {quickActions.map((a) => (
              <Pressable key={a.key} style={styles.quickAction}>
                <View style={styles.quickActionIcon}>
                  <Ionicons name={a.icon} size={20} color={colors.brand} />
                </View>
                <Text style={styles.quickActionLabel}>{a.label}</Text>
              </Pressable>
            ))}
          </View>
        </LinearGradient>

        {/* Trending */}
        <View style={styles.section}>
          <SectionHeader title="Trending coins" actionLabel="See all" onAction={() => navigation.navigate('Markets', { screen: 'MarketsList' })} />
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: spacing.sm }}>
            {trending.map((c) => (
              <Card key={c.id} style={styles.trendCard}>
                <View style={styles.trendTop}>
                  <CoinIcon symbol={c.symbol} color={c.color} size={30} />
                  <ChangeBadge value={c.change24h} />
                </View>
                <Text style={styles.trendSymbol}>{c.symbol}</Text>
                <Text style={styles.trendPrice}>
                  ${c.price >= 1 ? c.price.toLocaleString(undefined, { maximumFractionDigits: 2 }) : c.price.toFixed(4)}
                </Text>
                <Sparkline data={c.sparkline} color={c.change24h >= 0 ? colors.positive : colors.negative} width={110} height={32} filled />
              </Card>
            ))}
          </ScrollView>
        </View>

        {/* Market overview */}
        <View style={styles.section}>
          <SectionHeader title="Market overview" actionLabel="Markets" onAction={() => navigation.navigate('Markets', { screen: 'MarketsList' })} />
          <View style={styles.overviewGrid}>
            <Card style={styles.overviewCard}>
              <Ionicons name="stats-chart-outline" size={18} color={colors.brand} />
              <Text style={styles.overviewLabel}>Market cap</Text>
              <Text style={styles.overviewValue}>$2.41T</Text>
              <ChangeBadge value={1.8} />
            </Card>
            <Card style={styles.overviewCard}>
              <Ionicons name="water-outline" size={18} color={colors.brand} />
              <Text style={styles.overviewLabel}>24h volume</Text>
              <Text style={styles.overviewValue}>$98.6B</Text>
              <ChangeBadge value={-4.2} />
            </Card>
            <Card style={styles.overviewCard}>
              <Ionicons name="pie-chart-outline" size={18} color={colors.brand} />
              <Text style={styles.overviewLabel}>BTC dominance</Text>
              <Text style={styles.overviewValue}>51.2%</Text>
              <ChangeBadge value={0.4} />
            </Card>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  scroll: { paddingBottom: spacing.xxl },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  userRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  logoMini: { width: 34, height: 34, borderRadius: 8 },
  greeting: { ...type.caption, color: colors.textTertiary },
  username: { ...type.bodyMedium, color: colors.textPrimary, fontWeight: '700' },
  topIcons: { flexDirection: 'row', gap: spacing.sm },
  iconBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    position: 'absolute',
    top: 8,
    right: 9,
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: colors.negative,
  },
  portfolioCard: {
    marginHorizontal: spacing.lg,
    marginTop: spacing.sm,
    borderRadius: radii.xl,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
  },
  portfolioLabel: { ...type.caption, color: colors.textTertiary },
  balanceRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs, marginTop: 6 },
  balance: { ...type.display, color: colors.textPrimary, fontWeight: '800', fontSize: 32 },
  pnlRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs, marginTop: 8 },
  pnlUsd: { ...type.caption, fontWeight: '700' },
  quickActionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.lg,
  },
  quickAction: { alignItems: 'center', gap: 6 },
  quickActionIcon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: colors.brandGlow,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickActionLabel: { ...type.caption, color: colors.textSecondary, fontWeight: '600' },
  section: { marginTop: spacing.xl, paddingHorizontal: spacing.lg },
  trendCard: { width: 130, marginRight: 0, gap: 6 },
  trendTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  trendSymbol: { ...type.bodyMedium, color: colors.textPrimary, fontWeight: '700', marginTop: 6 },
  trendPrice: { ...type.caption, color: colors.textSecondary },
  overviewGrid: { flexDirection: 'row', gap: spacing.sm },
  overviewCard: { flex: 1, gap: 6 },
  overviewLabel: { ...type.caption, color: colors.textTertiary },
  overviewValue: { ...type.bodyMedium, color: colors.textPrimary, fontWeight: '700' },
});
