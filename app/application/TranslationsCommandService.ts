import Translation from "../domain/Translation";
import { Translation as TranslationSchema } from "../schema";
import TranslationsRepository from "../infrastructure/TranslationsRepository";

class TranslationsCommandService {
  static createTranslation({
    projectId,
    translationKey,
    language,
    text,
  }: TranslationSchema) {
    const repository = new TranslationsRepository();
    const item = new Translation(projectId, translationKey, language, text);
    return repository.insert(item);
  }

  static async createTranslations(translations: TranslationSchema[]) {
    const repository = new TranslationsRepository();
    const items = translations.map(
      (translation) =>
        new Translation(
          translation.projectId,
          translation.translationKey,
          translation.language,
          translation.text
        )
    );
    return repository.insertMany(items);
  }

  static async upsertTranslation({
    projectId,
    translationKey,
    language,
    text,
  }: TranslationSchema) {
    const repository = new TranslationsRepository();
    const item = new Translation(projectId, translationKey, language, text);
    return repository.save(item);
  }
}

export default TranslationsCommandService;
