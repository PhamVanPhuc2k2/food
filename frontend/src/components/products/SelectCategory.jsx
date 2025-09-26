import React from "react";
import rauImage from "../../assets/rau.jpg";
import khoImage from "../../assets/kho.jpg";
import giaviImage from "../../assets/giavi.jpg";
import dotuoiImage from "../../assets/dotuoisong.jpg";
import { Link } from "react-router-dom";

const SelectCategory = () => {
  return (
    <section className="py-16 px-4 lg:px-0">
      <div className="w-[90%] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="relative">
          <img
            src={rauImage}
            alt="Rau củ"
            className="w-full aspect-square object-cover"
          />
          <div className="absolute bottom-2 left-2 bg-white p-2 rounded">
            <h2 className="text-xl font-bold text-gray-900 mb-1">Rau củ quả</h2>
            <Link to="/products/rau-cu-qua" className="text-gray-700 underline">
              Shop Now
            </Link>
          </div>
        </div>
        <div className="relative">
          <img
            src={dotuoiImage}
            alt="Rau củ"
            className="w-full aspect-square object-cover"
          />
          <div className="absolute bottom-2 left-2 bg-white p-2 rounded">
            <h2 className="text-xl font-bold text-gray-900 mb-1">
              Đồ tươi sống
            </h2>
            <Link
              to="/products/do-tuoi-song"
              className="text-gray-700 underline"
            >
              Shop Now
            </Link>
          </div>
        </div>
        <div className="relative">
          <img
            src={giaviImage}
            alt="Rau củ"
            className="w-full aspect-square object-cover"
          />
          <div className="absolute bottom-2 left-2 bg-white p-2 rounded">
            <h2 className="text-xl font-bold text-gray-900 mb-1">Gia vị</h2>
            <Link to="/products/gia-vi" className="text-gray-700 underline">
              Shop Now
            </Link>
          </div>
        </div>
        <div className="relative">
          <img
            src={khoImage}
            alt="Rau củ"
            className="w-full aspect-square object-cover"
          />
          <div className="absolute bottom-2 left-2 bg-white p-2 rounded">
            <h2 className="text-xl font-bold text-gray-900 mb-1">Đồ khô</h2>
            <Link to="/products/do-kho" className="text-gray-700 underline">
              Shop Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SelectCategory;
