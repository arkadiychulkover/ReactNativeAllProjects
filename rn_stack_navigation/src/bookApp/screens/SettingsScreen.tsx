import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Icon from "@expo/vector-icons/FontAwesome";
import { useAppContext } from "../context/AppContext";

export const SettingsScreen = (): React.JSX.Element => {
  const { currentUser, logout } = useAppContext();

  const handleLogoutPress = async (): Promise<void> => {
    await logout();
  };

  return (
    <View style={{ flex: 1, padding: 16, backgroundColor: "#f8fafc", justifyContent: "space-between" }}>
      <View style={{ backgroundColor: "#ffffff", padding: 18, borderRadius: 12, borderWidth: 1, borderColor: "#e2e8f0" }}>
        <Text style={{ fontSize: 18, fontWeight: "700", color: "#0f172a", marginBottom: 12 }}>Профіль користувача</Text>
        <View style={{ marginBottom: 10 }}>
          <Text style={{ fontSize: 13, color: "#64748b" }}>Поточний логін:</Text>
          <Text style={{ fontSize: 16, fontWeight: "600", color: "#1e293b" }}>{currentUser?.username || "Не авторизовано"}</Text>
        </View>
        <View style={{ marginBottom: 10 }}>
          <Text style={{ fontSize: 13, color: "#64748b" }}>Права доступу:</Text>
          <Text style={{ fontSize: 16, fontWeight: "600", color: currentUser?.role === "admin" ? "#16a34a" : "#0284c7" }}>
            {currentUser?.role === "admin" ? "Адміністратор (Повний CRUD доступ)" : "Переглядач (Тільки перегляд списку книг)"}
          </Text>
        </View>
        <View style={{ backgroundColor: "#f1f5f9", padding: 12, borderRadius: 8, marginTop: 10 }}>
          <Text style={{ fontSize: 12, color: "#475569" }}>
            {currentUser?.role === "admin" ? "Ви можете додавати, редагувати, видаляти книги та реєструвати інших користувачів." : "Вам дозволено лише переглядати існуючий список книг у системі."}
          </Text>
        </View>
      </View>

      <TouchableOpacity onPress={handleLogoutPress} style={{ backgroundColor: "#ef4444", padding: 14, borderRadius: 10, alignItems: "center", flexDirection: "row", justifyContent: "center", gap: 8 }}>
        <Icon name="sign-out" size={16} color="#ffffff" />
        <Text style={{ color: "#ffffff", fontWeight: "700", fontSize: 16 }}>Вийти з системи</Text>
      </TouchableOpacity>
    </View>
  );
};
