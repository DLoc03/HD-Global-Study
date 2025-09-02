import React, { useEffect, useState } from "react";
import BlogCard from "@/components/common/BlogCard";
import { usePosts } from "@/hooks/usePost";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

function Blog() {
  const [page, setPage] = useState(1);
  const { posts, total, loading, error, getAll } = usePosts();

  useEffect(() => {
    getAll(page, 32);
  }, [page, getAll]);

  return (
    <div className="flex w-full flex-col items-center gap-4">
      <h1 className="text-primary text-center text-4xl font-bold">Blogs</h1>
      <p className="text-md text-center">
        Khám phá hành trình du học qua những bài viết hữu ích, được tổng hợp và
        phân tích bởi{" "}
        <span className="text-primary font-bold">HD Global Study</span>.
      </p>

      <div className="mt-2 grid w-full grid-cols-4 gap-8">
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

      {/* Pagination */}
      <div className="mt-4 flex gap-2">
        <button
          disabled={page <= 1}
          onClick={() => setPage((prev) => prev - 1)}
          className="rounded bg-gray-200 px-4 py-2 disabled:opacity-50"
        >
          <IoIosArrowBack />
        </button>
        <span className="px-4 py-2">{page}</span>
        <button
          disabled={page * 32 >= total}
          onClick={() => setPage((prev) => prev + 1)}
          className="rounded bg-gray-200 px-4 py-2 disabled:opacity-50"
        >
          <IoIosArrowForward />
        </button>
      </div>
    </div>
  );
}

export default Blog;
