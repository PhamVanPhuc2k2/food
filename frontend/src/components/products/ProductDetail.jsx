import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import ProductGrid from "./ProductGrid";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductDetails,
  fetchSimilarProducts,
} from "../../redux/slices/productSlice";
import { addToCart } from "../../redux/slices/cartSlice";

const ProductDetail = ({ productId }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedProduct, loading, error, similarProducts } = useSelector(
    (state) => state.products
  );
  const { user, guestId } = useSelector((state) => state.auth);

  const [mainImage, setMainImage] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isButtonDisable, setIsButtonDisable] = useState(false);

  const productFetchId = productId || id;

  const handleChangeQuantity = (action) => {
    if (action === "increase") setQuantity((prev) => prev + 1);
    if (action === "reduce" && quantity > 1) setQuantity((prev) => prev - 1);
  };

  const handleAddToCart = () => {
    setIsButtonDisable(true);
    dispatch(
      addToCart({
        productId: productFetchId,
        quantity,
        guestId,
        userId: user?._id,
      })
    )
      .then(() => {
        toast.success("Product added to cart!", { duration: 1000 });
      })
      .finally(() => {
        setIsButtonDisable(false);
      });
  };

  useEffect(() => {
    if (productFetchId) {
      dispatch(fetchProductDetails(productFetchId));
      dispatch(fetchSimilarProducts({ id: productFetchId }));
    }
  }, [dispatch, productFetchId]);

  useEffect(() => {
    if (selectedProduct?.images?.length > 0) {
      setMainImage(selectedProduct.images[0].url);
    }
  }, [selectedProduct]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!selectedProduct) return <p>Không tìm thấy sản phẩm</p>;

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-lg p-8">
        <div className="flex flex-col md:flex-row">
          {/* Thumbnail list */}
          <div className="hidden md:flex flex-col space-y-4 mr-6">
            {selectedProduct.images?.map((image, index) => (
              <img
                key={index}
                src={image.url}
                alt={image.altText || "product image"}
                className={`h-20 w-20 object-cover rounded-lg cursor-pointer border ${
                  mainImage === image.url ? "border-black" : "border-white"
                }`}
                onClick={() => setMainImage(image.url)}
              />
            ))}
          </div>

          {/* Main image */}
          <div className="md:w-1/2">
            <div className="mb-4">
              {mainImage ? (
                <img
                  src={mainImage}
                  alt={selectedProduct.name}
                  className="w-full h-auto object-cover rounded-lg"
                />
              ) : (
                <div className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
                  No Image
                </div>
              )}
            </div>
          </div>

          {/* Mobile thumbnails */}
          <div className="md:hidden flex overflow-x-scroll space-x-4 mb-4">
            {selectedProduct.images?.map((image, index) => (
              <img
                key={index}
                src={image.url}
                alt={image.altText || "product image"}
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
              {selectedProduct.price.toLocaleString("vi-VN")} VNĐ
            </p>
            <p className="text-gray-600 mb-4">{selectedProduct.description}</p>

            <div className="mb-4 flex items-center space-x-2">
              <p className="text-gray-700">Đơn vị tính:</p>
              <p className="font-semibold">{selectedProduct.unit}</p>
            </div>

            {/* Quantity control */}
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

            {/* Add to cart button */}
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

        {/* Similar products */}
        <div className="mt-20">
          <h2 className="text-2xl text-center font-medium mb-4">
            Bạn có thể thích
          </h2>
          <ProductGrid
            products={Array.isArray(similarProducts) ? similarProducts : []}
            loading={loading}
            error={error}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
