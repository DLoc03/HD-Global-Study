import React from "react";

import { services } from "@/datas/services.json";
import useResponsiveItems from "@/contexts/ResponsiveItems";
import CommonSlider from "../common/CommonSlider";
import ServiceCard from "../common/ServiceCard";

function Services() {
  const itemsPerSlide = useResponsiveItems({ base: 2, md: 4, xl: 8 });
  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="text-primary text-center text-4xl font-bold">
        Dịch vụ của chúng tôi
      </h1>
      <h1 className="text-md max-w-2xl text-center">
        Với đội ngũ chuyên gia giàu kiến thức và kinh nghiệm,{" "}
        <span className="text-primary font-bold">HD Global Study</span> không
        chỉ giúp bạn hiện thực hóa giấc mơ vào các trường mong ước, mà còn tự
        tin hòa nhập môi trường đa văn hóa và gặt hái thành công
      </h1>
      <CommonSlider
        items={services.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
        itemsPerSlide={itemsPerSlide}
      />
    </div>
  );
}

export default Services;
