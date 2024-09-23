import jwt from "jsonwebtoken";
import { serialize, parse } from "cookie";
import prisma from "../db.js";
import { encryptPass, comparePass } from "../utils/authJS.js";
import config from "../config/config.js";

export const register = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    // validations
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // check if user exists
    const userExists = await prisma.user.findUnique({ where: { email } });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }
    // create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: await encryptPass(password),
        role,
      },
    });
    const token = jwt.sign(
      { userId: user.id, role: user.role },
      config.SECRET,
      {
        expiresIn: "30d",
      }
    );
    const serialized = serialize("token", token, {
      httpOnly: false,
      secure: process.env.NODE_ENV !== "development",
      maxAge: 30 * 24 * 60 * 60,
      sameSite: "none",
      path: "/",
    });

    res.setHeader("Set-Cookie", serialized);
    res.status(201).json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // validations
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // check if user exists
    const userFound = await prisma.user.findUnique({ where: { email } });
    if (!userFound) return res.status(404).json({ message: "User not found" });

    // Compare password
    const match = await comparePass(password, userFound.password);
    if (!match) return res.status(401).json({ message: "Incorrect password" });

    // create token
    const token = jwt.sign(
      { userId: userFound.id, role: userFound.role },
      config.SECRET,
      {
        expiresIn: "30d",
      }
    );
    // set cookie
    const serialized = serialize("token", token, {
      httpOnly: false,
      secure: process.env.NODE_ENV !== "production",
      maxAge: 30 * 24 * 60 * 60,
      sameSite: "none",
      path: "/",
    });

    res.setHeader("Set-Cookie", serialized);
    res.status(201).json({ user: userFound });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const verifyToken = async (req, res) => {
  const cookies = req.headers.cookie ? parse(req.headers.cookie) : {};
  const token = cookies.token;
  if (!token) return res.status(401).json({ message: "No token provided" });
  try {
    const decoded = jwt.verify(token, config.SECRET);
    req.user = decoded;
    const userExists = await prisma.user.findUnique({
      where: { id: req.user.userId },
    });

    if (!userExists) return res.status(404).json({ message: "User not found" });
    return res.json({ user: userExists });
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

export const logout = (req, res) => {
  try {
    res.setHeader(
      "Set-Cookie",
      "token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT"
    );
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
