import { Router } from "express";
import {
  createOrder,
  getOrderById,
  getOrders,
} from "../controllers/order.controller.js";
import { verifyToken } from "../middlewares/authJWT.js";

const router = Router();

router.get("/", verifyToken, getOrders);
router.get("/:orderId", verifyToken, getOrderById);
router.post("/", verifyToken, createOrder);

export default router;
