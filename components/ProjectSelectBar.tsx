import React, { useEffect, useState } from "react";
import { getSampleProjectData, getSampleEmployeeData } from "@/pages/analysis";
import { getProjectsByApi, getEmployeesByApi } from "@/pages/analysis";

// //OVERVIEW: Creates top bar containing two drop down menus to select employees and projects
// //Note: I think having an 'All Projects' option could turn out to be more trouble than it's worth.

// //Creates drop down menus
// //takes: an array of project names, an array of employee names

export function ProjectSelectBar(props: any) {
  const [employeeOptions, setEmployeeOptions] = useState<any>([]);
  const projects = props.projects.slice(1, props.projects.length);
  const selected_project = props.projects[0];

  useEffect(() => {
    if (props.projects && props.currentProject && props.currentProject !== 0) {
      const selectedProject = props.projects.filter(
        (project: any) => project.id === props.currentProject
      );
      console.log(props.projects);
    }
    console.log("bing")
  }, [props.currentProject]);

  let projectOptions = projects
    ? projects.map((project: any) => (
        <option
          className="bg-base-200 text-base-content"
          value={project.id}
          key={project.id}
        >
          {project.name}
        </option>
      ))
    : [];

  const defaultValue = selected_project ? selected_project.id : "";

  if (props.projects.length !== 0) {
    projectOptions = [
      <option
        className="bg-base-200 text-base-content"
        value={defaultValue}
        key={defaultValue}
      >
        {selected_project ? selected_project.name : "Select project"}
      </option>,
      ...projectOptions,
    ];
  }

  // const employeeOptions =
  //   props.projects.length > 0 &&
  //   props.currentProject !== 0 &&
  //   props.projects.filter(
  //     (project: any) => project.id === props.currentProject
  //   );
  // .users.map((employee: any) => (
  //   <option
  //     className="bg-base-200 text-base-content"
  //     value={employee.user.id}
  //     key={employee.user.id}
  //   >
  //     {employee.user.username}
  //   </option>
  // ));

  // const employeeOptions = props.projects
  //   ? props.employees.map((employee: any) => (
  //       <option className="bg-base-200 text-base-content" value={employee.id} key={employee.id}>
  //         {employee.username}
  //       </option>
  //     ))
  //   : [];

  return (
    <div className="w-full h-16 flex flex-row">
      <div className="flex flex-row items-center justify-between p-2 rounded-md space-x-2 m-2 w-full ">
        <select
          id="projectSelect"
          className="select w-64 bg-base-300 text-base-content hover:border-success hover:border-2"
          defaultValue={defaultValue}
        >
          <option className="bg-base-200 text-base-content" value="" disabled>
            {projects.length ? "Select project" : "No projects available"}
          </option>
          {projectOptions}
        </select>
        <select
          id="employeeSelect"
          className="select w-64 bg-base-300 text-base-content hover:border-success hover:border-2"
        >
          <option className="bg-base-200 text-base-content" value="" disabled>
            Select employee
          </option>
          <option className="bg-base-200 text-base-content" value="all">
            All
          </option>
          {/* {employeeOptions} */}
        </select>
      </div>
    </div>
  );
}

type projectType = {
  id: number;
  name: string;
  description: string;
  deadline: string;
  leader: string;
  tasks: taskType[];
};

type taskType = {
  id: number;
  name: string;
  description: string;
  projectId: number;
  employeeId: number;
  status: string;
};

export default function ProjectSelectBarTile(props: any) {
  const [projectArray, setProjectArray] = useState<string[]>([]);
  const [employeeArray, setEmployeeArray] = useState<string[]>([]);

  // useEffect(() => {
  //   fetchProjectAndEmployeeData();
  // }, []);

  async function fetchProjectAndEmployeeData() {
    try {
      const sampleProjectData = await getProjectsByApi();
      const sampleEmployeeData = await getEmployeesByApi();

      if (
        Array.isArray(sampleProjectData.data) &&
        Array.isArray(sampleEmployeeData.data)
      ) {
        // const projects = sampleProjectData.data.map((project: projectType) => {project.name, project.id});
        // const employees = sampleEmployeeData.data.map((employee: employeeType) => {employee.username, employee.id});

        const projects = sampleProjectData.data;
        const employees = sampleEmployeeData.data;
        console.log("PROJECTS", projects);

        setProjectArray(projects);
        setEmployeeArray(employees);
      } else {
        console.error(
          "Error fetching project and employee data: Data is not an array"
        );
      }
    } catch (error) {
      console.error("Error fetching project and employee data:", error);
    }
  }

  return (
    <ProjectSelectBar projects={props.projects} employees={employeeArray} />
  );
}
