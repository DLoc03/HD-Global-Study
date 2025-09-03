import CommonButton from "@/components/common/CommonButton";
import SpinningLoading from "@/components/common/SpinningLoading";
import BlogTable from "@/components/ui/BlogTable";
import { useApi } from "@/config/api";
import { PATHS } from "@/constants";
import { useCommonNavigate } from "@/contexts/HandleNavigate";
import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";

import CommonAlert from "@/components/common/CommonAlert";

import { FaRegPlusSquare } from "react-icons/fa";
import CommonInput from "@/components/common/CommonInput";
import { useLocation } from "react-router-dom";
import { IoIosRefresh } from "react-icons/io";

function Blog() {
  const [blogs, setBlogs] = useState([]);
  const { get, post, del, loading } = useApi();
  const [reload, setReload] = useState(false);
  const [alert, setAlert] = useState();
  const [order, setOrder] = useState("DESC");
  const [search, setSearch] = useState();
  const location = useLocation();

  const [config, setConfig] = useState({
    page: 1,
    limit: 3,
    order: order,

    status: location.pathname === PATHS.GALLERY ? "published" : "draft",
    title: search,
  });

  console.log(location.pathname);

  const navigate = useCommonNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      const status = location.pathname === PATHS.BLOG ? "published" : "draft";
      const res = await get("/post/byStatus", {
        params: { page: 1, limit: 3, order, status, title: search },
      });
      setBlogs(res);
    };
    fetchPosts();
  }, [get, reload, order, location.pathname]);

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

  const handleUpdateStatus = async (id, status) => {
    try {
      const res = await post(`post/updateStatus?id=${id}&status=${status}`);
      if (res?.success) {
        setAlert({ type: "success", message: res.message });
        setReload((prev) => !prev);
      } else {
        setAlert({ type: "error", message: res.message });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleRefresh = () => {
    setSearch("");
    setConfig((prev) => ({
      ...prev,
      name: null,
      page: 1,
    }));
    setReload((prev) => !prev);
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
      <div className="flex items-end justify-between border-b-1 border-gray-200 pb-4">
        <h1 className="text-xl font-bold">Quản lý bài viết</h1>
        {location.pathname === "/" && (
          <CommonButton
            className={
              "bg-primary hover:bg-light rounded-full px-4 text-sm text-white"
            }
            onClick={() => navigate(PATHS.CREATE_BLOG)}
          >
            <FaRegPlusSquare />
            Tạo bài viết mới
          </CommonButton>
        )}
      </div>
      <div className="flex w-full justify-between">
        <div className="flex gap-2">
          <CommonInput
            label=""
            value={search}
            onChange={(val) => setSearch(val)}
            placeholder="Tìm bài viết"
            className="w-md"
          />
          <CommonButton
            className={"bg-primary w-[60px] rounded-xl text-white"}
            onClick={() => setReload((prev) => !prev)}
          >
            <FaSearch />
          </CommonButton>
          <CommonButton
            className={"border-primary text-primary w-full rounded-xl border"}
            onClick={handleRefresh}
          >
            <IoIosRefresh />
            Làm mới danh sách
          </CommonButton>
        </div>
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-600">Sắp xếp:</label>
          <select
            value={order}
            onChange={(e) => setOrder(e.target.value)}
            className="rounded-md border border-gray-300 p-2 text-sm"
          >
            <option value="DESC">Mới nhất</option>
            <option value="ASC">Cũ nhất</option>
          </select>
        </div>
      </div>

      {blogs.totalItem === 0 ? (
        <h1 className="mt-8 text-center text-sm text-gray-500">
          {search
            ? "Không tìm thấy bài viết nào"
            : "Hiện không có bài viết nào"}
        </h1>
      ) : (
        <div className="rounded-xl bg-white p-4">
          <BlogTable
            blogs={blogs}
            onDelete={handleDelete}
            onHide={handleUpdateStatus}
            isShowHide={location.pathname === PATHS.BLOG ? true : false}
          />
        </div>
      )}
    </div>
  );
}

export default Blog;
