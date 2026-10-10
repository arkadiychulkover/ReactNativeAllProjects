/*
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
*/

import "react-native-gesture-handler";
import React, { useState, useEffect, createContext, useContext } from "react";
import { View, Text, TextInput, FlatList, TouchableOpacity, Modal, Alert, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "@expo/vector-icons/FontAwesome";

export type UserRole = "admin" | "viewer";

export interface User {
  id: string;
  username: string;
  password: string;
  role: UserRole;
}

export interface Book {
  id: string;
  title: string;
  author: string;
}

export interface AuthSession {
  id: string;
  username: string;
  role: UserRole;
}

interface AppContextType {
  currentUser: AuthSession | null;
  books: Book[];
  users: User[];
  isAdmin: boolean;
  login: (usernameInput: string, passwordInput: string) => Promise<boolean>;
  logout: () => Promise<void>;
  addBook: (title: string, author: string) => Promise<boolean>;
  updateBook: (id: string, title: string, author: string) => Promise<boolean>;
  deleteBook: (id: string) => Promise<void>;
  registerUser: (usernameInput: string, passwordInput: string) => Promise<{ success: boolean; message: string }>;
}

const STORAGE_KEY_BOOKS = "@books_data";
const STORAGE_KEY_USERS = "@users_data";
const STORAGE_KEY_SESSION = "@current_session";

const DEFAULT_ADMIN: User = { id: "admin-1", username: "admin", password: "123", role: "admin" };
const INITIAL_BOOKS: Book[] = [{ id: "1", title: "Кобзар", author: "Тарас Шевченко" }, { id: "2", title: "Тіні забутих предків", author: "Михайло Коцюбинський" }, { id: "3", title: "Захар Беркут", author: "Іван Франко" }];

const AppContext = createContext<AppContextType | null>(null);

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useAppContext must be used within AppProvider");
  return context;
};

