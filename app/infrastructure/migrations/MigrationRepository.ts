import SqliteRepository from "../SqliteRepository";

class MigrationRepository extends SqliteRepository {
  filename: string;

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
}

export default MigrationRepository;