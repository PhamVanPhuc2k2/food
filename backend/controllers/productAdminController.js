const productAdminService = require("../services/productAdminService");

const productAdminController = {
  getProductsController: async (req, res, next) => {
    try {
      const response = await productAdminService.getProductsService();
      return res.status(response.code).json(response);
    } catch (err) {
      next(err);
    }
  },
};

module.exports = productAdminController;
