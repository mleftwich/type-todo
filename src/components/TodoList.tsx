import React from "react";
import Todo from "../models/todo";
import TodoItem from "./TodoItem";
import classes from './Todolist.module.css';
const TodoList: React.FC<{items: Todo[]}> = (props) => {

  return (
    <>
    <div className={classes.list}>
      <h5 className={classes.labels}>all todos</h5>
    {props.items.map((item, index) => (
    <TodoItem key={item.id} id={item.id} name={item.name} user={item.user} isComplete={item.isComplete}/>
    ))}
    </div>
    </>
 )
};

export default TodoList;
