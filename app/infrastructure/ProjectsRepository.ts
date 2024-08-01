import Project from "../domain/Project";
import SqliteRepository from "./SqliteRepository";

type ProjectRow = {
  id: string;
  name: string;
};

class ProjectsRepository extends SqliteRepository<ProjectRow, Project> {
  tableName = "projects";

  getProjects(): Promise<Project[]> {
    return this.findAll();
  }

  getProjectById(id: string): Promise<Project | null> {
    return this.getOneByKeyAndValue("id", id);
  }

  createProject(project: Project): Promise<Project> {
    return this.insert(project);
  }

  toDomain(row: ProjectRow) {
    return new Project(row.id, row.name);
  }

  toItem(domain: Project) {
    return {
      id: domain.id,
      name: domain.name,
    };
  }
}

export default ProjectsRepository;
