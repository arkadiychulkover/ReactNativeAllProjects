import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  ScrollView,
  ActivityIndicator,
  Platform,
} from "react-native";
import CategoryType from "../types/CategoryType";
import CategoryCard from "./CategoryCard";

const API_BASE = Platform.select({
  web: "http://localhost:3000",
  default: "http://192.168.0.104:3000",
});
const URL: string = `${API_BASE}/categories`;

export default function CategoryScreen() {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [refresh, setRefresh] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const [category, setCategory] = useState<CategoryType>({
    name: "",
    image: "",
    color: "",
  });

  useEffect(() => {
    setLoading(true);
    fetch(URL)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setCategories(data);
        }
      })
      .catch((err) => {
        console.log("Error fetching categories:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [refresh]);

  const handleAddCategory = () => {
    console.log("Push");
    fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(category),
    })
      .then((res) => {
        if (res.ok) {
          setCategory({ name: "", image: "", color: "" });
          setRefresh((prev) => !prev);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Category Screen</Text>

      <View style={styles.form}>
        <TextInput
          value={category.name}
          onChangeText={(text) => {
            setCategory({ ...category, name: text });
          }}
          style={styles.input}
          placeholder="title"
        />
        <TextInput
          value={category.image}
          onChangeText={(text) => {
            setCategory({ ...category, image: text });
          }}
          style={styles.input}
          placeholder="image"
        />
        <TextInput
          value={category.color}
          onChangeText={(text) => {
            setCategory({ ...category, color: text });
          }}
          style={styles.input}
          placeholder="color"
        />

        <View style={styles.buttonRow}>
          <View style={styles.btnWrapper}>
            <Button title="Add" onPress={handleAddCategory} />
          </View>
          <View style={styles.btnWrapper}>
            <Button
              title="Reload"
              color="#2E7D32"
              onPress={() => setRefresh((prev) => !prev)}
            />
          </View>
        </View>
      </View>

      <Text style={styles.previewText}>
        {category.name} {category.color} {category.image}
      </Text>

      <View style={styles.listContainer}>
        <Text style={styles.sectionTitle}>Категорії ({categories.length})</Text>

        {loading && (
          <ActivityIndicator
            size="small"
            color="#2E7D32"
            style={{ marginVertical: 10 }}
          />
        )}

        {categories.map((item, index) => (
          <CategoryCard
            key={item.id ? String(item.id) : `${item.name}-${index}`}
            name={item.name}
            image={item.image || ""}
            color={item.color || (item as any).bgColor || ""}
          />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 16,
    alignItems: "center",
  },
  title: {
    textAlign: "center",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
  },
  form: {
    width: "100%",
    alignItems: "center",
    gap: 12,
  },
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    width: "100%",
    backgroundColor: "#fff",
  },
  buttonRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 8,
    width: "100%",
    justifyContent: "center",
  },
  btnWrapper: {
    flex: 1,
  },
  previewText: {
    textAlign: "center",
    marginVertical: 12,
    color: "#666",
  },
  listContainer: {
    width: "100%",
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
});
