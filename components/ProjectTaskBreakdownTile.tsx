import { getSampleEmployeeData, getSampleProjectData, getSampleTaskData } from "@/pages/analysis";
import { useEffect, useState } from "react";
import { getTasksByApi, getProjectsByApi, getEmployeesByApi } from "@/pages/analysis";

//OVERVIEW: Creates scrollable list of employees with each of their designated tasks 

//Creates and displays the container with a card for each employee
//takes: array of employee objects, array of task objects
export function ProjectTaskBreakdownTile(props: any) {
    if (props.employeeList == null) {
        return <div>Loading...</div>;
    }

  let employeeList = props.employeeList;
  const taskList = props.taskList;

  for (let i = 0; i <= employeeList.length - 1; i++) {
    employeeList[i].tasks = [];

    for (let j = 0; j <= taskList.length - 1; j++) {
      if (employeeList[i].id == taskList[j].employeeId) {
        employeeList[i].tasks.push(taskList[j].name);
      }
    }
  }

  const allTaskBreakdown = props.employeeList.map((employeeBreakdown: any) => (
    <div
      id="employee-id"
      className="card shadow-md p-4 bg-base-200"
    >
      <h1 id="employee-name" className="mb-2 text-base-content">
        {employeeBreakdown.username}
      </h1>
      <hr />
      <div id="employee-training" className="form-control space-y-2 mt-2">
        {employeeBreakdown.tasks.map((task: String) => (
          <label className="label cursor-pointer p-0">
            <span className="label-text text-base-content">
              {task}
            </span>
            <input
              type="checkbox"
              checked
              className="checkbox checkbox-sm"
            />
          </label>
        ))}
      </div>
    </div>
  ));

  return (
    <div className="card flex flex-col shadow-md overflow-auto p-4 mx-4 w-1/2 bg-base-300 text-base-content">
      <div className="overflow-auto p-2 space-y-5">{allTaskBreakdown}</div>
    </div>
  );
}

type taskType = {
    id: number;
    name: string;
    description: string;
    projectId: number;
    employeeId: number;
    status: string;
  };
  
  type projectType = {
    id: number;
    name: string;
    description: string;
    deadline: string;
    leader: string;
    tasks: taskType[];
  };

  
//Fetches data and passes into component

// Fetches data and passes into component
export function ProjectTaskBreakdown(props: any) {
  const [filteredEmployeeList, setFilteredEmployeeList] = useState<any[]>([]);
  const [filteredTaskList, setFilteredTaskList] = useState<any[]>([]);

  useEffect(() => {
    fetchData();
  }, [props.currentEmployee, props.currentProject]);

  async function fetchData() {
    if (props.currentProject === "Placeholder") {
      setFilteredEmployeeList([]);
      setFilteredTaskList([]);
      return;
    }

    try {
      const [projectList, employeeList, taskList] = await Promise.all([
        getProjectsByApi(),
        getEmployeesByApi(),
        getTasksByApi(),
      ]);

      const currentEmployee = props.currentEmployee;
      const currentProjectId = props.currentProject;


      if (projectList != null && employeeList != null && taskList != null) {

        let filteredEmployeeList = [];
        let filteredTaskList = [];

        if ( currentEmployee == "all") {
            filteredEmployeeList = employeeList.data;
        } else {     filteredEmployeeList = employeeList.data.filter((employee: any) => employee.id == currentEmployee);
        }

        filteredTaskList = taskList.data.filter(
            (task: any) =>
              task.projectId == currentProjectId && (task.employeeId == currentEmployee || currentEmployee == "all")
          );
      setFilteredEmployeeList(filteredEmployeeList);
      setFilteredTaskList(filteredTaskList);
    } else {
        console.log("Error: No data");
    }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <ProjectTaskBreakdownTile employeeList={filteredEmployeeList} taskList={filteredTaskList} />
  );
}