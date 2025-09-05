import React, { useState } from "react";
import { FiMoreVertical, FiEdit2, FiTrash2 } from "react-icons/fi";

function CategoryCard({ id, name, onEdit, onDelete }) {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <div className="relative flex items-center justify-between rounded-2xl bg-white p-4 shadow transition hover:shadow-md">
      <span className="text-primary text-sm font-medium">Danh mục: {name}</span>

      {/* More button */}
      <button
        className="rounded-full p-2 hover:bg-gray-100"
        onClick={() => setOpenMenu((prev) => !prev)}
      >
        <FiMoreVertical className="text-gray-600" />
      </button>

      {/* Dropdown menu */}
      {openMenu && (
        <div className="shadow-main absolute top-12 right-2 z-10 w-32 rounded-xl bg-white">
          <button
            onClick={() => {
              onEdit?.(id);
              setOpenMenu(false);
            }}
            className="flex w-full items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100"
          >
            <FiEdit2 className="text-gray-600" /> Sửa
          </button>
          <button
            onClick={() => {
              onDelete?.(id);
              setOpenMenu(false);
            }}
            className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
          >
            <FiTrash2 className="text-red-600" /> Xoá
          </button>
        </div>
      )}
    </div>
  );
}

export default CategoryCard;
