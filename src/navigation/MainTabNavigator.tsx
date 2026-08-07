import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { HomeScreen } from '../screens/home/HomeScreen';
import { MarketsNavigator } from './MarketsNavigator';
import { TradingScreen } from '../screens/trading/TradingScreen';
import { FuturesScreen } from '../screens/futures/FuturesScreen';
import { WalletScreen } from '../screens/wallet/WalletScreen';
import { ProfileScreen } from '../screens/profile/ProfileScreen';
import { colors } from '../theme/colors';
import type { MainTabParamList } from './types';

const Tab = createBottomTabNavigator<MainTabParamList>();

const iconMap: Record<keyof MainTabParamList, { active: keyof typeof Ionicons.glyphMap; inactive: keyof typeof Ionicons.glyphMap }> = {
  Home: { active: 'home', inactive: 'home-outline' },
  Markets: { active: 'bar-chart', inactive: 'bar-chart-outline' },
  Trading: { active: 'swap-horizontal', inactive: 'swap-horizontal-outline' },
  Futures: { active: 'flash', inactive: 'flash-outline' },
  Wallet: { active: 'wallet', inactive: 'wallet-outline' },
  Profile: { active: 'person', inactive: 'person-outline' },
};

export const MainTabNavigator: React.FC = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarActiveTintColor: colors.brand,
      tabBarInactiveTintColor: colors.textTertiary,
      tabBarStyle: {
        backgroundColor: colors.backgroundElevated,
        borderTopColor: colors.borderSubtle,
        borderTopWidth: 1,
        height: 84,
        paddingTop: 8,
        paddingBottom: 22,
      },
      tabBarLabelStyle: { fontSize: 11, fontWeight: '600' },
      tabBarIcon: ({ focused, color, size }) => {
        const icons = iconMap[route.name as keyof MainTabParamList];
        return <Ionicons name={focused ? icons.active : icons.inactive} size={22} color={color} />;
      },
    })}
  >
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Markets" component={MarketsNavigator} />
    <Tab.Screen name="Trading" component={TradingScreen} />
    <Tab.Screen name="Futures" component={FuturesScreen} />
    <Tab.Screen name="Wallet" component={WalletScreen} />
    <Tab.Screen name="Profile" component={ProfileScreen} options={{
        tabBarButton: () => null,
      }} />
  </Tab.Navigator>
);
