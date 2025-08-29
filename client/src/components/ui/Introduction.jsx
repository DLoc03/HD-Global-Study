import React from "react";

import { ceos, users } from "@/datas/users.json";

import { IMAGE_MAP, USER_MAP } from "@/constants";
import IntroductionCard from "../common/IntroductionCard";
import CommonSlider from "../common/ContentSlide";
import useResponsiveItems from "@/contexts/ResponsiveItems";
import AutoSlider from "../common/AutoSlide";

function Introduction() {
  const itemsPerSlide = useResponsiveItems({ base: 1, xl: 2 });
  return (
    <div className="grid gap-8 sm:grid-cols-5 lg:grid-cols-6 lg:gap-8 xl:grid-cols-5 xl:gap-32">
      <div className="col-span-5 grid grid-cols-2 gap-4 lg:col-span-3">
        <div className="col-span-2 text-center text-4xl lg:text-left">
          Câu chuyện của chúng tôi
        </div>
        <div className="text-md col-span-2 text-justify font-light">
          "<span className="text-primary font-bold">HD Global Study</span> ra
          đời với sứ mệnh đồng hành cùng thế hệ trẻ Việt Nam trên hành trình du
          học và định cư quốc tế. Chúng tôi không chỉ mang đến giải pháp học tập
          và cơ hội toàn cầu, mà còn là người bạn tin cậy, cùng học sinh – sinh
          viên và gia đình chắp cánh cho những ước mơ vươn xa, chinh phục tri
          thức và tương lai tươi sáng."
        </div>
        <div className="col-span-2">
          <CommonSlider
            items={ceos.map((u) => (
              <IntroductionCard key={u.key} info={u} image={IMAGE_MAP[u.key]} />
            ))}
            itemsPerSlide={itemsPerSlide}
          />
        </div>
      </div>
      <div className="col-span-5 h-full lg:col-span-3 xl:col-span-2">
        <AutoSlider images={USER_MAP} height="h-60  lg:h-120 xl:h-100" />
      </div>
    </div>
  );
}

export default Introduction;
