import React, { useState, useEffect, useMemo } from "react";
import { StyleSheet, Text, View, ScrollView, Alert, Dimensions, Platform, useWindowDimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCartStore } from "../Store/useCartStore";
import Header from "../components/Header";
import CartItemCard from "../components/CartItemCard";
import PromoSection from "../components/PromoSection";
import OrderSummary from "../components/OrderSummary";

const getOsBackgroundColor = (os: string) => (os === "android" ? "#F5F2EB" : os === "ios" ? "#EEF2F6" : "#F4F6F8");

export default function CartScreen() {
  const { width, height } = useWindowDimensions();
  const [dimensions, setDimensions] = useState(() => Dimensions.get("window"));
  const [activeOs, setActiveOs] = useState<string>(() => Platform.OS);

  useEffect(() => {
    const subscription = Dimensions.addEventListener("change", ({ window }) => setDimensions(window));
    return () => subscription?.remove();
  }, []);

  const isLandscape = (width > height) || (dimensions.width > dimensions.height);
  const osBgColor = getOsBackgroundColor(activeOs);

  const items = useCartStore((state) => state.items);
  const increaseQuantity = useCartStore((state) => state.increaseQuantity);
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);
  const toggleFavorite = useCartStore((state) => state.toggleFavorite);
  const isPromoApplied = useCartStore((state) => state.isPromoApplied);
  const promoDiscount = useCartStore((state) => state.promoDiscount);
  const promoMessage = useCartStore((state) => state.promoMessage);
  const applyPromo = useCartStore((state) => state.applyPromo);
  const clearPromo = useCartStore((state) => state.clearPromo);

  const totalItemsCount = useMemo(() => items.reduce((sum, item) => sum + item.quantity, 0), [items]);
  const subtotal = useMemo(() => items.reduce((sum, item) => sum + item.price * item.quantity, 0), [items]);
  const deliveryFee = subtotal > 0 ? 0.5 : 0;
  const discount = isPromoApplied ? promoDiscount : 0;
  const grandTotal = Math.max(0, subtotal + deliveryFee - discount);

  const handleCheckout = () => {
    if (items.length === 0) {
      Alert.alert("Cart is empty");
      return;
    }
    Alert.alert("Order placed", `Total: ${grandTotal} ₴`);
  };

  const toggleOsPreview = () => setActiveOs((prev) => (prev === "android" ? "ios" : prev === "ios" ? "web" : "android"));

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: osBgColor }]} edges={["top", "left", "right", "bottom"]}>
      {isLandscape ? (
        <View style={styles.landscapeRow}>
          <View style={styles.landscapeMainArea}>
            <Header title="Кошик" isLandscape={true} osName={activeOs} onToggleOsPreview={toggleOsPreview} />

            <View style={styles.landscapeColumnsContainer}>
              <View style={styles.landscapeLeftColumn}>
                <Text style={styles.sectionHeader}>Ваш Кошик ({totalItemsCount})</Text>
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.listScrollContent}>
                  {items.map((item) => (
                    <CartItemCard
                      key={item.id}
                      item={item}
                      onIncrease={(id) => increaseQuantity(id)}
                      onDecrease={(id) => decreaseQuantity(id)}
                      onToggleFavorite={(id) => toggleFavorite(id)}
                    />
                  ))}
                </ScrollView>
              </View>

              <View style={styles.landscapeRightColumn}>
                <PromoSection
                  isPromoApplied={isPromoApplied}
                  promoMessage={promoMessage}
                  onApplyPromo={(code) => applyPromo(code)}
                  onClearPromo={() => clearPromo()}
                />

                <OrderSummary
                  subtotal={subtotal}
                  deliveryFee={deliveryFee}
                  discount={discount}
                  grandTotal={grandTotal}
                  isLandscape={true}
                  onCheckout={handleCheckout}
                />
              </View>
            </View>
          </View>
        </View>
      ) : (
        <View style={styles.portraitContainer}>
          <Header title="Кошик" isLandscape={false} osName={activeOs} onToggleOsPreview={toggleOsPreview} />

          <ScrollView style={styles.portraitScroll} contentContainerStyle={styles.portraitContentContainer} showsVerticalScrollIndicator={false}>
            <Text style={styles.sectionHeader}>Ваш Кошик ({totalItemsCount})</Text>

            {items.map((item) => (
              <CartItemCard
                key={item.id}
                item={item}
                onIncrease={(id) => increaseQuantity(id)}
                onDecrease={(id) => decreaseQuantity(id)}
                onToggleFavorite={(id) => toggleFavorite(id)}
              />
            ))}

            <PromoSection
              isPromoApplied={isPromoApplied}
              promoMessage={promoMessage}
              onApplyPromo={(code) => applyPromo(code)}
              onClearPromo={() => clearPromo()}
            />

            <OrderSummary
              subtotal={subtotal}
              deliveryFee={deliveryFee}
              discount={discount}
              grandTotal={grandTotal}
              isLandscape={false}
              onCheckout={handleCheckout}
            />
          </ScrollView>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  portraitContainer: {
    flex: 1,
  },
  portraitScroll: {
    flex: 1,
  },
  portraitContentContainer: {
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 24,
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 12,
  },
  landscapeRow: {
    flex: 1,
    flexDirection: "row",
  },
  landscapeMainArea: {
    flex: 1,
  },
  landscapeColumnsContainer: {
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 10,
  },
  landscapeLeftColumn: {
    flex: 1.25,
    paddingRight: 14,
  },
  landscapeRightColumn: {
    flex: 1,
    paddingLeft: 14,
    borderLeftWidth: 1,
    borderLeftColor: "#E5E7EB",
    justifyContent: "flex-start",
  },
  listScrollContent: {
    paddingBottom: 16,
  },
});
