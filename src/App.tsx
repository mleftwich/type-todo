import { useContext, useEffect } from "react";
import { TodosContext } from "./store/TodoContext";

import classes from "./App.module.css";

import FilteredTasks from "./components/FilteredTasks";
import Form from "./components/Form";
import TodoList from "./components/TodoList";
function App() {
  const todosCtx = useContext(TodosContext);

  //// PERFORM API CALLS ON MOUNT - GET USERS AND TODOS
  useEffect((getTodos = todosCtx.getTodos, getUsers = todosCtx.getUsers) => {
    getTodos();
    getUsers();
    // eslint-disable-next-line
  }, []);

  const users = todosCtx.users;
  const todos = todosCtx.items;
  return (
    <>
      {/* ALL TODOS */}
      <div className={classes.titleBox}>
        <h1 className={classes.title}>todos.</h1>
      </div>
      <div className={classes.flex}>
        <div className={classes.list}>
          <div className={classes.alltodos}>
            <TodoList items={todos} />
          </div>
        </div>

        {/* ADD TODO */}
        <div className={classes.form}>
          <div className={classes.add}>
            <b className={classes.labels}>add todo</b>
          </div>
          <Form users={users} handleModal={() => {}} />

          {/* FILTERED TASKS */}
          <div className={classes.filtered}>
            <FilteredTasks users={users} tasks={todos} />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
