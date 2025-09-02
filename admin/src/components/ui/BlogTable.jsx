import { BLOGTYPE_MAP, PATHS } from "@/constants";
import React, { useState } from "react";
import { FiMoreVertical } from "react-icons/fi";
import CommonButton from "../common/CommonButton";
import CommonFormPopup from "../common/CommonFormPopup";
import BlogOverview from "../common/BlogOverview";
import { useCommonNavigate } from "@/contexts/HandleNavigate";
import { useApi } from "@/config/api";

function BlogTable({ blogs, onDelete }) {
  const [openMenuId, setOpenMenuId] = useState(null);

  const [open, setOpen] = useState(false);
  const [formType, setFormType] = useState();
  const [selectBlogID, setSelectBlogID] = useState();

  const navigate = useCommonNavigate();

  const toggleMenu = (id) => {
    setOpenMenuId(openMenuId === id ? null : id);
  };

  const handleOpen = (blog) => {
    setFormType("view");
    setSelectBlogID(blog.id);
    setOpen(true);
  };

  const handleEdit = (blog) => {
    navigate(PATHS.EDIT_BLOG.replace(":id", blog.id));
  };

  const handleOpenDelete = (blog) => {
    setFormType("delete");
    setSelectBlogID(blog.id);
    setOpen(true);
  };

  return (
    <>
      <table className="w-full border-collapse">
        <thead className="border-b-1 border-gray-200 pb-2">
          <tr>
            <th className="w-1/6 text-left">Bài viết</th>
            <th className="w-1/2 text-left">Tiêu đề</th>
            <th className="w-1/6 text-left">Danh mục</th>
            <th className="w-1/2 text-left">Ngày đăng</th>
            <th className="w-1/3 text-left"></th>
          </tr>
        </thead>
        <tbody>
          {blogs?.items?.map((blog) => (
            <tr key={blog.id} className="relative">
              <td className="py-4 pr-4">
                <img
                  src={blog.image}
                  className="h-20 rounded-xl object-cover"
                />
              </td>
              <td className="text-left">{blog.title}</td>
              <td>{BLOGTYPE_MAP[blog.type]}</td>
              <td>{blog.created_at}</td>
              <td className="relative">
                <CommonButton
                  onClick={() => toggleMenu(blog.id)}
                  className="rounded-full p-2 hover:bg-gray-100"
                >
                  <FiMoreVertical />
                </CommonButton>

                {openMenuId === blog.id && (
                  <div className="shadow-main absolute top-full right-0 z-10 -mt-6 w-40 rounded-lg bg-white">
                    <ul>
                      <li
                        onClick={() => handleOpen(blog)}
                        className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                      >
                        Xem trước
                      </li>
                      <li
                        onClick={() => handleEdit(blog)}
                        className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                      >
                        Sửa
                      </li>
                      <li
                        onClick={() => handleOpenDelete(blog)}
                        className="cursor-pointer px-4 py-2 text-red-500 hover:bg-red-100"
                      >
                        Xoá
                      </li>
                    </ul>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <CommonFormPopup
        isOpen={open}
        onClose={() => setOpen(false)}
        title={
          formType === "view"
            ? "Bản xem trước nội dung"
            : "Bạn có chắc muỗn xoá?"
        }
        className={formType === "view" ? "max-w-4xl" : "max-w-md"}
        footer={
          formType !== "view" && (
            <div className="flex w-full justify-end gap-2">
              <CommonButton
                className={"w-full rounded-full bg-red-500 text-white"}
                onClick={() => {
                  onDelete(selectBlogID);
                  (setTimeout(() => {
                    setOpen(false);
                  }),
                    [500]);
                }}
              >
                Xoá
              </CommonButton>
              <CommonButton
                className={"w-full rounded-full bg-gray-200 text-black"}
                onClick={() => setOpen(false)}
              >
                Huỷ
              </CommonButton>
            </div>
          )
        }
      >
        {formType === "view" && <BlogOverview id={selectBlogID} />}
      </CommonFormPopup>
    </>
  );
}

export default BlogTable;
