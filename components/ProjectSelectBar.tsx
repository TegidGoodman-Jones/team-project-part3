import { getSampleProjectData, getSampleTaskData, getSampleEmployeeData } from "@/pages/analysis";

//OVERVIEW: Creates top bar containing two drop down menus to select employees and projects
//Note: I think having an 'All Projects' option could turn out to be more trouble than it's worth.

//Creates drop down menus
//takes: an array of project names, an array of employee names
export function ProjectSelectBar(props: any){

  const projectOptions = props.projects.map((project: String) => 
    <option value={props.projects.indexOf(project)}>{project}</option>
  );
  const employeeOptions = props.employees.map((employee: String) => 
    <option value={props.employees.indexOf(employee)}>{employee}</option>
  );

  return(
  <div className=" w-full h-16 flex flex-row ">
    <div className="flex flex-row items-center justify-between p-2 rounded-md bg-slate-100 dark:bg-gray-600 space-x-2 m-4 w-full ">
      <select
        id="projectSelect"
        className="select w-1/3 bg-gray-300 text-black dark:text-white dark:bg-gray-800"
      >
        <option value="placeholder" disabled selected>
          Project select
        </option>
        <option value="all">All</option>
        {projectOptions}

      </select>
      <select
        id="employeeSelect"
        className="select w-1/3 bg-gray-300 text-black dark:text-white dark:bg-gray-800"
      >
        <option value="placeholder" disabled selected>
          Employee select
        </option>
        <option value="all">All</option>
        {employeeOptions}
      </select>
    </div>
  </div>
  )
}

//Fetches and maps data to the correct format to be passed as props
export default function ProjectSelectBarTile(){
 
const sampleProjectData = getSampleProjectData();
const sampleEmployeeData = getSampleEmployeeData();


  const projectArray = sampleProjectData.map((project) => 
    project.name
  );

    const employeeArray = sampleEmployeeData.map((employee) => 
    employee.name
  );
 

  return (
    <ProjectSelectBar
      projects={projectArray}
      employees={employeeArray}/>
    )
}