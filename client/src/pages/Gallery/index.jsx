import React, { useEffect, useState } from "react";
import { useAlbums } from "@/hooks/useAlbum";
import AlbumCard from "@/components/common/AlbumCard";
import SpinningLoading from "@/components/common/SpinningLoading";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import Pagination from "@/components/common/Pagination";
import CommonFadeContainer from "@/components/common/CommonFadeContainer";
import CommonFade from "@/components/common/CommonFade";

function Gallery() {
  const { albums, total, totalPage, currentPage, loading, getPreview } =
    useAlbums();
  const [page, setPage] = useState(1);
  const limit = 32;

  useEffect(() => {
    getPreview(page, limit);
  }, [page, getPreview]);

  return (
    <CommonFadeContainer className="flex w-full flex-col items-center">
      {loading && <SpinningLoading />}

      <CommonFade>
        <h1 className="text-primary mb-8 text-center text-3xl font-bold md:text-4xl">
          Câu chuyện qua những khoảnh khắc
        </h1>
      </CommonFade>

      <CommonFade>
        <p className="text-md mb-8 max-w-5xl text-center font-light">
          Là nơi lưu giữ và chia sẻ những kỷ niệm, hình ảnh đáng nhớ, từ những
          chuyến đi, sự kiện đặc biệt đến những khoảnh khắc đời thường nhưng ý
          nghĩa. Mỗi album như một cuốn nhật ký trực quan, giúp người xem cảm
          nhận câu chuyện và cảm xúc đằng sau từng bức ảnh.
        </p>
      </CommonFade>

      <CommonFade className="grid w-full grid-cols-4 gap-8">
        {albums.map((album) => (
          <div
            className="col-span-4 md:col-span-2 xl:col-span-1"
            key={album.id}
          >
            <AlbumCard
              id={album.id}
              name={album.name}
              description={album.description}
              demo_images={album.demo_images || []}
            />
          </div>
        ))}
      </CommonFade>

      {/* Pagination */}
      <CommonFade>
        <Pagination
          currentPage={page}
          totalPage={totalPage}
          onPageChange={(p) => setPage(p)}
        />
      </CommonFade>
    </CommonFadeContainer>
  );
}

export default Gallery;
