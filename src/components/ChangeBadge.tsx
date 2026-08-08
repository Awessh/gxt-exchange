import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, radii, spacing } from '../theme/colors';

interface ChangeBadgeProps {
  value: number; // percent, signed
  size?: 'sm' | 'md';
  /** 'solid' matches the live app's filled green/red pills (default).
   *  'outline' is a softer tinted variant, used sparingly for secondary contexts. */
  variant?: 'solid' | 'outline';
}

export const ChangeBadge: React.FC<ChangeBadgeProps> = ({ value, size = 'sm', variant = 'solid' }) => {
  const positive = value >= 0;
  const bg = variant === 'solid' ? (positive ? colors.positive : colors.negative) : positive ? colors.positiveDim : colors.negativeDim;
  const textColor = variant === 'solid' ? colors.black : positive ? colors.positive : colors.negative;
  const sign = positive ? '+' : '-';

  return (
    <View style={[styles.pill, size === 'md' && styles.pillMd, { backgroundColor: bg }]}>
      <Text style={[styles.text, size === 'md' && styles.textMd, { color: textColor }]}>
        {sign}
        {Math.abs(value).toFixed(2)}%
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  pill: {
    paddingHorizontal: spacing.xs + 2,
    paddingVertical: 4,
    borderRadius: radii.pill,
    alignSelf: 'flex-start',
  },
  pillMd: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 6,
  },
  text: {
    fontSize: 12,
    fontWeight: '700',
  },
  textMd: {
    fontSize: 13,
  },
});
