const User = require("../models/User");
const adminService = require("../services/adminService");

const adminController = {
  getAllUserController: async (req, res, next) => {
    try {
      const response = await adminService.getAllUserService();
      return res.status(response.code).json(response);
    } catch (err) {
      next(err);
    }
  },
  createUserController: async (req, res, next) => {
    try {
      const response = await adminService.createUserService(req.body);
      return res.status(response.code).json(response);
    } catch (err) {
      next(err);
    }
  },
  updateUserController: async (req, res, next) => {
    try {
      const userId = req.params.id;
      const response = await adminController.updateUserController(
        userId,
        req.body
      );
      return res.status(response.code).json(response);
    } catch (err) {
      next(err);
    }
  },
  updateUserController: async (req, res, next) => {
    try {
      const userId = req.params.id;
      const response = await adminService.updateUserService(userId, req.body);
      return res.status(response.code).json(response);
    } catch (err) {
      next(err);
    }
  },
  deleteUserController: async (req, res, next) => {
    try {
      const userId = req.params.id;
      const response = await adminService.deleteUserService(userId);
      return res.status(response.code).json(response);
    } catch (err) {
      next(err);
    }
  },
};

module.exports = adminController;
