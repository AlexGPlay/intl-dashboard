import TranslationsRepository from "../infrastructure/TranslationsRepository";

class TranslationsQueryService {
  static getTranslationsByTranslationKeys(
    projectId: string,
    translationKeys: string[]
  ) {
    const repository = new TranslationsRepository();
    return repository.findByProjectIdAndTranslationKeys(
      projectId,
      translationKeys
    );
  }

  static getTranslationsByTranslationKeysAndLanguage(
    projectId: string,
    translationKeys: string[],
    language: string
  ) {
    const repository = new TranslationsRepository();
    return repository.findByProjectIdAndTranslationKeysAndLanguage(
      projectId,
      translationKeys,
      language
    );
  }
}

export default TranslationsQueryService;
