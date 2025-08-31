import React from "react";
import { useLocation } from "react-router-dom";

import Header from "./Header";
import Footer from "./Footer";
import RedirectPath from "../common/RedirectPath";
import { MENU_MAP, PATHS } from "@/constants";

function DefaultLayout({ children }) {
  const location = useLocation();

  const currentMenu = MENU_MAP.find((menu) => menu.path === location.pathname);

  return (
    <>
      <Header />
      {location.pathname !== PATHS.HOME && (
        <div className="mt-24 mb-4">
          <RedirectPath path={currentMenu.name} />
        </div>
      )}
      <div className={`mx-auto max-w-[1440px] px-4 xl:px-0`}>{children}</div>
      <Footer />
    </>
  );
}

export default DefaultLayout;
