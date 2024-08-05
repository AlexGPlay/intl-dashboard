import Translation from "../domain/Translation";
import SqliteRepository from "./SqliteRepository";

type TranslationRow = {
  project_id: string;
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
    const existingTranslation =
      await this.getByProjectIdAndTranslationKeyAndLanguage(
        item.projectId,
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

  findByProjectIdAndTranslationKeys(
    projectId: string,
    translationKey: string[]
  ): Promise<Translation[]> {
    const placeholders = translationKey.map(() => "?").join(", ");

    return this.findMany(
      `SELECT * FROM ${this.tableName} WHERE project_id = ? AND translation_key IN (${placeholders})`,
      [projectId, ...translationKey]
    );
  }

  findByProjectIdAndTranslationKeysAndLanguage(
    projectId: string,
    translationKeys: string[],
    language: string
  ): Promise<Translation[]> {
    const placeholders = translationKeys.map(() => "?").join(", ");

    return this.findMany(
      `SELECT * FROM ${this.tableName} WHERE translation_key IN (${placeholders}) AND language = ? AND project_id = ?`,
      [...translationKeys, language, projectId]
    );
  }

  getByProjectIdAndTranslationKeyAndLanguage(
    projectId: string,
    translationKey: string,
    language: string
  ) {
    return this.getOne(
      `SELECT * FROM ${this.tableName} WHERE translation_key = ? AND language = ? AND project_id = ?`,
      [translationKey, language, projectId]
    );
  }

  toDomain(row: TranslationRow): Translation {
    return new Translation(
      row.project_id,
      row.translation_key,
      row.language,
      row.text
    );
  }

  toItem(domain: Translation): TranslationRow {
    return {
      project_id: domain.projectId,
      translation_key: domain.translationKey,
      language: domain.language,
      text: domain.text,
    };
  }
}

export default TranslationsRepository;
