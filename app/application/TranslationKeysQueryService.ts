import TranslationKeysRepository from "../infrastructure/TranslationKeysRepository";

class TranslationKeyQueryService {
  static findTranslationKeysByProjectId(projectId: string) {
    const repository = new TranslationKeysRepository();
    const translationKeys = repository.findByProjectId(projectId);
    return translationKeys;
  }
}

export default TranslationKeyQueryService;
