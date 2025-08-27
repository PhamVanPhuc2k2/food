import React, { useEffect, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const NewProduct = () => {
  const newProducts = [
    {
      _id: "1",
      name: "Rau má",
      price: 120,
      image: [
        {
          url: "https://picsum.photos/200?random=1",
          altText: "rau-ma",
        },
      ],
    },
    {
      _id: "2",
      name: "Rau bí",
      price: 200,
      image: [
        {
          url: "https://picsum.photos/200?random=2",
          altText: "rau-ma",
        },
      ],
    },
    {
      _id: "3",
      name: "Rau mùng tơi",
      price: 300,
      image: [
        {
          url: "https://picsum.photos/200?random=3",
          altText: "rau-ma",
        },
      ],
    },
    {
      _id: "4",
      name: "Rau cải",
      price: 400,
      image: [
        {
          url: "https://picsum.photos/200?random=4",
          altText: "rau-ma",
        },
      ],
    },
    {
      _id: "5",
      name: "Thịt bò",
      price: 500,
      image: [
        {
          url: "https://picsum.photos/200?random=5",
          altText: "rau-ma",
        },
      ],
    },
    {
      _id: "6",
      name: "Thị lợn",
      price: 600,
      image: [
        {
          url: "https://picsum.photos/200?random=6",
          altText: "rau-ma",
        },
      ],
    },
    {
      _id: "7",
      name: "Thịt chó",
      price: 700,
      image: [
        {
          url: "https://picsum.photos/200?random=7",
          altText: "rau-ma",
        },
      ],
    },
    {
      _id: "8",
      name: "Tôm",
      price: 800,
      image: [
        {
          url: "https://picsum.photos/200?random=8",
          altText: "rau-ma",
        },
      ],
    },
    {
      _id: "9",
      name: "Cá tầm",
      price: 900,
      image: [
        {
          url: "https://picsum.photos/200?random=9",
          altText: "rau-ma",
        },
      ],
    },
    {
      _id: "10",
      name: "Cá hồi",
      price: 520,
      image: [
        {
          url: "https://picsum.photos/200?random=10",
          altText: "rau-ma",
        },
      ],
    },
  ];
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
  }, []);

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
        {newProducts.map((product) => {
          return (
            <div
              className="min-w-[100%] sm:min-w-[40%] lg:min-w-[30%] relative"
              key={product._id}
            >
              <img
                className="w-full aspect-square  object-cover rounded-lg"
                src={product.image[0]?.url}
                alt={product.image[0]?.altText || product.name}
              />
              <div className="absolute bottom-0 left-0 right-0 backdrop:blur-md text-white p-4 rounded-b-lg">
                <Link to={`/product/${product._id}`} className="block">
                  <h4 className="font-medium">{product.name}</h4>
                  <p className="mt-1">{product.price} VNĐ</p>
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
