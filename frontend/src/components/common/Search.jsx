import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { IoCloseOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchProductsByFilters,
  setFilters,
} from "../../redux/slices/productSlice";

const Search = () => {
  const [searchValue, setSearchValue] = useState("");
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleShowSearch = () => {
    setShow(!show);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(setFilters({ search: searchValue }));
    dispatch(fetchProductsByFilters({ search: { searchValue } }));
    navigate(`products/all?search=${searchValue}`);
    setShow(false);
  };

  return (
    <div
      className={`flex items-center justify-center w-full transition-all duration-300 ${
        show ? "absolute top-0 left-0 w-full bg-gray-100 h-24 z-50" : "w-auto"
      }`}
    >
      {show ? (
        <form
          onSubmit={handleSearch}
          className="relative flex items-center justify-center w-full"
        >
          <div className="relative w-1/2 ">
            <input
              type="text"
              placeholder="Tìm kiếm..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="bg-gray-100 px-4 py-2 pl-2 pr-12 rounded-lg focus:outline-none w-full placeholder:text-gray-700"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-700 hover:text-black cursor-pointer"
            >
              <CiSearch className="h-6 w-6" />
            </button>
          </div>
          <button
            type="button"
            onClick={handleShowSearch}
            className="absolute right-4 text-gray-700 hover:text-black cursor-pointer"
          >
            <IoCloseOutline className="h-6 w-6" />
          </button>
        </form>
      ) : (
        <button onClick={handleShowSearch}>
          <CiSearch className="h-6 w-6" />
        </button>
      )}
    </div>
  );
};

export default Search;
