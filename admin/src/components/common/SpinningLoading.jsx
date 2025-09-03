import React from "react";

function SpinningLoading({ size = 80, color = "border-primary" }) {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-white/20">
      <div className="relative">
        <div
          className={`animate-spin rounded-full border-4 border-t-transparent border-b-transparent ${color}`}
          style={{ width: size, height: size }}
        ></div>
      </div>
    </div>
  );
}

export default SpinningLoading;
