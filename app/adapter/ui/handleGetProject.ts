import { FastifyInstance } from "fastify";
import ProjectsQueryService from "../../application/ProjectsQueryService";

export function fastifyHandler(server: FastifyInstance) {
  server.get("/projects/:projectId", async (request, reply) => {
    const { projectId } = request.params as { projectId: string };
    const project = await ProjectsQueryService.getProjectById(projectId);

    if (!project) {
      return reply.type("text/html").send(`<div>404 - Not found</div>`);
    }

    reply.type("text/html").send(`
      <div>${project.name}</div>
    `);
  });
}
