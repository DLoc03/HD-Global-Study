import { PATHS } from "@/constants";
import React from "react";

import { IoMdHome } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";

function RedirectPath({ path }) {
  return (
    <div className="text-primary mx-auto flex w-full max-w-[1440px] items-center gap-4">
      <Link to={PATHS.HOME}>
        <IoMdHome fontSize={"24px"} />
      </Link>
      <IoIosArrowForward />
      <p className="font-bold">{path}</p>
    </div>
  );
}

export default RedirectPath;
