const { options } = require("joi");
const User = require("../models/User");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../utils/handleJWT");
const { hashPassword, comparePassword } = require("../utils/handlePassword");

const userServices = {
  registerService: async (data) => {
    const { name, email, password } = data;
    try {
      const checkEmail = await User.findOne({
        email: email,
      });
      if (checkEmail) {
        return {
          status: "ERR",
          message: "Email đã tồn tại!",
          code: 409,
        };
      }
      const hashed = await hashPassword(password);
      const newUser = await User.create({
        name: name,
        email: email,
        password: hashed,
      });
      return {
        status: "OK",
        message: "Đăng ký thành công!",
        code: 201,
        data: {
          id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
        },
      };
    } catch (err) {
      throw err;
    }
  },
  loginService: async (data) => {
    const { email, password } = data;
    try {
      const checkUser = await User.findOne({
        email: email,
      });
      if (!checkUser) {
        return {
          status: "ERR",
          message: "Email chưa được đăng ký!",
          code: 404,
        };
      }
      const compared = await comparePassword(password, checkUser.password);
      if (!compared) {
        return {
          status: "ERR",
          message: "Mật khẩu khẩu không chính xác!",
          code: 401,
        };
      }
      const access_token = generateAccessToken(checkUser);
      const refresh_token = generateRefreshToken(checkUser);
      return {
        status: "OK",
        message: "Đăng nhập thành công!",
        code: 200,
        user: {
          _id: checkUser._id,
          name: checkUser.name,
          email: checkUser.email,
          role: checkUser.role,
        },
        access_token: access_token,
        refresh_token: refresh_token,
      };
    } catch (err) {
      throw err;
    }
  },
  getUserByIdService: async (userId) => {
    try {
      const getUser = await User.findOne({
        _id: userId,
      });
      if (!getUser) {
        return {
          status: "ERR",
          message: "Không tìm thấy thông tin người dùng!",
          code: 404,
        };
      }
      return {
        status: "OK",
        message: "Lấy thông tin người dùng thành công!",
        code: 200,
        getUser: {
          _id: getUser._id,
          name: getUser.name,
          email: getUser.email,
          role: getUser.role,
        },
      };
    } catch (err) {
      throw err;
    }
  },
  getAllUserService: async (data) => {
    const SORT_WHITELIST = new Set(["name", "createdAt"]);
    try {
      const {
        role,
        sortBy,
        order = "desc",
        page = 1,
        limit = 10,
        search,
      } = data;
      const filter = {};
      if (role) {
        filter.role = role;
      }
      if (search && search.trim() !== "") {
        const regex = new RegExp(search, "i");
        filter.$or = [{ name: regex }, { email: regex }];
      }
      let sort = { createdAt: -1 };
      if (sortBy && SORT_WHITELIST.has(sortBy)) {
        sort = { [sortBy]: order === "asc" ? 1 : -1 };
      }
      const skip = (page - 1) * limit;
      const users = await User.find(filter)
        .select("-password")
        .sort(sort)
        .skip(skip)
        .limit(Number(limit));

      const totalUser = await User.countDocuments(filter);
      return {
        status: "OK",
        message: "Lấy danh sách người dùng thành công!",
        code: 200,
        data: {
          users,
          pagination: {
            totalUser,
            totalPage: Math.ceil(totalUser / limit),
            currentPage: Number(page),
            limitPerPage: Number(limit),
          },
          sort: { by: sortBy || "createdAt", order },
          filter,
          search: search || null,
        },
      };
    } catch (err) {
      throw err;
    }
  },
  updatePasswordService: async (userId, currentPassword, newPassword) => {
    try {
      const checkUser = await User.findOne({
        _id: userId,
      });
      if (!checkUser) {
        return {
          status: "ERR",
          message: "Người dùng không tồn tại!",
          code: 404,
        };
      }
      const compared = await comparePassword(
        currentPassword,
        checkUser.password
      );
      if (!compared) {
        return {
          status: "ERR",
          message: "Mật khẩu không đúng!",
          code: 401,
        };
      }
      const hashed = await hashPassword(newPassword);
      await User.findByIdAndUpdate(
        userId,
        {
          password: hashed,
        },
        { new: true }
      );
      return {
        status: "OK",
        message: "Thay đổi mật khẩu thành công!",
        code: 200,
      };
    } catch (err) {
      throw err;
    }
  },
  deleteUserService: async (userId) => {
    try {
      const checkUser = await User.findOne({
        _id: userId,
      });
      if (!checkUser) {
        return {
          status: "ERR",
          message: "Không tìm thấy người dùng!",
          code: 404,
        };
      }
      await User.findByIdAndDelete(userId, { new: true });
      return {
        status: "OK",
        message: "Xóa người dùng thành công!",
        code: 200,
      };
    } catch (err) {
      throw err;
    }
  },
};

module.exports = userServices;
