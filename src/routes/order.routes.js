import { Router } from "express";
import {
  createOrder,
  getOrderById,
  getOrders,
} from "../controllers/order.controller.js";

const router = Router();

router.get("/", getOrders);
router.get("/:orderId", getOrderById);
router.post("/", createOrder);

export default router;
