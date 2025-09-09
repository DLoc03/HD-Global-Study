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
      className="mx-auto flex w-full max-w-5xl flex-col items-center gap-8"
    >
      <CommonFade>
        <h1 className="text-primary text-center text-3xl font-bold md:text-4xl">
          Về HD Global Study
        </h1>
      </CommonFade>

      <CommonFade>
        <p className="text-md max-w-5xl text-center font-light">
          HD Global Study ra đời với sứ mệnh đồng hành cùng thế hệ trẻ Việt Nam
          trên hành trình du học và sinh sống tại Mỹ. Không chỉ mang đến những
          giải pháp học tập toàn diện, HD Global Study còn là người bạn tin cậy
          của học sinh – sinh viên và gia đình, cùng nhau chắp cánh ước mơ chinh
          phục tri thức và hòa nhập trong môi trường đa văn hóa.
        </p>
      </CommonFade>
      <CommonFade>
        <p className="text-md max-w-5xl text-center font-light">
          Là đơn vị chuyên tư vấn du học và định hướng cuộc sống tại Mỹ, HD
          Global Study luôn đồng hành cùng học sinh, sinh viên và gia đình Việt
          Nam trên hành trình vươn ra thế giới, chinh phục tri thức và hội nhập
          trong môi trường đa văn hóa. Với đội ngũ chuyên gia giàu kiến thức và
          kinh nghiệm, chúng tôi không chỉ giúp bạn hiện thực hóa giấc mơ vào
          những ngôi trường mong ước, mà còn tự tin hòa nhập và gặt hái thành
          công tại Mỹ.
        </p>
      </CommonFade>
      <CommonFade>
        <h1 className="text-primary text-center text-3xl font-bold md:text-4xl">
          HD Global Study – Luôn đồng hành cùng bạn
        </h1>
      </CommonFade>
      <CommonFade>
        <p className="text-md max-w-5xl text-center font-light">
          Mỗi bước tiến, mỗi thành công của học sinh không chỉ là niềm vui, mà
          còn là động lực để HD Global Study tiếp tục sứ mệnh luôn đồng hành
          chắp cánh ước mơ Mỹ. Chúng tôi tin rằng, với tri thức và sự hội nhập,
          thế hệ trẻ Việt Nam sẽ vươn xa, tự tin khẳng định mình trên hành trình
          chinh phục thế giới.
        </p>
      </CommonFade>

      <CommonFade>
        <h1 className="text-primary text-center text-3xl font-bold md:text-4xl">
          Câu chuyện của HD Global Study
        </h1>
      </CommonFade>

      {ceos.map((ceo, idx) => (
        <CommonFade key={ceo.key} className="w-full">
          <div
            className={`flex flex-col ${idx % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} gap-4 ${
              idx % 2 !== 0 ? "mt-8" : ""
            }`}
          >
            <img
              src={IMAGE_MAP[ceo.key]}
              alt={ceo.name}
              className="aspect-square w-full items-center rounded-full object-cover lg:h-[200px] lg:w-[200px]"
            />
            <div
              className={`flex flex-col ${idx % 2 === 0 ? "text-left" : "lg:text-right"} gap-2`}
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
