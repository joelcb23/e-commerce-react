import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getCategories,
  getProduct,
  getProductsByCategory,
  getProductsByName,
  updateProduct,
} from "../controllers/product.controller.js";
import { verifyToken, isSeller } from "../middlewares/authJWT.js";

const router = Router();

router.get("/categories", getCategories);

router.get("/search", getProductsByName);
router.get("/category/:categoryId", getProductsByCategory);
router.get("/", getAllProducts);
router.get("/:productId", getProduct);

router.post("/", [verifyToken, isSeller], createProduct);
router.put("/:productId", [verifyToken, isSeller], updateProduct);
router.delete("/:productId", [verifyToken, isSeller], deleteProduct);

export default router;
