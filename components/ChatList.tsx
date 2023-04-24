import { faComments } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Pencil } from "lucide-react";
import Link from "next/link";
import { FC, useState } from "react";
import EditChatModal from "./EditChatModal";

type Chats = {
  chats: {
    chats: [
      {
        chat: {
          id: number;
          name: string;
          description: string;
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
      }
    ];
  };
};
type Chat = {
  chat: {
    id: number;
    name: string;
    description: string;
  };
};

//currently reading client side to map chats
//need to make an api call to the database to get the chat data
//need to make it so that when chat is clicked it opens that chat page

const ChatList: FC<Chats> = ({ chats }) => {
  const [modal, setModal] = useState(false);
  const [editChat, setEditChat] = useState<Chat | null>(null);
  return (
    <div className="flex flex-col gap-2 py-2">
      {chats.chats.map((chat) => (
        <div className="flex justify-between border border-neutral rounded mx-2">
          <Link
            href={`/chat/${chat.chat.id}`}
            key={chat.chat.id}
            className="flex-grow no-underline"
          >
            <div className="flex items-center justify-start gap-4 m-1 rounded cursor-pointer  hover:text-primary hover:bg-base-200">
              <div className="w-8 h-12 mx-2 my-1 rounded-full flex items-center justify-start">
                <FontAwesomeIcon
                  icon={faComments}
                  size="lg"
                  className="text-neutral"
                />
              </div>
              <div>
                <h2 className="text-lg font-medium">{chat.chat.name}</h2>
                {chat.chat.messages.length > 0 && (
                  <p className="text-accent">{chat.chat.messages[0].text}</p>
                )}
              </div>
            </div>
          </Link>
          <div
            className="flex m-1 py-2 px-4 items-center rounded cursor-pointer text-neutral hover:text-primary hover:bg-base-200"
            onClick={() => {
              setModal(true);
              setEditChat({
                chat: {
                  id: chat.chat.id,
                  name: chat.chat.name,
                  description: chat.chat.description,
                },
              });
            }}
          >
            <Pencil size={24} />
          </div>
          {/* Modal */}
        </div>
      ))}
      <EditChatModal modal={modal} setModal={setModal} chat={editChat} />
      {/* {chats.map((chat) => (
        <div
          key={chat.id}
          className="flex items-start gap-2 py-2 rounded-md cursor-pointer text-gray-900 hover:text-white dark:text-white hover:bg-gray-800 dark:hover:bg-gray-700"
        >
          <div className="w-8 h-12 ml-2 rounded-full flex items-center justify-start">
            <FontAwesomeIcon
              icon={faComments}
              size="lg"
              className="text-white"
            />
          </div>
          <div>
            <h2 className="text-lg font-medium">{chat.name}</h2>
            <p className="dark:text-gray-500 text-gray-400">{chat.lastMessage}</p>
          </div>
        </div>
      ))} */}
    </div>
  );
};

export default ChatList;
