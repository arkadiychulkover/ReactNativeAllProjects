import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { CartItem } from "../types/cart";

type CartItemCardProps = {
  item: CartItem;
  onIncrease: (id: string) => void;
  onDecrease: (id: string) => void;
  onToggleFavorite: (id: string) => void;
};

export default function CartItemCard({ item, onIncrease, onDecrease, onToggleFavorite }: CartItemCardProps) {
  return (
    <View style={styles.card}>
      <Image source={item.image} style={styles.image} resizeMode="contain" />

      <View style={styles.infoCol}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.price}>{item.price} {item.unit}</Text>
      </View>

      <View style={styles.actionCol}>
        <TouchableOpacity style={styles.favoriteButton} onPress={() => onToggleFavorite(item.id)} activeOpacity={0.7}>
          <Ionicons name={item.isFavorite ? "heart" : "heart-outline"} size={20} color={item.isFavorite ? "#E11D48" : "#9CA3AF"} />
        </TouchableOpacity>

        <View style={styles.stepper}>
          <TouchableOpacity style={styles.stepperButton} onPress={() => onDecrease(item.id)} activeOpacity={0.7}>
            <Text style={styles.stepperText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantityText}>{item.quantity}</Text>
          <TouchableOpacity style={styles.stepperButton} onPress={() => onIncrease(item.id)} activeOpacity={0.7}>
            <Text style={styles.stepperText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 10,
    marginBottom: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  image: {
    width: 56,
    height: 56,
    marginRight: 12,
  },
  infoCol: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 15,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 4,
  },
  price: {
    fontSize: 13,
    color: "#4B5563",
    fontWeight: "500",
  },
  actionCol: {
    alignItems: "flex-end",
    justifyContent: "space-between",
    height: 56,
  },
  favoriteButton: {
    padding: 2,
  },
  stepper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F4F6",
    borderRadius: 8,
    paddingHorizontal: 4,
    paddingVertical: 2,
  },
  stepperButton: {
    width: 22,
    height: 22,
    backgroundColor: "#D1FAE5",
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  stepperText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#065F46",
    lineHeight: 16,
  },
  quantityText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#1F2937",
    marginHorizontal: 8,
  },
});
