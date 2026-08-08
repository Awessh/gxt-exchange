import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, radii } from '../theme/colors';

interface SegmentTabsProps {
  options: string[];
  value: string;
  onChange: (v: string) => void;
  compact?: boolean;
}

/** The pill-shaped Spot / Futures toggle used at the top of Home, Markets, Trade, Futures. */
export const SegmentTabs: React.FC<SegmentTabsProps> = ({ options, value, onChange, compact }) => {
  return (
    <View style={styles.wrap}>
      {options.map((opt) => {
        const active = opt === value;
        return (
          <Pressable
            key={opt}
            onPress={() => onChange(opt)}
            style={[styles.segment, compact && styles.segmentCompact, active && styles.segmentActive]}
          >
            <Text style={[styles.text, active && styles.textActive]}>{opt}</Text>
          </Pressable>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
  },
  segment: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: radii.pill,
  },
  segmentCompact: { paddingHorizontal: 12, paddingVertical: 6 },
  segmentActive: {
    backgroundColor: colors.surfaceHigh,
  },
  text: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.textTertiary,
  },
  textActive: {
    color: colors.textPrimary,
    fontWeight: '700',
  },
});
