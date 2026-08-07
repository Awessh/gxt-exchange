/**
 * GXT Exchange — Design Tokens
 * Palette derived from the brand mark: cyan glow on near-black.
 * "Signal cyan" is the single accent — used sparingly for actions,
 * gains, and focus states so it keeps its meaning.
 */

export const colors = {
  // Base surfaces — layered blacks, not pure #000, for depth without noise
  background: '#0A0D12',
  backgroundElevated: '#10141B',
  surface: '#151A22',
  surfaceHigh: '#1C222C',
  border: '#232A35',
  borderSubtle: '#1A2028',

  // Brand
  brand: '#2FE0F0', // signal cyan — primary accent, matches logo glow
  brandDim: '#1B8E9C',
  brandGlow: 'rgba(47, 224, 240, 0.18)',
  brandGradientStart: '#2FE0F0',
  brandGradientEnd: '#1C7FE0',

  // Semantic (market movement)
  positive: '#1FD68B',
  positiveDim: 'rgba(31, 214, 139, 0.14)',
  negative: '#F4485C',
  negativeDim: 'rgba(244, 72, 92, 0.14)',
  warning: '#F5B94A',

  // Text
  textPrimary: '#F5F7FA',
  textSecondary: '#8B95A5',
  textTertiary: '#5C6577',
  textOnBrand: '#03181B',
  textInverse: '#0A0D12',

  // Utility
  white: '#FFFFFF',
  black: '#000000',
  overlay: 'rgba(6, 8, 12, 0.72)',
  divider: '#1E242D',
  skeleton: '#1A2029',
} as const;

export const gradients = {
  splash: ['#0A0D12', '#0E1620', '#0A0D12'] as const,
  brandButton: ['#2FE0F0', '#1C9FE0'] as const,
  card: ['#161C25', '#101419'] as const,
  heroGlow: ['rgba(47,224,240,0.16)', 'rgba(47,224,240,0)'] as const,
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
