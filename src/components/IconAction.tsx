import React from 'react';
import { Pressable, StyleSheet, Text, View, StyleProp, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radii, spacing } from '../theme/colors';

interface IconActionProps {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  tag?: string;
  size?: number;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

export const IconAction: React.FC<IconActionProps> = ({ icon, label, tag, size = 52, onPress, style }) => {
  return (
    <Pressable onPress={onPress} style={[styles.wrap, style]}>
      <View style={[styles.circle, { width: size, height: size, borderRadius: size / 2 }]}>
        <Ionicons name={icon} size={size * 0.42} color={colors.textPrimary} />
        {tag && (
          <View style={styles.tag}>
            <Text style={styles.tagText}>{tag}</Text>
          </View>
        )}
      </View>
      <Text style={styles.label} numberOfLines={1}>
        {label}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  wrap: { alignItems: 'center' },
  circle: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tag: {
    position: 'absolute',
    top: -6,
    right: -8,
    backgroundColor: colors.brand,
    borderRadius: radii.xs,
    paddingHorizontal: 5,
    paddingVertical: 1.5,
  },
  tagText: {
    fontSize: 8.5,
    fontWeight: '800',
    color: colors.black,
  },
  label: {
    fontSize: 11.5,
    color: colors.textSecondary,
    fontWeight: '600',
    marginTop: 6,
    textAlign: 'center',
  },
});
