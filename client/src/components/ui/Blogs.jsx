import React, { useEffect, useState } from "react";

import BlogCard from "../common/BlogCard";
import CommonButton from "../common/CommonButton";
import { useCommonNavigate } from "@/contexts/HandleNavigate";
import { PATHS } from "@/constants";
import { usePosts } from "@/hooks/usePost";
import SpinningLoading from "../common/SpinningLoading";

function Blogs() {
  const { posts, loading, getAll } = usePosts();

  useEffect(() => {
    getAll(1, 4);
  }, [getAll, 4]);

  const handleNavigate = useCommonNavigate();

  return (
    <div className="flex flex-col items-center gap-4">
      {loading && <SpinningLoading />}
      <h1 className="text-primary text-center text-4xl font-bold">Blogs</h1>
      <div className="grid w-full grid-cols-4 gap-8">
        {posts?.items?.length > 0 ? (
          posts?.items?.map((blog) => (
            <div
              className="col-span-4 md:col-span-2 xl:col-span-1"
              key={blog.id}
            >
              <BlogCard blog={blog} />
            </div>
          ))
        ) : (
          <div className="col-span-4 w-full">
            <h1 className="text-center text-sm text-gray-400">
              Hiện chưa có bài viết nào
            </h1>
          </div>
        )}
      </div>
      <CommonButton
        className={"border-primary w-full rounded-full border-1"}
        onClick={() => handleNavigate(PATHS.BLOG)}
      >
        Xem thêm
      </CommonButton>
    </div>
  );
}

export default Blogs;
