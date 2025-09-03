import { useCommonNavigate } from "@/contexts/HandleNavigate";
import React from "react";

import { IoChevronBackSharp } from "react-icons/io5";

function CommonBack() {
  const navigate = useCommonNavigate();
  return (
    <div
      className="text-primary flex cursor-pointer items-center gap-2 hover:text-amber-500"
      onClick={() => navigate(-1)}
    >
      <IoChevronBackSharp /> Quay lại
    </div>
  );
}

export default CommonBack;
