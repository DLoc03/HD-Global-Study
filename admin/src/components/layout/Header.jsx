import React from "react";
import { Menu } from "lucide-react";
import { IoMdNotificationsOutline } from "react-icons/io";
import MenuDropdown from "../common/MenuDropdown";
import { useCommonNavigate } from "@/contexts/HandleNavigate";
import { PATHS } from "@/constants";
import { useAuth } from "@/config/api";

export default function Header({ onToggle }) {
  const navigate = useCommonNavigate();
  const { logout } = useAuth();
  return (
    <header className="flex items-center justify-between bg-white p-4 shadow">
      <button onClick={onToggle} className="mr-4">
        <Menu className="hover:text-primary h-6 w-6 cursor-pointer" />
      </button>
      <div className="flex items-center gap-4">
        <p className="hidden text-sm md:block">
          Chào bạn, ngày hôm nay thế nào?
        </p>
        {/* <IoMdNotificationsOutline fontSize={"28px"} /> */}
        <div className="ml-2 flex items-center gap-2">
          <img src="/logo.jpg" className="w-8 rounded-full" />
          <MenuDropdown
            username="Quản trị viên"
            options={[
              {
                label: "Cài đặt tài khoản",
                onClick: () => navigate(PATHS.SETTING),
              },
              { label: "Đăng xuất", onClick: logout },
            ]}
          />
        </div>
      </div>
    </header>
  );
}
