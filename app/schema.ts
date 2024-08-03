class InvalidSchemaError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "InvalidSchemaError";
  }
}

export type TranslationKey = {
  key: string;
  // In case of missing translations, the value will be null
  translations: Record<string, string | null>;
};

export class Translation {
  translationKey: string;
  language: string;
  text: string;

  constructor(translationKey: string, language: string, text: string) {
    this.translationKey = translationKey;
    this.language = language;
    this.text = text;
  }

  static fromObject(obj: any) {
    const translation = new Translation(
      obj.translationKey || obj.translation_key,
      obj.language,
      obj.text
    );

    if (
      translation.translationKey === undefined ||
      translation.language === undefined ||
      translation.text === undefined
    ) {
      throw new InvalidSchemaError("Invalid translation schema");
    }

    return translation;
  }
}
