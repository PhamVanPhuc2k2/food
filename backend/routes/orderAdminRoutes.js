const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const checkAdminMiddleware = require("../middlewares/checkAdminMiddleware");
const router = express.Router();
const orderAdminController = require("../controllers/orderAdminController");

router.get(
  "/get-orders",
  authMiddleware,
  checkAdminMiddleware,
  orderAdminController.getOrdersController
);
router.put(
  "/update-order/:id",
  authMiddleware,
  checkAdminMiddleware,
  orderAdminController.updateOrderController
);
router.delete(
  "/delete-order/:id",
  authMiddleware,
  checkAdminMiddleware,
  orderAdminController.deleteOrderController
);

module.exports = router;
