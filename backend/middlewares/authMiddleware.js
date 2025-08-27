const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        status: "ERR",
        message: "Không có access token!",
      });
    }
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.ACCESS_TOKEN, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          status: "ERR",
          message: "Token không hợp lệ hoặc hết hạn!",
        });
      }
      req.user = {
        id: decoded.id,
        role: decoded.role,
      };
      next();
    });
  } catch (error) {
    return res.status(500).json({
      status: "ERR",
      message: error.message,
    });
  }
};

module.exports = authMiddleware;
