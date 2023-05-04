import { NextApiRequest, NextApiResponse } from "next";
//change tables you wish to import
import { PrismaClient, User, Task, Project } from "@prisma/client";
import { decode, verify } from "jsonwebtoken";
const prisma = new PrismaClient();

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    if (req.method != "GET"){ 
        return res.status(400).json({ success: false, message: "invalid request" });
    }else{
      try {
        
        let { id } = req.query;
        console.log("Iddddddd: " + id);
        const { token } = req.body;


        // const userId: number = JSON.parse(
        //   JSON.stringify(decode(token as string))
        // ).userId;

        // const task = await prisma.user.findUnique({
        //   where: {
        //     id: 1,
        //   },
        //   select: {
        //     projects: {
        //       where: {
        //         projectId: Number(id),
        //       },
        //     }
        //   },

          const projects = await prisma.project.findMany({
            where: {
              id: Number(id),
            },
          });

          // specific project by id
          // all projects 
          // all users
          // all tasks
          // a users task by id - done
          // a projects by id
          
          


          // select: {
          //   project: {
          //     where: {
          //       projectId: Number(id),
          //     },
          //     select: {
          //       project: {
          //         select: {
          //           id: true,
          //           name: true,
          //           description,
          //           tasks: {
          //             select: {
          //               id: true,
          //               name: true,
          //               description,
          //             },
          //           },
          //         },
          //       },
          //     },
          //   },
          // },
        // });

        // if length of chat is 0 then return error
        //edit for tasks
        // if (task?.tasks.length == 0) {
        //   return res.status(400).json({
        //     success: false,
        //     message: "Task not found",
        //   });
        // }
        res.status(200).json({ success: true, data: projects });
      } catch (error) {
        console.log(error);
        res.status(400).json({ success: false, message: "Hellooo" });
      }
    }
  }
