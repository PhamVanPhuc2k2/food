import React from "react";
import { IoCloseOutline } from "react-icons/io5";
import CartContent from "../cart/CartContent";
import { useNavigate } from "react-router-dom";

const CartDrawer = ({ handleShowCartDrawer, showCartDrawer }) => {
  const navigate = useNavigate();
  const handleCheckout = () => {
    handleShowCartDrawer();
    navigate("/checkout");
  };
  return (
    <div
      className={`fixed top-0 right-0 w-3/4 sm:w-1/2 md:w-1/2 lg:w-1/4 h-full bg-white shadow-lg transform transition-transform duration-300 flex flex-col z-50 ${
        showCartDrawer ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex justify-end p-4">
        <button className="cursor-pointer" onClick={handleShowCartDrawer}>
          <IoCloseOutline className="h-6 w-6 text-gray-600" />
        </button>
      </div>
      <div className="flex-grow p-4 overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">Your Cart</h2>
        <CartContent />
      </div>
      <div className="p-4 bg-white sticky bottom-0">
        <button
          onClick={handleCheckout}
          className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:opacity-85 cursor-pointer transition"
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartDrawer;
