import { Router } from "express";
import {
  addItemToCart,
  emptyCart,
  getCart,
  removeItemFromCart,
} from "../controllers/cart.controller.js";

const router = Router();

router.get("/", getCart);
router.post("/", addItemToCart);
router.delete("/cartItem/:cartItemId", removeItemFromCart);
router.delete("/cartItem", emptyCart);

export default router;
