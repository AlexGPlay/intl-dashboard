import { FastifyInstance } from "fastify";
import TranslationKeysCommandService from "../../application/TranslationKeysCommandService";
import LanguageSettingsQueryService from "../../application/LanguageSettingsQueryService";
import TranslationsCommandService from "../../application/TranslationsCommandService";
import { Translation } from "../../schema";

export function fastifyHandler(server: FastifyInstance) {
  server.post("/translation_key/create", async (request, reply) => {
    const {
      projectId,
      translationKey,
      defaultTranslation,
      description = null,
    } = request.body as {
      projectId: string;
      translationKey: string;
      description?: string;
      defaultTranslation?: string;
    };
    if (!projectId || !translationKey) {
      return reply
        .code(400)
        .send({ error: "projectId and translationKey are required" });
    }

    const translationKeyModel =
      await TranslationKeysCommandService.createTranslationKey({
        translationKey,
        projectId,
        description,
      });

    if (defaultTranslation) {
      const defaultLanguageSetting =
        await LanguageSettingsQueryService.getDefaultLanguageSetting();

      if (defaultLanguageSetting) {
        const schema = Translation.fromObject({
          projectId,
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
