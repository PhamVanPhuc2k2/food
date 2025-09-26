const Product = require("../models/Product");

const productAdminService = {
  getProductsService: async () => {
    try {
      const products = await Product.find();
      if (!products) {
        return {
          status: "ERR",
          message: "Không tìm thấy sản phẩm nào!",
          code: 404,
        };
      }
      return {
        status: "OK",
        message: "Lấy danh sách sản phẩm thành công!",
        code: 200,
        data: products,
      };
    } catch (err) {
      throw err;
    }
  },
};

module.exports = productAdminService;
