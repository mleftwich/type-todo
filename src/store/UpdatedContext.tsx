import axios from "axios";
import React, { Reducer, useReducer, useState } from "react";
import Todo from "../models/todo";

type Action =
  | {
      type: "ADD_TODO";
      payload: {
        name: string,
        completed: boolean,
        user: string
      };
    }
  | {
      type: "REMOVE_TODO";
      payload: {
        TodoId: string
      };
    }
  | {
      type: "EDIT_TODO";
      payload: any;
    };

    type State = {
        todos: Array<Todo>
    }

// DEFINE TODO TYPE
type TodosContextObj = {
  items: Todo[];
  users: [];
  getTodos: () => void;
  getUsers: () => void;
  todoReducer: Reducer<State, Action>
};

// CREATE CONTEXT
export const TodosContext = React.createContext<TodosContextObj>({
  items: [],
  users: [],
  getTodos: () => {},
  getUsers: () => {},
  todoReducer: () => { return { todos: [] }; }
});

// DEFINE PROVIDER
const TodosContextProvider: React.FC<{ children: React.ReactNode }> = (
  props
) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [users, setUsers] = useState<[]>([]);

  const todoReducer = (state: Todo[], action: Action) => {
    switch (action.type) {
      case "ADD_TODO":
        addTodoHandler(action.payload.name, action.payload.user, action.payload.completed);
        return state

      case "REMOVE_TODO":
        removeTodoHandler(action.payload.TodoId);
        return state

      case "EDIT_TODO":
        return state.map((todo) => {
          if (todo.id === action.payload.id) {
            return action.payload;
          } else {
            return todo;
          }
        });
      default:
        return state;
    }
  };
  const [globalState, dispatch] = useReducer(todoReducer, todos);

  // SET INITIAL STATE
  const setInitialState = (name: string, user: string, isComplete: boolean) => {
    const newTodo = new Todo(name, user, isComplete);
    setTodos((prevTodos) => {
      return prevTodos.concat(newTodo);
    });
  };

  // REMOVE TODOS
  const removeTodoHandler = async (TodoId: string) => {
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

  // VALUE TO GIVE TO PROVIDER
  const contextValue: TodosContextObj = {
    items: todos,
    users: users,
    getTodos,
    getUsers,
    todoReducer: () => { return { todos: [] }; }
  };

  return (
    <TodosContext.Provider value={contextValue}>
      {props.children}
    </TodosContext.Provider>
  );
};

export default TodosContextProvider;
