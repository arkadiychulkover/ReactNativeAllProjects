import React from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen';
import YourBagScreen from '../screens/YourBagScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { useShopStore } from '../store/shopStore';

export type ShopTabParamList = {
  Home: undefined;
  YourBag: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<ShopTabParamList>();

const THEME_GREEN = '#477361';
const INACTIVE_COLOR = '#8A929A';

export const ShopTabNavigator = () => {
  const bag = useShopStore((state) => state.bag);
  const totalBagCount = Object.values(bag).reduce((sum, qty) => sum + qty, 0);

  return (
    <Tab.Navigator initialRouteName="Home" screenOptions={{ headerShown: false, tabBarActiveTintColor: THEME_GREEN, tabBarInactiveTintColor: INACTIVE_COLOR, tabBarStyle: styles.tabBar, tabBarLabelStyle: styles.tabBarLabel }}>
      <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarLabel: 'Home', tabBarIcon: ({ color, focused }) => <Ionicons name={focused ? 'home' : 'home-outline'} size={24} color={color} /> }} />
      <Tab.Screen name="YourBag" component={YourBagScreen} options={{ tabBarLabel: 'Bag', tabBarBadge: totalBagCount > 0 ? (totalBagCount > 99 ? '99+' : totalBagCount) : undefined, tabBarBadgeStyle: styles.badge, tabBarIcon: ({ color, focused }) => <Ionicons name={focused ? 'bag' : 'bag-outline'} size={24} color={color} /> }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ tabBarLabel: 'Profile', tabBarIcon: ({ color, focused }) => <Ionicons name={focused ? 'person' : 'person-outline'} size={24} color={color} /> }} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#FFFFFF',
    borderTopColor: '#F0F2F5',
    borderTopWidth: 1,
    height: 60,
    paddingBottom: 6,
    paddingTop: 6,
  },
  tabBarLabel: {
    fontSize: 11,
    fontWeight: '600',
  },
  badge: {
    backgroundColor: THEME_GREEN,
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
  },
});

export default ShopTabNavigator;
