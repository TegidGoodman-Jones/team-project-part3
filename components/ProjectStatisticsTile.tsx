// import { getSampleEmployeeData, getSampleTaskData, getSampleProjectData } from "@/pages/analysis";
// import {
//     Card,
//     Title,
//     DonutChart,
//     Legend,
//     BarChart,
//     Flex,
//     Text,
//     ProgressBar,
//   } from "@tremor/react";

// //OVERVIEW: Calculates data for and creates the card containing a pie chart and bar graph

// //Draws the elements to the screen
// //Takes: data for the progress bar, pie chart and bar chart as input
// export function ProjectStats(props: any){

//     return (
//         <div className="flex flex-col shadow-md rounded-md dark:text-white bg-gray-300 dark:bg-gray-700 p-4 m-4 w-90% h-1/2">
//         <Title className=" mb-2 dark:text-white text-black">
//             Statistics
//         </Title>
//         <hr />
//         <br />
        
//         <Flex>
//             <Text className="dark:text-white text-black">
//             Tasks Complete &bull; {props.progressBarData}%
//             </Text>
        
//         </Flex>
//         <ProgressBar
//             className="w-full"
//             percentageValue={props.progressBarData}
//             color="blue"
//         />

//         <Title className="dark:text-white text-black ">
//             Task allocation
//         </Title>
//             <div className="h-full flex flex-row">
//                 <DonutChart
//                 data={props.kanbanPieData}
//                 category="value"
//                 index="name"
//                 variant="pie"
//                 colors={["rose", "orange", "amber", "lime", "indigo"]}
//                 />
//                 <BarChart
//                 layout="vertical"
//                 data={props.taskBarData}
//                 index="employee"
//                 categories={["tasks"]}
//                 showAnimation={false}
//                 showLegend={false}
//                 colors={[
//                     "indigo",
//                     "fuchsia",
//                     "amber",
//                     "yellow",
//                     "teal",
//                     "emerald",
//                 ]}
//                 />
//             </div>
//         </div>
//     )}

//     //Gathers and formats data used to display the graphs on the card then creates the component
//     export default async function ProjectStatisticsTile(props: any) {
//       if (props.currentProject == null || props.currentEmployee == null){
//         return (<div></div>);
//       }

//       const taskList = await getSampleTaskData();
//       const employeeList = await getSampleEmployeeData();
//       const projectList = await getSampleProjectData();


//     const currentEmployee = props.currentEmployee;
//     const currentProjectName = props.currentProject;

//     //Gets the ID of the project
//     let currentProjectId;
//     for (let i=0; i<=projectList.length -1; i++){
//         if (projectList[i].name == currentProjectName){
//             currentProjectId = projectList[i].id
//         }
//     }
//     //Gets the ID and complete object of the employee
//     let currentEmployeeId = -1;
//     let filteredEmployeeList = employeeList
//     for (let i=0; i<=employeeList.length -1; i++){
//         if (employeeList[i].name == currentEmployee){
//             currentEmployeeId = employeeList[i].id
//             filteredEmployeeList = [employeeList[i]]
//         }
//     }

//     let filteredTaskList = []
//     if (currentProjectName == "All"){
//       filteredTaskList = taskList
//     }else{
//       for (let i=0; i<=taskList.length -1; i++){
//           if (taskList[i].projectId == currentProjectId){
//               if (taskList[i].employeeId == currentEmployeeId || currentEmployeeId == -1){
//                   filteredTaskList.push(taskList[i])
//               }
//           }
//       }
//     }

//       let backlogTaskCount = 0,
//         toDoTaskCount = 0,
//         inProgTaskCount = 0,
//         reviewTaskCount = 0,
//         completedTaskCount = 0;

//       for (let i=0; i<= filteredTaskList.length -1; i++){
//         switch(filteredTaskList[i].status){
//           case "Backlog":
//             backlogTaskCount ++;
//             break;
//           case "To-Do":
//             toDoTaskCount ++;
//             break;
//           case "In Progress":
//             inProgTaskCount ++;
//             break;
//           case "Review":
//             reviewTaskCount ++;
//             break;
//           case "Completed":
//             completedTaskCount ++;
//             break;
//         }
//       }

//         const progressBarData = (completedTaskCount / taskList.length) * 100

//         const kanbanPieData = [
//             {
//               name: "Backlog",
//               value: backlogTaskCount,
//             },
//             {
//               name: "To-Do",
//               value: toDoTaskCount,
//             },
//             {
//               name: "In Progress",
//               value: inProgTaskCount,
//             },
//             {
//               name: "Review",
//               value: reviewTaskCount,
//             },
//             {
//               name: "Completed",
//               value: completedTaskCount,
//             },
//           ];

//           let barChartData = []
//           let employeeNames = []
//           for (let i=0; i<=filteredEmployeeList.length -1; i++){
//             barChartData.push({
//               employee: filteredEmployeeList[i].name,
//               tasks: 0
//           });
//             employeeNames.push(filteredEmployeeList[i].name)
      
