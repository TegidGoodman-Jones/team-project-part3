import { PrismaClient } from "@prisma/client";
import { decode, verify } from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "GET") {
    // Get the list of all existing chats
    const { token } = req.query;
    try {
      verify(token as string, process.env.JWT_SECRET as string);
    } catch (error) {
      res.status(401).json({ success: false, message: "Invalid token" });
      return;
    }

    const userId: number = JSON.parse(
      JSON.stringify(decode(token as string))
    ).userId;
    const chatsPaths = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        chats: {
          select: {
            chat: {
              select: {
                id: true,
              },
            },
          },
        },
      },
    });

    res.status(200).json({ success: true, data: chatsPaths });
  } else if (req.method == "POST") {
    // Create a new chat
  } else if (req.method == "PUT") {
    // Update an existing chat
  } else if (req.method == "DELETE") {
    // Delete an existing chat
  }
}
