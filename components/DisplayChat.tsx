import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC } from "react";
import TextInput from "./TextInput";
import Cookies from "universal-cookie";
import jwt from "jsonwebtoken";

//static - need to change it so that it opens depending on what user chat is clicked

type Chat = {
  chat: {
    id: number;
    name: string;
    messages: [
      {
        text: string;
        timestamp: string;
        user: {
          username: string;
          id: number;
        };
      }
    ];
  };
};

type DisplayChatProps = {
  chat: Chat | null;
  userId: number;
};

const DisplayChat: FC<DisplayChatProps> = (props) => {
  return (
    <>
      <div className="flex flex-col justify-between min-h-screen">
        <div className="flex-grow p-5">
          {props.chat
            ? props.chat.chat.messages.map((message, index) => (
                <div
                  className={`chat ${
                    props.userId == message.user.id ? "chat-end" : "chat-start"
                  }`}
                  key={index}
                >
                  <div className="chat-bubble bg-gray-500 text-white">
                    {message.text}
                  </div>
                  <div className="chat-footer opacity-50 my-1">
                    {formatDate(message.timestamp)}
                  </div>
                </div>
              ))
            : null}
        </div>
        <div className="mt-auto p-10">
          <TextInput />
        </div>
      </div>
    </>
  );
};


const formatDate = (timestamp: string): string => {
  const date = new Date(timestamp);
  const today = new Date();

  const isToday =
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear();

  if (isToday) {
    // Format for today
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  } else {
    // Format for other dates
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear()).slice(2);
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${day}/${month}/${year} - ${hours}:${minutes}`;
  }
};

export default DisplayChat;
