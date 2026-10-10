import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Icon from "@expo/vector-icons/FontAwesome";
import { Book } from "../types";

export interface BookItemProps {
  book: Book;
  isAdmin: boolean;
  onEdit: (book: Book) => void;
  onDelete: (book: Book) => void;
}

export const BookItem = ({ book, isAdmin, onEdit, onDelete }: BookItemProps): React.JSX.Element => {
  return (
    <View style={{ backgroundColor: "#ffffff", borderRadius: 10, padding: 14, marginBottom: 10, borderWidth: 1, borderColor: "#e2e8f0" }}>
      <View style={{ marginBottom: isAdmin ? 10 : 0 }}>
        <Text style={{ fontSize: 16, fontWeight: "700", color: "#1e293b" }}>{book.title}</Text>
        <Text style={{ fontSize: 14, color: "#64748b", marginTop: 4 }}>Автор: {book.author}</Text>
      </View>
      {isAdmin && (
        <View style={{ flexDirection: "row", justifyContent: "flex-end", gap: 8 }}>
          <TouchableOpacity onPress={() => onEdit(book)} style={{ backgroundColor: "#0284c7", paddingHorizontal: 12, paddingVertical: 6, borderRadius: 6, flexDirection: "row", alignItems: "center", gap: 6 }}>
            <Icon name="pencil" size={13} color="#ffffff" />
            <Text style={{ color: "#ffffff", fontWeight: "600", fontSize: 13 }}>Редагувати</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onDelete(book)} style={{ backgroundColor: "#ef4444", paddingHorizontal: 12, paddingVertical: 6, borderRadius: 6, flexDirection: "row", alignItems: "center", gap: 6 }}>
            <Icon name="trash" size={13} color="#ffffff" />
            <Text style={{ color: "#ffffff", fontWeight: "600", fontSize: 13 }}>Видалити</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};
