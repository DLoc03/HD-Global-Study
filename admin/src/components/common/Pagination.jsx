import React from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

function Pagination({ currentPage, totalPage, onPageChange }) {
  if (totalPage <= 1) return null;
  return (
    <div className="mt-4 flex gap-2">
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        className="rounded border px-4 py-2 disabled:opacity-50"
      >
        <IoIosArrowBack />
      </button>

      {Array.from({ length: totalPage }, (_, i) => i + 1).map((p) => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          className={`rounded border px-4 py-2 ${
            p === currentPage ? "bg-primary text-white" : ""
          }`}
        >
          {p}
        </button>
      ))}

      <button
        disabled={currentPage === totalPage}
        onClick={() => onPageChange(Math.min(currentPage + 1, totalPage))}
        className="rounded border px-4 py-2 disabled:opacity-50"
      >
        <IoIosArrowForward />
      </button>
    </div>
  );
}

export default Pagination;
