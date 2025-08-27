import React, { useState } from "react";

const EditProduct = () => {
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: 0,
    countInStock: 0,
    sku: "",
    category: "",
    unit: "",
    brand: "",
    image: [
      {
        url: "https://picsum.photos/200?random=1",
      },
      {
        url: "https://picsum.photos/200?random=2",
      },
    ],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImage = async (e) => {
    const file = e.target.files[0];
    console.log(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="max-w-5xl mx-auto p-6 shadow-md rounded-md">
      <h2 className="text-3xl font-bold mb-6">Chỉnh sửa sản phẩm</h2>
      <form onSubmit={handleSubmit}>
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
        {/* Mo ta */}
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
        {/* Gia tien */}
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
        {/* Số lượng trong kho */}
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
          {/* Sku */}
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
          {/* unit */}
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
          {/* Ảnh sản phẩm */}
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
            <div className="flex gap-4 mt-4">
              {productData.image.map((image, index) => (
                <div className="" key={index}>
                  <img
                    src={image.url}
                    alt={image.altText || "Product Image"}
                    className="w-20 h-20 object-cover rounded-md shadow-md"
                  />
                </div>
              ))}
            </div>
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
