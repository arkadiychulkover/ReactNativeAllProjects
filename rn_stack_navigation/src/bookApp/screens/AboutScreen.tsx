import React from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "@expo/vector-icons/FontAwesome";

export const AboutScreen = (): React.JSX.Element => {
  return (
    <SafeAreaView edges={["bottom", "left", "right"]} style={{ flex: 1, padding: 24, backgroundColor: "#f8fafc", justifyContent: "center" }}>
      <View style={{ backgroundColor: "#ffffff", padding: 24, borderRadius: 14, borderWidth: 1, borderColor: "#e2e8f0" }}>
        <Icon name="book" size={40} color="#0284c7" style={{ marginBottom: 12 }} />
        <Text style={{ fontSize: 22, fontWeight: "700", color: "#0f172a", marginBottom: 8 }}>Про додаток «Book Manager»</Text>
        <Text style={{ fontSize: 14, color: "#475569", lineHeight: 22, marginBottom: 16 }}>
          Мобільний додаток для керування списком книг на React Native з повною підтримкою AsyncStorage та ролевою моделлю доступу.
        </Text>
        <View style={{ borderTopWidth: 1, borderTopColor: "#e2e8f0", paddingTop: 12 }}>
          <Text style={{ fontSize: 13, color: "#64748b", marginBottom: 4 }}>• Збереження даних у локальному AsyncStorage</Text>
          <Text style={{ fontSize: 13, color: "#64748b", marginBottom: 4 }}>• Ролі: Головний Адміністратор та Переглядачі</Text>
          <Text style={{ fontSize: 13, color: "#64748b", marginBottom: 4 }}>• Повне оновлення та редагування книг</Text>
          <Text style={{ fontSize: 13, color: "#64748b" }}>• SafeAreaView виправлено через react-native-safe-area-context</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};
