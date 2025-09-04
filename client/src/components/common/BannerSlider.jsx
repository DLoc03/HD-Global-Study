import React, { useEffect, useRef, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import CommonButton from "./CommonButton";
import CommonFade from "./CommonFade";
import CommonFadeContainer from "./CommonFadeContainer";

export default function AutoSlider({
  images = [],
  interval = 3000,
  isShowTitle = true,
  className = "",
  height = "h-56 md:h-72 lg:h-96",
}) {
  const [index, setIndex] = useState(0);
  const timerRef = useRef(null);
  const isHoverRef = useRef(false);

  useEffect(() => {
    if (!images?.length) return;

    const start = () => {
      clearInterval(timerRef.current);
      timerRef.current = setInterval(() => {
        if (!isHoverRef.current) {
          setIndex((prev) => (prev + 1) % images.length);
        }
      }, interval);
    };

    start();
    return () => clearInterval(timerRef.current);
  }, [images, interval]);

  // Helpers
  const goTo = (i) => setIndex(i % images.length);
  const next = () => goTo((index + 1) % images.length);
  const prev = () => goTo((index - 1 + images.length) % images.length);

  return (
    <CommonFadeContainer
      stagger={0.3}
      className="flex flex-col items-center space-y-4"
    >
      <CommonFade>
        <div
          className={`relative w-full overflow-hidden rounded-xl ${height} ${className}`}
          onMouseEnter={() => (isHoverRef.current = true)}
          onMouseLeave={() => (isHoverRef.current = false)}
        >
          {/* Slides */}
          <div
            className="flex h-full transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {images.map((item, i) => (
              <div key={item.name || i} className="relative h-full min-w-full">
                <img
                  src={item.src}
                  alt={item.name || `slide-${i}`}
                  className="h-full w-full object-cover"
                  draggable={false}
                />

                {isShowTitle && (item.title || item.subtitle || item.link) && (
                  <div className="absolute inset-0 bottom-6 flex flex-col items-center justify-end text-center drop-shadow-lg md:bottom-12">
                    <div className="max-w-md rounded-lg bg-gray-300/60 px-6 py-4 text-white">
                      {item.title && (
                        <h2 className="text-sm font-bold md:text-xl">
                          {item.title}
                        </h2>
                      )}
                      {item.subtitle && (
                        <p className="md:text-md mt-1 text-xs">
                          {item.subtitle}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Arrows */}
          <CommonButton
            onClick={prev}
            className="absolute top-1/2 left-2 -translate-y-1/2 rounded-full bg-black/40 px-3 py-2 text-white hover:bg-black/60"
          >
            <IoIosArrowBack />
          </CommonButton>
          <CommonButton
            onClick={next}
            className="absolute top-1/2 right-2 -translate-y-1/2 rounded-full bg-black/40 px-3 py-2 text-white hover:bg-black/60"
          >
            <IoIosArrowForward />
          </CommonButton>

          {/* Dots */}
          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-2">
            {images.map((_, i) => {
              const active = i === index;
              return (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    active
                      ? "w-6 bg-white"
                      : "w-2 bg-white/60 hover:bg-white/80"
                  }`}
                />
              );
            })}
          </div>
        </div>
      </CommonFade>
    </CommonFadeContainer>
  );
}
