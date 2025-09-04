import Services from "@/components/ui/Services";
import React from "react";
import { ceos } from "@/datas/users.json";
import { IMAGE_MAP } from "@/constants";
import CommonFadeContainer from "@/components/common/CommonFadeContainer";
import CommonFade from "@/components/common/CommonFade";

function About() {
  return (
    <CommonFadeContainer
      stagger={0.2}
      className="mx-auto flex w-full max-w-5xl flex-col items-center gap-4"
    >
      <CommonFade>
        <h1 className="text-primary text-center text-3xl font-bold md:text-4xl">
          Về HD GLOBAL STUDY
        </h1>
      </CommonFade>

      <CommonFade>
        <p className="text-md max-w-5xl text-center font-light">
          Là đơn vị chuyên tư vấn du học và định cư uy tín, đồng hành cùng hàng
          ngàn học sinh, sinh viên và gia đình Việt Nam trên hành trình vươn ra
          thế giới, chinh phục tri thức tại Mỹ. Với đội ngũ chuyên gia giàu kiến
          thức và kinh nghiệm, HD Global Study không chỉ giúp bạn hiện thực hóa
          giấc mơ vào các trường mong ước, mà còn tự tin hòa nhập môi trường đa
          văn hóa và gặt hái thành công
        </p>
      </CommonFade>

      <CommonFade>
        <h1 className="text-primary text-center text-3xl font-bold md:text-4xl">
          Câu chuyện của chúng tôi
        </h1>
      </CommonFade>

      {ceos.map((ceo, idx) => (
        <CommonFade key={ceo.key} className="w-full">
          <div
            className={`flex flex-col ${idx % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} gap-4`}
          >
            <img
              src={IMAGE_MAP[ceo.key]}
              alt={ceo.name}
              className="h-[120px] w-[120px] rounded-md object-cover lg:h-[200px] lg:w-[200px]"
            />
            <div
              className={`flex flex-col ${idx % 2 === 0 ? "text-left" : "text-right"} gap-2`}
            >
              <h1 className="text-primary text-lg font-bold">{ceo.title}</h1>
              <p className="text-md">{ceo.subtitle}</p>
              {ceo.content.map((text, index) => (
                <p key={index} className="mt-2 text-justify font-light">
                  {text}
                </p>
              ))}
            </div>
          </div>
        </CommonFade>
      ))}

      <CommonFade>
        <Services />
      </CommonFade>
    </CommonFadeContainer>
  );
}

export default About;
