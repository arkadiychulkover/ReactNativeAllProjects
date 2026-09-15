import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, SafeAreaView, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Category } from './src/components/Category';
import { Product } from './src/components/Product';
import CategoryList from './src/components/CategoryList';
import ProductList from './src/components/ProductList';

const categories: Category[] = [
  { id: '1', name: 'Фрукти\nта овочі', icon: 'nutrition', bgColor: '#D2F5DC', iconColor: '#2EB85C' },
  { id: '2', name: 'Молочні', icon: 'water', bgColor: '#D7EEFF', iconColor: '#339AF0' },
  { id: '3', name: "М'ясо", icon: 'restaurant', bgColor: '#FCE0E0', iconColor: '#E03131' },
  { id: '4', name: 'Хліб', icon: 'pizza', bgColor: '#E8DEFF', iconColor: '#845EF7' },
  { id: '5', name: 'Напої', icon: 'cafe', bgColor: '#FFF2D1', iconColor: '#F59F00' },
];

const products: Product[] = [
  { id: '1', name: 'Банани', price: 59, unit: '₴/кг', rating: 4.8, reviewsCount: 124, imageUrl: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=500&auto=format&fit=crop&q=80', isFavorite: false },
  { id: '2', name: 'Помідори', price: 89, unit: '₴/кг', rating: 4.6, reviewsCount: 98, imageUrl: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=500&auto=format&fit=crop&q=80', isFavorite: false },
  { id: '3', name: 'Авокадо Хасс', price: 65, unit: '₴/шт', rating: 4.9, reviewsCount: 75, imageUrl: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=500&auto=format&fit=crop&q=80', isFavorite: true },
  { id: '4', name: 'Круасан вершковий', price: 42, unit: '₴/шт', rating: 4.9, reviewsCount: 130, imageUrl: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=500&auto=format&fit=crop&q=80', isFavorite: false },
  { id: '5', name: 'Молоко фермерське', price: 45, unit: '₴/л', rating: 4.7, reviewsCount: 84, imageUrl: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=500&auto=format&fit=crop&q=80', isFavorite: false },
  { id: '6', name: 'Яблука Голден', price: 39, unit: '₴/кг', rating: 4.5, reviewsCount: 62, imageUrl: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=500&auto=format&fit=crop&q=80', isFavorite: false },
];

export default function App() {
  const [cartCount, setCartCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const handleAddToCart = (product: Product) => {
    setCartCount(cartCount + 1);
    Alert.alert('Кошик', `"${product.name}" додано до кошика!`);
  };

  const handleSelectCategory = (category: Category) => {
    Alert.alert('Категорія', `Обрано категорію: ${category.name.replace('\n', ' ')}`);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Привіт! 👋</Text>
          <Text style={styles.subTitle}>Що шукаєте сьогодні?</Text>
        </View>

        <TouchableOpacity style={styles.cartBadgeButton} activeOpacity={0.8}>
          <Ionicons name="cart" size={24} color="#1F1F1F" />
          {cartCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{cartCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={20} color="#8C8C8C" style={styles.searchIcon} />
        <TextInput
          placeholder="Пошук продуктів..."
          placeholderTextColor="#8C8C8C"
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={styles.searchInput}
        />
      </View>

      <ProductList
        products={products}
        onAddToCart={handleAddToCart}
        ListHeaderComponent={<CategoryList categories={categories} onSelectCategory={handleSelectCategory} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
    backgroundColor: '#FFFFFF',
  },
  greeting: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F1F1F',
  },
  subTitle: {
    fontSize: 13,
    color: '#8C8C8C',
    marginTop: 2,
  },
  cartBadgeButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F0F2F5',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -2,
    right: -2,
    backgroundColor: '#0FA958',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginVertical: 12,
    paddingHorizontal: 14,
    height: 44,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E8E8E8',
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#1F1F1F',
  },
});
