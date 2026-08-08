import type { NavigatorScreenParams } from '@react-navigation/native';

export type AuthStackParamList = {
  Login: undefined;
  SignUp: undefined;
};

export type MarketsStackParamList = {
  MarketsList: undefined;
  Trading: { coinId: string };
};

export type AssetsStackParamList = {
  AssetsHome: undefined;
  Deposit: undefined;
  WalletFlow: { tab?: 'Transfer' | 'Send' | 'Withdraw' | 'History' } | undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Markets: undefined;
  Trade: { coinId?: string } | undefined;
  Futures: undefined;
  Assets: NavigatorScreenParams<AssetsStackParamList>;
  Profile: undefined;
};

export type RootStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  Auth: NavigatorScreenParams<AuthStackParamList>;
  Main: undefined;
};
