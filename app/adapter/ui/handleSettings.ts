import { FastifyInstance } from "fastify";
import LanguageSettingsQueryService from "../../application/LanguageSettingsQueryService";
import { replyWithHtml } from "./utils";

export function fastifyHandler(server: FastifyInstance) {
  server.get("/settings", async (request, reply) => {
    const languageSettings =
      await LanguageSettingsQueryService.getLanguageSettings();

    const languageNameFormatter = new Intl.DisplayNames(["en"], {
      type: "language",
    });
    const formatLanguage = (language: undefined | null | string) => {
      if (!language) {
        return "-";
      }
      try {
        return languageNameFormatter.of(language);
      } catch (e) {
        return language;
      }
    };

    replyWithHtml(reply, "settings.html", {
      languageSettings,
      formatLanguage,
    });
  });
}
