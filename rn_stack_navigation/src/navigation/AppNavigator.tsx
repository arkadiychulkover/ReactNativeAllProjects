import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ShopTabNavigator } from './ShopTabNavigator';
import DetailsScreen from '../screens/DetailsScreen';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import YourBagScreen from '../screens/YourBagScreen';

import { Category } from '../store/shopStore';

export type RootStackParamList = {
  ShopTabs: { category?: Category } | undefined;
  DrawerMenu: undefined;
  Home: { category?: Category } | undefined;
  Profile: undefined;
  Details: { productId: string };
  YourBag: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator({ route }: any) {
  const category = route?.params?.category as Category | undefined;

  return (
    <Stack.Navigator initialRouteName="ShopTabs" screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
      <Stack.Screen
        name="ShopTabs"
        component={ShopTabNavigator}
        initialParams={{ category }}
      />
      <Stack.Screen name="Details" component={DetailsScreen} />
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        initialParams={{ category }}
      />
      <Stack.Screen name="YourBag" component={YourBagScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
}