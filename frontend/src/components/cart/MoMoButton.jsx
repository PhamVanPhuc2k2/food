import React from "react";
import axios from "axios";

const MoMoButton = ({ amount, checkoutId, onError }) => {
  const handleMoMoPayment = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/momo/create`,
        { amount, checkoutId }
      );

      if (res.data.payUrl) {
        window.location.href = res.data.payUrl; // redirect sang MoMo
      }
    } catch (err) {
      console.error("MoMo Error:", err);
      onError?.(err);
    }
  };

  return (
    <button
      type="button"
      onClick={handleMoMoPayment}
      className="bg-pink-500 text-white px-4 py-2 rounded"
    >
      Thanh toán MoMo
    </button>
  );
};

export default MoMoButton;
