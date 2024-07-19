import ProjectsRepository from "../infrastructure/ProjectsRepository";

class ProjectsQueryService {
  static async getProjects() {
    const repository = new ProjectsRepository();
    const projects = await repository.getProjects();
    return projects;
  }

  static async getProjectById(id: string) {
    const repository = new ProjectsRepository();
    const project = await repository.getProjectById(id);
    return project;
  }
}

export default ProjectsQueryService;
