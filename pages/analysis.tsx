import {
  Card,
  Title,
  DonutChart,
  Legend,
  BarChart,
  Flex,
  Text,
  ProgressBar,
} from "@tremor/react";
import Sidebar from "@/components/Sidebar";
import Head from "next/head";
import jwt from "jsonwebtoken";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import $ from "jquery";
import SidebarButton from "@/components/SidebarButton";
import { useCookies } from "react-cookie";

import ProjectDetailsProjectTile from "@/components/ProjectDetailsTile";
import ProjectSelectBarTile from "@/components/ProjectSelectBar";
import ProjectTaskBreakdownTile from "@/components/ProjectTaskBreakdownTile";
import ProjectStatisticsTile from "@/components/ProjectStatisticsTile";

export default function data() {
  const [userId, setUserId] = useState();
  const [cookies, setCookie] = useCookies(["token"]);
  const router = useRouter();

  const sampleProjectDataFull = getSampleProjectData();
  const [currentProject, setCurrent] = useState(sampleProjectDataFull[0].name);

  useEffect(() => {
    /*
    const token = String(cookies.token);
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
    */
   /*
    function ProjectChangeHandler(id: any, text: any) {
      console.log("ID: " + id + " Text: " + text);
    }
    */

    const projectSelect = $("#projectSelect");
        projectSelect.on("change", function () {
          // handle project change
          const selectedProject = $(this).val();
          setCurrent(
            $(this).find("option:selected").text()
          );
        });

    function EmployeeChangeHandler(id: any, text: any) {
      console.log("ID: " + id + " Text: " + text);
    }

    const employeeSelect = $("#employeeSelect");
    employeeSelect.on("change", function () {
      // handle employee change
      const selectedEmployee = $(this).val();
      EmployeeChangeHandler(
        selectedEmployee,
        $(this).find("option:selected").text()
      );
    });
  }, []);

  

  return (
    <>
      <Head>
        <title>Make-It-All | Analysis</title>
        <meta name="description" content="Make it all analytics page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/transparent_logo.png" />
      </Head>
      <Sidebar>
        <div className="flex h-screen">
          <div className="flex lg:hidden flex-grow-0 h-full p-2">
            <SidebarButton />
          </div>

          <div className="flex flex-col w-full h-full bg-base-100">
              <ProjectSelectBarTile/>
            <div className=" w-full h-full">
              <div className=" w-full  max-h-72 flex flex-row">
                
                <ProjectDetailsProjectTile 
                currentProject={currentProject}/>

                <ProjectTaskBreakdownTile />
              </div>
              <ProjectStatisticsTile/>
            </div>
          </div>
        </div>
      </Sidebar>
    </>
  );
}

//SAMPLE DATA
  //Note: task data must be defined before project data so that task array can be included in project
  export function getSampleTaskData() {
    return (
      [
        {
          id: 1,
          name: "General Crime",
          description: "Nothing too illegal, just the obvious stuff.",
          status: "Completed",
          projectId: 1,
          employeeId: 1
        },
        {
          id: 2,
          name: "Rob a Bank",
          description: "Spread the money through the streets",
          status: "In Progress",
          projectId: 1,
          employeeId: 1
        },
        {
          id: 3,
          name: "Cybercrime",
          description: "My personal favourite",
          status: "Review",
          projectId: 1,
          employeeId: 2
        },
        {
          id: 4,
          name: "Kidnapping",
          description: "Okay this got a little dark.",
          status: "Backlog",
          projectId: 1,
          employeeId: 3
        },
        {
          id: 5,
          name: "Cover Up",
          description: "Someone's got to do it",
          status: "In Progress",
          projectId: 1,
          employeeId: 2
        }
      ]
    )
  }

  export function getSampleProjectData() {
    const taskArray = getSampleTaskData()
    return (
      [
        {
          id: 1,
          name: "Launder Money",
          description: "Launder all of Make-it-all's revenue because clearly the company is incompetent.",
          deadline: "06/05/2023",
          leaderId: 2,
          tasks: taskArray

        },
        {
          id: 2,
          name: "Stay Hydrated",
          description: "Don't Die-drate, Hydrate!",
          deadline: "01/05/2023",
          leaderId: 3,
          tasks: taskArray
        }
      ]
    )
  }

export function getSampleEmployeeData() {
  return (
    [
      {
        id: 1,
        name: "Edward Hall"
      },
      {
        id: 2,
        name: "Benjamin Evans"
      },
      {
        id: 3,
        name: "William Afton"
      }
    ]
  )
}
