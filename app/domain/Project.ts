import { v4 as uuidv4 } from "uuid";

class Project {
  id: string;
  name: string;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }

  static create(name: string) {
    return new Project(uuidv4(), name);
  }
}

export default Project;
