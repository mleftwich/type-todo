import TaskIcon from '@mui/icons-material/SpeakerNotes';
import React from "react";
import Todo from "../models/todo";
import TodoItem from "./TodoItem";
import classes from "./Todolist.module.css";
const TodoList: React.FC<{ items: Todo[] }> = (props) => {
  const todoArray = props.items;

  return (
    <>
      <div>
        <h5 className={classes.labels}><TaskIcon color='primary'/></h5>
        {todoArray.map((item, index) => (
          <TodoItem
            key={index}
            id={item.id}
            name={item.name}
            user={item.user}
            isComplete={item.isComplete}
          />
        ))}
      </div>
    </>
  );
};

export default TodoList;
