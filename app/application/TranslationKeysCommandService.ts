import TranslationKey from "../domain/TranslationKey";
import TranslationKeysRepository from "../infrastructure/TranslationKeysRepository";

class TranslationKeysCommandService {
  static createTranslationKey({
    translationKey,
    projectId,
    description,
  }: {
    translationKey: string;
    projectId: string;
    description: string | null;
  }) {
    const repository = new TranslationKeysRepository();

    const item = new TranslationKey(translationKey, projectId, description);

    return repository.insert(item);
  }
}

export default TranslationKeysCommandService;
