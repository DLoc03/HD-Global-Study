import Services from "@/components/ui/Services";
import React from "react";

import { ceos } from "@/datas/users.json";
import { IMAGE_MAP } from "@/constants";

function About() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-4">
      <h1 className="text-primary text-center text-3xl font-bold md:text-4xl">
        Về GLOBAL STUDY HD
      </h1>
      <p className="text-md max-w-5xl text-center font-light">
        Là đơn vị chuyên tư vấn du học và định cư uy tín, đồng hành cùng hàng
        ngàn học sinh, sinh viên và gia đình Việt Nam trên hành trình vươn ra
        thế giới, chinh phục tri thức tại Mỹ. Với đội ngũ chuyên gia giàu kiến
        thức và kinh nghiệm, HD Global Study không chỉ giúp bạn hiện thực hóa
        giấc mơ vào các trường mong ước, mà còn tự tin hòa nhập môi trường đa
        văn hóa và gặt hái thành công
      </p>
      <h1 className="text-primary text-center text-3xl font-bold md:text-4xl">
        Câu chuyện của chúng tôi
      </h1>
      <div className="w-full">
        <div className="float-left mr-6">
          <img
            src={IMAGE_MAP[ceos[0].key]}
            alt={ceos[0].name}
            className="h-[200px] w-[200px] rounded-md object-cover"
          />
        </div>
        <h1 className="text-primary text-lg font-bold">{ceos[0].title}</h1>
        <p className="text-md">{ceos[0].subtitle}</p>
        <p className="mt-4 text-justify font-light">{ceos[0].content}</p>
      </div>

      <div className="w-full">
        <div className="float-right ml-6">
          <img
            src={IMAGE_MAP[ceos[1].key]}
            alt={ceos[1].name}
            className="h-[200px] w-[200px] rounded-md object-cover"
          />
        </div>
        <h1 className="text-primary text-right text-lg font-bold">
          {ceos[1].title}
        </h1>
        <p className="text-md text-right">{ceos[1].subtitle}</p>
        <p className="mt-4 text-justify font-light">{ceos[1].content}</p>
      </div>

      <Services />
    </div>
  );
}

export default About;
