import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments } from "@fortawesome/free-solid-svg-icons";

//need to edit modal to open to what the figure design shows

const NewChatButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleButtonClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="flex justify-center">
        <button className="btn btn-wide" onClick={handleButtonClick}>
          <FontAwesomeIcon icon={faComments} />
          New Chat
        </button>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-gray-800 opacity-50"></div>
          <div className="bg-white p-8 rounded-md">
            <h2 className="text-lg font-medium mb-4">New Chat</h2>
            <p className="mb-4">This is the modal content.</p>
            <button className="btn btn-primary" onClick={handleCloseModal}>
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default NewChatButton;
