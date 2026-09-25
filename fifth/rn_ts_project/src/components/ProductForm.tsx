import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useProductStore } from "../Store/useProductStore";

export default function ProductForm() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [error, setError] = useState("");
  const addProduct = useProductStore((state) => state.addProduct);

  const handleAddProduct = () => {
    const trimmedTitle = title.trim();
    const numericPrice = parseFloat(price.replace(",", "."));
    if (!trimmedTitle) {
      setError("Введіть назву продукту");
      return;
    }
    if (isNaN(numericPrice) || numericPrice <= 0) {
      setError("Введіть коректну ціну");
      return;
    }
    addProduct({ id: Date.now(), title: trimmedTitle, price: numericPrice });
    setTitle("");
    setPrice("");
    setError("");
  };

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Додати новий продукт</Text>
      <TextInput style={styles.input} value={title} onChangeText={(text) => { setTitle(text); if (error) setError(""); }} placeholder="Назва продукту" placeholderTextColor="#9CA3AF" />
      <TextInput style={styles.input} value={price} onChangeText={(text) => { setPrice(text); if (error) setError(""); }} placeholder="Ціна (₴)" placeholderTextColor="#9CA3AF" keyboardType="numeric" />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <TouchableOpacity style={styles.button} onPress={handleAddProduct} activeOpacity={0.8}>
        <Ionicons name="add-circle-outline" size={20} color="#FFFFFF" />
        <Text style={styles.buttonText}>Додати продукт</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 12,
  },
  input: {
    height: 44,
    backgroundColor: "#F9FAFB",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 10,
    paddingHorizontal: 12,
    fontSize: 14,
    color: "#1F2937",
    marginBottom: 10,
  },
  errorText: {
    color: "#EF4444",
    fontSize: 13,
    marginBottom: 10,
    fontWeight: "500",
  },
  button: {
    height: 44,
    backgroundColor: "#4F46E5",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "600",
  },
});
