import React, { useContext, useRef, useState } from "react";
import { TodosContext } from "../store/TodoContext";

import classes from "./Form.module.css";

import CloseIcon from "@mui/icons-material/DisabledByDefault";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { Button } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField/TextField";
import Select from "react-select";
type Props = {
  taskname?: string;
  users?: Array<{ firstName: string; lastName: string; id: string }>;
  isComplete?: boolean;
  edit?: boolean;
  handleModal: (e: boolean) => void;
  id?: string;
};

const Form: React.FC<Props> = ({
  taskname,
  isComplete,
  edit,
  handleModal,
  id,
  users,
}) => {
  const todosCtx = useContext(TodosContext);
  const [success, setSuccess] = useState(false);

  // GET USERS CREATE OPTION LIST
  const userArray = [{}];
  if (edit) {
    const userOptions = {
      value: users,
      label: users,
    };
    userArray.push(userOptions);
  } else {
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
  const todoInputRef = useRef<HTMLInputElement>(null);
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

  // handle submit - edit / add
  const submitHandler = (e: React.FormEvent) => {
    if (edit === true) {
      e.preventDefault();
      let enteredText = todoInputRef.current!.value;
      if (enteredText!.trim().length === 0) {
        return alert("Please enter a task");
      }
      todosCtx.editTodo(id!, enteredText, newUser!, completed!);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    } else {
      e.preventDefault();
      let enteredText = todoInputRef.current!.value;
      if (enteredText!.trim().length === 0) {
        return alert("Please enter a task");
      }
      todosCtx.addTodo(enteredText, newUser!, completed!);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    }
  };

  return (
    <>
      <div className={classes.form}>
        <form onSubmit={submitHandler}>
          <div>
            {edit && (
              <IconButton onClick={() => handleModal(false)}>
                <CloseIcon color="primary" />
              </IconButton>
            )}

            <Select
              options={userArray}
              placeholder="- user -"
              autoFocus={true}
              onChange={handleSelectUser}
              styles={{
                control: (baseStyles, state) => ({
                  ...baseStyles,
                  border: 0,
                  boxShadow: "none",
                }),
              }}
            />

            <Select
              options={options}
              placeholder="- status -"
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
            inputProps={{ className: classes.textfield }}
          >
            {taskname}
          </TextField>

          <div className={classes.button}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
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
