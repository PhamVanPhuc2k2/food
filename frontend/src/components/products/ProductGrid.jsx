import React from "react";
import { Link } from "react-router-dom";

const ProductGrid = ({ products, loading, error }) => {
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error: {error}</p>;
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
      {products.map((product, index) => {
        return (
          <Link
            key={index}
            to={`/product/${product._id}`}
            className="block shadow"
          >
            <div className="bg-white p-2 rounded-lg">
              <div className="w-full h-80 mb-4 flex items-center justify-center">
                <img
                  className="w-50 h-50 object-cover"
                  src={product.images[0].url}
                  alt={product.images[0].altText || product.name}
                />
              </div>
              <h3 className="text-sm mb-2">{product.name}</h3>
              <p className="text-gray-500 font-medium text-sm tracking-tighter">
                {product.price.toLocaleString("vi-VN")} VNĐ
              </p>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default ProductGrid;
