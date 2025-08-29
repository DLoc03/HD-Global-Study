import React from "react";

import { reviews } from "@/datas/reviews.json";
import useResponsiveItems from "@/contexts/ResponsiveItems";
import ReviewCard from "../common/ReviewCard";
import CommonSlider from "../common/ContentSlide";
import { IMAGE_MAP } from "@/constants";

function GuestReviews() {
  const itemsPerSlide = useResponsiveItems({ base: 1, md: 2, lg: 3, xl: 4 });
  return (
    <div className="flex w-full flex-col gap-4">
      <h1 className="text-primary text-center text-4xl font-bold">
        Cảm nhận của các quý khách hàng
      </h1>
      <div className="flex w-full justify-center">
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
      </div>
    </div>
  );
}

export default GuestReviews;
