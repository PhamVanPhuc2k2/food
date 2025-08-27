const productService = require("../services/productService");

const productController = {
  createProductController: async (req, res, next) => {
    const userId = req.user.id;
    try {
      const response = await productService.createProductService(
        userId,
        req.body
      );
      return res.status(response.code).json(response);
    } catch (err) {
      next(err);
    }
  },
  updateProductController: async (req, res, next) => {
    try {
      const productId = req.params.id;
      if (!productId) {
        return res.status(400).json({
          status: "ERR",
          message: "Không tìm thấy id sản phẩm!",
        });
      }
      const response = await productService.updateProductService(
        productId,
        req.body
      );
      return res.status(response.code).json(response);
    } catch (err) {
      next(err);
    }
  },
  deleteProductController: async (req, res, next) => {
    try {
      const productId = req.params.id;
      if (!productId) {
        return res.status(400).json({
          status: "ERR",
          message: "Không tìm thấy id sản phẩm!",
        });
      }
      const response = await productService.deleteProductService(productId);
      return res.status(response.code).json(response);
    } catch (err) {
      next(err);
    }
  },
  getAllProductController: async (req, res, next) => {
    try {
      const response = await productService.getAllProductService(req.query);
      return res.status(response.code).json(response);
    } catch (err) {
      next(err);
    }
  },
  getDetailProductController: async (req, res, next) => {
    try {
      const productId = req.params.id;
      if (!productId) {
        return res.status(400).json({
          status: "ERR",
          message: "Không tìm thấy id sản phẩm!",
        });
      }
      const response = await productService.getDetailProductService(productId);
      return res.status(response.code).json(response);
    } catch (err) {
      next(err);
    }
  },
  getSimilarProductController: async (req, res, next) => {
    try {
      const productId = req.params.id;
      if (!productId) {
        return res.status(400).json({
          status: "ERR",
          message: "Không tìm thấy id sản phẩm!",
        });
      }
      const response = await productService.getSimilarProductService(productId);
      return res.status(response.code).json(response);
    } catch (err) {
      next(err);
    }
  },
  getBestSellerController: async (req, res, next) => {
    try {
      const response = await productService.getBestSellerService();
      return res.status(response.code).json(response);
    } catch (err) {
      next(err);
    }
  },
  getNewArrivalController: async (req, res, next) => {
    try {
      const response = await productService.getNewArrivalService();
      return res.status(response.code).json(response);
    } catch (err) {
      next(err);
    }
  },
};

module.exports = productController;
