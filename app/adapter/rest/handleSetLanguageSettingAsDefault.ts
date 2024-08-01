import { FastifyInstance } from "fastify";
import LanguageSettingCommandService from "../../application/LanguageSettingsCommandService";

export function fastifyHandler(server: FastifyInstance) {
  server.post(
    "/language_settings/:language/set_default",
    async (request, reply) => {
      const { language } = request.params as { language: string };
      await LanguageSettingCommandService.setLanguageSettingAsDefault(language);
      return reply.redirect("/settings");
    }
  );
}
