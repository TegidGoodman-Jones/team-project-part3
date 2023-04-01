import {  Card, Title, DonutChart, Legend, BarChart, Flex, Text, ProgressBar } from "@tremor/react"

export default function data(){
    const ProgressBarData = 65

    const kanbanPieData = [
        {
            name: "Backlog",
            value: 12,
        },
        {
            name: "To-Do",
            value: 31,
        },
        {
            name: "In Progress",
            value: 25,
        },
        {
            name: "Review",
            value: 8,
        },
        {
            name: "Completed",
            value: 40,
        },
    ];

    const taskBarData = [
        {
            topic: "Task Assignment",
            "Emp 1": 3,
            "Emp 2": 5,
            "Emp 3": 2,
            "Emp 4": 4,
            "Emp 5": 6,
        }
    ];

        return(
            <div className="flex flex-row w-full h-screen bg-slate-100">
                <div className="flex bg-blue-800 w-[120px] h-full"></div>
                    <div className=' w-full h-2/3'>
                        <div className=' w-full h-1/3 flex flex-row'>
                            <div className='flex flex-col shadow-md rounded-md bg-white p-8 m-4 w-1/2'>
                                <Title>Project Name</Title><hr/><br/>
                                <p>Project Deadline</p>
                                <p>Project Leader</p>
                                <p>Project Team</p>
                            </div>

                            <div className='flex flex-col shadow-md rounded-md bg-white p-8 m-4 w-1/2 overflow-y-auto'>
                                <Title className='mb-2'>Suggested Training</Title>
                                <div className='shadow-md rounded-md p-4 bg-slate-100'>
                                    <h1>Employee</h1>
                                    <p>Suggested Training</p>

                                </div>

                            </div>
                        </div>
                        <div className='flex flex-col shadow-md rounded-md bg-white p-8 m-4 w-90%'>
                            <div>
                                <Title>Project Overview</Title><hr/><br/>
                                <Flex>
                                    <Text>Tasks Complete &bull; {ProgressBarData}</Text>
                                </Flex>
                                <ProgressBar
                                className='p-4 w-1/2'
                                percentageValue={ProgressBarData}
                                color="blue"
                                />

                                <Title>Task Allocation</Title>
                                <Legend
                                    className='p-4'
                                    categories={["Backlog", "To-Do", "In Progress", "Review", "Completed"]}
                                    colors={["rose", "orange", "amber", "lime", "indigo"]}
                                    />
                                <div className='flex flex-row'>
                                    <DonutChart
                                        data={kanbanPieData}
                                        category="value"
                                        index="name"
                                        variant="pie"
                                        colors={["rose", "orange", "amber", "lime", "indigo"]}
                                        />

                                    <BarChart 
                                        layout='vertical'
                                        data={taskBarData}
                                        index="name"
                                        categories={["Emp 1", "Emp 2", "Emp 3", "Emp 4", "Emp 5"]}
                                        showAnimation={false}
                                        colors={["indigo", "fuchsia", "amber", "yellow", "teal", "emerald"]}/>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>          
        )
    }
