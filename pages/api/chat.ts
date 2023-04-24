import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient, Chat, User, ChatUser } from "@prisma/client";
import { decode, verify } from "jsonwebtoken";
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
  if (req.method == "GET") {
    try {
      // Get the list of all existing chats
      let { token, chatId = "" } = req.query;
      const userId: number = JSON.parse(
        JSON.stringify(decode(token as string))
      ).userId;
      const chat = await prisma.user.findUnique({
        where: {
          id: userId,
        },
        select: {
          chats: {
            where: {
              chatId: Number(chatId),
            },
            select: {
              chat: {
                select: {
                  id: true,
                  name: true,
                  messages: {
                    select: {
                      text: true,
                      timestamp: true,
                      user: {
                        select: {
                          username: true,
                          id: true,
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
      // if length of chat is 0 then return error
      if (chat?.chats.length == 0) {
        return res.status(400).json({
          success: false,
          message: "Chat not found",
        });
      }
      res.status(200).json({ success: true, data: chat });
    } catch (error) {
      res.status(400).json({ success: false, message: error });
    }
  } else if (req.method == "POST") {
    const { token, users, userId } = req.body;
    try {
      console.log(token);
    } catch (error) {
      res.status(401).json({ success: false, message: "Invalid token" });
      return;
    }
    try {
      const chat = await prisma.chat.create({
        data: {
          name: "New Chat",
          users: {
            create: [
              ...users.map((user: any) => ({
                userId: user.id,
              })),
              { userId: Number(userId) },
            ],
          },
        },
      });
      res.status(200).json({ success: true, data: chat });
    } catch (error) {
      res.status(400).json({ success: false, message: error });
    }
  } else if (req.method == "PUT") {
    // To update the prisma of new created chat
  } else if (req.method == "DELETE") {
    // To delete chats
  } else {
    return res.status(400).json({ success: false, message: "invalid request" });
  }
}
