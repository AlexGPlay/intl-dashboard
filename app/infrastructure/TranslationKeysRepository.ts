import SqliteRepository from "./SqliteRepository";
import TranslationKey from "../domain/TranslationKey";

type TranslationKeyRow = {
  id: string;
  project_id: string;
};

class TranslationKeysRepository extends SqliteRepository<
  TranslationKeyRow,
  TranslationKey
> {
  tableName = "translation_keys";

  findByProjectId(projectId: string): Promise<TranslationKey[]> {
    return this.findMany(
      `SELECT * FROM ${this.tableName} WHERE project_id = ?`,
      [projectId]
    );
  }

  toDomain(row: TranslationKeyRow): TranslationKey {
    return new TranslationKey(row.id, row.project_id);
  }

  toItem(domain: TranslationKey): TranslationKeyRow {
    return {
      id: domain.id,
      project_id: domain.projectId,
    };
  }
}

export default TranslationKeysRepository;
