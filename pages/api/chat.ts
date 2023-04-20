import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient, Chat, User, ChatUser } from "@prisma/client";
import { decode, JwtPayload } from "jsonwebtoken";
const prisma = new PrismaClient();

type ChatType = {
  id: number;
};
interface TokenType {
  userId: number;
  iat: number;
  exp: number;
  theme: string;
}

//need to add a promise and write function to get information
async function getChats() {}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "GET") {
    // Get the list of all existing chats
    let { token, chatId = "" } = req.query;
    const userId: TokenType = JSON.parse(
      JSON.stringify(decode(token as string))
    ).userId;
    const chat = await prisma.chat.findUnique({
      where: {
        id: parseInt(chatId as string),
      },
      select: {
        id: true,
        name: true,
        description: true,
        messages: {
          select: {
            id: true,
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
        users: {
          select: {
            user: {
              select: {
                username: true,
                id: true,
              },
            },
          },
        },
      },
    });
    res.status(200).json({ success: true, data: chat });
  } else if (req.method == "POST") {
    // Create a new chat
  } else if (req.method == "PUT") {
    // To update the prisma of new created chat
  } else if (req.method == "DELETE") {
    // To delete chats
  } else {
    return res.status(400).json({ success: false, message: "invalid request" });
  }
}
