import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useProductStore } from "../Store/useProductStore";
import CartItemCard from "./CartItemCard";

export default function ProductList() {
  const products = useProductStore((state) => state.products);
  const removeProduct = useProductStore((state) => state.removeProduct);

  if (products.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <View style={styles.emptyIconCircle}>
          <Ionicons name="cube-outline" size={32} color="#9CA3AF" />
        </View>
        <Text style={styles.emptyTitle}>Список продуктів порожній</Text>
        <Text style={styles.emptySubtitle}>Додайте товари за допомогою форми вище</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.sectionHeader}>Список продуктів ({products.length})</Text>
      {products.map((item) => (
        <CartItemCard key={item.id} product={item} onRemove={(id) => removeProduct(id)} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 12,
  },
  emptyContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 32,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  emptyIconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#F3F4F6",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 4,
  },
  emptySubtitle: {
    fontSize: 13,
    color: "#9CA3AF",
    textAlign: "center",
  },
});
