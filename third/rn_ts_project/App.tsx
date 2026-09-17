import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import AdaptivScreen from "./src/screens/AdaptivScreen";
// import CategoryScreen from "./src/screens/CategoryScreen";
// import HomeScreen from "./src/screens/HomeScreen";
// import LikedScreen from "./src/screens/LikedScreen";
// import { useState } from "react";

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={["left", "right", "bottom"]}>
        <AdaptivScreen />
        <StatusBar style="auto" />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f6f4",
  },
});
