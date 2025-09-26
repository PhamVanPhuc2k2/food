const User = require("../models/User");
const { hashPassword } = require("../utils/handlePassword");

const adminService = {
  getAllUserService: async () => {
    try {
      const users = await User.find();
      if (!users) {
        return {
          status: "ERR",
          message: "Không tìm thấy người dùng nào!",
          code: 404,
        };
      }
      return {
        status: "OK",
        message: "Lấy danh sách người dùng thành công!",
        code: 200,
        data: users,
      };
    } catch (err) {
      throw err;
    }
  },
  createUserService: async (data) => {
    try {
      const { name, email, password, role } = data;
      let user = await User.findOne({
        email: email,
      });
      if (user) {
        return {
          status: "ERR",
          message: "Tài khoản đã được đăng ký!",
          code: 400,
        };
      }
      const hashed = await hashPassword(password);
      user = new User({
        name: name,
        email: email,
        password: hashed,
        role: role || "customer",
      });
      await user.save();
      return {
        status: "OK",
        message: "Tạo người dùng thành công!",
        code: 200,
        data: user,
      };
    } catch (err) {
      throw err;
    }
  },
  updateUserService: async (userId, data) => {
    try {
      const user = await User.findById(userId);
      if (!user) {
        return {
          status: "ERR",
          message: "Người dùng không tồn tại!",
          code: 404,
        };
      }
      const updatedUser = await User.findByIdAndUpdate(userId, data, {
        new: true,
      });
      return {
        status: "OK",
        message: "Cập nhật người dùng thành công!",
        code: 200,
        data: updatedUser,
      };
    } catch (err) {
      throw err;
    }
  },
  deleteUserService: async (userId) => {
    try {
      const user = await User.findById(userId);
      if (!user) {
        return {
          status: "ERR",
          message: "Người dùng không tồn tại!",
          code: 404,
        };
      }
      await User.findByIdAndDelete(userId);
      return {
        status: "OK",
        message: "Xóa người dùng thành công!",
        code: 200,
        id: userId,
      };
    } catch (err) {
      throw err;
    }
  },
};

module.exports = adminService;
