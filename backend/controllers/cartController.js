const cartService = require("../services/cartService");

const cartController = {
  createCartController: async (req, res, next) => {
    try {
      const response = await cartService.createCartService(req.body);
      return res.status(response.code).json(response);
    } catch (err) {
      next(err);
    }
  },
  updateCartController: async (req, res, next) => {
    try {
      const response = await cartService.updateCartController(req.body);
      return res.status(response.code).json(response);
    } catch (err) {
      next(err);
    }
  },
  deleteCartController: async (req, res, next) => {
    try {
      console.log("DELETE /api/cart body:", req.body);
      const response = await cartService.deleteCartService(req.body);
      return res.status(response.code).json(response);
    } catch (err) {
      next(err);
    }
  },
  getCartController: async (req, res, next) => {
    try {
      const response = await cartService.getCartService(req.query);
      return res.status(response.code).json(response);
    } catch (err) {
      next(err);
    }
  },
  mergeCartController: async (req, res, next) => {
    const { guestId } = req.body;
    const userId = req.user.id;
    try {
      const response = await cartService.mergeCartService(guestId, userId);
      return res.status(response.code).json(response);
    } catch (err) {
      next(err);
    }
  },
};

module.exports = cartController;
