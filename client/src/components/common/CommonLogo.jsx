import React from "react";

import logo from "@assets/main/logo.png";
import { Link } from "react-router-dom";
import { PATHS } from "@/constants";

function CommonLogo({ size = "100px", className }) {
  return (
    <Link to={PATHS.HOME}>
      <div className={`flex ${className}`} style={{ width: size }}>
        <img className="m-auto" src={logo} style={{ width: "100%" }} />
      </div>
    </Link>
  );
}

export default CommonLogo;
