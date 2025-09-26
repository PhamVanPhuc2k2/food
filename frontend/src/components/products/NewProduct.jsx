import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const NewProduct = () => {
  const [newArrivals, setNewArrivals] = useState([]);

  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/product/new-arrival`
        );
        console.log(response.data);
        setNewArrivals(response.data.newProducts);
      } catch (error) {
        console.error(error);
      }
    };
    fetchNewArrivals();
  }, []);

  const scrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollButtons = () => {
    const container = scrollRef.current;
    if (container) {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      setScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1);
    }
  };
  const handleButtonLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: -300,
        behavior: "smooth",
      });
    }
  };
  const handleButtonRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: 300,
        behavior: "smooth",
      });
    }
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    e.preventDefault();
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = x - startX;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (container) {
      container.addEventListener("scroll", updateScrollButtons);
      updateScrollButtons();
    }
    return () => {
      if (container) {
        container.removeEventListener("scroll", updateScrollButtons);
      }
    };
  }, [newArrivals]);

  return (
    <section>
      <div className="w-[90%] mx-auto text-center mb-10 relative">
        <h2 className="text-3xl font-bold mb-4">Sản Phẩm Mới</h2>
        <div className="absolute right-0 -bottom-[20px] flex space-x-2">
          <button
            onClick={handleButtonLeft}
            disabled={!scrollLeft}
            className={`p-2 rounded border  cursor-pointer ${
              scrollLeft ? "bg-white text-black" : "bg-gray-100 text-gray-400"
            }`}
          >
            <FaChevronLeft />
          </button>
          <button
            disabled={!canScrollRight}
            onClick={handleButtonRight}
            className={`p-2 rounded border  cursor-pointer ${
              canScrollRight
                ? "bg-white text-black"
                : "bg-gray-100 text-gray-400"
            }`}
          >
            <FaChevronRight />
          </button>
        </div>
      </div>
      <div
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        ref={scrollRef}
        className="w-[90%] mx-auto overflow-x-scroll flex space-x-6 relative"
      >
        {newArrivals.map((product) => {
          return (
            <div
              className="min-w-[100%] sm:min-w-[40%] lg:min-w-[30%] relative"
              key={product._id}
            >
              <img
                className="w-full aspect-square  object-cover rounded-lg"
                src={product.images[0]?.url}
                alt={product.images[0]?.altText || product.name}
              />
              <div className="absolute bottom-0 left-0 right-0 backdrop:blur-md text-white p-4 rounded-b-lg">
                <Link to={`/product/${product._id}`} className="block">
                  <h4 className="font-medium text-green-500">{product.name}</h4>
                  <p className="mt-1 text-orange-500">
                    {product.price.toLocaleString("vi-VN")} VNĐ
                  </p>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default NewProduct;
