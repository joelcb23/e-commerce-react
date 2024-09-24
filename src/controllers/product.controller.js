import cookie from "cookie";
import jwt from "jsonwebtoken";
import config from "../config/config.js";
import prisma from "../db.js";

export const getAllProducts = async (req, res) => {
  // const cookies = req.headers.cookie ? cookie.parse(req.headers.cookie) : {};
  // const token = cookies.token;
  // if (!token) return res.status(401).json({ message: "No token provided" });
  try {
    // const decoded = jwt.verify(token, config.SECRET);
    // req.user = decoded;
    // const userExists = await prisma.user.findUnique({
    //   where: { id: Number(req.user.userId) },
    // });
    // if (!userExists) return res.status(404).json({ message: "User not found" });
    const products = await prisma.product.findMany();
    res.json({ products });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getProduct = async (req, res) => {
  const { productId } = req.params;
  // const cookies = req.headers.cookie ? cookie.parse(req.headers.cookie) : {};
  // const token = cookies.token;
  // if (!token) return res.status(401).json({ message: "No token provided" });
  try {
    // const decoded = jwt.verify(token, config.SECRET);
    // req.user = decoded;
    // const userExists = await prisma.user.findUnique({
    //   where: { id: Number(req.user.userId) },
    // });
    // if (!userExists) return res.status(404).json({ message: "User not found" });
    const product = await prisma.product.findUnique({
      where: { id: Number(productId) },
    });
    res.json({ product });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createProduct = async (req, res) => {
  const { name, price, stock } = req.body;
  const cookies = req.headers.cookie ? cookie.parse(req.headers.cookie) : {};
  const token = cookies.token;
  if (!token) return res.status(401).json({ message: "No token provided" });
  try {
    const decoded = jwt.verify(token, config.SECRET);
    req.user = decoded;
    const userExists = await prisma.user.findUnique({
      where: { id: Number(req.user.userId) },
    });
    if (!userExists) return res.status(404).json({ message: "User not found" });
    const product = await prisma.product.create({
      data: {
        name,
        price,
        stock,
        sellerId: Number(req.user.userId),
      },
    });
    res.json({ product });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateProduct = async (req, res) => {
  const { productId } = req.params;
  const { name, price, stock } = req.body;
  const cookies = req.headers.cookie ? cookie.parse(req.headers.cookie) : {};
  const token = cookies.token;
  if (!token) return res.status(401).json({ message: "No token provided" });
  try {
    const decoded = jwt.verify(token, config.SECRET);
    req.user = decoded;
    const userExists = await prisma.user.findUnique({
      where: { id: Number(req.user.userId) },
    });
    if (!userExists) return res.status(404).json({ message: "User not found" });
    const productExists = await prisma.product.findFirst({
      where: { id: Number(productId), sellerId: Number(req.user.userId) },
    });
    if (!productExists)
      return res.status(404).json({ message: "Product not found" });

    const product = await prisma.product.update({
      where: { id: productExists.id },
      data: {
        name,
        price,
        stock,
      },
    });
    res.json({ product });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteProduct = async (req, res) => {
  const { productId } = req.params;
  const cookies = req.headers.cookie ? cookie.parse(req.headers.cookie) : {};
  const token = cookies.token;
  if (!token) return res.status(401).json({ message: "No token provided" });
  try {
    const decoded = jwt.verify(token, config.SECRET);
    req.user = decoded;

    const userExists = await prisma.user.findUnique({
      where: { id: Number(req.user.userId) },
    });
    if (!userExists) return res.status(404).json({ message: "User not found" });

    const productExists = await prisma.product.findFirst({
      where: { id: Number(productId), sellerId: Number(req.user.userId) },
    });
    if (!productExists)
      return res.status(404).json({ message: "Product not found" });

    const product = await prisma.product.delete({
      where: { id: productExists.id },
    });
    res.json({ product });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
