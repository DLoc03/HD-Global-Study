import React from "react";

import { IoMdClose } from "react-icons/io";

function ImageOverview({ image, onClose, open }) {
  if (!image) return null;

  return (
    <>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div className="relative flex w-full max-w-5xl flex-col items-center">
            {/* Close button */}
            <button
              className="absolute right-4 cursor-pointer rounded-full bg-white/80 px-3 py-1 text-black hover:bg-white"
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
            >
              <IoMdClose />
            </button>

            {/* Image */}
            <img
              src={image.image_data}
              alt={image.title}
              className="max-h-[80vh] rounded-xl object-contain shadow-lg"
            />

            {/* Caption */}
            {image.title && (
              <p className="mt-4 text-center text-lg text-white">
                {image.title}
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default ImageOverview;
