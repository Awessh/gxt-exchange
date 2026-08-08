import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing } from '../theme/colors';

interface BackHeaderProps {
  title: string;
  onBack: () => void;
  icon?: keyof typeof Ionicons.glyphMap;
  iconColor?: string;
  right?: React.ReactNode;
}

export const BackHeader: React.FC<BackHeaderProps> = ({ title, onBack, icon, iconColor = colors.brand, right }) => (
  <View style={styles.row}>
    <Pressable onPress={onBack} style={styles.backBtn} hitSlop={10}>
      <Ionicons name="arrow-back" size={20} color={colors.textPrimary} />
    </Pressable>
    {icon && <Ionicons name={icon} size={20} color={iconColor} />}
    <Text style={styles.title}>{title}</Text>
    <View style={{ flex: 1 }} />
    {right}
  </View>
);

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, paddingHorizontal: spacing.lg, paddingTop: spacing.sm },
  backBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: { fontSize: 22, fontWeight: '800', color: colors.textPrimary },
});
