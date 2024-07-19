import MigrationRepository from "./MigrationRepository";

export default class LanguageSettingsTable extends MigrationRepository {
  run() {
    const languages = [
      ["en", true],
      ["es", false],
      ["fr", false],
      ["de", false],
      ["it", false],
    ];

    this.db.exec(`
      INSERT INTO 
        language_settings(language, is_default) 
      VALUES
        ${languages
          .map(
            ([language, isDefault]) => `("${language}", ${isDefault ? 1 : 0})`
          )
          .join(", ")} 
    `);
  }
}
