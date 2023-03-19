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
    <div className="bg-white rounded-md">
      <div className="flex items-center">
        <input
          type="text"
          placeholder="Type your message here"
          id="message-text"
          value={text}
          className=" rounded-md p-2 mr-2 w-full"
        />
        <label className="flex items-center justify-center rounded-md p-2 mr-2">
          <input type="file" className="hidden" />
          <FontAwesomeIcon icon={faPaperclip} className="mr-2" />
        </label>
        <button
          onClick={handleSend}
          disabled={!text && !file}
          className={` text-white font-bold py-2 px-4 rounded-md ${
            !text && !file && "opacity-50 cursor-not-allowed"
          }`}
        >
          <FontAwesomeIcon icon={faPaperPlane} className="text-black mr-2" />
        </button>
      </div>
    </div>
  );
};

export default TextInput;
