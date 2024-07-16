import { FastifyInstance } from "fastify";
import ProjectsQueryService from "../../application/ProjectsQueryService";

export function fastifyHandler(server: FastifyInstance) {
  server.get("/", async (request, reply) => {
    const projects = await ProjectsQueryService.getProjects();

    return reply.type("text/html").send(`
      <div>Projects</div>
      <main>
        <ul>
          ${projects.map((project) => `<li>${project.name}</li>`).join("")}
        </ul>
      </main>
    `);
  });
}
