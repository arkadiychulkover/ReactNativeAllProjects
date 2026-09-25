import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type HeaderProps = {
  title: string;
  isLandscape?: boolean;
  osName?: string;
  onToggleOsPreview?: () => void;
};

export default function Header({ title, isLandscape = false, osName, onToggleOsPreview }: HeaderProps) {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>
      {osName && (
        <TouchableOpacity style={styles.osBadge} onPress={onToggleOsPreview} activeOpacity={0.8}>
          <Ionicons name={osName === "ios" ? "logo-apple" : "logo-android"} size={13} color="#FFFFFF" style={styles.osIcon} />
          <Text style={styles.osBadgeText}>{osName.toUpperCase()}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 52,
    backgroundColor: "#1C2536",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
    position: "relative",
  },
  title: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "700",
  },
  osBadge: {
    position: "absolute",
    right: 14,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#334155",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  osIcon: {
    marginRight: 4,
  },
  osBadgeText: {
    color: "#E2E8F0",
    fontSize: 11,
    fontWeight: "600",
  },
});
