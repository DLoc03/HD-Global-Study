import React from "react";

function SpinningLoading({ size = 80, color = "border-primary" }) {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="relative">
        {/* Logo */}
        <img
          src="/logo.png"
          alt="logo"
          className="h-20 w-20 rounded-full object-cover"
        />

        {/* Spinner */}
        <div
          className={`absolute inset-0 m-auto h-[${size}px] w-[${size}px] animate-spin rounded-full border-4 border-t-transparent border-b-transparent ${color}`}
        ></div>
      </div>
    </div>
  );
}

export default SpinningLoading;
