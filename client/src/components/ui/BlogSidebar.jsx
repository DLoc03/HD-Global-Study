import React, { useEffect, useState } from "react";
import { usePosts } from "@/hooks/usePost";
import SpinningLoading from "../common/SpinningLoading";
import BlogCard from "../common/BlogCard";

function BlogSidebar() {
  const [page, setPage] = useState(1);
  const { posts, loading, getAll } = usePosts();

  useEffect(() => {
    getAll(page, 10, "ASC", "published", 1);
  }, [page, getAll]);
  return (
    <div className="shadow-main flex h-[520px] w-full flex-col items-end gap-2 overflow-y-auto rounded-xl bg-white px-8 py-4">
      <h1 className="text-primary text-lg font-bold">Bài viết liên quan</h1>

      <div className="mb-4 w-full border-t-1 border-gray-200" />
      <div className="flex w-full flex-col items-start">
        {loading ? (
          <SpinningLoading />
        ) : posts?.totalItem > 0 ? (
          posts?.items?.map((blog) => (
            <BlogCard key={blog.id} blog={blog} direction="row" />
          ))
        ) : (
          <p className="text-sm text-gray-400">Hiện chưa có bài viết nào</p>
        )}
      </div>
    </div>
  );
}

export default BlogSidebar;
