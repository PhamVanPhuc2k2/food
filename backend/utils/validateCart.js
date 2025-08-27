const Joi = require("joi");
const mongoose = require("mongoose");

const createCartSchema = Joi.object({
  productId: Joi.string()
    .required()
    .custom((value, helpers) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        return helpers.error("any.invalid");
      }
      return value;
    })
    .messages({
      "any.required": "productId là bắt buộc!",
      "any.invalid": "productId không hợp lệ!",
    }),
  quantity: Joi.number().min(1).default(1).messages({
    "number.base": "quantity phải là số!",
    "number.min": "quantity phải >= 1",
  }),
  unit: Joi.string().optional(),
  userId: Joi.string()
    .optional()
    .custom((value, helpers) => {
      if (value && !mongoose.Types.ObjectId.isValid(value)) {
        return helpers.error("any.invalid");
      }
      return value;
    })
    .messages({
      "any.invalid": "userId không hợp lệ!",
    }),
  guestId: Joi.string().optional(),
})
  .or("userId", "guestId")
  .messages({
    "object.missing": "Phải có ít nhất userId hoặc guestId!",
  });

module.exports = { createCartSchema };
