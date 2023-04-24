import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import axios from "axios";
import { useRouter } from "next/router";

const EditChatModal = (props: any) => {
  const [chatName, setChatName] = useState("");
  const [chatDescription, setChatDescription] = useState("");
  const cookies = new Cookies();
  const router = useRouter();
  useEffect(() => {
    if (props.chat) {
      setChatName(props.chat.chat.name);
      setChatDescription(props.chat.chat.description);
    }
  }, [props.modal]);

  const saveChat = async () => {
    const payload = {
      token: cookies.get("token"),
      chatId: props.chat.chat.id,
      name: chatName,
      description: chatDescription,
    };
    const res = await axios.put(
      `${process.env.NEXT_PUBLIC_HOST}/api/chat`,
      payload
    );
    props.setModal(false);
    router.push(`/chat/${props.chat.chat.id}`);
  };

  const handleDelete = async () => {
    const payload = {
      token: cookies.get("token"),
      chatId: props.chat.chat.id,
    };
    const res = await axios.delete(`${process.env.NEXT_PUBLIC_HOST}/api/chat`, {
      data: payload,
    });
    props.setModal(false);
    router.push("/chat");
  };

  return (
    <>
      <div
        className={
          props.modal
            ? "modal modal-open modal-bottom sm:modal-middle"
            : "hidden"
        }
      >
        <div className="modal-box flex flex-col space-y-2 bg-gray-300 text-black h-fit dark:text-white dark:bg-gray-800 justify-between">
          <div className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Chat Name"
              className="input input-bordered w-full border-gray-600 bg-gray-600"
              value={chatName}
              onChange={(e) => setChatName(e.target.value)}
            />
            <textarea
              className="textarea textarea-bordered w-full border-gray-600 bg-gray-600"
              placeholder="Description"
              value={chatDescription || ""}
              onChange={(e) => setChatDescription(e.target.value)}
            ></textarea>
          </div>
          <div className="modal-action">
            <button
              id="createChatBtn"
              className="btn btn-success h-4"
              onClick={saveChat}
            >
              Save
            </button>
            <button
              id="cancelBtn"
              className="btn h-4  bg-gray-200 border-gray-200 text-black dark:text-white dark:border-gray-600 dark:bg-gray-600 dark:hover:bg-gray-600 hover:bg-gray-200 "
              onClick={() => props.setModal(false)}
            >
              Cancel
            </button>
            <button className="btn h-4 btn-error" onClick={handleDelete}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditChatModal;
