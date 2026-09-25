import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';
import HomeScreen from '../tabScreens/HomeScreen';
import DetailsScreen from '../tabScreens/DetailsScreen';
import ProfileScreen from '../tabScreens/ProfileScreen';

export type RootTabParamList = {
  Home: undefined;
  Profile: undefined;
  Details: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

export const AppTabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false, tabBarActiveTintColor: '#477361', tabBarInactiveTintColor: '#8A929A' }}>
      <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarIcon: ({ focused }) => <Image source={require('../../assets/icons/home.png')} style={{ height: 24, width: 24, tintColor: focused ? '#477361' : '#8A929A' }} /> }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ tabBarIcon: ({ focused }) => <Image source={require('../../assets/icons/profile.png')} style={{ height: 24, width: 24, tintColor: focused ? '#477361' : '#8A929A' }} /> }} />
      <Tab.Screen name="Details" component={DetailsScreen} options={{ tabBarIcon: ({ focused }) => <Image source={require('../../assets/icons/details.png')} style={{ height: 24, width: 24, tintColor: focused ? '#477361' : '#8A929A' }} /> }} />
    </Tab.Navigator>
  );
};

export default AppTabNavigator;