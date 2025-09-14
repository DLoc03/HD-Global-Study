import React from "react";

import logo from "/logo.jpg";
import { Link } from "react-router-dom";
import { PATHS } from "@/constants";

function CommonLogo({ size = "100px", className }) {
  return (
    <Link to={PATHS.HOME}>
      <div className={`flex ${className}`} style={{ width: size }}>
        <img
          className="m-auto rounded-full"
          src={logo}
          style={{ width: "100%" }}
        />
      </div>
    </Link>
  );
}

export default CommonLogo;
