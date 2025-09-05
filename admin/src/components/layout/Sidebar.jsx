import React from "react";
import CommonMenu from "../common/CommonMenu";

import { FaPen } from "react-icons/fa";
import { LuNewspaper } from "react-icons/lu";
import { MdInsertPhoto } from "react-icons/md";
import { IoIosSettings } from "react-icons/io";
import { MdOutlineContentPasteOff } from "react-icons/md";
import { LuAlbum } from "react-icons/lu";
import { LuImageOff } from "react-icons/lu";
import { BiSolidCategory } from "react-icons/bi";

import { PATHS } from "@/constants";

export default function Sidebar() {
  return (
    <div className="h-screen p-4">
      <img src="/logo.png" className="mt-4 mb-8 w-[100px] px-3" />
      <nav className="space-y-2">
        <CommonMenu label={"Quản lý nội dung"} icon={FaPen}>
          <CommonMenu label={"Nội dung"} icon={LuNewspaper} path={PATHS.BLOG} />
          <CommonMenu
            label={"Đã ẩn"}
            icon={MdOutlineContentPasteOff}
            path={PATHS.HIDING_BLOG}
          />
        </CommonMenu>
        <CommonMenu
          label={"Danh mục"}
          icon={BiSolidCategory}
          path={PATHS.CATEGORY}
        />
        <CommonMenu label={"Thư viện ảnh"} icon={MdInsertPhoto}>
          <CommonMenu
            label={"Danh sách album"}
            icon={LuAlbum}
            path={PATHS.GALLERY}
          />
          <CommonMenu
            label={"Album đã ẩn"}
            icon={MdOutlineContentPasteOff}
            path={PATHS.HIDING_ALBUM}
          />
          <CommonMenu
            label={"Hình ảnh đã ẩn"}
            icon={LuImageOff}
            path={PATHS.HIDING_IMAGE}
          />
        </CommonMenu>
        <CommonMenu
          label={"Cài đặt"}
          icon={IoIosSettings}
          path={PATHS.SETTING}
        />
      </nav>
    </div>
  );
}
