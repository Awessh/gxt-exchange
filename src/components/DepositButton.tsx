import React from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import { colors, gradients, radii, spacing } from '../theme/colors';
import { type } from '../theme/typography';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger';
type Size = 'lg' | 'md' | 'sm';

interface ButtonProps {
  label: string;
  onPress?: () => void;
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  style?: ViewStyle;
  fullWidth?: boolean;
  textColor?: string; 
}

export const DepositButton: React.FC<ButtonProps> = ({
  label,
  onPress,
  variant = 'primary',
  size = 'lg',
  loading,
  disabled,
  icon,
  style,
  fullWidth = true,
  textColor,
}) => {
  const handlePress = () => {
    if (disabled || loading) return;
    Haptics.selectionAsync().catch(() => {});
    onPress?.();
  };

  const heightBySize = { lg: 54, md: 46, sm: 38 }[size];

  const fontSizeBySize = {
    lg: 16,
    md: 15,
    sm: 12,
  }[size];

  const horizontalPaddingBySize = {
    lg: spacing.lg,
    md: spacing.md,
    sm: spacing.sm,
  }[size];

  const content = (
    <View style={[styles.contentRow, fullWidth && styles.contentRowFull]}>
      {loading ? (
        <ActivityIndicator color={variant === 'primary' ? colors.textOnBrand : colors.brand} />
      ) : (
        <>
          {icon}
          <Text
            style={[
              styles.label,
              { fontSize: fontSizeBySize },
              variant === 'primary' && { color: colors.textOnBrand },
              variant === 'secondary' && { color: colors.textPrimary },
              variant === 'ghost' && { color: colors.brand },
              variant === 'danger' && { color: colors.white },
              textColor && { color: textColor },
            ]}
          >
            {label}
          </Text>
        </>
      )}
    </View>
  );

  if (variant === 'primary') {
    return (
      <Pressable
        onPress={handlePress}
        disabled={disabled || loading}
        style={({ pressed }) => [
          fullWidth && styles.fullWidth,
          { opacity: disabled ? 0.5 : pressed ? 0.88 : 1 },
          style,
        ]}
      >
        <LinearGradient
          colors={gradients.brandButton}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[
            styles.base,
            {
              height: heightBySize,
              paddingHorizontal: horizontalPaddingBySize,
            },
          ]}
        >
          {content}
        </LinearGradient>
      </Pressable>
    );
  }

  return (
    <Pressable
      onPress={handlePress}
      disabled={disabled || loading}
      style={({ pressed }) => [
        styles.base,
        {
          height: heightBySize,
          paddingHorizontal: horizontalPaddingBySize,
          opacity: disabled ? 0.5 : pressed ? 0.75 : 1,
        },
        variant === 'secondary' && styles.secondary,
        variant === 'ghost' && styles.ghost,
        variant === 'danger' && styles.danger,
        fullWidth && styles.fullWidth,
        style,
      ]}
    >
      {content}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  base: {
    borderRadius: radii.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullWidth: { width: '100%' },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
  },
  contentRowFull: {
    width: '100%',
  },
  label: {
    ...type.bodySemiBold,
    fontWeight: '600',
  },
  secondary: {
    backgroundColor: colors.surfaceHigh,
    borderWidth: 1,
    borderColor: colors.border,
  },
  ghost: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.brandDim,
  },
  danger: {
    backgroundColor: colors.negative,
  },
});
