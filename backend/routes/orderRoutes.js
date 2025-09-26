const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();
const orderController = require("../controllers/orderController");

router.get("/my-orders", authMiddleware, orderController.getOrderController);
router.get("/:id", authMiddleware, orderController.getOrderDetailController);

module.exports = router;
