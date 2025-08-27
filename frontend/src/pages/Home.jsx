import React from "react";
import Banner from "../components/layout/Banner";
import SelectCategory from "../components/products/SelectCategory";
import NewProduct from "../components/products/NewProduct";
import ProductDetail from "../components/products/ProductDetail";
import ProductGrid from "../components/products/ProductGrid";

const placeholderProducts = [
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

const Home = () => {
  return (
    <div>
      <Banner />
      <SelectCategory />
      <NewProduct />
      <h2 className="text-3xl text-center font-bold mb-4">Bán chạy nhất</h2>
      <ProductDetail />
      <div className="w-[90%] mx-auto">
        <h2 className="text-3xl text-center font-bold mb-4">Rau củ quả</h2>
        <ProductGrid products={placeholderProducts} />
      </div>
      <div className="w-[90%] mx-auto">
        <h2 className="text-3xl text-center font-bold mb-4">Đồ tươi sống</h2>
        <ProductGrid products={placeholderProducts} />
      </div>
      <div className="w-[90%] mx-auto">
        <h2 className="text-3xl text-center font-bold mb-4">Gia vị</h2>
        <ProductGrid products={placeholderProducts} />
      </div>
      <div className="w-[90%] mx-auto">
        <h2 className="text-3xl text-center font-bold mb-4">Đồ khô</h2>
        <ProductGrid products={placeholderProducts} />
      </div>
    </div>
  );
};

export default Home;
