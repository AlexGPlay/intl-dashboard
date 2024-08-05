import { FastifyReply } from "fastify";
import fs from "fs";
import ejs from "ejs";
import path from "path";

export function replyWithHtml(
  reply: FastifyReply,
  templatePath: string,
  templateData: Record<string, unknown> = {}
) {
  const filePath = path.join(__dirname, "templates", templatePath);
  const htmlData = fs.readFileSync(filePath, "utf8");
  return reply.type("text/html").send(ejs.render(htmlData, templateData));
}

export function formatLanguage(language: undefined | null | string) {
  if (!language) {
    return "-";
  }

  try {
    const languageNameFormatter = new Intl.DisplayNames(["en"], {
      type: "language",
    });
    return languageNameFormatter.of(language);
  } catch (e) {
    return language;
  }
}
