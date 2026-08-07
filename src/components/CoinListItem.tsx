import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Coin } from '../data/mockData';
import { colors, spacing } from '../theme/colors';
import { type } from '../theme/typography';
import { CoinIcon } from './CoinIcon';
import { Sparkline } from './Sparkline';
import { ChangeBadge } from './ChangeBadge';

interface CoinListItemProps {
  coin: Coin;
  onPress?: () => void;
  favorite?: boolean;
  onToggleFavorite?: () => void;
  showSparkline?: boolean;
  showBalance?: boolean;
}

export const CoinListItem: React.FC<CoinListItemProps> = ({
  coin,
  onPress,
  favorite,
  onToggleFavorite,
  showSparkline = true,
  showBalance = false,
}) => {
  const positive = coin.change24h >= 0;

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.row, pressed && { opacity: 0.6 }]}
    >
      {onToggleFavorite && (
        <Pressable hitSlop={10} onPress={onToggleFavorite} style={styles.star}>
          <Ionicons
            name={favorite ? 'star' : 'star-outline'}
            size={16}
            color={favorite ? colors.warning : colors.textTertiary}
          />
        </Pressable>
      )}

      <CoinIcon symbol={coin.symbol} color={coin.color} />

      <View style={styles.identity}>
        <Text style={styles.symbol}>{coin.symbol}</Text>
        <Text style={styles.name} numberOfLines={1}>
          {showBalance && coin.balance !== undefined
            ? `${coin.balance} ${coin.symbol}`
            : coin.name}
        </Text>
      </View>

      {showSparkline && (
        <View style={styles.sparkWrap}>
          <Sparkline
            data={coin.sparkline}
            color={positive ? colors.positive : colors.negative}
            filled
          />
        </View>
      )}

      <View style={styles.priceCol}>
        <Text style={styles.price}>
          ${coin.price >= 1 ? coin.price.toLocaleString(undefined, { maximumFractionDigits: 2 }) : coin.price.toFixed(4)}
        </Text>
        <ChangeBadge value={coin.change24h} />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    gap: spacing.sm,
  },
  star: { paddingRight: 2 },
  identity: { width: 74 },
  symbol: { ...type.bodySemiBold, color: colors.textPrimary, fontWeight: '700' },
  name: { ...type.caption, color: colors.textTertiary, marginTop: 1 },
  sparkWrap: { flex: 1, alignItems: 'center' },
  priceCol: { alignItems: 'flex-end', minWidth: 88 },
  price: { ...type.numericSm, color: colors.textPrimary, fontWeight: '700' },
});
