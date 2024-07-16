import MigrationRepository from "./MigrationRepository";

export default class CreateProjectsTable extends MigrationRepository {
  run() {
    const tableName = "projects";
    const columns = {
      id: "TEXT PRIMARY KEY",
      name: "TEXT",
    };

    this.createTable(tableName, columns);
  }
}
