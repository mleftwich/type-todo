import Chance from "chance";
const chance = new Chance();
class Todo {
    id: string;
    name: string;
    isComplete: boolean;
    user: string;
    constructor(name: string, user: string, isComplete: boolean) {
        this.name = name;
        this.id = chance.character({numeric: true})
        this.isComplete = isComplete
        this.user = user;
    }
}


export default Todo