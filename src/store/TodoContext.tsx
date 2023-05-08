import React, { useState } from "react";
import Todo from "../models/todo";


// DEFINE TODO TYPE
type TodosContextObj = {
    items: Todo[],
    setInitialState: (name: string, user: string, isComplete: boolean) => void,
    addTodo: (name: string, user: string, isComplete: boolean) => void,
    removeTodo: (id: string) => void
}


// CREATE CONTEXT
export const TodosContext = React.createContext<TodosContextObj>({
  items: [],
  setInitialState: () => {},
  addTodo: () => {},
  removeTodo: (id: string) => {},
});

// DEFINE PROVIDER
const TodosContextProvider: React.FC<{children: React.ReactNode}> = (props) => {
  const [todos, setTodos] = useState<Todo[]>([]);


  // SET INITIAL STATE
    const setInitialState = (name: string, user: string, isComplete: boolean) => {
        const newTodo = new Todo(name, user, isComplete);
        setTodos((prevTodos) => {
         return prevTodos.concat(newTodo);
            });
            }


  // REMOVE TODOS
  const removeTodoHandler = (TodoId: string) => {
    setTodos((prevTodos) => {
      return prevTodos.filter((todo) => todo.id !== TodoId);
    });
  };

  // ADD TODOS
  const addTodoHandler = (name: string, user: string, isComplete: boolean) => {
    const newTodo = new Todo(name, user, isComplete);

    setTodos((prevTodos) => {
     return prevTodos.concat(newTodo);
        });
  };



  // VALUE TO GIVE TO PROVIDER
  const contextValue: TodosContextObj = {
    items: todos,
    setInitialState,
    addTodo: addTodoHandler,
    removeTodo: removeTodoHandler,
  }

  return <TodosContext.Provider value={contextValue}>{props.children}</TodosContext.Provider>;
};

export default TodosContextProvider;


