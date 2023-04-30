import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient, User, Project, Task } from "@prisma/client";
import { decode, JwtPayload, verify } from "jsonwebtoken";

const prisma = new PrismaClient();

interface TokenType {
  userId: number;
  iat: number;
  exp: number;
  theme: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method != "GET"){ 
    return res.status(400).json({ success: false, message: "invalid request" });
  }else{
    // Get the list of all existing Tasks
    let { token } = req.query;
    const userId: number = JSON.parse(
      JSON.stringify(decode(token as string))
    ).userId;

//finds the list of every Task and stores all of the necessary information without where clauses    
    const tasks = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        projects: {
          select: {
            project: {
              select: {
                id: true,
                name: true,
                description: true,
                tasks: {
                  select: {
                    task: {
                      select: {
                        id: true,
                        name: true,
                        description: true,                    
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });
    res.status(200).json({ success: true, data: tasks });
  } 
}
