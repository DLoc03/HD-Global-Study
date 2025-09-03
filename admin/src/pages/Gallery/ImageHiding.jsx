import ImageCard from "@/components/common/ImageCard";
import SpinningLoading from "@/components/common/SpinningLoading";
import { useApi } from "@/config/api";
import React, { useEffect, useState } from "react";

function ImageHiding() {
  const [images, setImages] = useState([]);
  const { get, loading } = useApi();
  const [reload, setReload] = useState(false);

  useEffect(() => {
    const fetchImagesByStatus = async () => {
      try {
        const res = await get(
          `/image/listByStatus?status=draft&page=1&limit=20`,
        );
        if (res?.success) setImages(res);
      } catch (err) {
        console.log(err);
      }
    };
    fetchImagesByStatus();
  }, [get, reload]);

  return (
    <div className="flex w-full flex-col gap-4">
      {loading && <SpinningLoading />}
      <div className="flex items-end justify-between border-b-1 border-gray-200 pb-4">
        <h1 className="text-xl font-bold">Ảnh bị ẩn</h1>
      </div>
      <div className="w-full">
        {images?.totalItem === 0 ? (
          <h1 className="text-center text-gray-500">
            Danh sách ảnh bị ẩn trống
          </h1>
        ) : (
          <div className="grid grid-cols-6 gap-8">
            {images?.items?.map((image) => (
              <div key={image.id} className="col-span-1">
                <ImageCard
                  isShowHide={false}
                  image={image}
                  onReload={() => setReload(!reload)}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ImageHiding;
