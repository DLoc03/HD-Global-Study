import CommonButton from "@/components/common/CommonButton";
import SpinningLoading from "@/components/common/SpinningLoading";
import BlogTable from "@/components/ui/BlogTable";
import { useApi } from "@/config/api";
import { PATHS } from "@/constants";
import { useCommonNavigate } from "@/contexts/HandleNavigate";
import React, { useEffect, useState } from "react";

import CommonAlert from "@/components/common/CommonAlert";

import { FaRegPlusSquare } from "react-icons/fa";

function Blog() {
  const [blogs, setBlogs] = useState([]);
  const { get, del, loading } = useApi();
  const config = { page: 1, limit: 10 };
  const [reload, setReload] = useState(false);
  const [alert, setAlert] = useState();

  const navigate = useCommonNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await get("/post/", { params: config });
        setBlogs(res);
      } catch (err) {
        console.error(err);
      }
    };

    fetchPosts();
  }, [get, reload]);

  const handleDelete = async (id) => {
    try {
      const res = await del(`post/delete?id=${id}`);
      if (res?.success) {
        setAlert({ type: "success", message: res.message });
        setReload((prev) => !prev);
      } else {
        setAlert({ type: "error", message: res.message });
      }
    } catch (err) {
      setAlert({ type: "error", message: "Xảy ra lỗi" });
    }
  };

  return (
    <div className="flex w-full flex-col gap-4">
      {alert && (
        <CommonAlert
          type={alert.type}
          message={alert.message}
          onClose={() => setAlert(null)}
        />
      )}
      {loading && (
        <div className="flex h-screen items-center justify-center">
          <SpinningLoading />
        </div>
      )}
      <div className="flex items-end justify-between">
        <h1 className="text-xl font-bold">Quản lý bài viết</h1>
        <CommonButton
          className={
            "bg-primary hover:bg-light rounded-full px-4 text-sm text-white"
          }
          onClick={() => navigate(PATHS.CREATE_BLOG)}
        >
          <FaRegPlusSquare />
          Tạo bài viết mới
        </CommonButton>
      </div>
      {blogs.totalItem === 0 ? (
        <h1 className="mt-8 text-center text-sm text-gray-500">
          Hiện chưa có bài viết nào
        </h1>
      ) : (
        <div className="rounded-xl bg-white p-4">
          <BlogTable blogs={blogs} onDelete={handleDelete} />
        </div>
      )}
    </div>
  );
}

export default Blog;
