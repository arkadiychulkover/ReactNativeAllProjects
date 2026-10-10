import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppContext } from "../context/AppContext";

export const LoginScreen = (): React.JSX.Element => {
  const { login } = useAppContext();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLoginPress = async (): Promise<void> => {
    await login(username, password);
  };

  return (
    <SafeAreaView edges={["top", "bottom", "left", "right"]} style={{ flex: 1, justifyContent: "center", padding: 24, backgroundColor: "#f8fafc" }}>
      <View style={{ backgroundColor: "#ffffff", padding: 24, borderRadius: 14, borderWidth: 1, borderColor: "#e2e8f0" }}>
        <Text style={{ fontSize: 24, fontWeight: "700", marginBottom: 8, color: "#0f172a", textAlign: "center" }}>Вхід у систему</Text>
        <Text style={{ fontSize: 14, color: "#64748b", marginBottom: 20, textAlign: "center" }}>Керування бібліотекою книг</Text>
        <Text style={{ fontSize: 13, color: "#475569", marginBottom: 4 }}>{"Ім'я користувача:"}</Text>
        <TextInput placeholder="Username (наприклад: admin)" value={username} onChangeText={setUsername} autoCapitalize="none" style={{ borderWidth: 1, borderColor: "#cbd5e1", borderRadius: 8, padding: 10, marginBottom: 12, backgroundColor: "#ffffff" }} />
        <Text style={{ fontSize: 13, color: "#475569", marginBottom: 4 }}>Пароль:</Text>
        <TextInput placeholder="Password (наприклад: 123)" secureTextEntry value={password} onChangeText={setPassword} autoCapitalize="none" style={{ borderWidth: 1, borderColor: "#cbd5e1", borderRadius: 8, padding: 10, marginBottom: 20, backgroundColor: "#ffffff" }} />
        <TouchableOpacity onPress={handleLoginPress} style={{ backgroundColor: "#0284c7", padding: 12, borderRadius: 8, alignItems: "center" }}>
          <Text style={{ color: "#ffffff", fontWeight: "700", fontSize: 16 }}>Увійти</Text>
        </TouchableOpacity>
        <View style={{ marginTop: 20, padding: 12, backgroundColor: "#f1f5f9", borderRadius: 8 }}>
          <Text style={{ fontSize: 12, color: "#475569", fontWeight: "600" }}>Підказка для входу:</Text>
          <Text style={{ fontSize: 12, color: "#64748b", marginTop: 2 }}>Головний адмін: admin / 123 (повний доступ)</Text>
          <Text style={{ fontSize: 12, color: "#64748b", marginTop: 2 }}>Створені користувачі: тільки перегляд книг</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};
