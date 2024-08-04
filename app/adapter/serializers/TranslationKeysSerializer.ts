import LanguageSetting from "../../domain/LanguageSetting";
import Translation from "../../domain/Translation";
import TranslationKey from "../../domain/TranslationKey";
import { TranslationKey as TranslationKeySchema } from "../../schema";

class TranslationKeysSerializer {
  translationKeys: TranslationKey[];
  translations: Translation[];
  languageSettings?: LanguageSetting[];

  constructor(
    translationKeys: TranslationKey[],
    translations: Translation[],
    languageSettings?: LanguageSetting[]
  ) {
    this.translationKeys = translationKeys;
    this.translations = translations;
    this.languageSettings = languageSettings;
  }

  serialize() {
    const translationsMap = this.convertTranslationKeysToMap();

    return this.translationKeys.map((translationKey) => {
      const translations = translationsMap.get(translationKey.id);
      return this.formatWithLanguageSettings(
        this.serializeOne(translationKey, translations)
      );
    });
  }

  private serializeOne(
    translationKey: TranslationKey,
    translations: Map<string, string> | undefined
  ): TranslationKeySchema {
    if (!translations) {
      return {
        key: translationKey.id,
        description: translationKey.description,
        translations: {},
      };
    }

    return {
      key: translationKey.id,
      description: translationKey.description,
      translations: Object.fromEntries(translations),
    };
  }

  private formatWithLanguageSettings(translationKey: TranslationKeySchema) {
    if (!this.languageSettings) {
      return translationKey;
    }

    const formattedTranslations: Record<string, string | null> = {};
    for (let languageSetting of this.languageSettings) {
      const language = languageSetting.language;
      const text = translationKey.translations[language] || null;
      formattedTranslations[language] = text;
    }

    return {
      key: translationKey.key,
      description: translationKey.description,
      translations: formattedTranslations,
    };
  }

  private convertTranslationKeysToMap() {
    // This map holds a structure that looks like this:
    // translation_key => language => text
    const translationsMap = new Map<string, Map<string, string>>();

    for (let translation of this.translations) {
      if (!translationsMap.has(translation.translationKey)) {
        translationsMap.set(translation.translationKey, new Map());
      }
      translationsMap
        .get(translation.translationKey)!
        .set(translation.language, translation.text);
    }

    return translationsMap;
  }
}

export default TranslationKeysSerializer;
