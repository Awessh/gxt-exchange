import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../theme/colors';
import { GxtLogo } from '../components/GxtLogo';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Splash'>;

export const SplashScreen: React.FC<Props> = ({ navigation }) => {
  const glowOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(glowOpacity, {
      toValue: 1,
      duration: 900,
      useNativeDriver: true,
    }).start();

    const timer = setTimeout(() => {
      navigation.replace('Onboarding');
    }, 2200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <LinearGradient colors={[colors.background, '#0E1620', colors.background]} style={styles.container}>
      <Animated.View style={[styles.glow, { opacity: glowOpacity }]} />
      <GxtLogo width={260} />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  glow: {
    position: 'absolute',
    width: 260,
    height: 260,
    borderRadius: 130,
    opacity: 0.14,
    shadowOpacity: 0.6,
    shadowRadius: 60,
  },
});