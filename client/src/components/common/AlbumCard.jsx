import { useCommonNavigate } from "@/contexts/HandleNavigate";
import React, { useState } from "react";
import CommonButton from "./CommonButton";
import { PATHS } from "@/constants";

function AlbumCard({ id, name, description, demo_images = [] }) {
  const navigate = useCommonNavigate();
  return (
    <>
      <div className="shadow-main w-full max-w-sm cursor-pointer overflow-hidden rounded-xl bg-white transition-shadow duration-300 hover:shadow-2xl">
        <div className="min-h-[200px] p-4">
          <h2 className="text-primary line-clamp-1 max-w-full text-xl font-semibold">
            Album {name}
          </h2>
          <div className="my-2 border border-gray-100" />
          <p className="mt-2 line-clamp-1 min-h-[24px] max-w-full text-sm text-gray-600">
            {description}
          </p>

          <div className="mt-4 grid grid-cols-3 gap-4">
            {demo_images.map((img) => (
              <img
                key={img.id}
                src={img.image_data}
                alt=""
                className="col-span-1 h-20 w-full rounded-lg object-cover"
              />
            ))}
          </div>
          <CommonButton
            className={"border-primary mt-4 w-full rounded-full border"}
            onClick={() => navigate(PATHS.IMAGE_LIST.replace(":id", id))}
          >
            Xem thêm
          </CommonButton>
        </div>
      </div>
    </>
  );
}

export default AlbumCard;
