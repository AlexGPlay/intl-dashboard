export type TranslationKey = {
  key: string;
  // In case of missing translations, the value will be null
  translations: Record<string, string | null>;
};
