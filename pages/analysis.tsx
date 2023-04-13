import {  Card, Title, DonutChart, Legend, BarChart, Flex, Text, ProgressBar } from "@tremor/react"
import Sidebar from "@/components/Sidebar";
import Head from "next/head";
import jwt from "jsonwebtoken";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import $ from "jquery";

export default function data(){
    const [userId, setUserId] = useState();
    const router = useRouter();
    useEffect(() => {
      const token = String(localStorage.getItem("token"));
      try {
        // json parse and stringify to please typescript
        let decoded = JSON.parse(
          JSON.stringify(jwt.verify(token, "your_jwt_secret"))
        );
        // set userId to state
        setUserId(decoded.userId);
        // change theme to user selected theme
        $("html").attr("data-theme", decoded.theme);
      } catch (e) {
        // if error with token send user to login page
       
        router.push("/login");
      }

        function ProjectChangeHandler (id : any, text : any) {
        console.log("ID: " + id + " Text: " + text);
        }

        function EmployeeChangeHandler (id : any, text : any) {
        console.log("ID: " + id + " Text: " + text);
        }

        function StatisticChangeHandler (id : any, text : any) {
        console.log("ID: " + id + " Text: " + text);
        }



      const projectSelect = $("#projectSelect");
      projectSelect.on("change", function () {
        // handle project change
        const selectedProject = $(this).val();
        ProjectChangeHandler(selectedProject, $(this).find("option:selected").text());
        });


      const employeeSelect = $("#employeeSelect");
        employeeSelect.on("change", function () {
            // handle employee change
            const selectedEmployee = $(this).val();
            EmployeeChangeHandler(selectedEmployee, $(this).find("option:selected").text());
        });


      const statisticSelect = $("#statisticSelect");
        statisticSelect.on("change", function () {
            // handle statistic change
            const selectedStatistic = $(this).val();
            StatisticChangeHandler(selectedStatistic, $(this).find("option:selected").text());
        });

    }, []);

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
    <>
        <Head>
            <title>Make-It-All | Analysis</title>
            <meta name="description" content="Make it all analytics page" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/transparent_logo.png" />
        </Head>
<div className="flex divide-x h-screen">
    < Sidebar />
    <div className="flex flex-col w-full h-full bg-slate-100 dark:bg-gray-600  sm:ml-64">
        <div className=' w-full h-16 flex flex-row '>
            <div className='flex flex-row items-center justify-center p-2 rounded-md bg-slate-100 dark:bg-gray-600 space-x-2 m-4 w-full '>
                <select id="projectSelect" className="select w-1/3 bg-gray-300 text-black dark:text-white dark:bg-gray-800 ">
                    <option value="placeholder" disabled selected>Project select</option>
                    <option value="all">All</option>
                    <option value="0" >Roofing - 5th Mane Street</option>
                    <option value="1">Parking lot - 4th South Street</option>
                    <option value="2">Conservatory - 3rd Dover Avenue</option>
                    <option value="3">Lounge Quote - Appt 1b Tall Appts</option>
                    <option value="4">Garden Remodel - Barclays Town Hall</option>
                </select>
                <select id="employeeSelect" className="select w-1/3 bg-gray-300 text-black dark:text-white dark:bg-gray-800 ">
                    <option value="placeholder" disabled selected>Employee select</option>
                    <option value="all">All</option>
                    <option value="0">Homer Ranger</option>
                    <option value="1">Marge Sarge</option>
                    <option value="2">Bart Chart</option>
                    <option value="3">Lisa Felecia</option>
                    <option value="4">Maggie Camie</option>
                </select>
                <select id="statisticSelect" className="select w-1/3 bg-gray-300 text-black dark:text-white dark:bg-gray-800 ">
                    <option value="placeholder" disabled selected>Statistic select</option>
                    <option value="project-stats">Project statistics</option>
                    <option value="task-stats">Task statistics</option>
                    <option value="training-stats">Training statistics</option>
                </select>
            </div>

        </div>
        <div className=' w-full h-full'>
            <div className=' w-full  max-h-72 flex flex-row'>
                <div id="project-card" className='dark:text-white flex flex-col shadow-md rounded-md  p-4 mx-4 w-1/2 bg-gray-300 text-black dark:bg-gray-700'>
                    <div className="flex flex-row justify-between"><span className="label-text dark:text-gray-400 text-black  mb-0">Title</span><span className="label-text text-black dark:text-gray-400 mb-0">Deadline</span></div>
                    <Title id="project-card-title" className="inline-flex flex-row justify-between mb-2"> Launder money <span className="text-emerald-400">24/11/2023</span></Title>
                    <hr/><br/>
                    <span className="label-text  dark:text-gray-400 text-black mt-2 mb-0">Description</span>
                    <p id="project-card-desc mt-0 ">

                        Launder all make-it-alls money, it's impossible to make it all so needs must.</p>
                    <span className="label-text text-black dark:text-white mt-2 mb-0">Leader</span>
                    <p id="project-card-leader mt-0">Project Leader</p>
                    <span className="label-text text-black dark:text-gray-400 mt-2 mb-0">Team</span>
                    <p id="project-card-team mt-0">Project Team</p>
                </div>

                <div id="employee-training-cards" className='dark:text-white flex flex-col shadow-md rounded-md overflow-auto   p-4 mx-4 w-1/2 bg-gray-300 text-black dark:bg-gray-700'>
                    <div className="overflow-auto p-2 space-y-5 ">
                        <div id="employee-id" className='shadow-md rounded-md p-4 bg-gray-200 dark:bg-gray-500'>
                            <h1 id="employee-name" className='mb-2'>Homer Ranger</h1>
                            <hr/>
                            <div id="employee-training" className="form-control space-y-2 mt-2">
                                <label className="label cursor-pointer p-0">
                                        <span className="label-text text-black dark:text-gray-400">Roofing</span> 
                                            <input type="checkbox" checked className="checkbox checkbox-sm" />
                                        </label>
                                <label className="label cursor-pointer p-0">
                                        <span className="label-text text-black dark:text-gray-400">Chainsaw</span> 
                                            <input type="checkbox" checked className="checkbox checkbox-sm" />
                                        </label>
                                <label className="label cursor-pointer p-0">
                                        <span className="label-text text-black dark:text-gray-400">Van driving</span> 
                                            <input type="checkbox"  className="checkbox checkbox-sm" />
                                        </label>
                            </div>

                        </div>
                        <div id="employee-id" className='shadow-md rounded-md p-4 bg-gray-200 dark:bg-gray-500'>
                            <h1 id="employee-name" className='mb-2'>Marge Sarge</h1>
                            <hr/>
                            <div id="employee-training" className="form-control space-y-2 mt-2">
                                <label className="label cursor-pointer p-0">
                                            <span className="label-text text-black dark:text-gray-400">Roofing</span> 
                                            <input type="checkbox" checked className="checkbox checkbox-sm" />
                                        </label>
                                <label className="label cursor-pointer p-0">
                                        <span className="label-text text-black dark:text-gray-400">Chainsaw</span> 
                                            <input type="checkbox" checked className="checkbox checkbox-sm" />
                                        </label>
                                <label className="label cursor-pointer p-0">
                                        <span className="label-text text-black dark:text-gray-400">Van driving</span> 
                                            <input type="checkbox"  className="checkbox checkbox-sm" />
                                        </label>
                            </div>

                        </div>

                        <div id="employee-id" className='shadow-md rounded-md p-4  bg-gray-200 dark:bg-gray-500'>
                            <h1 id="employee-name" className='mb-2'>Lisa Felecia</h1>
                            <hr/>
                            <div id="employee-training" className="form-control space-y-2 mt-2">
                                <label className="label cursor-pointer p-0">
                                        <span className="label-text text-black dark:text-gray-400">Roofing</span> 
                                            <input type="checkbox" checked className="checkbox checkbox-sm" />
                                        </label>
                                <label className="label cursor-pointer p-0">
                                        <span className="label-text text-black dark:text-gray-400">Chainsaw</span> 
                                            <input type="checkbox" checked className="checkbox checkbox-sm" />
                                        </label>
                                <label className="label cursor-pointer p-0">
                                        <span className="label-text text-black dark:text-gray-400">Van driving</span> 
                                            <input type="checkbox"  className="checkbox checkbox-sm" />
                                        </label>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
            <div className='flex flex-col shadow-md rounded-md dark:text-white bg-gray-300 dark:bg-gray-700 p-4 m-4 w-90%'>
                <div>
                    <Title className=" mb-2 dark:text-white text-black">Statistics</Title>
                    <hr/><br/>
                    <Flex>
                        <Text className="dark:text-white text-black">Tasks Complete &bull; {ProgressBarData}%</Text>
                    </Flex>
                    <ProgressBar className='p-4 w-1/2' percentageValue={ProgressBarData} color="blue" />

                    <Text className="dark:text-white text-black ">Task allocation</Text>

                    <Legend className='p-4' categories={[ "Backlog", "To-Do", "In Progress", "Review", "Completed"]} colors={[ "rose", "orange", "amber", "lime", "indigo"]} />
                    <div className='flex flex-row'>
                        <DonutChart data={kanbanPieData} category="value" index="name" variant="pie" colors={[ "rose", "orange", "amber", "lime", "indigo"]} />

                        <BarChart layout='vertical' data={taskBarData} index="name" categories={[ "Emp 1", "Emp 2", "Emp 3", "Emp 4", "Emp 5"]} showAnimation={false} colors={[ "indigo", "fuchsia", "amber", "yellow", "teal", "emerald"]}/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>   
         </>    
        )
    }
