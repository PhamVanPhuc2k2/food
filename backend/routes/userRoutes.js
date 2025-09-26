const express = require("express");
const userControllers = require("../controllers/userControllers");
const router = express.Router();
const validateMiddleware = require("../middlewares/validateMiddleware");
const {
  registerSchema,
  loginSchema,
  updatePassword,
} = require("../utils/validateUser");
const authMiddleware = require("../middlewares/authMiddleware");
const checkRoleMiddleware = require("../middlewares/checkRoleMiddleware");
const checkAdminMiddleware = require("../middlewares/checkAdminMiddleware");

router.post(
  "/register",
  validateMiddleware(registerSchema),
  userControllers.registerController
);
router.post(
  "/login",
  validateMiddleware(loginSchema),
  userControllers.loginController
);
router.post("/logout", userControllers.logoutController);
router.get(
  "/get-user/:id",
  authMiddleware,
  checkRoleMiddleware,
  userControllers.getUserByIdController
);
router.get(
  "/get-users",
  authMiddleware,
  checkAdminMiddleware,
  userControllers.getAllUserController
);
router.put(
  "/update-password/:id",
  authMiddleware,
  validateMiddleware(updatePassword),
  userControllers.updatePasswordController
);
router.delete(
  "/delete-user/:id",
  authMiddleware,
  checkAdminMiddleware,
  userControllers.deleteUserController
);
router.post("/refresh-token", userControllers.refreshTokenController);

module.exports = router;
