import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function ProductCard({ id, title, price, unit, rating, reviewsCount, image, illustration, isLiked = true, onAddToCart, isDarkMode = false }: { id?: string; title: string; price: number | string; unit: string; rating: number; reviewsCount: number; image?: any; illustration?: React.ReactNode; isLiked?: boolean; onAddToCart?: (id?: string) => void; isDarkMode?: boolean }) {
  const colors = {
    cardBg: isDarkMode ? "#1F2328" : "#FFFFFF",
    borderColor: isDarkMode ? "#2E343D" : "#EDEDED",
    titleColor: isDarkMode ? "#F0F3F6" : "#24292F",
    priceColor: isDarkMode ? "#F0F3F6" : "#212529",
    unitColor: isDarkMode ? "#9DA7B3" : "#76808C",
    reviewsColor: isDarkMode ? "#8C95A0" : "#8A94A0",
    buttonBg: "#2B7E48",
  };

  return (
    <View style={[styles.card, { backgroundColor: colors.cardBg, borderColor: colors.borderColor }]}>
      <View style={styles.favoriteButton}>
        <Ionicons name={isLiked ? "heart" : "heart-outline"} size={20} color={isLiked ? "#EB4D4B" : "#B0B7C3"} />
      </View>

      <View style={styles.imageWrapper}>
        {illustration ? illustration : image ? <Image source={image} style={styles.image} resizeMode="contain" /> : null}
      </View>

      <Text style={[styles.title, { color: colors.titleColor }]} numberOfLines={1}>
        {title}
      </Text>

      <View style={styles.priceRow}>
        <Text style={[styles.price, { color: colors.priceColor }]}>
          {price} <Text style={[styles.unit, { color: colors.unitColor }]}>{unit}</Text>
        </Text>
      </View>

      <View style={styles.footerRow}>
        <View style={styles.ratingBox}>
          <Ionicons name="star" size={14} color="#FFB800" />
          <Text style={[styles.ratingNumber, { color: colors.titleColor }]}>{rating}</Text>
          <Text style={[styles.reviewsCount, { color: colors.reviewsColor }]}>({reviewsCount})</Text>
        </View>

        <TouchableOpacity style={[styles.addButton, { backgroundColor: colors.buttonBg }]} activeOpacity={0.8} onPress={() => onAddToCart && onAddToCart(id)}>
          <Ionicons name="cart-outline" size={15} color="#FFFFFF" />
          <Text style={styles.addButtonText}>Додати</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "48%",
    borderRadius: 18,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingTop: 12,
    paddingBottom: 12,
    position: "relative",
    marginBottom: 14,
    ...Platform.select({
      web: {
        boxShadow: "0 4px 14px rgba(0,0,0,0.04)",
      } as any,
      default: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 6,
        elevation: 2,
      },
    }),
  },
  favoriteButton: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 10,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  imageWrapper: {
    width: "100%",
    height: 105,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 4,
  },
  image: {
    width: "88%",
    height: "100%",
  },
  title: {
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 4,
  },
  priceRow: {
    marginBottom: 8,
  },
  price: {
    fontSize: 18,
    fontWeight: "800",
    letterSpacing: -0.2,
  },
  unit: {
    fontSize: 12,
    fontWeight: "500",
  },
  footerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 2,
  },
  ratingBox: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingNumber: {
    fontSize: 12,
    fontWeight: "700",
    marginLeft: 3,
  },
  reviewsCount: {
    fontSize: 11,
    fontWeight: "500",
    marginLeft: 2,
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 14,
    gap: 3,
  },
  addButtonText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "700",
  },
});
