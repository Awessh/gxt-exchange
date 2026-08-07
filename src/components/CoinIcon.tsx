import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface CoinIconProps {
  symbol: string;
  color: string;
  size?: number;
}

export const CoinIcon: React.FC<CoinIconProps> = ({ symbol, color, size = 36 }) => {
  return (
    <View
      style={[
        styles.base,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: `${color}22`,
          borderColor: `${color}55`,
        },
      ]}
    >
      <Text style={[styles.text, { color, fontSize: size * 0.36 }]}>
        {symbol.slice(0, 1)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  text: {
    fontWeight: '800',
  },
});
