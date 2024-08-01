import Translation from "../domain/Translation";
import TranslationsRepository from "../infrastructure/TranslationsRepository";

class TranslationsCommandService {
  static createTranslation(
    translationKey: string,
    language: string,
    text: string
  ) {
    const repository = new TranslationsRepository();
    const item = new Translation(translationKey, language, text);
    return repository.insert(item);
  }
}

export default TranslationsCommandService;
