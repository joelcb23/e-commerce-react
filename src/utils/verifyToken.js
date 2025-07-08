import jwt from "jsonwebtoken";
import { parse } from "cookie";
import { SECRET_KEY } from "../config/config.js";
import prisma from "../db.js";

export const verifyToken = async (headers) => {
  const token = parse(headers.cookie).token;
  if (!token) return res.status(401).json({ message: "No token provided" });
  try {
    const decoded = await jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    const userExists = await prisma.user.findUnique({
      where: { id: req.user.userId },
    });
    if (!userExists) return res.status(404).json({ message: "User not found" });
    return res.json(userExists);
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};
