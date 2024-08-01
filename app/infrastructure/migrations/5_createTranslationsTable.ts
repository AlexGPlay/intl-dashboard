import MigrationRepository from "./MigrationRepository";

export default class CreateTranslationsTable extends MigrationRepository {
  run() {
    const tableName = "translations";
    const columns = {
      translation_key: "TEXT NOT NULL",
      language: "TEXT NOT NULL",
      text: "TEXT",
    };

    const primaryKeys = ["translation_key", "language"];

    const foreignKeys = [
      {
        currentTableColumn: "translation_key",
        foreignTable: "translation_keys",
        foreignTableColumn: "id",
      },
      {
        currentTableColumn: "language",
        foreignTable: "language_settings",
        foreignTableColumn: "language",
      },
    ];

    this.createTable(tableName, columns, { foreignKeys, primaryKeys });
  }
}
