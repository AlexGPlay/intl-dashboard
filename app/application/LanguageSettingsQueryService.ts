import LanguageSettingsRepository from "../infrastructure/LanguageSettingsRepository";

class LanguageSettingsQueryService {
  static async getLanguageSettings() {
    const repository = new LanguageSettingsRepository();
    const languageSettings = await repository.getLanguages();
    return languageSettings;
  }

  static async getDefaultLanguageSetting() {
    const repository = new LanguageSettingsRepository();
    return repository.getDefaultLanguageSetting();
  }
}

export default LanguageSettingsQueryService;
