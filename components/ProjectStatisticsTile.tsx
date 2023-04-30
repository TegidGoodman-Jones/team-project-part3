import { getSampleEmployeeData, getSampleTaskData } from "@/pages/analysis";
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

//OVERVIEW: Calculates data for and creates the card containing a pie chart and bar graph

//Draws the elements to the screen
//Takes: data for the progress bar, pie chart and bar chart as input
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
                index="employee"
                categories={["tasks"]}
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

    //Gathers and formats data used to display the graphs on the card then creates the component
    export default function ProjectStatisticsTile() {

      const taskList = getSampleTaskData();
      const employeeList = getSampleEmployeeData();

      let backlogTaskCount = 0,
        toDoTaskCount = 0,
        inProgTaskCount = 0,
        reviewTaskCount = 0,
        completedTaskCount = 0;

      for (let i=0; i<= taskList.length -1; i++){
        switch(taskList[i].status){
          case "Backlog":
            backlogTaskCount ++;
            break;
          case "To-Do":
            toDoTaskCount ++;
            break;
          case "In Progress":
            inProgTaskCount ++;
            break;
          case "Review":
            reviewTaskCount ++;
            break;
          case "Completed":
            completedTaskCount ++;
            break;
        }
      }

        const progressBarData = (completedTaskCount / taskList.length) * 100

        const kanbanPieData = [
            {
              name: "Backlog",
              value: backlogTaskCount,
            },
            {
              name: "To-Do",
              value: toDoTaskCount,
            },
            {
              name: "In Progress",
              value: inProgTaskCount,
            },
            {
              name: "Review",
              value: reviewTaskCount,
            },
            {
              name: "Completed",
              value: completedTaskCount,
            },
          ];

          let barChartData = []
          let employeeNames = []
          for (let i=0; i<=employeeList.length -1; i++){
            barChartData.push({
              employee: employeeList[i].name,
              tasks: 0
          });
            employeeNames.push(employeeList[i].name)
      
            for (let j=0; j<=taskList.length -1; j++){
              if (employeeList[i].id == taskList[j].employeeId){
                barChartData[i].tasks ++;
                console.log(barChartData[i]);
              }
            }
          }
  

          return(
            <ProjectStats 
            progressBarData={progressBarData}
            kanbanPieData={kanbanPieData}
            taskBarData={barChartData}
            taskBarCategories={employeeNames}/>
          )
    }