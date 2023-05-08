import Chance from "chance";

function TodoChance() {
    const TodoArray = []
    const chance = new Chance();
    for (let index = 0; index < 10; index++) {
      let id = chance.character({ numeric: true })
      let task = chance.sentence();
      let user = chance.name();
      let date = chance.date();
      let completed = chance.bool();
      TodoArray[index] = {
        id: id,
        task: task,
        user: user,
        date: date,
        completed: completed
      }
    }
  
  
    return (
      <>
      <div>
        <h1>Todo app</h1>
        <ul>
        {TodoArray.map((todo, index) => 
         
            <li key={todo.id}>
              <div>
              {todo.id} - {todo.task} - {todo.user} - {todo.date.toString()} - {todo.completed}
              </div>
            </li>)}
        </ul>
      </div>
      </>
    );
}

export default TodoChance