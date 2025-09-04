import AlbumCard from "@/components/common/AlbumCard";
import CommonButton from "@/components/common/CommonButton";
import CommonFormPopup from "@/components/common/CommonFormPopup";
import CommonInput from "@/components/common/CommonInput";
import CommonAlert from "@/components/common/CommonAlert";
import SpinningLoading from "@/components/common/SpinningLoading";
import Pagination from "@/components/common/Pagination";
import { useApi } from "@/config/api";
import { PATHS } from "@/constants";
import { useCommonNavigate } from "@/contexts/HandleNavigate";
import React, { useEffect, useState } from "react";
import { FaRegPlusSquare, FaSearch } from "react-icons/fa";
import { IoIosRefresh } from "react-icons/io";
import { useLocation } from "react-router-dom";

function Gallery() {
  const location = useLocation();
  const { get, post, del, loading } = useApi();
  const navigate = useCommonNavigate();

  const [albums, setAlbums] = useState([]);
  const [totalPage, setTotalPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [reload, setReload] = useState(false);

  const [open, setOpen] = useState(false);
  const [formType, setFormType] = useState();
  const [alert, setAlert] = useState();
  const [formData, setFormData] = useState({ name: "", description: "" });

  const limit = 32;

  // Fetch albums
  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const status =
          location.pathname === PATHS.GALLERY ? "published" : "draft";
        const res = await get("/album/", {
          params: { page: currentPage, limit, status, name: search },
        });

        setAlbums(res.items || []);
        setTotalPage(res.totalPage || 1);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAlbums();
  }, [get, reload, location.pathname, currentPage, search]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleOpenCreate = () => {
    setFormType("create");
    setOpen(true);
  };

  const handleCreate = async () => {
    const { name, description } = formData;
    if (!name) {
      setAlert({ type: "warning", message: "Tên album không được để trống" });
      return;
    }

    const submitData = new FormData();
    submitData.append("name", name);
    submitData.append("description", description);

    try {
      const res = await post("/album/create", submitData);
      if (res?.success) {
        setAlert({ type: "success", message: res.message });
        setTimeout(() => {
          setOpen(false);
          setFormData({ name: "", description: "" });
        }, 500);
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
    setCurrentPage(1);
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

      {loading && <SpinningLoading />}

      <div className="flex items-start justify-between border-b-1 border-gray-200 pb-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-xl font-bold">
            {location.pathname === PATHS.GALLERY
              ? "Quản lý thư viện ảnh"
              : "Danh sách album ẩn"}
          </h1>

          <div className="flex gap-2">
            <CommonInput
              label=""
              value={search}
              onChange={(val) => setSearch(val)}
              placeholder="Tìm album"
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
        </div>

        {location.pathname === PATHS.GALLERY && (
          <CommonButton
            className={
              "bg-primary hover:bg-light rounded-full px-4 text-sm text-white"
            }
            onClick={handleOpenCreate}
          >
            <FaRegPlusSquare />
            Tạo album mới
          </CommonButton>
        )}
      </div>

      <div className="grid grid-cols-8 gap-4">
        {albums.length === 0 ? (
          <h1 className="col-span-8 mt-8 text-center text-sm text-gray-500">
            {search
              ? "Không tìm thấy album nào"
              : location.pathname === PATHS.GALLERY
                ? "Hiện chưa có album nào được hiển thị"
                : "Danh sách album ẩn trống"}
          </h1>
        ) : (
          albums.map((album) => (
            <div key={album.id} className="col-span-1">
              <AlbumCard
                name={album.name}
                onClick={() =>
                  navigate(PATHS.IMAGE_LIST.replace(":id", album.id))
                }
              />
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPage={totalPage}
        onPageChange={(p) => setCurrentPage(p)}
      />

      {/* Create Album Popup */}
      <CommonFormPopup
        title={
          formType === "create" ? "Tạo album mới" : "Bạn có chắc muốn xoá?"
        }
        isOpen={open}
        onClose={() => setOpen(false)}
        footer={
          formType === "create" ? (
            <CommonButton
              className={"bg-primary rounded-full px-12 text-white"}
              onClick={handleCreate}
            >
              Tạo mới
            </CommonButton>
          ) : (
            <></>
          )
        }
        className={"max-w-lg"}
      >
        <div className="flex flex-col gap-4">
          <CommonInput
            label="Tên"
            value={formData.name}
            onChange={(val) => handleChange("name", val)}
          />
          <CommonInput
            label="Mô tả"
            value={formData.description}
            onChange={(val) => handleChange("description", val)}
          />
        </div>
      </CommonFormPopup>
    </div>
  );
}

export default Gallery;
