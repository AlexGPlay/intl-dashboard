import { FastifyInstance } from "fastify";

export function fastifyHandler(server: FastifyInstance) {
  server.get("/ping", async (request, reply) => {
    return { ping: "pong" };
  });
}
