import React, { useMemo, useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, View, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, radii, spacing } from '../../theme/colors';
import { BackHeader } from '../../components/BackHeader';
import { CoinIcon } from '../../components/CoinIcon';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { AssetsStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<AssetsStackParamList, 'Deposit'>;

const depositCoins = [
  { id: 'usdt', symbol: 'USDT', name: 'TetherUS', color: '#26A17B' },
  { id: 'bnb', symbol: 'BNB', name: 'BNB', color: '#F3BA2F' },
  { id: 'btc', symbol: 'BTC', name: 'Bitcoin', color: '#F7931A' },
  { id: 'eth', symbol: 'ETH', name: 'Ethereum', color: '#8C9EFF' },
  { id: 'sol', symbol: 'SOL', name: 'Solana', color: '#14F195' },
  { id: 'usdc', symbol: 'USDC', name: 'USD Coin', color: '#2775CA' },
];

export const DepositScreen: React.FC<Props> = ({ navigation }) => {
  const [query, setQuery] = useState('');

  const filtered = useMemo(
    () =>
      depositCoins.filter(
        (c) => c.symbol.toLowerCase().includes(query.toLowerCase()) || c.name.toLowerCase().includes(query.toLowerCase())
      ),
    [query]
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <BackHeader title="Deposit" onBack={() => navigation.goBack()} />

      <Text style={styles.sectionTitle}>Select Coin</Text>

      <View style={styles.searchWrap}>
        <Ionicons name="search-outline" size={18} color={colors.textTertiary} />
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Search Coins"
          placeholderTextColor={colors.textTertiary}
          style={styles.searchInput}
        />
      </View>

      <Text style={styles.listLabel}>All Coins</Text>

      <View style={styles.listCard}>
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          renderItem={({ item }) => (
            <Pressable style={styles.row}>
              <CoinIcon symbol={item.symbol} color={item.color} size={40} />
              <View style={{ flex: 1 }}>
                <Text style={styles.symbol}>{item.symbol}</Text>
                <Text style={styles.name}>{item.name}</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color={colors.textTertiary} />
            </Pressable>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.textPrimary,
    paddingHorizontal: spacing.lg,
    marginTop: spacing.lg,
  },
  searchWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.pill,
    marginHorizontal: spacing.lg,
    marginTop: spacing.md,
    paddingHorizontal: spacing.md,
    height: 46,
    gap: spacing.xs,
  },
  searchInput: { flex: 1, color: colors.textPrimary, fontSize: 15 },
  listLabel: { fontSize: 13, color: colors.textSecondary, fontWeight: '700', paddingHorizontal: spacing.lg, marginTop: spacing.lg, marginBottom: spacing.xs },
  listCard: {
    marginHorizontal: spacing.lg,
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    paddingHorizontal: spacing.md,
  },
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, paddingVertical: spacing.sm + 4 },
  separator: { height: 1, backgroundColor: colors.borderSubtle },
  symbol: { fontSize: 16, fontWeight: '700', color: colors.textPrimary },
  name: { fontSize: 13, color: colors.textTertiary, marginTop: 2 },
});
