const checkRoleMiddleware = (req, res, next) => {
  const { role, id } = req.user;
  if (role === "customer") {
    if (req.params.id !== id) {
      return res.status(403).json({
        status: "ERR",
        message: "Bạn không có quyền truy cập thông tin người khác!",
      });
    }
  }
  if (role === "admin" || role === "customer") {
    return next();
  }
  return res.status(403).json({
    status: "ERR",
    message: "Role không hợp lệ!",
  });
};

module.exports = checkRoleMiddleware;
