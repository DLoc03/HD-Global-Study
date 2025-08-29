import React from "react";

import { NavLink } from "react-router-dom";

function CommonNavLink({ isActive, menu, className }) {
  return (
    <NavLink
      to={menu.path}
      className={
        isActive
          ? `text-primary rounded-lg bg-gray-50 px-4 py-2 font-medium ${className}`
          : `hover:text-primary rounded-lg p-2 px-4 py-2 font-medium text-black ${className}`
      }
    >
      {menu.name}
    </NavLink>
  );
}

export default CommonNavLink;
