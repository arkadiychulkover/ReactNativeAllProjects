import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  Alert,
  TouchableOpacity,
  StyleSheet,
  Modal,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer, useFocusEffect } from "@react-navigation/native";
import { DatabaseService, IBook, IAuthor } from "./src/services/dbService";

const Drawer = createDrawerNavigator();

interface BookItemProps {
  book: IBook;
  onEdit: (book: IBook) => void;
  onDelete: (book: IBook) => void;
}

const BookCard = ({ book, onEdit, onDelete }: BookItemProps) => {
  return (
    <View style={styles.bookCard}>
      <View style={styles.bookInfo}>
        <View style={styles.bookHeaderRow}>
          <Text style={styles.bookTitle} numberOfLines={2}>
            {book.title}
          </Text>
          <View style={styles.idBadge}>
            <Text style={styles.idBadgeText}>#{book.id}</Text>
          </View>
        </View>
        <View style={styles.authorRow}>
          <Ionicons name="person-outline" size={14} color="#666" />
          <Text style={styles.bookAuthor}>{book.author}</Text>
        </View>
      </View>

      <View style={styles.cardActionsRow}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => onEdit(book)}
          activeOpacity={0.7}
        >
          <Ionicons name="create-outline" size={16} color="#fff" />
          <Text style={styles.actionButtonText}>Редагувати</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => onDelete(book)}
          activeOpacity={0.7}
        >
          <Ionicons name="trash-outline" size={16} color="#fff" />
          <Text style={styles.actionButtonText}>Видалити</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const BookListScreen = () => {
  const [books, setBooks] = useState<IBook[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const [editingBook, setEditingBook] = useState<IBook | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editAuthor, setEditAuthor] = useState("");
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [availableAuthors, setAvailableAuthors] = useState<IAuthor[]>([]);

  const fetchBooks = async (query: string = ""): Promise<void> => {
    try {
      const db = await DatabaseService.getInstance();
      const results = await db.searchBooks(query);
      setBooks(results);
    } catch {
      Alert.alert("Помилка", "Не вдалося завантажити книги з бази даних");
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchBooks(searchQuery);
    }, [searchQuery])
  );

  const handleSearchChange = (text: string) => {
    setSearchQuery(text);
    fetchBooks(text);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    fetchBooks("");
  };

  const handleDeleteBook = (book: IBook) => {
    Alert.alert(
      "Видалення книги",
      `Ви впевнені, що хочете видалити книгу "${book.title}"?`,
      [
        { text: "Скасувати", style: "cancel" },
        {
          text: "Видалити",
          style: "destructive",
          onPress: async () => {
            try {
              const db = await DatabaseService.getInstance();
              await db.deleteBook(book.id);
              await fetchBooks(searchQuery);
            } catch {
              Alert.alert("Помилка", "Не вдалося видалити книгу");
            }
          },
        },
      ]
    );
  };

  const handleDeleteAllBooks = () => {
    Alert.alert(
      "Видалення всіх книг",
      "Ви дійсно бажаєте видалити ВСІ книги з бази даних? Цю дію неможливо скасувати.",
      [
        { text: "Скасувати", style: "cancel" },
        {
          text: "Видалити всі",
          style: "destructive",
          onPress: async () => {
            try {
              const db = await DatabaseService.getInstance();
              await db.deleteAllBooks();
              await fetchBooks(searchQuery);
              Alert.alert("Успіх", "Усі книги успішно видалено з бази даних");
            } catch {
              Alert.alert("Помилка", "Не вдалося видалити всі книги");
            }
          },
        },
      ]
    );
  };

  const handleOpenEdit = async (book: IBook) => {
    setEditingBook(book);
    setEditTitle(book.title);
    setEditAuthor(book.author);

    try {
      const db = await DatabaseService.getInstance();
      const authors = await db.getAll<IAuthor>("SELECT * FROM authors ORDER BY name ASC;");
      setAvailableAuthors(authors);
    } catch {
      setAvailableAuthors([]);
    }

    setIsEditModalVisible(true);
  };

  const handleCloseEdit = () => {
    setIsEditModalVisible(false);
    setEditingBook(null);
    setEditTitle("");
    setEditAuthor("");
  };

  const handleSaveEdit = async () => {
    if (!editingBook) return;

    const trimmedTitle = editTitle.trim();
    const trimmedAuthor = editAuthor.trim();

    if (!trimmedTitle || !trimmedAuthor) {
      Alert.alert("Помилка", "Будь ласка, заповніть назву книги та автора");
      return;
    }

    try {
      const db = await DatabaseService.getInstance();
      await db.updateBook(editingBook.id, trimmedTitle, trimmedAuthor);
      handleCloseEdit();
      await fetchBooks(searchQuery);
      Alert.alert("Успіх", "Книгу успішно оновлено!");
    } catch {
      Alert.alert("Помилка", "Не вдалося оновити книгу");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Пошук у БД (за назвою або автором)..."
          placeholderTextColor="#999"
          value={searchQuery}
          onChangeText={handleSearchChange}
          autoCapitalize="none"
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={handleClearSearch} style={styles.clearSearchBtn}>
            <Ionicons name="close-circle" size={20} color="#888" />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.listHeaderRow}>
        <Text style={styles.booksCountText}>
          {searchQuery ? `Знайдено в БД: ${books.length}` : `Усього книг: ${books.length}`}
        </Text>

        {books.length > 0 && (
          <TouchableOpacity
            style={styles.deleteAllButton}
            onPress={handleDeleteAllBooks}
            activeOpacity={0.7}
          >
            <Ionicons name="trash" size={14} color="#d9534f" />
            <Text style={styles.deleteAllButtonText}>Видалити всі</Text>
          </TouchableOpacity>
        )}
      </View>

      <FlatList
        data={books}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <BookCard
            book={item}
            onEdit={handleOpenEdit}
            onDelete={handleDeleteBook}
          />
        )}
        contentContainerStyle={books.length === 0 ? styles.emptyListContainer : undefined}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons
              name={searchQuery ? "search-outline" : "book-outline"}
              size={56}
              color="#ccc"
            />
            <Text style={styles.emptyTitle}>
              {searchQuery ? "Нічого не знайдено" : "Список книг порожній"}
            </Text>
            <Text style={styles.emptySubtitle}>
              {searchQuery
                ? `За запитом "${searchQuery}" у базі даних нічого немає.`
                : "Додайте першу книгу через бічне меню 'Додати книгу'."}
            </Text>
          </View>
        }
      />

      <Modal
        visible={isEditModalVisible}
        transparent
        animationType="fade"
        onRequestClose={handleCloseEdit}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.modalOverlay}
        >
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Редагування книги</Text>
              <TouchableOpacity onPress={handleCloseEdit}>
                <Ionicons name="close" size={24} color="#555" />
              </TouchableOpacity>
            </View>

            <Text style={styles.inputLabel}>Назва книги:</Text>
            <TextInput
              style={styles.input}
              placeholder="Введіть назву книги"
              value={editTitle}
              onChangeText={setEditTitle}
            />

            <Text style={styles.inputLabel}>Автор книги:</Text>
            <TextInput
              style={styles.input}
              placeholder="Введіть автора"
              value={editAuthor}
              onChangeText={setEditAuthor}
            />

            {availableAuthors.length > 0 && (
              <View style={styles.chipsSection}>
                <Text style={styles.chipsLabel}>Оберіть з існуючих авторів:</Text>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  style={styles.chipsScroll}
                >
                  {availableAuthors.map((author) => {
                    const isSelected = editAuthor === author.name;
                    return (
                      <TouchableOpacity
                        key={author.id}
                        style={[
                          styles.authorChip,
                          isSelected && styles.authorChipSelected,
                        ]}
                        onPress={() => setEditAuthor(author.name)}
                      >
                        <Text
                          style={[
                            styles.authorChipText,
                            isSelected && styles.authorChipTextSelected,
                          ]}
                        >
                          {author.name}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </ScrollView>
              </View>
            )}

            <View style={styles.modalActionsRow}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={handleCloseEdit}
                activeOpacity={0.7}
              >
                <Text style={styles.cancelButtonText}>Скасувати</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.saveChangesButton}
                onPress={handleSaveEdit}
                activeOpacity={0.7}
              >
                <Text style={styles.saveChangesButtonText}>Зберегти зміни</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
};

const AddAuthorScreen = ({ navigation }: any) => {
  const [authorName, setAuthorName] = useState("");

  const saveAuthor = async (): Promise<void> => {
    const trimmed = authorName.trim();
    if (!trimmed) {
      Alert.alert("Помилка", "Введіть ім'я автора");
      return;
    }
    try {
      const db = await DatabaseService.getInstance();
      const existing = await db.getOne<IAuthor>(
        "SELECT id FROM authors WHERE name = ? LIMIT 1;",
        [trimmed]
      );
      if (existing) {
        Alert.alert("Помилка", "Такий автор уже існує в базі даних");
        return;
      }
      await db.execute("INSERT INTO authors (name) VALUES (?);", [trimmed]);
      setAuthorName("");
      Alert.alert("Успіх", "Автора збережено");
      navigation.navigate("Add Book");
    } catch {
      Alert.alert("Помилка", "Не вдалося зберегти автора");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Додати автора</Text>
      <TextInput
        style={styles.input}
        placeholder="Ім'я автора"
        value={authorName}
        onChangeText={setAuthorName}
      />
      <TouchableOpacity
        style={styles.primaryButton}
        onPress={saveAuthor}
        activeOpacity={0.8}
      >
        <Text style={styles.primaryButtonText}>Зберегти автора</Text>
      </TouchableOpacity>
    </View>
  );
};

const AddBookScreen = ({ navigation }: any) => {
  const [title, setTitle] = useState("");
  const [selectedAuthor, setSelectedAuthor] = useState("");
  const [authors, setAuthors] = useState<IAuthor[]>([]);

  const fetchAuthors = async (): Promise<void> => {
    try {
      const db = await DatabaseService.getInstance();
      const rows = await db.getAll<IAuthor>(
        "SELECT * FROM authors ORDER BY name ASC;"
      );
      setAuthors(rows);
    } catch {
      Alert.alert("Помилка", "Не вдалося завантажити авторів");
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchAuthors();
    }, [])
  );

  const saveBook = async (): Promise<void> => {
    const trimmedTitle = title.trim();
    if (!trimmedTitle || !selectedAuthor) {
      Alert.alert("Помилка", "Введіть назву книги та оберіть автора");
      return;
    }
    try {
      const db = await DatabaseService.getInstance();
      await db.execute("INSERT INTO books (title, author) VALUES (?, ?);", [
        trimmedTitle,
        selectedAuthor,
      ]);
      setTitle("");
      setSelectedAuthor("");
      Alert.alert("Успіх", "Книгу успішно додано!");
      navigation.navigate("Book List");
    } catch {
      Alert.alert("Помилка", "Не вдалося додати книгу");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Додати книгу</Text>
      <TextInput
        style={styles.input}
        placeholder="Назва книги"
        value={title}
        onChangeText={setTitle}
      />
      <Text style={styles.sectionSubtitle}>Оберіть автора:</Text>
      {authors.length === 0 ? (
        <View style={styles.emptyAuthorsContainer}>
          <Text style={styles.emptyAuthorsText}>В базі ще немає авторів.</Text>
          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => navigation.navigate("Add Author")}
          >
            <Text style={styles.secondaryButtonText}>Створити автора</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={authors}
          keyExtractor={(item) => item.id.toString()}
          style={styles.authorsList}
          renderItem={({ item }) => {
            const isSelected = item.name === selectedAuthor;
            return (
              <TouchableOpacity
                style={[
                  styles.authorOption,
                  isSelected && styles.authorOptionSelected,
                ]}
                onPress={() => setSelectedAuthor(item.name)}
              >
                <Text
                  style={[
                    styles.authorOptionText,
                    isSelected && styles.authorOptionTextSelected,
                  ]}
                >
                  {item.name}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
      )}
      <View style={styles.saveButtonContainer}>
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={saveBook}
          activeOpacity={0.8}
        >
          <Text style={styles.primaryButtonText}>Зберегти книгу</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default function App() {
  useEffect(() => {
    const initDatabase = async (): Promise<void> => {
      try {
        const db = await DatabaseService.getInstance();
        await db.createTable(
          "authors",
          "id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL UNIQUE"
        );
        await db.createTable(
          "books",
          "id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL, author TEXT NOT NULL"
        );
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        Alert.alert("Помилка", "Ініціалізація бази даних не вдалася: " + message);
      }
    };
    initDatabase();
  }, []);

  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Book List">
        <Drawer.Screen
          name="Book List"
          component={BookListScreen}
          options={{ title: "Список книг" }}
        />
        <Drawer.Screen
          name="Add Book"
          component={AddBookScreen}
          options={{ title: "Додати книгу" }}
        />
        <Drawer.Screen
          name="Add Author"
          component={AddAuthorScreen}
          options={{ title: "Додати автора" }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f8f9fa" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 16, color: "#212529" },
  sectionSubtitle: { fontSize: 16, fontWeight: "600", marginVertical: 10, color: "#495057" },

  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#dee2e6",
    paddingHorizontal: 12,
    height: 46,
    marginBottom: 12,
  },
  searchIcon: { marginRight: 8 },
  searchInput: { flex: 1, fontSize: 15, color: "#212529", height: "100%" },
  clearSearchBtn: { padding: 4 },

  listHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  booksCountText: { fontSize: 14, color: "#6c757d", fontWeight: "600" },
  deleteAllButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 6,
    backgroundColor: "#fee2e2",
    borderWidth: 1,
    borderColor: "#fca5a5",
  },
  deleteAllButtonText: { color: "#dc2626", fontSize: 13, fontWeight: "600" },

  bookCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#e9ecef",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  bookInfo: { marginBottom: 12 },
  bookHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 8,
  },
  bookTitle: { fontSize: 17, fontWeight: "700", color: "#1a1a1a", flex: 1 },
  idBadge: {
    backgroundColor: "#e2e8f0",
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 6,
  },
  idBadgeText: { fontSize: 12, fontWeight: "600", color: "#475569" },
  authorRow: { flexDirection: "row", alignItems: "center", gap: 5, marginTop: 6 },
  bookAuthor: { fontSize: 14, color: "#64748b", fontWeight: "500" },

  cardActionsRow: { flexDirection: "row", gap: 10 },
  editButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    backgroundColor: "#0284c7",
    paddingVertical: 8,
    borderRadius: 8,
  },
  deleteButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    backgroundColor: "#ef4444",
    paddingVertical: 8,
    borderRadius: 8,
  },
  actionButtonText: { color: "#fff", fontSize: 14, fontWeight: "600" },

  emptyListContainer: { flexGrow: 1, justifyContent: "center" },
  emptyState: { alignItems: "center", paddingVertical: 40, paddingHorizontal: 20 },
  emptyTitle: { fontSize: 18, fontWeight: "700", color: "#64748b", marginTop: 12 },
  emptySubtitle: {
    fontSize: 14,
    color: "#94a3b8",
    textAlign: "center",
    marginTop: 6,
    lineHeight: 20,
  },

  inputLabel: { fontSize: 14, fontWeight: "600", color: "#334155", marginBottom: 6 },
  input: {
    height: 46,
    backgroundColor: "#fff",
    borderColor: "#cbd5e1",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 14,
    paddingHorizontal: 12,
    fontSize: 15,
    color: "#1e293b",
  },
  primaryButton: {
    backgroundColor: "#0ea5e9",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  primaryButtonText: { color: "#fff", fontSize: 16, fontWeight: "700" },
  secondaryButton: {
    backgroundColor: "#e2e8f0",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  secondaryButtonText: { color: "#334155", fontSize: 14, fontWeight: "600" },

  authorsList: { maxHeight: 180, marginBottom: 16 },
  authorOption: {
    padding: 12,
    borderWidth: 1,
    borderColor: "#cbd5e1",
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: "#fff",
  },
  authorOptionSelected: { borderColor: "#0ea5e9", backgroundColor: "#f0f9ff" },
  authorOptionText: { fontSize: 15, color: "#334155" },
  authorOptionTextSelected: { color: "#0ea5e9", fontWeight: "bold" },
  emptyAuthorsContainer: { marginBottom: 16, gap: 8 },
  emptyAuthorsText: { color: "#64748b", fontStyle: "italic" },
  saveButtonContainer: { marginTop: 10 },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    padding: 20,
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 8,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  modalTitle: { fontSize: 20, fontWeight: "bold", color: "#1e293b" },
  chipsSection: { marginBottom: 16 },
  chipsLabel: { fontSize: 13, color: "#64748b", marginBottom: 8, fontWeight: "500" },
  chipsScroll: { flexDirection: "row" },
  authorChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: "#f1f5f9",
    borderWidth: 1,
    borderColor: "#cbd5e1",
    marginRight: 8,
  },
  authorChipSelected: {
    backgroundColor: "#0ea5e9",
    borderColor: "#0284c7",
  },
  authorChipText: { fontSize: 13, color: "#475569" },
  authorChipTextSelected: { color: "#fff", fontWeight: "600" },
  modalActionsRow: { flexDirection: "row", gap: 10, marginTop: 8 },
  cancelButton: {
    flex: 1,
    paddingVertical: 11,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#cbd5e1",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  cancelButtonText: { color: "#64748b", fontSize: 15, fontWeight: "600" },
  saveChangesButton: {
    flex: 1,
    paddingVertical: 11,
    borderRadius: 8,
    backgroundColor: "#0ea5e9",
    alignItems: "center",
  },
  saveChangesButtonText: { color: "#fff", fontSize: 15, fontWeight: "700" },
});