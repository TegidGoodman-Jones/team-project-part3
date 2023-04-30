import {
    Card,
    Title,
    DonutChart,
    Legend,
    BarChart,
    Flex,
    Text,
    ProgressBar,
  } from "@tremor/react";


export function ProjectStats(props: any){

    return (
        <div className="flex flex-col shadow-md rounded-md dark:text-white bg-gray-300 dark:bg-gray-700 p-4 m-4 w-90% h-1/2">
        <Title className=" mb-2 dark:text-white text-black">
            Statistics
        </Title>
        <hr />
        <br />

        <Flex>
            <Text className="dark:text-white text-black">
            Tasks Complete &bull; {props.progressBarData}%
            </Text>
        
        </Flex>
        <ProgressBar
            className="w-full h-1/2"
            percentageValue={props.progressBarData}
            color="blue"
        />

        <Title className="dark:text-white text-black ">
            Task allocation
        </Title>
            <div className="h-full flex flex-row">
                <DonutChart
                data={props.kanbanPieData}
                category="value"
                index="name"
                variant="pie"
                colors={["rose", "orange", "amber", "lime", "indigo"]}
                />
                <BarChart
                layout="vertical"
                data={props.taskBarData}
                index="name"
                categories={["Emp 1", "Emp 2", "Emp 3", "Emp 4", "Emp 5"]}
                showAnimation={false}
                showLegend={false}
                colors={[
                    "indigo",
                    "fuchsia",
                    "amber",
                    "yellow",
                    "teal",
                    "emerald",
                ]}
                />
            </div>
        </div>
    )}

    export default function ProjectStatisticsTile() {
        const progressBarData = 60

        const kanbanPieData = [
            {
              name: "Backlog",
              value: 17,
            },
            {
              name: "To-Do",
              value: 24,
            },
            {
              name: "In Progress",
              value: 32,
            },
            {
              name: "Review",
              value: 11,
            },
            {
              name: "Completed",
              value: 21,
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
            },
          ];

          return(
            <ProjectStats 
            progressBarData={progressBarData}
            kanbanPieData={kanbanPieData}
            taskBarData={taskBarData}/>
          )
    }