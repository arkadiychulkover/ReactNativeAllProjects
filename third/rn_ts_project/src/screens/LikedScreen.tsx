import React, { useState } from "react";
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Platform, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import ProductCard from "../components/ProductCard";
import SunSvg from "../components/svg/SunSvg";
import MoonSvg from "../components/svg/MoonSvg";
import BananaSvg from "../components/svg/BananaSvg";
import ApplesSvg from "../components/svg/ApplesSvg";
import LettuceSvg from "../components/svg/LettuceSvg";
import TomatoesSvg from "../components/svg/TomatoesSvg";
import HeaderHeartSvg from "../components/svg/HeaderHeartSvg";
import BannerHeartSvg from "../components/svg/BannerHeartSvg";
import BannerAppleSvg from "../components/svg/BannerAppleSvg";

const products = [
  { id: "prod-1", title: "Банани еквадорські", price: 42, unit: "грн/кг", rating: 4.8, reviewsCount: 120, illustration: <BananaSvg width={135} height={95} /> },
  { id: "prod-2", title: "Яблука Гала", price: 35, unit: "грн/кг", rating: 4.7, reviewsCount: 85, illustration: <ApplesSvg width={135} height={95} /> },
  { id: "prod-3", title: "Салат листовий", price: 28, unit: "грн/шт", rating: 4.6, reviewsCount: 64, illustration: <LettuceSvg width={135} height={95} /> },
  { id: "prod-4", title: "Помідори", price: 59, unit: "грн/кг", rating: 4.6, reviewsCount: 98, illustration: <TomatoesSvg width={135} height={95} /> },
];

export default function LikedScreen({ onBack }: { onBack?: () => void }) {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  const theme = {
    bg: isDarkMode ? "#121417" : "#FFFFFF",
    headerText: isDarkMode ? "#FFFFFF" : "#1A1D20",
    subText: isDarkMode ? "#9BA1A6" : "#718096",
    arrowColor: isDarkMode ? "#2E7D32" : "#2E7D32",
    gearBg: isDarkMode ? "#22262B" : "#E2E8F0",
    gearColor: isDarkMode ? "#A0AEC0" : "#64748B",
    bannerBg: isDarkMode ? "#142A1D" : "#E8F6EE",
    bannerBorder: isDarkMode ? "#1E3B29" : "#D4EEDB",
    bannerTitle: isDarkMode ? "#A3E635" : "#1B5E20",
    bannerSub: isDarkMode ? "#86EFAC" : "#3B8256",
    trackBg: isDarkMode ? "#10B981" : "#E2E8F0",
    trackBorder: isDarkMode ? "#059669" : "#CBD5E1",
    knobBg: "#FFFFFF",
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.bg }]} edges={["top", "left", "right"]}>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} backgroundColor={theme.bg} />

      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.topBar}>
          <TouchableOpacity style={styles.backButton} onPress={onBack} activeOpacity={0.7}>
            <Ionicons name="arrow-back" size={26} color={theme.arrowColor} />
          </TouchableOpacity>

          <View style={styles.rightControls}>
            <TouchableOpacity style={styles.themeToggleWrapper} onPress={toggleTheme} activeOpacity={0.8}>
              <View style={styles.iconContainer}>
                {isDarkMode ? <MoonSvg size={21} /> : <SunSvg size={21} />}
              </View>

              <View style={[styles.switchTrack, { backgroundColor: theme.trackBg, borderColor: theme.trackBorder, justifyContent: isDarkMode ? "flex-end" : "flex-start" }]}>
                <View style={[styles.switchKnob, { backgroundColor: theme.knobBg }]} />
              </View>
            </TouchableOpacity>

            <View style={styles.settingsWrapper}>
              <TouchableOpacity style={[styles.settingsButton, { backgroundColor: theme.gearBg }]} activeOpacity={0.7}>
                <Ionicons name="settings-sharp" size={20} color={theme.gearColor} />
              </TouchableOpacity>
              <View style={styles.notificationBadge}>
                <Text style={styles.badgeText}>1</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.titleSection}>
          <View style={styles.titleRow}>
            <Text style={[styles.mainTitle, { color: theme.headerText }]}>Обране</Text>
            <View style={styles.headerHeartContainer}>
              <HeaderHeartSvg width={34} height={28} />
            </View>
          </View>
          <Text style={[styles.subtitle, { color: theme.subText }]}>Товари, які ви зберегли</Text>
        </View>

        <View style={[styles.bannerContainer, { backgroundColor: theme.bannerBg, borderColor: theme.bannerBorder }]}>
          <View style={styles.bannerHeartContainer}>
            <BannerHeartSvg width={44} height={44} isDarkMode={isDarkMode} />
          </View>

          <View style={styles.bannerTextContainer}>
            <Text style={[styles.bannerTitle, { color: theme.bannerTitle }]}>У вас 4 улюблені товари</Text>
            <Text style={[styles.bannerSubtitle, { color: theme.bannerSub }]}>Збережіть ще більше корисних і смачних продуктів!</Text>
          </View>

          <View style={styles.bannerAppleContainer}>
            <BannerAppleSvg width={62} height={48} />
          </View>
        </View>

        <View style={styles.productsGrid}>
          {products.map((item) => (
            <ProductCard
              key={item.id}
              id={item.id}
              title={item.title}
              price={item.price}
              unit={item.unit}
              rating={item.rating}
              reviewsCount={item.reviewsCount}
              illustration={item.illustration}
              isLiked={true}
              isDarkMode={isDarkMode}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollContainer: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 36,
    maxWidth: 500,
    width: "100%",
    alignSelf: "center",
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  backButton: {
    padding: 4,
  },
  rightControls: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  themeToggleWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  iconContainer: {
    width: 26,
    height: 26,
    justifyContent: "center",
    alignItems: "center",
  },
  switchTrack: {
    width: 44,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    padding: 2,
    justifyContent: "center",
  },
  switchKnob: {
    width: 18,
    height: 18,
    borderRadius: 9,
    ...Platform.select({
      web: {
        boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
      } as any,
      default: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1,
        elevation: 1,
      },
    }),
  },
  settingsWrapper: {
    position: "relative",
  },
  settingsButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    justifyContent: "center",
    alignItems: "center",
  },
  notificationBadge: {
    position: "absolute",
    top: -2,
    right: -2,
    backgroundColor: "#EB4D4B",
    borderRadius: 9,
    width: 17,
    height: 17,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "#FFFFFF",
  },
  badgeText: {
    color: "#FFFFFF",
    fontSize: 9,
    fontWeight: "bold",
  },
  titleSection: {
    marginBottom: 16,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: "800",
    letterSpacing: -0.5,
  },
  headerHeartContainer: {
    marginLeft: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  subtitle: {
    fontSize: 14,
    fontWeight: "500",
    marginTop: 2,
  },
  bannerContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 18,
    borderWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginBottom: 18,
    gap: 8,
  },
  bannerHeartContainer: {
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
  },
  bannerTextContainer: {
    flex: 1,
  },
  bannerTitle: {
    fontSize: 14,
    fontWeight: "700",
    lineHeight: 18,
  },
  bannerSubtitle: {
    fontSize: 11,
    fontWeight: "500",
    lineHeight: 15,
    marginTop: 2,
  },
  bannerAppleContainer: {
    width: 60,
    height: 46,
    justifyContent: "center",
    alignItems: "center",
  },
  productsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
});
