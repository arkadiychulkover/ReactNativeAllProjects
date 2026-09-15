import React from 'react';
import { StyleSheet, Text, FlatList } from 'react-native';
import Product, { Product as ProductType } from './Product';

interface ProductListProps {
  products: ProductType[];
  onAddToCart?: (product: ProductType) => void;
  onToggleFavorite?: (product: ProductType) => void;
  ListHeaderComponent?: React.ReactElement | null;
}

export default function ProductList({ products, onAddToCart, onToggleFavorite, ListHeaderComponent }: ProductListProps) {
  return (
    <FlatList
      data={products}
      numColumns={2}
      keyExtractor={(item) => item.id}
      columnWrapperStyle={styles.columnWrapper}
      contentContainerStyle={styles.listContent}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={
        <>
          {ListHeaderComponent}
          <Text style={styles.sectionTitle}>Популярні товари</Text>
        </>
      }
      renderItem={({ item }) => (
        <Product product={item} onAddToCart={onAddToCart} onToggleFavorite={onToggleFavorite} />
      )}
    />
  );
}

const styles = StyleSheet.create({
  listContent: {
    paddingHorizontal: 10,
    paddingBottom: 24,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
    marginVertical: 12,
    paddingHorizontal: 6,
  },
});
