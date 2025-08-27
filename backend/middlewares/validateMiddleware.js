const validate = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false, //báo lỗi ở tất cả, không dừng ở lỗi đầu
      allowUnknown: false, //không cho phép field ngoài schema
      stripUnknown: true, //tự động hóa loại bỏ field không được định nghĩa
    });
    if (error) {
      const message = error.details.map((detail) => detail.message);
      return res.status(400).json({
        status: "ERR",
        message: message,
      });
    }
    req.body = value;
    next();
  };
};

module.exports = validate;
