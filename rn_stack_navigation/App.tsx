import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { DrawerNavigator } from './src/navigation/DrawerNavigator';

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <DrawerNavigator />
        <StatusBar style="auto" />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

// ─── Book Library (SQLite) — закомментировано ────────────────────────────────
// import React, { useState, useCallback, useEffect } from "react";
// import { View, Text, TextInput, Button, FlatList, Alert, TouchableOpacity, StyleSheet } from "react-native";
// import { createDrawerNavigator } from "@react-navigation/drawer";
// import { NavigationContainer, useFocusEffect } from "@react-navigation/native";
// import { DatabaseService } from "./src/services/dbService";
//
// const Drawer = createDrawerNavigator();
//
// interface IBook {
//   id: number;
//   title: string;
//   author: string;
// }
//
// interface IAuthor {
//   id: number;
//   name: string;
// }
//
// interface BookItemProps {
//   book: IBook;
//   onDelete: () => void;
// }
//
// const BookCard = ({ book, onDelete }: BookItemProps) => {
//   return (
//     <View style={styles.bookItem}>
//       <Text style={styles.bookTitle}>{book.title}</Text>
//       <Text style={styles.bookAuthor}>Author: {book.author}</Text>
//       <Button title="Delete" color="#d9534f" onPress={onDelete} />
//     </View>
//   );
// };
//
// const BookListScreen = () => {
//   const [books, setBooks] = useState<IBook[]>([]);
//
//   const fetchBooks = async (): Promise<void> => {
//     try {
//       const db = await DatabaseService.getInstance();
//       const rows = await db.getAll<IBook>("SELECT * FROM books ORDER BY id DESC;");
//       setBooks(rows);
//     } catch (error) {
//       Alert.alert("Error", "Failed to load books");
//     }
//   };
//
//   useFocusEffect(useCallback(() => { fetchBooks(); }, []));
//
//   const handleDeleteBook = async (id: number): Promise<void> => {
//     try {
//       const db = await DatabaseService.getInstance();
//       await db.execute("DELETE FROM books WHERE id = ?;", [id]);
//       await fetchBooks();
//     } catch (error) {
//       Alert.alert("Error", "Failed to delete book");
//     }
//   };
//
//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Book List</Text>
//       <FlatList
//         data={books}
//         keyExtractor={(item) => item.id.toString()}
//         renderItem={({ item }) => <BookCard book={item} onDelete={() => handleDeleteBook(item.id)} />}
//         ListEmptyComponent={<Text style={styles.emptyAuthorsText}>No books available.</Text>}
//       />
//     </View>
//   );
// };
//
// const AddAuthorScreen = ({ navigation }: any) => {
//   const [authorName, setAuthorName] = useState("");
//
//   const saveAuthor = async (): Promise<void> => {
//     const trimmed = authorName.trim();
//     if (!trimmed) {
//       Alert.alert("Error", "Enter author name");
//       return;
//     }
//     try {
//       const db = await DatabaseService.getInstance();
//       const existing = await db.getOne<IAuthor>("SELECT id FROM authors WHERE name = ? LIMIT 1;", [trimmed]);
//       if (existing) {
//         Alert.alert("Error", "Author already exists");
//         return;
//       }
//       await db.execute("INSERT INTO authors (name) VALUES (?);", [trimmed]);
//       setAuthorName("");
//       Alert.alert("Success", "Author saved");
//       navigation.navigate("Add Book");
//     } catch (error) {
//       Alert.alert("Error", "Failed to save author");
//     }
//   };
//
//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Add Author</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Author name"
//         value={authorName}
//         onChangeText={setAuthorName}
//       />
//       <Button title="Save Author" onPress={saveAuthor} />
//     </View>
//   );
// };
//
// const AddBookScreen = ({ navigation }: any) => {
//   const [title, setTitle] = useState("");
//   const [selectedAuthor, setSelectedAuthor] = useState("");
//   const [authors, setAuthors] = useState<IAuthor[]>([]);
//
//   const fetchAuthors = async (): Promise<void> => {
//     try {
//       const db = await DatabaseService.getInstance();
//       const rows = await db.getAll<IAuthor>("SELECT * FROM authors ORDER BY name ASC;");
//       setAuthors(rows);
//     } catch (error) {
//       Alert.alert("Error", "Failed to load authors");
//     }
//   };
//
//   useFocusEffect(useCallback(() => { fetchAuthors(); }, []));
//
//   const saveBook = async (): Promise<void> => {
//     const trimmedTitle = title.trim();
//     if (!trimmedTitle || !selectedAuthor) {
//       Alert.alert("Error", "Enter title and select author");
//       return;
//     }
//     try {
//       const db = await DatabaseService.getInstance();
//       await db.execute("INSERT INTO books (title, author) VALUES (?, ?);", [trimmedTitle, selectedAuthor]);
//       setTitle("");
//       setSelectedAuthor("");
//       Alert.alert("Success", "Book added");
//       navigation.navigate("Book List");
//     } catch (error) {
//       Alert.alert("Error", "Failed to add book");
//     }
//   };
//
//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Add Book</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Book title"
//         value={title}
//         onChangeText={setTitle}
//       />
//       <Text style={styles.sectionSubtitle}>Select Author:</Text>
//       {authors.length === 0 ? (
//         <View style={styles.emptyAuthorsContainer}>
//           <Text style={styles.emptyAuthorsText}>No authors found.</Text>
//           <Button title="Create Author" onPress={() => navigation.navigate("Add Author")} />
//         </View>
//       ) : (
//         <FlatList
//           data={authors}
//           keyExtractor={(item) => item.id.toString()}
//           style={styles.authorsList}
//           renderItem={({ item }) => {
//             const isSelected = item.name === selectedAuthor;
//             return (
//               <TouchableOpacity
//                 style={[styles.authorOption, isSelected && styles.authorOptionSelected]}
//                 onPress={() => setSelectedAuthor(item.name)}
//               >
//                 <Text style={[styles.authorOptionText, isSelected && styles.authorOptionTextSelected]}>
//                   {item.name}
//                 </Text>
//               </TouchableOpacity>
//             );
//           }}
//         />
//       )}
//       <View style={styles.saveButtonContainer}>
//         <Button title="Save Book" onPress={saveBook} />
//       </View>
//     </View>
//   );
// };
//
// export default function App() {
//   useEffect(() => {
//     const initDatabase = async (): Promise<void> => {
//       try {
//         const db = await DatabaseService.getInstance();
//         await db.createTable("authors", "id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL UNIQUE");
//         await db.createTable("books", "id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL, author TEXT NOT NULL");
//       } catch (error) {
//         Alert.alert("Error", "Database initialization failed: " + error.message);
//       }
//     };
//     initDatabase();
//   }, []);
//
//   return (
//     <NavigationContainer>
//       <Drawer.Navigator initialRouteName="Book List">
//         <Drawer.Screen name="Book List" component={BookListScreen} />
//         <Drawer.Screen name="Add Book" component={AddBookScreen} />
//         <Drawer.Screen name="Add Author" component={AddAuthorScreen} />
//       </Drawer.Navigator>
//     </NavigationContainer>
//   );
// }
//
// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20 },
//   title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
//   sectionSubtitle: { fontSize: 16, fontWeight: "600", marginVertical: 10 },
//   input: { height: 44, borderColor: "#ccc", borderWidth: 1, borderRadius: 6, marginBottom: 12, paddingHorizontal: 10 },
//   bookItem: { padding: 12, borderBottomWidth: 1, borderBottomColor: "#ccc", gap: 4, marginBottom: 8 },
//   bookTitle: { fontSize: 18, fontWeight: "bold" },
//   bookAuthor: { fontSize: 16, color: "gray", marginBottom: 8 },
//   authorsList: { maxHeight: 180, marginBottom: 16 },
//   authorOption: { padding: 12, borderWidth: 1, borderColor: "#ddd", borderRadius: 6, marginBottom: 8, backgroundColor: "#fff" },
//   authorOptionSelected: { borderColor: "#007bff", backgroundColor: "#e7f1ff" },
//   authorOptionText: { fontSize: 15, color: "#333" },
//   authorOptionTextSelected: { color: "#007bff", fontWeight: "bold" },
//   emptyAuthorsContainer: { marginBottom: 16, gap: 8 },
//   emptyAuthorsText: { color: "gray", fontStyle: "italic" },
//   saveButtonContainer: { marginTop: 10 },
// });