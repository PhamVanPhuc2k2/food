const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const checkoutController = require("../controllers/checkoutController");

router.post("/", authMiddleware, checkoutController.createCheckoutController);
router.put(
  "/:id/pay",
  authMiddleware,
  checkoutController.updateCheckoutController
);
router.post(
  "/:id/finalize",
  authMiddleware,
  checkoutController.completeCheckoutController
);

module.exports = router;
