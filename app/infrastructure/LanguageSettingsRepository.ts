import LanguageSetting from "../domain/LanguageSetting";
import SqliteRepository from "./SqliteRepository";

type LanguageSettingRow = {
  language: string;
  is_default: number;
};

class LanguageSettingsRepository extends SqliteRepository<
  LanguageSettingRow,
  LanguageSetting
> {
  tableName = "language_settings";

  getLanguages(): Promise<LanguageSetting[]> {
    return this.getAll();
  }

  getLanguageSettingByLanguage(
    language: string
  ): Promise<LanguageSetting | null> {
    return this.getOneByKeyAndValue("language", language);
  }

  getDefaultLanguageSetting(): Promise<LanguageSetting | null> {
    return this.getOneByKeyAndValue("is_default", 1);
  }

  createLanguage(languageSetting: LanguageSetting): Promise<LanguageSetting> {
    return this.insert(languageSetting);
  }

  deleteLanguage(language: LanguageSetting): Promise<void> {
    return this.deleteByKeyAndValue("language", language.language);
  }

  updateLanguages(languages: LanguageSetting[]): Promise<LanguageSetting[]> {
    return new Promise((resolve, reject) => {
      this.db.serialize(() => {
        this.db.run(
          `
          UPDATE
            language_settings
          SET
            is_default = CASE language
              ${languages
                .map(
                  (language) =>
                    `WHEN '${language.language}' THEN ${
                      language.isDefault ? 1 : 0
                    }`
                )
                .join(" ")}
            END
        `,
          (err) => {
            if (err) {
              reject(err);
            } else {
              resolve(languages);
            }
          }
        );
      });
    });
  }

  toDomain(row: LanguageSettingRow) {
    return new LanguageSetting(row.language, row.is_default === 1);
  }

  toItem(domain: LanguageSetting): LanguageSettingRow {
    return {
      language: domain.language,
      is_default: domain.isDefault ? 1 : 0,
    };
  }
}

export default LanguageSettingsRepository;
