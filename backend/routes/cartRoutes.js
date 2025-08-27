const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");
const validateMiddleware = require("../middlewares/validateMiddleware");
const { createCartSchema } = require("../utils/validateCart");
const authMiddleware = require("../middlewares/authMiddleware");

router.post(
  "/",
  validateMiddleware(createCartSchema),
  cartController.createCartController
);
router.put("/", cartController.updateCartController);
router.delete("/", cartController.deleteCartController);
router.get("/", cartController.getCartController);
router.post("/merge", authMiddleware, cartController.mergeCartController);

module.exports = router;
