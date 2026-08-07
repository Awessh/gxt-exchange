import React, { useMemo, useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, View, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, radii, spacing } from '../../theme/colors';
import { type } from '../../theme/typography';
import { coins } from '../../data/mockData';
import { CoinListItem } from '../../components/CoinListItem';
import { ScreenHeader } from '../../components/Headers';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { MarketsStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<MarketsStackParamList, 'MarketsList'>;

const filters = ['All', 'Favorites', 'Gainers', 'Losers'] as const;

export const MarketsScreen: React.FC<Props> = ({ navigation }) => {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<(typeof filters)[number]>('All');
  const [favorites, setFavorites] = useState<Set<string>>(new Set(['btc', 'eth']));

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const filteredCoins = useMemo(() => {
    let list = coins.filter(
      (c) =>
        c.name.toLowerCase().includes(query.toLowerCase()) ||
        c.symbol.toLowerCase().includes(query.toLowerCase())
    );
    if (filter === 'Favorites') list = list.filter((c) => favorites.has(c.id));
    if (filter === 'Gainers') list = [...list].filter((c) => c.change24h >= 0).sort((a, b) => b.change24h - a.change24h);
    if (filter === 'Losers') list = [...list].filter((c) => c.change24h < 0).sort((a, b) => a.change24h - b.change24h);
    return list;
  }, [query, filter, favorites]);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScreenHeader title="Markets" subtitle="300+ pairs · live pricing" />

      <View style={styles.searchWrap}>
        <Ionicons name="search-outline" size={18} color={colors.textTertiary} />
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Search coin or pair"
          placeholderTextColor={colors.textTertiary}
          style={styles.searchInput}
        />
      </View>

      <View style={styles.filterRow}>
        {filters.map((f) => (
          <Pressable
            key={f}
            onPress={() => setFilter(f)}
            style={[styles.filterChip, filter === f && styles.filterChipActive]}
          >
            <Text style={[styles.filterText, filter === f && styles.filterTextActive]}>{f}</Text>
          </Pressable>
        ))}
      </View>

      <View style={styles.listHeader}>
        <Text style={styles.listHeaderText}>Name</Text>
        <Text style={[styles.listHeaderText, { marginLeft: 'auto', marginRight: 96 }]}>Chart</Text>
        <Text style={styles.listHeaderText}>Price / 24h</Text>
      </View>

      <FlatList
        data={filteredCoins}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={({ item }) => (
          <CoinListItem
            coin={item}
            favorite={favorites.has(item.id)}
            onToggleFavorite={() => toggleFavorite(item.id)}
            onPress={() => navigation.navigate('Trading', { coinId: item.id })}
          />
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons name="search-outline" size={28} color={colors.textTertiary} />
            <Text style={styles.emptyText}>No coins match your search</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  searchWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    marginHorizontal: spacing.lg,
    paddingHorizontal: spacing.sm,
    height: 44,
    gap: spacing.xs,
  },
  searchInput: { flex: 1, color: colors.textPrimary, ...type.body },
  filterRow: {
    flexDirection: 'row',
    gap: spacing.xs,
    paddingHorizontal: spacing.lg,
    marginTop: spacing.sm,
  },
  filterChip: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 7,
    borderRadius: radii.pill,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  filterChipActive: { backgroundColor: colors.brandGlow, borderColor: colors.brandDim },
  filterText: { ...type.caption, color: colors.textSecondary, fontWeight: '600' },
  filterTextActive: { color: colors.brand },
  listHeader: {
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
    marginTop: spacing.lg,
    marginBottom: spacing.xs,
  },
  listHeaderText: { ...type.caption, color: colors.textTertiary },
  list: { paddingHorizontal: spacing.lg, paddingBottom: spacing.xxl },
  separator: { height: 1, backgroundColor: colors.divider },
  empty: { alignItems: 'center', gap: spacing.xs, paddingTop: spacing.xxl },
  emptyText: { ...type.body, color: colors.textTertiary },
});
