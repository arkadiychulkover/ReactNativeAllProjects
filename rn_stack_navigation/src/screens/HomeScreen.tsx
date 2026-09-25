import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  TextInput,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useShopStore, Product } from '../store/shopStore';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const THEME_GREEN = '#477361';

export default function HomeScreen({ navigation }: Props) {
  const products = useShopStore((state) => state.products);
  const bag = useShopStore((state) => state.bag);

  const [searchQuery, setSearchQuery] = useState('');

  const totalBagCount = useMemo(() => {
    return Object.values(bag).reduce((sum, qty) => sum + qty, 0);
  }, [bag]);

  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) {
      return products;
    }
    const query = searchQuery.trim().toLowerCase();
    return products.filter((product) =>
      product.name.toLowerCase().includes(query)
    );
  }, [products, searchQuery]);

  const renderProductItem = ({ item }: { item: Product }) => {
    return (
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.82}
        onPress={() => {
          navigation.navigate('Details', { productId: item.id });
        }}
      >
        <View style={styles.imageWrapper}>
          <Image
            source={{ uri: item.image }}
            style={styles.productImage}
            resizeMode="cover"
          />
        </View>
        <View style={styles.cardInfo}>
          <Text style={styles.productName} numberOfLines={2}>
            {item.name}
          </Text>
          <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <View style={styles.header}>
        <View style={styles.headerSideSpace} />
        <View style={styles.brandTitleContainer}>
          <Text style={styles.brandTitleAura}>AURA </Text>
          <Text style={styles.brandTitleShop}>SHOP</Text>
        </View>

        <TouchableOpacity
          style={styles.cartButton}
          activeOpacity={0.7}
          onPress={() => navigation.navigate('YourBag')}
        >
          <Ionicons name="cart-outline" size={26} color="#1A202C" />
          {totalBagCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>
                {totalBagCount > 99 ? '99+' : totalBagCount}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.searchRow}>
        <View style={styles.searchBarContainer}>
          <Ionicons name="search" size={20} color="#8A929A" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            placeholderTextColor="#8A929A"
            value={searchQuery}
            onChangeText={setSearchQuery}
            clearButtonMode="while-editing"
            autoCapitalize="none"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')} style={styles.clearSearchBtn}>
              <Ionicons name="close-circle" size={18} color="#A0AEC0" />
            </TouchableOpacity>
          )}
        </View>

        <TouchableOpacity
          style={styles.filterButton}
          activeOpacity={0.7}
          onPress={() => {}}
        >
          <Ionicons name="options-outline" size={20} color="#4A5568" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        renderItem={renderProductItem}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyResults}>
            <Ionicons name="search-outline" size={48} color="#CBD5E1" />
            <Text style={styles.emptyResultsText}>
              {`No items matching "${searchQuery}"`}
            </Text>
          </View>
        }
      />
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
    paddingTop: 8,
    paddingBottom: 12,
  },
  headerSideSpace: {
    width: 36,
  },
  brandTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  brandTitleAura: {
    fontSize: 20,
    fontWeight: '800',
    color: THEME_GREEN,
    letterSpacing: 1.5,
  },
  brandTitleShop: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1A202C',
    letterSpacing: 1.5,
  },
  cartButton: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -2,
    right: -4,
    backgroundColor: THEME_GREEN,
    borderRadius: 9,
    minWidth: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 3,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
    gap: 10,
  },
  searchBarContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFF2F1',
    borderRadius: 14,
    paddingHorizontal: 12,
    height: 44,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#1A202C',
    height: '100%',
  },
  clearSearchBtn: {
    padding: 4,
  },
  filterButton: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: '#EFF2F1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  card: {
    width: '48%',
  },
  imageWrapper: {
    width: '100%',
    height: 190,
    borderRadius: 18,
    backgroundColor: '#EDF1F0',
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  cardInfo: {
    marginTop: 8,
    paddingHorizontal: 4,
  },
  productName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A202C',
    lineHeight: 18,
  },
  productPrice: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1A202C',
    marginTop: 4,
  },
  emptyResults: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 50,
  },
  emptyResultsText: {
    marginTop: 12,
    fontSize: 15,
    color: '#718096',
  },
});