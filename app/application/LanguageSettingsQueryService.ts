import LanguageSettingsRepository from "../infrastructure/LanguageSettingsRepository";

class LanguageSettingsQueryService {
  static async getLanguageSettings() {
    const repository = new LanguageSettingsRepository();
    const languageSettings = await repository.getLanguages();
    return languageSettings;
  }
}

export default LanguageSettingsQueryService;
