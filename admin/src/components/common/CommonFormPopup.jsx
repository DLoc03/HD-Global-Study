import React from "react";
import CommonButton from "./CommonButton";
import { IoMdClose } from "react-icons/io";

function CommonFormPopup({
  isOpen,
  onClose,
  title,
  children,
  footer,
  className,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div
        className={`relative w-full rounded-xl bg-white p-6 shadow-lg ${className}`}
      >
        {/* Close button */}
        <CommonButton
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <IoMdClose />
        </CommonButton>

        {/* Title */}
        {title && <h2 className="mb-2 text-lg font-semibold">{title}</h2>}

        <div className="border-t-1 border-gray-200" />

        {/* Content */}
        <div className="my-4">{children}</div>

        {/* Footer / actions */}
        {footer && <div className="flex justify-end gap-2">{footer}</div>}
      </div>
    </div>
  );
}

export default CommonFormPopup;
