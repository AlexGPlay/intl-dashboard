import { FastifyInstance } from "fastify";
import ProjectsQueryService from "../../application/ProjectsQueryService";
import { formatLanguage, replyWithHtml } from "./utils";
import LanguageSettingsQueryService from "../../application/LanguageSettingsQueryService";
import TranslationKeysQueryService from "../../application/TranslationKeysQueryService";
import TranslationsQueryService from "../../application/TranslationsQueryService";
import TranslationKeysSerializer from "../serializers/TranslationKeysSerializer";

export function fastifyHandler(server: FastifyInstance) {
  server.get("/projects/:projectId", async (request, reply) => {
    const { projectId } = request.params as { projectId: string };
    const project = await ProjectsQueryService.getProjectById(projectId);

    if (!project) {
      return reply.type("text/html").send(`<div>404 - Not found</div>`);
    }

    const defaultLanguageSetting =
      await LanguageSettingsQueryService.getDefaultLanguageSetting();
    const allLanguageSettings =
      await LanguageSettingsQueryService.getLanguageSettings();

    const translationKeys =
      await TranslationKeysQueryService.findTranslationKeysByProjectId(
        projectId
      );

    const translations =
      await TranslationsQueryService.getTranslationsByTranslationKeys(
        projectId,
        translationKeys.map((key) => key.id)
      );

    replyWithHtml(reply, "project.html.ejs", {
      project,
      defaultLanguageSetting,
      translationKeys: new TranslationKeysSerializer(
        translationKeys,
        translations,
        allLanguageSettings
      ).serialize(),
      formatLanguage,
    });
  });
}
