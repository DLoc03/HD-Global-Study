import React, { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

export default function CommonInput({
  type = "text",
  value = "",
  onChange,
  label = "",
  placeholder = "",
  className = "",
  required = false,
}) {
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const formatNumber = (val) => {
    if (!val) return "";
    return val.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const handleChange = (e) => {
    let val = e.target.value;

    if (type === "number") {
      val = formatNumber(val);
      onChange && onChange(val.replace(/\./g, ""));
    } else {
      onChange && onChange(val);
    }
  };

  const handleBlur = (e) => {
    const val = e.target.value;

    if (type === "email") {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!regex.test(val)) {
        setError("Email không hợp lệ");
      } else {
        setError("");
      }
    }
  };

  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && <p className="text-md">{label}</p>}
      <div className="relative">
        <input
          type={
            type === "password" ? (showPassword ? "text" : "password") : "text"
          }
          value={type === "number" ? formatNumber(value.toString()) : value}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder={placeholder}
          className="w-full rounded-lg border border-gray-400 bg-white px-3 py-3 pr-10 placeholder:text-sm"
          required={required}
        />
        {type === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute top-1/2 right-3 -translate-y-1/2 text-xl text-gray-600 focus:outline-none"
          >
            {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
          </button>
        )}
      </div>
      {error && <span className="mt-1 text-sm text-red-500">{error}</span>}
    </div>
  );
}
