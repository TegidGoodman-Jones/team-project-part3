import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import TextInput from "./TextInput";

//static - need to change it so that it opens depending on what user chat is clicked

const DisplayChat = (props: any) => {
  return (
    <>
      <div className="flex flex-col justify-between min-h-screen">
        <div className="flex-grow p-5">
          <div className="chat chat-start ">
            {/* <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <FontAwesomeIcon icon={faUser} />
              </div>
            </div> */}
            <div className="chat-bubble bg-gray-500 text-white">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Consequatur aliquam commodi aperiam, veritatis voluptates officiis
              nam delectus necessitatibus laboriosam, sit, mollitia consequuntur
              optio. Repellat vel, quibusdam officiis impedit labore sed?
            </div>
            <div className="chat-footer opacity-50 my-1">Delivered at 12:30</div>
          </div>
          <div className="chat chat-end">
            {/* <div className="chat-image avatar flex flex-col">
              <div className="w-10 rounded-full">
                <FontAwesomeIcon icon={faUser} />
              </div>
              <div className="chat-header">Bob David</div>
            </div> */}
            <div className="chat-bubble bg-gray-800 text-white">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Distinctio quos necessitatibus quod voluptatum sequi perspiciatis
              recusandae? Dolorum asperiores quidem in eveniet obcaecati nisi
              iste consequatur atque. Eveniet quasi ex cum!
            </div>
            <div className="chat-footer opacity-50 my-1">Seen at 12:46</div>
          </div>
        </div>
        <div className="mt-auto p-10">
          <TextInput />
        </div>
      </div>
    </>
  );
};

export default DisplayChat;
