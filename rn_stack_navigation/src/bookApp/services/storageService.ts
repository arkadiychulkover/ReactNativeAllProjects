import AsyncStorage from "@react-native-async-storage/async-storage";
import { Book, User, AuthSession } from "../types";

const STORAGE_KEY_BOOKS = "@books_data";
const STORAGE_KEY_USERS = "@users_data";
const STORAGE_KEY_SESSION = "@current_session";

export const DEFAULT_ADMIN: User = { id: "admin-1", username: "admin", password: "123", role: "admin" };
export const INITIAL_BOOKS: Book[] = [{ id: "1", title: "Кобзар", author: "Тарас Шевченко" }, { id: "2", title: "Тіні забутих предків", author: "Михайло Коцюбинський" }, { id: "3", title: "Захар Беркут", author: "Іван Франко" }];

export const getStoredBooks = async (): Promise<Book[]> => {
  const data = await AsyncStorage.getItem(STORAGE_KEY_BOOKS);
  if (!data) {
    await AsyncStorage.setItem(STORAGE_KEY_BOOKS, JSON.stringify(INITIAL_BOOKS));
    return INITIAL_BOOKS;
  }
  return JSON.parse(data);
};

export const saveStoredBooks = async (books: Book[]): Promise<void> => {
  await AsyncStorage.setItem(STORAGE_KEY_BOOKS, JSON.stringify(books));
};

export const getStoredUsers = async (): Promise<User[]> => {
  const data = await AsyncStorage.getItem(STORAGE_KEY_USERS);
  if (!data) {
    await AsyncStorage.setItem(STORAGE_KEY_USERS, JSON.stringify([DEFAULT_ADMIN]));
    return [DEFAULT_ADMIN];
  }
  return JSON.parse(data);
};

export const saveStoredUsers = async (users: User[]): Promise<void> => {
  await AsyncStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(users));
};

export const getStoredSession = async (): Promise<AuthSession | null> => {
  const data = await AsyncStorage.getItem(STORAGE_KEY_SESSION);
  return data ? JSON.parse(data) : null;
};

export const saveStoredSession = async (session: AuthSession): Promise<void> => {
  await AsyncStorage.setItem(STORAGE_KEY_SESSION, JSON.stringify(session));
};

export const clearStoredSession = async (): Promise<void> => {
  await AsyncStorage.removeItem(STORAGE_KEY_SESSION);
};
