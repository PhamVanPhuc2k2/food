const cloudinary = require("../config/cloudinary");

const uploadController = {
  uploadImage: async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }
      const result = await cloudinary.uploader.upload_stream(
        { folder: "products" },
        (error, result) => {
          if (error)
            return res.status(500).json({ message: "Upload failed", error });
          return res.json({ url: result.secure_url });
        }
      );
      result.end(req.file.buffer);
    } catch (err) {
      res.status(500).json({ message: "Server error", err });
    }
  },
};

module.exports = uploadController;
