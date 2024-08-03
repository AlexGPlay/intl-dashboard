import { FastifyInstance } from "fastify";
import LanguageSettingsQueryService from "../../application/LanguageSettingsQueryService";
import { formatLanguage, replyWithHtml } from "./utils";

export function fastifyHandler(server: FastifyInstance) {
  server.get("/settings", async (request, reply) => {
    const languageSettings =
      await LanguageSettingsQueryService.getLanguageSettings();

    replyWithHtml(reply, "settings.html.ejs", {
      languageSettings,
      formatLanguage,
    });
  });
}
