const express = require("express");
const momoController = require("../controllers/momoController");
const router = express.Router();

router.post("/create", momoController.createMoMoController);

module.exports = router;
