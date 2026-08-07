import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MarketsScreen } from '../screens/markets/MarketsScreen';
import { TradingScreen } from '../screens/trading/TradingScreen';
import type { MarketsStackParamList } from './types';

const Stack = createNativeStackNavigator<MarketsStackParamList>();

export const MarketsNavigator: React.FC = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="MarketsList" component={MarketsScreen} />
    <Stack.Screen name="Trading" component={TradingScreen} /> 
  </Stack.Navigator>
);
