import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axiosClient from "../redux/axiosClient";
import { useDispatch } from "react-redux";
import { clearCart } from "../redux/slices/cartSlice";

const PaymentSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const resultCode = params.get("resultCode");
    const orderId = params.get("orderId");
    const transId = params.get("transId");
    const amount = params.get("amount");
    const message = params.get("message");
    const checkoutId = localStorage.getItem("checkoutId"); // 👈 bạn nên lưu checkoutId lúc tạo checkout

    const updateCheckout = async () => {
      try {
        console.log("👉 Bắt đầu update checkout");

        if (resultCode === "0" && checkoutId) {
          console.log("✅ Điều kiện đúng, gọi API update");

          const res1 = await axiosClient.put(
            `/api/checkout/${checkoutId}/pay`,
            {
              paymentStatus: "Paid",
              paymentDetails: {
                provider: "MoMo",
                orderId,
                transId,
                amount,
                message,
              },
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
              },
            }
          );
          console.log("🔹 Update xong:", res1.data);

          const res2 = await axiosClient.post(
            `/api/checkout/${checkoutId}/finalize`,
            {},
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
              },
            }
          );
          localStorage.removeItem("checkoutId");
          console.log("🔹 Finalize xong:", res2.data);
          dispatch(clearCart());
          navigate("/my-orders");
        } else {
          console.warn("❌ Không đủ điều kiện update:", {
            resultCode,
            checkoutId,
          });
          alert(message || "Thanh toán thất bại");
          navigate("/checkout");
        }
      } catch (err) {
        console.error(
          "🚨 Update checkout error:",
          err.response?.data || err.message
        );
        navigate("/checkout");
      }
    };

    updateCheckout();
  }, [location.search, navigate]);

  return <p>Đang xử lý thanh toán MoMo...</p>;
};

export default PaymentSuccess;
