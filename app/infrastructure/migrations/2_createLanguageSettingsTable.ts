import MigrationRepository from "./MigrationRepository";

export default class LanguageSettingsTable extends MigrationRepository {
  run() {
    const tableName = "language_settings";
    const columns = {
      language: "TEXT PRIMARY KEY",
      is_default: "INTEGER",
    };

    this.createTable(tableName, columns);
  }
}
