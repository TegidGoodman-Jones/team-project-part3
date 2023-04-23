import { faComments } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { FC } from "react";

type Chats = {
  chats: {
    chats: [
      {
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
      }
    ];
  };
};

//currently reading client side to map chats
//need to make an api call to the database to get the chat data
//need to make it so that when chat is clicked it opens that chat page

const ChatList: FC<Chats> = ({ chats }) => {
  console.log(chats);
  return (
    <div className="flex flex-col  gap-2 py-2">
      {chats.chats.map((chat) => (
        <Link href={`/chat/${chat.chat.id}`} key={chat.chat.id}>
          <div className="flex items-start gap-2 py-2 rounded-md cursor-pointer text-gray-900 hover:text-white dark:text-white hover:bg-gray-800 dark:hover:bg-gray-700">
            <div className="w-8 h-12 ml-2 rounded-full flex items-center justify-start">
              <FontAwesomeIcon
                icon={faComments}
                size="lg"
                className="text-white"
              />
            </div>
            <div>
              <h2 className="text-lg font-medium">{chat.chat.name}</h2>
              <p className="dark:text-gray-500 text-gray-400">
                {chat.chat.messages[0].text}
              </p>
            </div>
          </div>
        </Link>
      ))}
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
