import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import CartScreen from "./src/screens/CartScreen";

export default function App() {
  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <CartScreen />
        <StatusBar style="light" />
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1C2536",
  },
});
