import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AppNavigator from './AppNavigator';
import ProfileScreen from '../screens/ProfileScreen';
import { useShopStore, Category } from '../store/shopStore';

export type DrawerParamList = {
  Shop: { category?: Category } | undefined;
  Profile: undefined;
  [key: string]: { category?: Category } | undefined;
};

const Drawer = createDrawerNavigator<DrawerParamList>();

export const DrawerNavigator = () => {
  const categories = useShopStore((state) => state.availableCategories);

  return (
    <Drawer.Navigator screenOptions={{ headerShown: true }}>
      <Drawer.Screen
        name="Shop"
        component={AppNavigator}
        options={{
          drawerLabel: 'All Products',
          title: 'Shop',
        }}
      />
      {categories.map((category) => (
        <Drawer.Screen
          key={category}
          name={category}
          component={AppNavigator}
          initialParams={{ category }}
          options={{
            drawerLabel: category,
            title: category,
          }}
        />
      ))}
      <Drawer.Screen name="Profile" component={ProfileScreen} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;