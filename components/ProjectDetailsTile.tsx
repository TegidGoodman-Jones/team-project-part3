import React, { useEffect, useState } from "react";
import { getProjectByApi, getEmployeesByApi } from "@/pages/analysis";
import { Title } from "@tremor/react";

type taskType = {
  id: number;
  name: string;
  description: string;
  projectId: number;
  employeeId: number;
};

type projectType = {
  id: number;
  name: string;
  description: string;
  deadline: string;
  leader: string;
  tasks: taskType[];
};

export function ProjectDetailsTile(props: projectType) {
  return (
    <div
      id="project-card"
      className="card flex flex-col shadow-md p-4 mx-4 w-1/2 bg-base-300 text-base-content"
    >
      <Title className="mb-2 text-2xl text-base-content">Project details</Title>

      <div className="flex flex-row justify-between">
        <span className="label-text text-base-content mb-0">Title</span>
        <span className="label-text text-base-content mb-0">Deadline</span>
      </div>
      <Title
        id="project-card-title"
        className="inline-flex flex-row justify-between mb-2"
      >
        {props.name}
        <span className="text-success">{props.deadline}</span>
      </Title>
      <hr />
      <br />
      <span className="label-text text-base-content mt-2 mb-0">
        Description
      </span>
      <p id="project-card-desc mt-0 ">{props.description}</p>
      <span className="label-text text-base-content mt-2 mb-0">Leader</span>
      <p id="project-card-leader mt-0">{props.leader}</p>
    </div>
  );
}

export default function ProjectDetailsProjectTile(props: any) {
  const [projectData, setProjectData] = useState<projectType | null>(null);
  const [projectLeader, setProjectLeader] = useState<string>("Team Led");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // useEffect(() => {
  //   fetchProjectData();
  // }, [props.currentProject]);

  async function fetchProjectData() {
    // if (props.currentProject == "placeholder") {
    //   setProjectData({
    //     id: 0,
    //     name: "Placeholder",
    //     description: "Placeholder",
    //     deadline: "Placeholder",
    //     leader: "Placeholder",
    //     tasks: []
    //   });
    //   setProjectLeader("Placeholder");
    //   setIsLoading(false);
    //   return;
    // }
    try {
      if (props.currentProject == null) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);

      const currentProject = props.currentProject;
      const projectResponse = await getProjectByApi(currentProject);
      const allEmployeeData = await getEmployeesByApi();

      let leaderName = "Team Led";
      const leaderId = projectResponse.data.leaderId;

      if (Array.isArray(allEmployeeData.data)) {
        const leader = allEmployeeData.data.find(
          (employee: any) => employee.id === leaderId
        );
        if (leader) {
          leaderName = leader.name;
        }
      }

      setProjectData(projectResponse.data.data[0]);
      setProjectLeader(leaderName);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching project data:", error);
    }
  }

  if (isLoading || projectData === null || projectData === undefined) {
    return;
  }

  return (
    <ProjectDetailsTile
      id={projectData.id}
      name={projectData.name}
      description={projectData.description}
      deadline={projectData.deadline}
      leader={projectLeader}
      tasks={projectData.tasks}
    />
  );
}
