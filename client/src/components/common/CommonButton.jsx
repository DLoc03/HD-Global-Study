import React from "react";

function CommonButton({ children, onClick, className, type }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`flex max-w-[280px] flex-row items-center justify-center gap-2 py-2 ${className}`}
      style={{ cursor: "pointer" }}
    >
      {children}
    </button>
  );
}

export default CommonButton;
