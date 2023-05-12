import axios from "axios";
import React, { useState } from "react";
import Todo from "../models/todo";

// DEFINE TODO TYPE
type TodosContextObj = {
  items: Todo[];
  users: [];
  getTodos: () => void;
  getUsers: () => void;
  setInitialState: (name: string, user: string, isComplete: boolean) => void;
  addTodo: (name: string, user: string, isComplete: boolean) => void;
  removeTodo: (id: string) => void;
  editTodo: (id: string, name: string, user: string, isComplete: boolean) => void;
};

// CREATE CONTEXT
export const TodosContext = React.createContext<TodosContextObj>({
  items: [],
  users: [],
  getTodos: () => {},
  getUsers: () => {},
  setInitialState: () => {},
  addTodo: () => {},
  removeTodo: (id: string) => {},
  editTodo: () => {},
});


// DEFINE PROVIDER
const TodosContextProvider: React.FC<{ children: React.ReactNode }> = (
  props
) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [users, setUsers] = useState<[]>([]);


   //// GET ALL THE TODOS FROM THE API AND SET INITIAL STATE
   async function getTodos() {
    const req = await axios.get("api/todos");
    const todos = req.data.todos;
    for (let index = 0; index < todos.length; index++) {
      setInitialState(
        todos[index].name,
        todos[index].user,
        todos[index].isComplete
      );
    }
  }

  ///// GET ALL USERS
  async function getUsers() {
    const req = await axios.get("api/users");
    const users = req.data.users;
    for (let index = 0; index < users.length; index++) {
      setUsers(users);
    }
  }

  // SET INITIAL STATE
  const setInitialState = (name: string, user: string, isComplete: boolean) => {
    const newTodo = new Todo(name, user, isComplete);
    setTodos((prevTodos) => {
      return prevTodos.concat(newTodo);
    });
  };

  // ADD TODOS
  const addTodoHandler = (name: string, user: string, isComplete: boolean) => {
    const newTodo = new Todo(name, user, isComplete);
    setTodos((prevTodos) => {
      return prevTodos.concat(newTodo);
    });
  };


  //EDIT TODO
  const editTodoHandler = (id: string, name: string, user: string, isComplete: boolean) => {
    const editedTodo = new Todo(name, user, isComplete, id);
    setTodos((prevTodos) => {
      return prevTodos.map((todo) => {
        if (todo.id === id) {
          return editedTodo;
          console.log(editedTodo);
        } else {
          return todo
        }
      });
    });
  };

  // REMOVE TODOS
  const removeTodoHandler = async (TodoId: string) => {
    setTodos((prevTodos) => {
      return prevTodos.filter((todo) => todo.id !== TodoId);
    });
  };

  
 
  // VALUE TO GIVE TO PROVIDER
  const contextValue: TodosContextObj = {
    items: todos,
    users: users,
    getTodos,
    getUsers,
    setInitialState,
    addTodo: addTodoHandler,
    removeTodo: removeTodoHandler,
    editTodo: editTodoHandler,
  };

  return (
    <TodosContext.Provider value={contextValue}>
      {props.children}
    </TodosContext.Provider>
  );
};

export default TodosContextProvider;
