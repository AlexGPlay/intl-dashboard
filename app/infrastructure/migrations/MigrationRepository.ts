import SqliteRepository from "../SqliteRepository";

class MigrationRepository extends SqliteRepository<
  Record<string, unknown>,
  unknown
> {
  filename: string;
  tableName = "THERE IS NO TABLE";

  constructor(filename: string) {
    super();
    this.filename = filename;
  }

  prepareMigrationsTable() {
    this.createTable("migrations", {
      name: "TEXT",
      executed_at: "TEXT",
    });
  }

  isMigrated(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.db.get<{ name: string }>(
        "SELECT name FROM migrations WHERE name = ?",
        [this.filename],
        (err, row) => {
          if (err) {
            reject(err);
          } else {
            resolve(!!row);
          }
        }
      );
    });
  }

  markAsMigrated() {
    this.db.run("INSERT INTO migrations (name, executed_at) VALUES (?, ?)", [
      this.filename,
      new Date().toISOString(),
    ]);
  }

  async migrate() {
    await this.prepareMigrationsTable();
    const migrated = await this.isMigrated();
    if (!migrated) {
      this.run();
      this.markAsMigrated();
    }
  }

  run() {
    throw new Error("Implement your migration here");
  }

  toDomain(row: unknown): unknown {
    // We don't need this here
    throw new Error("Method not implemented.");
  }

  toItem(domain: unknown): Record<string, unknown> {
    // We don't need this here
    throw new Error("Method not implemented.");
  }
}

export default MigrationRepository;
