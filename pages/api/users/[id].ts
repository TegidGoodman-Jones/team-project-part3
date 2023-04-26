import { PrismaClient } from "@prisma/client";
import { verify } from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "GET") {
    // Get User by ID
    try {
        const { id } = req.query;
        const { token } = req.body;
        try {
            verify(token, "your_jwt_secret");
        } catch (error) {
            res.status(401).json({ success: false, message: "Invalid token" });
        }
        const user = await prisma.user.findUnique({
            where: {
                id: Number(id),
            },
            select: {
                id: true,
                username: true,
                email: true,
                theme: true,
            },
        });
        res.status(200).json({
            success: true,
            data: user,
        });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error,
      });
    }
  } else if (req.method == "POST") {
    // Create a new user
    res.status(400).json({
      success: false,
      message: "Invalid request method",
    });
  } else if (req.method == "PUT") {
    // Update a user
    try {
      const { id } = req.query;
      const { username, theme, token } = req.body;
      try {
        verify(token, "your_jwt_secret");
      } catch (error) {
        res.status(401).json({ success: false, message: "Invalid token" });
      }
      const user = await prisma.user.update({
        where: {
          id: Number(id),
        },
        data: {
          username: username,
          theme: theme,
        },
      });
      res.status(200).json({
        success: true,
        data: user,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error,
      });
    }
  } else if (req.method == "DELETE") {
    // Delete a user
    res.status(400).json({
      success: false,
      message: "Invalid request method",
    });
  } else {
    res.status(400).json({
      success: false,
      message: "Invalid request method",
    });
  }
}
