import sqlite3 from "sqlite3";

abstract class SqliteRepository {
  protected db: sqlite3.Database;

  constructor() {
    this.db = new sqlite3.Database("db.sqlite");
  }

  createTable(tablename: string, columns: Record<string, string>) {
    const columnsString = Object.entries(columns)
      .map(([name, type]) => `${name} ${type}`)
      .join(", ");
    this.db.run(`CREATE TABLE IF NOT EXISTS ${tablename} (${columnsString})`);
  }
}

export default SqliteRepository;
