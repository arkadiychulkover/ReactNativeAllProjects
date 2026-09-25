import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ShopTabNavigator } from './ShopTabNavigator';
import DetailsScreen from '../screens/DetailsScreen';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import YourBagScreen from '../screens/YourBagScreen';

export type RootStackParamList = {
  ShopTabs: undefined;
  Home: undefined;
  Profile: undefined;
  Details: { productId: string };
  YourBag: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="ShopTabs" screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
      <Stack.Screen name="ShopTabs" component={ShopTabNavigator} />
      <Stack.Screen name="Details" component={DetailsScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="YourBag" component={YourBagScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
}