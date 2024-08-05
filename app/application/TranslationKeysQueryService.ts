import TranslationKeysRepository from "../infrastructure/TranslationKeysRepository";

class TranslationKeyQueryService {
  static findTranslationKeysByProjectId(projectId: string) {
    const repository = new TranslationKeysRepository();
    const translationKeys = repository.findByProjectId(projectId);
    return translationKeys;
  }

  static findTranslationKeysByProjectIdAndKeys(
    projectId: string,
    keys: string[]
  ) {
    const repository = new TranslationKeysRepository();
    const translationKeys = repository.findByProjectIdAndKeys(projectId, keys);
    return translationKeys;
  }
}

export default TranslationKeyQueryService;
