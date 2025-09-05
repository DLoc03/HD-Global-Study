import React, { useEffect, useState } from "react";
import { useImages } from "@/hooks/useImage";
import { useParams } from "react-router-dom";
import { useAlbums } from "@/hooks/useAlbum";
import SpinningLoading from "@/components/common/SpinningLoading";
import ImageOverview from "@/components/common/ImageOverview";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import Pagination from "@/components/common/Pagination";
import CommonFadeContainer from "@/components/common/CommonFadeContainer";
import CommonFade from "@/components/common/CommonFade";

function AlbumDetail() {
  const { id } = useParams();
  const { getByAlbum, loading } = useImages();
  const { getAlbum } = useAlbums();

  const [album, setAlbum] = useState(null);
  const [imageList, setImageList] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const limit = 32;

  // Fetch album info
  useEffect(() => {
    if (!id) return;
    const fetchAlbum = async () => {
      const data = await getAlbum(id);
      setAlbum(data || null);
    };
    fetchAlbum();
  }, [id, getAlbum]);

  // Fetch images by album with pagination
  useEffect(() => {
    if (!id) return;
    const fetchImages = async () => {
      const data = await getByAlbum(id, page, limit);
      setImageList(data.items);
      setTotalPage(data.totalPage);
    };
    fetchImages();
  }, [id, page, getByAlbum]);

  return (
    <CommonFadeContainer className="flex w-full flex-col items-center gap-4">
      {loading && <SpinningLoading />}

      <CommonFade>
        <h1 className="text-primary text-center text-3xl font-bold md:text-4xl">
          Album {album?.name}
        </h1>
      </CommonFade>
      <CommonFade>
        <p className="text-md max-w-5xl px-4 font-light md:px-0">
          {album?.description}
        </p>
      </CommonFade>

      <CommonFade className="grid w-full grid-cols-4 gap-8">
        {imageList?.map((image) => (
          <img
            src={image.image_data}
            alt={image.title}
            key={image.id}
            className="shadow-main col-span-4 h-[200px] w-full cursor-pointer rounded-xl object-cover md:col-span-2 xl:col-span-1"
            onClick={() => setSelectedImage(image)}
          />
        ))}
      </CommonFade>

      <CommonFade>
        <Pagination
          currentPage={page}
          totalPage={totalPage}
          onPageChange={(p) => setPage(p)}
        />
      </CommonFade>

      {selectedImage && (
        <ImageOverview
          image={selectedImage}
          open={!!selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </CommonFadeContainer>
  );
}

export default AlbumDetail;
