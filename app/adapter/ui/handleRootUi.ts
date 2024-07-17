import { FastifyInstance } from "fastify";
import ProjectsQueryService from "../../application/ProjectsQueryService";
import fs from "fs";
import ejs from "ejs";
import path from "path";

export function fastifyHandler(server: FastifyInstance) {
  server.get("/", async (request, reply) => {
    const projects = await ProjectsQueryService.getProjects();

    const filePath = path.join(__dirname, "root.html");
    const htmlData = fs.readFileSync(filePath, "utf8");
    return reply.type("text/html").send(ejs.render(htmlData, { projects }));
  });
}
