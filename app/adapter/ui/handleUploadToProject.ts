import { FastifyInstance } from "fastify";
import { replyWithHtml } from "./utils";
import ProjectsQueryService from "../../application/ProjectsQueryService";

export function fastifyHandler(server: FastifyInstance) {
  server.get("/projects/:projectId/upload", async (request, reply) => {
    const { projectId } = request.params as { projectId: string };
    const project = await ProjectsQueryService.getProjectById(projectId);

    if (!project) {
      return reply.type("text/html").send(`<div>404 - Not found</div>`);
    }

    replyWithHtml(reply, "upload.html.ejs", { project });
  });
}
