import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export interface Product {
  id: string;
  name: string;
  price: number;
  unit: string;
  rating: number;
  reviewsCount: number;
  imageUrl: string;
  isFavorite?: boolean;
}

interface ProductProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
  onToggleFavorite?: (product: Product) => void;
}

export default function Product({ product, onAddToCart, onToggleFavorite }: ProductProps) {
  const [isFav, setIsFav] = useState(product.isFavorite ?? false);

  const handleFavoritePress = () => {
    setIsFav(!isFav);
    if (onToggleFavorite) {
      onToggleFavorite(product);
    }
  };

  return (
    <View style={styles.card}>
      <TouchableOpacity style={styles.favoriteButton} onPress={handleFavoritePress}>
        <Ionicons name={isFav ? 'heart' : 'heart-outline'} size={20} color={isFav ? '#FF4D4F' : '#8C8C8C'} />
      </TouchableOpacity>

      <Image source={{ uri: product.imageUrl }} style={styles.image} resizeMode="cover" />

      <View style={styles.infoContainer}>
        <Text style={styles.name} numberOfLines={1}>{product.name}</Text>

        <Text style={styles.price}>
          {product.price} <Text style={styles.unit}>{product.unit}</Text>
        </Text>

        <View style={styles.footerRow}>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={14} color="#FAAD14" />
            <Text style={styles.ratingText}>{product.rating}</Text>
            <Text style={styles.reviewsText}>({product.reviewsCount})</Text>
          </View>

          <TouchableOpacity style={styles.addButton} onPress={() => onAddToCart && onAddToCart(product)}>
            <Ionicons name="cart-outline" size={14} color="#FFFFFF" style={styles.cartIcon} />
            <Text style={styles.addButtonText}>Додати</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 12,
    margin: 6,
    flex: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    position: 'relative',
  },
  favoriteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 16,
    padding: 4,
  },
  image: {
    width: '100%',
    height: 110,
    borderRadius: 12,
    marginBottom: 8,
    backgroundColor: '#F7F7F7',
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontSize: 14,
    fontWeight: '600',
    color: '#262626',
    marginBottom: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F1F1F',
    marginBottom: 8,
  },
  unit: {
    fontSize: 12,
    fontWeight: '400',
    color: '#8C8C8C',
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 'auto',
    paddingTop: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#262626',
    marginLeft: 3,
  },
  reviewsText: {
    fontSize: 11,
    color: '#8C8C8C',
    marginLeft: 2,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0FA958',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 14,
  },
  cartIcon: {
    marginRight: 3,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
});
