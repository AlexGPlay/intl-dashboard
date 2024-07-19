import Project from "../domain/Project";
import ProjectsRepository from "../infrastructure/ProjectsRepository";

export default class ProjectsCommandService {
  static async createProject(name: string) {
    const repository = new ProjectsRepository();
    const project = Project.create(name);
    await repository.createProject(project);

    return project;
  }
}
