import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { IconButton } from "@mui/material";
import React, { useContext } from "react";
import { TodosContext } from "../store/TodoContext";

import classes from "./TodoItem.module.css";

const TodoItem: React.FC<{
  name: string;
  user: string;
  id: string;
  isComplete: boolean;
}> = (props) => {
const todosCtx = useContext(TodosContext);
  return (
    <div key={props.id} className={classes.item}>
      <p>
        <b>Task:</b> {props.name}
      </p>
      <p>
        <b>User:</b> {props.user}
      </p>
      <p>
        <b>Complete:</b> {props.isComplete.toString()}
        <div className={classes.menu}>
          <IconButton aria-label="edit task">
            <EditNoteIcon />
          </IconButton>
          <IconButton aria-label="delete task" onClick={() => todosCtx.removeTodo(props.id)}>
            <DeleteForeverIcon />
          </IconButton>
        </div>
      </p>
    </div>
  );
};
export default TodoItem;
