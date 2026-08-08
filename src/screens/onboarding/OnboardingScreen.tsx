import React, { useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, radii, spacing } from '../../theme/colors';
import { type } from '../../theme/typography';
import { Button } from '../../components/DepositButton';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../navigation/types';

const { width } = Dimensions.get('window');

type Props = NativeStackScreenProps<RootStackParamList, 'Onboarding'>;

const slides = [
  {
    key: 'trade',
    icon: 'trending-up' as const,
    title: 'Trade anywhere',
    body: 'Spot and futures markets in your pocket. Execute in seconds with real-time pricing, wherever you are.',
  },
  {
    key: 'secure',
    icon: 'shield-checkmark' as const,
    title: 'Secure your assets',
    body: 'Biometric login, cold-storage backed custody, and withdrawal whitelists keep your funds protected.',
  },
  {
    key: 'market',
    icon: 'pulse' as const,
    title: 'Real-time market access',
    body: 'Live order books, depth charts, and instant alerts — never miss a move across 300+ markets.',
  },
];

export const OnboardingScreen: React.FC<Props> = ({ navigation }) => {
  const [index, setIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const listRef = useRef<FlatList>(null);

  const onMomentumEnd = (e: any) => {
    const i = Math.round(e.nativeEvent.contentOffset.x / width);
    setIndex(i);
  };

  const goNext = () => {
    if (index < slides.length - 1) {
      listRef.current?.scrollToIndex({ index: index + 1 });
    } else {
      navigation.replace('Auth', { screen: 'Login' });
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <View style={styles.skipRow}>
        <View />
        <Text
          style={styles.skip}
          onPress={() => navigation.replace('Auth', { screen: 'Login' })}
        >
          Skip
        </Text>
      </View>

      <Animated.FlatList
        ref={listRef}
        data={slides}
        keyExtractor={(item) => item.key}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
          useNativeDriver: false,
        })}
        onMomentumScrollEnd={onMomentumEnd}
        renderItem={({ item }) => (
          <View style={[styles.slide, { width }]}>
            <View style={styles.iconWrap}>
              <LinearGradient
                colors={['rgba(47,224,240,0.22)', 'rgba(47,224,240,0.02)']}
                style={styles.iconGlow}
              >
                <Ionicons name={item.icon} size={56} color={colors.brand} />
              </LinearGradient>
            </View>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.body}>{item.body}</Text>
          </View>
        )}
      />

      <View style={styles.dots}>
        {slides.map((_, i) => {
          const dotWidth = scrollX.interpolate({
            inputRange: [width * (i - 1), width * i, width * (i + 1)],
            outputRange: [8, 22, 8],
            extrapolate: 'clamp',
          });
          const opacity = scrollX.interpolate({
            inputRange: [width * (i - 1), width * i, width * (i + 1)],
            outputRange: [0.3, 1, 0.3],
            extrapolate: 'clamp',
          });
          return (
            <Animated.View
              key={i}
              style={[styles.dot, { width: dotWidth, opacity }]}
            />
          );
        })}
      </View>

      <View style={styles.footer}>
        <Button label={index === slides.length - 1 ? 'Get started' : 'Continue'} onPress={goNext} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  skipRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
  },
  skip: { color: colors.textTertiary, ...type.bodyMedium },
  slide: { alignItems: 'center', paddingHorizontal: spacing.xl, paddingTop: spacing.xxl },
  iconWrap: { marginBottom: spacing.xl },
  iconGlow: {
    width: 140,
    height: 140,
    borderRadius: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: { ...type.display, color: colors.textPrimary, textAlign: 'center', marginBottom: spacing.sm },
  body: { ...type.body, color: colors.textSecondary, textAlign: 'center', lineHeight: 22 },
  dots: { flexDirection: 'row', justifyContent: 'center', gap: 6, marginTop: spacing.lg },
  dot: { height: 8, borderRadius: radii.pill, backgroundColor: colors.brand },
  footer: { paddingHorizontal: spacing.lg, paddingTop: spacing.lg, paddingBottom: spacing.sm },
});
