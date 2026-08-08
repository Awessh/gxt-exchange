import React, { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, View, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, radii, spacing } from '../../theme/colors';
import { type } from '../../theme/typography';
import { coins, topTraders } from '../../data/mockData';
import { generateOrderBook } from '../../data/liveAppMockData';
import { OrderBook } from '../../components/OrderBook';

const topTabs = ['Futures', 'Copy Trading'] as const;
const posTabs = ['Open Orders (0)', 'Positions (0)', 'Trading Bot'] as const;
const sliderMarks = [0, 25, 50, 75, 100];

export const FuturesScreen: React.FC = () => {
  const [topTab, setTopTab] = useState<(typeof topTabs)[number]>('Futures');
  const [side, setSide] = useState<'open' | 'close'>('open');
  const [margin, setMargin] = useState<'Cross' | 'Isolated'>('Cross');
  const [leverage] = useState('24x');
  const [posTab, setPosTab] = useState<(typeof posTabs)[number]>('Positions (0)');
  const [bannerVisible, setBannerVisible] = useState(true);

  const coin = coins.find((c) => c.id === 'eth')!;
  const decimals = 2;
  const { asks, bids } = useMemo(() => generateOrderBook(coin.price), [coin.id]);
  const positive = coin.change24h >= 0;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.topRow}>
        <View style={styles.topTabsRow}>
          {topTabs.map((t) => (
            <Pressable key={t} onPress={() => setTopTab(t)} style={styles.topTab}>
              <Text style={[styles.topTabText, topTab === t && styles.topTabTextActive]}>{t}</Text>
          </Pressable>
        ))}
      </View>
        <View style={{ flex: 1 }} />
        <Pressable style={styles.cupBadge}>
          <Text style={styles.cupEmoji}>🏆</Text>
          <Text style={styles.cupText}>Futures Crypto Cup</Text>
        </Pressable>
      </View>

      {topTab === 'Futures' ? (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
          <View style={styles.pairHeader}>
            <View style={styles.pairIconWrap}>
              <Ionicons name="logo-bitcoin" size={20} color={coin.color} />
                </View>
            <Text style={styles.pairText}>{coin.symbol}USDT</Text>
            <View style={styles.perpTag}>
              <Text style={styles.perpTagText}>Perp</Text>
            </View>
            <Text style={[styles.pairChange, { color: positive ? colors.positive : colors.negative }]}>
              {positive ? '+' : ''}
              {coin.change24h.toFixed(2)}%
            </Text>
            <Ionicons name="chevron-down" size={16} color={colors.textTertiary} />
            <View style={{ flex: 1 }} />
            <Ionicons name="ellipsis-horizontal" size={18} color={colors.textSecondary} />
          </View>

          {bannerVisible && (
            <View style={styles.banner}>
              <Ionicons name="megaphone-outline" size={15} color={colors.brand} />
              <Text style={styles.bannerText} numberOfLines={1}>
                Futures will list TERUSDT, ALABUSDT &amp; POETUS...
              </Text>
              <Pressable onPress={() => setBannerVisible(false)} hitSlop={8}>
                <Ionicons name="close" size={16} color={colors.textTertiary} />
              </Pressable>
            </View>
          )}

          <View style={styles.fundingRow}>
            <Text style={styles.fundingLabel}>Funding / Next Funding</Text>
            <Text style={styles.fundingValue}>0.0041% / 00:08:47</Text>
          </View>

          <View style={styles.tradeGrid}>
            <View style={styles.bookCol}>
              <OrderBook asks={asks} bids={bids} midPrice={coin.price} quoteDecimals={decimals} baseSymbol={coin.symbol} positive={positive} />
                </View>

            <View style={styles.panelCol}>
              <View style={styles.sideToggle}>
                <Pressable style={[styles.sideBtn, side === 'open' && styles.sideBtnOpenActive]} onPress={() => setSide('open')}>
                  <Text style={[styles.sideText, side === 'open' && { color: colors.black }]}>Open</Text>
                </Pressable>
                <Pressable style={[styles.sideBtn, side === 'close' && styles.sideBtnCloseActive]} onPress={() => setSide('close')}>
                  <Text style={[styles.sideText, side === 'close' && { color: colors.textPrimary }]}>Close</Text>
                </Pressable>
              </View>

              <View style={styles.dropdownRow}>
                <Pressable style={styles.dropdown} onPress={() => setMargin(margin === 'Cross' ? 'Isolated' : 'Cross')}>
                  <Text style={styles.dropdownText}>{margin}</Text>
                  <Ionicons name="chevron-down" size={13} color={colors.textTertiary} />
                </Pressable>
                <Pressable style={styles.dropdown}>
                  <Text style={styles.dropdownText}>{leverage}</Text>
                  <Ionicons name="chevron-down" size={13} color={colors.textTertiary} />
                </Pressable>
              </View>

              <Pressable style={styles.dropdownFull}>
                <Text style={styles.dropdownText}>Limit</Text>
                <View style={{ flex: 1 }} />
                <Ionicons name="information-circle-outline" size={14} color={colors.textTertiary} />
                <Ionicons name="chevron-down" size={13} color={colors.textTertiary} />
              </Pressable>

              <View style={styles.field}>
                <Text style={styles.fieldLabel}>Price (USDT)</Text>
                <Text style={styles.fieldValue}>{coin.price.toFixed(decimals)}</Text>
                    </View>
              <View style={styles.field}>
                <Text style={styles.fieldLabel}>Quantity ({coin.symbol})</Text>
                <Text style={styles.fieldValue}>0</Text>
                  </View>

              <View style={styles.sliderRow}>
                {sliderMarks.map((m) => (
                  <View key={m} style={styles.sliderDiamond} />
                ))}
                </View>

              <View style={styles.miniRow}>
                <Text style={styles.miniLabel}>Avail.</Text>
                <Text style={styles.miniValue}>0.00 USDT</Text>
                  </View>
              <View style={styles.miniRow}>
                <Text style={styles.miniLabel}>Margin Req.</Text>
                <Text style={styles.miniValue}>--</Text>
                  </View>
              <View style={styles.miniRow}>
                <Text style={styles.miniLabel}>Est. Liq. Price</Text>
                <Text style={styles.miniValue}>-- USDT</Text>
              </View>

              <Pressable style={[styles.submitBtn, { backgroundColor: colors.positive }]}>
                <Text style={styles.submitText}>Open Long</Text>
              </Pressable>
              <Pressable style={[styles.submitBtn, { backgroundColor: colors.negative }]}>
                <Text style={styles.submitText}>Open Short</Text>
              </Pressable>
                  </View>
                </View>

          <View style={styles.ordersSection}>
            <View style={styles.ordersTabsRow}>
              {posTabs.map((t) => (
                <Pressable key={t} onPress={() => setPosTab(t)} style={styles.ordersTab}>
                  <Text style={[styles.ordersTabText, posTab === t && styles.ordersTabTextActive]}>{t}</Text>
                  {posTab === t && <View style={styles.ordersIndicator} />}
                </Pressable>
              ))}
            </View>
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>No positions.</Text>
            </View>
          </View>
        </ScrollView>
        ) : (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.copyScroll}>
          <View style={styles.copyBanner}>
              <Ionicons name="people-circle-outline" size={26} color={colors.brand} />
              <Text style={styles.copyBannerTitle}>Copy top-performing traders</Text>
              <Text style={styles.copyBannerBody}>
                Automatically mirror trades from vetted strategy providers. Set your allocation and risk limits — stop anytime.
              </Text>
          </View>

            {topTraders.map((t) => (
            <View key={t.id} style={styles.traderCard}>
                <View style={styles.traderTop}>
                  <View style={[styles.traderAvatar, { backgroundColor: `${t.avatarColor}22`, borderColor: `${t.avatarColor}55` }]}>
                    <Text style={{ color: t.avatarColor, fontWeight: '800' }}>{t.name.slice(0, 1)}</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.traderName}>{t.name}</Text>
                  <Text style={styles.traderMeta}>
                    {t.copiers.toLocaleString()} copiers · ${(t.aum / 1000).toFixed(0)}K AUM
                  </Text>
                  </View>
                <Pressable style={styles.copyBtn}>
                  <Text style={styles.copyBtnText}>Copy</Text>
                </Pressable>
                </View>
                <View style={styles.traderStats}>
                  <View>
                  <Text style={styles.miniLabel}>30d ROI</Text>
                  <Text style={[styles.fieldValue, { color: colors.positive, fontSize: 14 }]}>+{t.roi30d.toFixed(1)}%</Text>
                  </View>
                  <View>
                  <Text style={styles.miniLabel}>Win rate</Text>
                  <Text style={[styles.fieldValue, { fontSize: 14 }]}>{t.winRate}%</Text>
                </View>
              </View>
            </View>
            ))}
      </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  topRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: spacing.lg, paddingTop: spacing.sm },
  topTabsRow: { flexDirection: 'row', gap: spacing.lg },
  topTab: { paddingVertical: 4 },
  topTabText: { fontSize: 16, color: colors.textTertiary, fontWeight: '700' },
  topTabTextActive: { color: colors.textPrimary },
  cupBadge: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  cupEmoji: { fontSize: 13 },
  cupText: { fontSize: 12, color: colors.brand, fontWeight: '700' },
  pairHeader: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: spacing.lg, marginTop: spacing.md },
  pairIconWrap: { width: 22, height: 22, alignItems: 'center', justifyContent: 'center' },
  pairText: { ...type.h3, color: colors.textPrimary, fontWeight: '800' },
  perpTag: { backgroundColor: colors.surfaceHigh, borderRadius: radii.xs, paddingHorizontal: 5, paddingVertical: 1 },
  perpTagText: { fontSize: 10, color: colors.textSecondary, fontWeight: '700' },
  pairChange: { fontSize: 13, fontWeight: '700', marginLeft: 2 },
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    marginHorizontal: spacing.lg,
    marginTop: spacing.sm,
    backgroundColor: colors.surface,
    borderRadius: radii.sm,
    borderWidth: 1,
    borderColor: colors.brandDim,
    paddingHorizontal: spacing.sm,
    paddingVertical: 8,
  },
  bannerText: { flex: 1, fontSize: 12, color: colors.textSecondary },
  fundingRow: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: spacing.lg, marginTop: spacing.sm },
  fundingLabel: { fontSize: 11, color: colors.textTertiary },
  fundingValue: { fontSize: 11, color: colors.positive, fontWeight: '600' },
  tradeGrid: { flexDirection: 'row', paddingHorizontal: spacing.lg, gap: spacing.sm, marginTop: spacing.sm },
  bookCol: { flex: 1 },
  panelCol: { flex: 1.15, gap: spacing.sm },
  sideToggle: { flexDirection: 'row', gap: spacing.sm },
  sideBtn: { flex: 1, alignItems: 'center', paddingVertical: 8, borderRadius: radii.sm, backgroundColor: colors.surface },
  sideBtnOpenActive: { backgroundColor: colors.positive },
  sideBtnCloseActive: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border },
  sideText: { fontSize: 14, fontWeight: '700', color: colors.textSecondary },
  dropdownRow: { flexDirection: 'row', gap: spacing.xs },
  dropdown: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.surface,
    borderRadius: radii.sm,
    paddingHorizontal: spacing.sm,
    paddingVertical: 8,
  },
  dropdownFull: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radii.sm,
    paddingHorizontal: spacing.sm,
    paddingVertical: 8,
    gap: 4,
  },
  dropdownText: { fontSize: 13, color: colors.textPrimary, fontWeight: '600' },
  field: { backgroundColor: colors.surface, borderRadius: radii.sm, paddingHorizontal: spacing.sm, paddingVertical: 8 },
  fieldLabel: { fontSize: 11, color: colors.textTertiary },
  fieldValue: { fontSize: 15, fontWeight: '700', color: colors.textPrimary, marginTop: 4 },
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
  submitBtn: { borderRadius: radii.pill, alignItems: 'center', paddingVertical: 13, marginTop: spacing.xs },
  submitText: { fontSize: 14, fontWeight: '800', color: colors.black },
  ordersSection: { marginTop: spacing.lg, paddingHorizontal: spacing.lg },
  ordersTabsRow: { flexDirection: 'row', gap: spacing.lg, borderBottomWidth: 1, borderBottomColor: colors.borderSubtle },
  ordersTab: { paddingBottom: spacing.sm },
  ordersTabText: { fontSize: 13, color: colors.textTertiary, fontWeight: '600' },
  ordersTabTextActive: { color: colors.textPrimary, fontWeight: '700' },
  ordersIndicator: { height: 2, backgroundColor: colors.brand, marginTop: 6, borderRadius: 2 },
  emptyState: { alignItems: 'center', paddingVertical: spacing.xl },
  emptyText: { fontSize: 13, color: colors.textTertiary },
  copyScroll: { paddingHorizontal: spacing.lg, paddingTop: spacing.md, paddingBottom: 100, gap: spacing.sm },
  copyBanner: {
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    padding: spacing.md,
    gap: 6,
  },
  copyBannerTitle: { ...type.h3, color: colors.textPrimary, fontWeight: '700', marginTop: 4 },
  copyBannerBody: { fontSize: 12, color: colors.textSecondary, lineHeight: 18 },
  traderCard: {
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    padding: spacing.md,
    gap: spacing.sm,
  },
  traderTop: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  traderAvatar: { width: 40, height: 40, borderRadius: 20, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  traderName: { ...type.bodySemiBold, color: colors.textPrimary, fontWeight: '700' },
  traderMeta: { fontSize: 12, color: colors.textTertiary, marginTop: 2 },
  copyBtn: { backgroundColor: colors.brand, borderRadius: radii.pill, paddingHorizontal: spacing.md, paddingVertical: 8 },
  copyBtnText: { fontSize: 13, fontWeight: '800', color: colors.black },
  traderStats: { flexDirection: 'row', gap: spacing.xl },
});
