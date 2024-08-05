import Project from "../domain/Project";
import Translation from "../domain/Translation";
import { Translation as TranslationSchema } from "../schema";
import ProjectsRepository from "../infrastructure/ProjectsRepository";
import LanguageSettingsQueryService from "./LanguageSettingsQueryService";
import TranslationKeysCommandService from "./TranslationKeysCommandService";
import TranslationKeysQueryService from "./TranslationKeysQueryService";
import TranslationsQueryService from "./TranslationsQueryService";
import TranslationsCommandService from "./TranslationsCommandService";

type TranslationObject = Record<string, { defaultMessage: string }>;

export default class ProjectsCommandService {
  static async createProject(name: string) {
    const repository = new ProjectsRepository();
    const project = Project.create(name);
    await repository.createProject(project);

    return project;
  }

  static async createTranslationsFromObject(
    projectId: string,
    translations: TranslationObject,
    updateExisting = false
  ) {
    // First we create all the translation keys that don't exist
    const translationKeys = Object.keys(translations);

    const existingKeys =
      await TranslationKeysQueryService.findTranslationKeysByProjectIdAndKeys(
        projectId,
        translationKeys
      );

    const nonExistingKeys = translationKeys.filter(
      (key) => !existingKeys.find((existingKey) => existingKey.id === key)
    );

    await TranslationKeysCommandService.createTranslationKeys({
      translationKeys: nonExistingKeys.map((key) => ({
        translationKey: key,
        description: null,
      })),
      projectId,
    });

    // Second we create the translations for the default language
    const defaultLanguageSetting =
      await LanguageSettingsQueryService.getDefaultLanguageSetting();

    if (!defaultLanguageSetting) {
      return;
    }

    const existingTranslations =
      await TranslationsQueryService.getTranslationsByTranslationKeysAndLanguage(
        projectId,
        nonExistingKeys,
        defaultLanguageSetting.language
      );
    const existingTranslationsMap: Record<string, Translation> = {};
    for (const translation of existingTranslations) {
      existingTranslationsMap[translation.translationKey] = translation;
    }

    let translationsToInsert = [];
    for (let translationKey of Object.keys(translations)) {
      if (existingTranslationsMap[translationKey]) {
        continue;
      }
      translationsToInsert.push(
        new TranslationSchema(
          projectId,
          translationKey,
          defaultLanguageSetting.language,
          translations[translationKey].defaultMessage
        )
      );
    }

    await TranslationsCommandService.createTranslations(translationsToInsert);
  }
}
