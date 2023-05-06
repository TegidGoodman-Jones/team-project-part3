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
import axios from "axios";

export default function data() {
  const [userId, setUserId] = useState();
  const [cookies, setCookie] = useCookies(["token"]);
  const router = useRouter();

  const sampleProjectDataFull = getSampleProjectData();
  const [currentProject, setCurrentProject] = useState("All");

  const [currentEmployee, setCurrentEmployee] = useState("All");

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
          setCurrentProject(
            $(this).find("option:selected").text()
          );
        });

    const employeeSelect = $("#employeeSelect");
    employeeSelect.on("change", function () {
      // handle employee change
      const selectedEmployee = $(this).val();
      setCurrentEmployee(
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

                <ProjectTaskBreakdownTile 
                currentProject={currentProject}
                currentEmployee={currentEmployee}/>
              </div>
              <ProjectStatisticsTile
              currentProject={currentProject}
              currentEmployee={currentEmployee}/>
            </div>
          </div>
        </div>
      </Sidebar>
    </>
  );
}

//SAMPLE DATA
  //Note: task data must be defined before project data so that task array can be included in project

// API CALL FUNCTIONS
 //async function getTasksByApi() {
  // return await axios.get(`http://localhost:3000/api/tasks/}`)
  //const res = await axios.get(`/api/tasks/`);
  //return res.data;
 //}

 //Gets all tasks
 export async function getTasksByApi() {
  return (await axios.get(`/api/tasks/`));
 }

//Gets all projects
   export async function getProjectsByApi() {
     return (await axios.get(`/api/projects/`));
   }

  //Gets all employees
   export async function getEmployeesByApi() {
     return (await axios.get(`/api/employees/`));
   }

//Gets project by projectId
   export async function getProjectByApi(projectId: string) {
     return (await axios.get(`/api/projects/` + projectId));
   }

//Gets employee by employeeId
 export async function getEmployeeTasksByApi(userId: string) {
     return (await axios.get(`/api/tasks/` + userId));
   }




  export function getSampleTaskData() {
    console.log("TEST API CALL : " + getTasksByApi());
    return (
      [
        {
          id: 1,
          name: "Design Chat",
          description: "Appearance of Chat Bot",
          status: "Completed",
          projectId: 1,
          employeeId: 1
        },
        {
          id: 2,
          name: "Gauge Interest",
          description: "Will affect how the bot responds",
          status: "Completed",
          projectId: 1,
          employeeId: 3
        },
        {
          id: 3,
          name: "Write Welcome Messages",
          description: "Friendly and inviting",
          status: "Review",
          projectId: 1,
          employeeId: 1
        },
        {
          id: 4,
          name: "Design Conversation Flow",
          description: "Flow and dialogue for the chatbot",
          status: "In-Progress",
          projectId: 1,
          employeeId: 2
        },
        {
          id: 5,
          name: "Publish User Guide",
          description: "Guide to using the chatbot",
          status: "Backlog",
          projectId: 1,
          employeeId: 3
        },
        {
          id: 6,
          name: "Create Accounts",
          description: "Social Media Accounts",
          status: "Completed",
          projectId: 2,
          employeeId: 2
        },
        {
          id: 7,
          name: "Schedule Posts",
          description: "Release in orderly fashion",
          status: "In Progress",
          projectId: 2,
          employeeId: 1
        },
        {
          id: 8,
          name: "Don't Get Cancelled",
          description: "Stay away from Twitter.com",
          status: "To-Do",
          projectId: 2,
          employeeId: 3,
        },
        {
          id: 9,
          name: "Engage with Followers",
          description: "If we have any",
          status: "Backlog",
          projectId: 2,
          employeeId: 3
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
          name: 'Chat Bot',
          description: 'Developing a chatbot for customer support',
          deadline: '30/06/2023',
          leaderId: 1,
          tasks: taskArray
        },
        {
          id: 2,
          name: 'Social Media Management',
          description: 'Develop Make-It-Alls brand using social media',
          deadline: '15/09/2023',
          leaderId: 2,
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
        name: "Suzanne Collins"
      },
      {
        id: 2,
        name: "Wilfred Owen"
      },
      {
        id: 3,
        name: "Jordan Peele"
      }
    ]
  )
}
