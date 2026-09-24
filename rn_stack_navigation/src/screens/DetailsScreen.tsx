import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
  Alert,
  Share,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useShopStore } from '../store/shopStore';

type Props = NativeStackScreenProps<RootStackParamList, 'Details'>;

const THEME_GREEN = '#477361';

export default function DetailsScreen({ navigation, route }: Props) {
  const { productId } = route.params;
  const product = useShopStore((state) => state.getProductById(productId));
  const addToBag = useShopStore((state) => state.addToBag);

  const [selectedSize, setSelectedSize] = useState<string>(product?.defaultSize || product?.sizes[0] || '8');
  const [selectedColor, setSelectedColor] = useState<string>(product?.colors[0] || '#FFFFFF');
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!product) {
    return (
      <SafeAreaView style={styles.notFoundContainer}>
        <Text style={styles.notFoundText}>Product not found</Text>
        <TouchableOpacity
          style={styles.backHomeButton}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.backHomeButtonText}>Go to Catalog</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  const handleShare = async () => {
    try {
      await Share.share({ message: `Check out ${product.name} on AURA SHOP for $${product.price.toFixed(2)}!` });
    } catch {}
  };

  const handleAddToBag = () => {
    addToBag(product.id, selectedSize, selectedColor);
    Alert.alert('Added to Bag', `${product.name} (Size: ${selectedSize}) was added to your bag.`, [
      { text: 'Continue Shopping' },
      { text: 'View Bag', onPress: () => navigation.navigate('YourBag') },
    ]);
  };

  const handleBuyNow = () => {
    addToBag(product.id, selectedSize, selectedColor);
    navigation.navigate('YourBag');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => navigation.goBack()}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons name="chevron-back" size={24} color="#1A202C" />
        </TouchableOpacity>

        <View style={styles.headerRightActions}>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => setIsFavorite(!isFavorite)}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons
              name={isFavorite ? 'heart' : 'heart-outline'}
              size={24}
              color={isFavorite ? '#E53E3E' : '#1A202C'}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.headerButton}
            onPress={handleShare}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons name="share-outline" size={24} color="#1A202C" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.imageCard}>
          <Image
            source={{ uri: product.images[activeImageIndex] || product.image }}
            style={styles.productImage}
            resizeMode="contain"
          />
        </View>

        <View style={styles.paginationDots}>
          {(product.images.length > 0 ? product.images : [product.image]).map((_, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.dot,
                activeImageIndex === index ? styles.activeDot : styles.inactiveDot,
              ]}
              onPress={() => setActiveImageIndex(index)}
            />
          ))}
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.title}>{product.name}</Text>

          <View style={styles.priceRow}>
            <Text style={styles.price}>${product.price.toFixed(2)}</Text>
            <View style={styles.ratingBadge}>
              <Ionicons name="star" size={16} color="#F5A623" />
              <Text style={styles.ratingText}>{product.rating.toFixed(1)}</Text>
            </View>
          </View>

          <Text style={styles.description}>{product.description}</Text>

          <Text style={styles.sectionTitle}>Size</Text>
          <View style={styles.sizesRow}>
            {product.sizes.map((size) => {
              const isSelected = selectedSize === size;
              return (
                <TouchableOpacity
                  key={size}
                  style={[
                    styles.sizeBox,
                    isSelected && styles.sizeBoxSelected,
                  ]}
                  onPress={() => setSelectedSize(size)}
                  activeOpacity={0.7}
                >
                  <Text
                    style={[
                      styles.sizeText,
                      isSelected && styles.sizeTextSelected,
                    ]}
                  >
                    {size}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <Text style={styles.sectionTitle}>Color</Text>
          <View style={styles.colorsRow}>
            {product.colors.map((colorHex, index) => {
              const isSelected = selectedColor === colorHex;
              return (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.colorCircleWrapper,
                    isSelected && styles.colorCircleWrapperSelected,
                  ]}
                  onPress={() => setSelectedColor(colorHex)}
                  activeOpacity={0.7}
                >
                  <View
                    style={[styles.colorCircle, { backgroundColor: colorHex }]}
                  />
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.addToBagButton}
          activeOpacity={0.85}
          onPress={handleAddToBag}
        >
          <Text style={styles.addToBagText}>ADD TO BAG</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buyNowButton}
          activeOpacity={0.85}
          onPress={handleBuyNow}
        >
          <Text style={styles.buyNowText}>BUY NOW</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  headerButton: {
    width: 38,
    height: 38,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerRightActions: {
    flexDirection: 'row',
    gap: 8,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 24,
  },
  imageCard: {
    height: 280,
    backgroundColor: '#F0F3F2',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
    borderRadius: 16,
    overflow: 'hidden',
  },
  productImage: {
    width: '90%',
    height: '90%',
  },
  paginationDots: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 16,
    gap: 6,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  activeDot: {
    backgroundColor: '#2D3748',
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  inactiveDot: {
    backgroundColor: '#CBD5E1',
  },
  infoContainer: {
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1A202C',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  price: {
    fontSize: 22,
    fontWeight: '700',
    color: THEME_GREEN,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#2D3748',
  },
  description: {
    fontSize: 14,
    color: '#718096',
    lineHeight: 20,
    marginTop: 12,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1A202C',
    marginTop: 20,
    marginBottom: 10,
  },
  sizesRow: {
    flexDirection: 'row',
    gap: 10,
  },
  sizeBox: {
    width: 44,
    height: 44,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sizeBoxSelected: {
    backgroundColor: THEME_GREEN,
    borderColor: THEME_GREEN,
  },
  sizeText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#4A5568',
  },
  sizeTextSelected: {
    color: '#FFFFFF',
  },
  colorsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  colorCircleWrapper: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  colorCircleWrapperSelected: {
    borderColor: '#718096',
  },
  colorCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  bottomBar: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F1F3F5',
    gap: 12,
  },
  addToBagButton: {
    flex: 1,
    backgroundColor: THEME_GREEN,
    borderRadius: 24,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addToBagText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  buyNowButton: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: THEME_GREEN,
    borderRadius: 24,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buyNowText: {
    color: THEME_GREEN,
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  notFoundContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  notFoundText: {
    fontSize: 18,
    color: '#718096',
    marginBottom: 16,
  },
  backHomeButton: {
    backgroundColor: THEME_GREEN,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  backHomeButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});