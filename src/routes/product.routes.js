import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProduct,
  updateProduct,
} from "../controllers/product.controller.js";
import { verifyToken, isSeller } from "../middlewares/authJWT.js";

const router = Router();

router.get("/", verifyToken, getAllProducts);
router.get("/:productId", verifyToken, getProduct);
router.post("/", [verifyToken, isSeller], createProduct);
router.put("/:productId", [verifyToken, isSeller], updateProduct);
router.delete("/:productId", [verifyToken, isSeller], deleteProduct);

export default router;
