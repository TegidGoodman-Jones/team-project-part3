import jwt from "jsonwebtoken";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import $ from "jquery";
import DisplayChat from "@/components/DisplayChat";
import ViewChats from "@/components/ViewChats";
import Sidebar from "@/components/Sidebar";
import Head from "next/head";
import axios from "axios";
import Cookies from "universal-cookie";

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

const Chat: FC<Chats> = ({ chats }) => {
  const [userId, setUserId] = useState(0);
  const router = useRouter();
  const cookies = new Cookies();
  useEffect(() => {
    const token = String(cookies.get("token"));
    try {
      // json parse and stringify to please typescript
      let decoded = JSON.parse(
        JSON.stringify(jwt.verify(token, "your_jwt_secret"))
      );
      console.log(token);
      // set userId to state
      setUserId(decoded.userId);
      // change theme to user selected theme
      $("html").attr("data-theme", decoded.theme);
    } catch (e) {
      // if error with token send user to login page

      router.push("/login");
    }
  }, []);

  return (
    <>
      <Head>
        <title>Chat</title>
        <meta name="description" content="Make it all chat page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/transparent_logo.png" />
      </Head>

      <div className="flex divide-x h-screen">
        <Sidebar />
        <div className="flex shrink-0 basis-1/4 h-screen bg-base-100 sm:ml-64">
          <ViewChats chats={chats} userId={userId} />
        </div>
        <div className="flex flex-col h-screen bg-base-100 flex-grow">
          <DisplayChat chat={null} userId={userId} textInputStatus={false} />
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps(context: any) {
  const token = String(context.req.cookies.token);
  try {
    // json parse and stringify to please typescript
    jwt.verify(token, "your_jwt_secret");
    const res = await axios.get(`${process.env.HOST}/api/chats`, {
      params: { token },
    });
    return {
      props: {
        chats: res.data.data,
      },
    };
  } catch (e) {
    // if error with token send user to login page

    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
}

export default Chat;