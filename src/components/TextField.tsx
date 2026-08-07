import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
  Pressable,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radii, spacing } from '../theme/colors';
import { type } from '../theme/typography';

interface TextFieldProps extends TextInputProps {
  label?: string;
  icon?: keyof typeof Ionicons.glyphMap;
  isPassword?: boolean;
  error?: string;
}

export const TextField: React.FC<TextFieldProps> = ({
  label,
  icon,
  isPassword,
  error,
  style,
  ...rest
}) => {
  const [focused, setFocused] = useState(false);
  const [secure, setSecure] = useState(!!isPassword);

  return (
    <View style={styles.wrap}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View
        style={[
          styles.inputRow,
          focused && styles.inputRowFocused,
          !!error && styles.inputRowError,
        ]}
      >
        {icon && <Ionicons name={icon} size={18} color={colors.textTertiary} style={styles.icon} />}
        <TextInput
          placeholderTextColor={colors.textTertiary}
          style={[styles.input, style]}
          secureTextEntry={secure}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          {...rest}
        />
        {isPassword && (
          <Pressable onPress={() => setSecure((s) => !s)} hitSlop={10}>
            <Ionicons
              name={secure ? 'eye-outline' : 'eye-off-outline'}
              size={18}
              color={colors.textTertiary}
            />
          </Pressable>
        )}
      </View>
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: { marginBottom: spacing.md },
  label: { ...type.caption, color: colors.textSecondary, marginBottom: 6, fontWeight: '600' },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.sm,
    height: 52,
    gap: spacing.xs,
  },
  inputRowFocused: {
    borderColor: colors.brand,
    shadowColor: colors.brand,
    shadowOpacity: 0.25,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 0 },
  },
  inputRowError: { borderColor: colors.negative },
  icon: { marginRight: 2 },
  input: { flex: 1, color: colors.textPrimary, ...type.body, paddingVertical: 0 },
  error: { color: colors.negative, ...type.caption, marginTop: 4 },
});
