import { Router } from "express";
import {
  addItemToCart,
  emptyCart,
  getCart,
  removeItemFromCart,
} from "../controllers/cart.controller.js";
import { verifyToken } from "../middlewares/authJWT.js";

const router = Router();

router.get("/", verifyToken, getCart);
router.post("/", verifyToken, addItemToCart);
router.delete("/cartItem/:cartItemId", verifyToken, removeItemFromCart);
router.delete("/cartItem", verifyToken, emptyCart);

export default router;
