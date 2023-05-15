import React, { useContext } from "react";
import { TodosContext } from "../store/TodoContext";

import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { IconButton } from "@mui/material";
import EditModal from "./EditModal";
import classes from "./TodoItem.module.css";

const TodoItem: React.FC<{
  name: string;
  user: any;
  id: string;
  isComplete: boolean;
}> = (props) => {
  const todosCtx = useContext(TodosContext);
  const [toEdit, setToEdit] = React.useState(false);

  function handleModal(e: boolean) {
    setToEdit(e);
  }

  return (
    <>
      <div key={props.id} className={classes.item}>
        <div className={classes.modal}>
          {toEdit && (
            <EditModal
              id={props.id}
              taskname={props.name}
              users={props.user}
              isComplete={props.isComplete}
              handleModal={handleModal}
            />
          )}
        </div>
       
        <p>
          <b>Task:</b> {props.name}
        </p>
        <p>
          <b>Complete:</b> {props.isComplete.toString()}
        </p>
        <div className={classes.menu}>
          <IconButton aria-label="edit task" onClick={() => handleModal(true)}>
            <EditNoteIcon />
          </IconButton>
          <IconButton
            aria-label="delete task"
            onClick={() => todosCtx.removeTodo(props.id)}
          >
            <DeleteForeverIcon />
          </IconButton>
        </div>
      </div>
    </>
  );
};
export default TodoItem;
