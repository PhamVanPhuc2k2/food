import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createProduct } from "../../redux/slices/adminProductSlice";
import axiosClient from "../../redux/axiosClient";

const AdminProductCreate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth); // lấy accessToken từ redux
  const { loading, error } = useSelector((state) => state.products);

  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: 0,
    discountPrice: 0,
    countInStock: 0,
    sku: "",
    category: "",
    brand: "",
    unit: "kg",
    images: [],
    isFeatured: false,
    isPublished: false,
  });

  const [previewImages, setPreviewImages] = useState([]); // preview ảnh

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/");
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Upload ảnh lên server/Cloudinary
  // Upload ảnh lên server/Cloudinary
  const handleImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Hiển thị preview tạm thời (local URL)
    const tempUrl = URL.createObjectURL(file);
    setPreviewImages((prev) => [
      ...prev,
      { url: tempUrl, altText: file.name, isTemp: true },
    ]);

    const formData = new FormData();
    // ⚠️ phải trùng với backend: upload.single("file")
    formData.append("file", file);

    try {
      const res = await axiosClient.post("/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("Upload response:", res.data);

      const uploadedUrl = res.data.url; // backend trả { url: result.secure_url }

      if (uploadedUrl) {
        // thay preview tạm = link thật
        setPreviewImages((prev) =>
          prev.map((img) =>
            img.url === tempUrl ? { url: uploadedUrl, altText: file.name } : img
          )
        );

        // lưu vào productData
        setProductData((prev) => ({
          ...prev,
          images: [...prev.images, { url: uploadedUrl, altText: file.name }],
        }));
      } else {
        alert("Upload ảnh thất bại, vui lòng thử lại");
        setPreviewImages((prev) => prev.filter((img) => img.url !== tempUrl));
      }
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Upload ảnh thất bại, vui lòng thử lại");
      setPreviewImages((prev) => prev.filter((img) => img.url !== tempUrl));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!productData.images || productData.images.length === 0) {
      alert("Vui lòng upload ít nhất 1 ảnh");
      return;
    }

    dispatch(createProduct(productData));

    // Reset form
    setProductData({
      name: "",
      description: "",
      price: 0,
      discountPrice: 0,
      countInStock: 0,
      sku: "",
      category: "",
      brand: "",
      unit: "kg",
      images: [],
      isFeatured: false,
      isPublished: false,
    });
    setPreviewImages([]);

    navigate("/admin/products");
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="max-w-5xl mx-auto p-6 shadow-md rounded-md">
      <h2 className="text-3xl font-bold mb-6">Thêm sản phẩm mới</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
        {/* Tên sản phẩm */}
        <div className="col-span-2">
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

        {/* Mô tả */}
        <div className="col-span-2">
          <label className="block font-semibold mb-2">Mô tả sản phẩm</label>
          <textarea
            name="description"
            value={productData.description}
            onChange={handleChange}
            rows={4}
            className="w-full border rounded-md p-2"
            required
          />
        </div>

        {/* Giá & Giá KM */}
        <div>
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
        <div>
          <label className="block font-semibold mb-2">Giá khuyến mãi</label>
          <input
            type="number"
            name="discountPrice"
            value={productData.discountPrice}
            onChange={handleChange}
            className="w-full border rounded-md p-2"
          />
        </div>

        {/* Số lượng & SKU */}
        <div>
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
        <div>
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

        {/* Category */}
        <div>
          <label className="block font-semibold mb-2">Danh mục</label>
          <select
            name="category"
            value={productData.category}
            onChange={handleChange}
            className="w-full border rounded-md p-2"
            required
          >
            <option value="">-- Chọn danh mục --</option>
            <option value="rau-cu-qua">Rau củ quả</option>
            <option value="do-tuoi-song">Đồ tươi sống</option>
            <option value="do-kho">Đồ khô</option>
            <option value="gia-vi">Gia vị</option>
          </select>
        </div>

        {/* Brand & Unit */}
        <div>
          <label className="block font-semibold mb-2">Thương hiệu</label>
          <input
            type="text"
            name="brand"
            value={productData.brand}
            onChange={handleChange}
            className="w-full border rounded-md p-2"
          />
        </div>
        <div>
          <label className="block font-semibold mb-2">Đơn vị</label>
          <input
            type="text"
            name="unit"
            value={productData.unit}
            onChange={handleChange}
            className="w-full border rounded-md p-2"
          />
        </div>

        {/* Ảnh */}
        <div className="col-span-2">
          <label className="block font-semibold mb-2">Ảnh sản phẩm</label>
          <input
            type="file"
            onChange={handleImage}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
          />
          <div className="flex gap-4 mt-4">
            {previewImages.map((image, index) => (
              <div key={index}>
                <img
                  src={image.url}
                  alt={image.altText || "Preview"}
                  className="w-20 h-20 object-cover rounded-md shadow-md"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Flags */}
        <div>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="isFeatured"
              checked={productData.isFeatured}
              onChange={handleChange}
            />
            Sản phẩm nổi bật
          </label>
        </div>
        <div>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="isPublished"
              checked={productData.isPublished}
              onChange={handleChange}
            />
            Công khai
          </label>
        </div>

        {/* Submit */}
        <div className="col-span-2">
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition-colors cursor-pointer"
          >
            Thêm sản phẩm
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminProductCreate;
