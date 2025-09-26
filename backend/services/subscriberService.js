const Subscriber = require("../models/Subscriber");

const subscriberService = {
  createSubscriberService: async (email) => {
    try {
      let subscriber = await Subscriber.findOne({ email });
      if (subscriber) {
        return {
          status: "ERR",
          message: "email is already subscribed!",
          code: 400,
        };
      }
      subscriber = new Subscriber({ email });
      await subscriber.save();
      return {
        status: "OK",
        message: "Successfully subscribed to the newsletter!",
        code: 201,
      };
    } catch (err) {
      throw err;
    }
  },
};

module.exports = subscriberService;
