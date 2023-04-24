import React, { FC, useEffect, useState } from "react";
import ChatList from "./ChatList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faComment,
  faMessage,
} from "@fortawesome/free-solid-svg-icons";
import NewChatButton from "./NewChatModal";
import NewChatModal from "./NewChatModal";
import $ from "jquery";

//edit button does not do anything
//need get search working - client side filter it
//need to center everything
//new chat opens up modal - but need to be able to click out of it - not working yet - need to set True/False the visibility
type Chats = {
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

interface ViewChatsProps {
  chats: Chats;
  userId: number;
}

const ViewChats: FC<ViewChatsProps> = ({ chats, userId }) => {
  const [modal, setModal] = useState(false);
  // should be loaded from the db via api call

  return (
    <>
      <div className="flex flex-col w-full ">
        <div className=" py-4 px-3">
          <form id="searchForm">
            <div className="relative">
              <FontAwesomeIcon
                icon={faSearch}
                className="pointer-events-none w-4 h-4 absolute top-1/2 transform -translate-y-1/2 left-3"
              />

              <input
                type="search"
                id="default-search"
                className="input py-3 px-4 dark:text-black appearance-none w-full block pl-10 bg-gray-100 text-black dark:bg-gray-600 "
                placeholder="January Statements "
                required
              />
            </div>
          </form>
          <div>
            <ChatList chats={chats} />
          </div>
          <button
            id="newChatButton"
            className="btn w-full text-white dark:text-white  hover:bg-gray-400 bg-gray-300  dark:bg-gray-500 dark:border-gray-500 border-gray-300"
            onClick={() => setModal(true)}
          >
            <FontAwesomeIcon
              icon={faComment}
              className="pointer-events-none w-4 h-4"
            />
          </button>
          {/* Modal */}
          <NewChatModal modal={modal} setModal={setModal} userId={userId} />
        </div>
      </div>
    </>
  );
};

export default ViewChats;
