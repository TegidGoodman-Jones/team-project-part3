import { useEffect, useState, FC } from "react";
import { faPaperclip } from "@fortawesome/free-solid-svg-icons";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import $ from "jquery";
import axios from "axios";

type TextInputProps = {
  textInputStatus: boolean;
  userId: number;
  chatId: number | null;
  setMessages: (messages: any) => void;
  messages: any;
};

const TextInput: FC<TextInputProps> = (props) => {
  const [messageText, setMessageText] = useState("");
  

  const handleSend = async () => {
    if (props.chatId) {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/message`, {
        userId: props.userId,
        chatId: props.chatId,
        text: messageText,
      });
      setMessageText("");
      props.setMessages([...props.messages, response.data.message]);
    }
  };

  return (
    <div className="flex items-center h-15 p-2 bg-gray-600  rounded-md focus-within:opacity-100 hover:opacity-100 opacity-50">
      {props.textInputStatus ? (
        <>
          <textarea
            placeholder="Type your message here"
            id="message-text"
            className="textarea w-full h-full bg-gray-600 text-white border-none"
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
          />
          <div className="flex  h-full items-center justify-center rounded-md p-2  ">
            <input type="file" className="hidden" />
            <FontAwesomeIcon icon={faPaperclip} className="w-5 m-2" />
            <button
              id="send-button"
              className=" text-white font-bold rounded-md m-2 active:group opacity-50"
              onClick={handleSend}
            >
              <FontAwesomeIcon icon={faPaperPlane} className="w-5 text-white" />
            </button>
          </div>
        </>
      ) : (
        <textarea
          placeholder="Type your message here"
          id="message-text"
          className="textarea w-full h-full bg-gray-600 text-white border-none"
          disabled
        />
      )}
    </div>
  );
};

export default TextInput;
