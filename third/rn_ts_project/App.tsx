import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import LikedScreen from "./src/screens/LikedScreen";
import HomeScreen from "./src/screens/HomeScreen";
import AdaptivScreen from "./src/screens/AdaptivScreen";
import CategoryScreen from "./src/screens/CategoryScreen";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<"liked" | "home" | "adaptive" | "category">("liked");

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={["left", "right", "bottom"]}>
        {currentScreen === "liked" && (
          <LikedScreen onBack={() => setCurrentScreen("home")} />
        )}
        {currentScreen === "home" && <HomeScreen />}
        {currentScreen === "adaptive" && <AdaptivScreen />}
        {currentScreen === "category" && <CategoryScreen />}
        <StatusBar style="auto" />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
});
