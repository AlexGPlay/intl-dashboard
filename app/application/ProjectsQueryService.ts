import ProjectRepository from "../infrastructure/ProjectsRepository";

class ProjectsQueryService {
  static async getProjects() {
    const repository = new ProjectRepository();
    const projects = await repository.getProjects();
    return projects;
  }

  static async getProjectById(id: string) {
    const repository = new ProjectRepository();
    const project = await repository.getProjectById(id);
    return project;
  }
}

export default ProjectsQueryService;
