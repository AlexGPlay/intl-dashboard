import { FastifyInstance } from "fastify";

export function fastifyHandler(server: FastifyInstance) {
  server.get("/", async (request, reply) => {
    reply.redirect("/projects");
  });
}
