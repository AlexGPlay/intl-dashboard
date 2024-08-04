class TranslationKey {
  id: string;
  description: string | null;
  projectId: string;

  constructor(id: string, projectId: string, description: string | null) {
    this.id = id;
    this.projectId = projectId;
    this.description = description;
  }
}

export default TranslationKey;
