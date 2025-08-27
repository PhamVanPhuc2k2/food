const errorHandler = (err, req, res, next) => {
  console.error("Error", err);
  res.status(500).json({
    status: "ERR",
    message: err.message || "Đã xảy ra lỗi ở phía server!",
  });
};

module.exports = errorHandler;
