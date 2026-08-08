import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { colors, spacing } from '../theme/colors';

interface UnderlineTabsProps {
  options: string[];
  value: string;
  onChange: (v: string) => void;
  scrollable?: boolean;
  extra?: React.ReactNode;
}

export const UnderlineTabs: React.FC<UnderlineTabsProps> = ({ options, value, onChange, scrollable, extra }) => {
  const content = (
    <View style={styles.row}>
      {options.map((opt) => {
        const active = opt === value;
        return (
          <Pressable key={opt} onPress={() => onChange(opt)} style={styles.tab}>
            <Text style={[styles.text, active && styles.textActive]}>{opt}</Text>
            {active && <View style={styles.indicator} />}
          </Pressable>
        );
      })}
      {extra}
    </View>
  );

  if (scrollable) {
    return (
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {content}
      </ScrollView>
    );
  }
  return content;
};

const styles = StyleSheet.create({
  scrollContent: { paddingHorizontal: spacing.lg },
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.lg },
  tab: { paddingBottom: 8 },
  text: { fontSize: 14, fontWeight: '600', color: colors.textTertiary },
  textActive: { color: colors.textPrimary, fontWeight: '700' },
  indicator: {
    height: 2,
    backgroundColor: colors.brand,
    marginTop: 6,
    borderRadius: 2,
  },
});
