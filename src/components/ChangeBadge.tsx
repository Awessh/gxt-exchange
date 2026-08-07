import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radii, spacing } from '../theme/colors';

interface ChangeBadgeProps {
  value: number; // percent, signed
  size?: 'sm' | 'md';
  filled?: boolean;
}

export const ChangeBadge: React.FC<ChangeBadgeProps> = ({ value, size = 'sm', filled = true }) => {
  const positive = value >= 0;
  const color = positive ? colors.positive : colors.negative;
  const bg = positive ? colors.positiveDim : colors.negativeDim;

  return (
    <View
      style={[
        styles.pill,
        size === 'md' && styles.pillMd,
        filled ? { backgroundColor: bg } : { backgroundColor: 'transparent' },
      ]}
    >
      <Ionicons
        name={positive ? 'caret-up' : 'caret-down'}
        size={size === 'md' ? 12 : 10}
        color={color}
      />
      <Text style={[styles.text, size === 'md' && styles.textMd, { color }]}>
        {Math.abs(value).toFixed(2)}%
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    paddingHorizontal: spacing.xs,
    paddingVertical: 3,
    borderRadius: radii.pill,
    alignSelf: 'flex-start',
  },
  pillMd: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 5,
  },
  text: {
    fontSize: 12,
    fontWeight: '700',
  },
  textMd: {
    fontSize: 13,
  },
});
