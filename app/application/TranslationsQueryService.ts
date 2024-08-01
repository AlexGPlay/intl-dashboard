import TranslationsRepository from "../infrastructure/TranslationsRepository";

class TranslationsQueryService {
  static getTranslationsByTranslationKeys(translationKeys: string[]) {
    const repository = new TranslationsRepository();
    return repository.findByTranslatiosnKey(translationKeys);
  }
}

export default TranslationsQueryService;
