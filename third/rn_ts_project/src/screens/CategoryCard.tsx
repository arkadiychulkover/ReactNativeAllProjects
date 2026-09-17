import React from "react";
import { View, Text, Image, StyleSheet, Platform } from "react-native";

export interface CategoryCardProps {
  name: string;
  image: string;
  color: string;
}

export default function CategoryCard({ name, image, color }: CategoryCardProps) {
  return (
    <View style={[styles.card, color ? { backgroundColor: color } : null]}>
      {image ? (
        <Image
          source={{ uri: image }}
          style={styles.image}
          resizeMode="cover"
        />
      ) : (
        <View style={styles.imagePlaceholder}>
          <Text style={styles.placeholderText}>
            {name ? name.charAt(0).toUpperCase() : "?"}
          </Text>
        </View>
      )}
      <View style={styles.info}>
        <Text style={styles.name}>{name}</Text>
        {color ? (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{color}</Text>
          </View>
        ) : null}
      </View>
    </View>
  );
}

export { CategoryCard as CategoryItem };

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    ...Platform.select({
      web: {
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.08)",
      } as any,
      default: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
        elevation: 2,
      },
    }),
    marginVertical: 6,
    width: "100%",
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
  },
  imagePlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: "#e0e0e0",
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#666",
  },
  info: {
    marginLeft: 14,
    flex: 1,
    justifyContent: "center",
  },
  name: {
    fontSize: 16,
    fontWeight: "700",
    color: "#222",
  },
  badge: {
    alignSelf: "flex-start",
    marginTop: 4,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    backgroundColor: "rgba(0,0,0,0.06)",
  },
  badgeText: {
    fontSize: 12,
    color: "#555",
  },
});
