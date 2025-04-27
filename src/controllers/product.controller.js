import cookie from "cookie";
import jwt from "jsonwebtoken";
import config from "../config/config.js";
import prisma from "../db.js";

// Controllers for products
// This controller is used to get all products from the database
export const getAllProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany();
    res.json({ products });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// This controller is used to get a product by id from the database
// It uses the productId from the request params
export const getProduct = async (req, res) => {
  const { productId } = req.params;
  try {
    const product = await prisma.product.findUnique({
      where: { id: Number(productId) },
    });
    res.json({ product });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// This controller is used to get products by name from the database
// It uses the name from the request query to filter the products
export const getProductsByName = async (req, res) => {
  const { name } = req.query;
  try {
    const products = await prisma.product.findMany({
      where: { name: { contains: name } },
    });
    res.json({ products });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// This controller is used to get products by category from the database
// It uses the categoryId from the request params to filter the products
export const getProductsByCategory = async (req, res) => {
  const { categoryId } = req.params;
  try {
    const products = await prisma.product.findMany({
      where: { ProductCategory: { some: { categoryId: Number(categoryId) } } },
    });
    res.json({ products });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// This controller is used to create a new product in the database
// It uses the request body to get the product data and the token from the request headers to get the user id
export const createProduct = async (req, res) => {
  const { name, description, price, stock, img, category } = req.body;
  if (!name || !description || !price || !stock || !img || !category)
    return res.status(400).json({ message: "Missing required fields" });

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

    const standardizedCategory = category.trim().toUpperCase();
    let categoryExists = await prisma.category.findUnique({
      where: { name: standardizedCategory },
    });

    if (!categoryExists) {
      categoryExists = await prisma.category.create({
        data: { name: standardizedCategory },
      });
    }

    const product = await prisma.product.create({
      data: {
        name,
        description,
        price: parseFloat(price),
        stock: parseInt(stock, 10),
        img,
        ProductCategory: {
          create: {
            categoryId: categoryExists.id,
          },
        },
        sellerId: Number(req.user.userId),
      },
    });
    res.json({ product });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// This controller is used to update a product in the database
// It uses the productId from the request params and the request body to get the product data
export const updateProduct = async (req, res) => {
  const { productId } = req.params;
  const { name, price, stock, img, category } = req.body;
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
        img,
        category,
      },
    });
    res.json({ product });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// This controller is used to delete a product from the database
// It uses the productId from the request params and the token from the request headers to get the user id
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

// Controllers for categories
// This controller is used to get all categories from the database
// It uses the prisma client to get the categories from the database
export const getCategories = async (req, res) => {
  try {
    const categories = await prisma.Category.findMany();
    res.json({ categories });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
