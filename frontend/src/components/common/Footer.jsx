import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookSquare } from "react-icons/fa";
import { SiZalo } from "react-icons/si";
import { FaPhone } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="border-t py-12">
      <div className="w-[90%] mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-4 lg:px-0">
        <div className="">
          <h3 className="text-lg text-gray-700 mb-4">Tin mới</h3>
          <p className="font-medium text-sm text-gray-600 mb-6">
            Đăng nhập và nhận giảm giá 10% cho đơn hàng đầu tiên!
          </p>
          <form className="flex">
            <input
              type="email"
              placeholder="Nhập email!"
              className="p-3 w-full text-sm border-t border-l border-b border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all"
            />
            <button
              type="submit"
              className="bg-black text-white px-6 py-3 text-sm rounded-r-md hover:bg-gray-800 transition-all cursor-pointer"
            >
              Subscribe
            </button>
          </form>
        </div>
        <div className="">
          <h3 className="text-lg text-gray-800 mb-4">Shop</h3>
          <ul className="pace-y-2 text-gray-600">
            <li>
              <Link to="#" className="hover:text-gray-500 transition-colors">
                Rau củ quả
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-gray-500 transition-colors">
                Thịt tưới sống
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-gray-500 transition-colors">
                Gia vị
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-gray-500 transition-colors">
                Đồ khô
              </Link>
            </li>
          </ul>
        </div>
        <div className="">
          <h3 className="text-lg text-gray-800 mb-4">Support</h3>
          <ul className="pace-y-2 text-gray-600">
            <li>
              <Link to="#" className="hover:text-gray-500 transition-colors">
                Contact Us
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-gray-500 transition-colors">
                About Us
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-gray-500 transition-colors">
                FAQs
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-gray-500 transition-colors">
                Feature
              </Link>
            </li>
          </ul>
        </div>
        <div className="">
          <h3 className="text-lg text-gray-800 mb-4">Follow Us</h3>
          <div className="flex items-center space-x-4 mb-6">
            <a
              href="https://www.facebook.com"
              target="_black"
              rel=""
              className="hover:text-gray-300"
            >
              <FaFacebookSquare className="text-blue-600 h-6 w-6" />
            </a>
            <a
              href="https://www.zalo.me"
              target="_black"
              rel=""
              className="hover:text-gray-300"
            >
              <SiZalo className="text-blue-600 h-6 w-6 bg-white shadow rounded" />
            </a>
          </div>
          <p className="text-gray-800">Call Us</p>
          <p className="">
            <FaPhone className="inline-block mr-2" />
            0868491679
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
