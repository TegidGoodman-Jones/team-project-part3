import { getSampleEmployeeData, getSampleProjectData, getSampleTaskData } from "@/pages/analysisCopy";


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

export default function ProjectTaskBreakdown(){

    const employeeList = getSampleEmployeeData();
    const taskList = getSampleTaskData();
    

    return (
        <ProjectTaskBreakdownTile 
            employeeList={employeeList}
            taskList={taskList}/>
    )
}