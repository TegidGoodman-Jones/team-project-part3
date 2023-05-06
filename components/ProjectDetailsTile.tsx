import { getProjectByApi, getEmployeesByApi } from "@/pages/analysis";
import { Title } from "@tremor/react";

//OVERVIEW: Creates card containing all information of the currently selected project
    //name, description, deadline, project leader

type taskType = {
    id: number;
    name: string;
    description: string;
    projectId: number;
    employeeId: number
}

type projectType = {
    id: number;
    name: string;
    description: string;
    deadline: string;
    leader: String;
    tasks: taskType[]
};

//Creates the card containing the information
//takes: (one) project object
export function ProjectDetailsTile(props: projectType){
    return (
        <div
            id="project-card"
            className="dark:text-white flex flex-col shadow-md rounded-md  p-4 mx-4 w-1/2 bg-gray-300 text-black dark:bg-gray-700"
            >
            <div className="flex flex-row justify-between">
                <span className="label-text dark:text-gray-400 text-black  mb-0">
                    Title
                    </span>
                <span className="label-text text-black dark:text-gray-400 mb-0">
                    Deadline
                    </span>
                </div>
                <Title
                    id="project-card-title"
                    className="inline-flex flex-row justify-between mb-2"
                    >
                    {" "}
                        {props.name}{" "}
                    <span className="text-emerald-400">{props.deadline}</span>
                </Title>
            <hr />
            <br />
            <span className="label-text  dark:text-gray-400 text-black mt-2 mb-0">
                Description
            </span>
            <p id="project-card-desc mt-0 ">
                {props.description}
            </p>
            <span className="label-text text-black dark:text-gray-400 mt-2 mb-0">
                Leader
            </span>
            <p id="project-card-leader mt-0">{props.leader}</p>
        </div>
    )
}

//Fetches project data and selects the appropriate project + project leader
export default async function ProjectDetailsProjectTile(props: any) {

    //Name of project in drop down
    const currentProject = props.currentProject;
    //Returns project
    const projectData = await getProjectByApi(currentProject)
    const allEmployeeData = await getEmployeesByApi()

    //if no project leader is assigned, will display 'Team Led'
    let projectLeader = "Team Led";
    for (let i=0; i<=allEmployeeData.data.length -1; i++){
        if (projectData.data.leaderId == allEmployeeData.data[i].id){
            projectLeader = allEmployeeData.data[i].name;
        }
    }
    

    return (
        <ProjectDetailsTile 
            id={projectData.data.id}
            name={projectData.data.name}
            description={projectData.data.description}
            deadline={projectData.data.deadline}
            leader={projectLeader}
            tasks={projectData.data.tasks}/>
    )
}