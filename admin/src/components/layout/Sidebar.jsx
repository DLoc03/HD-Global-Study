import React from "react";
import CommonMenu from "../common/CommonMenu";

import { MdDashboard } from "react-icons/md";
import { FaPen } from "react-icons/fa";
import { LuNewspaper } from "react-icons/lu";
import { FiPenTool } from "react-icons/fi";
import { MdInsertPhoto } from "react-icons/md";
import { IoIosSettings } from "react-icons/io";

import { PATHS } from "@/constants";

export default function Sidebar() {
  return (
    <div className="h-screen p-4">
      <img src="./logo.png" className="mb-8 w-[100px] px-3" />
      <nav className="space-y-2">
        <CommonMenu
          label={"Trang chủ"}
          icon={MdDashboard}
          path={PATHS.DASHBOARD}
        />
        <CommonMenu label={"Nội dung"} icon={FaPen}>
          <CommonMenu label={"Bài viết"} icon={LuNewspaper} path={PATHS.BLOG} />
          {/* <CommonMenu label={"Dịch vụ"} icon={FiPenTool} path={PATHS.SERVICE} /> */}
        </CommonMenu>
        <CommonMenu
          label={"Thư viện ảnh"}
          icon={MdInsertPhoto}
          path={PATHS.GALLERY}
        />
        <CommonMenu
          label={"Cài đặt"}
          icon={IoIosSettings}
          path={PATHS.SETTING}
        />
      </nav>
    </div>
  );
}
