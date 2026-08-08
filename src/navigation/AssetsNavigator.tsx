import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { WalletScreen } from '../screens/wallet/WalletScreen';
import { DepositScreen } from '../screens/wallet/DepositScreen';
import { WalletFlowScreen } from '../screens/wallet/WalletFlowScreen';
import type { AssetsStackParamList } from './types';

const Stack = createNativeStackNavigator<AssetsStackParamList>();

export const AssetsNavigator: React.FC = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="AssetsHome" component={WalletScreen} />
    <Stack.Screen name="Deposit" component={DepositScreen} />
    <Stack.Screen name="WalletFlow" component={WalletFlowScreen} />
  </Stack.Navigator>
);
