import React, { useState, useEffect } from "react";
import CommonButton from "@/components/common/CommonButton";
import CommonFormPopup from "@/components/common/CommonFormPopup";
import CategoryCard from "@/components/common/CategoryCard";
import SpinningLoading from "@/components/common/SpinningLoading";
import { useApi } from "@/config/api";
import { FaRegPlusSquare, FaSearch } from "react-icons/fa";
import { IoIosRefresh } from "react-icons/io";
import CommonAlert from "@/components/common/CommonAlert";

function Category() {
  const { get, post, put, del, loading } = useApi();
  const [categories, setCategories] = useState([]);
  const [reload, setReload] = useState(false);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [alert, setAlert] = useState();

  // popup state
  const [popup, setPopup] = useState({
    isOpen: false,
    type: "", // "create" | "update" | "delete"
    category: null,
  });
  const [categoryName, setCategoryName] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await get("/category/", {
        params: { page: currentPage, name: search },
      });
      if (res?.success) {
        setCategories(res);
      }
    };
    fetchCategories();
  }, [get, reload, currentPage, search]);

  const handleRefresh = () => {
    setSearch("");
    setCurrentPage(1);
    setReload((prev) => !prev);
  };

  // Create
  const handleCreate = async () => {
    if (!categoryName.trim()) return alert("Tên danh mục không được để trống");
    const res = await post("/category/create", { name: categoryName });
    if (res?.success) {
      setAlert({
        type: "success",
        message: res.message,
      });
      setReload((prev) => !prev);
      setPopup({ isOpen: false, type: "", category: null });
      setCategoryName("");
    } else {
      setAlert({
        type: "error",
        message: res.message,
      });
    }
  };

  // Update
  const handleUpdate = async () => {
    if (!popup.category) return;
    const res = await put("/category/update", {
      id: popup.category.id,
      name: categoryName,
    });
    if (res?.success) {
      setAlert({
        type: "success",
        message: res.message,
      });
      setReload((prev) => !prev);
      setPopup({ isOpen: false, type: "", category: null });
      setCategoryName("");
    } else {
      setAlert({
        type: "error",
        message: res.message,
      });
    }
  };

  // Delete
  const handleDelete = async () => {
    if (!popup.category) return;
    const res = await del("/category/delete", {
      params: { id: popup.category.id },
    });
    if (res?.success) {
      setReload((prev) => !prev);
      setPopup({ isOpen: false, type: "", category: null });
    } else {
      alert(res?.message || "Xoá thất bại");
    }
  };

  return (
    <div className="flex w-full flex-col gap-4">
      {alert && (
        <CommonAlert
          type={alert.type}
          message={alert?.message}
          onClose={() => setAlert(null)}
        />
      )}
      {/* Header */}
      <div className="flex items-end justify-between border-b-1 border-gray-200 pb-4">
        <h1 className="text-xl font-bold">Quản lý danh mục</h1>
        <CommonButton
          className="bg-primary hover:bg-light rounded-full px-4 text-sm text-white"
          onClick={() => {
            setPopup({ isOpen: true, type: "create", category: null });
            setCategoryName("");
          }}
        >
          <FaRegPlusSquare /> Tạo danh mục mới
        </CommonButton>
      </div>

      {/* Search & Refresh */}
      <div className="flex w-full justify-between">
        <div className="flex gap-2">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setCurrentPage(1);
              setReload((prev) => !prev);
            }}
            className="flex gap-2"
          >
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Tìm danh mục"
              className="w-md rounded border px-2"
            />
            <CommonButton
              type="submit"
              className="bg-primary w-[60px] rounded-xl text-white"
            >
              <FaSearch />
            </CommonButton>
          </form>
          <CommonButton
            className="border-primary text-primary w-full rounded-xl border px-4"
            onClick={handleRefresh}
          >
            <IoIosRefresh /> Làm mới danh sách
          </CommonButton>
        </div>
      </div>

      {/* Category List */}
      <div className="flex w-full flex-col gap-2">
        {loading ? (
          <SpinningLoading />
        ) : categories?.totalItem === 0 ? (
          <h1 className="text-center text-gray-200">
            Danh sách danh mục trống
          </h1>
        ) : (
          categories?.items?.map((category) => (
            <CategoryCard
              key={category.id}
              id={category.id}
              name={category.name}
              onEdit={() => {
                setPopup({ isOpen: true, type: "update", category });
                setCategoryName(category.name);
              }}
              onDelete={() =>
                setPopup({ isOpen: true, type: "delete", category })
              }
            />
          ))
        )}
      </div>

      {/* Popup */}
      <CommonFormPopup
        isOpen={popup.isOpen}
        onClose={() => setPopup({ isOpen: false, type: "", category: null })}
        className={"max-w-sm"}
        title={
          popup.type === "create"
            ? "Tạo danh mục mới"
            : popup.type === "update"
              ? "Cập nhật danh mục"
              : "Xác nhận xoá"
        }
        footer={
          popup.type === "create" ? (
            <CommonButton
              className="bg-primary w-[200px] rounded-full text-white"
              onClick={handleCreate}
            >
              Tạo mới
            </CommonButton>
          ) : popup.type === "update" ? (
            <CommonButton
              className="bg-primary w-[200px] rounded-full text-white"
              onClick={handleUpdate}
            >
              Cập nhật
            </CommonButton>
          ) : (
            <>
              <CommonButton
                className="w-full rounded-full bg-red-500 text-white"
                onClick={handleDelete}
              >
                Xoá
              </CommonButton>
              <CommonButton
                onClick={() =>
                  setPopup({ isOpen: false, type: "", category: null })
                }
                className={"w-full rounded-full bg-gray-200"}
              >
                Huỷ
              </CommonButton>
            </>
          )
        }
      >
        {popup.type === "create" || popup.type === "update" ? (
          <input
            className="w-full rounded border px-2 py-1"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          />
        ) : (
          <p>
            Bạn có chắc chắn muốn xoá danh mục "{popup.category?.name}" không?
          </p>
        )}
      </CommonFormPopup>
    </div>
  );
}

export default Category;
