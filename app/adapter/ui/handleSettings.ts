import { FastifyInstance } from "fastify";
import LanguageSettingsQueryService from "../../application/LanguageSettingsQueryService";

export function fastifyHandler(server: FastifyInstance) {
  server.get("/settings", async (request, reply) => {
    const languageSettings =
      await LanguageSettingsQueryService.getLanguageSettings();

    const languageNameFormatter = new Intl.DisplayNames(["en"], {
      type: "language",
    });

    reply.type("text/html").send(`
      <div>
        Enabled languages:
        <ul>
          ${languageSettings
            .map(
              (language) =>
                `<li>${languageNameFormatter.of(language.language)} ${
                  language.isDefault ? "<span>(Default)</span>" : ""
                }</li>`
            )
            .join("")}
        </ul>
      </div>
    `);
  });
}
