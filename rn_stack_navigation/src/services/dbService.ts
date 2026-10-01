import * as SQLite from "expo-sqlite";

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
}