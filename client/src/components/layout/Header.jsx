import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import { MENU_MAP, PATHS } from "@/constants";

import CommonNavLink from "../common/CommonNavLink";
import CommonLogo from "../common/CommonLogo";

import { AiOutlineMenu } from "react-icons/ai";
import MenuDrawer from "../common/MenuDrawer";

function Header() {
  const location = useLocation();
  const isActive = (path) => (location.pathname === path ? true : false);

  const [show, setShow] = useState(true);
  const [rotated, setRotated] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setScrolled(currentScrollY > 0);

      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setShow(false);
      } else {
        setShow(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);
  const handleOpenMenu = () => {
    setRotated(!rotated);
    setOpenDrawer(true);
  };
  return (
    <>
      <div
        className={`fixed top-0 z-20 w-full py-4 transition-all duration-300 ${show ? "translate-y-0 border-1 border-gray-100 bg-white" : "-translate-y-full"} ${scrolled ? "shadow-lg" : ""}`}
      >
        <div className="mx-auto flex w-full max-w-[1440px] items-center justify-between px-4 xl:px-0">
          <CommonLogo size="60px" />
          <ul className="hidden justify-end space-x-4 lg:flex">
            {MENU_MAP.map((menu, index) => (
              <CommonNavLink
                key={index}
                menu={menu}
                isActive={isActive(menu.path)}
              />
            ))}
          </ul>
          <div className="active:text-primary block lg:hidden">
            <AiOutlineMenu
              fontSize={"28px"}
              onClick={handleOpenMenu}
              className={`transform transition-transform duration-500 ${rotated ? "rotate-180" : "rotate-0"}`}
            />
          </div>
        </div>
      </div>
      <MenuDrawer
        open={openDrawer}
        menus={MENU_MAP}
        onClose={() => {
          setOpenDrawer(false);
          setRotated(false);
        }}
      />
    </>
  );
}

export default Header;
