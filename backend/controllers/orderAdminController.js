const orderAdminService = require("../services/orderAdminService");

const orderAdminController = {
  getOrdersController: async (req, res, next) => {
    try {
      const response = await orderAdminService.getOrdersService();
      return res.status(response.code).json(response);
    } catch (err) {
      next(err);
    }
  },
  updateOrderController: async (req, res, next) => {
    try {
      const orderId = req.params.id;
      const response = await orderAdminService.updateOrderService(
        orderId,
        req.body
      );
      return res.status(response.code).json(response);
    } catch (err) {
      next(err);
    }
  },
  deleteOrderController: async (req, res, next) => {
    try {
      const orderId = req.params.id;
      const response = await orderAdminService.deleteOrderService(orderId);
      return res.status(response.code).json(response);
    } catch (err) {
      next(err);
    }
  },
};

module.exports = orderAdminController;
