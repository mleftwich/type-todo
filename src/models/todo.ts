import Chance from "chance";
const chance = new Chance();
class Todo {
  id: string;
  name: string;
  isComplete: boolean;
  user: string;
  constructor(name: string, user: string, isComplete: boolean, id?: string) {
    this.name = name;
    this.id = id ? id : chance.guid();
    this.isComplete = isComplete;
    this.user = user;
  }
}

export default Todo;
