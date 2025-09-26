const checkoutService = require("../services/checkoutService");

const checkoutController = {
  createCheckoutController: async (req, res, next) => {
    const userId = req.user.id;
    const data = req.body;
    try {
      const response = await checkoutService.createCheckoutService(
        userId,
        data
      );
      return res.status(response.code).json(response);
    } catch (err) {
      next(err);
    }
  },
  updateCheckoutController: async (req, res, next) => {
    const checkoutId = req.params.id;
    const data = req.body;
    try {
      const response = await checkoutService.updateCheckoutService(
        checkoutId,
        data
      );
      return res.status(response.code).json(response);
    } catch (err) {
      next(err);
    }
  },
  completeCheckoutController: async (req, res, next) => {
    const checkoutId = req.params.id;
    try {
      const response = await checkoutService.completeCheckoutService(
        checkoutId
      );
      return res.status(response.code).json(response);
    } catch (err) {
      next(err);
    }
  },
};

module.exports = checkoutController;
