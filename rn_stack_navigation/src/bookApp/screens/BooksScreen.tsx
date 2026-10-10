import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, Alert } from "react-native";
import Icon from "@expo/vector-icons/FontAwesome";
import { useAppContext } from "../context/AppContext";
import { BookItem } from "../components/BookItem";
import { EditBookModal } from "../components/EditBookModal";
import { Book } from "../types";

export const BooksScreen = (): React.JSX.Element => {
  const { books, isAdmin, addBook, updateBook, deleteBook } = useAppContext();
  const [newTitle, setNewTitle] = useState<string>("");
  const [newAuthor, setNewAuthor] = useState<string>("");
  const [editingBook, setEditingBook] = useState<Book | null>(null);

  const handleAddPress = async (): Promise<void> => {
    const success = await addBook(newTitle, newAuthor);
    if (success) {
      setNewTitle("");
      setNewAuthor("");
    }
  };

  const handleSaveEdit = async (id: string, title: string, author: string): Promise<void> => {
    const success = await updateBook(id, title, author);
    if (success) {
      setEditingBook(null);
    }
  };

  const handleDeletePress = (book: Book): void => {
    Alert.alert("Видалення книги", `Ви дійсно бажаєте видалити "${book.title}"?`, [{ text: "Скасувати", style: "cancel" }, { text: "Видалити", style: "destructive", onPress: () => deleteBook(book.id) }]);
  };

  return (
    <View style={{ flex: 1, padding: 16, backgroundColor: "#f8fafc" }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <Text style={{ fontSize: 20, fontWeight: "700", color: "#0f172a" }}>Список книг ({books.length})</Text>
        <View style={{ backgroundColor: isAdmin ? "#dbeafe" : "#f1f5f9", paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 }}>
          <Text style={{ fontSize: 12, fontWeight: "600", color: isAdmin ? "#1d4ed8" : "#475569" }}>{isAdmin ? "Адміністратор (CRUD)" : "Переглядач (Тільки читання)"}</Text>
        </View>
      </View>

      <FlatList
        data={books}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <BookItem book={item} isAdmin={isAdmin} onEdit={setEditingBook} onDelete={handleDeletePress} />}
        ListEmptyComponent={<Text style={{ textAlign: "center", color: "#94a3b8", marginTop: 30 }}>Список книг порожній</Text>}
        contentContainerStyle={{ paddingBottom: 16 }}
      />

      {isAdmin ? (
        <View style={{ backgroundColor: "#ffffff", padding: 14, borderRadius: 12, borderWidth: 1, borderColor: "#e2e8f0", marginTop: 10 }}>
          <Text style={{ fontSize: 16, fontWeight: "700", color: "#0f172a", marginBottom: 10 }}>Додати нову книгу</Text>
          <TextInput placeholder="Назва книги" value={newTitle} onChangeText={setNewTitle} style={{ borderWidth: 1, borderColor: "#cbd5e1", borderRadius: 8, padding: 10, marginBottom: 8, backgroundColor: "#ffffff" }} />
          <TextInput placeholder="Автор" value={newAuthor} onChangeText={setNewAuthor} style={{ borderWidth: 1, borderColor: "#cbd5e1", borderRadius: 8, padding: 10, marginBottom: 12, backgroundColor: "#ffffff" }} />
          <TouchableOpacity onPress={handleAddPress} style={{ backgroundColor: "#16a34a", padding: 12, borderRadius: 8, alignItems: "center", flexDirection: "row", justifyContent: "center", gap: 8 }}>
            <Icon name="plus" size={14} color="#ffffff" />
            <Text style={{ color: "#ffffff", fontWeight: "700", fontSize: 15 }}>Додати книгу</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={{ backgroundColor: "#e2e8f0", padding: 12, borderRadius: 8, alignItems: "center" }}>
          <Text style={{ color: "#475569", fontSize: 13, fontWeight: "500" }}>Ви увійшли як переглядач: додавання та редагування заблоковано</Text>
        </View>
      )}

      {editingBook && (
        <EditBookModal visible={true} book={editingBook} onSave={handleSaveEdit} onCancel={() => setEditingBook(null)} />
      )}
    </View>
  );
};
