import type { NavigatorScreenParams } from '@react-navigation/native';

export type AuthStackParamList = {
  Login: undefined;
  SignUp: undefined;
};

export type MarketsStackParamList = {
  MarketsList: undefined;
  Trading: { coinId: string };
};

export type MainTabParamList = {
  Home: undefined;
  Markets: NavigatorScreenParams<MarketsStackParamList>;
  Trading: undefined;
  Futures: undefined;
  Wallet: undefined;
  Profile: undefined;
};

export type RootStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  Auth: NavigatorScreenParams<AuthStackParamList>;
  Main: undefined;
};
