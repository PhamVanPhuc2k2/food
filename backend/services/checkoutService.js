const Cart = require("../models/Cart");
const Checkout = require("../models/Checkout");
const Order = require("../models/Order");

const checkoutService = {
  createCheckoutService: async (userId, data) => {
    const { checkoutItems, shippingAddress, paymentMethod, totalPrice } = data;
    try {
      if (!checkoutItems || checkoutItems.length === 0) {
        return {
          status: "ERR",
          message: "Không có sản phẩm trong thanh toán!",
          code: 400,
        };
      }
      const newCheckout = await Checkout.create({
        user: userId,
        checkoutItems: checkoutItems,
        shippingAddress,
        paymentMethod,
        totalPrice,
        paymentStatus: "Pending",
        isPaid: false,
      });
      console.log(`Thanh toán đã tạo cho người dùng: ${userId}`);
      return {
        status: "OK",
        message: "Tạo thanh toán thành công!",
        code: 201,
        data: newCheckout,
      };
    } catch (err) {
      throw err;
    }
  },
  updateCheckoutService: async (checkoutId, data) => {
    try {
      const { paymentDetails, paymentStatus } = data;
      const checkout = await Checkout.findById(checkoutId);
      if (!checkout) {
        return {
          status: "ERR",
          message: "Không tìm thấy thanh toán!",
          code: 404,
        };
      }
      if (paymentStatus && paymentStatus.toLowerCase() === "paid") {
        checkout.isPaid = true;
        checkout.paymentStatus = "paid";
        checkout.paymentDetails = paymentDetails;
        checkout.paidAt = Date.now();

        await checkout.save();
        return {
          status: "OK",
          message: "Cập nhật thanh toán thành công!",
          code: 200,
          data: checkout,
        };
      } else {
        return {
          status: "ERR",
          message: "Trạng thái thanh toán không hợp lệ!",
          code: 400,
        };
      }
    } catch (err) {
      throw err;
    }
  },
  completeCheckoutService: async (checkoutId) => {
    try {
      const checkout = await Checkout.findOneAndUpdate(
        { _id: checkoutId, isPaid: true, isFinalized: { $ne: true } }, // chỉ chọn chưa finalize
        { $set: { isFinalized: true, finalizedAt: Date.now() } }, // đánh dấu luôn
        { new: true }
      );

      if (!checkout) {
        return {
          status: "ERR",
          message: "Thanh toán đã hoàn tất hoặc không hợp lệ!",
          code: 409,
        };
      }

      const finalOrder = await Order.create({
        user: checkout.user,
        orderItems: checkout.checkoutItems,
        shippingAddress: checkout.shippingAddress,
        paymentMethod: checkout.paymentMethod,
        totalPrice: checkout.totalPrice,
        isPaid: true,
        paidAt: checkout.paidAt,
        isDelivered: false,
        paymentStatus: "paid",
        paymentDetails: checkout.paymentDetails,
      });

      await Cart.findOneAndDelete({ user: checkout.user });

      return {
        status: "OK",
        message: "Hoàn thành thanh toán thành công!",
        code: 201,
        data: { finalOrder },
      };
    } catch (err) {
      throw err;
    }
  },
};

module.exports = checkoutService;