export const AppProvider = ({ children }: { children: React.ReactNode }): React.JSX.Element => {
  const [currentUser, setCurrentUser] = useState<AuthSession | null>(null);
  const [books, setBooks] = useState<Book[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const isAdmin = currentUser?.role === "admin";

  useEffect(() => {
    let isMounted = true;
    const initData = async (): Promise<void> => {
      try {
        const storedBooks = await AsyncStorage.getItem(STORAGE_KEY_BOOKS);
        if (!isMounted) return;
        if (storedBooks) {
          setBooks(JSON.parse(storedBooks));
        } else {
          await AsyncStorage.setItem(STORAGE_KEY_BOOKS, JSON.stringify(INITIAL_BOOKS));
          if (isMounted) setBooks(INITIAL_BOOKS);
        }

        const storedUsers = await AsyncStorage.getItem(STORAGE_KEY_USERS);
        if (!isMounted) return;
        if (storedUsers) {
          setUsers(JSON.parse(storedUsers));
        } else {
          await AsyncStorage.setItem(STORAGE_KEY_USERS, JSON.stringify([DEFAULT_ADMIN]));
          if (isMounted) setUsers([DEFAULT_ADMIN]);
        }

        const storedSession = await AsyncStorage.getItem(STORAGE_KEY_SESSION);
        if (isMounted && storedSession) {
          setCurrentUser(JSON.parse(storedSession));
        }
      } catch {
        if (isMounted) Alert.alert("Помилка", "Не вдалося завантажити дані з AsyncStorage", [{ text: "OK" }]);
      }
    };
    initData();
    return () => { isMounted = false; };
  }, []);

  const login = async (usernameInput: string, passwordInput: string): Promise<boolean> => {
    const trimmedUser = usernameInput.trim();
    const trimmedPass = passwordInput.trim();
    if (!trimmedUser || !trimmedPass) {
      Alert.alert("Помилка", "Введіть логін та пароль", [{ text: "OK" }]);
      return false;
    }

    const matchedUser = users.find((u) => u.username.toLowerCase() === trimmedUser.toLowerCase() && u.password === trimmedPass) || (trimmedUser === DEFAULT_ADMIN.username && trimmedPass === DEFAULT_ADMIN.password ? DEFAULT_ADMIN : null);

    if (matchedUser) {
      const session: AuthSession = { id: matchedUser.id, username: matchedUser.username, role: matchedUser.role };
      await AsyncStorage.setItem(STORAGE_KEY_SESSION, JSON.stringify(session));
      setCurrentUser(session);
      return true;
    } else {
      Alert.alert("Помилка авторизації", "Невірне ім'я користувача або пароль", [{ text: "OK" }]);
      return false;
    }
  };

  const logout = async (): Promise<void> => {
    await AsyncStorage.removeItem(STORAGE_KEY_SESSION);
    setCurrentUser(null);
  };

  const addBook = async (title: string, author: string): Promise<boolean> => {
    const trimmedTitle = title.trim();
    const trimmedAuthor = author.trim();
    if (!trimmedTitle || !trimmedAuthor) {
      Alert.alert("Помилка", "Заповніть назву книги та автора", [{ text: "OK" }]);
      return false;
    }
    const newBookItem: Book = { id: Date.now().toString(), title: trimmedTitle, author: trimmedAuthor };
    const updatedBooks = [...books, newBookItem];
    setBooks(updatedBooks);
    await AsyncStorage.setItem(STORAGE_KEY_BOOKS, JSON.stringify(updatedBooks));
    Alert.alert("Успіх", `Книгу "${trimmedTitle}" успішно додано!`, [{ text: "OK" }]);
    return true;
  };

  const updateBook = async (id: string, title: string, author: string): Promise<boolean> => {
    const trimmedTitle = title.trim();
    const trimmedAuthor = author.trim();
    if (!trimmedTitle || !trimmedAuthor) {
      Alert.alert("Помилка", "Заповніть назву книги та автора", [{ text: "OK" }]);
      return false;
    }
    const updatedBooks = books.map((b) => (b.id === id ? { id, title: trimmedTitle, author: trimmedAuthor } : b));
    setBooks(updatedBooks);
    await AsyncStorage.setItem(STORAGE_KEY_BOOKS, JSON.stringify(updatedBooks));
    Alert.alert("Успіх", "Дані книги успішно оновлено!", [{ text: "OK" }]);
    return true;
  };

  const deleteBook = async (id: string): Promise<void> => {
    const updatedBooks = books.filter((b) => b.id !== id);
    setBooks(updatedBooks);
    await AsyncStorage.setItem(STORAGE_KEY_BOOKS, JSON.stringify(updatedBooks));
  };

  const registerUser = async (usernameInput: string, passwordInput: string): Promise<{ success: boolean; message: string }> => {
    const trimmedUser = usernameInput.trim();
    const trimmedPass = passwordInput.trim();
    if (!trimmedUser || !trimmedPass) {
      return { success: false, message: "Введіть ім'я користувача та пароль" };
    }
    if (trimmedUser.toLowerCase() === DEFAULT_ADMIN.username.toLowerCase() || users.some((u) => u.username.toLowerCase() === trimmedUser.toLowerCase())) {
      return { success: false, message: "Користувач із таким логіном уже існує!" };
    }
    const newUserItem: User = { id: Date.now().toString(), username: trimmedUser, password: trimmedPass, role: "viewer" };
    const updatedUsers = [...users, newUserItem];
    setUsers(updatedUsers);
    await AsyncStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(updatedUsers));
    return { success: true, message: `Користувача "${trimmedUser}" успішно зареєстровано як переглядача` };
  };

  return (
    <AppContext.Provider value={{ currentUser, books, users, isAdmin, login, logout, addBook, updateBook, deleteBook, registerUser }}>
      {children}
    </AppContext.Provider>
  );
};

