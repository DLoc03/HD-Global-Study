import { PATHS } from "@/constants";
import { useCommonNavigate } from "@/contexts/HandleNavigate";
import { convertDateTime } from "@/utils";
import React from "react";

function BlogCard({ blog }) {
  const handleNavigate = useCommonNavigate();
  return (
    <div
      className="shadow-main flex h-full cursor-pointer flex-col gap-1 rounded-xl"
      onClick={() =>
        handleNavigate(PATHS.BLOG_CONTENT.replace(":slug", blog?.slug))
      }
    >
      <img
        src={blog.image}
        alt={blog.name}
        style={{ width: "100%", height: "160px", objectFit: "cover" }}
        className="rounded-t-xl"
      />
      <div className="flex flex-col gap-2 p-4">
        <p className="text-sm font-light">{convertDateTime(blog.created_at)}</p>
        <h1 className="line-clamp-2 min-h-14 text-xl font-medium">
          {blog.title}
        </h1>
        <p className="text-md line-clamp-4">{blog.description}</p>
      </div>
    </div>
  );
}

export default BlogCard;
