import React, { useState } from "react";

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

    if (error) setError("");
  };

  const handleBlur = (e) => {
    const val = e.target.value.trim();

    if (required && !val) {
      setError("Trường này không được để trống");
      return;
    }

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
      <input
        type={type === "number" ? "text" : type}
        value={type === "number" ? formatNumber(value.toString()) : value}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder={placeholder}
        className={`rounded-lg border ${
          error ? "border-red-500" : "border-gray-400"
        } bg-white px-3 py-3 placeholder:text-sm`}
      />
      {error && <span className="mt-1 text-sm text-red-500">{error}</span>}
    </div>
  );
}
