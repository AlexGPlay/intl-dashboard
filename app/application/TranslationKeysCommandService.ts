import TranslationKey from "../domain/TranslationKey";
import TranslationKeysRepository from "../infrastructure/TranslationKeysRepository";

class TranslationKeysCommandService {
  static createTranslationKey(translationKey: string, projectId: string) {
    const repository = new TranslationKeysRepository();

    const item = new TranslationKey(translationKey, projectId);
    return repository.insert(item);
  }
}

export default TranslationKeysCommandService;
