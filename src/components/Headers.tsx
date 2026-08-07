import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing } from '../theme/colors';
import { type } from '../theme/typography';

export const ScreenHeader: React.FC<{
  title: string;
  subtitle?: string;
  right?: React.ReactNode;
}> = ({ title, subtitle, right }) => (
  <View style={styles.screenHeader}>
    <View>
      <Text style={styles.screenTitle}>{title}</Text>
      {subtitle ? <Text style={styles.screenSubtitle}>{subtitle}</Text> : null}
    </View>
    {right}
  </View>
);

export const SectionHeader: React.FC<{
  title: string;
  actionLabel?: string;
  onAction?: () => void;
}> = ({ title, actionLabel, onAction }) => (
  <View style={styles.sectionHeader}>
    <Text style={styles.sectionTitle}>{title}</Text>
    {actionLabel && (
      <Pressable onPress={onAction} hitSlop={8} style={styles.sectionAction}>
        <Text style={styles.sectionActionText}>{actionLabel}</Text>
        <Ionicons name="chevron-forward" size={14} color={colors.brand} />
      </Pressable>
    )}
  </View>
);

const styles = StyleSheet.create({
  screenHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
    paddingBottom: spacing.md,
  },
  screenTitle: { ...type.h1, color: colors.textPrimary, fontWeight: '700' },
  screenSubtitle: { ...type.caption, color: colors.textTertiary, marginTop: 2 },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  sectionTitle: { ...type.h3, color: colors.textPrimary, fontWeight: '700' },
  sectionAction: { flexDirection: 'row', alignItems: 'center', gap: 2 },
  sectionActionText: { ...type.caption, color: colors.brand, fontWeight: '600' },
});
