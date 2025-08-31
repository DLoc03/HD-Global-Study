import React from "react";

import { blogs } from "@/datas/blogs.json";
import BlogCard from "@/components/common/BlogCard";

function Blog() {
  //Add pagination
  return (
    <div className="flex w-full flex-col items-center gap-4">
      <h1 className="text-primary text-center text-4xl font-bold">Blogs</h1>
      <p className="text-md text-center">
        Khám phá hành trình du học qua những bài viết hữu ích, được tổng hợp và
        phân tích bởi{" "}
        <span className="text-primary font-bold">HD Global Study</span>.
      </p>
      <div className="mt-2 grid grid-cols-4 gap-8 space-y-2">
        {blogs.map((blog) => (
          <div className="span-col-1" key={blog.id}>
            <BlogCard blog={blog} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Blog;
