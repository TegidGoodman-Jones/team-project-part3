import jwt from "jsonwebtoken";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import $ from "jquery";
import DisplayChat from "@/components/DisplayChat";
import ViewChats from "@/components/ViewChats";
import Sidebar from "@/components/Sidebar";
import Head from "next/head";

export default function Chat() {
  const [userId, setUserId] = useState();
  const router = useRouter();
  useEffect(() => {
    const token = String(localStorage.getItem("token"));
    try {
      // json parse and stringify to please typescript
      let decoded = JSON.parse(
        JSON.stringify(jwt.verify(token, "your_jwt_secret"))
      );
      console.log(token)
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
        <div className="flex shrink-0 basis-1/4 h-screen dark:bg-gray-800 bg-gray-200 sm:ml-64">
          <ViewChats />
        </div>
        <div className="flex flex-col h-screen dark:bg-gray-700 bg-gray-300">
          <DisplayChat />
        </div>
      </div>
    </>
  );
}
