import { FastifyInstance } from "fastify";
import ProjectsCommandService from "../../application/ProjectsCommandService";

export function fastifyHandler(server: FastifyInstance) {
  server.post("/projects/create", async (request, reply) => {
    const { name } = request.body as { name: string };
    const project = await ProjectsCommandService.createProject(name);
    return { id: project.id };
  });
}
