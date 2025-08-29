import React, { useEffect, useRef, useState } from "react";

import { IoIosArrowDown } from "react-icons/io";

export default function CommonSelectInput({ label, options = [], onChange }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (opt) => {
    setSelected(opt);
    onChange(opt);
    setOpen(false);
  };

  return (
    <div className="relative w-full" ref={wrapperRef}>
      {label && (
        <label className="mb-1 block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      <div
        className="flex w-full cursor-pointer items-center justify-between rounded-lg border border-gray-400 bg-white px-3 py-3 text-sm"
        onClick={() => setOpen(!open)}
      >
        <span>{selected ? selected.title : "Chọn một tùy chọn"}</span>
        <span className="text-gray-500">
          <IoIosArrowDown />
        </span>
      </div>

      {open && (
        <ul className="absolute z-50 mt-1 max-h-48 w-full overflow-y-auto rounded-lg border border-gray-200 bg-white shadow-lg">
          {options.map((opt, idx) => (
            <li
              key={idx}
              className="hover:bg-primary cursor-pointer px-3 py-2 text-sm text-gray-700 hover:text-white"
              onClick={() => handleSelect(opt)}
            >
              {opt.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
