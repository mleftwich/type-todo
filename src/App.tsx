import axios from "axios";
import { useContext, useEffect } from "react";
import classes from "./App.module.css";
import TodoList from "./components/TodoList";
import { TodosContext } from "./store/TodoContext";
function App() {
  const todosCtx = useContext(TodosContext);
  //// GET ALL THE TODOS FROM THE API AND SET INITIAL STATE
  async function getTodos() {
    const req = await axios.get("api/todos");
    const todos = req.data.todos;

    for (let index = 0; index < todos.length; index++) {
      todosCtx.setInitialState(
        todos[index].name,
        todos[index].user,
        todos[index].isComplete
      );
    }
  }

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <>
      <div className={classes.titleBox}>
        <h1 className={classes.title}>todos.</h1>
      </div>
      <div className={classes.alltodos}>
        <TodoList items={todosCtx.items} />
      </div>
    </>
  );
}

export default App;
