import { useApi } from "@/config/api";
import React, { useEffect, useState } from "react";

function BlogOverview({ id }) {
  const { get } = useApi();
  const [blog, setBlog] = useState();

  useEffect(() => {
    if (!id) return;

    const fetchBlog = async () => {
      try {
        const res = await get("/post/get", { params: { id } });
        if (res?.success) {
          setBlog(res.post);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchBlog();
  }, [id, get]);

  return (
    <div className="flex max-h-[400px] flex-col gap-3 overflow-auto">
      <p className="text-center text-sm text-gray-400">
        Ngày đăng: {blog?.created_at}
      </p>

      <h1 className="text-center text-xl font-semibold">{blog?.title}</h1>
      <p className="text-center text-sm">{blog?.description}</p>
      <div dangerouslySetInnerHTML={{ __html: blog?.content }} />
    </div>
  );
}

export default BlogOverview;
