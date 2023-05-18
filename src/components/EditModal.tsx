import React from "react";
import ReactDOM from "react-dom";
import classes from "./EditModal.module.css";
import Form from "./Form";

// MODAL BACKDROP
const Backdrop = (props: any) => {
  return (
    <div className={classes.backdrop} onClick={() => props.handleModal()} />
  );
};
// MODAL POP U[]
const ModalOverlay = (props: any) => {
  return (
    <>
      <div className={classes.modal}>
        <h4 className={classes.labels}>edit task</h4>
        <Form
          id={props.id}
          taskname={props.taskname}
          users={props.users}
          isComplete={props.isComplete}
          edit={true}
          handleModal={props.handleModal}
        />
      </div>
    </>
  );
};

// MODAL CONTENT
const EditModal: React.FC<{
  id?: string;
  taskname?: string;
  users?: any;
  isComplete?: boolean;
  handleModal: (e: boolean) => void;
}> = (props) => {
  const backdrop = document.getElementById("backdrop-root");
  const overlay = document.getElementById("overlay-root");
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <Backdrop
          handleModal={props.handleModal}
          onClick={props.handleModal}
        />,
        backdrop!
      )}
      {ReactDOM.createPortal(
        <ModalOverlay
          id={props.id}
          taskname={props.taskname}
          users={props.users}
          isComplete={props.isComplete}
          handleModal={props.handleModal}
        />,
        overlay!
      )}
    </React.Fragment>
  );
};

export default EditModal;
