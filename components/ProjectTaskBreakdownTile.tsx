import { getSampleEmployeeData, getSampleProjectData, getSampleTaskData } from "@/pages/analysisCopy";

type breakdown = {
    employee: String,
    tasks: String[]
}

export function ProjectTaskBreakdownTile(props: any){

    const allTaskBreakdown = props.taskBreakdown.map((employeeBreakdown: breakdown) =>
    <div
        id="employee-id"
        className="shadow-md rounded-md p-4 bg-gray-200 dark:bg-gray-500"
    >
        <h1 id="employee-name" className="mb-2">
        {employeeBreakdown.employee}
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

    const taskBreakdown = [
        {
            employee: "Edward Hall",
            tasks: [
                "Intimidation",
                "Strength",
                "Eating"
            ],
        },
        {
            employee: "William Afton",
            tasks: [
                "Disappear Children",
                "Research",
                "Robotics"
            ]
        },
        {
            employee: "Benjamin Evans",
            tasks: [
                "Laser Eyes",
                "Mathematics",
                "Sharpshooter"
            ]
        }
    ]

    return (
        <ProjectTaskBreakdownTile 
            taskBreakdown={taskBreakdown}/>
    )
}