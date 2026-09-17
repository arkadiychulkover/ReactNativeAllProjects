import React, { useState, useMemo } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Image,
  TouchableOpacity,
  StatusBar,
  useWindowDimensions,
  Alert,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

export default function AdaptivScreen() {
  const { width } = useWindowDimensions();

  const isMobile = width < 680;
  const isTablet = width >= 680 && width < 1024;
  const isDesktop = width >= 1024;

  const [products, setProducts] = useState([
    { id: "prod_bread", title: "Хліб бородинський", price: 28, unit: "₴/шт", step: 1, minQuantity: 1, quantity: 2, image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=400&q=80", isFavorite: false, promoPrice: 28 },
    { id: "prod_tomatoes", title: "Яблука Айдаред", price: 35, unit: "₴/кг", step: 0.5, minQuantity: 0.5, quantity: 1.5, image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=400&q=80", isFavorite: false, promoPrice: 35 },
    { id: "prod_milk", title: "Молоко Селянське", price: 42, unit: "₴/л", step: 1, minQuantity: 1, quantity: 1, image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=400&q=80", isFavorite: false, promoPrice: 42 },
  ]);

  const [selectedDeliveryId, setSelectedDeliveryId] = useState<string>("standard");
  const [deliveryAddress, setDeliveryAddress] = useState<string>("вул. Хрещатик, буд. 12, кв. 34, м. Київ");
  const [isEditingAddress, setIsEditingAddress] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>("cart");

  const totalProductsSum = useMemo(() => {
    return products.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }, [products]);

  const isFreeDelivery = totalProductsSum >= 300 || totalProductsSum === 0;
  const deliveryFee = isFreeDelivery ? 0 : 50;
  const grandTotal = Math.max(0, totalProductsSum + deliveryFee);

  const handleQuantityChange = (id: string, delta: number) => {
    setProducts((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        const newQty = Math.round((item.quantity + delta) * 10) / 10;
        if (newQty < item.minQuantity) return item;
        return { ...item, quantity: newQty };
      })
    );
  };

  const handleRemoveProduct = (id: string) => {
    setProducts((prev) => prev.filter((item) => item.id !== id));
  };

  const handleToggleFavorite = (id: string) => {
    setProducts((prev) =>
      prev.map((item) => (item.id === id ? { ...item, isFavorite: !item.isFavorite } : item))
    );
  };

  const handleCheckout = () => {
    if (products.length === 0) {
      Alert.alert("Кошик порожній", "Додайте хоча б один товар для оформлення.");
      return;
    }
    Alert.alert("Замовлення оформлено!", `Сума до сплати: ${grandTotal.toFixed(2)} ₴\nАдреса: ${deliveryAddress}`);
  };

  const gridColumns = isMobile ? 1 : isTablet ? 2 : 3;
  const gridWidth = gridColumns === 2 ? "48%" : "31.5%";

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8FAF9" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.mainScrollContent, isDesktop && styles.desktopScrollContent]}
      >
        <View style={styles.headerContainer}>
          <View style={styles.headerTopRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.greetingTitle}>Кошик, Анна</Text>
              <Text style={styles.greetingSubtitle}>Перевірте ваше замовлення та оформіть доставку!</Text>
            </View>

            <TouchableOpacity style={styles.bellButton} activeOpacity={0.7}>
              <Ionicons name="notifications-outline" size={24} color="#1F2937" />
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{products.length}</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.searchBar}>
            <Ionicons name="search-outline" size={20} color="#9CA3AF" style={{ marginRight: 8 }} />
            <TextInput
              placeholder="Пошук товарів..."
              placeholderTextColor="#9CA3AF"
              editable={true}
              style={styles.searchInput}
            />
          </View>
        </View>

        <View style={[styles.contentLayout, !isMobile && styles.contentLayoutRow]}>
          <View style={!isMobile ? styles.leftColumn : styles.fullWidth}>
            <View style={styles.sectionHeaderRow}>
              <Text style={styles.sectionTitle}>
                {isMobile ? "Огляд кошика" : `Товари у кошику (${products.length})`}
              </Text>
              {!isMobile && (
                <TouchableOpacity onPress={() => Alert.alert("Каталог", "Перехід до каталогу...")}>
                  <Text style={styles.moreLink}>Більше ›</Text>
                </TouchableOpacity>
              )}
            </View>

            {products.length === 0 ? (
              <View style={styles.emptyCartCard}>
                <Ionicons name="cart-outline" size={56} color="#CBD5E1" />
                <Text style={styles.emptyTitle}>Товарів не знайдено</Text>
                <Text style={styles.emptySubtitle}>Спробуйте додати продукти до кошика</Text>
              </View>
            ) : (
              <View style={[styles.productsContainer, !isMobile && styles.productsGridWrap]}>
                {products.map((item) => {
                  const itemSubtotal = item.price * item.quantity;

                  if (isMobile) {
                    return (
                      <View key={item.id} style={styles.mobileCard}>
                        <View style={styles.mobileImageWrapper}>
                          <Image source={{ uri: item.image }} style={styles.mobileImage} resizeMode="cover" />
                        </View>

                        <View style={styles.mobileCardContent}>
                          <View style={styles.cardHeaderRow}>
                            <Text style={styles.productTitle} numberOfLines={1}>{item.title}</Text>
                            <TouchableOpacity onPress={() => handleToggleFavorite(item.id)} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                              <Ionicons
                                name={item.isFavorite ? "heart" : "heart-outline"}
                                size={20}
                                color={item.isFavorite ? "#EF4444" : "#9CA3AF"}
                              />
                            </TouchableOpacity>
                          </View>

                          <Text style={styles.productPrice}>{item.price} {item.unit}</Text>

                          <View style={styles.mobileActionRow}>
                            <View style={styles.stepperContainer}>
                              <TouchableOpacity style={styles.stepperBtn} onPress={() => handleQuantityChange(item.id, -item.step)} activeOpacity={0.6}>
                                <Ionicons name="remove" size={16} color="#374151" />
                              </TouchableOpacity>

                              <Text style={styles.stepperValue}>
                                {item.quantity} {item.unit.includes("кг") ? "кг" : ""}
                              </Text>

                              <TouchableOpacity style={styles.stepperBtn} onPress={() => handleQuantityChange(item.id, item.step)} activeOpacity={0.6}>
                                <Ionicons name="add" size={16} color="#16A34A" />
                              </TouchableOpacity>
                            </View>

                            <TouchableOpacity style={styles.deleteBtn} onPress={() => handleRemoveProduct(item.id)} activeOpacity={0.6}>
                              <Ionicons name="close" size={18} color="#6B7280" />
                            </TouchableOpacity>
                          </View>

                          <Text style={styles.mobileSubtotalText}>Субтоталь: {itemSubtotal.toFixed(2)} ₴</Text>
                        </View>
                      </View>
                    );
                  }

                  return (
                    <View key={item.id} style={[styles.gridCard, { width: gridWidth as any }]}>
                      <TouchableOpacity style={styles.gridFavoriteBtn} onPress={() => handleToggleFavorite(item.id)} activeOpacity={0.7}>
                        <Ionicons
                          name={item.isFavorite ? "heart" : "heart-outline"}
                          size={20}
                          color={item.isFavorite ? "#EF4444" : "#9CA3AF"}
                        />
                      </TouchableOpacity>

                      <View style={styles.gridImageContainer}>
                        <Image source={{ uri: item.image }} style={styles.gridImage} resizeMode="contain" />
                      </View>

                      <Text style={styles.gridTitle} numberOfLines={2}>{item.title}</Text>
                      <Text style={styles.gridPrice}>{item.price} {item.unit}</Text>

                      <View style={styles.gridStepperRow}>
                        <View style={styles.stepperContainer}>
                          <TouchableOpacity style={styles.stepperBtn} onPress={() => handleQuantityChange(item.id, -item.step)} activeOpacity={0.6}>
                            <Ionicons name="remove" size={16} color="#374151" />
                          </TouchableOpacity>

                          <Text style={styles.stepperValue}>
                            {item.quantity} {item.unit.includes("кг") ? "кг" : ""}
                          </Text>

                          <TouchableOpacity style={styles.stepperBtn} onPress={() => handleQuantityChange(item.id, item.step)} activeOpacity={0.6}>
                            <Ionicons name="add" size={16} color="#16A34A" />
                          </TouchableOpacity>
                        </View>

                        <TouchableOpacity style={styles.gridDeleteBtn} onPress={() => handleRemoveProduct(item.id)} activeOpacity={0.6}>
                          <Ionicons name="close" size={16} color="#6B7280" />
                        </TouchableOpacity>
                      </View>

                      <View style={styles.gridDetailsBox}>
                        <View style={styles.gridDetailRow}>
                          <Text style={styles.gridDetailLabel}>Субтоталь</Text>
                          <Text style={styles.gridDetailValue}>{itemSubtotal.toFixed(2)} ₴</Text>
                        </View>
                        <View style={styles.gridDetailRow}>
                          <Text style={styles.gridDetailLabel}>Промокод</Text>
                          <Text style={styles.gridDetailValue}>
                            {item.promoPrice ? `${item.promoPrice.toFixed(2)} ₴` : "—"}
                          </Text>
                        </View>
                      </View>
                    </View>
                  );
                })}
              </View>
            )}

            {isTablet && (
              <View style={styles.promoCardContainer}>
                <View style={styles.promoHeader}>
                  <Text style={styles.promoHeaderText}>Застосувати промокод</Text>
                </View>
                <View style={styles.promoBody}>
                  <View style={styles.promoInputRow}>
                    <TextInput
                      placeholder="Введіть промокод"
                      placeholderTextColor="#9CA3AF"
                      style={styles.promoInput}
                    />
                    <TouchableOpacity style={styles.promoApplyBtn} activeOpacity={0.8}>
                      <Text style={styles.promoApplyBtnText}>Ок</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}
          </View>

          <View style={[styles.summaryContainer, !isMobile && styles.rightColumnSidebar]}>
            <View style={styles.summaryCard}>
              <Text style={styles.summaryHeading}>Підсумок</Text>

              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Сума товарів:</Text>
                <Text style={styles.summaryValue}>{totalProductsSum.toFixed(2)} ₴</Text>
              </View>

              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Доставка:</Text>
                <Text style={[styles.summaryValue, isFreeDelivery ? styles.freeDeliveryText : null]}>
                  {isFreeDelivery ? "Безкоштовна (від 300 ₴)" : `${deliveryFee.toFixed(2)} ₴`}
                </Text>
              </View>

              <View style={styles.divider} />

              <View style={styles.summaryRow}>
                <Text style={styles.totalLabel}>Всього:</Text>
                <Text style={styles.totalValue}>{grandTotal.toFixed(2)} ₴</Text>
              </View>

              {isDesktop && (
                <View style={styles.deliveryOptionsWrapper}>
                  <Text style={styles.subSectionTitle}>Спосіб доставки:</Text>
                  <TouchableOpacity
                    style={[styles.radioOptionCard, selectedDeliveryId === "standard" && styles.radioOptionCardSelected]}
                    onPress={() => setSelectedDeliveryId("standard")}
                  >
                    <View style={styles.radioCircle}>
                      {selectedDeliveryId === "standard" && <View style={styles.radioDot} />}
                    </View>
                    <View style={{ flex: 1, marginLeft: 10 }}>
                      <Text style={[styles.radioTitle, selectedDeliveryId === "standard" && styles.radioTitleSelected]}>
                        Безкоштовна
                      </Text>
                      <Text style={styles.radioDesc}>від 300 ₴</Text>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.radioOptionCard, selectedDeliveryId === "express" && styles.radioOptionCardSelected]}
                    onPress={() => setSelectedDeliveryId("express")}
                  >
                    <View style={styles.radioCircle}>
                      {selectedDeliveryId === "express" && <View style={styles.radioDot} />}
                    </View>
                    <View style={{ flex: 1, marginLeft: 10 }}>
                      <Text style={[styles.radioTitle, selectedDeliveryId === "express" && styles.radioTitleSelected]}>
                        Безкоштовна проточна
                      </Text>
                      <Text style={styles.radioDesc}>Безкоштовна (від 300 ₴)</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              )}

              <View style={styles.addressSection}>
                <View style={styles.addressHeaderRow}>
                  <Text style={styles.addressSectionTitle}>Адреса доставки:</Text>
                  <TouchableOpacity onPress={() => setIsEditingAddress((prev) => !prev)}>
                    <Ionicons name={isEditingAddress ? "checkmark-circle" : "pencil"} size={18} color="#16A34A" />
                  </TouchableOpacity>
                </View>

                {isEditingAddress ? (
                  <TextInput
                    style={styles.addressInput}
                    value={deliveryAddress}
                    onChangeText={setDeliveryAddress}
                    placeholder="Введіть адресу доставки"
                    multiline
                  />
                ) : (
                  <Text style={styles.addressText}>{deliveryAddress}</Text>
                )}
              </View>

              <TouchableOpacity style={styles.checkoutButton} activeOpacity={0.85} onPress={handleCheckout}>
                <Text style={styles.checkoutButtonText}>Оформити замовлення</Text>
                <Ionicons name="arrow-forward" size={20} color="#FFFFFF" style={{ marginLeft: 8 }} />
              </TouchableOpacity>
            </View>

            {!isTablet && (
              <View style={styles.promoCardContainer}>
                <View style={styles.promoHeader}>
                  <Text style={styles.promoHeaderText}>Застосувати промокод</Text>
                </View>
                <View style={styles.promoBody}>
                  <View style={styles.promoInputRow}>
                    <TextInput
                      placeholder="Введіть промокод"
                      placeholderTextColor="#9CA3AF"
                      style={styles.promoInput}
                    />
                    <TouchableOpacity style={styles.promoApplyBtn} activeOpacity={0.8}>
                      <Text style={styles.promoApplyBtnText}>Ок</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottomTabBar}>
        <TouchableOpacity style={styles.tabItem} onPress={() => setActiveTab("search")}>
          <Ionicons name="search-outline" size={22} color={activeTab === "search" ? "#16A34A" : "#9CA3AF"} />
          <Text style={[styles.tabLabel, activeTab === "search" && styles.tabLabelActive]}>Пошук</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabItem} onPress={() => setActiveTab("products")}>
          <MaterialCommunityIcons
            name="view-grid-outline"
            size={22}
            color={activeTab === "products" ? "#16A34A" : "#9CA3AF"}
          />
          <Text style={[styles.tabLabel, activeTab === "products" && styles.tabLabelActive]}>Продукти</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabItem} onPress={() => setActiveTab("cart")}>
          <Ionicons name="cart" size={22} color={activeTab === "cart" ? "#16A34A" : "#9CA3AF"} />
          <Text style={[styles.tabLabel, activeTab === "cart" && styles.tabLabelActive]}>Кошик</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabItem} onPress={() => setActiveTab("profile")}>
          <Ionicons name="person-outline" size={22} color={activeTab === "profile" ? "#9CA3AF" : "#9CA3AF"} />
          <Text style={[styles.tabLabel, activeTab === "profile" && styles.tabLabelActive]}>Профіль</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F8FAF9",
  },
  mainScrollContent: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 40,
  },
  desktopScrollContent: {
    paddingHorizontal: 32,
    maxWidth: 1200,
    width: "100%",
    alignSelf: "center",
  },
  headerContainer: {
    marginBottom: 20,
  },
  headerTopRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14,
  },
  greetingTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: "#111827",
    letterSpacing: -0.3,
  },
  greetingSubtitle: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 3,
  },
  bellButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    position: "relative",
  },
  badge: {
    position: "absolute",
    top: 4,
    right: 4,
    backgroundColor: "#EF4444",
    borderRadius: 9,
    minWidth: 18,
    height: 18,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 4,
  },
  badgeText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "700",
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    ...Platform.select({
      web: { outlineStyle: "none" } as any,
    }),
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: "#1F2937",
    padding: 0,
  },
  contentLayout: {
    width: "100%",
  },
  contentLayoutRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 20,
  },
  leftColumn: {
    flex: 1,
  },
  fullWidth: {
    width: "100%",
  },
  rightColumnSidebar: {
    width: 340,
  },
  sectionHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
  },
  moreLink: {
    fontSize: 14,
    fontWeight: "600",
    color: "#16A34A",
  },
  productsContainer: {
    width: "100%",
  },
  productsGridWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 14,
  },
  emptyCartCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 32,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginVertical: 12,
  },
  emptyTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#374151",
    marginTop: 12,
  },
  emptySubtitle: {
    fontSize: 13,
    color: "#9CA3AF",
    textAlign: "center",
    marginTop: 4,
  },
  mobileCard: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 1,
  },
  mobileImageWrapper: {
    width: 80,
    height: 80,
    borderRadius: 14,
    backgroundColor: "#F3F4F6",
    overflow: "hidden",
    marginRight: 14,
  },
  mobileImage: {
    width: "100%",
    height: "100%",
  },
  mobileCardContent: {
    flex: 1,
  },
  cardHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  productTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1F2937",
    flex: 1,
    marginRight: 8,
  },
  productPrice: {
    fontSize: 15,
    fontWeight: "800",
    color: "#111827",
    marginTop: 3,
    marginBottom: 8,
  },
  mobileActionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  mobileSubtotalText: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 6,
    fontWeight: "500",
  },
  stepperContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F4F6",
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 4,
  },
  stepperBtn: {
    width: 28,
    height: 28,
    borderRadius: 7,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  stepperValue: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1F2937",
    paddingHorizontal: 10,
  },
  deleteBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#F3F4F6",
    alignItems: "center",
    justifyContent: "center",
  },
  gridCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    position: "relative",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 1,
    marginBottom: 4,
  },
  gridFavoriteBtn: {
    position: "absolute",
    top: 12,
    right: 12,
    zIndex: 2,
    padding: 4,
  },
  gridImageContainer: {
    width: "100%",
    height: 110,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 8,
  },
  gridImage: {
    width: "85%",
    height: "100%",
  },
  gridTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 4,
    minHeight: 38,
  },
  gridPrice: {
    fontSize: 16,
    fontWeight: "800",
    color: "#111827",
    marginBottom: 10,
  },
  gridStepperRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  gridDeleteBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#F3F4F6",
    alignItems: "center",
    justifyContent: "center",
  },
  gridDetailsBox: {
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
    paddingTop: 8,
    gap: 4,
  },
  gridDetailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  gridDetailLabel: {
    fontSize: 12,
    color: "#6B7280",
  },
  gridDetailValue: {
    fontSize: 12,
    fontWeight: "700",
    color: "#1F2937",
  },
  promoCardContainer: {
    backgroundColor: "#166534",
    borderRadius: 16,
    marginTop: 18,
    overflow: "hidden",
  },
  promoHeader: {
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  promoHeaderText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#FFFFFF",
    textAlign: "center",
  },
  promoBody: {
    backgroundColor: "#FFFFFF",
    padding: 12,
  },
  promoInputRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  promoInput: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 14,
    color: "#1F2937",
  },
  promoApplyBtn: {
    backgroundColor: "#16A34A",
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: 10,
  },
  promoApplyBtnText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 14,
  },
  summaryContainer: {
    marginTop: 20,
  },
  summaryCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 1,
  },
  summaryHeading: {
    fontSize: 18,
    fontWeight: "800",
    color: "#111827",
    marginBottom: 14,
  },
  summaryRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  summaryLabel: {
    fontSize: 14,
    color: "#4B5563",
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: "700",
    color: "#111827",
  },
  freeDeliveryText: {
    color: "#16A34A",
    fontWeight: "600",
  },
  divider: {
    height: 1,
    backgroundColor: "#E5E7EB",
    marginVertical: 12,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: "800",
    color: "#111827",
  },
  totalValue: {
    fontSize: 20,
    fontWeight: "900",
    color: "#111827",
  },
  deliveryOptionsWrapper: {
    marginTop: 14,
    gap: 8,
  },
  subSectionTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#374151",
    marginBottom: 4,
  },
  radioOptionCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    padding: 10,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  radioOptionCardSelected: {
    backgroundColor: "#F0FDF4",
    borderColor: "#86EFAC",
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#16A34A",
    alignItems: "center",
    justifyContent: "center",
  },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#16A34A",
  },
  radioTitle: {
    fontSize: 13,
    fontWeight: "600",
    color: "#374151",
  },
  radioTitleSelected: {
    color: "#166534",
  },
  radioDesc: {
    fontSize: 11,
    color: "#6B7280",
    marginTop: 1,
  },
  addressSection: {
    marginTop: 16,
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  addressHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  addressSectionTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: "#374151",
  },
  addressText: {
    fontSize: 13,
    color: "#4B5563",
    lineHeight: 18,
  },
  addressInput: {
    fontSize: 13,
    color: "#111827",
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 8,
    borderWidth: 1,
    borderColor: "#D1D5DB",
  },
  checkoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#16A34A",
    borderRadius: 14,
    paddingVertical: 14,
    marginTop: 18,
    shadowColor: "#16A34A",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 2,
  },
  checkoutButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
  bottomTabBar: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: "space-around",
    alignItems: "center",
  },
  tabItem: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 12,
  },
  tabLabel: {
    fontSize: 11,
    color: "#9CA3AF",
    marginTop: 3,
    fontWeight: "500",
  },
  tabLabelActive: {
    color: "#16A34A",
    fontWeight: "700",
  },
});