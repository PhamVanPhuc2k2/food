const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const checkAdminMiddleware = require("../middlewares/checkAdminMiddleware");
const router = express.Router();
const productController = require("../controllers/productController");

router.post(
  "/create-product",
  authMiddleware,
  checkAdminMiddleware,
  productController.createProductController
);
router.put(
  "/update-product/:id",
  authMiddleware,
  checkAdminMiddleware,
  productController.updateProductController
);
router.delete(
  "/delete-product/:id",
  authMiddleware,
  checkAdminMiddleware,
  productController.deleteProductController
);
router.get("/all-product", productController.getAllProductController);
router.get("/detail-product/:id", productController.getDetailProductController);
router.get("/similar/:id", productController.getSimilarProductController);
router.get("/best-seller", productController.getBestSellerController);
router.get("/new-arrival", productController.getNewArrivalController);

module.exports = router;
