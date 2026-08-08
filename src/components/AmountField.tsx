import React from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { colors, radii, spacing } from '../theme/colors';

interface AmountFieldProps {
  label: string;
  value: string;
  onChangeText: (v: string) => void;
  onMax?: () => void;
  helperText?: string;
  style?: object;
}

export const AmountField: React.FC<AmountFieldProps> = ({ label, value, onChangeText, onMax, helperText, style }) => {
  return (
    <View style={style}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.row}>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder="0.00"
          placeholderTextColor={colors.textTertiary}
          keyboardType="decimal-pad"
          style={styles.input}
        />
        {onMax && (
          <Pressable style={styles.maxBtn} onPress={onMax}>
            <Text style={styles.maxText}>Max</Text>
          </Pressable>
        )}
      </View>
      {helperText && <Text style={styles.helper}>{helperText}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  label: { fontSize: 12, color: colors.textTertiary, marginBottom: 6 },
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs },
  input: {
    flex: 1,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.md,
    paddingHorizontal: spacing.sm,
    height: 48,
    color: colors.textPrimary,
    fontSize: 15,
    fontWeight: '600',
  },
  maxBtn: {
    backgroundColor: colors.surfaceHigh,
    borderRadius: radii.pill,
    paddingHorizontal: spacing.sm,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  maxText: { color: colors.textPrimary, fontWeight: '700', fontSize: 13 },
  helper: { fontSize: 11.5, color: colors.textTertiary, marginTop: 6, lineHeight: 16 },
});
