import MigrationRepository from "./MigrationRepository";

export default class AddDescriptionColumnToTranslationKeys extends MigrationRepository {
  run() {
    this.db.exec(`
      ALTER TABLE translation_keys
      ADD COLUMN description TEXT;
    `);
  }
}
