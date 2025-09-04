import React from "react";
import { reviews } from "@/datas/reviews.json";
import useResponsiveItems from "@/contexts/ResponsiveItems";
import ReviewCard from "../common/ReviewCard";
import CommonSlider from "../common/CommonSlider";
import { IMAGE_MAP } from "@/constants";
import CommonFadeContainer from "../common/CommonFadeContainer";
import CommonFade from "../common/CommonFade";

function GuestReviews() {
  const itemsPerSlide = useResponsiveItems({ base: 1, md: 2, lg: 3, xl: 4 });

  return (
    <CommonFadeContainer
      stagger={0.3}
      className="flex w-full flex-col items-center gap-4"
    >
      <CommonFade>
        <h1 className="text-primary text-center text-4xl font-bold">
          Cảm nhận của các quý khách hàng
        </h1>
      </CommonFade>

      <CommonFade className="flex w-full justify-center">
        <CommonSlider
          items={reviews.map((user) => (
            <ReviewCard
              key={user.id}
              user={user}
              avatar={IMAGE_MAP[user.key]}
            />
          ))}
          itemsPerSlide={itemsPerSlide}
        />
      </CommonFade>
    </CommonFadeContainer>
  );
}

export default GuestReviews;
