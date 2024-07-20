import LanguageSetting from "../domain/LanguageSetting";
import LanguageSettingsRepository from "../infrastructure/LanguageSettingsRepository";

class LanguageSettingCommandService {
  static create(language: string) {
    const repository = new LanguageSettingsRepository();
    const languageSetting = new LanguageSetting(language);
    repository.insert(languageSetting);
    return languageSetting;
  }

  static async delete(language: string) {
    const repository = new LanguageSettingsRepository();

    const languageToDelete = await repository.getLanguageSettingByLanguage(
      language
    );
    if (!languageToDelete) {
      return;
    }

    return repository.deleteLanguage(languageToDelete);
  }

  static async setLanguageSettingAsDefault(language: string) {
    const repository = new LanguageSettingsRepository();

    // First we set the default language setting to true for the language passed in
    const languageSetting = await repository.getLanguageSettingByLanguage(
      language
    );
    if (!languageSetting) {
      return;
    }

    languageSetting.setDefault(true);

    // Second we set the current default language setting to false
    const currentDefaultLanguageSetting =
      await repository.getDefaultLanguageSetting();

    const areTheSameLanguage =
      currentDefaultLanguageSetting?.language === languageSetting.language;
    if (currentDefaultLanguageSetting && !areTheSameLanguage) {
      currentDefaultLanguageSetting.setDefault(false);
    }

    const languageSettingsToUpdate = [
      languageSetting,
      currentDefaultLanguageSetting,
    ].filter(Boolean) as LanguageSetting[];
    await repository.updateLanguages(languageSettingsToUpdate);
  }
}

export default LanguageSettingCommandService;
