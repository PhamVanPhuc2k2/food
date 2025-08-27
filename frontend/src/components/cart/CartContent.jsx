import React from "react";
import { AiOutlineDelete } from "react-icons/ai";

const CartContent = () => {
  const cartProducts = [
    {
      productId: 1,
      name: "Rau má",
      unit: "mớ",
      quantity: 1,
      price: 15,
      image: "https://picsum.photos/200?random=1",
    },
    {
      productId: 2,
      name: "Thịt bò",
      unit: "kg",
      quantity: 2,
      price: 25,
      image: "https://picsum.photos/200?random=2",
    },
    {
      productId: 3,
      name: "Nước mắm",
      unit: "chai",
      quantity: 3,
      price: 30,
      image: "https://picsum.photos/200?random=3",
    },
  ];
  return (
    <div>
      {cartProducts.map((product, index) => {
        return (
          <div
            className="flex items-start justify-between py-4 border-b"
            key={index}
          >
            <div className="flex items-start">
              <img
                src={product.image}
                alt={product.name}
                className="w-20 h-24 object-cover mr-4 rounded"
              />
            </div>
            <div className="">
              <h3 className="">{product.name}</h3>
              <p className="">Đơn vị tính: {product.unit}</p>
              <div className="flex items-center mt-2">
                <button className="border rounded px-2 py-1 text-xl font-medium cursor-pointer">
                  -
                </button>
                <span className="mx-4">{product.quantity}</span>
                <button className="border rounded px-2 py-1 text-xl font-medium cursor-pointer">
                  +
                </button>
              </div>
            </div>
            <div className="">
              <p className="">{product.price.toLocaleString()} VNĐ</p>
              <button className="cursor-pointer">
                <AiOutlineDelete className="h-6 w-6 mt-2 text-red-500" />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CartContent;
