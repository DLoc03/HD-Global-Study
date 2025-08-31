import React from "react";
import { Menu } from "lucide-react";

import { IoPersonCircleSharp } from "react-icons/io5";
import { IoMdNotificationsOutline } from "react-icons/io";

export default function Header({ onToggle }) {
  return (
    <header className="flex items-center justify-between bg-white p-4 shadow">
      <button onClick={onToggle} className="mr-4">
        <Menu className="hover:text-primary h-6 w-6 cursor-pointer" />
      </button>
      <div className="flex items-center gap-4">
        <p className="hidden text-sm md:block">
          Chào bạn, ngày hôm nay thế nào?
        </p>
        <IoMdNotificationsOutline fontSize={"28px"} />
        <IoPersonCircleSharp fontSize={"28px"} />
      </div>
    </header>
  );
}
