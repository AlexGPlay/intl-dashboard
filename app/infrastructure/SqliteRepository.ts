import sqlite3 from "sqlite3";

abstract class SqliteRepository<
  DatabaseRowType extends Record<string, unknown>,
  DomainType
> {
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

  selectMany(sql: string, params?: unknown[]): Promise<DomainType[]> {
    return new Promise((resolve, reject) => {
      this.db.all<DatabaseRowType>(sql, params, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows.map((row) => this.toDomain(row)));
        }
      });
    });
  }

  getAll(): Promise<DomainType[]> {
    return this.selectMany(`SELECT * FROM ${this.tableName}`);
  }

  getOne(sql: string, params?: unknown[]): Promise<DomainType | null> {
    return new Promise((resolve, reject) => {
      this.db.get<DatabaseRowType>(sql, params, (err, row) => {
        if (err) {
          reject(err);
        } else if (row) {
          resolve(this.toDomain(row));
        } else {
          resolve(null);
        }
      });
    });
  }

  getOneByKeyAndValue(key: string, value: unknown): Promise<DomainType | null> {
    return this.getOne(`SELECT * FROM ${this.tableName} WHERE ${key} = ?`, [
      value,
    ]);
  }

  insert(domainItem: DomainType): Promise<DomainType> {
    return new Promise((resolve, reject) => {
      const item = this.toItem(domainItem);
      const entries = Object.entries(item);

      const columns = entries.map(([key]) => key).join(", ");
      const values = entries.map(([_, value]) => value);

      const sql = `
        INSERT INTO ${this.tableName} (${columns})
        VALUES (${entries.map(() => "?").join(", ")})
      `;

      this.db.run(sql, values, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve(domainItem);
        }
      });
    });
  }

  deleteByKeyAndValue(key: string, value: unknown): Promise<void> {
    return new Promise((resolve, reject) => {
      this.db.run(
        `DELETE FROM ${this.tableName} WHERE ${key} = ?`,
        [value],
        (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        }
      );
    });
  }

  abstract toDomain(row: DatabaseRowType): DomainType;
  abstract toItem(domain: DomainType): DatabaseRowType;

  abstract tableName: string;
}

export default SqliteRepository;
