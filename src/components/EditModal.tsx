import React from "react";
import Form from "./Form";

const EditModal: React.FC<{
  id?: string;
  taskname?: string;
  users?: any;
  isComplete?: boolean;
  handleModal: (e: boolean) => void;
}> = (props) => {
  return (
    <Form
      id={props.id}
      taskname={props.taskname}
      users={props.users}
      isComplete={props.isComplete}
      edit={true}
      handleModal={props.handleModal}
    />
  );
};

export default EditModal;
