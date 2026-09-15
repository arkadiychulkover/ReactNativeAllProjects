import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export interface Category {
  id: string;
  name: string;
  icon: string;
  bgColor: string;
  iconColor: string;
}

interface CategoryProps {
  category: Category;
  onPress?: (category: Category) => void;
}

export default function Category({ category, onPress }: CategoryProps) {
  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.7} onPress={() => onPress && onPress(category)}>
      <View style={[styles.iconContainer, { backgroundColor: category.bgColor }]}>
        <Ionicons name={category.icon as any} size={28} color={category.iconColor} />
      </View>
      <Text style={styles.name} numberOfLines={2}>{category.name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: 72,
    marginRight: 14,
  },
  iconContainer: {
    width: 62,
    height: 62,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  name: {
    fontSize: 12,
    fontWeight: '500',
    color: '#333',
    textAlign: 'center',
    lineHeight: 15,
  },
});
