import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProduct,
  getProductsByName,
  updateProduct,
} from "../controllers/product.controller.js";
import { verifyToken, isSeller } from "../middlewares/authJWT.js";

const router = Router();

router.get("/search", getProductsByName); // Ruta más específica
router.get("/", getAllProducts);
router.get("/:productId", getProduct); // Ruta más general

router.post("/", [verifyToken, isSeller], createProduct);
router.put("/:productId", [verifyToken, isSeller], updateProduct);
router.delete("/:productId", [verifyToken, isSeller], deleteProduct);

export default router;
