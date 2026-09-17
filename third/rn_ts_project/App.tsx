import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import CategoryScreen from "./src/screens/CategoryScreen";
// import HomeScreen from "./src/screens/HomeScreen";
// import LikedScreen from "./src/screens/LikedScreen";
// import { useState } from "react";

export default function App() {
  // const [currentScreen, setCurrentScreen] = useState<"home" | "liked">("home");

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <CategoryScreen />
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
