/**
 * GXT Exchange — Design Tokens
 * Palette derived from the brand mark: cyan glow on near-black.
 * "Signal cyan" is the single accent — used sparingly for actions,
 * gains, and focus states so it keeps its meaning.
 */

export const colors = {
  // Base surfaces — matched to the live gxtexchange.com app: true black,
  // with barely-there elevation so separation comes from borders, not fill.
  background: '#000000',
  backgroundElevated: '#050505',
  surface: '#0A0A0A',
  surfaceHigh: '#141414',
  surfaceBrand: '#3bd4fe57',
  border: '#1F1F1F',
  borderSubtle: '#161616',

  // Brand — sampled directly from the live app (avatar / "Buy now" cyan)
  brand: '#3BD5FE',
  brandMuted: '#1F6D83', // used for "Review" CTAs in wallet flows (Send/Withdraw/Transfer)
  brandDim: '#1B8E9C',
  brandGlow: 'rgba(59, 213, 254, 0.16)',
  brandLight: '#252525',
  brandGradientStart: '#57C1DB',
  brandGradientEnd: '#2FA9D6',

  // Semantic (market movement) — solid fill pills/buttons, matched to app
  positive: '#22D790',
  positiveDim: 'rgba(34, 215, 144, 0.14)',
  negative: '#FF5251',
  negativeDim: 'rgba(255, 82, 81, 0.14)',
  warning: '#F5B94A',

  // Text
  textPrimary: '#FFFFFF',
  textSecondary: '#8B8B8B',
  textTertiary: '#5C5C5C',
  textOnBrand: '#050505',
  textInverse: '#000000',

  // Utility
  white: '#FFFFFF',
  black: '#000000',
  overlay: 'rgba(0, 0, 0, 0.78)',
  divider: '#161616',
  skeleton: '#121212',
} as const;

export const gradients = {
  splash: ['#000000', '#050809', '#000000'] as const,
  brandButton: ['#57C1DB', '#3BD5FE'] as const,
  card: ['#0D0D0D', '#000000'] as const,
  heroGlow: ['rgba(59,213,254,0.16)', 'rgba(59,213,254,0)'] as const,
};

export const radii = {
  xs: 6,
  sm: 10,
  md: 14,
  lg: 20,
  xl: 28,
  pill: 999,
};

export const spacing = {
  xxs: 4,
  xs: 8,
  sm: 12,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const shadow = {
  glow: {
    shadowColor: colors.brand,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 8,
  },
  card: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.28,
    shadowRadius: 12,
    elevation: 4,
  },
};
