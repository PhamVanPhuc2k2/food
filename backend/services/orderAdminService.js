const Order = require("../models/Order");

const orderAdminService = {
  getOrdersService: async () => {
    try {
      const orders = await Order.find().populate("user", "name email");
      if (!orders) {
        return {
          status: "ERR",
          message: "Không tìm thấy đơn hàng nào!",
          code: 404,
        };
      }
      return {
        status: "OK",
        message: "Lấy danh sách đơn hàng thành công!",
        code: 200,
        data: orders,
      };
    } catch (err) {
      throw err;
    }
  },
  updateOrderService: async (orderId, data) => {
    try {
      const order = await Order.findById(orderId);
      if (!order) {
        return {
          status: "ERR",
          message: "Đơn hàng không tồn tại!",
          code: 404,
        };
      }
      const updatedOrder = await Order.findByIdAndUpdate(orderId, data, {
        new: true,
      }).populate("user", "name email");
      return {
        status: "OK",
        message: "Cập nhật đơn hàng thành công!",
        code: 200,
        data: updatedOrder,
      };
    } catch (err) {
      throw err;
    }
  },
  deleteOrderService: async (orderId) => {
    try {
      const order = await Order.findById(orderId);
      if (!order) {
        return {
          status: "ERR",
          message: "Không tìm thấy đơn hàng!",
          code: 404,
        };
      }
      return {
        status: "OK",
        message: "Xóa đơn hàng thành công!",
        code: 200,
      };
    } catch (err) {
      next(err);
    }
  },
};

module.exports = orderAdminService;
