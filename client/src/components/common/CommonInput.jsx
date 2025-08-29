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
      <p className="text-md">{label}</p>
      <input
        type="text"
        value={type === "number" ? formatNumber(value.toString()) : value}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder={placeholder}
        className="rounded-lg border border-gray-400 bg-white px-3 py-3 placeholder:text-sm"
        required={required}
      />
      {error && <span className="mt-1 text-sm text-red-500">{error}</span>}
    </div>
  );
}
