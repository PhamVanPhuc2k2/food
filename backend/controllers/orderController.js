const orderService = require("../services/orderService");

const orderController = {
  getOrderController: async (req, res, next) => {
    try {
      const userId = req.user.id;
      const response = await orderService.getOrderService(userId);
      return res.status(response.code).json(response);
    } catch (err) {
      next(err);
    }
  },
  getOrderDetailController: async (req, res, next) => {
    try {
      const orderId = req.params.id;
      const response = await orderService.getOrderDetailService(orderId);
      return res.status(response.code).json(response);
    } catch (err) {
      next(err);
    }
  },
};

module.exports = orderController;
