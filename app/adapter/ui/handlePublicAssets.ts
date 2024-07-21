import { FastifyInstance } from "fastify";
import fs from "fs";
import path from "path";

export function fastifyHandler(server: FastifyInstance) {
  server.get("/public/:asset(.*).css", async (request, reply) => {
    const { asset } = request.params as { asset: string };

    const filePath = path.join(__dirname, "stylesheets", asset + ".css");
    const css = fs.readFileSync(filePath, "utf8");
    return reply.type("text/css").send(css);
  });
}
