const userServices = require("../services/userServices");
const jwt = require("jsonwebtoken");
const { generateAccessToken } = require("../utils/handleJWT");

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
        secure: false,
        sameSite: "Lax",
        path: "/",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
      return res.status(others.code).json(others);
    } catch (err) {
      next(err);
    }
  },
  logoutController: async (req, res) => {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: false, // nếu deploy production thì để true
      sameSite: "Lax",
      path: "/",
    });
    return res.json({ message: "Đăng xuất thành công" });
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
  refreshTokenController: async (req, res, next) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.status(401).json({
        message: "Không có refresh token",
      });
    }
    try {
      const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN);
      const newAccessToken = generateAccessToken({
        id: decoded.id,
        role: decoded.role,
        name: decoded.name,
      });
      return res.json({ access_token: newAccessToken });
    } catch (err) {
      return res.status(403).json({ message: "Refresh token không hợp lệ" });
    }
  },
};

module.exports = userControllers;
