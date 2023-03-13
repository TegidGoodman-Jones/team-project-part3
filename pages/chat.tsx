import jwt from "jsonwebtoken";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import $ from "jquery";
import DisplayChat from "@/components/DisplayChat";
import ViewChats from "@/components/ViewChats";

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
    <div className="flex">
      <div className="flex flex-col bg-blue-500">
        {/*insert side nav bar - Tegid and Isaac*/}
        <h1>helloo</h1>
      </div>
      <div className="flex shrink-0 basis-1/4 h-screen bg-gray-400">
        <ViewChats />
      </div>
      <div className="flex flex-col flex-1- h-screen bg-gray-300">
        <DisplayChat />
      </div>
    </div>
  );
}
