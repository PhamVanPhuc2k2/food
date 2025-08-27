const Joi = require("joi");

// Hàm slugify để tạo slug từ string
const slugify = (str) => {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // bỏ dấu tiếng Việt
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // khoảng trắng -> dấu -
    .replace(/[^a-z0-9-]/g, ""); // bỏ ký tự đặc biệt
};

// ---------------- CREATE PRODUCT ----------------
const createProductSchema = Joi.object({
  name: Joi.string().trim().required().messages({
    "string.base": "Tên sản phẩm phải là chuỗi!",
    "string.empty": "Tên sản phẩm không được để trống!",
    "any.required": "Tên sản phẩm là bắt buộc!",
  }),

  description: Joi.string().required().messages({
    "string.base": "Mô tả sản phẩm phải là chuỗi!",
    "string.empty": "Mô tả sản phẩm không được để trống!",
    "any.required": "Mô tả sản phẩm là bắt buộc!",
  }),

  price: Joi.number().required().messages({
    "number.base": "Giá sản phẩm phải là số!",
    "any.required": "Giá sản phẩm là bắt buộc!",
  }),

  discountPrice: Joi.number().optional().messages({
    "number.base": "Giá giảm phải là số!",
  }),

  countInStock: Joi.number().min(0).required().messages({
    "number.base": "Số lượng trong kho phải là số!",
    "number.min": "Số lượng trong kho không được nhỏ hơn 0!",
    "any.required": "Số lượng trong kho là bắt buộc!",
  }),

  sku: Joi.string().required().messages({
    "string.base": "Mã SKU phải là chuỗi!",
    "string.empty": "Mã SKU không được để trống!",
    "any.required": "Mã SKU là bắt buộc!",
  }),

  category: Joi.string()
    .required()
    .custom((value) => slugify(value))
    .messages({
      "string.base": "Danh mục phải là chuỗi!",
      "string.empty": "Danh mục không được để trống!",
      "any.required": "Danh mục là bắt buộc!",
    }),

  brand: Joi.string().optional().messages({
    "string.base": "Thương hiệu phải là chuỗi!",
  }),

  collections: Joi.string()
    .required()
    .custom((value) => slugify(value))
    .messages({
      "string.base": "Bộ sưu tập phải là chuỗi!",
      "string.empty": "Bộ sưu tập không được để trống!",
      "any.required": "Bộ sưu tập là bắt buộc!",
    }),

  unit: Joi.string().default("kg").messages({
    "string.base": "Đơn vị tính phải là chuỗi!",
  }),

  images: Joi.array()
    .items(
      Joi.object({
        url: Joi.string().uri().required().messages({
          "string.base": "URL hình ảnh phải là chuỗi!",
          "string.uri": "URL hình ảnh không hợp lệ!",
          "any.required": "URL hình ảnh là bắt buộc!",
        }),
        altText: Joi.string().optional().messages({
          "string.base": "Alt text phải là chuỗi!",
        }),
      })
    )
    .min(1)
    .required()
    .messages({
      "array.base": "Hình ảnh phải là một mảng!",
      "array.min": "Cần ít nhất 1 hình ảnh!",
      "any.required": "Hình ảnh là bắt buộc!",
    }),

  isFeatured: Joi.boolean().default(false).messages({
    "boolean.base": "Trường nổi bật phải là kiểu boolean!",
  }),

  isPublished: Joi.boolean().default(false).messages({
    "boolean.base": "Trạng thái xuất bản phải là kiểu boolean!",
  }),

  rating: Joi.number().min(0).max(5).default(0).messages({
    "number.base": "Đánh giá phải là số!",
    "number.min": "Đánh giá không được nhỏ hơn 0!",
    "number.max": "Đánh giá không được lớn hơn 5!",
  }),

  numReviews: Joi.number().min(0).default(0).messages({
    "number.base": "Số lượng đánh giá phải là số!",
    "number.min": "Số lượng đánh giá không được nhỏ hơn 0!",
  }),

  tags: Joi.array()
    .items(
      Joi.string().messages({
        "string.base": "Tag phải là chuỗi!",
      })
    )
    .messages({
      "array.base": "Tags phải là một mảng!",
    }),

  user: Joi.string().required().messages({
    "string.base": "Người tạo sản phẩm phải là chuỗi!",
    "any.required": "Người tạo sản phẩm là bắt buộc!",
  }),

  metaTitle: Joi.string().optional().messages({
    "string.base": "Meta title phải là chuỗi!",
  }),
  metaDescription: Joi.string().optional().messages({
    "string.base": "Meta description phải là chuỗi!",
  }),
  metaKeywords: Joi.string().optional().messages({
    "string.base": "Meta keywords phải là chuỗi!",
  }),
});

