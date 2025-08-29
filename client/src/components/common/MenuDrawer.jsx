import React from "react";
import { useLocation } from "react-router-dom";
import CommonNavLink from "./CommonNavLink";
import CommonLogo from "./CommonLogo";

function MenuDrawer({ open, menus = [], onClose }) {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 transition-opacity duration-300 ${
          open ? "visible opacity-100" : "invisible opacity-0"
        } z-40`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 left-0 flex h-full w-64 transform flex-col space-y-8 bg-white py-8 shadow-lg transition-transform duration-500 ${
          open ? "translate-x-0" : "-translate-x-full"
        } z-50`}
      >
        <CommonLogo size="120px" className={"px-4"} />
        <nav className="flex flex-col space-y-4">
          {menus.map((menu, index) => (
            <CommonNavLink
              key={index}
              menu={menu}
              isActive={isActive(menu.path)}
              onClick={onClose}
            />
          ))}
        </nav>
      </div>
    </>
  );
}

export default MenuDrawer;
