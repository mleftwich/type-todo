import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditNoteIcon from '@mui/icons-material/EditNote';
import React from "react";
import classes from "./TodoItem.module.css";

const TodoItem: React.FC<{
  name: string;
  user: string;
  id: string;
  isComplete: boolean;
}> = (props) => {

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
            <EditNoteIcon />
        <DeleteForeverIcon />
        </div>
        </p>
       
      </div>
      
 
  );
};
export default TodoItem;
