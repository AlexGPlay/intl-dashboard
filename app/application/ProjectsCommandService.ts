import Project from "../domain/Project";
import ProjectRepository from "../infrastructure/ProjectsRepository";

export default class ProjectsCommandService {
  static async createProject(name: string) {
    const repository = new ProjectRepository();
    const project = Project.create(name);
    await repository.createProject(project);

    return project;
  }
}
