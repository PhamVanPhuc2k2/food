import React from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { useDispatch } from "react-redux";
import {
  removeFromCart,
  updateCartItemQuantity,
} from "../../redux/slices/cartSlice";

const CartContent = ({ cart, userId, guestId }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (productId, delta, quantity) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1) {
      dispatch(
        updateCartItemQuantity({
          productId,
          quantity: newQuantity,
          guestId,
          userId,
        })
      );
    }
  };

  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart({ productId, guestId, userId }));
  };

  return (
    <div>
      {cart?.products?.length > 0 ? (
        cart.products.map((product, index) => (
          <div
            className="flex items-start justify-between py-4 border-b"
            key={index}
          >
            <div className="flex items-start">
              <img
                src={product?.image?.url}
                alt={product?.name}
                className="w-20 h-24 object-cover mr-4 rounded"
              />
            </div>
            <div>
              <h3>{product.name}</h3>
              <p>Đơn vị tính: {product.unit}</p>
              <div className="flex items-center mt-2">
                <button
                  onClick={() =>
                    handleAddToCart(product.productId, -1, product.quantity)
                  }
                  className="border rounded px-2 py-1 text-xl font-medium cursor-pointer"
                >
                  -
                </button>
                <span className="mx-4">{product.quantity}</span>
                <button
                  onClick={() =>
                    handleAddToCart(product.productId, 1, product.quantity)
                  }
                  className="border rounded px-2 py-1 text-xl font-medium cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>
            <div>
              <p>{product.price.toLocaleString()} VNĐ</p>
              <button
                onClick={() => handleRemoveFromCart(product.productId)}
                className="cursor-pointer"
              >
                <AiOutlineDelete className="h-6 w-6 mt-2 text-red-500" />
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>Giỏ hàng trống</p>
      )}
    </div>
  );
};

export default CartContent;
