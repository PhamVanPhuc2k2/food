import React from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

const Pagination = ({ currentPage, totalPage, onPageChange }) => {
  if (totalPage <= 1) return null;

  const pages = [];
  for (let i = 1; i <= totalPage; i++) {
    pages.push(i);
  }

  return (
    <div className="flex items-center space-x-2">
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className={`h-10 w-10 rounded-md flex items-center justify-center ${
          currentPage === 1
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-gray-300 hover:bg-gray-400 cursor-pointer"
        }`}
      >
        <FaAngleLeft />
      </button>

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`h-10 w-10 rounded-md flex items-center justify-center ${
            currentPage === page
              ? "bg-red-500 text-white"
              : "bg-gray-300 hover:bg-gray-400"
          }`}
        >
          {page}
        </button>
      ))}

      <button
        disabled={currentPage === totalPage}
        onClick={() => onPageChange(currentPage + 1)}
        className={`h-10 w-10 rounded-md flex items-center justify-center ${
          currentPage === totalPage
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-gray-300 hover:bg-gray-400 cursor-pointer"
        }`}
      >
        <FaAngleRight />
      </button>
    </div>
  );
};

export default Pagination;
