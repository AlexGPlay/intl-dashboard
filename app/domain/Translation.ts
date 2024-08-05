class Translation {
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
}

export default Translation;
