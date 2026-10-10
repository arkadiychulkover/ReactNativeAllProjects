import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from "react-native";
import Icon from "@expo/vector-icons/FontAwesome";
import { useAppContext } from "../context/AppContext";

export const UsersScreen = (): React.JSX.Element => {
  const { users, registerUser, isAdmin } = useAppContext();
  const [newUsername, setNewUsername] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");

  const handleRegisterPress = async (): Promise<void> => {
    const result = await registerUser(newUsername, newPassword);
    if (result.success) {
      Alert.alert("Успіх", result.message, [{ text: "OK" }]);
      setNewUsername("");
      setNewPassword("");
    } else {
      Alert.alert("Помилка", result.message, [{ text: "OK" }]);
    }
  };

  if (!isAdmin) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 20 }}>
        <Icon name="lock" size={48} color="#94a3b8" />
        <Text style={{ fontSize: 18, fontWeight: "700", color: "#475569", marginTop: 12 }}>Доступ заборонено</Text>
        <Text style={{ color: "#94a3b8", textAlign: "center", marginTop: 6 }}>Реєструвати нових користувачів може тільки головний адміністратор.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={{ flex: 1, padding: 16, backgroundColor: "#f8fafc" }}>
      <View style={{ backgroundColor: "#ffffff", padding: 16, borderRadius: 12, borderWidth: 1, borderColor: "#e2e8f0", marginBottom: 16 }}>
        <Text style={{ fontSize: 18, fontWeight: "700", color: "#0f172a", marginBottom: 4 }}>Реєстрація нового користувача</Text>
        <Text style={{ fontSize: 13, color: "#64748b", marginBottom: 12 }}>Нові користувачі зберігаються в AsyncStorage і мають права лише на перегляд.</Text>
        <TextInput placeholder="Логін нового користувача" value={newUsername} onChangeText={setNewUsername} autoCapitalize="none" style={{ borderWidth: 1, borderColor: "#cbd5e1", borderRadius: 8, padding: 10, marginBottom: 8, backgroundColor: "#ffffff" }} />
        <TextInput placeholder="Пароль" secureTextEntry value={newPassword} onChangeText={setNewPassword} autoCapitalize="none" style={{ borderWidth: 1, borderColor: "#cbd5e1", borderRadius: 8, padding: 10, marginBottom: 14, backgroundColor: "#ffffff" }} />
        <TouchableOpacity onPress={handleRegisterPress} style={{ backgroundColor: "#0284c7", padding: 12, borderRadius: 8, alignItems: "center", flexDirection: "row", justifyContent: "center", gap: 8 }}>
          <Icon name="user-plus" size={14} color="#ffffff" />
          <Text style={{ color: "#ffffff", fontWeight: "700", fontSize: 15 }}>Зареєструвати переглядача</Text>
        </TouchableOpacity>
      </View>

      <View style={{ backgroundColor: "#ffffff", padding: 16, borderRadius: 12, borderWidth: 1, borderColor: "#e2e8f0" }}>
        <Text style={{ fontSize: 16, fontWeight: "700", color: "#0f172a", marginBottom: 10 }}>Зареєстровані користувачі ({users.length})</Text>
        {users.map((u) => (
          <View key={u.id} style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: "#f1f5f9" }}>
            <View>
              <Text style={{ fontSize: 15, fontWeight: "600", color: "#1e293b" }}>{u.username}</Text>
              <Text style={{ fontSize: 12, color: "#64748b" }}>Пароль: {u.password}</Text>
            </View>
            <View style={{ backgroundColor: u.role === "admin" ? "#dcfce7" : "#f1f5f9", paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 }}>
              <Text style={{ fontSize: 12, fontWeight: "600", color: u.role === "admin" ? "#15803d" : "#475569" }}>{u.role === "admin" ? "Головний адмін" : "Переглядач"}</Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};
