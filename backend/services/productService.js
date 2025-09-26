const Product = require("../models/Product");

const productService = {
  // ----------------- CREATE -----------------
  createProductService: async (userId, data) => {
    try {
      const checkProduct = await Product.findOne({ sku: data.sku });
      if (checkProduct) {
        return {
          status: "ERR",
          message: "Sản phẩm đã tồn tại!",
          code: 409,
          data: null,
        };
      }

      const newProduct = await Product.create({
        ...data,
        user: userId, // gán userId từ param
      });

      return {
        status: "OK",
        message: "Tạo sản phẩm thành công!",
        code: 201,
        data: newProduct,
      };
    } catch (err) {
      throw err;
    }
  },

  // ----------------- UPDATE -----------------
  updateProductService: async (productId, data) => {
    try {
      const checkProduct = await Product.findById(productId);
      if (!checkProduct) {
        return {
          status: "ERR",
          message: "Sản phẩm không tồn tại!",
          code: 404,
          data: null,
        };
      }

      const updatedProduct = await Product.findByIdAndUpdate(productId, data, {
        new: true,
      });

      return {
        status: "OK",
        message: "Cập nhật sản phẩm thành công!",
        code: 200,
        data: updatedProduct,
      };
    } catch (err) {
      throw err;
    }
  },

  // ----------------- DELETE -----------------
  deleteProductService: async (productId) => {
    try {
      const checkProduct = await Product.findById(productId);
      if (!checkProduct) {
        return {
          status: "ERR",
          message: "Sản phẩm không tồn tại!",
          code: 404,
          data: null,
        };
      }

      await Product.findByIdAndDelete(productId);

      return {
        status: "OK",
        message: "Xóa sản phẩm thành công!",
        code: 200,
        data: null,
      };
    } catch (err) {
      throw err;
    }
  },

  // ----------------- GET ALL -----------------
  getAllProductService: async (data) => {
    try {
      const {
        minPrice,
        maxPrice,
        sortBy,
        search,
        category,
        brand,
        limit = 8,
        page = 1,
      } = data;
      let filter = {};
      let sort = {};
      if (category) {
        filter.category = category;
      }
      if (minPrice || maxPrice) {
        filter.price = {};
        if (minPrice) filter.price.$gte = Number(minPrice);
        if (maxPrice) filter.price.$lte = Number(maxPrice);
      }
      if (brand) {
        filter.brand = brand;
      }
      if (search) {
        filter.$or = [
          { name: { $regex: search, $options: "i" } },
          { description: { $regex: search, $options: "i" } },
        ];
      }
      if (sortBy) {
        switch (sortBy) {
          case "priceAsc":
            sort = { price: 1 };
            break;
          case "priceDesc":
            sort = { price: -1 };
            break;
          case "popularity":
            sort = { rating: -1 };
            break;
          default:
            break;
        }
      }

      let skip = (page - 1) * limit;

      let products = await Product.find(filter)
        .sort(sort)
        .limit(Number(limit))
        .skip(skip);

      let totalProduct = await Product.countDocuments(filter);
      return {
        status: "OK",
        message: "Lấy danh sách sản phẩm thành công!",
        code: 200,
        data: products,
        pagination: {
          page,
          limit,
          totalProduct,
          totalPage: Math.ceil(totalProduct / limit),
        },
      };
    } catch (err) {
      throw err;
    }
  },
  getDetailProductService: async (productId) => {
    try {
      const product = await Product.findOne({
        _id: productId,
      });
      if (!product) {
        return {
          status: "ERR",
          message: "Không tìm thấy sản phẩm!",
          code: 404,
        };
      }
      return {
        status: "OK",
        message: "Lấy thông tin sản phẩm thành công!",
        code: 200,
        data: product,
      };
    } catch (err) {
      throw err;
    }
  },
  getSimilarProductService: async (productId) => {
    try {
      const product = await Product.findOne({
        _id: productId,
      });
      if (!product) {
        return {
          status: "ERR",
          message: "Không tìm thấy sản phẩm!",
          code: 404,
        };
      }
      const similarProducts = await Product.find({
        category: product.category,
        _id: { $ne: productId },
      }).limit(4);
      return {
        status: "OK",
        message: "Lấy thông tin sản phẩm thành công",
        code: 200,
        data: {
          product,
          similarProducts,
        },
      };
    } catch (err) {
      throw err;
    }
  },
  getBestSellerService: async () => {
    try {
      const bestSeller = await Product.findOne().sort({ rating: -1 });
      if (!bestSeller) {
        return {
          status: "ERR",
          message: "Không tìm thấy sản phẩm bán chạy nào!",
          code: 404,
        };
      }
      return {
        status: "OK",
        message: "Lấy thông tin sản phẩm thành công!",
        code: 200,
        bestSeller,
      };
    } catch (err) {
      throw err;
    }
  },
  getNewArrivalService: async () => {
    try {
      const newProducts = await Product.find().sort({ createdAt: -1 }).limit(8);
      if (!newProducts) {
        return {
          status: "ERR",
          message: "Không có sản phẩm mới nào!",
          code: 404,
        };
      }
      return {
        status: "OK",
        message: "Lấy danh sách sản phẩm mới thành công!",
        code: 200,
        newProducts,
      };
    } catch (err) {
      throw err;
    }
  },
};

module.exports = productService;
