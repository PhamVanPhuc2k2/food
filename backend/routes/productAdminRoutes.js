const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const checkAdminMiddleware = require("../middlewares/checkAdminMiddleware");
const router = express.Router();
const productAdminController = require("../controllers/productAdminController");

router.get(
  "/get-products",
  authMiddleware,
  checkAdminMiddleware,
  productAdminController.getProductsController
);

module.exports = router;
