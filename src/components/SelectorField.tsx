import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radii, spacing } from '../theme/colors';
import { CoinIcon } from './CoinIcon';

interface SelectorFieldProps {
  label: string;
  iconSymbol?: string;
  iconColor?: string;
  iconLetter?: string; // for non-coin icons like network badges (e.g. "BEP")
  value: string;
  suffix?: string; // e.g. balance shown to the right of the value
  onPress?: () => void;
  style?: object;
}

export const SelectorField: React.FC<SelectorFieldProps> = ({
  label,
  iconSymbol,
  iconColor = colors.brand,
  iconLetter,
  value,
  suffix,
  onPress,
  style,
}) => {
  return (
    <View style={style}>
      <Text style={styles.label}>{label}</Text>
      <Pressable onPress={onPress} style={styles.field}>
        {iconSymbol ? (
          <CoinIcon symbol={iconSymbol} color={iconColor} size={22} />
        ) : (
          <View style={[styles.badge, { backgroundColor: `${iconColor}33`, borderColor: `${iconColor}66` }]}>
            <Text style={[styles.badgeText, { color: iconColor }]}>{iconLetter}</Text>
          </View>
        )}
        <Text style={styles.value} numberOfLines={1}>
          {value}
        </Text>
        {suffix && <Text style={styles.suffix}>{suffix}</Text>}
        <Ionicons name="chevron-down" size={15} color={colors.textTertiary} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  label: { fontSize: 12, color: colors.textTertiary, marginBottom: 6 },
  field: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.md,
    paddingHorizontal: spacing.sm,
    height: 48,
  },
  badge: { width: 22, height: 22, borderRadius: 11, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  badgeText: { fontSize: 8, fontWeight: '800' },
  value: { flex: 1, color: colors.textPrimary, fontWeight: '700', fontSize: 14 },
  suffix: { color: colors.textSecondary, fontSize: 13, marginRight: 2 },
});
