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

  static createTranslationKeys({
    translationKeys,
    projectId,
  }: {
    translationKeys: { translationKey: string; description: string | null }[];
    projectId: string;
  }) {
    if (translationKeys.length === 0) {
      return [];
    }

    const repository = new TranslationKeysRepository();

    const items = translationKeys.map(({ translationKey, description }) => {
      return new TranslationKey(translationKey, projectId, description);
    });

    return repository.insertMany(items);
  }
}

export default TranslationKeysCommandService;
