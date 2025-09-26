import React from "react";
import banner from "../../assets/banner.png";

const Banner = () => {
  return (
    <section className="relative">
      <img
        src={banner}
        alt="banner"
        className="w-full h-[200px] sm:h-[300px] md:h-400px] lg:h-[500px] object-cover"
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center text-white opacity-80 p-6">
          <h1 className="text-4xl md:text-9xl font-bold tracking-tighter uppercase mb-4">
            food
          </h1>
        </div>
      </div>
    </section>
  );
};

export default Banner;
