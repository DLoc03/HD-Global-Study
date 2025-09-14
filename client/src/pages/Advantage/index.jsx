import React from "react";
import data from "@/datas/advantage.json";
import { IMAGE_MAP } from "@/constants";
import CommonFadeContainer from "@/components/common/CommonFadeContainer";
import CommonFade from "@/components/common/CommonFade";

function Advantage() {
  return (
    <CommonFadeContainer className="mx-auto max-w-7xl px-4">
      <CommonFade>
        <h1 className="text-primary mb-12 text-center text-3xl font-bold md:text-4xl">
          Tại sao bạn nên chọn HD Global Studies
        </h1>
      </CommonFade>

      <CommonFade className="flex flex-col gap-16">
        {data.map((item, idx) => (
          <div
            key={idx}
            className={`flex flex-col ${
              idx % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
            } items-center gap-8`}
          >
            <div className="w-full flex-shrink-0 lg:w-1/2">
              <img
                src={IMAGE_MAP[item.image]}
                alt={item.title}
                className="aspect-video w-full rounded-xl object-cover shadow-lg"
              />
            </div>

            <div className="flex w-full flex-col gap-4 lg:w-1/2">
              <h2 className="text-primary text-2xl font-bold">{item.title}</h2>
              <p className="text-md leading-relaxed font-light">
                {item.subtitle}
              </p>

              <ul className="text-md list-inside list-disc space-y-2 font-light">
                {item.points.map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>

              {item.conclusion && (
                <p className="text-md mt-2 font-medium">{item.conclusion}</p>
              )}
            </div>
          </div>
        ))}
      </CommonFade>
    </CommonFadeContainer>
  );
}

export default Advantage;
