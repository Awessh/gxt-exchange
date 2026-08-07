import React from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';
import { colors, radii, shadow, spacing } from '../theme/colors';

interface CardProps extends ViewProps {
  padded?: boolean;
  elevated?: boolean;
}

export const Card: React.FC<CardProps> = ({ style, padded = true, elevated = true, children, ...rest }) => {
  return (
    <View
      style={[
        styles.base,
        padded && { padding: spacing.md },
        elevated && shadow.card,
        style,
      ]}
      {...rest}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  base: {
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
  },
});