//             for (let j=0; j<=filteredTaskList.length -1; j++){
//               if (filteredEmployeeList[i].id == filteredTaskList[j].employeeId){
//                 barChartData[i].tasks ++;
//               }
//             }
//           }
  

//           return(
//             <ProjectStats 
//             progressBarData={progressBarData}
//             kanbanPieData={kanbanPieData}
//             taskBarData={barChartData}
//             taskBarCategories={employeeNames}/>
//           )
//     }

// import { getSampleEmployeeData, getSampleTaskData, getSampleProjectData } from "@/pages/analysis";
import { Card, Title, DonutChart, Legend, BarChart, Flex, Text, ProgressBar } from "@tremor/react";
import { useEffect, useState } from "react";
import { getTasksByApi, getEmployeesByApi, getProjectsByApi } from "@/pages/analysis";

// OVERVIEW: Calculates data for and creates the card containing a pie chart and bar graph

// Draws the elements to the screen
// Takes: data for the progress bar, pie chart and bar chart as input
export function ProjectStats(props: any) {
  return (
    <div className="card flex flex-col shadow-md text-base-content bg-base-300  p-4 m-4 w-90% h-1/2">
      <Title className="mb-2  text-base-content">Statistics</Title>
      <hr />
      <br />
      <Flex>
        <Text className="text-base-content">
          Tasks Complete &bull; {props.progressBarData}%
        </Text>
      </Flex>
      <ProgressBar
        className="w-full"
        percentageValue={props.progressBarData}
        color="blue"
      />

      <Title className="text-base-context">Task allocation</Title>
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
  );
}






// Gathers and formats data used to display the graphs on the card then creates the component
export function ProjectStatisticsTile(props: any) {
  const [loading, setLoading] = useState(true);
  // const [finalProjectList, setProjectList] = useState<any[]>([]);
  // const [finalEmployeeList, setEmployeeList] = useState<any[]>([]);
  // const [finalTaskList, setTaskList] = useState<any[]>([]);

  const [finalKanbanPieData, setKanbanPieData] = useState<any[]>([]);
  const [finalTaskBarData, setTaskBarData] = useState<any[]>([]);
  const [finalProgressBarData, setProgressBarData] = useState<number>();
  const [finalEmployeeNames, setEmployeeNames] = useState<any[]>([]);

  useEffect(() => {
    fetchData();
  }, [props.currentEmployee, props.currentProject]);

  async function fetchData() {
    try {

      const [projectList, employeeList, taskList] = await Promise.all([
        getProjectsByApi(),
        getEmployeesByApi(),
        getTasksByApi(),
      ]);


      // if (loading || props.currentProject == null || props.currentEmployee == null) {
      //   return <div>Loading...</div>;
      // }
    
      const currentEmployee = props.currentEmployee;
      const currentProjectId = props.currentProject;
    

      let filteredEmployeeList = [];
      let filteredTaskList = [];
      let currentEmployeeId = -1;
      if ( currentEmployee == "all") {
        filteredEmployeeList = employeeList.data;
    } else {     filteredEmployeeList = employeeList.data.filter((employee: any) => employee.id == currentEmployee);
    }

      
            // for (let i=0; i<=taskList.length -1; i++){
            //     if (taskList[i].projectId == currentProjectId){
            //         if (taskList[i].employeeId == currentEmployeeId || currentEmployeeId == -1){
            //             filteredTaskList.push(taskList[i])
            //         }
            //     }
            // }

            filteredTaskList = taskList.data.filter(
              (task: any) =>
                task.projectId == currentProjectId && (task.employeeId == currentEmployee || currentEmployee == "all")
            );

   
      
            let backlogTaskCount = 0,
              toDoTaskCount = 0,
              inProgTaskCount = 0,
              reviewTaskCount = 0,
              completedTaskCount = 0;
      
            for (let i=0; i<= filteredTaskList.length -1; i++){
              switch(filteredTaskList[i].status){
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

      
              const progressBarData = (completedTaskCount / taskList.data.length) * 100;
 
      
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
                for (let i=0; i<=filteredEmployeeList.length -1; i++){
                  barChartData.push({
                    employee: filteredEmployeeList[i].username,
                    tasks: 0
                });
                  employeeNames.push(filteredEmployeeList[i].username)
            
                  for (let j=0; j<=filteredTaskList.length -1; j++){
                    if (filteredEmployeeList[i].id == filteredTaskList[j].employeeId){
                      barChartData[i].tasks ++;
                    }
                  }
                }



        

      setKanbanPieData(kanbanPieData);
      setTaskBarData(barChartData);
      setProgressBarData(progressBarData);
      setEmployeeNames(employeeNames);

      // setProjectList(projectList);
      // setEmployeeList(employeeList);
      // setTaskList(taskList);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

    
  
            return (
              <ProjectStats
                progressBarData={finalProgressBarData}
                kanbanPieData={finalKanbanPieData}
                taskBarData={finalTaskBarData}
                taskBarCategories={finalEmployeeNames}
              />
            );
          }