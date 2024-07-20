import { FastifyInstance } from "fastify";
import LanguageSettingCommandService from "../../application/LanguageSettingsCommandService";

export function fastifyHandler(server: FastifyInstance) {
  server.delete("/language_settings/:language", async (request, reply) => {
    const { language } = request.params as { language: string };
    await LanguageSettingCommandService.delete(language);
    return reply.code(204).send();
  });
}
