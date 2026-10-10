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

export interface AppContextType {
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
