import { Router } from "express";
import {
  createOrder,
  createOrderByProductId,
  getOrderById,
  getOrders,
} from "../controllers/order.controller.js";
import { verifyToken } from "../middlewares/authJWT.js";

const router = Router();

router.get("/", verifyToken, getOrders);
router.get("/:orderId", verifyToken, getOrderById);
router.post("/", verifyToken, createOrder);
router.post("/product/:productId", verifyToken, createOrderByProductId);

export default router;
