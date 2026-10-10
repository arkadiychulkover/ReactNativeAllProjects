import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Modal } from "react-native";
import { Book } from "../types";

export interface EditBookModalProps {
  visible: boolean;
  book: Book;
  onSave: (id: string, title: string, author: string) => Promise<void>;
  onCancel: () => void;
}

export const EditBookModal = ({ visible, book, onSave, onCancel }: EditBookModalProps): React.JSX.Element => {
  const [title, setTitle] = useState<string>(book.title);
  const [author, setAuthor] = useState<string>(book.author);

  const handleSavePress = async (): Promise<void> => {
    await onSave(book.id, title, author);
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onCancel}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.5)", padding: 20 }}>
        <View style={{ backgroundColor: "#ffffff", borderRadius: 12, padding: 20, width: "100%", maxWidth: 400 }}>
          <Text style={{ fontSize: 18, fontWeight: "700", marginBottom: 14, color: "#0f172a" }}>Оновлення книги</Text>
          <Text style={{ fontSize: 13, color: "#475569", marginBottom: 4 }}>Назва книги:</Text>
          <TextInput placeholder="Назва книги" value={title} onChangeText={setTitle} style={{ borderWidth: 1, borderColor: "#cbd5e1", borderRadius: 8, padding: 10, marginBottom: 12, backgroundColor: "#ffffff" }} />
          <Text style={{ fontSize: 13, color: "#475569", marginBottom: 4 }}>Автор:</Text>
          <TextInput placeholder="Автор книги" value={author} onChangeText={setAuthor} style={{ borderWidth: 1, borderColor: "#cbd5e1", borderRadius: 8, padding: 10, marginBottom: 16, backgroundColor: "#ffffff" }} />
          <View style={{ flexDirection: "row", justifyContent: "flex-end", gap: 10 }}>
            <TouchableOpacity onPress={onCancel} style={{ backgroundColor: "#94a3b8", paddingVertical: 10, paddingHorizontal: 16, borderRadius: 8 }}>
              <Text style={{ color: "#ffffff", fontWeight: "600" }}>Скасувати</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSavePress} style={{ backgroundColor: "#0284c7", paddingVertical: 10, paddingHorizontal: 16, borderRadius: 8 }}>
              <Text style={{ color: "#ffffff", fontWeight: "600" }}>Зберегти</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};
