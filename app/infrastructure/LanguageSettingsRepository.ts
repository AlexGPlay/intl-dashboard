import LanguageSetting from "../domain/LanguageSetting";
import SqliteRepository from "./SqliteRepository";

type LanguageSettingRow = {
  language: string;
  is_default: number;
};

class LanguageSettingsRepository extends SqliteRepository {
  getLanguages(): Promise<LanguageSetting[]> {
    return new Promise((resolve, reject) => {
      this.db.all<LanguageSettingRow>(
        "SELECT * FROM language_settings",
        (err, rows) => {
          if (err) {
            reject(err);
          } else {
            const languageSettings = rows.map((row) => this.toDomain(row));
            resolve(languageSettings);
          }
        }
      );
    });
  }

  createLanguage(languageSetting: LanguageSetting): Promise<LanguageSetting> {
    return new Promise((resolve, reject) => {
      this.db.run(
        "INSERT INTO language_settings (language, is_default) VALUES (?, ?)",
        [languageSetting.language, languageSetting.isDefault ? 1 : 0],
        (err) => {
          if (err) {
            reject(err);
          } else {
            resolve(languageSetting);
          }
        }
      );
    });
  }

  toDomain(row: LanguageSettingRow) {
    return new LanguageSetting(row.language, row.is_default === 1);
  }
}

export default LanguageSettingsRepository;
