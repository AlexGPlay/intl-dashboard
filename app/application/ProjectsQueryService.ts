import ProjectRepository from "../infrastructure/ProjectsRepository";

class ProjectsQueryService {
  static async getProjects() {
    const repository = new ProjectRepository();
    const projects = await repository.getProjects();
    return projects;
  }
}

export default ProjectsQueryService;
