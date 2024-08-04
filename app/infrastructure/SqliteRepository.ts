import sqlite3 from "sqlite3";
sqlite3.verbose();

type TableConstraints = {
  primaryKeys?: string[];
  foreignKeys?: {
    currentTableColumn: string;
    foreignTable: string;
    foreignTableColumn: string;
  }[];
};

abstract class SqliteRepository<
  DatabaseRowType extends Record<string, unknown>,
  DomainType
> {
  protected db: sqlite3.Database;

  constructor() {
    this.db = new sqlite3.Database("db.sqlite");
  }

  createTable(
    tablename: string,
    columns: Record<string, string>,
    { primaryKeys = [], foreignKeys = [] }: TableConstraints = {
      primaryKeys: [],
      foreignKeys: [],
    }
  ) {
    const parsedColumns = Object.entries(columns).map(
      ([name, type]) => `${name} ${type}`
    );

    const parsedForeignKeys = foreignKeys.map(
      ({ currentTableColumn, foreignTable, foreignTableColumn }) => {
        return `FOREIGN KEY(${currentTableColumn}) REFERENCES ${foreignTable}(${foreignTableColumn})`;
      }
    );

    const creationArray = [];

    creationArray.push(...parsedColumns);
    if (primaryKeys.length > 0) {
      const parsedPrimaryKeys = `PRIMARY KEY(${primaryKeys.join(", ")})`;
      creationArray.push(parsedPrimaryKeys);
    }
    creationArray.push(...parsedForeignKeys);

    const creationString = creationArray.join(", ");

    const sql = `CREATE TABLE IF NOT EXISTS ${tablename} (${creationString})`;
    this.db.run(sql);
  }

  findMany(sql: string, params?: unknown[]): Promise<DomainType[]> {
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

  findAll(order?: {
    orderBy: keyof DatabaseRowType;
    orderDirection: "asc" | "desc";
  }): Promise<DomainType[]> {
    const orderString = order
      ? `ORDER BY ${order.orderBy.toString()} ${order.orderDirection}`
      : "";
    return this.findMany(`SELECT * FROM ${this.tableName} ${orderString}`);
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

  updateByKeysAndValues(
    domainItem: DomainType,
    whereColumns: Array<keyof DatabaseRowType>
  ): Promise<DomainType> {
    return new Promise((resolve, reject) => {
      const item = this.toItem(domainItem);

      const updateColumns = Object.keys(item).map((key) => `${key} = ?`);

      const whereConditions = whereColumns.map(
        (key) => `${key.toString()} = ?`
      );

      const updateValues = Object.values(item);
      const whereValues = whereColumns.map((key) => item[key]);

      const sql = `
      UPDATE ${this.tableName}
      SET ${updateColumns.join(", ")}
      WHERE ${whereConditions.join(" AND ")}
      `;

      this.db.run(sql, [...updateValues, ...whereValues], (err) => {
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
