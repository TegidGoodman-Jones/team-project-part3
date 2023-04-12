import jwt from "jsonwebtoken";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import $ from "jquery";
import DisplayChat from "@/components/DisplayChat";
import ViewChats from "@/components/ViewChats";
import Sidebar from "@/components/Sidebar";
import Head from "next/head";
import Link from "next/link";

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
    <>
      <Head>
        <title>Chat</title>
        <meta name="description" content="Make it all | Dashboard" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/transparent_logo.png" />
      </Head>

    <div className="flex divide-x h-screen">
       < Sidebar />
       <div className="flex flex-col w-full h-full overflow-auto items-center flex-col justify-center bg-slate-100 dark:bg-gray-600  sm:ml-64 p-4">
<section className="pt-20 pb-12 lg:pt-[120px] lg:pb-[90px]">
  <div className="flex flex-col justify-center items-center mx-auto ">
    <div className="-mx-4 flex flex-wrap">
      <div className="w-full px-4">
        <div className="mx-auto mb-12 flex items-center flex-col justify-center text-center lg:mb-20 h-full">
        <img className="w-28 h-28 max-h-28 mb-12" src="transparent_logo.png" />
          <h2
            className="text-dark mb-4 text-3xl font-bold sm:text-4xl md:text-[40px]"
          >
            Make-It-All
          </h2>
          <p className="mb-12">
            Built by Group 21
          </p>
          <div className="btn-group">
  <button className="btn btn-success"><Link href="/dashboard" className="no-underline">Dashboard</Link></button>
  <button className="btn btn-primary"><Link href="/dashboard" className="no-underline">Productivity</Link></button>
  <button className="btn btn-secondary"><Link href="/dashboard" className="no-underline">Knowledge</Link></button>
  <button className="btn btn-accent"><Link href="/analysis" className="no-underline">Analytics</Link></button>
  <button className="btn btn-info"><Link href="/chat" className="no-underline">Chat</Link></button>
</div>
        </div>
        </div>
    
    </div>
  </div>
</section>

    </div>
    </div>
    </>
  );
}
