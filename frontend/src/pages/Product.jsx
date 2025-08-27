import React, { useEffect, useRef, useState } from "react";
import { CiFilter } from "react-icons/ci";
import FilterSidebar from "../components/products/FilterSidebar";
import SortOptions from "../components/products/SortOptions";
import ProductGrid from "../components/products/ProductGrid";

const Product = () => {
  const [products, setProduct] = useState([]);
  const sidebarRef = useRef(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidedar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleClickOutside = (e) => {
    if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  useEffect(() => {
    setTimeout(() => {
      const fetchedProducts = [
        {
          _id: 1,
          name: "Product 1",
          price: 100,
          image: [
            {
              url: "https://picsum.photos/200?random=1",
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
              url: "https://picsum.photos/200?random=2",
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
              url: "https://picsum.photos/200?random=3",
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
              url: "https://picsum.photos/200?random=4",
              altText: "Rau bí",
            },
          ],
        },
        {
          _id: 5,
          name: "Product 5",
          price: 100,
          image: [
            {
              url: "https://picsum.photos/200?random=1",
              altText: "Rau bí",
            },
          ],
        },
        {
          _id: 6,
          name: "Product 6",
          price: 100,
          image: [
            {
              url: "https://picsum.photos/200?random=2",
              altText: "Rau bí",
            },
          ],
        },
        {
          _id: 7,
          name: "Product 7",
          price: 100,
          image: [
            {
              url: "https://picsum.photos/200?random=3",
              altText: "Rau bí",
            },
          ],
        },
        {
          _id: 8,
          name: "Product 8",
          price: 100,
          image: [
            {
              url: "https://picsum.photos/200?random=4",
              altText: "Rau bí",
            },
          ],
        },
      ];
      setProduct(fetchedProducts);
    }, 1000);
  }, []);
  return (
    <div className="flex flex-col lg:flex-row">
      <button
        onClick={toggleSidedar}
        className="lg:hidden p-2 flex justify-center items-center cursor-pointer"
      >
        <CiFilter className="h-6 w-6" />
      </button>
      <div
        ref={sidebarRef}
        className={`${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed left-0 inset-y-0 z-50 bg-white w-64 transform transition-transform duration-300 lg:static lg:translate-x-0`}
      >
        <FilterSidebar />
      </div>
      <div className="flex-grow p-4">
        <h2 className="text-2xl uppercase mb-4">All Product</h2>
        <SortOptions />
        <ProductGrid products={products} />
      </div>
    </div>
  );
};

export default Product;
