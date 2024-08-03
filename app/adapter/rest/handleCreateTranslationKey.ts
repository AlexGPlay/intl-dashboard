import { FastifyInstance } from "fastify";
import TranslationKeysCommandService from "../../application/TranslationKeysCommandService";
import LanguageSettingsQueryService from "../../application/LanguageSettingsQueryService";
import TranslationsCommandService from "../../application/TranslationsCommandService";
import { Translation } from "../../schema";

export function fastifyHandler(server: FastifyInstance) {
  server.post("/translation_key/create", async (request, reply) => {
    const { projectId, translationKey, defaultTranslation } = request.body as {
      projectId: string;
      translationKey: string;
      defaultTranslation?: string;
    };
    if (!projectId || !translationKey) {
      return reply
        .code(400)
        .send({ error: "projectId and translationKey are required" });
    }

    const translationKeyModel =
      await TranslationKeysCommandService.createTranslationKey(
        translationKey,
        projectId
      );

    if (defaultTranslation) {
      const defaultLanguageSetting =
        await LanguageSettingsQueryService.getDefaultLanguageSetting();

      if (defaultLanguageSetting) {
        const schema = Translation.fromObject({
          translationKey: translationKeyModel.id,
          language: defaultLanguageSetting.language,
          text: defaultTranslation,
        });

        TranslationsCommandService.createTranslation(schema);
      }
    }

    return reply.redirect(`/projects/${projectId}`);
  });
}
