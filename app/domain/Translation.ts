class Translation {
  translationKey: string;
  language: string;
  text: string;

  constructor(translationKey: string, language: string, text: string) {
    this.translationKey = translationKey;
    this.language = language;
    this.text = text;
  }
}

export default Translation;
