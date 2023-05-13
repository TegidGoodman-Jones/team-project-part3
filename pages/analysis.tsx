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
import $, { get } from "jquery";
import SidebarButton from "@/components/SidebarButton";
import { useCookies } from "react-cookie";

import ProjectDetailsProjectTile from "@/components/ProjectDetailsTile";
import ProjectSelectBarTile from "@/components/ProjectSelectBar";
import { ProjectTaskBreakdown } from "@/components/ProjectTaskBreakdownTile";
import { ProjectStatisticsTile } from "@/components/ProjectStatisticsTile";
import axios from "axios";

interface Project {
  id: number;
  name: string;
  description: string;
  deadline: string;
  leaderId: number;
  tasks: any[];
  users: any[];
}

export default function data() {
  const [userId, setUserId] = useState();
  const [cookies, setCookie] = useCookies(["token"]);
  const router = useRouter();

  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const getData = async () => {
      const projectData = await getProjectData();
      setProjects(projectData);
      console.log(projectData);
    };
    getData();
  }, []);

  const [currentProject, setCurrentProject] = useState(0);

  const [currentEmployee, setCurrentEmployee] = useState("All");

  useEffect(() => {
    const projectSelect = $("#projectSelect");
    projectSelect.on("change", function () {
      // handle project change
      // console.log("Project changed");
      // console.log($(this).val());
      const selectedProject = $(this).val();

      setCurrentProject(selectedProject);

      console.log(selectedProject);
    });

    const employeeSelect = $("#employeeSelect");
    employeeSelect.on("change", function () {
      // handle employee change
      // console.log("Emp changed");
      // console.log($(this).val());
      const selectedEmployee = $(this).val();
      if (selectedEmployee === undefined) {
        setCurrentEmployee("All");
      } else {
        setCurrentEmployee(selectedEmployee);
      }
    });

    setCurrentEmployee("all");

    // Cleanup event listeners when component unmounts
    return () => {
      projectSelect.off("change");
      employeeSelect.off("change");
    };
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
            <ProjectSelectBarTile
              projects={projects}
              currentProject={currentProject}
            />
            <div className=" w-full h-full">
              <div className=" w-full  max-h-72 flex flex-row">
                <ProjectDetailsProjectTile currentProject={currentProject} />

                <ProjectTaskBreakdown
                  currentProject={currentProject}
                  currentEmployee={currentEmployee}
                />
              </div>
              <ProjectStatisticsTile
                currentProject={currentProject}
                currentEmployee={currentEmployee}
              />
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

/* 
  NOTE FROM TEGID:
  You guys should probably look into using getServerSideProps() instead of useEffect() to fetch data from the API.
  Its generally just easier to use and you don't have to worry about useEffect() cuz it runs on the server.
  Here's the docs: https://nextjs.org/docs/pages/building-your-application/data-fetching/get-server-side-props
  If you want any help lmk
 */

async function getProjectData() {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/projects/`);
  return res.data.data;
}
