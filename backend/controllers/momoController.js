const axios = require("axios");
const crypto = require("crypto");

const momoController = {
  createMoMoController: async (req, res, next) => {
    try {
      const { amount } = req.body;

      const partnerCode = process.env.MOMO_PARTNER_CODE;
      const accessKey = process.env.MOMO_ACCESS_KEY;
      const secretKey = process.env.MOMO_SECRET_KEY;
      const requestId = partnerCode + new Date().getTime();
      const orderId = requestId;
      const orderInfo = "Thanh toán qua MoMo QR";
      const redirectUrl = "http://localhost:5173/payment-success"; // frontend nhận kết quả
      const ipnUrl = "http://localhost:8888/api/momo/callback"; // backend nhận notify
      const requestType = "captureWallet"; // 👈 dùng flow QR/ATM thay vì captureWallet
      const extraData = "";

      // raw signature theo đúng thứ tự MoMo docs
      const rawSignature = `accessKey=${accessKey}&amount=${amount}&extraData=${extraData}&ipnUrl=${ipnUrl}&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${partnerCode}&redirectUrl=${redirectUrl}&requestId=${requestId}&requestType=${requestType}`;

      const signature = crypto
        .createHmac("sha256", secretKey)
        .update(rawSignature)
        .digest("hex");

      const requestBody = {
        partnerCode,
        accessKey,
        requestId,
        amount: amount.toString(),
        orderId,
        orderInfo,
        redirectUrl,
        ipnUrl,
        extraData,
        requestType,
        signature,
        lang: "vi",
      };

      console.log("MoMo Request:", requestBody);

      const response = await axios.post(
        "https://test-payment.momo.vn/v2/gateway/api/create",
        requestBody,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log("MoMo Response:", response.data);

      // Trả về payUrl cho frontend -> render thành QR code
      return res.json({
        payUrl: response.data.payUrl,
        deeplink: response.data.deeplink,
        qrCodeUrl: response.data.qrCodeUrl, // nếu có
        resultCode: response.data.resultCode,
        message: response.data.message,
      });
    } catch (err) {
      console.error("MoMo error:", err.response?.data || err.message);
      next(err);
    }
  },
};

module.exports = momoController;
