class LanguageSetting {
  language: string;
  isDefault: boolean;

  constructor(language: string, isDefault = false) {
    this.language = language;
    this.isDefault = isDefault;
  }

  setDefault(isDefault: boolean) {
    this.isDefault = isDefault;
  }
}

export default LanguageSetting;
