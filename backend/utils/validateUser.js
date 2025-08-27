const Joi = require("joi");

const registerSchema = Joi.object({
  name: Joi.string().trim().min(3).max(12).required().messages({
    "string.empty": "Tên không được để trống!",
    "string.min": "Tên phải có ít nhất 3 ký tự!",
    "string.max": "Tên không được vượt quá 12 ký tự!",
    "any.required": "Tên là bắt buộc!",
  }),
  email: Joi.string().trim().email().required().messages({
    "string.empty": "Email không được để trống!",
    "string.email": "Email không hợp lệ!",
    "any.required": "Email là bắt buộc!",
  }),
  password: Joi.string().trim().min(6).required().messages({
    "string.empty": "Mật khẩu không được để trống!",
    "string.min": "Mật khẩu phải có ít nhất 6 ký tự!",
    "any.required": "Mật khẩu là bắt buộc!",
  }),
});

const loginSchema = Joi.object({
  email: Joi.string().trim().email().required().messages({
    "string.empty": "Email không được để trống!",
    "string.email": "Email không hợp lệ!",
    "any.required": "Email là bắt buộc!",
  }),
  password: Joi.string().trim().required().messages({
    "string.empty": "Mật khẩu không được để trống!",
    "any.required": "Mật khẩu là bắt buộc!",
  }),
});

const updatePassword = Joi.object({
  currentPassword: Joi.string().trim().required().messages({
    "string.empty": "Mật khẩu hiện tại không được để trống!",
    "any.required": "Mật khẩu hiện tại là bắt buộc!",
  }),
  newPassword: Joi.string().trim().min(6).required().messages({
    "string.empty": "Mật khẩu mới không được để trống!",
    "string.min": "Mật khẩu phải có ít nhất 6 ký tự!",
    "any.required": "Mật khẩu mới là bắt buộc!",
  }),
});

module.exports = {
  registerSchema,
  loginSchema,
  updatePassword,
};
