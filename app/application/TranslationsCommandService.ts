import Translation from "../domain/Translation";
import { Translation as TranslationSchema } from "../schema";
import TranslationsRepository from "../infrastructure/TranslationsRepository";

class TranslationsCommandService {
  static createTranslation({
    translationKey,
    language,
    text,
  }: TranslationSchema) {
    const repository = new TranslationsRepository();
    const item = new Translation(translationKey, language, text);
    return repository.insert(item);
  }

  static async upsertTranslation({
    translationKey,
    language,
    text,
  }: TranslationSchema) {
    const repository = new TranslationsRepository();
    const item = new Translation(translationKey, language, text);
    return repository.save(item);
  }
}

export default TranslationsCommandService;
