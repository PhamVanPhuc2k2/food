const Cart = require("../models/Cart");
const Product = require("../models/Product");

const cartService = {
  getCart: async (userId, guestId) => {
    if (userId) {
      return await Cart.findOne({ user: userId });
    } else if (guestId) {
      return await Cart.findOne({ guestId });
    }
    return null;
  },
  createCartService: async (data) => {
    const { productId, quantity, unit, guestId, userId } = data;
    try {
      const product = await Product.findById(productId);
      if (!product) {
        return {
          status: "ERR",
          message: "Không tìm thấy sản phẩm!",
          code: 404,
        };
      }
      let cart = await cartService.getCart(userId, guestId);
      if (cart) {
        const productIndex = cart.products.findIndex(
          (p) => p.productId.toString() === productId
        );
        if (productIndex > -1) {
          cart.products[productIndex].quantity += quantity;
        } else {
          cart.products.push({
            productId,
            name: product.name,
            image: product.images[0],
            price: product.price,
            quantity,
          });
        }
        cart.totalPrice = cart.products.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        );
        await cart.save();
        return {
          status: "OK",
          message: "Thêm sản phẩm vào giỏ hàng thành công!",
          code: 201,
          data: {
            cart,
          },
        };
      } else {
        const newCart = await Cart.create({
          user: userId ? userId : undefined,
          guestId: guestId ? guestId : "guest_" + new Date().getTime(),
          products: [
            {
              productId,
              name: product.name,
              image: product.images[0].url,
              price: product.price,
              quantity,
            },
          ],
          totalPrice: product.price * quantity,
        });
        return {
          status: "OK",
          message: "Thêm sản phẩm vào giỏ hàng thành công!",
          code: 201,
          data: {
            newCart,
          },
        };
      }
    } catch (err) {
      throw err;
    }
  },
  updateCartController: async (data) => {
    const { productId, quantity, guestId, userId } = data;
    try {
      let cart = await cartService.getCart(userId, guestId);
      if (!cart) {
        return {
          status: "ERR",
          message: "Không tìm thấy giỏ hàng!",
          code: 404,
        };
      }
      const productIndex = cart.products.findIndex(
        (p) => p.productId.toString() === productId
      );
      if (productIndex > -1) {
        if (quantity > 0) {
          cart.products[productIndex].quantity += quantity;
        } else {
          cart.products.splice(productIndex, 1);
        }
        cart.totalPrice = cart.products.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        );
        await cart.save();
        return {
          status: "OK",
          message: "Cập nhật giỏ hàng thành công!",
          code: 200,
          data: {
            cart,
          },
        };
      } else {
        return {
          status: "ERR",
          message: "Không tìm thấy sản phẩm trong giỏ hàng!",
        };
      }
    } catch (err) {
      throw err;
    }
  },
  deleteCartService: async (data) => {
    const { productId, guestId, userId } = data;
    try {
      let cart = await cartService.getCart(userId, guestId);
      if (!cart) {
        return {
          status: "ERR",
          message: "Không tìm thấy giỏ hàng!",
          code: 404,
        };
      }
      const productIndex = cart.products.findIndex(
        (p) => p.productId.toString() === productId
      );
      if (productIndex > -1) {
        cart.products.splice(productIndex, 1);
        cart.totalPrice = cart.products.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        );
        await cart.save();
        return {
          status: "ERR",
          message: "Xóa sản phẩm khỏi giỏ hàng thành công!",
          code: 200,
        };
      } else {
        return {
          status: "ERR",
          message: "Không tìm thấy sản phẩm trong giỏ hàng!",
          code: 404,
        };
      }
    } catch (err) {
      next(err);
    }
  },
  getCartService: async (data) => {
    const { userId, guestId } = data;
    try {
      const cart = await cartService.getCart(userId, guestId);
      if (cart) {
        return {
          status: "OK",
          message: "Lấy thông tin giỏ hàng thành công!",
          code: 200,
          data: {
            cart,
          },
        };
      } else {
        return {
          status: "OK",
          message: "Không tìm thấy giỏ hàng!",
          code: 404,
        };
      }
    } catch (err) {
      throw err;
    }
  },
  mergeCartService: async (guestId, userId) => {
    try {
      const guestCart = await Cart.findOne({
        guestId,
      });
      const userCart = await Cart.findOne({ _id: userId });
      if (guestCart) {
        if (guestCart.products.length === 0) {
          return {
            status: "ERR",
            message: "Giỏ hàng của khách hàng đang trống!",
          };
        }
        if (userCart) {
          guestCart.products.forEach((guestItem) => {
            const productIndex = userCart.products.findIndex(
              (item) =>
                item.productId.toString() === guestItem.productId.toString()
            );
            if (productIndex > -1) {
              userCart.products[productIndex].quantity += guestItem.quantity;
            } else {
              userCart.products.push(guestItem);
            }
          });
          userCart.totalPrice = userCart.products.reduce(
            (acc, item) => acc + item.price * item.quantity,
            0
          );
          await userCart.save();
          try {
            await Cart.findOneAndDelete({ guestId });
          } catch (err) {
            console.error("Lỗi xóa gỏ hàng khách hàng!: ", err);
          }
          return {
            status: "OK",
            message: "Hợp nhất giỏ hàng thành công!",
            code: 200,
            data: {
              userCart,
            },
          };
        } else {
          guestCart.user = userId;
          guestCart.guestId = undefined;
          await guestCart.save();
          return {
            status: "OK",
            message: "Tạo giỏ hàng cho người dùng thành công!",
            code: 200,
            data: {
              guestCart,
            },
          };
        }
      } else {
        if (userCart) {
          return {
            status: "OK",
            message: "Tạo giỏ hàng cho người dùng thành công!",
            code: 200,
            data: {
              userCart,
            },
          };
        }
        return {
          status: "ERR",
          message: "Không tìm thấy giỏ hàng khách hàng!",
          code: 404,
        };
      }
    } catch (err) {
      throw err;
    }
  },
};

module.exports = cartService;
