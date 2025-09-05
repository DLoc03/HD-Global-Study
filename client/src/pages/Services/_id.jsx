import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { convertDateTime } from "@/utils";
import { usePosts } from "@/hooks/usePost";

function ServiceDetail() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const { getBySlug, loading, error } = usePosts();

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

  return (
    <div className="mx-auto flex w-full flex-col flex-wrap gap-4">
      <p className="text-light text-md">
        Ngày đăng: {convertDateTime(blog?.created_at)}
      </p>
      <div className="mx-auto flex max-w-5xl flex-col gap-4">
        <h1 className="text-primary text-center text-3xl font-bold md:text-4xl">
          {blog?.title}
        </h1>
        <p className="text-md text-center font-light">{blog?.description}</p>
        <div
          className="prose"
          dangerouslySetInnerHTML={{ __html: blog?.content || "" }}
        ></div>
      </div>
    </div>
  );
}

export default ServiceDetail;
