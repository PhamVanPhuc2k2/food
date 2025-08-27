import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import ProductGrid from "./ProductGrid";

const selectedProduct = {
  name: "Rau bí",
  price: 120,
  originPrice: 150,
  description: "Rau nhà trồng",
  unit: "Mớ",
  image: [
    {
      url: "https://picsum.photos/200?random=1",
      altText: "Rau bí",
    },
    {
      url: "https://picsum.photos/200?random=2",
      altText: "Rau bí",
    },
  ],
};

const similarProducts = [
  {
    _id: 1,
    name: "Product 1",
    price: 100,
    image: [
      {
        url: "https://picsum.photos/200?random=5",
        altText: "Rau bí",
      },
    ],
  },
  {
    _id: 2,
    name: "Product 2",
    price: 100,
    image: [
      {
        url: "https://picsum.photos/200?random=6",
        altText: "Rau bí",
      },
    ],
  },
  {
    _id: 3,
    name: "Product 3",
    price: 100,
    image: [
      {
        url: "https://picsum.photos/200?random=7",
        altText: "Rau bí",
      },
    ],
  },
  {
    _id: 4,
    name: "Product 4",
    price: 100,
    image: [
      {
        url: "https://picsum.photos/200?random=8",
        altText: "Rau bí",
      },
    ],
  },
];

const ProductDetail = () => {
  // Gán giá trị mặc định cho mainImage để tránh src=""
  const [mainImage, setMainImage] = useState(
    selectedProduct.image[0]?.url || ""
  );
  const [quantity, setQuantity] = useState(1);
  const [isButtonDisable, setIsButtonDisable] = useState(false);

  const handleChangeQuantity = (action) => {
    if (action === "increase") setQuantity((prev) => prev + 1);
    if (action === "reduce" && quantity > 1) setQuantity((prev) => prev - 1);
  };

  const handleAddToCart = () => {
    setIsButtonDisable(true);
    setTimeout(() => {
      toast.success("Thêm vào giỏ hàng thành công!", {
        duration: 1000,
      });
      setIsButtonDisable(false);
    }, 500);
  };

  useEffect(() => {
    if (selectedProduct?.image?.length > 0) {
      setMainImage(selectedProduct.image[0].url);
    }
  }, []);

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-lg p-8">
        <div className="flex flex-col md:flex-row">
          <div className="hidden md:flex flex-col space-y-4 mr-6">
            {selectedProduct.image.map((image, index) => (
              <img
                key={index}
                src={image.url}
                alt={image.altText}
                className={`h-20 w-20 object-cover rounded-lg cursor-pointer border ${
                  mainImage === image.url ? "border-black" : "border-white"
                }`}
                onClick={() => setMainImage(image.url)}
              />
            ))}
          </div>
          <div className="md:w-1/2">
            <div className="mb-4">
              <img
                src={mainImage}
                alt="Main product"
                className="w-full h-auto object-cover rounded-lg"
              />
            </div>
          </div>
          {/* mobile */}
          <div className="md:hidden flex overflow-x-scroll space-x-4 mb-4">
            {selectedProduct.image.map((image, index) => (
              <img
                key={index}
                src={image.url}
                alt={image.altText}
                className={`h-20 w-20 object-cover rounded-lg cursor-pointer border ${
                  mainImage === image.url ? "border-black" : "border-white"
                }`}
                onClick={() => setMainImage(image.url)}
              />
            ))}
          </div>
          {/* Right Side */}
          <div className="md:w-1/2 md:ml-10">
            <h1 className="text-2xl md:text-3xl font-semibold mb-2">
              {selectedProduct.name}
            </h1>
            <p className="text-lg text-gray-600 mb-1 line-through">
              {selectedProduct.originPrice &&
                `${selectedProduct.originPrice} VNĐ`}
            </p>
            <p className="text-xl text-gray-500 mb-2">
              {selectedProduct.price} VNĐ
            </p>
            <p className="text-gray-600 mb-4">{selectedProduct.description}</p>
            <div className="mb-4 flex items-center space-x-2">
              <p className="text-gray-700">Đơn vị tính:</p>
              <p className="font-semibold">{selectedProduct.unit}</p>
            </div>
            <div className="mb-6 flex items-center space-x-2">
              <p className="text-gray-700">Số lượng:</p>
              <div className="flex items-center space-x-2 mt-2">
                <button
                  onClick={() => handleChangeQuantity("reduce")}
                  className="px-2 py-1 bg-gray-200 rounded text-lg cursor-pointer"
                >
                  -
                </button>
                <span className="text-lg">{quantity}</span>
                <button
                  onClick={() => handleChangeQuantity("increase")}
                  className="px-2 py-1 bg-gray-200 rounded text-lg cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>
            <button
              disabled={isButtonDisable}
              onClick={handleAddToCart}
              className={`bg-black text-white py-2 px-6 rounded w-full mb-4 cursor-pointer ${
                isButtonDisable
                  ? "cursor-not-allowed opacity-50"
                  : "hover:bg-gray-900"
              }`}
            >
              {isButtonDisable ? "Loading..." : "THÊM VÀO GIỎ HÀNG"}
            </button>
          </div>
        </div>
        <div className="mt-20">
          <h2 className="text-2xl text-center font-medium mb-4">
            Bạn có thể thích
          </h2>
          <ProductGrid products={similarProducts} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
