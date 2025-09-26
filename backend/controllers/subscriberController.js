const subscriberService = require("../services/subscriberService");

const subscriberController = {
  createSubscriberController: async (req, res, next) => {
    try {
      const { email } = req.body;
      if (!email) {
        return res.status(400).json({
          status: "ERR",
          message: "Email là bắt buộc!",
        });
      }
      const response = await subscriberService.createSubscriberService(email);
      return res.status(response.code).json(response);
    } catch (err) {
      next(err);
    }
  },
};

module.exports = subscriberController;
