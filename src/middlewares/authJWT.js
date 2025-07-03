import jwt from "jsonwebtoken";
import { parse } from "cookie";
import { SECRET_KEY } from "../config/config.js";
import prisma from "../db.js";

export const verifyToken = async (req, res, next) => {
  const token = parse(req.headers.cookie).token;
  if (!token) return res.status(401).json({ message: "No token provided" });
  try {
    const decoded = await jwt.verify(token, config.SECRET);
    req.user = decoded;
    const userExists = await prisma.user.findUnique({
      where: { id: req.user.userId },
    });
    if (!userExists) return res.status(404).json({ message: "User not found" });
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

export const isAdmin = (req, res, next) => {
  try {
    if (req.user.role !== "ADMIN") {
      return res.status(403).json({ message: "Access denied" });
    }
    next();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const isSeller = (req, res, next) => {
  try {
    if (req.user.role !== "SELLER") {
      return res.status(403).json({ message: "Access denied" });
    }
    next();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
