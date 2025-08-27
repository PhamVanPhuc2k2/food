const userServices = require("../services/userServices");

const userControllers = {
  registerController: async (req, res, next) => {
    try {
      const response = await userServices.registerService(req.body);
      return res.status(response.code).json(response);
    } catch (err) {
      next(err);
    }
  },
  loginController: async (req, res, next) => {
    try {
      const response = await userServices.loginService(req.body);
      const { refresh_token, ...others } = response;
      res.cookie("refreshToken", refresh_token, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        path: "/api/user/refresh",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
      return res.status(others.code).json(others);
    } catch (err) {
      next(err);
    }
  },
  getUserByIdController: async (req, res, next) => {
    const userId = req.params.id;
    try {
      const response = await userServices.getUserByIdService(userId);
      return res.status(response.code).json(response);
    } catch (err) {
      next(err);
    }
  },
  getAllUserController: async (req, res, next) => {
    try {
      const response = await userServices.getAllUserService(req.query);
      return res.status(response.code).json(response);
    } catch (err) {
      next(err);
    }
  },
  updatePasswordController: async (req, res, next) => {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user.id;
    try {
      const response = await userServices.updatePasswordService(
        userId,
        currentPassword,
        newPassword
      );
      return res.status(response.code).json(response);
    } catch (err) {
      next(err);
    }
  },
  deleteUserController: async (req, res, next) => {
    const userId = req.params.id;
    try {
      const response = await userServices.deleteUserService(userId);
      return res.status(response.code).json(response);
    } catch (err) {
      next(err);
    }
  },
};

module.exports = userControllers;
