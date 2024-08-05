import { FastifyInstance } from "fastify";
import TranslationsCommandService from "../../application/TranslationsCommandService";
import { Translation } from "../../schema";

export function fastifyHandler(server: FastifyInstance) {
  server.post(
    "/translation_key/:translation_key/language/:language",
    async (request, reply) => {
      const { text, projectId } = request.body as {
        text: string;
        projectId: string;
      };
      const { translation_key, language } = request.params as {
        translation_key: string;
        language: string;
      };

      const translationSchema = Translation.fromObject({
        projectId,
        translation_key,
        language,
        text,
      });

      await TranslationsCommandService.upsertTranslation(translationSchema);
      return reply.redirect(`/projects/${projectId}`);
    }
  );
}
