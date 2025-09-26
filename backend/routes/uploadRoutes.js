const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");
const uploadController = require("../controllers/uploadController");

router.post("/", upload.single("file"), uploadController.uploadImage);

module.exports = router;