// ---------------- UPDATE PRODUCT ----------------
const updateProductSchema = Joi.object({
  name: Joi.string().trim().messages({
    "string.base": "Tên sản phẩm phải là chuỗi!",
  }),

  description: Joi.string().messages({
    "string.base": "Mô tả sản phẩm phải là chuỗi!",
  }),

  price: Joi.number().messages({
    "number.base": "Giá sản phẩm phải là số!",
  }),

  discountPrice: Joi.number().messages({
    "number.base": "Giá giảm phải là số!",
  }),

  countInStock: Joi.number().min(0).messages({
    "number.base": "Số lượng trong kho phải là số!",
    "number.min": "Số lượng trong kho không được nhỏ hơn 0!",
  }),

  sku: Joi.string().messages({
    "string.base": "Mã SKU phải là chuỗi!",
  }),

  category: Joi.string()
    .custom((value) => slugify(value))
    .messages({
      "string.base": "Danh mục phải là chuỗi!",
    }),

  brand: Joi.string().messages({
    "string.base": "Thương hiệu phải là chuỗi!",
  }),

  collections: Joi.string()
    .custom((value) => slugify(value))
    .messages({
      "string.base": "Bộ sưu tập phải là chuỗi!",
    }),

  unit: Joi.string().messages({
    "string.base": "Đơn vị tính phải là chuỗi!",
  }),

  images: Joi.array()
    .items(
      Joi.object({
        url: Joi.string().uri().required().messages({
          "string.base": "URL hình ảnh phải là chuỗi!",
          "string.uri": "URL hình ảnh không hợp lệ!",
          "any.required": "URL hình ảnh là bắt buộc!",
        }),
        altText: Joi.string().messages({
          "string.base": "Alt text phải là chuỗi!",
        }),
      })
    )
    .messages({
      "array.base": "Hình ảnh phải là một mảng!",
    }),

  isFeatured: Joi.boolean().messages({
    "boolean.base": "Trường nổi bật phải là kiểu boolean!",
  }),

  isPublished: Joi.boolean().messages({
    "boolean.base": "Trạng thái xuất bản phải là kiểu boolean!",
  }),

  rating: Joi.number().min(0).max(5).messages({
    "number.base": "Đánh giá phải là số!",
    "number.min": "Đánh giá không được nhỏ hơn 0!",
    "number.max": "Đánh giá không được lớn hơn 5!",
  }),

  numReviews: Joi.number().min(0).messages({
    "number.base": "Số lượng đánh giá phải là số!",
    "number.min": "Số lượng đánh giá không được nhỏ hơn 0!",
  }),

  tags: Joi.array()
    .items(
      Joi.string().messages({
        "string.base": "Tag phải là chuỗi!",
      })
    )
    .messages({
      "array.base": "Tags phải là một mảng!",
    }),

  user: Joi.string().messages({
    "string.base": "Người tạo sản phẩm phải là chuỗi!",
  }),

  metaTitle: Joi.string().messages({
    "string.base": "Meta title phải là chuỗi!",
  }),
  metaDescription: Joi.string().messages({
    "string.base": "Meta description phải là chuỗi!",
  }),
  metaKeywords: Joi.string().messages({
    "string.base": "Meta keywords phải là chuỗi!",
  }),
});

module.exports = {
  createProductSchema,
  updateProductSchema,
};
