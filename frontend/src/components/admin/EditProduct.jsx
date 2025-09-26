import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchProductDetails,
  updateProduct,
} from "../../redux/slices/productSlice";
import axiosClient from "../../redux/axiosClient";

const EditProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { id } = useParams();
  const { selectedProduct, loading, error } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/");
    } else {
      dispatch(fetchProductDetails(id));
    }
  }, [dispatch, id, navigate, user]);

  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: 0,
    countInStock: 0,
    sku: "",
    unit: "",
    brand: "",
    images: [],
  });

  // khi selectedProduct thay đổi => fill form
  useEffect(() => {
    if (selectedProduct) {
      setProductData({
        name: selectedProduct?.name || "",
        description: selectedProduct?.description || "",
        price: selectedProduct?.price || 0,
        countInStock: selectedProduct?.countInStock || 0,
        sku: selectedProduct?.sku || "",
        unit: selectedProduct?.unit || "",
        brand: selectedProduct?.brand || "",
        images: selectedProduct?.images || [],
      });
    }
  }, [selectedProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // preview tạm
    const tempUrl = URL.createObjectURL(file);
    setProductData((prev) => ({
      ...prev,
      images: [
        ...prev.images,
        { url: tempUrl, altText: file.name, isTemp: true },
      ],
    }));

    const formData = new FormData();
    formData.append("file", file); // backend nhận field "file"

    try {
      const res = await axiosClient.post("/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const uploadedUrl = res.data.url;
      if (uploadedUrl) {
        // thay ảnh temp bằng ảnh cloud thật
        setProductData((prev) => ({
          ...prev,
          images: prev.images.map((img) =>
            img.url === tempUrl ? { url: uploadedUrl, altText: file.name } : img
          ),
        }));
      } else {
        alert("Upload ảnh thất bại!");
        setProductData((prev) => ({
          ...prev,
          images: prev.images.filter((img) => img.url !== tempUrl),
        }));
      }
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Upload ảnh thất bại!");
      setProductData((prev) => ({
        ...prev,
        images: prev.images.filter((img) => img.url !== tempUrl),
      }));
    }
  };

  const handleRemoveImage = (index) => {
    setProductData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!productData.images || productData.images.length === 0) {
      alert("Vui lòng upload ít nhất 1 ảnh");
      return;
    }
    dispatch(updateProduct({ id, productData }));
    navigate("/admin/products");
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  return (
    <div className="max-w-5xl mx-auto p-6 shadow-md rounded-md">
      <h2 className="text-3xl font-bold mb-6">Chỉnh sửa sản phẩm</h2>
      <form onSubmit={handleSubmit}>
        {/* Name */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Tên sản phẩm</label>
          <input
            type="text"
            name="name"
            value={productData.name}
            onChange={handleChange}
            className="w-full border rounded-md p-2"
            required
          />
        </div>

        {/* Description */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Mô tả sản phẩm</label>
          <textarea
            name="description"
            value={productData.description}
            className="w-full border rounded-md p-2"
            rows={4}
            onChange={handleChange}
            required
          />
        </div>

        {/* Price */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Giá</label>
          <input
            type="number"
            name="price"
            value={productData.price}
            onChange={handleChange}
            className="w-full border rounded-md p-2"
            required
          />
        </div>

        {/* Count in stock */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Số lượng trong kho</label>
          <input
            type="number"
            name="countInStock"
            value={productData.countInStock}
            onChange={handleChange}
            className="w-full border rounded-md p-2"
            required
          />
        </div>

        {/* SKU */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">SKU</label>
          <input
            type="text"
            name="sku"
            value={productData.sku}
            onChange={handleChange}
            className="w-full border rounded-md p-2"
            required
          />
        </div>

        {/* Unit */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Đơn vị</label>
          <input
            type="text"
            name="unit"
            value={productData.unit}
            onChange={handleChange}
            className="w-full border rounded-md p-2"
            required
          />
        </div>

        {/* Images */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Cập nhật ảnh</label>
          <input
            type="file"
            onChange={handleImage}
            className="block w-full text-sm text-gray-500 
             file:mr-4 file:py-2 file:px-4
             file:rounded-full file:border-0
             file:text-sm file:font-semibold
             file:bg-green-50 file:text-green-700
             hover:file:bg-green-100"
          />

          <div className="flex gap-4 mt-4 flex-wrap">
            {productData.images.map((image, index) => (
              <div className="relative" key={index}>
                <img
                  src={image.url}
                  alt={image.altText || "Product Image"}
                  className="w-20 h-20 object-cover rounded-md shadow-md"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full px-2 cursor-pointer"
                >
                  x
                </button>
              </div>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition-colors cursor-pointer"
        >
          Cập nhật sản phẩm
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
