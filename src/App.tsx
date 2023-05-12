import { useContext, useEffect } from "react";
import { TodosContext } from "./store/TodoContext";

import classes from "./App.module.css";

import Form from "./components/Form";
import TodoList from "./components/TodoList";

function App() {
  const todosCtx = useContext(TodosContext);

  //// PERFORM API CALLS ON MOUNT - GET USERS AND TODOS
  useEffect(() => {
    todosCtx.getTodos();
    todosCtx.getUsers();
  }, []);

  const users = todosCtx.users;
  
  return (
    <>
    {/* ALL TODOS */}
      <div className={classes.titleBox}>
        <h1 className={classes.title}>todos.</h1>
      </div>
      <div className={classes.flex}>
        <div className={classes.list}>
          <div className={classes.alltodos}>
            <TodoList items={todosCtx.items} />
          </div>
        </div>


      {/* ADD TODO */}
        <div className={classes.form}>
          <div className={classes.add}>
            <b className={classes.labels}>add todo</b>
          </div>
          <Form users={users} handleModal={() => {}}/>
        </div>

      </div>
    </>
  );
}

export default App;
