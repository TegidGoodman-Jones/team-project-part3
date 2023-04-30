import { getSampleEmployeeData, getSampleProjectData } from "@/pages/analysisCopy";
import { Title } from "@tremor/react";

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
    leaderId: number;
    tasks: taskType[]
};

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
                    <span className="label-text text-black dark:text-white mt-2 mb-0">
                    Leader
                    </span>
                    <p id="project-card-leader mt-0">{props.leaderId}</p>
        </div>
    )
}

export default function ProjectDetailsProjectTile() {
    const sampleProjectDataFull = getSampleProjectData();
    //Sample data only contains one project so this will work for now
    let sampleProjectData = sampleProjectDataFull[0];

    return (
        <ProjectDetailsTile 
            id={sampleProjectData.id}
            name={sampleProjectData.name}
            description={sampleProjectData.description}
            deadline={sampleProjectData.deadline}
            leaderId={sampleProjectData.leaderId}
            tasks={sampleProjectData.tasks}/>
    )
}