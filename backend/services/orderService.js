const Order = require("../models/Order");

const orderService = {
  getOrderService: async (userId) => {
    try {
      const orders = await Order.find({ user: userId }).sort({
        createdAt: -1,
      });
      if (!orders || orders.length === 0) {
        return {
          status: "OK",
          message: "Người dùng chưa có đơn hàng nào!",
          code: 404,
          data: [],
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
  getOrderDetailService: async (orderId) => {
    try {
      const order = await Order.findById(orderId).populate(
        "user",
        "name email"
      );
      if (!order) {
        return {
          status: "ERR",
          message: "Không tìm thấy đơn hàng!",
          code: 404,
        };
      }
      return {
        status: "OK",
        message: "Lấy thông tin đơn hàng thành công!",
        code: 200,
        data: order,
      };
    } catch (err) {
      throw err;
    }
  },
};

module.exports = orderService;
