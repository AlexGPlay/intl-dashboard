import { FastifyInstance } from "fastify";
import LanguageSettingCommandService from "../../application/LanguageSettingsCommandService";

export function fastifyHandler(server: FastifyInstance) {
  server.post("/language_settings/create", async (request, reply) => {
    const { language } = request.body as { language: string };
    if (!language) {
      return reply.code(400).send({ error: "Language is required" });
    }

    await LanguageSettingCommandService.create(language);
    return reply.redirect("/settings");
  });
}
