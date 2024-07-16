import Project from "../domain/Project";
import SqliteRepository from "./SqliteRepository";

type ProjectRow = {
  id: string;
  name: string;
};

class ProjectRepository extends SqliteRepository {
  getProjects(): Promise<Project[]> {
    return new Promise((resolve, reject) => {
      this.db.all<ProjectRow>("SELECT * FROM projects", (err, rows) => {
        if (err) {
          reject(err);
        } else {
          const projects = rows.map((row) => this.toDomain(row));
          resolve(projects);
        }
      });
    });
  }

  createProject(project: Project): Promise<Project> {
    return new Promise((resolve, reject) => {
      this.db.run(
        "INSERT INTO projects (id, name) VALUES (?, ?)",
        [project.id, project.name],
        (err) => {
          if (err) {
            reject(err);
          } else {
            resolve(project);
          }
        }
      );
    });
  }

  private toDomain(row: ProjectRow) {
    return new Project(row.id, row.name);
  }
}

export default ProjectRepository;
