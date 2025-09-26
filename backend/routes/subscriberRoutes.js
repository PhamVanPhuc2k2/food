const express = require("express");
const router = express.Router();
const subscriberController = require("../controllers/subscriberController");

router.post("/subscriber", subscriberController.createSubscriberController);

module.exports = router;
