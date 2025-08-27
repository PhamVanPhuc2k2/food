import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CiUser, CiShoppingCart, CiMenuBurger } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";

import Search from "./Search";
import CartDrawer from "../layout/CartDrawer";

const NavBar = () => {
  const [showCartDrawer, setShowCartDrawer] = useState(false);
  const [navDrawer, setNavDrawer] = useState(false);

  const handleShowCartDrawer = () => {
    setShowCartDrawer(!showCartDrawer);
  };
  const handleShowNavDrawer = () => {
    setNavDrawer(!navDrawer);
  };
  return (
    <>
      <nav className="w-[90%] mx-auto flex items-center justify-between py-4 px-6">
        <div className="">
          <Link to="/" className="text-2xl font-medium text-green-500">
            FOOD
          </Link>
        </div>
        <div className="hidden md:flex space-x-6">
          <Link
            to="/product/rau-cu-qua"
            className="text-gray-700 hover:text-black text-sm font-medium uppercase"
          >
            Rau củ quả
          </Link>
          <Link
            to="#"
            className="text-gray-700 hover:text-black text-sm font-medium uppercase"
          >
            Đồ tươi sống
          </Link>
          <Link
            to="#"
            className="text-gray-700 hover:text-black text-sm font-medium uppercase"
          >
            Gia vị
          </Link>
          <Link
            to="#"
            className="text-gray-700 hover:text-black text-sm font-medium uppercase"
          >
            Đồ khô
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <Link
            to="/admin"
            className="block bg-black p-2 rounded text-white text-sm"
          >
            Admin
          </Link>
          <Link to="/profile" className="hover:text-black">
            <CiUser className="h-6 w-6 text-gray-700" />
          </Link>
          <button
            onClick={handleShowCartDrawer}
            className="relative hover:text-black"
          >
            <CiShoppingCart className="h-6 w-6 text-gray-700" />
            <span className="absolute -top-1 bg-red-500 text-white text-xs rounded-full px-2 py-0.5">
              1
            </span>
          </button>
          <Search />
          <button
            onClick={handleShowNavDrawer}
            className="md:hidden cursor-pointer"
          >
            <CiMenuBurger className="h-6 w-6" />
          </button>
        </div>
      </nav>
      <CartDrawer
        handleShowCartDrawer={handleShowCartDrawer}
        showCartDrawer={showCartDrawer}
      />
      {/* NavBar Mobile */}
      <div
        className={`fixed top-0 left-0 h-full w-3/4 sm:w-1/2 lg:w-1/4 bg-white shadow-lg z-50 transform transition-transform duration-300 ${
          navDrawer ? "translate-x-0" : "-translate-full"
        }`}
      >
        <div className="flex justify-end p-3">
          <button onClick={handleShowNavDrawer} className="cursor-pointer">
            <IoMdClose className="h-6 w-6 text-gray-700" />
          </button>
        </div>
        <div className="p-3">
          <h2 className="text-xl font-semibold mb-4">Menu</h2>
          <nav className="flex flex-col space-y-4">
            <Link
              onClick={handleShowNavDrawer}
              to="#"
              className="text-gray-700 hover:text-black text-sm font-medium uppercase"
            >
              Rau củ quả
            </Link>
            <Link
              onClick={handleShowNavDrawer}
              to="#"
              className="text-gray-700 hover:text-black text-sm font-medium uppercase"
            >
              Đồ tươi sống
            </Link>
            <Link
              onClick={handleShowNavDrawer}
              to="#"
              className="text-gray-700 hover:text-black text-sm font-medium uppercase"
            >
              Gia vị
            </Link>
            <Link
              onClick={handleShowNavDrawer}
              to="#"
              className="text-gray-700 hover:text-black text-sm font-medium uppercase"
            >
              Đồ khô
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
};

export default NavBar;
