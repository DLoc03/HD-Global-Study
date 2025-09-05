import { PATHS } from "@/constants";
import { useCommonNavigate } from "@/contexts/HandleNavigate";
import { convertDateTime } from "@/utils";
import React from "react";

function BlogCard({ blog, direction = "col" }) {
  const handleNavigate = useCommonNavigate();
  return (
    <div
      className={`${direction === "col" ? "shadow-main h-full" : "h-fit py-2"} flex cursor-pointer flex-${direction} gap-1 rounded-xl`}
      onClick={() =>
        handleNavigate(
          blog?.category_id === 1
            ? PATHS.BLOG_CONTENT.replace(":slug", blog?.slug)
            : PATHS.SERVICE_DETAIL.replace(":slug", blog?.slug),
        )
      }
    >
      <img
        src={blog.image}
        alt={blog.name}
        style={{
          width: "100%",
          height: direction === "col" ? "160px" : "100px",
          objectFit: "cover",
        }}
        className={direction === "col" ? "rounded-t-xl" : ""}
      />
      <div
        className={`flex flex-col gap-1 ${direction === "col" ? "p-4" : "pl-4"}`}
      >
        <p className={`text-sm font-light ${direction !== "col" && "hidden"}`}>
          {convertDateTime(blog.created_at)}
        </p>
        <h1
          className={`line-clamp-2 text-${direction === "col" ? "xl min-h-14" : "md min-h-7"} font-medium`}
        >
          {blog.title}
        </h1>
        <p
          className={`text-sm font-light ${direction === "col" ? "hidden" : "hidden xl:block"}`}
        >
          {convertDateTime(blog.created_at)}
        </p>
        <p
          className={
            direction === "col"
              ? "text-md line-clamp-4"
              : "line-clamp-2 text-sm xl:line-clamp-1"
          }
        >
          {blog.description}
        </p>
      </div>
    </div>
  );
}

export default BlogCard;
