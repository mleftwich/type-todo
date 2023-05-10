import React, { useContext, useRef, useState } from "react";
import { TodosContext } from "../store/TodoContext";

import classes from "./Form.module.css";

import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField/TextField";
import Select from "react-select";

type Props = {
  userId?: string;
  taskname?: string;
  users?: any[];
  isComplete?: boolean;
};

const Form: React.FC<Props> = ({ userId, taskname, users, isComplete }) => {
  const todosCtx = useContext(TodosContext);
  const [success, setSuccess] = useState(false);
  // GET USERS CREATE OPTION LIST
  const userArray = [{}];
  for (let index = 0; index < users!.length; index++) {
    const userOptions = {
      value: users![index].id,
      label:
        users![index].firstName +
        " " +
        users![index].lastName +
        " - ID: " +
        users![index].id,
    };
    userArray.push(userOptions);
  }
  // isComplete status options
  const options = [
    {
      value: false,
      label: "Incomplete",
    },
    {
      value: true,
      label: "Complete",
    },
  ];

  // FORM HANDLER
  // user state handler
  const [newUser, setNewUser] = useState();
  const handleSelectUser = (selectedUser: any) => {
    setNewUser(selectedUser.value);
  };

  // is complete state handler
  const [completed, setCompleted] = useState();
  const handleStatusChange = (newStatus: any) => {
    const updatedStatus = newStatus.value;
    setCompleted(updatedStatus);
  };

  // handle submit
  const todoInputRef = useRef<HTMLInputElement>(null);
  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    let enteredText = todoInputRef.current!.value;
    if (enteredText!.trim().length === 0) {
      alert("Please enter a task");
    }
    todosCtx.addTodo(enteredText, newUser!, completed!);
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
    }, 3000);
  };
  

  return (
    <>
      <div className={classes.form}>
        <form>
          <div>
            <Select
              options={userArray}
              placeholder="- user -"
              autoFocus={true}
              onChange={handleSelectUser}
              styles={{control: (baseStyles, state) => ({...baseStyles, border: 0, boxShadow: "none" })}}
            />
            <Select
              options={options}
              placeholder={isComplete ? isComplete : "- status -"}
              onChange={handleStatusChange}
            />
          </div>

          <TextField
            id="task"
            name="task"
            className={classes.textfield}
            multiline
            minRows={3}
            fullWidth
            variant="filled"
            placeholder={taskname ? taskname : "- add task here -"}
            inputRef={todoInputRef}
          >
            {taskname}
          </TextField>

          <div className={classes.button}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              onClick={submitHandler}
              disabled={success}
            >
              <b>{success ? <ThumbUpIcon color="primary" /> : "save"}</b>
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Form;
