import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const projects = [
    {
      name: "Project 1",
      description: "This is our first project",
      leaderId: 1,
    },
    {
      name: "Develop RestFul API",
      description: "This is our second project, to develop an API",
      leaderId: 2,
    },
    {
      name: "Project 3 - The end",
      description: "This is our third project, the end",
      leaderId: 3,
    },
  ];
  const createdProjects = await prisma.project.createMany({
    data: projects,
  })
  res.status(200).json({ success: true, data: createdProjects });
}
