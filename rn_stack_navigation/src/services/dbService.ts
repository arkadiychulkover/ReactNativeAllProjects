import * as SQLite from "expo-sqlite";

export interface IBook {
  id: number;
  title: string;
  author: string;
}

export interface IAuthor {
  id: number;
  name: string;
}

export class DatabaseService {
  private static instance: DatabaseService | null = null;
  private static initPromise: Promise<DatabaseService> | null = null;
  private db!: SQLite.SQLiteDatabase;

  private constructor() {}

  public static async getInstance(): Promise<DatabaseService> {
    if (DatabaseService.instance) return DatabaseService.instance;
    if (!DatabaseService.initPromise) {
      DatabaseService.initPromise = (async () => {
        const service = new DatabaseService();
        service.db = await SQLite.openDatabaseAsync("books.db");
        DatabaseService.instance = service;
        return service;
      })();
    }
    return DatabaseService.initPromise;
  }

  public async createTable(tableName: string, columns: string): Promise<void> {
    await this.db.execAsync(`CREATE TABLE IF NOT EXISTS ${tableName} (${columns});`);
  }

  public async execute(query: string, params: SQLite.SQLiteBindParams = []): Promise<SQLite.SQLiteRunResult> {
    return await this.db.runAsync(query, params);
  }

  public async getOne<T>(query: string, params: SQLite.SQLiteBindParams = []): Promise<T | null> {
    return await this.db.getFirstAsync<T>(query, params);
  }

  public async getAll<T>(query: string, params: SQLite.SQLiteBindParams = []): Promise<T[]> {
    return await this.db.getAllAsync<T>(query, params);
  }

  public async deleteBook(id: number): Promise<SQLite.SQLiteRunResult> {
    return await this.execute("DELETE FROM books WHERE id = ?;", [id]);
  }

  public async deleteAllBooks(): Promise<void> {
    await this.execute("DELETE FROM books;");
    try {
      await this.execute("DELETE FROM sqlite_sequence WHERE name = 'books';");
    } catch {
    }
  }

  public async updateBook(id: number, title: string, author: string): Promise<SQLite.SQLiteRunResult> {
    return await this.execute(
      "UPDATE books SET title = ?, author = ? WHERE id = ?;",
      [title, author, id]
    );
  }

  public async searchBooks(searchQuery: string = ""): Promise<IBook[]> {
    const trimmed = searchQuery.trim();
    if (!trimmed) {
      return await this.getAll<IBook>("SELECT * FROM books ORDER BY id DESC;");
    }
    const pattern = `%${trimmed.toLowerCase()}%`;
    return await this.getAll<IBook>(
      "SELECT * FROM books WHERE LOWER(title) LIKE ? OR LOWER(author) LIKE ? ORDER BY id DESC;",
      [pattern, pattern]
    );
  }
}