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

  findByTranslatiosnKey(translationKey: string[]): Promise<Translation[]> {
    const placeholders = translationKey.map(() => "?").join(", ");

    return this.findMany(
      `SELECT * FROM ${this.tableName} WHERE translation_key IN (${placeholders})`,
      translationKey
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
