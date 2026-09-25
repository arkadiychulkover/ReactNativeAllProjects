import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

type OrderSummaryProps = {
  subtotal: number;
  deliveryFee: number;
  discount: number;
  grandTotal: number;
  isLandscape?: boolean;
  onCheckout: () => void;
};

export default function OrderSummary({ subtotal, deliveryFee, discount, grandTotal, isLandscape = false, onCheckout }: OrderSummaryProps) {
  if (isLandscape) {
    return (
      <View style={styles.landscapeContainer}>
        <View style={styles.topTotalRow}>
          <Text style={styles.topTotalLabel}>Разом</Text>
          <Text style={styles.topTotalValue}>{grandTotal} ₴</Text>
        </View>

        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Підсумок замовлення</Text>

          <View style={styles.row}>
            <Text style={styles.rowLabel}>Субтуталь</Text>
            <Text style={styles.rowValue}>{subtotal} ₴</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.rowLabel}>Сервісна доставка</Text>
            <Text style={styles.rowValue}>{deliveryFee > 0 ? `${deliveryFee} ₴` : "0,5 ₴"}</Text>
          </View>

          {discount > 0 && (
            <View style={styles.row}>
              <Text style={[styles.rowLabel, styles.discountText]}>Промокод</Text>
              <Text style={[styles.rowValue, styles.discountText]}>-{discount} ₴</Text>
            </View>
          )}

          <View style={styles.divider} />

          <View style={styles.row}>
            <Text style={styles.finalLabel}>Разом</Text>
            <Text style={styles.finalValue}>{grandTotal} ₴</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.checkoutButton} onPress={onCheckout} activeOpacity={0.8}>
          <Text style={styles.checkoutText}>Оформити замовлення</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.portraitContainer}>
      <View style={styles.portraitTotalRow}>
        <Text style={styles.portraitTotalLabel}>Разом</Text>
        <Text style={styles.portraitTotalValue}>{grandTotal} ₴</Text>
      </View>

      <TouchableOpacity style={styles.checkoutButton} onPress={onCheckout} activeOpacity={0.8}>
        <Text style={styles.checkoutText}>Оформити замовлення</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  portraitContainer: {
    marginTop: 12,
    paddingVertical: 8,
  },
  portraitTotalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  portraitTotalLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2937",
  },
  portraitTotalValue: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
  },
  landscapeContainer: {
    flex: 1,
    justifyContent: "flex-start",
  },
  topTotalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    paddingBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  topTotalLabel: {
    fontSize: 15,
    fontWeight: "600",
    color: "#374151",
  },
  topTotalValue: {
    fontSize: 17,
    fontWeight: "700",
    color: "#111827",
  },
  summaryCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginBottom: 14,
  },
  summaryTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 8,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  rowLabel: {
    fontSize: 13,
    color: "#6B7280",
  },
  rowValue: {
    fontSize: 13,
    fontWeight: "600",
    color: "#1F2937",
  },
  discountText: {
    color: "#15803D",
  },
  divider: {
    height: 1,
    backgroundColor: "#F3F4F6",
    marginVertical: 6,
  },
  finalLabel: {
    fontSize: 14,
    fontWeight: "700",
    color: "#111827",
  },
  finalValue: {
    fontSize: 15,
    fontWeight: "800",
    color: "#111827",
  },
  checkoutButton: {
    backgroundColor: "#15803D",
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
  },
  checkoutText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
  },
});
