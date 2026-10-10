import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "@expo/vector-icons/FontAwesome";
import { useAppContext } from "../context/AppContext";
import { LoginScreen } from "../screens/LoginScreen";
import { BooksScreen } from "../screens/BooksScreen";
import { UsersScreen } from "../screens/UsersScreen";
import { SettingsScreen } from "../screens/SettingsScreen";
import { AboutScreen } from "../screens/AboutScreen";

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

export const HomeTabNavigator = (): React.JSX.Element => {
  const { isAdmin } = useAppContext();

  return (
    <Tab.Navigator screenOptions={{ tabBarActiveTintColor: "#0284c7", tabBarInactiveTintColor: "#64748b" }}>
      <Tab.Screen name="BooksTab" component={BooksScreen} options={{ title: "Книги", tabBarIcon: ({ color, size }) => <Icon name="book" size={size} color={color} /> }} />
      {isAdmin && (
        <Tab.Screen name="UsersTab" component={UsersScreen} options={{ title: "Користувачі", tabBarIcon: ({ color, size }) => <Icon name="users" size={size} color={color} /> }} />
      )}
      <Tab.Screen name="SettingsTab" component={SettingsScreen} options={{ title: "Налаштування", tabBarIcon: ({ color, size }) => <Icon name="cogs" size={size} color={color} /> }} />
    </Tab.Navigator>
  );
};

export const HomeScreen = (): React.JSX.Element => {
  const { currentUser } = useAppContext();
  if (!currentUser) {
    return <LoginScreen />;
  }
  return <HomeTabNavigator />;
};

export const MainDrawerNavigator = (): React.JSX.Element => {
  const { currentUser } = useAppContext();

  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={HomeScreen} options={{ title: currentUser ? "Головна" : "Авторизація", drawerIcon: ({ color, size }) => <Icon name="home" size={size} color={color} /> }} />
      <Drawer.Screen name="About" component={AboutScreen} options={{ title: "Про додаток", drawerIcon: ({ color, size }) => <Icon name="info-circle" size={size} color={color} /> }} />
    </Drawer.Navigator>
  );
};
