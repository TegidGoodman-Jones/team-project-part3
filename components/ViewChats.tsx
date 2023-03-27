import React, { useState } from "react";
import ChatList from "./ChatList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faComments } from "@fortawesome/free-solid-svg-icons";
import NewChatButton from "./NewChatModal";
import NewChatModal from "./NewChatModal";
import $ from 'jquery';

//edit button does not do anything
//need get search working - client side filter it
//need to center everything
//new chat opens up modal - but need to be able to click out of it - not working yet - need to set True/False the visibility

const ViewChats = (props: any) => {
  const [modal, setModal] = useState(false);
  function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const searchTerm = $("#default-search").val();
    // Filter the chat list using the searchTerm
    console.log("Search term:", searchTerm);
  }

  return (
    <>
      <div className="flex ">
        <div className="flex flex-col p-2 ">
          <div className="text-lg m-2">
            <button type="submit">Edit </button>
          </div>
          <div className="text-3xl m-2">Chat</div>
          <div className="mt-5 m-2 w-fit">
            <form onSubmit={handleSearch}>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <FontAwesomeIcon
                    icon={faSearch}
                    className="w-5 h-5 text-gray-500 dark:text-gray-400"
                  />
                </div>
                <input
                  type="search"
                  id="default-search"
                  className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 "
                  placeholder="Chats "
                  required
                />
                <button
                  type="button"
                  className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 font-medium rounded-lg text-sm px-4 py-2"
                  onClick={() => console.log("Search clicked")}
                >
                  Search
                </button>
              </div>
            </form>
          </div>
          <div>
            <ChatList />
          </div>
          <div className="flex justify-center">
            <button className="btn" onClick={() => setModal(true)}>
              <FontAwesomeIcon icon={faComments} />
              New Chat
            </button>
          </div>
          {/* Modal */}
          <NewChatModal modal={modal} setModal={setModal}/>
        </div>
      </div>
    </>
  );
};

export default ViewChats;
