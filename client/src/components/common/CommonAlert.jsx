import React, { useEffect } from "react";
import { X } from "lucide-react";

export default function CommonAlert({
  type = "info", // success | error | warning | info
  message = "",
  onClose,
  className = "",
}) {
  const typeStyles = {
    success: "bg-green-100 text-green-700 border-green-400",
    error: "bg-red-100 text-red-700 border-red-400",
    warning: "bg-yellow-100 text-yellow-700 border-yellow-400",
    info: "bg-blue-100 text-blue-700 border-blue-400",
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 2000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`animate-fadeIn fixed top-4 left-1/2 z-50 flex -translate-x-1/2 items-center justify-between rounded-lg border px-4 py-2 shadow-lg ${typeStyles[type]} ${className}`}
    >
      <span>{message}</span>
      {onClose && (
        <button onClick={onClose} className="ml-2">
          <X size={16} />
        </button>
      )}
    </div>
  );
}
