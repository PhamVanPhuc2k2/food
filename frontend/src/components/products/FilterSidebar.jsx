import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const FilterSidebar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    category: "",
    minPrice: 0,
    maxPrice: 100,
  });

  const categories = ["Rau củ quả", "Đồ tươi sống", "Gia vị", "Đồ khô"];

  // Load từ URL vào state
  useEffect(() => {
    const params = Object.fromEntries(searchParams);
    const min = parseInt(params.minPrice) || 0;
    const max = parseInt(params.maxPrice) || 100;
    setFilters({
      category: params.category || "",
      minPrice: min,
      maxPrice: max,
    });
  }, [searchParams]);

  const updateURLParams = (newFilters) => {
    const params = new URLSearchParams();
    if (newFilters.category) params.set("category", newFilters.category);
    params.set("minPrice", newFilters.minPrice);
    params.set("maxPrice", newFilters.maxPrice);
    setSearchParams(params);
  };

  const handleFilterChange = (e) => {
    const { name, value, type } = e.target;
    let newFilters = { ...filters };

    if (type === "radio") {
      newFilters[name] = value;
    }

    setFilters(newFilters);
    updateURLParams(newFilters);
  };

  const handlePriceChange = (e) => {
    const max = parseInt(e.target.value);
    const newFilters = {
      ...filters,
      maxPrice: max,
    };
    setFilters(newFilters);
    updateURLParams(newFilters);
  };

  return (
    <div className="p-4">
      <h3 className="text-xl font-medium text-gray-800 mb-4">Filter</h3>

      {/* Category filter */}
      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2">Category</label>
        {categories.map((category) => (
          <div className="flex items-center mb-1" key={category}>
            <input
              type="radio"
              name="category"
              value={category}
              checked={filters.category === category}
              onChange={handleFilterChange}
              className="mr-2 h-4 w-4 text-blue-500 border-gray-300"
            />
            <span className="text-gray-700">{category}</span>
          </div>
        ))}
      </div>

      {/* Price range filter */}
      <div className="mb-8">
        <label className="block text-gray-600 font-medium mb-2">
          Price Range
        </label>
        <input
          type="range"
          name="priceRange"
          min={0}
          max={100}
          value={filters.maxPrice}
          onChange={handlePriceChange}
          className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-gray-600 mt-2">
          <span>0 VNĐ</span>
          <span>{filters.maxPrice} VNĐ</span>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
