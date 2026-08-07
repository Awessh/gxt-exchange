import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, radii, spacing } from '../../theme/colors';
import { type } from '../../theme/typography';
import { futuresPositions, topTraders } from '../../data/mockData';
import { ScreenHeader, SectionHeader } from '../../components/Headers';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';

const tabs = ['Positions', 'Copy Trading'] as const;

export const FuturesScreen: React.FC = () => {
  const [tab, setTab] = useState<(typeof tabs)[number]>('Positions');

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScreenHeader title="Futures" subtitle="Up to 125x leverage · perpetuals" />

      <View style={styles.tabRow}>
        {tabs.map((t) => (
          <Pressable key={t} onPress={() => setTab(t)} style={styles.tabBtn}>
            <Text style={[styles.tabText, tab === t && styles.tabTextActive]}>{t}</Text>
            {tab === t && <View style={styles.tabIndicator} />}
          </Pressable>
        ))}
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {tab === 'Positions' ? (
          <>
            <Card style={styles.marginCard}>
              <View style={styles.marginRow}>
                <View>
                  <Text style={styles.marginLabel}>Margin balance</Text>
                  <Text style={styles.marginValue}>$8,240.55</Text>
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                  <Text style={styles.marginLabel}>Unrealized PNL</Text>
                  <Text style={[styles.marginValue, { color: colors.positive }]}>+$65.22</Text>
                </View>
              </View>
              <View style={styles.marginActions}>
                <Button label="Transfer" variant="secondary" size="sm" style={{ flex: 1 }} />
                <Button label="Open new position" size="sm" style={{ flex: 1 }} />
              </View>
            </Card>

            <SectionHeader title="Open positions" />
            {futuresPositions.map((p) => (
              <Card key={p.id} style={styles.positionCard}>
                <View style={styles.positionTop}>
                  <View style={styles.positionPairRow}>
                    <Text style={styles.positionPair}>{p.pair}</Text>
                    <View style={[styles.sideTag, { backgroundColor: p.side === 'long' ? colors.positiveDim : colors.negativeDim }]}>
                      <Text style={{ color: p.side === 'long' ? colors.positive : colors.negative, fontSize: 11, fontWeight: '800' }}>
                        {p.side.toUpperCase()} {p.leverage}x
                      </Text>
                    </View>
                  </View>
                  <Text style={[styles.pnlText, { color: p.pnl >= 0 ? colors.positive : colors.negative }]}>
                    {p.pnl >= 0 ? '+' : ''}${p.pnl.toFixed(2)} ({p.pnlPercent.toFixed(1)}%)
                  </Text>
                </View>
                <View style={styles.positionGrid}>
                  <View>
                    <Text style={styles.gridLabel}>Size</Text>
                    <Text style={styles.gridValue}>${p.size.toLocaleString()}</Text>
                  </View>
                  <View>
                    <Text style={styles.gridLabel}>Entry price</Text>
                    <Text style={styles.gridValue}>${p.entryPrice.toLocaleString()}</Text>
                  </View>
                  <View>
                    <Text style={styles.gridLabel}>Mark price</Text>
                    <Text style={styles.gridValue}>${p.markPrice.toLocaleString()}</Text>
                  </View>
                </View>
                <Button label="Close position" variant="secondary" size="sm" style={{ marginTop: spacing.sm }} />
              </Card>
            ))}
          </>
        ) : (
          <>
            <Card style={styles.copyBanner}>
              <Ionicons name="people-circle-outline" size={26} color={colors.brand} />
              <Text style={styles.copyBannerTitle}>Copy top-performing traders</Text>
              <Text style={styles.copyBannerBody}>
                Automatically mirror trades from vetted strategy providers. Set your allocation and risk limits — stop anytime.
              </Text>
            </Card>

            <SectionHeader title="Top traders" actionLabel="Leaderboard" />
            {topTraders.map((t) => (
              <Card key={t.id} style={styles.traderCard}>
                <View style={styles.traderTop}>
                  <View style={[styles.traderAvatar, { backgroundColor: `${t.avatarColor}22`, borderColor: `${t.avatarColor}55` }]}>
                    <Text style={{ color: t.avatarColor, fontWeight: '800' }}>{t.name.slice(0, 1)}</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.traderName}>{t.name}</Text>
                    <Text style={styles.traderMeta}>{t.copiers.toLocaleString()} copiers · ${(t.aum / 1000).toFixed(0)}K AUM</Text>
                  </View>
                  <Button label="Copy" size="sm" fullWidth={false} style={{ paddingHorizontal: spacing.md }} />
                </View>
                <View style={styles.traderStats}>
                  <View>
                    <Text style={styles.gridLabel}>30d ROI</Text>
                    <Text style={[styles.gridValue, { color: colors.positive }]}>+{t.roi30d.toFixed(1)}%</Text>
                  </View>
                  <View>
                    <Text style={styles.gridLabel}>Win rate</Text>
                    <Text style={styles.gridValue}>{t.winRate}%</Text>
                  </View>
                </View>
              </Card>
            ))}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  tabRow: { flexDirection: 'row', gap: spacing.lg, paddingHorizontal: spacing.lg, marginBottom: spacing.xs },
  tabBtn: { paddingBottom: spacing.sm },
  tabText: { ...type.bodyMedium, color: colors.textTertiary, fontWeight: '700' },
  tabTextActive: { color: colors.textPrimary },
  tabIndicator: { height: 2, backgroundColor: colors.brand, marginTop: 6, borderRadius: 2 },
  scroll: { paddingHorizontal: spacing.lg, paddingBottom: spacing.xxl, gap: spacing.sm },
  marginCard: { gap: spacing.md },
  marginRow: { flexDirection: 'row', justifyContent: 'space-between' },
  marginLabel: { ...type.caption, color: colors.textTertiary },
  marginValue: { ...type.h2, color: colors.textPrimary, fontWeight: '800', marginTop: 4 },
  marginActions: { flexDirection: 'row', gap: spacing.sm },
  positionCard: { marginTop: spacing.xs, gap: spacing.sm },
  positionTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  positionPairRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs },
  positionPair: { ...type.bodySemiBold, color: colors.textPrimary, fontWeight: '700' },
  sideTag: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: radii.pill },
  pnlText: { ...type.numericSm, fontWeight: '800' },
  positionGrid: { flexDirection: 'row', justifyContent: 'space-between' },
  gridLabel: { ...type.caption, color: colors.textTertiary },
  gridValue: { ...type.bodyMedium, color: colors.textPrimary, fontWeight: '700', marginTop: 2 },
  copyBanner: { gap: 6, marginTop: spacing.xs },
  copyBannerTitle: { ...type.h3, color: colors.textPrimary, fontWeight: '700', marginTop: 4 },
  copyBannerBody: { ...type.caption, color: colors.textSecondary, lineHeight: 18 },
  traderCard: { gap: spacing.sm, marginTop: spacing.xs },
  traderTop: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  traderAvatar: { width: 40, height: 40, borderRadius: 20, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  traderName: { ...type.bodySemiBold, color: colors.textPrimary, fontWeight: '700' },
  traderMeta: { ...type.caption, color: colors.textTertiary, marginTop: 2 },
  traderStats: { flexDirection: 'row', gap: spacing.xl },
});
