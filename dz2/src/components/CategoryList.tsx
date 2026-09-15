import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import Category, { Category as CategoryType } from './Category';

interface CategoryListProps {
  categories: CategoryType[];
  onSelectCategory?: (category: CategoryType) => void;
}

export default function CategoryList({ categories, onSelectCategory }: CategoryListProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Категорії</Text>
      <FlatList
        data={categories}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Category category={item} onPress={onSelectCategory} />}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  listContent: {
    paddingHorizontal: 16,
  },
});
