import { Router } from "express";
import { addItemToCart, getCart } from "../controllers/cart.controller.js";

const router = Router();

router.get("/", getCart);
router.post("/", addItemToCart);

export default router;
