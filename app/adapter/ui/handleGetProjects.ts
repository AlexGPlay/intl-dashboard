import { FastifyInstance } from "fastify";
import ProjectsQueryService from "../../application/ProjectsQueryService";
import { replyWithHtml } from "./utils";

export function fastifyHandler(server: FastifyInstance) {
  server.get("/projects", async (request, reply) => {
    const projects = await ProjectsQueryService.getProjects();
    return replyWithHtml(reply, "projects.html.ejs", { projects });
  });
}
