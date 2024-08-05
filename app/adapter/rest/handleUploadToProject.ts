import { FastifyInstance } from "fastify";
import ProjectsQueryService from "../../application/ProjectsQueryService";
import ProjectsCommandService from "../../application/ProjectsCommandService";

export function fastifyHandler(server: FastifyInstance) {
  server.post("/projects/:projectId/upload", async (request, reply) => {
    const { projectId } = request.params as { projectId: string };
    const project = await ProjectsQueryService.getProjectById(projectId);

    const data = await request.file();

    if (!project || !data) {
      return reply.type("text/html").send(`<div>404 - Not found</div>`);
    }

    const file = data.file;
    const fileData = JSON.parse(file.read()?.toString());

    if (!fileData) {
      return reply.type("text/html").send(`<div>404 - Not found</div>`);
    }

    // const fields = data.fields;

    ProjectsCommandService.createTranslationsFromObject(projectId, fileData);
    return reply.redirect(`/projects/${projectId}`);
  });
}
