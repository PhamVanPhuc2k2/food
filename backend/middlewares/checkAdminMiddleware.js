const checkAdminMiddleware = (req, res, next) => {
  const { role } = req.user;
  if (role !== "admin") {
    return res.status(403).json({
      status: "ERR",
      message: "Chức năng chỉ dành cho Admin!",
    });
  }
  return next();
};

module.exports = checkAdminMiddleware;
