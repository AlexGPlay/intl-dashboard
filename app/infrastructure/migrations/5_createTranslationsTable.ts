import MigrationRepository from "./MigrationRepository";

export default class CreateTranslationsTable extends MigrationRepository {
  run() {
    const tableName = "translations";
    const columns = {
      project_id: "TEXT NOT NULL",
      translation_key: "TEXT NOT NULL",
      language: "TEXT NOT NULL",
      text: "TEXT",
    };

    const primaryKeys = ["project_id", "translation_key", "language"];

    const foreignKeys = [
      {
        currentTableColumn: "project_id",
        foreignTable: "projects",
        foreignTableColumn: "id",
      },
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
