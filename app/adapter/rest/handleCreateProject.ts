import { FastifyInstance } from "fastify";
import ProjectsCommandService from "../../application/ProjectsCommandService";

export function fastifyHandler(server: FastifyInstance) {
  server.post("/projects/create", async (request, reply) => {
    const { name } = request.body as { name: string };
    if (!name) {
      return reply.code(400).send({ error: "Name is required" });
    }

    await ProjectsCommandService.createProject(name);
    return reply.redirect("/");
  });
}
