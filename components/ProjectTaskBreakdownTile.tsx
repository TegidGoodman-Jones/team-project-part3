import { getSampleEmployeeData, getSampleProjectData, getSampleTaskData } from "@/pages/analysis";

//OVERVIEW: Creates scrollable list of employees with each of their designated tasks 

//Creates and displays the container with a card for each employee
//takes: array of employee objects, array of task objects
export function ProjectTaskBreakdownTile(props: any){
    let employeeList = props.employeeList;
    const taskList = props.taskList;

    for (let i=0; i<=employeeList.length -1; i++){
        employeeList[i].tasks = [];

        for (let j=0; j<=taskList.length -1; j++){
            if (employeeList[i].id == taskList[j].employeeId){
                employeeList[i].tasks.push(taskList[j].name)
            }
        }
    }
    
    const allTaskBreakdown = props.employeeList.map((employeeBreakdown: any) =>
    <div
        id="employee-id"
        className="shadow-md rounded-md p-4 bg-gray-200 dark:bg-gray-500"
    >
        <h1 id="employee-name" className="mb-2">
        {employeeBreakdown.name}
        </h1>
        <hr />
        <div
        id="employee-training"
        className="form-control space-y-2 mt-2"
        >
        {employeeBreakdown.tasks.map((task: String) =>
            <label className="label cursor-pointer p-0">
            <span className="label-text text-black dark:text-gray-400">
                {task}
            </span>
            <input
            type="checkbox"
            checked
            className="checkbox checkbox-sm"
            />
        </label>
        )}


        </div>
    </div>

    );

    return (
        <div
            id="employee-training-cards"
            className="dark:text-white flex flex-col shadow-md rounded-md overflow-auto   p-4 mx-4 w-1/2 bg-gray-300 text-black dark:bg-gray-700"
        >
            <div className="overflow-auto p-2 space-y-5 ">

                {allTaskBreakdown}
            
            </div>
        </div>
    )
}

//Fetches data and passes into component
export default function ProjectTaskBreakdown(props: any){

    const projectList = getSampleProjectData();
    console.log(projectList);
    const employeeList = getSampleEmployeeData();
    const taskList = getSampleTaskData();

    const currentEmployee = props.currentEmployee;
    const currentProjectName = props.currentProject;

    //Gets the ID of the project
    let currentProjectId;
    for (let i=0; i<=projectList.length -1; i++){
        if (projectList[i].name == currentProjectName){
            currentProjectId = projectList[i].id
        }
    }
    //Gets the ID and complete object of the employee
    let currentEmployeeId = -1;
    let filteredEmployeeList = employeeList
    for (let i=0; i<=employeeList.length -1; i++){
        if (employeeList[i].name == currentEmployee){
            currentEmployeeId = employeeList[i].id
            filteredEmployeeList = [employeeList[i]]
        }
    }

    let filteredTaskList = []
    if (currentProjectName == "All"){
        filteredTaskList = taskList
    }else{
        for (let i=0; i<=taskList.length -1; i++){
            if (taskList[i].projectId == currentProjectId){
                if (taskList[i].employeeId == currentEmployeeId || currentEmployeeId == -1){
                    filteredTaskList.push(taskList[i])
                }
            }
        }
    }


    

    return (
        <ProjectTaskBreakdownTile 
            employeeList={filteredEmployeeList}
            taskList={filteredTaskList}/>
    )
}