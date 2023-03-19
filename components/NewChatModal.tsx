import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments } from "@fortawesome/free-solid-svg-icons";

//need to edit modal to open to what the figure design shows

const NewChatButton = (props: any): JSX.Element => {

  return (
    <>
      <div
        className={
          props.modal
            ? "modal modal-open modal-bottom sm:modal-middle"
            : "hidden"
        }
      >
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            Add New Chat
          </h3>
          <div className="modal-action">
            <button className="btn" onClick={() => props.setModal(false)}>Add</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewChatButton;
