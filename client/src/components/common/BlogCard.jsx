import { convertDateTime } from "@/utils";
import React from "react";

function BlogCard({ blog }) {
  return (
    <div className="shadow-main flex h-full cursor-pointer flex-col gap-1 rounded-xl">
      <img
        src={blog.image}
        alt={blog.name}
        style={{ width: "100%", height: "160px", objectFit: "cover" }}
        className="rounded-t-xl"
      />
      <div className="flex flex-col gap-2 p-4">
        <p className="text-sm font-light">{convertDateTime(blog.date)}</p>
        <h1 className="line-clamp-2 text-xl font-medium">{blog.title}</h1>
        <p className="text-md line-clamp-4">{blog.description}</p>
      </div>
    </div>
  );
}

export default BlogCard;
