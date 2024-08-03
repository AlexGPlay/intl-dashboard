import Translation from "../domain/Translation";
import SqliteRepository from "./SqliteRepository";

type TranslationRow = {
  translation_key: string;
  language: string;
  text: string;
};

class TranslationsRepository extends SqliteRepository<
  TranslationRow,
  Translation
> {
  tableName = "translations";

  async save(item: Translation) {
    // First we check if the translation already exists
    const existingTranslation = await this.getByTranslationKeyAndLanguage(
      item.translationKey,
      item.language
    );
    if (existingTranslation) {
      // If it exists, we update it
      return this.update(item);
    } else {
      // If it doesn't exist, we insert it
      return this.insert(item);
    }
  }

  update(item: Translation) {
    return this.updateByKeysAndValues(item, ["translation_key", "language"]);
  }

  findByTranslatiosnKey(translationKey: string[]): Promise<Translation[]> {
    const placeholders = translationKey.map(() => "?").join(", ");

    return this.findMany(
      `SELECT * FROM ${this.tableName} WHERE translation_key IN (${placeholders})`,
      translationKey
    );
  }

  getByTranslationKeyAndLanguage(translationKey: string, language: string) {
    return this.getOne(
      `SELECT * FROM ${this.tableName} WHERE translation_key = ? AND language = ?`,
      [translationKey, language]
    );
  }

  toDomain(row: TranslationRow): Translation {
    return new Translation(row.translation_key, row.language, row.text);
  }

  toItem(domain: Translation): TranslationRow {
    return {
      translation_key: domain.translationKey,
      language: domain.language,
      text: domain.text,
    };
  }
}

export default TranslationsRepository;
