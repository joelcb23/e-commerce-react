import jwt from "jsonwebtoken";
import cookie from "cookie";
import prisma from "../db.js";
import config from "../config/config.js";

export const getCart = async (req, res) => {
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

    const cart = await prisma.cart.findFirst({
      where: { userId: Number(req.user.userId), isActive: true },
    });
    if (!cart) return res.status(204).json({ message: "Cart not found" });

    const cartItems = await prisma.cartItem.findMany({
      where: { cartId: cart.id },
      include: { product: true },
    });
    res.json({ cart: cartItems });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const addItemToCart = async (req, res) => {
  const { productId, quantity } = req.body;
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

    let cart = await prisma.cart.findFirst({
      where: { userId: Number(req.user.userId), isActive: true },
    });
    if (!cart) {
      cart = await prisma.cart.create({
        data: {
          userId: Number(req.user.userId),
          isActive: true,
        },
      });
    }

    let cartItem = await prisma.cartItem.findFirst({
      where: { cartId: cart.id, productId: Number(productId) },
      include: { product: true },
    });
    if (!cartItem) {
      cartItem = await prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productId: Number(productId),
          quantity: Number(quantity),
        },
        include: { product: true },
      });
      res.status(200).json({ cart, cartItem });
    } else {
      cartItem = await prisma.cartItem.update({
        where: {
          id: cartItem.id,
        },
        data: {
          quantity: cartItem.quantity + quantity,
        },
        include: { product: true },
      });
      res.status(200).json({ cart, cartItem });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const removeItemFromCart = async (req, res) => {
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

    const cart = await prisma.cart.findFirst({
      where: { userId: Number(req.user.userId), isActive: true },
    });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const cartItem = await prisma.cartItem.delete({
      where: {
        id: Number(req.params.cartItemId),
      },
    });
    if (!cartItem)
      return res.status(404).json({ message: "Cart item not found" });

    res.status(200).json({ cart, cartItem });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const emptyCart = async (req, res) => {
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

    const cart = await prisma.cart.findFirst({
      where: { userId: Number(req.user.userId), isActive: true },
    });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const cartItems = await prisma.cartItem.deleteMany({
      where: { cartId: cart.id },
    });

    res.status(200).json({ cart, cartItems });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
