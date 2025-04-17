import jwt from "jsonwebtoken";
import cookie from "cookie";
import prisma from "../db.js";
import config from "../config/config.js";
import { convertDateToISO } from "../utils/convertDate.js";

export const createOrder = async (req, res) => {
  // Get the token from the cookie
  const { deliveryDate } = req.body;
  const cookies = req.headers.cookie ? cookie.parse(req.headers.cookie) : {};
  const token = cookies.token;
  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    // Verify the token and get the user
    const decoded = jwt.verify(token, config.SECRET);
    req.user = decoded;
    const userExists = await prisma.user.findUnique({
      where: { id: Number(req.user.userId) },
    });
    if (!userExists) return res.status(404).json({ message: "User not found" });

    // Create the order
    const cart = await prisma.cart.findFirst({
      where: { userId: Number(req.user.userId), isActive: true },
    });
    if (!cart) return res.status(404).json({ message: "Cart not found" });
    const cartItems = await prisma.cartItem.findMany({
      where: { cartId: cart.id },
      include: { product: true },
    });
    if (cartItems.length === 0)
      return res.status(404).json({ message: "Cart is empty" });
    const total = cartItems.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0
    );
    const order = await prisma.order.create({
      data: {
        orderItems: {
          connect: cartItems.map((item) => ({ id: item.id })),
        },
        total,
        deliveryDate: convertDateToISO(deliveryDate),
        userId: Number(req.user.userId),
      },
    });

    // Update the product stock
    for (const item of cartItems) {
      await prisma.product.update({
        where: { id: item.productId },
        data: {
          stock: {
            decrement: item.quantity,
          },
        },
      });
    }

    // Disable the cart
    await prisma.cart.update({
      where: { id: cart.id },
      data: { isActive: false },
    });
    res.status(200).json({ order });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createOrderByProductId = async (req, res) => {
  const { productId } = req.params;
  const { quantity, deliveryDate } = req.body;
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
    const product = await prisma.product.findUnique({
      where: { id: Number(productId) },
    });
    if (!product) return res.status(404).json({ message: "Product not found" });
    const newCart = await prisma.cart.create({
      data: {
        userId: Number(req.user.userId),
        isActive: true,
      },
    });
    const newCartItem = await prisma.cartItem.create({
      data: {
        cartId: newCart.id,
        productId: Number(productId),
        quantity,
      },
    });
    const total = product.price * quantity;
    const order = await prisma.order.create({
      data: {
        orderItems: {
          connect: [{ id: newCartItem.id }],
        },
        total,
        deliveryDate: convertDateToISO(deliveryDate),
        userId: Number(req.user.userId),
      },
    });
    await prisma.product.update({
      where: { id: Number(productId) },
      data: {
        stock: {
          decrement: quantity,
        },
      },
    });

    await prisma.cart.update({
      where: { id: newCart.id },
      data: { isActive: false },
    });

    res.status(200).json({ order });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getOrders = async (req, res) => {
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
    const orders = await prisma.order.findMany({
      where: { userId: Number(req.user.userId) },
      include: { orderItems: { include: { product: true } } },
    });
    res.status(200).json({ orders });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getOrderById = async (req, res) => {
  const { orderId } = req.params;
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
    const order = await prisma.order.findFirst({
      where: { userId: Number(req.user.userId), id: Number(orderId) },
      include: { orderItems: { include: { product: true } } },
    });
    res.status(200).json({ order });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
