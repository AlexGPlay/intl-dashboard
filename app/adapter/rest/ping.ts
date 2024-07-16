import { FastifyInstance } from "fastify";

export default function (server: FastifyInstance) {
  server.get("/ping", async (request, reply) => {
    return { ping: "pong" };
  });
}
