import React, { useState, useRef, useEffect } from "react";
import { IoIosArrowDown } from "react-icons/io";

export default function MenuDropdown({
  username = "Quản trị viên",
  options = [],
}) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <div
        className="flex cursor-pointer items-center gap-2"
        onClick={() => setOpen(!open)}
      >
        <p className="text-secondary text-sm">{username}</p>
        <IoIosArrowDown />
      </div>

      {open && (
        <ul className="absolute right-0 z-50 mt-4 w-40 rounded-lg border border-gray-200 bg-white text-sm shadow-lg">
          {options.length > 0 ? (
            options.map((opt, idx) => (
              <li
                key={idx}
                className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                onClick={opt.onClick}
              >
                {opt.label}
              </li>
            ))
          ) : (
            <li className="px-4 py-2 text-gray-500">Không có mục</li>
          )}
        </ul>
      )}
    </div>
  );
}
