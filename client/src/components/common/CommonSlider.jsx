import React, { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import CommonButton from "./CommonButton";
import CommonFadeContainer from "./CommonFadeContainer";
import CommonFade from "./CommonFade";

function CommonSlider({ items = [], itemsPerSlide = 3, className = "" }) {
  const [current, setCurrent] = useState(0);

  const totalSlides = Math.ceil(items.length / itemsPerSlide);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  return (
    <div className={`relative w-full overflow-hidden px-4 ${className}`}>
      <div
        className="-mx-2 flex py-2 transition-transform duration-500"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {Array.from({ length: totalSlides }).map((_, slideIndex) => (
          <CommonFadeContainer
            stagger={0.2}
            key={slideIndex}
            className="flex w-full flex-shrink-0 gap-4 px-2"
          >
            {items
              .slice(
                slideIndex * itemsPerSlide,
                slideIndex * itemsPerSlide + itemsPerSlide,
              )
              .map((item, idx) => (
                <CommonFade key={idx} className="flex-1">
                  {item}
                </CommonFade>
              ))}
          </CommonFadeContainer>
        ))}
      </div>
      {totalSlides > 1 && (
        <div className="mt-4 flex w-full items-center justify-center gap-2 lg:justify-end">
          <CommonButton
            onClick={prevSlide}
            disabled
            className="bg-primary rounded-full border-1 p-2 text-white hover:bg-gray-100"
          >
            <IoIosArrowBack />
          </CommonButton>
          <CommonButton
            onClick={nextSlide}
            className="bg-primary rounded-full border-1 p-2 text-white hover:bg-gray-100"
          >
            <IoIosArrowForward />
          </CommonButton>
        </div>
      )}
    </div>
  );
}

export default CommonSlider;
