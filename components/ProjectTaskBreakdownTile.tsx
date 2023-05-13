import { getSampleEmployeeData, getSampleProjectData, getSampleTaskData } from "@/pages/analysis";
import { useEffect, useState } from "react";
import { getTasksByApi, getProjectsByApi, getEmployeesByApi } from "@/pages/analysis";
import { Title } from "@tremor/react";

//OVERVIEW: Creates scrollable list of employees with each of their designated tasks 

//Creates and displays the container with a card for each employee
//takes: array of employee objects, array of task objects
export function ProjectTaskBreakdownTile(props: any) {
  // if (props.employeeList == null) {
  //   return <div>Loading...</div>;
  // }

  let employeeList = props.employeeList;
  const taskList = props.taskList;

  for (let i = 0; i <= employeeList.length - 1; i++) {
    employeeList[i].tasks = [];

    for (let j = 0; j <= taskList.length - 1; j++) {
      if (employeeList[i].id == taskList[j].employeeId) {
        employeeList[i].tasks.push(taskList[j]);
      }
    }
  }

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'Backlog':
        return 'bg-gray-400';
      case 'To-Do':
        return 'bg-blue-400';
      case 'In Progress':
        return 'bg-yellow-400';
      case 'Review':
        return 'bg-purple-400';
      case 'Completed':
        return 'bg-green-400';
      default:
        return 'bg-gray-400';
    }
  };

  const allTaskBreakdown = props.employeeList.map((employeeBreakdown: any) => (
    <div id="employee-id" className="card shadow-md p-4 bg-base-200" key={employeeBreakdown.id}>
      <h1 id="employee-name" className="mb-2 text-base-content">
        {employeeBreakdown.username}
      </h1>
      <hr />
      <div id="employee-training" className="form-control space-y-2 mt-2">
        {employeeBreakdown.tasks.map((task: any) => (
          <label className="label cursor-pointer p-0 flex items-center" key={task.id}>
            <span className="label-text text-base-content">{task.name}</span>
            <div className="flex items-center ml-auto">
              <span
                className={`badge ${getStatusBadgeClass(task.status)}`}
              >
                {task.status}
              </span>
              <input
                type="checkbox"
                checked={task.status === 'Completed'}
                readOnly
                className="checkbox checkbox-sm ml-2"
              />
            </div>
          </label>
        ))}
      </div>
    </div>
  ));

  return (
    <div className="card flex flex-col shadow-md overflow-auto p-4 mx-4 w-1/2 bg-base-300 text-base-content">
                 <Title className="mb-2 text-2xl text-base-content">Task details</Title>

      <div className="overflow-auto space-y-5">{allTaskBreakdown}</div>
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

  // useEffect(() => {
  //   fetchData();
  // }, [props.currentEmployee, props.currentProject]);

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