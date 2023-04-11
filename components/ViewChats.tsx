import React, { useEffect, useState } from "react";
import ChatList from "./ChatList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faComment, faMessage } from "@fortawesome/free-solid-svg-icons";
import NewChatButton from "./NewChatModal";
import NewChatModal from "./NewChatModal";
import $ from 'jquery';

//edit button does not do anything
//need get search working - client side filter it
//need to center everything
//new chat opens up modal - but need to be able to click out of it - not working yet - need to set True/False the visibility

const ViewChats = (props: any) => {
  const [modal, setModal] = useState(false);

  // useEffect(() => {
  // const searchButton = document.getElementById("default-search");
  // searchButton?.addEventListener("keyup", (e) => {
  //   if (e.key === "Enter") {
  //     e.preventDefault();

  //     const searchForm = document.getElementById("searchForm");
  //     handleSearch(new Event("submit"));

  //   }
  // });
  // }, []);
      

  function handleSearch(e: Event | React.FormEvent<HTMLFormElement >) {
    e.preventDefault();
    const searchTerm = $("#default-search").val();
    // Filter the chat list using the searchTerm
    console.log("Search term:", searchTerm);
  }

  return (
    <>
        <div className="flex flex-col w-full ">
          <div className=" py-4 px-3">
            <form id="searchForm" onSubmit={handleSearch}>
              <div className="relative">
                  <FontAwesomeIcon
                    icon={faSearch}
                    className="pointer-events-none w-4 h-4 absolute top-1/2 transform -translate-y-1/2 left-3"
                  />
               
                <input type="search"  id="default-search" className="input py-3 px-4 dark:text-black appearance-none w-full block pl-10 bg-gray-100 text-black bg-gray-600 " placeholder="January Statements " required/>
              </div>
            </form>
            <div>
            <ChatList />
          </div>
            <button className="btn w-full bg-gray-500 border-gray-800" onClick={() => setModal(true)}>
              <div><FontAwesomeIcon icon={faComment}/></div>
            </button>
          {/* Modal */}
          <NewChatModal modal={modal} setModal={setModal}/>
          </div>
        </div>
    </>
  );
};

export default ViewChats;
