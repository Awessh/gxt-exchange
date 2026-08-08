import React, { useMemo, useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, View, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, radii, spacing } from '../../theme/colors';
import { type } from '../../theme/typography';
import { coins } from '../../data/mockData';
import { gxtToken } from '../../data/liveAppMockData';
import { CoinIcon } from '../../components/CoinIcon';
import { UnderlineTabs } from '../../components/UnderlineTabs';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { MarketsStackParamList } from '../../navigation/types';

type Props = {
    route: { params?: MarketsStackParamList['MarketsList'] }; 
    navigation: any;
  };

const topTabs = ['Favorites', 'Markets', 'Alpha'] as const;
const subTabs = ['Spot', 'Futures'] as const;
const filterChips = ['All', 'Majors', 'New', 'Meme'] as const;

// GXT is always listed first, matching the live app pinning its native token.
const marketList = [
  { id: 'gxt', symbol: gxtToken.symbol, name: gxtToken.name, price: gxtToken.price, change24h: gxtToken.change24h, color: gxtToken.color, volLabel: '84.20M', hasDot: false },
  ...coins.map((c) => ({ ...c, volLabel: `${(c.price * 2.9).toFixed(2)}M`, hasDot: true })),
];

export const MarketsScreen: React.FC<Props> = ({ route, navigation }) => {
  const [topTab, setTopTab] = useState<(typeof topTabs)[number]>('Markets');
  const [subTab, setSubTab] = useState<(typeof subTabs)[number]>('Spot');
  const [chip, setChip] = useState<(typeof filterChips)[number]>('All');
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    let list = marketList.filter(
      (c) => c.name.toLowerCase().includes(query.toLowerCase()) || c.symbol.toLowerCase().includes(query.toLowerCase())
    );
    if (chip === 'Majors') list = list.filter((c) => ['BTC', 'ETH', 'BNB', 'SOL', 'GXT'].includes(c.symbol));
    if (chip === 'New') list = [...list].reverse();
    if (chip === 'Meme') list = list.filter((c) => ['DOGE'].includes(c.symbol));
    return list;
  }, [query, chip]);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.topRow}>
        <View style={styles.pillTabs}>
          {subTabs.map((t) => (
            <Pressable key={t} onPress={() => setSubTab(t)} style={[styles.pillTab, subTab === t && styles.pillTabActive]}>
              <Text style={[styles.pillTabText, subTab === t && styles.pillTabTextActive]}>{t}</Text>
            </Pressable>
          ))}
        </View>
        <View style={{ flex: 1 }} />
        <Pressable style={styles.iconBtn}>
          <Ionicons name="scan-outline" size={18} color={colors.textPrimary} />
        </Pressable>
        <Pressable style={styles.iconBtn}>
          <Ionicons name="notifications-outline" size={18} color={colors.textPrimary} />
        </Pressable>
      </View>

      <View style={styles.searchWrap}>
        <Ionicons name="search-outline" size={18} color={colors.textTertiary} />
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Search spot pairs..."
          placeholderTextColor={colors.textTertiary}
          style={styles.searchInput}
        />
      </View>

      <View style={styles.topTabsRow}>
        <UnderlineTabs
          options={[...topTabs]}
          value={topTab}
          onChange={(v) => setTopTab(v as any)}
          extra={<Text style={styles.fireEmoji}>🔥</Text>}
        />
      </View>

      <View style={styles.subTabsRow}>
        <UnderlineTabs options={[...subTabs]} value={subTab} onChange={(v) => setSubTab(v as any)} />
      </View>

      <View style={styles.chipsRow}>
        {filterChips.map((c) => (
          <Pressable key={c} onPress={() => setChip(c)} style={[styles.chip, chip === c && styles.chipActive]}>
            <Text style={[styles.chipText, chip === c && styles.chipTextActive]}>{c}</Text>
          </Pressable>
        ))}
      </View>

      <View style={styles.listHeader}>
        <Text style={styles.listHeaderText}>Pair / Amount</Text>
        <View style={{ flex: 1 }} />
        <Text style={styles.listHeaderText}>Price</Text>
        <Text style={[styles.listHeaderText, { marginLeft: spacing.lg }]}>24h</Text>
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <Pressable
            style={styles.row}
            onPress={() => navigation.navigate('Trading', { coinId: item.id === 'gxt' ? 'btc' : item.id })}
          >
            <CoinIcon symbol={item.symbol} color={item.color} size={34} />
            <View style={styles.identity}>
              <View style={styles.symbolRow}>
                <Text style={styles.symbol}>{item.symbol}</Text>
                <Text style={styles.pairSuffix}>/USDT</Text>
                {item.hasDot && <View style={styles.dot} />}
              </View>
              <Text style={styles.vol}>{item.volLabel}</Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={styles.price}>
                {item.price.toLocaleString(undefined, { minimumFractionDigits: item.price < 1 ? 5 : 2, maximumFractionDigits: item.price < 1 ? 5 : 2 })}
              </Text>
              <Text style={styles.priceUsd}>
                ${item.price.toLocaleString(undefined, { maximumFractionDigits: item.price < 1 ? 2 : 2 })}
              </Text>
            </View>
            <View style={[styles.changePill, { backgroundColor: item.change24h >= 0 ? colors.positive : colors.negative }]}>
              <Text style={styles.changeText}>
                {item.change24h >= 0 ? '+' : ''}
                {item.change24h.toFixed(2)}%
              </Text>
          </View>
          </Pressable>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
    gap: spacing.xs,
  },
  pillTabs: { flexDirection: 'row', backgroundColor: colors.surface, borderRadius: radii.pill, padding: 3 },
  pillTab: { paddingHorizontal: spacing.sm, paddingVertical: 6, borderRadius: radii.pill },
  pillTabActive: { backgroundColor: colors.surfaceHigh },
  pillTabText: { fontSize: 13, color: colors.textTertiary, fontWeight: '600' },
  pillTabTextActive: { color: colors.textPrimary, fontWeight: '700' },
  iconBtn: { width: 34, height: 34, borderRadius: 17, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.surface, marginLeft: spacing.xs },
  searchWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radii.pill,
    marginHorizontal: spacing.lg,
    marginTop: spacing.sm,
    paddingHorizontal: spacing.md,
    height: 42,
    gap: spacing.xs,
  },
  searchInput: { flex: 1, color: colors.textPrimary, ...type.body },
  topTabsRow: { paddingHorizontal: spacing.lg, marginTop: spacing.md },
  fireEmoji: { fontSize: 14, marginLeft: -spacing.sm },
  subTabsRow: { paddingHorizontal: spacing.lg, marginTop: spacing.sm, borderBottomWidth: 1, borderBottomColor: colors.borderSubtle, paddingBottom: spacing.xs },
  chipsRow: { flexDirection: 'row', gap: spacing.xs, paddingHorizontal: spacing.lg, marginTop: spacing.sm },
  chip: { paddingHorizontal: spacing.sm, paddingVertical: 6, borderRadius: radii.pill, backgroundColor: colors.surface },
  chipActive: { backgroundColor: colors.surfaceHigh, borderWidth: 1, borderColor: colors.border },
  chipText: { fontSize: 12, color: colors.textTertiary, fontWeight: '600' },
  chipTextActive: { color: colors.textPrimary },
  listHeader: { flexDirection: 'row', paddingHorizontal: spacing.lg, marginTop: spacing.md },
  listHeaderText: { fontSize: 12, color: colors.textTertiary },
  list: { paddingHorizontal: spacing.lg, paddingBottom: 100, paddingTop: spacing.xs },
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, paddingVertical: spacing.sm + 3 },
  identity: { flex: 1 },
  symbolRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  symbol: { ...type.bodyMedium, color: colors.textPrimary, fontWeight: '700' },
  pairSuffix: { fontSize: 12, color: colors.textTertiary },
  dot: { width: 5, height: 5, borderRadius: 2.5, backgroundColor: colors.positive, marginLeft: 2 },
  vol: { fontSize: 12, color: colors.textTertiary, marginTop: 2 },
  price: { ...type.bodyMedium, color: colors.textPrimary, fontWeight: '700' },
  priceUsd: { fontSize: 12, color: colors.textTertiary, marginTop: 2 },
  changePill: { borderRadius: radii.pill, paddingHorizontal: spacing.xs + 2, paddingVertical: 5, marginLeft: spacing.sm, minWidth: 66, alignItems: 'center' },
  changeText: { fontSize: 12, fontWeight: '700', color: colors.black },
});