interface BookItemProps {
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

interface EditBookModalProps {
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

export const LoginScreen = (): React.JSX.Element => {
  const { login } = useAppContext();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLoginPress = async (): Promise<void> => {
    await login(username, password);
  };

  return (
    <SafeAreaView edges={["top", "bottom", "left", "right"]} style={{ flex: 1, justifyContent: "center", padding: 24, backgroundColor: "#f8fafc" }}>
      <View style={{ backgroundColor: "#ffffff", padding: 24, borderRadius: 14, borderWidth: 1, borderColor: "#e2e8f0" }}>
        <Text style={{ fontSize: 24, fontWeight: "700", marginBottom: 8, color: "#0f172a", textAlign: "center" }}>Вхід у систему</Text>
        <Text style={{ fontSize: 14, color: "#64748b", marginBottom: 20, textAlign: "center" }}>Керування бібліотекою книг</Text>
        <Text style={{ fontSize: 13, color: "#475569", marginBottom: 4 }}>{"Ім'я користувача:"}</Text>
        <TextInput placeholder="Username (наприклад: admin)" value={username} onChangeText={setUsername} autoCapitalize="none" style={{ borderWidth: 1, borderColor: "#cbd5e1", borderRadius: 8, padding: 10, marginBottom: 12, backgroundColor: "#ffffff" }} />
        <Text style={{ fontSize: 13, color: "#475569", marginBottom: 4 }}>Пароль:</Text>
        <TextInput placeholder="Password (наприклад: 123)" secureTextEntry value={password} onChangeText={setPassword} autoCapitalize="none" style={{ borderWidth: 1, borderColor: "#cbd5e1", borderRadius: 8, padding: 10, marginBottom: 20, backgroundColor: "#ffffff" }} />
        <TouchableOpacity onPress={handleLoginPress} style={{ backgroundColor: "#0284c7", padding: 12, borderRadius: 8, alignItems: "center" }}>
          <Text style={{ color: "#ffffff", fontWeight: "700", fontSize: 16 }}>Увійти</Text>
        </TouchableOpacity>
        <View style={{ marginTop: 20, padding: 12, backgroundColor: "#f1f5f9", borderRadius: 8 }}>
          <Text style={{ fontSize: 12, color: "#475569", fontWeight: "600" }}>Підказка для входу:</Text>
          <Text style={{ fontSize: 12, color: "#64748b", marginTop: 2 }}>Головний адмін: admin / 123 (повний доступ)</Text>
          <Text style={{ fontSize: 12, color: "#64748b", marginTop: 2 }}>Створені користувачі: тільки перегляд книг</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

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

export const UsersScreen = (): React.JSX.Element => {
  const { users, registerUser, isAdmin } = useAppContext();
  const [newUsername, setNewUsername] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");

  const handleRegisterPress = async (): Promise<void> => {
    const result = await registerUser(newUsername, newPassword);
    if (result.success) {
      Alert.alert("Успіх", result.message, [{ text: "OK" }]);
      setNewUsername("");
      setNewPassword("");
    } else {
      Alert.alert("Помилка", result.message, [{ text: "OK" }]);
    }
  };

  if (!isAdmin) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 20 }}>
        <Icon name="lock" size={48} color="#94a3b8" />
        <Text style={{ fontSize: 18, fontWeight: "700", color: "#475569", marginTop: 12 }}>Доступ заборонено</Text>
        <Text style={{ color: "#94a3b8", textAlign: "center", marginTop: 6 }}>Реєструвати нових користувачів може тільки головний адміністратор.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={{ flex: 1, padding: 16, backgroundColor: "#f8fafc" }}>
      <View style={{ backgroundColor: "#ffffff", padding: 16, borderRadius: 12, borderWidth: 1, borderColor: "#e2e8f0", marginBottom: 16 }}>
        <Text style={{ fontSize: 18, fontWeight: "700", color: "#0f172a", marginBottom: 4 }}>Реєстрація нового користувача</Text>
        <Text style={{ fontSize: 13, color: "#64748b", marginBottom: 12 }}>Нові користувачі зберігаються в AsyncStorage і мають права лише на перегляд.</Text>
        <TextInput placeholder="Логін нового користувача" value={newUsername} onChangeText={setNewUsername} autoCapitalize="none" style={{ borderWidth: 1, borderColor: "#cbd5e1", borderRadius: 8, padding: 10, marginBottom: 8, backgroundColor: "#ffffff" }} />
        <TextInput placeholder="Пароль" secureTextEntry value={newPassword} onChangeText={setNewPassword} autoCapitalize="none" style={{ borderWidth: 1, borderColor: "#cbd5e1", borderRadius: 8, padding: 10, marginBottom: 14, backgroundColor: "#ffffff" }} />
        <TouchableOpacity onPress={handleRegisterPress} style={{ backgroundColor: "#0284c7", padding: 12, borderRadius: 8, alignItems: "center", flexDirection: "row", justifyContent: "center", gap: 8 }}>
          <Icon name="user-plus" size={14} color="#ffffff" />
          <Text style={{ color: "#ffffff", fontWeight: "700", fontSize: 15 }}>Зареєструвати переглядача</Text>
        </TouchableOpacity>
      </View>

      <View style={{ backgroundColor: "#ffffff", padding: 16, borderRadius: 12, borderWidth: 1, borderColor: "#e2e8f0" }}>
        <Text style={{ fontSize: 16, fontWeight: "700", color: "#0f172a", marginBottom: 10 }}>Зареєстровані користувачі ({users.length})</Text>
        {users.map((u) => (
          <View key={u.id} style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: "#f1f5f9" }}>
            <View>
              <Text style={{ fontSize: 15, fontWeight: "600", color: "#1e293b" }}>{u.username}</Text>
              <Text style={{ fontSize: 12, color: "#64748b" }}>Пароль: {u.password}</Text>
            </View>
            <View style={{ backgroundColor: u.role === "admin" ? "#dcfce7" : "#f1f5f9", paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 }}>
              <Text style={{ fontSize: 12, fontWeight: "600", color: u.role === "admin" ? "#15803d" : "#475569" }}>{u.role === "admin" ? "Головний адмін" : "Переглядач"}</Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export const SettingsScreen = (): React.JSX.Element => {
  const { currentUser, logout } = useAppContext();

  const handleLogoutPress = async (): Promise<void> => {
    await logout();
  };

  return (
    <View style={{ flex: 1, padding: 16, backgroundColor: "#f8fafc", justifyContent: "space-between" }}>
      <View style={{ backgroundColor: "#ffffff", padding: 18, borderRadius: 12, borderWidth: 1, borderColor: "#e2e8f0" }}>
        <Text style={{ fontSize: 18, fontWeight: "700", color: "#0f172a", marginBottom: 12 }}>Профіль користувача</Text>
        <View style={{ marginBottom: 10 }}>
          <Text style={{ fontSize: 13, color: "#64748b" }}>Поточний логін:</Text>
          <Text style={{ fontSize: 16, fontWeight: "600", color: "#1e293b" }}>{currentUser?.username || "Не авторизовано"}</Text>
        </View>
        <View style={{ marginBottom: 10 }}>
          <Text style={{ fontSize: 13, color: "#64748b" }}>Права доступу:</Text>
          <Text style={{ fontSize: 16, fontWeight: "600", color: currentUser?.role === "admin" ? "#16a34a" : "#0284c7" }}>
            {currentUser?.role === "admin" ? "Адміністратор (Повний CRUD доступ)" : "Переглядач (Тільки перегляд списку книг)"}
          </Text>
        </View>
        <View style={{ backgroundColor: "#f1f5f9", padding: 12, borderRadius: 8, marginTop: 10 }}>
          <Text style={{ fontSize: 12, color: "#475569" }}>
            {currentUser?.role === "admin" ? "Ви можете додавати, редагувати, видаляти книги та реєструвати інших користувачів." : "Вам дозволено лише переглядати існуючий список книг у системі."}
          </Text>
        </View>
      </View>

      <TouchableOpacity onPress={handleLogoutPress} style={{ backgroundColor: "#ef4444", padding: 14, borderRadius: 10, alignItems: "center", flexDirection: "row", justifyContent: "center", gap: 8 }}>
        <Icon name="sign-out" size={16} color="#ffffff" />
        <Text style={{ color: "#ffffff", fontWeight: "700", fontSize: 16 }}>Вийти з системи</Text>
      </TouchableOpacity>
    </View>
  );
};

export const AboutScreen = (): React.JSX.Element => {
  return (
    <SafeAreaView edges={["bottom", "left", "right"]} style={{ flex: 1, padding: 24, backgroundColor: "#f8fafc", justifyContent: "center" }}>
      <View style={{ backgroundColor: "#ffffff", padding: 24, borderRadius: 14, borderWidth: 1, borderColor: "#e2e8f0" }}>
        <Icon name="book" size={40} color="#0284c7" style={{ marginBottom: 12 }} />
        <Text style={{ fontSize: 22, fontWeight: "700", color: "#0f172a", marginBottom: 8 }}>Про додаток «Book Manager»</Text>
        <Text style={{ fontSize: 14, color: "#475569", lineHeight: 22, marginBottom: 16 }}>
          Мобільний додаток для керування списком книг на React Native з повною підтримкою AsyncStorage та ролевою моделлю доступу.
        </Text>
        <View style={{ borderTopWidth: 1, borderTopColor: "#e2e8f0", paddingTop: 12 }}>
          <Text style={{ fontSize: 13, color: "#64748b", marginBottom: 4 }}>• Збереження даних у локальному AsyncStorage</Text>
          <Text style={{ fontSize: 13, color: "#64748b", marginBottom: 4 }}>• Ролі: Головний Адміністратор та Переглядачі</Text>
          <Text style={{ fontSize: 13, color: "#64748b", marginBottom: 4 }}>• Повне оновлення та редагування книг</Text>
          <Text style={{ fontSize: 13, color: "#64748b" }}>• SafeAreaView виправлено через react-native-safe-area-context</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

export const HomeTabNavigator = (): React.JSX.Element => {
  const { isAdmin } = useAppContext();

  return (
    <Tab.Navigator screenOptions={{ tabBarActiveTintColor: "#0284c7", tabBarInactiveTintColor: "#64748b" }}>
      <Tab.Screen name="BooksTab" component={BooksScreen} options={{ title: "Книги", tabBarIcon: ({ color, size }) => <Icon name="book" size={size} color={color} /> }} />
      {isAdmin && (
        <Tab.Screen name="UsersTab" component={UsersScreen} options={{ title: "Користувачі", tabBarIcon: ({ color, size }) => <Icon name="users" size={size} color={color} /> }} />
      )}
      <Tab.Screen name="SettingsTab" component={SettingsScreen} options={{ title: "Налаштування", tabBarIcon: ({ color, size }) => <Icon name="cogs" size={size} color={color} /> }} />
    </Tab.Navigator>
  );
};

export const HomeScreen = (): React.JSX.Element => {
  const { currentUser } = useAppContext();
  if (!currentUser) {
    return <LoginScreen />;
  }
  return <HomeTabNavigator />;
};

export const MainDrawerNavigator = (): React.JSX.Element => {
  const { currentUser } = useAppContext();

  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={HomeScreen} options={{ title: currentUser ? "Головна" : "Авторизація", drawerIcon: ({ color, size }) => <Icon name="home" size={size} color={color} /> }} />
      <Drawer.Screen name="About" component={AboutScreen} options={{ title: "Про додаток", drawerIcon: ({ color, size }) => <Icon name="info-circle" size={size} color={color} /> }} />
    </Drawer.Navigator>
  );
};

export default function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <AppProvider>
        <NavigationContainer>
          <MainDrawerNavigator />
        </NavigationContainer>
      </AppProvider>
    </SafeAreaProvider>
  );
}