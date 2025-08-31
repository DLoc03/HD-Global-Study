import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

//data json
import { blogs } from "@/datas/blogs.json";
import { convertDateTime } from "@/utils";

function BlogContent() {
  const { id } = useParams();
  const [blog, setBlog] = useState({});
  useEffect(() => {
    if (!id) {
      return null;
    }
    const data = blogs.find((blog) => blog.id === Number(id));
    setBlog(data);
  }, [id]);
  return (
    <>
      {blog && (
        <div className="flex w-full flex-col flex-wrap gap-4">
          <p className="text-light text-md">
            Ngày đăng: {convertDateTime(blog.date)}
          </p>
          <h1 className="text-primary text-center text-4xl font-bold">
            {blog.title}
          </h1>
          <p className="text-md text-center font-light">{blog.description}</p>
          <img
            src={blog.image}
            alt={blog.title}
            className="mx-auto h-[200px] w-full rounded-xl object-cover md:h-[400px] xl:w-5xl"
          />
        </div>
      )}
    </>
  );
}

export default BlogContent;
