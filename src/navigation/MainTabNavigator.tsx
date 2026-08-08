import React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { HomeScreen } from '../screens/home/HomeScreen';
import { MarketsNavigator } from './MarketsNavigator';
import { TradingScreen } from '../screens/trading/TradingScreen';
import { FuturesScreen } from '../screens/futures/FuturesScreen';
import { AssetsNavigator } from './AssetsNavigator';
import { ProfileScreen } from '../screens/profile/ProfileScreen';
import { LaunchpadScreen } from '../screens/growth/LaunchpadScreen';
import { AirdropMiningScreen } from '../screens/growth/AirdropMiningScreen';
import { InviteScreen } from '../screens/growth/InviteScreen';
import { RewardsScreen } from '../screens/growth/RewardsScreen';
import { colors } from '../theme/colors';
import type { MainTabParamList } from './types';
import { MarketsScreen } from '../screens/markets/MarketsScreen';

const Tab = createBottomTabNavigator<MainTabParamList>();

const iconMap: Partial<Record<keyof MainTabParamList, { active: keyof typeof Ionicons.glyphMap; inactive: keyof typeof Ionicons.glyphMap }>> = {
  Home: { active: 'home', inactive: 'home-outline' },
  Markets: { active: 'bar-chart', inactive: 'bar-chart-outline' },
  Trade: { active: 'swap-horizontal', inactive: 'swap-horizontal-outline' },
  Futures: { active: 'trending-up', inactive: 'trending-up-outline' },
  Assets: { active: 'wallet', inactive: 'wallet-outline' },
  Profile: { active: 'person', inactive: 'person-outline' },
};

export const MainTabNavigator: React.FC = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarActiveTintColor: colors.brand,
      tabBarInactiveTintColor: colors.textTertiary,
      tabBarStyle: {
        backgroundColor: colors.background,
        borderTopColor: colors.borderSubtle,
        borderTopWidth: 1,
        height: 84,
        paddingTop: 8,
        paddingBottom: 22,
      },
      tabBarLabelStyle: { fontSize: 11, fontWeight: '600' },
      tabBarIcon: ({ focused, color }) => {
        if (route.name === 'Home') {
          return (
            <Image
              source={require('../../assets/icon.png')}
              style={{ width: 22, height: 22, opacity: focused ? 1 : 0.5 }}
              resizeMode="contain"
            />
          );
        }
        const icons = iconMap[route.name as keyof MainTabParamList];
        if (!icons) return null;
        return <Ionicons name={focused ? icons.active : icons.inactive} size={22} color={color} />;
      },
    })}
  >
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Markets" component={MarketsScreen} />
    <Tab.Screen name="Trade" component={TradingScreen as any} initialParams={{ coinId: 'btc' }} />
    <Tab.Screen name="Futures" component={FuturesScreen} /> 
    <Tab.Screen name="Assets" component={AssetsNavigator} />
    <Tab.Screen
      name="Profile"
      component={ProfileScreen}
      options={{ tabBarButton: () => null, tabBarStyle: { display: 'none' } }}
    />
    <Tab.Screen
      name="Launchpad"
      component={LaunchpadScreen as any}
      options={{ tabBarButton: () => null, tabBarStyle: { display: 'none' } }}
    />
    <Tab.Screen
      name="AirdropMining"
      component={AirdropMiningScreen as any}
      options={{ tabBarButton: () => null, tabBarStyle: { display: 'none' } }}
    />
    <Tab.Screen
      name="Invite"
      component={InviteScreen as any}
      options={{ tabBarButton: () => null, tabBarStyle: { display: 'none' } }}
    />
    <Tab.Screen
      name="Rewards"
      component={RewardsScreen as any}
      options={{ tabBarButton: () => null, tabBarStyle: { display: 'none' } }}
    />
  </Tab.Navigator>
);
