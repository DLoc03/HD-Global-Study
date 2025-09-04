import { PATHS } from "@/constants";
import React, { useEffect, useState } from "react";

import { IoMdHome } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { Link, useParams } from "react-router-dom";

import { blogs } from "@/datas/blogs.json";
import { usePosts } from "@/hooks/usePost";
import { useAlbums } from "@/hooks/useAlbum";

function RedirectPath({ path }) {
  const { slug } = useParams();
  const { id } = useParams();
  const [blog, setBlog] = useState();
  const [albumDetail, setAlbumDetail] = useState();
  const { getBySlug, loading, error } = usePosts();
  const { getAlbum } = useAlbums();

  useEffect(() => {
    if (!slug) return;

    const fetchBlog = async () => {
      try {
        const data = await getBySlug(slug);
        setBlog(data?.post || null);
      } catch (err) {
        console.error(err);
      }
    };

    fetchBlog();
  }, [slug, getBySlug]);

  useEffect(() => {
    if (!id) return;

    const fetchAlbum = async () => {
      const data = await getAlbum(id);
      setAlbumDetail(data || null);
    };

    fetchAlbum();
  }, [id, getAlbum]);

  return (
    <div className="text-primary mx-auto flex w-full max-w-[1440px] items-center gap-4 px-4 xl:px-0">
      <Link to={PATHS.HOME}>
        <IoMdHome fontSize={"24px"} />
      </Link>
      <IoIosArrowForward />
      <Link to={path.path}>
        <p className="font-bold">{path?.name}</p>
      </Link>
      {slug && (
        <div className="flex items-center gap-4">
          <IoIosArrowForward />
          <p className="line-clamp-1 font-bold">{blog?.title}</p>
        </div>
      )}
      {id && (
        <div className="flex items-center gap-4">
          <IoIosArrowForward />
          <p className="line-clamp-1 font-bold">Album {albumDetail?.name}</p>
        </div>
      )}
    </div>
  );
}

export default RedirectPath;
