import React, { useEffect, useState } from "react";
import SortOptions from "../components/products/SortOptions";
import ProductGrid from "../components/products/ProductGrid";
import { useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductsByFilters,
  setFilters,
} from "../redux/slices/productSlice";
import Pagination from "../components/common/Pagination";

const Product = () => {
  const { category } = useParams();
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { products, loading, error, totalPage, filters } = useSelector(
    (state) => state.products
  );
  const queryParams = Object.fromEntries([...searchParams]);
  const [nameCategory, setNameCategory] = useState("");

  useEffect(() => {
    switch (category) {
      case "rau-cu-qua":
        setNameCategory("Rau Củ Quả");
        break;
      case "do-tuoi-song":
        setNameCategory("Đồ Tươi Sống");
        break;
      case "gia-vi":
        setNameCategory("Gia Vị");
        break;
      case "do-kho":
        setNameCategory("Đồ Khô");
        break;
      default:
        setNameCategory("Tất cả sản phẩm");
    }
  }, [category]);

  useEffect(() => {
    dispatch(
      fetchProductsByFilters({ category, ...queryParams, page: filters.page })
    );
  }, [dispatch, category, searchParams.toString(), filters.page]);

  const handlePageChange = (page) => {
    dispatch(setFilters({ page }));
  };

  return (
    <div>
      <div className="flex flex-col lg:flex-row">
        <div className="flex-grow p-4">
          <h2 className="text-2xl uppercase mb-4 font-semibold">
            {nameCategory}
          </h2>
          <SortOptions />
          <ProductGrid products={products} loading={loading} error={error} />
        </div>
      </div>
      <div className="flex items-center justify-center my-3">
        <Pagination
          currentPage={filters.page}
          totalPage={totalPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default Product;
