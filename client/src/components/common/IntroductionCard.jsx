import React from "react";

import { MdOutlineArrowOutward } from "react-icons/md";

import CommonButton from "./CommonButton";
import { useCommonNavigate } from "@/contexts/HandleNavigate";
import { PATHS } from "@/constants";

function IntroductionCard({ info, image }) {
  const handleNavigate = useCommonNavigate();
  return (
    <div
      className={`bg-light flex h-[240px] w-full flex-col gap-4 rounded-2xl p-4`}
    >
      <div className="flex w-full justify-between">
        <div className="h-[74px] w-[74px] rounded-2xl border-4 border-white md:h-[120px] md:w-[120px]">
          <img
            src={image}
            alt={info.name}
            style={{ width: "100%", objectFit: "cover" }}
            className="rounded-2xl"
          />
        </div>
        <div className="flex max-w-[220px] flex-col items-end gap-2">
          <h1 className="text-right text-lg font-medium text-white">
            {info.title}
          </h1>
          <p className="line-clamp-2 w-full max-w-full text-right text-sm text-white">
            {info.subtitle}
          </p>
          <CommonButton
            className={
              "hover:text-primary w-[140px] rounded-full border-1 border-white text-sm text-white hover:bg-white"
            }
            onClick={() => handleNavigate(PATHS.ABOUT)}
          >
            Tìm hiểu thêm <MdOutlineArrowOutward />
          </CommonButton>
        </div>
      </div>
      <h2 className="line-clamp-3 text-sm text-white">{info.content}</h2>
    </div>
  );
}

export default IntroductionCard;
