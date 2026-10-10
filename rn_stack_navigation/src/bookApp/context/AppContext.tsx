import React, { useState, useEffect, createContext, useContext } from "react";
import { Alert } from "react-native";
import { Book, User, AuthSession, AppContextType } from "../types";
import { getStoredBooks, saveStoredBooks, getStoredUsers, saveStoredUsers, getStoredSession, saveStoredSession, clearStoredSession, DEFAULT_ADMIN } from "../services/storageService";

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
        const storedBooks = await getStoredBooks();
        if (isMounted) setBooks(storedBooks);
        const storedUsers = await getStoredUsers();
        if (isMounted) setUsers(storedUsers);
        const storedSession = await getStoredSession();
        if (isMounted && storedSession) setCurrentUser(storedSession);
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
      await saveStoredSession(session);
      setCurrentUser(session);
      return true;
    } else {
      Alert.alert("Помилка авторизації", "Невірне ім'я користувача або пароль", [{ text: "OK" }]);
      return false;
    }
  };

  const logout = async (): Promise<void> => {
    await clearStoredSession();
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
    await saveStoredBooks(updatedBooks);
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
    await saveStoredBooks(updatedBooks);
    Alert.alert("Успіх", "Дані книги успішно оновлено!", [{ text: "OK" }]);
    return true;
  };

  const deleteBook = async (id: string): Promise<void> => {
    const updatedBooks = books.filter((b) => b.id !== id);
    setBooks(updatedBooks);
    await saveStoredBooks(updatedBooks);
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
    await saveStoredUsers(updatedUsers);
    return { success: true, message: `Користувача "${trimmedUser}" успішно зареєстровано як переглядача` };
  };

  return (
    <AppContext.Provider value={{ currentUser, books, users, isAdmin, login, logout, addBook, updateBook, deleteBook, registerUser }}>
      {children}
    </AppContext.Provider>
  );
};
