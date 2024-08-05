class InvalidSchemaError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "InvalidSchemaError";
  }
}

export type TranslationKey = {
  key: string;
  description: string | null;
  // In case of missing translations, the value will be null
  translations: Record<string, string | null>;
};

export class Translation {
  projectId: string;
  translationKey: string;
  language: string;
  text: string;

  constructor(
    projectId: string,
    translationKey: string,
    language: string,
    text: string
  ) {
    this.projectId = projectId;
    this.translationKey = translationKey;
    this.language = language;
    this.text = text;
  }

  static fromObject(obj: any) {
    const translation = new Translation(
      obj.projectId,
      obj.translationKey || obj.translation_key,
      obj.language,
      obj.text
    );

    if (
      translation.projectId === undefined ||
      translation.translationKey === undefined ||
      translation.language === undefined ||
      translation.text === undefined
    ) {
      throw new InvalidSchemaError("Invalid translation schema");
    }

    return translation;
  }
}
