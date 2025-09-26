const express = require("express");
const adminController = require("../controllers/adminController");
const checkAdminMiddleware = require("../middlewares/checkAdminMiddleware");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.get(
  "/get-users",
  authMiddleware,
  checkAdminMiddleware,
  adminController.getAllUserController
);
router.post(
  "/create-user",
  authMiddleware,
  checkAdminMiddleware,
  adminController.createUserController
);
router.put(
  "/update-user/:id",
  authMiddleware,
  checkAdminMiddleware,
  adminController.updateUserController
);
router.delete(
  "/delete-user/:id",
  authMiddleware,
  checkAdminMiddleware,
  adminController.deleteUserController
);

module.exports = router;
