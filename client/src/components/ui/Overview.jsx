import React from "react";

import CommonButton from "../common/CommonButton";

import { MdOutlineArrowOutward } from "react-icons/md";
import { useCommonNavigate } from "@/contexts/HandleNavigate";
import { PATHS } from "@/constants";
import CommonFadeContainer from "../common/CommonFadeContainer";
import CommonFade from "../common/CommonFade";

function Overview() {
  const handleNavigate = useCommonNavigate();
  return (
    <CommonFadeContainer
      stagger={0.3}
      className="flex flex-col items-center space-y-4"
    >
      <CommonFade>
        <h1 className="text-primary text-center text-4xl font-bold md:text-6xl">
          HD Global Study
        </h1>
      </CommonFade>

      <CommonFade>
        <h2 className="text-secondary text-center text-2xl font-medium">
          CHẮP CÁNH ƯỚC MƠ DU HỌC & ĐỊNH CƯ TOÀN CẦU
        </h2>
      </CommonFade>

      <CommonFade>
        <h3 className="max-w-2xl text-center font-light">
          Là đơn vị chuyên tư vấn du học và định cư uy tín, đồng hành cùng hàng
          ngàn học sinh, sinh viên và gia đình Việt Nam trên hành trình vươn ra
          thế giới, chinh phục tri thức tại Mỹ
        </h3>
      </CommonFade>

      <CommonFade>
        <div className="flex gap-4">
          <CommonButton
            className="bg-primary hover:bg-light w-[160px] rounded-full text-white md:w-[200px]"
            onClick={() => handleNavigate(PATHS.ABOUT)}
          >
            Về chúng tôi
            <MdOutlineArrowOutward fontSize={"20px"} />
          </CommonButton>
          <CommonButton
            className="hover:bg-light hover:border-light w-[160px] rounded-full border-1 hover:text-white md:w-[200px]"
            onClick={() => handleNavigate(PATHS.SERVICE)}
          >
            Dịch vụ
            <MdOutlineArrowOutward fontSize={"20px"} />
          </CommonButton>
        </div>
      </CommonFade>
    </CommonFadeContainer>
  );
}

export default Overview;
