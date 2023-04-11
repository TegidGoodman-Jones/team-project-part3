import { useState } from "react";
import { faPaperclip } from "@fortawesome/free-solid-svg-icons";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const TextInput = () => {
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);


  const handleSend = () => {
    // Do something with the text and/or file data, such as send it to a server
    console.log(`Text: ${text}`);
    console.log(`File: ${file}`);
    // Clear the input fields
    setText("");
    setFile(null);
  };

  return (
      <div className="flex items-center h-15 p-2 bg-gray-600  rounded-md focus-within:opacity-100 hover:opacity-100 opacity-50">
        <textarea
          placeholder="Type your message here"
          id="message-text"
          value={text}
          className=" textarea w-full h-full   bg-gray-600 text-white border-none "
        />
        <div className="flex  h-full items-center justify-center rounded-md p-2  ">
          <input type="file" className="hidden" />
          <FontAwesomeIcon icon={faPaperclip} className="w-5 m-2" />
          <button
            onClick={handleSend}
            disabled={!text && !file}
            className={` text-white font-bold rounded-md m-2 active:group ${
              !text && !file && "opacity-50 cursor-not-allowed"
            }`}
          >
            <FontAwesomeIcon icon={faPaperPlane} className="w-5 text-white" />
          </button>
        </div>
      </div>
  );
};

export default TextInput;
