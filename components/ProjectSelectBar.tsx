import React, { useEffect, useState } from 'react';
import { getSampleProjectData, getSampleEmployeeData } from '@/pages/analysis';
import { getProjectsByApi, getEmployeesByApi } from '@/pages/analysis';


// //OVERVIEW: Creates top bar containing two drop down menus to select employees and projects
// //Note: I think having an 'All Projects' option could turn out to be more trouble than it's worth.

// //Creates drop down menus
// //takes: an array of project names, an array of employee names

export function ProjectSelectBar(props: any) {
  const projects = props.projects.slice(1, props.projects.length);
  const selected_project = props.projects[0];

  let projectOptions = projects ? projects.map((project: any) => (
    <option value={project.id} key={project.id}>
      {project.name}
    </option>
  )) : [];

  // it gets called at the start before api calls work so we need to check if projects is empty
  // map works fine if empty but adding the default one wont.
  if (props.projects.length != 0) {
    projectOptions = [
      <option value={selected_project.id} key={selected_project.id} selected>
        {selected_project.name}
      </option>,
      ...projectOptions
    ];
  }
  
  const employeeOptions = props.employees ? props.employees.map((employee: any) => (
    <option value={employee.id} key={employee.id}>
      {employee.username}
    </option>
  )) : [];
  

  return (
    <div className="w-full h-16 flex flex-row">
      <div className="flex flex-row items-center p-2 rounded-md space-x-2 m-2 w-full">
        <select
        
          id="projectSelect"
          className="select w-64 bg-gray-300 text-black dark:text-white dark:bg-gray-800 hover:border-emerald-400 hover:border-2"
        >
          <option value="placeholder" disabled >
            Select project
          </option>
          {/* <option value="all">All</option> */}
          {projectOptions}
        </select>
        <select
        
          id="employeeSelect"
          className="select w-64 bg-gray-300 text-black dark:text-white dark:bg-gray-800 hover:border-emerald-400 hover:border-2"
        >
          <option value="placeholder" disabled >
            Select employee
          </option>
          <option value="all">All</option>
          {employeeOptions}
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


export default function ProjectSelectBarTile() {
  const [projectArray, setProjectArray] = useState<string[]>([]);
  const [employeeArray, setEmployeeArray] = useState<string[]>([]);

  useEffect(() => {
    fetchProjectAndEmployeeData();
  }, []);

  async function fetchProjectAndEmployeeData() {
    try {
      const sampleProjectData = await getProjectsByApi();
      const sampleEmployeeData = await getEmployeesByApi();

      if (Array.isArray(sampleProjectData.data) && Array.isArray(sampleEmployeeData.data)) {
        // const projects = sampleProjectData.data.map((project: projectType) => {project.name, project.id});
        // const employees = sampleEmployeeData.data.map((employee: employeeType) => {employee.username, employee.id});
        
        const projects = sampleProjectData.data;
        const employees = sampleEmployeeData.data;
      
        
        setProjectArray(projects);
        setEmployeeArray(employees);
      } else {
        console.error('Error fetching project and employee data: Data is not an array');
      }
    } catch (error) {
      console.error('Error fetching project and employee data:', error);
    }
  }

  return <ProjectSelectBar projects={projectArray} employees={employeeArray} />;
}

