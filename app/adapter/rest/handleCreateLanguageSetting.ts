import { FastifyInstance } from "fastify";
import LanguageSettingCommandService from "../../application/LanguageSettingsCommandService";

export function fastifyHandler(server: FastifyInstance) {
  server.post("/language_settings/create", async (request, reply) => {
    const { language } = request.body as { language: string };
    const languageSetting = await LanguageSettingCommandService.create(
      language
    );
    return { language: languageSetting.language };
  });
}
