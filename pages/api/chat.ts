import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient, Chat, User, ChatUser } from "@prisma/client";
const prisma = new PrismaClient();

type ChatType = {
  id: number;
};

//need to add a promise and write function to get information
async function getChats() {}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "GET") {
    // Get the list of all existing chats
    var chats = await getChats();

    // If there exists the ID of a specific chat
    if (req.query.hasOwnProperty("chatID")) {
      const { chatID } = req.query;
      //   const chat = chats.find(
      //     (chat: ChatType) => String(chat.id) === String(chatID)
      //   );
    }
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
