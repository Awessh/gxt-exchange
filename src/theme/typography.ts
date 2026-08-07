import { TextStyle } from 'react-native';

/**
 * Type scale. Uses the system font stack tuned for a technical/fintech feel:
 * tight tracking on numerics, generous tracking on eyebrows/labels.
 * Swap `fontFamily` values for 'Inter' / 'SpaceGrotesk' once custom fonts
 * are loaded via expo-font (see App.tsx) — falls back gracefully to system.
 */

export const fontFamily = {
  display: undefined, // set to 'SpaceGrotesk-Bold' once loaded
  body: undefined, // set to 'Inter-Regular'
  bodyMedium: undefined, // 'Inter-Medium'
  bodySemiBold: undefined, // 'Inter-SemiBold'
  mono: undefined, // 'RobotoMono-Regular' for prices/tickers
};

export const type: Record<string, TextStyle> = {
  display: {
    fontSize: 34,
    fontWeight: '700',
    letterSpacing: -0.5,
  },
  h1: {
    fontSize: 26,
    fontWeight: '700',
    letterSpacing: -0.3,
  },
  h2: {
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: -0.2,
  },
  h3: {
    fontSize: 17,
    fontWeight: '600',
  },
  body: {
    fontSize: 15,
    fontWeight: '400',
  },
  bodyMedium: {
    fontSize: 15,
    fontWeight: '500',
  },
  caption: {
    fontSize: 13,
    fontWeight: '400',
  },
  eyebrow: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  numeric: {
    fontSize: 32,
    fontWeight: '700',
    letterSpacing: -0.5,
    fontVariant: ['tabular-nums'],
  },
  numericSm: {
    fontSize: 15,
    fontWeight: '600',
    fontVariant: ['tabular-nums'],
  },
};
