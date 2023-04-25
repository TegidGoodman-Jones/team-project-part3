import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient, Chat, User, ChatUser } from "@prisma/client";
import { decode, JwtPayload } from "jsonwebtoken";
import { verify } from "crypto";
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
    // Get the list of all existing chats
    let { token } = req.query;
    const userId: number = JSON.parse(
      JSON.stringify(decode(token as string))
    ).userId;
    const chats = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        chats: {
          select: {
            chat: {
              select: {
                id: true,
                name: true,
                description: true,
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
                messages: {
                  take: 1,
                  orderBy: {
                    timestamp: "desc",
                  },
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

    res.status(200).json({ success: true, data: chats });
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
