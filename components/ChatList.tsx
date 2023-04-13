import { faComments } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type ChatType = {
  id: string;
  name: string;
  lastMessage: string;
};

//currently reading client side to map chats
//need to make an api call to the database to get the chat data
//need to make it so that when chat is clicked it opens that chat page



const ChatList = () => {
  const chats = [
    {
      id: 1,
      name: "John Doe",
      lastMessage: "Hey, how's it going?",
    },
    {
      id: 2,
      name: "Jane Smith",
      lastMessage: "See you later!",
    },
    {
      id: 3,
      name: "Bob Johnson",
      lastMessage: "I'm on my way.",
    },
    {
      id: 4,
      name: "Alice Lee",
      lastMessage: "What are you up to?",
    },
    {
      id: 5,
      name: "Tom Wilson",
      lastMessage: "Can't wait to see you!",
    },
    {
      id: 6,
      name: "Tom Wilson, Alice Lee, Bob Johnson",
      lastMessage: "Can't wait to see you!",
    },
  ];
  return (
    <div className="flex flex-col  gap-2 py-2">
      {chats.map((chat) => (
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
      ))}
    </div>
  );
};

export default ChatList;
