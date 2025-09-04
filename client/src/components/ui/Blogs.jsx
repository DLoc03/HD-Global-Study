import React, { useEffect } from "react";

import BlogCard from "../common/BlogCard";
import CommonButton from "../common/CommonButton";
import { useCommonNavigate } from "@/contexts/HandleNavigate";
import { PATHS } from "@/constants";
import { usePosts } from "@/hooks/usePost";
import SpinningLoading from "../common/SpinningLoading";
import CommonFadeContainer from "../common/CommonFadeContainer";
import CommonFade from "../common/CommonFade";

function Blogs() {
  const { posts, loading, getAll } = usePosts();
  const handleNavigate = useCommonNavigate();

  useEffect(() => {
    getAll(1, 4);
  }, [getAll]);

  return (
    <CommonFadeContainer
      stagger={0.3}
      className="flex w-full flex-col items-center gap-4"
    >
      {loading && <SpinningLoading />}

      <CommonFade>
        <h1 className="text-primary text-center text-4xl font-bold">Blogs</h1>
      </CommonFade>

      <CommonFadeContainer
        stagger={0.2}
        className="grid w-full grid-cols-4 gap-8"
      >
        {posts?.items?.length > 0 ? (
          posts.items.map((blog) => (
            <CommonFade
              key={blog.id}
              className="col-span-4 md:col-span-2 xl:col-span-1"
            >
              <BlogCard blog={blog} />
            </CommonFade>
          ))
        ) : (
          <CommonFade className="col-span-4 w-full">
            <h1 className="text-center text-sm text-gray-400">
              Hiện chưa có bài viết nào
            </h1>
          </CommonFade>
        )}
      </CommonFadeContainer>

      <CommonFade>
        <CommonButton
          className={"border-primary w-[200px] rounded-full border-1"}
          onClick={() => handleNavigate(PATHS.BLOG)}
        >
          Xem thêm
        </CommonButton>
      </CommonFade>
    </CommonFadeContainer>
  );
}

export default Blogs;
