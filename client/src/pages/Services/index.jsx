import React from "react";

import { services } from "@/datas/services.json";
import ServiceCard from "@/components/common/ServiceCard";
import { IMAGE_MAP } from "@/constants";
import ContactForm from "@/components/common/ContactForm";
import GuestReviews from "@/components/ui/GuestReviews";

function Service() {
  return (
    <div className="flex w-full flex-col items-center gap-4">
      <h1 className="text-primary text-center text-3xl font-bold md:text-4xl">
        HD GLOBAL STUDY luôn hỗ trợ bạn
      </h1>
      <p className="max-w-5xl text-center">
        Mỗi thành công của học sinh chính là động lực và niềm tự hào để HD
        Global Study tiếp tục đồng hành, chắp cánh giấc mơ Mỹ cho các bạn trẻ
        Việt Nam.
      </p>
      <div className="lg:grid-col-6 grid w-full grid-cols-2 md:grid-cols-4">
        {services.map((service) => (
          <div className="span-col-1" key={service.id}>
            <ServiceCard service={service} avatar={IMAGE_MAP[service.key]} />
          </div>
        ))}
      </div>
      <GuestReviews />
      <ContactForm />
    </div>
  );
}

export default Service;
