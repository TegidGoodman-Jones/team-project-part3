import { useEffect } from "react";
import $ from "jquery";
import { decode, sign, verify } from "jsonwebtoken";
import {
  faCalendar,
  faBook,
  faChartPie,
  faComments,
  faRightFromBracket,
  faPalette,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import Cookies from "universal-cookie";

const Sidebar = (props: any) => {
  const cookies = new Cookies();
  const handleLogout = () => {
    cookies.remove("token");
    window.location.href = "/login";
  };

  const handleThemeChange = () => {
    let theme = $("html").attr("data-theme");
    let token = cookies.get("token");
    let decoded: any = decode(token);
    
    if (theme === "dark") {
      $("html").attr("data-theme", "light");
      decoded.theme = "light";
    } else {
      $("html").attr("data-theme", "dark");
      decoded.theme = "dark";
    }
    token = sign(decoded, "your_jwt_secret");
    cookies.set("token", token);
  };
  return (
    <div className="h-full max-h-full">
      <button
        data-drawer-target="default-sidebar"
        data-drawer-toggle="default-sidebar"
        aria-controls="default-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clip-rule="evenodd"
            fill-rule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      <aside
        id="default-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-full transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-auto bg-base-100">
          <div className="flex flex-row items-center justify-start mb-5 px-2">
            <img
              className="w-10 h-10 max-h-10 mr-5"
              src="/transparent_logo.png"
            />
            <h1 className="text-2xl font-bold text-primary">Make It All</h1>
          </div>
          <div className="flex flex-col justify-between h-max max-h-full">
            <ul className="space-y-2 font-medium min-h-full">
              <li className="group">
                <Link
                  href="/dashboard"
                  className="flex items-center p-2 text-base-content rounded hover:bg-base-200 no-underline"
                >
                  <svg
                    aria-hidden="true"
                    className="w-6 h-6 text-base-content transition duration-75 group-hover:text-primary"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                    <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
                  </svg>
                  <span className="ml-3">Dashboard</span>
                </Link>
              </li>
              <li className="group">
                <Link
                  href="/productivity"
                  className="flex items-center p-2 text-base-content rounded hover:bg-base-200 no-underline"
                >
                  <FontAwesomeIcon
                    icon={faCalendar}
                    className="w-6 h-6 text-base-content transition duration-75 group-hover:text-primary"
                  />
                  <span className="ml-3">Productivity</span>
                </Link>
              </li>
              <li className="group">
                <Link
                  href="/knowledge"
                  className="flex items-center p-2 text-base-content rounded hover:bg-base-200 no-underline"
                >
                  <FontAwesomeIcon
                    icon={faBook}
                    className="w-6 h-6 text-base-content transition duration-75 group-hover:text-primary"
                  />
                  <span className="ml-3">Knowledge</span>
                </Link>
              </li>

              <li className="group">
                <Link
                  href="/analysis"
                  className="flex items-center p-2 text-base-content rounded hover:bg-base-200 no-underline"
                >
                  <FontAwesomeIcon
                    icon={faChartPie}
                    className="w-6 h-6 text-base-content transition duration-75 group-hover:text-primary"
                  />
                  <span className="flex-1 ml-3 whitespace-nowrap">
                    Analytics
                  </span>
                </Link>
              </li>
              <li className="group">
                <Link
                  href="/chat"
                  className="flex items-center p-2 text-base-content rounded hover:bg-base-200 no-underline"
                >
                  <FontAwesomeIcon
                    icon={faComments}
                    className="w-6 h-6 text-base-content transition duration-75 group-hover:text-primary"
                  />
                  <span className="flex-1 ml-3 whitespace-nowrap">Chat</span>
                </Link>
              </li>
              <li
                className="group flex items-center p-2 text-base-content rounded hover:bg-base-200 no-underline cursor-pointer"
                onClick={handleThemeChange}
              >
                <FontAwesomeIcon
                  icon={faPalette}
                  className="w-6 h-6 text-base-content transition duration-75 group-hover:text-primary"
                />
                <span className="flex-1 ml-3 whitespace-nowrap">
                  Switch Theme
                </span>
              </li>
              <li
                className="group flex items-center p-2 text-base-content rounded hover:bg-base-200 no-underline"
                onClick={handleLogout}
              >
                <FontAwesomeIcon
                  icon={faRightFromBracket}
                  className="w-6 h-6 text-base-content transition duration-75 group-hover:text-primary"
                />
                <span className="flex-1 ml-3 whitespace-nowrap">Log out</span>
              </li>
            </ul>
            {/* Trying to make the logout justify to the bottom of the nav bar but a
         scroll bar keeps appearing ?  */}
            {/* <div className="group">
           <Link
             href="#"
             className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 no-underline"
           >
             <FontAwesomeIcon
               icon={faRightFromBracket}
               className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
             />
             <span className="flex-1 ml-3 whitespace-nowrap">Log out</span>
           </Link>
         </div> */}
          </div>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
