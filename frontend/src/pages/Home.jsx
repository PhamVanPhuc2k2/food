import React, { useEffect, useState } from "react";
import Banner from "../components/layout/Banner";
import SelectCategory from "../components/products/SelectCategory";
import NewProduct from "../components/products/NewProduct";
import ProductDetail from "../components/products/ProductDetail";
import ProductGrid from "../components/products/ProductGrid";
import { useDispatch } from "react-redux";
import axios from "axios";

const Home = () => {
  const dispatch = useDispatch();
  const [bestSellerProduct, setBestSellerProduct] = useState(null);

  useEffect(() => {
    // gọi best seller
    const fetchBestSeller = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/product/best-seller`
        );
        setBestSellerProduct(response.data.bestSeller);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBestSeller();
  }, [dispatch]);

  return (
    <div>
      <Banner />
      <SelectCategory />
      <NewProduct />

      <h2 className="text-3xl text-center font-bold mb-4">Bán chạy nhất</h2>
      {bestSellerProduct ? (
        <ProductDetail productId={bestSellerProduct._id} />
      ) : (
        <p className="text-center">Loading best seller product...</p>
      )}
    </div>
  );
};

export default Home;
