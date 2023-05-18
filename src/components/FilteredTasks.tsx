import ChecklistIcon from "@mui/icons-material/Checklist";
import TaskIcon from "@mui/icons-material/FormatListNumbered";
import PeopleIcon from "@mui/icons-material/People";
import { Button } from "@mui/material";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import React, { useContext, useState } from "react";
import Select from "react-select";
import Todo from "../models/todo";
import { TodosContext } from "../store/TodoContext";
import classes from "./FilteredTasks.module.css";
import TodoList from "./TodoList";
const FilteredTasks: React.FC<{
  search?: string;
  users?: Array<{ firstName: string; lastName: string; id: string }>;
  tasks?: Todo[];
  isComplete?: boolean;
}> = (props) => {
  const todosCtx = useContext(TodosContext);

  // SET TASKS OPTIONS
  const tasks = props.tasks;
  const tasksArray = [{}];
  for (let index = 0; index < tasks!.length; index++) {
    const userOptions = {
      value: tasks![index].id,
      label: tasks![index].name,
    };
    tasksArray.push(userOptions);
  }
  // SET USER OPTIONS
  const users = props.users;
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

  // HANDLE BUTTON GROUP
  const [type, setType] = useState<string | null>("user");
  const handleAlignment = (
    event: React.MouseEvent<HTMLElement>,
    newType: string | null
  ) => {
    setType(newType);
    setResult(null);
    setModded(false)
  };

  // user state handler
  const [newUser, setNewUser] = useState();
  const handleSelectUser = (selectedUser: any) => {
    setModded(false)
    setNewUser(selectedUser.value);
  };

  // task state handler
  const [newTask, setNewTask] = useState();
  const handleSelectTask = (selectedTask: any) => {
    setModded(false)
    setNewTask(selectedTask.value);
  };

  // result state
  const [result, setResult] = useState(null);
  // HANDLER FUNCTION TO GET APPROPRIATE DATA FOR FILTERED TASKS
  const handleSearch = async () => {
    if (type === "user") {
      const results = todosCtx.getByUser(newUser!);
      setResult(results!);
    } else if (type === "task") {
      const results = todosCtx.getByTasks(newTask!);
      setResult(results!);
    } else if (type === "complete") {
      const results = todosCtx.getCompleted();
      setResult(results!);
    }
  };

  // modified state handler
  const [modded, setModded] = useState(false);
  function handleMod() {
    setModded(true);
   }
  return (
    <>
      {/* BUTTON GROUP FOR FILTER */}
      <div className={classes.buttons}>
        <ToggleButtonGroup
          value={type}
          exclusive
          onChange={handleAlignment}
          aria-label="text alignment"
        >
          <ToggleButton
            value="user"
            aria-label="left aligned"
            color="secondary"
          >
            <PeopleIcon />
          </ToggleButton>
          <ToggleButton
            value="task"
            aria-label="left aligned"
            color="secondary"
          >
            <TaskIcon />
          </ToggleButton>
          <ToggleButton
            value="complete"
            aria-label="left aligned"
            color="secondary"
          >
            <ChecklistIcon />
          </ToggleButton>
        </ToggleButtonGroup>
      </div>

      {/* SELECTABLE FIELDS */}
      <div>
        {type === "user" && (
          <Select
            options={userArray}
            onChange={handleSelectUser}
            styles={{
              control: (baseStyles, state) => ({
                ...baseStyles,
                border: 0,
                boxShadow: "none",
              }),
            }}
          />
        )}
        {type === "task" && (
          <Select
            options={tasksArray}
            onChange={handleSelectTask}
            styles={{
              control: (baseStyles, state) => ({
                ...baseStyles,
                border: 0,
                boxShadow: "none",
              }),
            }}
          />
        )}
        {/* BUTTON  */}
      </div>
      <div className={classes.buttons}>
        <Button variant="contained" fullWidth onClick={handleSearch}>
          <b>search</b>
        </Button>
      </div>
      {modded && (
        <p className={classes.modded}>snapshot - tasks have been modified</p>
      )}
      {/* RESULTS */}
      <div className={classes.filtered} onClick={handleMod}>
        <div className={classes.flex}>
          {result ? (
            <TodoList items={result!} />
          ) : (
            <p className={classes.search}>^ choose parameters</p>
          )}
        </div>
      </div>
    </>
  );
};

export default FilteredTasks;
