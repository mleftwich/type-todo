import axios from "axios";
import React, { useState } from "react";
import Todo from "../models/todo";

// DEFINE TODO TYPE
type TodosContextObj = {
  items: Todo[];
  users: [];
  getTodos: () => void;
  getUsers: () => void;
  addTodo: (name: string, user: string, isComplete: boolean) => void;
  removeTodo: (id: string) => void;
  editTodo: (
    id: string,
    name: string,
    user: string,
    isComplete: boolean
  ) => void;
  getByUser: (user: string) => void;
  getByTasks: (tasks: string) => void;
  getCompleted: () => void;
};

// CREATE CONTEXT
export const TodosContext = React.createContext<TodosContextObj>({
  items: [],
  users: [],
  getTodos: () => {},
  getUsers: () => {},
  addTodo: () => {},
  removeTodo: (id: string) => {},
  editTodo: () => {},
  getByUser: () => {},
  getByTasks: () => {},
  getCompleted: () => {},
});

// DEFINE PROVIDER
const TodosContextProvider: React.FC<{ children: React.ReactNode }> = (
  props
) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [users, setUsers] = useState<[]>([]);

  //// GET ALL THE TODOS FROM THE API AND SET INITIAL STATE
  async function getTodos() {
    setTodos([]);
    const req = await axios.get("api/todos");
    const todos = req.data.todos;

    for (let index = 0; index < todos.length; index++) {
      const newTodo = new Todo(
        todos[index].name,
        todos[index].user,
        todos[index].isComplete,
        todos[index].id
      );

      setTodos((prevTodos) => {
        return prevTodos.concat(newTodo);
      });
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

  // FILTER DATA LOGIC
  // get by sepcific user
  const getByUser = (user: string) => {
    return todos.filter((todo) => todo.user === user);
  };
  // get by sepcific task
  const getByTasks = (tasks: string) => {
    return todos.filter((todo) => todo.id.includes(tasks));
  };
  // get all completed
  const getCompleted = () => {
    return todos.filter((todo) => todo.isComplete === true);
  };

  // ADD TODOS
  const addTodoHandler = (name: string, user: string, isComplete: boolean) => {
    const newTodo = new Todo(name, user, isComplete);
    setTodos((prevTodos) => {
      return prevTodos.concat(newTodo);
    });
  };



  //EDIT TODO
  const editTodoHandler = (
    id: string,
    name: string,
    user: string,
    isComplete: boolean
  ) => {
    const editedTodo = new Todo(name, user, isComplete, id);
    setTodos((prevTodos) => {
      return prevTodos.map((todo) => {
        if (todo.id === id) {
          return editedTodo;
        } else {
          return todo;
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
    addTodo: addTodoHandler,
    removeTodo: removeTodoHandler,
    editTodo: editTodoHandler,
    getByUser,
    getByTasks,
    getCompleted,
  };

  return (
    <TodosContext.Provider value={contextValue}>
      {props.children}
    </TodosContext.Provider>
  );
};

export default TodosContextProvider;
