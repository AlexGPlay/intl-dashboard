import MigrationRepository from "./MigrationRepository";

export default class CreateTranslationKeysTable extends MigrationRepository {
  run() {
    const tableName = "translation_keys";
    const columns = {
      id: "TEXT PRIMARY KEY",
      project_id: "TEXT",
    };

    const foreignKeys = [
      {
        currentTableColumn: "project_id",
        foreignTable: "projects",
        foreignTableColumn: "id",
      },
    ];

    this.createTable(tableName, columns, { foreignKeys });
  }
}
