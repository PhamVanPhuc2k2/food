const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB);
    console.log("Kết nối database thành công!");
  } catch (err) {
    console.error("Kết nối database thất bại!", err);
    process.exit(1);
  }
};

module.exports = connectDB;
